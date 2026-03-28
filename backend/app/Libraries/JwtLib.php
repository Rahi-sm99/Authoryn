<?php

namespace App\Libraries;

use Exception;

/**
 * A minimalist JWT implementation for CI4.
 * This class handles encoding and decoding JWTs using HS256.
 */
class JwtLib
{
    private $key;
    private $algo;

    public function __construct()
    {
        $this->key = getenv('JWT_SECRET') ?: 'default_secret'; // Fallback
        $this->algo = getenv('JWT_ALGORITHM') ?: 'HS256';
    }

    public function generateToken(array $payload)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => $this->algo]);
        $payload_encoded = json_encode($payload);

        $base64UrlHeader = $this->base64UrlEncode($header);
        $base64UrlPayload = $this->base64UrlEncode($payload_encoded);

        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $this->key, true);
        $base64UrlSignature = $this->base64UrlEncode($signature);

        return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    }

    public function validateToken(string $token)
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            throw new Exception("Invalid token format.");
        }

        list($header_b64, $payload_b64, $signature_b64) = $parts;

        $signature = $this->base64UrlDecode($signature_b64);
        $expected_signature = hash_hmac('sha256', $header_b64 . "." . $payload_b64, $this->key, true);

        if (!hash_equals($signature, $expected_signature)) {
            throw new Exception("Signature verification failed.");
        }

        $payload = json_decode($this->base64UrlDecode($payload_b64), true);

        // Check expiration
        if (isset($payload['exp']) && $payload['exp'] < time()) {
            throw new Exception("Token has expired.");
        }

        return $payload;
    }

    private function base64UrlEncode($data)
    {
        $b64 = base64_encode($data);
        if ($b64 === false) {
            return false;
        }
        $url = strtr($b64, '+/', '-_');
        return rtrim($url, '=');
    }

    private function base64UrlDecode($data)
    {
        $url = strtr($data, '-_', '+/');
        $len = strlen($url) % 4;
        if ($len) {
            $url .= str_repeat('=', 4 - $len);
        }
        return base64_decode($url);
    }
}
