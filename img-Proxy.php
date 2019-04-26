<?php

header("Content-Type:image/png");//设置本文档将出输出的格式为png图片
$string = $_SERVER["QUERY_STRING"]; //为什么要这样，而不用$_GET呢？因为可能图片地址中有&，那样就会被分割为多个参数，就会出错了。
/*换一张空白图片，如果遇到错误，需要用上*/
$im = imagecreate(600, 300);
$black = imagecolorallocate($im, 100, 100, 100); //图片背景
$white = imagecolorallocate($im, 255, 255, 255);
/*获取图片的真实地址*/
$url = strstr($string, "http");
if (!$url) {
    imagettftext($im, 18, 0, 200, 100, $white, "stlt.ttf", "Error 001");
    imagettftext($im, 14, 0, 150, 150, $white, "stlt.ttf", "请在参数中输入图片的绝对地址。");
    imagepng($im);
    exit();
}
@$imgString = urlOpen($url);
if ($imgString == "") {
    imagettftext($im, 18, 0, 200, 100, $white, "stlt.ttf", "Error 002");
    imagettftext($im, 14, 0, 70, 150, $white, "stlt.ttf", "加载远程图片失败，请确认图片的地址能正常访问。");
    imagepng($im);
    exit();
}
/*如果没有错误*/
$im = imagecreatefromstring($imgString);//上面已经把图片的内容拿到了，直接用它生成一张图片
$white = imagecolorallocate($im, 255, 255, 255);
/*加上水印*/
//imagettftext($im, 12, 0, 20, 20, $white, "stlt.ttf", "姬长信API");
imagepng($im);//输出最终图片

/*通用远程GET POST函数*/
function urlOpen($url, $data = null, $ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16A366 INSO/1.0(0x16070321) NetType/WIFI Language/zh_CN')
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $ua);
    if ($data) {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $content = curl_exec($ch);
    curl_close($ch);
    return $content;
}
?>
