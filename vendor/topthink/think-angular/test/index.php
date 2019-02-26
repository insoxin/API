<?php

require './common.php';

// 模拟用户列表
$data = [
    'title' => '首页',
    'list'  => [
        ['id' => 1, 'name' => 'user_1', 'email' => 'email_1@qq.com', 'status' => 1],
        ['id' => 2, 'name' => 'user_2', 'email' => 'email_2@qq.com', 'status' => 0],
        ['id' => 3, 'name' => 'user_3', 'email' => 'email_3@qq.com', 'status' => -1],
        ['id' => 4, 'name' => 'user_4', 'email' => 'email_4@qq.com', 'status' => 1],
        ['id' => 5, 'name' => 'user_5', 'email' => 'email_5@qq.com', 'status' => 1],
    ],
];

// 树状结构
$menus = [
    [
        'title' => '菜单1',
        'sub'   => [
            ['title' => '菜单1.1'],
            ['title' => '菜单1.2'],
            ['title' => '菜单1.3'],
            ['title' => '菜单1.4'],
        ],
    ],
    [
        'title' => '菜单2',
        'sub'   => [
            ['title' => '菜单2.1'],
            ['title' => '菜单2.2'],
            ['title' => '菜单2.3'],
            ['title' => '菜单2.4'],
        ],
    ],
    [
        'title' => '菜单3',
        'sub'   => [
            [
                'title' => '菜单3.1',
                'sub'   => [
                    ['title' => '菜单3.1.1'],
                    ['title' => '菜单3.1.2'],
                    [
                        'title' => '菜单3.1.3',
                        'sub'   => [
                            ['title' => '菜单3.1.3.1'],
                            ['title' => '菜单3.1.3.2'],
                        ],
                    ],
                ],
            ],
            ['title' => '菜单3.2'],
            ['title' => '菜单3.3'],
            ['title' => '菜单3.4'],
        ],
    ],
];

$view->assign('pagecount', 100);
$view->assign('p', isset($_GET['p']) ? $_GET['p'] : 1);
$view->assign('page', function ($p) {
    return 'index.php?p=' . $p;
});

// 向模板引擎设置数据
$view->assign($data);
$view->assign('start_time', $start_time);
$view->assign('menus', $menus);

// 测试php-model标签转移双引号
$view->assign('name', '"php" and "think-angular"');

// 输出解析结果
$view->display('index');

// 返回输出结果
// $html = $view->fetch('index');
// echo $html;

// 获取混编代码
// $php_code = $view->compiler('index');
