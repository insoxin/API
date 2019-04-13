<?php
	$longUrl=trim($_GET['url']);
	$type=trim($_GET['type']);
	//如果没有网址自动加上 http://
	if(stripos($longUrl, '://')===false){
		$longUrl='http://'.$longUrl;
	}
	
// 	$longUrl='http://www.zzblo.com';
// 	$type='126.am';
	include "TinyUrl.class.php";
	$tu=new TinyUrl();
	$tu->url=$longUrl;
	
	switch ($type){
		case 't.cn':
			$tinyurl=$tu->createtcn();
			break;
		case 'dwz.cn':
			$tinyurl=$tu->createDwz();
			break;
		case '126.am':
			$tinyurl=$tu->create126am();
			break;
		case 'is.gd':
			$tinyurl=$tu->createisgd();
			break;
		default:
			$tinyurl=$tu->createtcn();
			break;
	}	
	
	
	
	if(!$tinyurl){
		responseMesg(0,$tu->error);
	}else{
		responseMesg(1,'success',$tinyurl);
	}
	
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
