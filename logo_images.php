<?php

file_put_contents('logo.txt',$_SERVER['HTTP_REFERER']);

header("Content-type:image/jpeg");

$img=imagecreatefromjpeg("logo.jpg");

imagejpeg($img);

imagedestroy($img);

?>