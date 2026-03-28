<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use Config\Database;

class Health extends ResourceController
{
    use ResponseTrait;

    public function check()
    {
        $db = Database::connect();
        $tables = $db->listTables();
        
        $required = ['auth_user', 'teachers'];
        $missing = [];

        foreach ($required as $t) {
            if (!in_array($t, $tables)) {
                $missing[] = $t;
            }
        }

        return $this->respond([
            'status' => 'online',
            'database' => $db->connect() ? 'connected' : 'failed',
            'tables_found' => $tables,
            'missing_tables' => $missing,
            'ready' => empty($missing)
        ]);
    }
}
