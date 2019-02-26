<?php
$files=glob("ip/images/*");
$rand=rand(0,count($files)-1);
echo "<img src=\"{$files[$rand]}\" />";
?>