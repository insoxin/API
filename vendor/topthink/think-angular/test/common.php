<?php

use think\angular\Angular;
header('Content-Type: text/html; charset=utf-8;');
ini_set("display_errors", "On");
error_reporting(E_ALL | E_STRICT);

// 开始时间
$start_time = microtime(true);

require '../src/Angular.php';

// 配置
$config = [
    'debug'            => true, // 是否开启调试, 开启调试会实时生成缓存
    'tpl_path'         => './view/', // 模板根目录
    'tpl_suffix'       => '.html', // 模板后缀
    'tpl_cache_path'   => './cache/', // 模板缓存目录
    'tpl_cache_suffix' => '.php', // 模板后缀
    'attr'             => 'php-', // 标签前缀
    'max_tag'          => 10000, // 标签的最大解析次数
];

// 自定义扩展, 打印变量的值
Angular::extend('dump', function ($content, $param, $angular) {
    $old = $param['html'];
    $new = '<pre>';
    unset($param[0], $param[1], $param[2], $param[3], $param[4], $param[5]);
    $new .= '<?php var_dump(' . $param['value'] . ');  ?>';
    // var_dump($angular->config);
    $new .= '</pre>';
    return str_replace($old, $new, $content);
});

// 自定义扩展, 变量+1
Angular::extend('inc', function ($content, $param, $angular) {
    $old = $param['html'];
    $new = '<?php ' . $param['value'] . '++; ?>';
    $new .= Angular::removeExp($old, $param['exp']);
    return str_replace($old, $new, $content);
});

// 自定义扩展, 变量-1
Angular::extend('dec', function ($content, $param, $angular) {
    $old = $param['html'];
    $new = '<?php ' . $param['value'] . '--; ?>';
    $new .= Angular::removeExp($old, $param['exp']);
    return str_replace($old, $new, $content);
});


function load($key)
{
    return include './data/' . $key . '.php';
}

// 实例化
$view = new Angular($config);

// 导航
$navs = load('navs');
$view->assign('navs', $navs);
$view->assign('start_time', $start_time);
