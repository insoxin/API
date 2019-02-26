<?php
header('content-type:text/html;charset=utf8');
$ch = curl_init();
//加@符号curl就会把它当成是文件上传处理
$data = array('Filedata'=>'@'. dirname(__FILE__).'/2.png');
curl_setopt($ch,CURLOPT_URL,"http://tool.chinaz.com/ajaxseo.aspx?t=pload");
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_POST,true);
curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
$result=curl_exec($ch);
curl_close($ch);
preg_match_all("/\<font (.*)\>(.*)\<\/font\>/ius" , $result , $match);
$url=$match[2][0];
 
/* 生成短网址 */
$ch=curl_init();
curl_setopt($ch,CURLOPT_URL,'http://dwz.cn/create.php');
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch,CURLOPT_POST,1);
curl_setopt($ch,CURLOPT_POSTFIELDS,'url='.urlencode($url));
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
$data=curl_exec($ch);
curl_close($ch);
$a=json_decode($data,true);
echo  '<a href="'.$a['tinyurl'].'">'.$a['tinyurl'].'</a>';
?>