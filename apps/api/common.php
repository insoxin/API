<?php

// 应用公共文件

/**
 * 获取用户ip
 * @return array|false|string
 */
 function getRemoteIPAddress() {
    global $ip;
    if (getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if(getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if(getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
    else $ip = "Unknow";
    return $ip;
}

function mobile_curl($url,$status=false){
    $curl = curl_init ();
    curl_setopt ( $curl, CURLOPT_URL, $url);
    curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
    curl_setopt ( $curl, CURLOPT_TIMEOUT,1000 );
    //curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36');
    curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4');
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

/**
 * banner api地址
 * @return string
 */
function banner_url(){
    $url="http://c.m.163.com/nc/article/headline/list/0-10.html?from=toutiao&passport=&devId";
    return $url;
}

/**
 * 新闻列表url
 * @param $news_type
 * @param $page
 * @return string
 */
function new_list_url($news_type,$page){
    $url="http://c.m.163.com/nc/article/headline/{$news_type}/{$page}-10.html";
    return $url;
}

/**
 * 新闻详情
 * @param $id
 * @return string
 */
function new_detail_url($id){
    $url="http://c.m.163.com/nc/article/{$id}/full.html";
    return $url;

}

/**
 * 当地新闻列表
 * @param $name
 * @param $page
 * @return string
 */
 function local_news_url($name,$page){
    $url="http://3g.163.com/touch/jsonp/article/local/{$name}/{$page}-10.html";
    return $url;
}

