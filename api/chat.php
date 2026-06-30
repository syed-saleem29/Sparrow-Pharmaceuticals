<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

// ─── GEMINI API KEY ───────────────────────────────────────────────────────────
require_once __DIR__ . '/config.php'; // key stored in gitignored config.php .
// ─────────────────────────────────────────────────────────────────────────────

// ─── Build product knowledge from data/products.json ─────────────────────────
function buildProductKnowledge() {
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
            $out .= "Variants / Flavours:\n";
            foreach ($p['variants'] as $v) {
                $out .= "  - {$v['name']}: {$v['description']}\n";
            }
        }

        if (!empty($p['preparation'])) {
            $out .= "Preparation: {$p['preparation']}\n";
        }

        if (!empty($p['nutrition_per_20g_serving'])) {
            $out .= "Nutrition per 20g serving:\n";
            foreach ($p['nutrition_per_20g_serving'] as $key => $val) {
                $label = str_replace('_', ' ', $key);
                $out .= "  - $label: $val\n";
            }
        }

        if (!empty($p['clinical_use'])) {
            $out .= "Clinical use:\n";
            foreach ($p['clinical_use'] as $phase => $desc) {
                $label = ucwords(str_replace('_', ' ', $phase));
                $out .= "  - $label: $desc\n";
            }
        }

        if (!empty($p['key_clinical_points'])) {
            $out .= "Key clinical points:\n";
            foreach ($p['key_clinical_points'] as $point) {
                $out .= "  - $point\n";
            }
        }

        if (!empty($p['ingredients'])) {
            $out .= "Ingredients: {$p['ingredients']}\n";
        }

        if (!empty($p['preparation_warnings'])) {
            $out .= "Preparation warnings: {$p['preparation_warnings']}\n";
        }

        if (!empty($p['regulatory_label'])) {
            $out .= "Regulatory / label notes: {$p['regulatory_label']}\n";
        }

        if (!empty($p['knowledge_sections'])) {
            foreach ($p['knowledge_sections'] as $section) {
                $out .= "\n--- {$section['title']} ---\n";
                $out .= $section['content'] . "\n";
            }
        }

        $out .= "\n";
    }

    return trim($out);
}
// ─────────────────────────────────────────────────────────────────────────────

$SYSTEM_PROMPT = <<<PROMPT
You are the Sparrow Assistant, the helpful chatbot for Sparrow Pharmaceuticals' website (sparrowpharmaceuticals.in). You help visitors — mainly hospital procurement teams, surgeons, and clinical dietitians — learn about our products and guide them to order or contact the team.

COMPANY CONTACT:
- Phone: +91 80748 33565 and +91 63007 92061
- Email: info@sparrowpharmaceuticals.in
- Order page: /order
- Contact page: /contact

PRODUCT KNOWLEDGE:
PROMPT;

$SYSTEM_PROMPT .= "\n" . buildProductKnowledge();

$SYSTEM_PROMPT .= "\n\nRULES:\n"
    . "- Be professional, warm, and concise (under 120 words per reply)\n"
    . "- If asked about pricing, say to contact the team for institutional or bulk pricing quotes\n"
    . "- If someone wants to order, direct them to fill in the order form on the website (/order)\n"
    . "- If someone wants to speak to a person, give the phone numbers and email\n"
    . "- Do not invent any information not provided above\n"
    . "- Respond in the same language the user writes in";

// ─────────────────────────────────────────────────────────────────────────────

$input   = json_decode(file_get_contents('php://input'), true);
$message = trim($input['message'] ?? '');
$history = $input['history'] ?? [];

if (!$message) {
    http_response_code(400);
    echo json_encode(['error' => 'No message provided']);
    exit;
}

// Build conversation history for Gemini
$contents = [];
foreach ($history as $h) {
    if (!empty($h['role']) && !empty($h['text'])) {
        $contents[] = ['role' => $h['role'], 'parts' => [['text' => $h['text']]]];
    }
}
$contents[] = ['role' => 'user', 'parts' => [['text' => $message]]];

$payload = json_encode([
    'system_instruction' => ['parts' => [['text' => $SYSTEM_PROMPT]]],
    'contents'           => $contents,
    'generationConfig'   => ['maxOutputTokens' => 250, 'temperature' => 0.65],
]);

$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$API_KEY";

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
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

// Surface Gemini API errors so they are visible during debugging
if (!empty($data['error'])) {
    http_response_code(500);
    echo json_encode(['reply' => 'API error: ' . ($data['error']['message'] ?? 'Unknown error from Gemini.')]);
    exit;
}

$reply = $data['candidates'][0]['content']['parts'][0]['text']
      ?? "I'm having trouble responding right now. Please contact us at info@sparrowpharmaceuticals.in or call +91 80748 33565.";

echo json_encode(['reply' => trim($reply)]);
