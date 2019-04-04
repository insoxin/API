<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
if (strpos($ua, 'MicroMessenger')) {
    $type = 'wepay';
    $name = '微信支付';
    //微信支付链接
    $url = 'wxp://f2f0MzlE0FXHE7TcCAzdoTzRP1XfZdTMpY-h';
    $icon_img = '<img src="/wechatpay.png" width="48px" height="48px" alt="'.$name.'">';
}
elseif (strpos($ua, 'AlipayClient')) {
    //支付宝链接
    $url = 'HTTPS://QR.ALIPAY.COM/FKX07382A51AFITA1S8J4F';
    header('location: ' . $url);
}
elseif (strpos($ua, 'QQ/')) {
    $type = 'qq';
    $name = 'QQ钱包支付';
    //QQ钱包支付链接
    $url = 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=192666378&ac=8FC88A360B26FC862851799E7A68AE95B30922213E3C35AF4839AEAF68AA4121&n=陳奕迅所長&f=wallet';
    $icon_img = '<img src="/qqpay.png" width="48px" height="48px" alt="'.$name.'">';
}
else {
    $type = 'other';
    $name = '打赏小姬姬';
    $url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $icon_img = '<img src="//api.isoyu.com/ARU_GIF_S.php" width="48px" height="48px" alt="'.$name.'">';
}
$qr_img = '<img src="https://api.isoyu.com/qr/?m=0&e=L&p=8&url='.urlencode($url).'">';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$name?></title>
    <style type="text/css">
        * {margin: auto;padding: 0;border: 0;}
        html {-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%}
        body {font-family: -apple-system, SF UI Text, Arial, Microsoft YaHei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;color: #333;}
        img {max-width: 100%;}
        h3 {padding: 10px;}
        .container {text-align: center;}
        .title {padding: 2em 0;background-color: #fff;}
        .content {padding: 2em 1em;color: #fff;}
        .wepay {background-color: #23ac38;}
        .qq {background-color: #4c97d5;}
        .other {background-color: #ff7055;}
    </style>
</head>
<body class="<?=$type?>">
    <div class="container">
        <div class="title"><?=$icon_img?><h1><?=$name?></h1></div>
        <div class="content"><?=$type=='other'?$qr_img.'<h3>请使用支付宝、微信、QQ客户端扫码付款</h3>':$qr_img.'<h3>扫描或长按识别二维码，向TA付款</h3>'?></div>
    </div>
</body>
</html>