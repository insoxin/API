<?php 
	$shortUrl=trim($_GET['url']);
// 	$shortUrl=$_GET['u'];
	include "TinyUrl.class.php";
	$tu=new TinyUrl();
	$tu->url=$shortUrl;

	//分辨出 接收的长网址的类型
	preg_match('/.*(dwz.cn|t.cn|126.am).*/', $shortUrl, $matche);
	if(!isset($matche[1])){
		responseMesg(0,'长网址不存在，暂时只支持t.cn,126.am,dwz.cn');
	}
	switch ($matche[1]){
		case 't.cn':
			$longUrl=$tu->expandtcn();	
			break;
		case 'dwz.cn':
			$longUrl=$tu->expandDwz();
			break;
		case '126.am':
			$longUrl=$tu->expand126am();
			break;
		default:
			responseMesg(0,'长网址不存在，暂时只支持t.cn,126.am,dwz.cn');
			break;
	}
	
	if(!$longUrl){
		responseMesg(0,$tu->error);
	}
	
	responseMesg(1,'success',$longUrl);
	
	//返回json信息
	function responseMesg($code=0,$message,$data=null){
		$arr=array();
		$arr['code']=$code;
		$arr['message']=$message;
		$arr['data']=$data;
		echo json_encode($arr);
		//结束
		exit();
	}
