<?php

header('content-type:application:json;charset=utf8');  
//header('Access-Control-Allow-Origin:https://blog.isoyu.com');
header('Access-Control-Allow-Methods:*');  
header('Access-Control-Allow-Headers:x-requested-with,content-type'); 

$allow_origin = array(  
    'https://api.isoyu.com/',
    'http://192.168.1.2:800',
	'localhost:800'
);

$origin = isset($_SERVER['HTTP_ORIGIN'])? $_SERVER['HTTP_ORIGIN'] : '';

if(in_array($origin, $allow_origin)){  
    header('Access-Control-Allow-Origin:'.$origin);       
}

//入口文件绑定模块名
//define('BIND_MODULE','api');

define('APP_PATH', __DIR__ . '/../apps/');
// 加载框架引导文件
require __DIR__ . '/../thinkphp/start.php';
