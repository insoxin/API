<?php
header("Access-Control-Allow-Origin: *");
//入口文件绑定模块名
//define('BIND_MODULE','api');
define('APP_PATH', __DIR__ . '/apps/');
// 加载框架引导文件
require __DIR__ . '/thinkphp/start.php';
