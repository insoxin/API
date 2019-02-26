<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

/*
 *
* @param unknown $url
*/
function HttpGet($url,$status=false){
    $curl = curl_init ();
    curl_setopt ( $curl, CURLOPT_URL, $url);
    curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt ( $curl, CURLOPT_TIMEOUT,1000 );
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36');
    //curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4');
    if($status){
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Accept:application','X-Request:JSON','X-Requested-With:XMLHttpRequest'));
    }

    //如果用的协议是https则打开鞋面这个注释
    curl_setopt ( $curl, CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

    $res = curl_exec ( $curl );
    curl_close ( $curl );
    return $res;
}





function Http_Spider($url) {
    $ch = curl_init();
    $ip = '115.239.211.112';  //百度蜘蛛
    $timeout = 15;
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_TIMEOUT, $timeout);
    //伪造百度蜘蛛IP
    curl_setopt($ch,CURLOPT_HTTPHEADER,array('X-FORWARDED-FOR:'.$ip.'','CLIENT-IP:'.$ip.''));
    //伪造百度蜘蛛头部
    curl_setopt($ch,CURLOPT_USERAGENT,"Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)");
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_HEADER,0);
    curl_setopt ($ch, CURLOPT_REFERER, "http://www.baidu.com/");   //构造来路
    curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
    $content = curl_exec($ch);
    return $content;
}

error_reporting(E_ERROR | E_WARNING | E_PARSE);