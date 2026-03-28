<?php

namespace App\Models;

use CodeIgniter\Model;

class TeacherModel extends Model
{
    protected $table            = 'teachers';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = ['user_id', 'university_name', 'gender', 'year_joined', 'created_at', 'updated_at'];

    // Validation rules
    protected $validationRules = [
        'user_id'         => 'required|numeric',
        'university_name' => 'required|min_length[3]|max_length[255]',
        'gender'          => 'required|in_list[Male,Female,Other]',
        'year_joined'     => 'required|numeric|exact_length[4]'
    ];
}
