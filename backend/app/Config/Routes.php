<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('api', ['namespace' => 'App\Controllers\Api'], function($routes) {
    // Public routes
    $routes->post('register', 'Auth::register');
    $routes->post('login', 'Auth::login');
    $routes->get('health', 'Health::check');

    // Protected routes
    // Filter is applied via Config/Filters.php
    $routes->get('users', 'Users::index');
    $routes->get('teachers', 'Teachers::index');
});
