<?php
require './common.php';

$view->assign('title', '图片');

// 分类
$category = load('pic_category');
$view->assign('category', $category);

// 数据列表
$list = load('pic_list');
$view->assign('list', $list);

$view->assign('pagecount', 100);
$view->assign('p', isset($_GET['p']) ? $_GET['p'] : 1);
$view->assign('page', function ($p) {
    return 'blog.php?p=' . $p;
});

// 输出解析结果
$view->display('pic');

// 返回输出结果
// $html = $view->fetch('index');
// echo $html;

// 获取混编代码
// $php_code = $view->compiler('index');
