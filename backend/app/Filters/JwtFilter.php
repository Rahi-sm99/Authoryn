<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Libraries\JwtLib;
use Exception;

class JwtFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getHeaderLine('Authorization');
        
        if (empty($header)) {
            return service('response')
                ->setJSON(['error' => 'Authorization header missing'])
                ->setStatusCode(401);
        }

        $token = str_replace('Bearer ', '', $header);
        $jwtLib = new JwtLib();

        try {
            $request->user = $jwtLib->validateToken($token);
            return $request;
        } catch (Exception $e) {
            return service('response')
                ->setJSON(['error' => $e->getMessage()])
                ->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing
    }
}
