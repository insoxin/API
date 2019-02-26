<?php
function xhtml_head()
{
    $name = NAME;
    $title = func_get_arg(0);
    echo <<<XHTML
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>{$title} - 〔{$name}〕</title>
        <link rel="stylesheet" href="./style.css">
    </head>
    <body>
        <div id="header">
	    我一直在开辟属于我的天空
        </div>

XHTML;
}

function xhtml_footer()
{
    echo <<<XHTML
        <div id="footer">
	    By：<a href="mailto:xiaoqidun@gmail.com">Xiaoqidun@Gmail.Com</a>
        </div>
    </body>
</html>

XHTML;
}

?>
