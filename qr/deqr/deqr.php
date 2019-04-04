<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: text/html; charset=utf-8"); 

include_once('./lib/QrReader.php');

$data = Array();
$data['status'] = 0;
$gstatus = true;

if( count($_GET)==0 && count($_POST)==0 ){
	$data['msg'] = "请传入二维码地址";
}else{
	if( $_SERVER['REQUEST_METHOD'] == 'GET' ){
		if( !empty( $_GET["imgurl"] ) ){
			$imgurl = $_GET["imgurl"];
		}else{
			$gstatus = false;
		}
	}else if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
		if( !empty( $_POST["imgurl"] ) ){
			$imgurl = $_POST["imgurl"];
		}else{
			$gstatus = false;
		}
	}

	if (!$gstatus) {
		$data['msg'] = "二维码地址为空";
	}else if( @exif_imagetype($imgurl) != IMAGETYPE_PNG 		// php.ini里面开启: extension=php_exif.dll
			&& @exif_imagetype($imgurl) != IMAGETYPE_JPEG 
			&& @exif_imagetype($imgurl) != IMAGETYPE_BMP 
			&& @exif_imagetype($imgurl) != IMAGETYPE_GIF ){
		$data['msg'] = "请传入图片格式，eg:jpg、jpeg、png、bmp、gif";
	}else if(!@fopen( $imgurl, 'r' )){
		$data['msg'] = "请传入正确的二维码";
	}else{
		$qrcode = new QrReader($imgurl);  //图片路径
		$text = $qrcode->text(); //返回识别后的文本
		if(!$text){
			$data['msg'] = "解析失败";
		}else{
			$data['status'] = 1;
			$data['msg'] = "解析成功";
			$data['qrtext'] = $text;
		}
	}

}

function jsonData($data){
	// $json = Array('status'=>$state, 'msg'=>$msg, 'qrtext'=>$data);
	return json_encode($data, JSON_UNESCAPED_UNICODE);
}

echo jsonData($data);

?>