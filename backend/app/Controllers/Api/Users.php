<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;

class Users extends ResourceController
{
    use ResponseTrait;

    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function index()
    {
        // Return all users excluding passwords
        $users = $this->userModel->select('id, email, first_name, last_name, created_at, updated_at')->findAll();
        return $this->respond($users);
    }
}
