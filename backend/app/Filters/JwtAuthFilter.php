<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\JwtLib;
use Exception;

class JwtAuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');

        if (!$authHeader) {
            return response()
                ->setStatusCode(401)
                ->setJSON(['error' => 'No token provided.']);
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $jwtLib = new JwtLib();
            $payload = $jwtLib->validateToken($token);
            
            // Set user data in request object to use in controllers
            $request->user = $payload;

        } catch (Exception $e) {
            return response()
                ->setStatusCode(401)
                ->setJSON(['error' => 'Invalid token: ' . $e->getMessage()]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing
    }
}
