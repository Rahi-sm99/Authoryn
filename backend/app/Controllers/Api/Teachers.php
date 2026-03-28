<?php

namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\TeacherModel;

class Teachers extends ResourceController
{
    use ResponseTrait;

    protected $teacherModel;

    public function __construct()
    {
        $this->teacherModel = new TeacherModel();
    }

    public function index()
    {
        // Join with auth_user to get the full profile
        $teachers = $this->teacherModel
            ->select('teachers.id, teachers.user_id, teachers.university_name, teachers.gender, teachers.year_joined, auth_user.email, auth_user.first_name, auth_user.last_name')
            ->join('auth_user', 'auth_user.id = teachers.user_id')
            ->findAll();

        return $this->respond($teachers);
    }
}
