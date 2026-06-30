<?php
error_reporting(0);
ini_set('display_errors', '0');

// Catch PHP fatal errors and return JSON instead of empty response
register_shutdown_function(function () {
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        if (!headers_sent()) header('Content-Type: application/json');
        echo json_encode(['reply' => 'PHP fatal: ' . $e['message'] . ' (line ' . $e['line'] . ')']);
    }
});

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

// ─── GEMINI API KEY ───────────────────────────────────────────────────────────
if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(500);
    echo json_encode(['reply' => 'API error: config.php not found on server. Create api/config.php with your Groq API key.']);
    exit;
}
require_once __DIR__ . '/config.php';
// ─────────────────────────────────────────────────────────────────────────────

// ─── Select which knowledge sections are relevant to the question ─────────────
function selectSections($question, $sections) {
    $q = strtolower($question);

    $map = [
        'Department Applications' => [
            'ortho','knee','hip','acl','tka','tha','urology','prostat','ent','tonsil',
            'dental','jaw','cardiac','heart','sternotomy','vascular','oncol','cancer',
            'neuro','brain','plastic','flap','graft','gynae','hysterectomy','gi','bowel',
            'colectomy','hernia','laparotomy','department','which surgery','applicable',
            'which patient','which case'
        ],
        'Dosing Protocols' => [
            'dose','dosing','how much','how many','serving','scoop','times a day',
            'frequency','when to take','how to take','tube','syringe','tid','bid','qid',
            'pre-op','post-op','prehabilitation','pre op','post op'
        ],
        'Safety and Contraindications' => [
            'safe','safety','ckd','kidney','allerg','diabeti','lactose','contraindic',
            'side effect','npo','anaesth','hot water','temperature','milk','soy',
            'forbidden','avoid','restrict','caution','warning','cardiac diet'
        ],
        'How Surgicover Compares' => [
            'compare','versus','vs','ensure','pentasure','resource','better than',
            'difference','competitor','alternative','other brand','similar product'
        ],
        'Pricing and How to Order' => [
            'price','pricing','cost','order','buy','purchase','procurement','bulk',
            'hospital supply','contact','quote','how to get','where to buy','stock'
        ],
    ];

    // Always include FAQ and Pricing (short, broadly useful)
    $always = ['Frequently Asked Questions', 'Pricing and How to Order'];
    $matched = [];

    foreach ($sections as $s) {
        if (empty($s['chatbot'])) continue;
        $title = $s['title'];
        if (in_array($title, $always)) { $matched[$title] = $s; continue; }
        if (!isset($map[$title])) continue;
        foreach ($map[$title] as $kw) {
            if (strpos($q, $kw) !== false) { $matched[$title] = $s; break; }
        }
    }

    // Fallback: if only FAQ+Pricing matched, add Departments too (covers most generic questions)
    if (count($matched) <= 2) {
        foreach ($sections as $s) {
            if (!empty($s['chatbot'])) $matched[$s['title']] = $s;
        }
    }

    return array_values($matched);
}
// ─────────────────────────────────────────────────────────────────────────────

// ─── Build product knowledge from data/products.json ─────────────────────────
function buildProductKnowledge($question = '') {
    $path = __DIR__ . '/../data/products.json';
    if (!file_exists($path)) return "No product data found.";

    $data = json_decode(file_get_contents($path), true);
    if (empty($data['products'])) return "No products listed.";

    $out = "";
    foreach ($data['products'] as $p) {
        $out .= "\n=== PRODUCT: {$p['name']} ===\n";
        $out .= "Type: {$p['type']}\n";
        $out .= "Description: {$p['description']}\n";
        $out .= "Target audience: {$p['target_audience']}\n";
        $out .= "Order URL: {$p['order_url']}\n";

        if (!empty($p['variants'])) {
            $out .= "Variants: ";
            $vnames = array_map(fn($v) => $v['name'], $p['variants']);
            $out .= implode(', ', $vnames) . "\n";
        }

        if (!empty($p['nutrition_per_20g_serving'])) {
            $n = $p['nutrition_per_20g_serving'];
            $out .= "Nutrition per 20g serving: "
                . ($n['energy'] ?? '') . ", "
                . ($n['protein'] ?? '') . ", "
                . "L-Arginine " . ($n['L_Arginine'] ?? '') . ", "
                . "L-Leucine " . ($n['L_Leucine'] ?? '') . ", "
                . "Vitamin C " . ($n['Vitamin_C'] ?? '') . ", "
                . "Fat " . ($n['fat'] ?? '') . ", Zero added sucrose\n";
        }

        if (!empty($p['key_clinical_points'])) {
            $out .= "Key facts:\n";
            foreach ($p['key_clinical_points'] as $point) {
                $out .= "  - $point\n";
            }
        }

        if (!empty($p['preparation_warnings'])) {
            $out .= "Warning: {$p['preparation_warnings']}\n";
        }

        if (!empty($p['knowledge_sections'])) {
            $relevant = selectSections($question, $p['knowledge_sections']);
            foreach ($relevant as $section) {
                $out .= "\n--- {$section['title']} ---\n";
                $out .= $section['content'] . "\n";
            }
        }

        $out .= "\n";
    }

    return trim($out);
}
// ─────────────────────────────────────────────────────────────────────────────

// Read the user's message first so we can select relevant knowledge sections
$input   = json_decode(file_get_contents('php://input'), true);
$message = trim($input['message'] ?? '');
$history = $input['history'] ?? [];

if (!$message) {
    http_response_code(400);
    echo json_encode(['error' => 'No message provided']);
    exit;
}

// Build system prompt using only the knowledge sections relevant to this message
$SYSTEM_PROMPT = <<<PROMPT
You are the Sparrow Assistant, the helpful chatbot for Sparrow Pharmaceuticals' website (sparrowpharmaceuticals.in). You help visitors — mainly hospital procurement teams, surgeons, and clinical dietitians — learn about our products and guide them to order or contact the team.

COMPANY CONTACT:
- Phone: +91 80748 33565 and +91 63007 92061
- Email: info@sparrowpharmaceuticals.in
- Order page: /order
- Contact page: /contact

PRODUCT KNOWLEDGE:
PROMPT;

$SYSTEM_PROMPT .= "\n" . buildProductKnowledge($message);

$SYSTEM_PROMPT .= "\n\nRULES:\n"
    . "- Be professional, warm, and concise (under 120 words per reply)\n"
    . "- If asked about pricing, say to contact the team for institutional or bulk pricing quotes\n"
    . "- If someone wants to order, direct them to fill in the order form on the website (/order)\n"
    . "- If someone wants to speak to a person, give the phone numbers and email\n"
    . "- Do not invent any information not provided above\n"
    . "- Respond in the same language the user writes in";

// Build conversation history in OpenAI format (Groq is OpenAI-compatible)
$messages = [['role' => 'system', 'content' => $SYSTEM_PROMPT]];
foreach ($history as $h) {
    if (!empty($h['role']) && !empty($h['text'])) {
        $role = ($h['role'] === 'model') ? 'assistant' : $h['role'];
        $messages[] = ['role' => $role, 'content' => $h['text']];
    }
}
$messages[] = ['role' => 'user', 'content' => $message];

$payload = json_encode([
    'model'       => 'llama-3.1-8b-instant',
    'messages'    => $messages,
    'max_tokens'  => 200,
    'temperature' => 0.65,
]);

$url = "https://api.groq.com/openai/v1/chat/completions";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        "Authorization: Bearer $API_KEY",
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
]);
$response = curl_exec($ch);
$err      = curl_error($ch);
curl_close($ch);

if ($err) {
    http_response_code(500);
    echo json_encode(['reply' => "Sorry, I couldn't connect right now. Please call us on +91 80748 33565 or email info@sparrowpharmaceuticals.in"]);
    exit;
}

$data  = json_decode($response, true);

if (!empty($data['error'])) {
    http_response_code(500);
    echo json_encode(['reply' => 'API error: ' . ($data['error']['message'] ?? 'Unknown API error.')]);
    exit;
}

$reply = $data['choices'][0]['message']['content']
      ?? "I'm having trouble responding right now. Please contact us at info@sparrowpharmaceuticals.in or call +91 80748 33565.";

echo json_encode(['reply' => trim($reply)]);
