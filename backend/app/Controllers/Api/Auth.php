<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use App\Models\TeacherModel;
use App\Libraries\JwtLib;
use Config\Database;

class Auth extends ResourceController
{
    use ResponseTrait;

    protected $userModel;
    protected $teacherModel;
    protected $jwtLib;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->teacherModel = new TeacherModel();
        $this->jwtLib = new JwtLib();
    }

    public function register()
    {
        $db = Database::connect();
        $db->transStart();

        try {
            $data = $this->request->getJSON(true);

            if (empty($data)) {
                return $this->failValidationError('Request body must be a valid JSON object.');
            }

            // User data validation
            $userData = [
                'email'      => $data['email'] ?? null,
                'first_name' => $data['first_name'] ?? null,
                'last_name'  => $data['last_name'] ?? null,
                'password'   => $data['password'] ?? null
            ];

            if (!$this->userModel->insert($userData)) {
                $db->transRollback();
                return $this->failValidationError($this->userModel->errors());
            }

            $userId = $this->userModel->getInsertID();

            // Teacher data validation
            $teacherData = [
                'user_id'         => $userId,
                'university_name' => $data['university_name'] ?? null,
                'gender'          => $data['gender'] ?? null,
                'year_joined'     => $data['year_joined'] ?? null,
            ];

            if (!$this->teacherModel->insert($teacherData)) {
                $db->transRollback();
                return $this->failValidationError($this->teacherModel->errors());
            }

            $db->transComplete();

            if ($db->transStatus() === false) {
                return $this->failServerError('Registration failed due to server error.');
            }

            return $this->respondCreated(['message' => 'Registration successful.', 'user_id' => $userId]);

        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }
    }

    public function login()
    {
        try {
            $data = $this->request->getJSON(true);
            
            if (!$data) {
                return $this->failValidationError('Invalid JSON payload.');
            }

            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;

            if (!$email || !$password) {
                return $this->failValidationError('Email and password are required.');
            }

            $user = $this->userModel->where('email', $email)->first();

            if (!$user || !password_verify($password, $user['password'])) {
                return $this->failUnauthorized('Invalid credentials.');
            }

            // Generate JWT
            $payload = [
                'id'    => $user['id'],
                'email' => $user['email'],
                'iat'   => time(),
                'exp'   => time() + (3600 * 24) // 24 hours
            ];

            $token = $this->jwtLib->generateToken($payload);

            return $this->respond([
                'message' => 'Login successful.',
                'token'   => $token,
                'user'    => [
                    'id'         => $user['id'],
                    'email'      => $user['email'],
                    'first_name' => $user['first_name'] ?? '',
                    'last_name'  => $user['last_name'] ?? ''
                ]
            ]);
        } catch (\Exception $e) {
            log_message('error', '[Auth::login] ' . $e->getMessage());
            return $this->failServerError('An unexpected error occurred during login. Check server logs.');
        }
    }
}
