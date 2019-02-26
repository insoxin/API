<?php
/*
	姬长信必应日图 API 精简版(LLBDPA)
	版本 1.3 (第三方) Version: 1.3 (Third Party) 中国专用版本，跟随 GMT+08 ,更省心
	源码 Little_Qiu,感谢 GPlane,精简 Flyfish.
*/
function b() {
    $ago = '0'; // 设定图片的时间(几天前，整数，0为今天，1为昨天，2为前天,-1为明天,仅当日16时后有效)
    //非专业用户，请不要更改以下文本
	$data = json_decode(file_get_contents('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=$ago&n=1'), true); // 从 Bing 获取日图 JSON
    	return "https://cn.bing.com".$data['images'][0]['url']; // 返回 URL
};
$url = b(); 
header("Location:$url"); // 302 跳转
?>