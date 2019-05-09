<?php
/**
 */
include 'core/main.php';
$qq = $_GET['qq'];
if (isset($_GET['qq'])){
    check_qq($qq);
}else{
    sysmsg("http://ip/?qq=",'姬长信api','使用方法');
}
########################################################################################################################
$qqinfo = curl_get('http://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins='.$qq);
$qqinfo = trim($qqinfo,'portraitCallBack');
$qqinfo = ltrim($qqinfo,"({\"$qq\":");
$qqinfo = rtrim($qqinfo,')}');
$qqinfo = json_decode($qqinfo);
########################################################################################################################
$qq_nickname = $qqinfo['6'];
$qq_logo = $qqinfo['0'];
$info = array(
    'name' => $qq_nickname,
    'img' => $qq_logo
);
########################################################################################################################
//输出！
$api = json_encode($info);
echo $api;
