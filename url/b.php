<?php

header("Content-Type:text/html;charset=UTF-8");

date_default_timezone_set("PRC");

$url = "https://api.isoyu.com/";

$result = file_get_contents("https://api.isoyu.com/url/create.php?type=tcn&url=".$url);

$arr=json_decode($result,true);

if ($arr['code']==1) {

    echo $arr['data'];

} else {

    echo $arr['msg'];

}

?>