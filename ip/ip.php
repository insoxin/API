<?php
header("Content-type: image/png");/*声明这是一张图片*/
$width=350;/*图片长度*/
$height=120;/*图片高度*/
//$_GET["editname"]
$size=11;/*字体大小*/
$angle=0;/*旋转度数*/
$font = "stlt.ttf";/*设置字体*/
$useragent=$useragent=$_SERVER['HTTP_USER_AGENT'];
$signature=$_GET["signature"];//URL传过来的参数
/*设置图片属性*/
/*$im = imagecreatetruecolor($width, $height);*/
$im = imagecreatefromjpeg("logo.png");
 
$white = imagecolorallocate($im, 255, 255, 255);/*背景颜色*/
$grey =  imagecolorallocate($im, 255, 0, 0);/*字体颜色*/
$black = imagecolorallocate($im, 0, 0, 0);
 
/*取出客户端IP地址及所在地区*/
function address($ip) {
    $info = json_decode(file_get_contents('http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip='.$ip.'&format=json'), false);
    if ($info ->ret == 1) {
        if ($info ->province != $info ->city) {
            return $info ->country.",".$info ->province."(".$info ->city.")  ".$info ->district."  ".$info ->desc;
        } else {
            return $info ->country.",".$info ->province."  ".$info ->district."  ".$info ->desc;
        }
    } else {
        return '地球';
    }
}
/*取得客户端浏览器版本*/
function browser($ua) {
    if (stripos($ua, "Googlebot")) {
        $browser = "谷歌蜘蛛";
    }
    elseif(stripos($ua, "Baiduspider") !== false) {
        $browser = "百度蜘蛛";
    }
    elseif(stripos($ua, "Yahoo!") !== false) {
        $browser = "雅虎蜘蛛";
    }
    elseif(stripos($ua, "bingbot")) {
        $browser = "必应蜘蛛";
    }
    elseif(stripos($ua, "YRSpider")) {
        $browser = "云壤蜘蛛";
    }
    elseif(stripos($ua, "Yeti") !== false) {
        $browser = "Naver蜘蛛";
    }
    elseif(stripos($ua, "Maxthon")) {
        if (stripos($ua, "AppleWebKit")) {
            $browser = "遨游浏览器(极速模式)";
        }
        elseif(stripos($ua, "Trident")) {
            $browser = "遨游浏览器(兼容模式)";
        }
        elseif(stripos($ua, "MAXTHON 2.0")) {
            $browser = "遨游浏览器2.0";
        }
    }
    elseif(stripos($ua, "Firefox")) {
        $browser = "火狐浏览器";
    }
    elseif(stripos($ua, "Opera") == 0 && stripos($ua, "Presto")) {
        $browser = "Opera";
    }
    elseif(stripos($ua, "BIDUBrowser")) {
        if (stripos($ua, "Trident")) {
            $browser = "百度浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebKit")) {
            $browser = "百度浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "Ruibin")) {
        $browser = "瑞影浏览器";
    }
    elseif(stripos($ua, "qihu theworld")) {
        if (stripos($ua, "Trident")) {
            $browser = "世界之窗浏览器";
        }
        elseif(stripos($ua, "AppleWebKit")) {
            $browser = "世界之窗浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "MetaSr")) {
        if (stripos($ua, "Trident")) {
            $browser = "搜狗高速浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebKit")) {
            $browser = "搜狗高速浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "LBBROWSER")) {
        if (stripos($ua, "Trident")) {
            $browser = "猎豹浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebKit")) {
            $browser = "猎豹浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "YLMFBR")) {
        $browser = "115浏览器";
    }
    elseif(stripos($ua, "QQBrowser")) {
        if (stripos($ua, "Trident")) {
            $browser = "QQ浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebKit")) {
            $browser = "QQ浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "TencentTraveler")) {
        $browser = "腾讯TT浏览器";
    }
    elseif(stripos($ua, "TaoBrowser")) {
        if (stripos($ua, "Trident")) {
            $browser = "淘宝浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebkit")) {
            $browser = "淘宝浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "CoolNovo")) {
        $browser = "枫树浏览器";
    }
    elseif(stripos($ua, "SaaYaa")) {
        $browser = "闪游浏览器";
    }
    elseif(stripos($ua, "360SE")) {
        $browser = "360安全浏览器";
    }
    elseif(stripos($ua, "360EE")) {
        if (stripos($ua, "Trident")) {
            $browser = "360极速浏览器(兼容模式)";
        }
        elseif(stripos($ua, "AppleWebkit")) {
            $browser = "360极速浏览器(极速模式)";
        }
    }
    elseif(stripos($ua, "Konqueror")) {
        $browser = "Konqueror";
    }
    elseif(stripos($ua, "Chrome")) {
        $browser = "谷歌浏览器";
    }
    elseif(stripos($ua, "Safari")) {
        $browser = "Safari";
    }
    elseif(stripos($ua, "MSIE")) {
        $ver = explode(";", substr($ua, stripos($ua, "MSIE") + 5, 4));
        $ver = $ver[0];
        $browser = "IE ".$ver;
    }
    elseif(stripos($ua, "UCWEB")) {
        $browser = "UCWEB浏览器";
    }
    elseif(stripos($ua, "WAP")) {
        $browser = "Mobile浏览器";
    } else {
        $browser = $ua;
    }
    if ($browser == '') $browser = $ua;
    return $browser;
}
/*取得操作系统版本*/
function os($ua) {
    $os = "";
    if (stripos($ua, "Googlebot")) {
        $os = "谷歌蜘蛛";
    }
    elseif(stripos($ua, "Baiduspider") !== false) {
        $os = "百度蜘蛛";
    }
    elseif(stripos($ua, "Yahoo!") !== false) {
        $os = "雅虎蜘蛛";
    }
    elseif(stripos($ua, "bingbot")) {
        $os = "必应蜘蛛";
    }
    elseif(stripos($ua, "YRSpider")) {
        $os = "云壤蜘蛛";
    }
    elseif(stripos($ua, "Yeti") !== false) {
        $os = "Naver蜘蛛";
    }
    elseif(stripos($ua, "Windows NT")) {
        switch (substr($ua, stripos($ua, "Windows NT") + 11, 3)) {
        case 5.0:
            {
                $os = "Windows 2000";
                break;
            }
        case 5.1:
            {
                $os = "Windows XP";
                break;
            }
        case 5.2:
            {
                $os = "Windows 2003";
                break;
            }
        case 6.0:
            {
                $os = "Windows Vista/2008";
                break;
            }
        case 6.1:
            {
                $os = "Windows 7";
                break;
            }
        case 6.2:
            {
                $os = "Windows 8";
                break;
            }
        default:
            {
                $os = "Windows";
                break;
            }
        }
        if (stripos($ua, "WOW64")) {
            $os.= "(X64)";
        } else {
            $os.= "(X86)";
        }
    }
    elseif(stripos($ua, "Android")) {
        $os = substr($ua, stripos($ua, "Android"), 11);
    }
    elseif(stripos($ua, "Linux")) {
        if (stripos($ua, "i686")) {
            $os = "Linux X86";
        } else {
            $os = "Linux";
        }
        if (stripos($ua, "X11")) {
            $os.= "(X Window)";
        }
    }
    elseif(stripos($ua, "Macintosh")) {
        $os = "Mac";
    }
    elseif(stripos($ua, "IOS")) {
        $os = "iOS";
    }
    elseif(stripos($ua, "ZTE")) {
        $os = "ZTE";
    }
    elseif(stripos($ua, "Windows 98")) {
        $os = "Windows 98";
    } else {
        $os = "未知系统";
    }
    return $os;
}
 
imagettftext($im, $size, $angle, 10, 15, $grey, $font, "当前地址：".address($_SERVER['REMOTE_ADDR']));
imagettftext($im, $size, $angle, 10, 35, $grey, $font, "当前IP：".$_SERVER['REMOTE_ADDR']);
imagettftext($im, $size, $angle, 10, 55, $grey, $font, "当前浏览器：".browser($useragent));
imagettftext($im, $size, $angle, 10, 75, $grey, $font, "当前操作系统：".os($useragent));
imagettftext($im, $size, $angle, 10, 95, $grey, $font, $signature!=""?$signature:"　　姬长信 blog.isoyu.com");
 
 
imagepng($im);
imagedestroy($im);
?>