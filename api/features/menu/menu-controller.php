<?php

class MenuController extends ControllerBase
{
    private const MENU_FILE = __DIR__ . '/../../storage/menu.json';

    /**
     * Returns the full menu as a JSON object.
     *
     * @Route("GET /menu")
     * @AllowAnonymous
     *
     * @return 200 {
     *   "ok": true,
     *   "updatedAt": "string",
     *   "currency": "string",
     *   "badges": ["string"],
     *   "addOns": { "<id>": { "name": { "en": "string", "ar": "string" }, "price": int } },
     *   "categories": [ { "id": "string", "name": { "en": "...", "ar": "..." }, "products": [...] } ],
     *   "signatures": ["string"],
     *   "pairings": [ { "id": "string", "items": ["string"], "pricing": { "price": int, "discount": int, "final": int } } ],
     *   "popup": { "enabled": bool, "image": string|null, "delaySeconds": int }
     * }
     *
     * @throws 500 { "ok": false, "error": "Server error", "code": "INTERNAL_ERROR" }
     */
    public function get(): void
    {
        $raw = @file_get_contents(self::MENU_FILE);

        if ($raw === false) {
            error_log('MenuController: could not read ' . self::MENU_FILE);
            HttpContext::fail(500, 'Server error', 'INTERNAL_ERROR');
        }

        $menu = json_decode($raw, true);

        if (!is_array($menu)) {
            error_log('MenuController: menu.json is not valid JSON');
            HttpContext::fail(500, 'Server error', 'INTERNAL_ERROR');
        }

        $etag = '"' . md5($raw) . '"';

        if (($this->requestEtag() === $etag)) {
            http_response_code(304);
            header('ETag: ' . $etag);
            exit;
        }

        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        header('ETag: ' . $etag);
        header('Cache-Control: public, max-age=60, stale-while-revalidate=300');
        echo json_encode(['ok' => true] + $menu, JSON_UNESCAPED_UNICODE);
        exit;
    }

    private function requestEtag(): string
    {
        return $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';
    }
}
