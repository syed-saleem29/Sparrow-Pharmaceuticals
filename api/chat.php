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

if (!file_exists(__DIR__ . '/config.php')) {
    http_response_code(500);
    echo json_encode(['reply' => 'API error: config.php not found on server. Create api/config.php with your Groq API key.']);
    exit;
}
require_once __DIR__ . '/config.php';

// ─── Rule-based fallback (used when Groq rate limit is hit) ──────────────────
function ruleBasedReply($msg) {
    $q = strtolower(trim($msg));

    // Greetings
    if (preg_match('/^(hi|hello|hey|good morning|good afternoon|namaste|helo|hii)\b/', $q))
        return "Hello! I'm the Sparrow Assistant. Ask me anything about Surgicover — variants, dosing, safety, clinical use, or how to order. I'm happy to help!";

    // Order / purchase
    if (preg_match('/\b(order|buy|purchase|where to get|how to get|stock)\b/', $q))
        return "To place an order, fill in our order form at sparrowpharmaceuticals.in/order, or contact the team:\n+91 80748 33565  |  +91 63007 92061\ninfo@sparrowpharmaceuticals.in";

    // Pricing
    if (preg_match('/\b(price|pricing|cost|rate|how much|mrp|quote|bulk)\b/', $q))
        return "For institutional or bulk pricing quotes please contact us directly:\n+91 80748 33565  |  +91 63007 92061\ninfo@sparrowpharmaceuticals.in\nWe handle B2B procurement for hospitals, surgical centres, and dietitians.";

    // Contact
    if (preg_match('/\b(contact|phone|call|email|speak|talk|person|team|reach)\b/', $q))
        return "You can reach the Sparrow Pharmaceuticals team at:\n+91 80748 33565\n+91 63007 92061\ninfo@sparrowpharmaceuticals.in\nOr visit sparrowpharmaceuticals.in/contact";

    // Variants / flavours
    if (preg_match('/\b(variant|flavour|flavor|chocolate|vanilla|dry fruit|diabetic cover|types|available in|options)\b/', $q))
        return "Surgicover comes in 4 variants:\n• Vanilla — smooth, ideal for general compliance\n• Chocolate — for reduced appetite or taste changes\n• Diabetic Cover — zero sucrose, safe for diabetic patients\n• Dry Fruits — mild flavour for post-op nausea or anorexia";

    // Diabetic / sugar
    if (preg_match('/\b(diabet|sugar|sucrose|glycaem|glycemic|insulin|blood glucose)\b/', $q))
        return "Yes — Surgicover is safe for diabetic patients. It contains zero added sucrose and uses sucralose as sweetener (GI = 0, non-caloric). The Diabetic Cover variant is specifically designed for Type 1 and Type 2 diabetic surgical patients. It will not raise blood glucose.";

    // Lactose / milk / whey
    if (preg_match('/\b(lactose|milk|dairy|whey|intoleran)\b/', $q))
        return "Surgicover contains less than 0.1g lactose per 20g serving — far below the 12g clinical threshold. It is based on Soya Protein Isolate (naturally lactose-free) and is safe for post-operative patients with secondary lactose intolerance.";

    // CKD / kidney
    if (preg_match('/\b(ckd|kidney|renal|nephr)\b/', $q))
        return "In CKD Stage 3 or higher, Surgicover must be used under guidance of a nephrologist or dietitian — protein, phosphorus, and calcium all need monitoring. It is not contraindicated but requires careful oversight.";

    // Safety / allergens
    if (preg_match('/\b(safe|safety|contraindic|allergen|allerg|side effect|avoid|caution|warning)\b/', $q))
        return "Safe for: diabetic patients, secondary lactose intolerance, ENT/dental/cardiac patients.\nCaution: CKD Stage 3+ — monitor protein and electrolytes.\nNot for: parenteral/IV use; consumption within 2 hrs of anaesthesia (NPO window).\nAllergens: Contains Milk and Soy.\nDo NOT mix above 40°C / 104°F.";

    // Temperature / mixing / preparation
    if (preg_match('/\b(hot|boil|temp|mix|warm|tea|dissolve|prepar)\b/', $q))
        return "Mix 1 heaped scoop (20g) in 150–200ml of lukewarm water or milk. Do NOT use hot or boiling liquids — above 40°C / 104°F it damages proteins and vitamins. Stir until dissolved and consume immediately.";

    // Dosing / serving / when to take
    if (preg_match('/\b(dose|dosing|how much|how many|serving|scoop|times|frequency|when|start|pre.?op|post.?op|prehab)\b/', $q))
        return "Dosing guide:\n• Pre-surgery (5–7 days before): 2 servings/day\n• Post-op Day 2–5: 2 servings/day\n• Post-op Day 6+: 1–2 servings/day\n• Major surgery (oncology, ortho, GI): 3–4 servings/day\n• Home recovery: 1–2 servings/day for 14–30 days\n\n1 serving = 1 heaped scoop (20g) in 150–200ml lukewarm water or milk.";

    // Nutrition / protein / ingredients
    if (preg_match('/\b(nutrition|protein|calorie|kcal|ingredient|arginine|leucine|vitamin|mineral|calcium|phosphorus|fat|carb)\b/', $q))
        return "Per 20g serving:\n• 75.64 kcal\n• 6g protein (PDCAAS 1.0 — highest quality)\n• L-Arginine 200mg — wound healing and nitric oxide\n• L-Leucine 100mg — muscle preservation\n• Vitamin C 32mg (40% RDA) — collagen synthesis\n• 14 vitamins and minerals including B-complex, Vitamin D, Iron, Copper, Manganese\n• Zero added sucrose | 0.19g fat";

    // Department / surgery type
    if (preg_match('/\b(ortho|knee|hip|urology|prostat|ent|tonsil|dental|jaw|cardiac|heart|vascular|oncol|cancer|neuro|brain|plastic|flap|gynae|hysterectomy|bowel|colectomy|hernia|laparotomy|department|which surgery|applicable|general surgery)\b/', $q))
        return "Surgicover is used across all surgical departments:\n• Orthopaedics (ACL, THA, TKA) — muscle & bone\n• Urology/Prostatectomy — L-Arginine for microperfusion\n• General Surgery — gut barrier, fascial collagen\n• Gynaecology/Hysterectomy — pelvic floor healing\n• Oncology — counters cancer cachexia\n• GI Surgery — prevents hypoalbuminaemia\n• Neurosurgery/TBI — cerebral perfusion, B-vitamins\n• Vascular — ischaemia-reperfusion protection\n• Cardiothoracic/Sternotomy — Vitamin D for sternal healing\n• Plastics/Free Flap — flap microperfusion\n• ENT/Tonsillectomy — smooth liquid for painful swallowing\n• Dental/Jaw Wiring — liquid nutrition through wired jaws";

    // Comparison / competitors
    if (preg_match('/\b(compar|versus|vs\.?|ensure|pentasure|resource|nestle|better|different|alternative|other brand)\b/', $q))
        return "Surgicover vs competitors:\n• vs Ensure HP — no free L-Arginine or L-Leucine; contains sucrose\n• vs PentaSure HP — whey-based (lactose risk); contains fructose and maltodextrin\n• vs Resource HP (Nestle) — whey + high-GI maltodextrin; no surgical amino acid spike\n\nSurgicover is the only supplement with dual L-Arginine (200mg) + L-Leucine (100mg) per serving, zero sucrose, and a lactose-compatible SPI protein matrix — purpose-built for surgery.";

    // ERAS / protocol
    if (preg_match('/\b(eras|protocol|clinical|evidence|study|guideline)\b/', $q))
        return "Surgicover is aligned with ERAS (Enhanced Recovery After Surgery) protocols across all major surgical departments. It supports prehabilitation (pre-op), soft diet transition (post-op Days 2–5), and extended home recovery (14–30 days post-discharge).";

    // What is / about / general
    if (preg_match('/\b(what is|tell me|about|surgicover|explain|overview|describe)\b/', $q))
        return "Surgicover is a peri-operative clinical nutrition supplement by Sparrow Pharmaceuticals. It supports surgical patients before surgery (prehabilitation), after surgery (recovery), and during home healing.\n\nKey features:\n• L-Arginine 200mg — wound healing\n• L-Leucine 100mg — muscle preservation\n• Zero added sucrose — safe for diabetics\n• PDCAAS 1.0 protein quality\n• 4 variants: Vanilla, Chocolate, Diabetic Cover, Dry Fruits\n\nAsk me about dosing, safety, departments, or how to order!";

    // Default
    return "I don't have a specific answer for that right now. For detailed queries please contact the team:\n+91 80748 33565  |  +91 63007 92061\ninfo@sparrowpharmaceuticals.in\n\nYou can also ask me about: variants, dosing, safety, ordering, or how Surgicover compares to other supplements.";
}
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
    echo json_encode(['reply' => ruleBasedReply($message)]);
    exit;
}

$data  = json_decode($response, true);

if (!empty($data['error'])) {
    $errMsg = $data['error']['message'] ?? '';
    $errCode = $data['error']['code'] ?? '';
    // Rate limit (429) — fall back to rule-based engine silently
    if ($errCode === 'rate_limit_exceeded' || stripos($errMsg, 'rate limit') !== false || stripos($errMsg, 'tokens per minute') !== false) {
        echo json_encode(['reply' => ruleBasedReply($message)]);
        exit;
    }
    http_response_code(500);
    echo json_encode(['reply' => 'API error: ' . $errMsg]);
    exit;
}

$reply = $data['choices'][0]['message']['content']
      ?? ruleBasedReply($message);

echo json_encode(['reply' => trim($reply)]);
