<?php
require './common.php';

$view->assign('title', '博客');

// 文章分类
$category = load('blog_category');
$view->assign('category', $category);

// 文章列表
$list = load('blog_list');
$view->assign('list', $list);

// 分页
$view->assign('pagecount', 100);
$view->assign('p', isset($_GET['p']) ? $_GET['p'] : 1);
$view->assign('page', function ($p) {
    return 'blog.php?p=' . $p;
});

// 输出解析结果
$view->display('blog');

// 返回输出结果
// $html = $view->fetch('index');
// echo $html;

// 获取混编代码
// $php_code = $view->compiler('index');
