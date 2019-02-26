<?php
/**
 * API主题是为了重推https://api.isoyu.com/而产生的一款简洁css3大气时尚摄影杂志响应式typecho模板她的一大亮点就是调用//api.isoyu.com/mm_images.php随机妹子生活照API

 *

 * @package API Theme

 * @author 姬长信

 * @version 1.0

 * @link https://blog.isoyu.com/
 */
define("TOKEN", "wxapi"); //定义常量
$wechatObj = new wechatCallbackapiTest();//实例化类                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
if (isset($_GET['echostr'])) { //如果随机字符串存在
    $wechatObj->valid(); //执行wechatObj类下的valid函数
}else{
    $wechatObj->responseMsg(); //如果未得到随机字符串，执行wechatObj类下的responseMsg函数
}

class wechatCallbackapiTest  //定义类
{
    public function valid()  //定义valid函数
    {
        $echoStr = $_GET["echostr"];  //定义变量$echoStr 为获得的字符串
        if($this->checkSignature()){  //调用当前类里的chekSignature函数
            echo $echoStr;  //输出echoStr的值
            exit;
        }
    }

    private function checkSignature()  //定义checkSignature函数
    {
        $signature = $_GET["signature"];  //定义变量signature为获得的signature
        $timestamp = $_GET["timestamp"];  //获取时间戳
        $nonce = $_GET["nonce"];          //获取随机数

        $token = TOKEN; //获得token
        $tmpArr = array($token, $timestamp, $nonce);//定义数组tmpArr包含token值、时间戳、随机数
        sort($tmpArr, SORT_STRING);  //对数组进行升序排列
        $tmpStr = implode( $tmpArr );  //将数组组合为字符串
        $tmpStr = sha1( $tmpStr );  //计算字符串的sha1散列

        if( $tmpStr == $signature ){ //如果计算的散列与获取的加密签名一致
            return true;  //返回真
        }else{
            return false;  //不一致，返回假
        }
    }

    public function responseMsg()  //定义函数 responseMsg
    {
        $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];  //首先接收上述原始POST数据

        if (!empty($postStr)){  //如果接收到的数据不为空
            $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);  //将数据载入对象中，对象名为SimpleXMLElement，将CDATA合并为文本节点
            $fromUsername = $postObj->FromUserName;  //取得XML数据包中FromUserName的值，赋给变量fromUsername
            $toUsername = $postObj->ToUserName;  //取得XML数据包中ToUsername的值，赋给变量toUsername
            $keyword = trim($postObj->Content);  //取得XML数据包中content的值，并移除字符串两侧的值
            $time = time();  //取得XML数据包中的time的值
            $textTpl = "<xml>
                        <ToUserName><![CDATA[%s]]></ToUserName>
                        <FromUserName><![CDATA[%s]]></FromUserName>
                        <CreateTime>%s</CreateTime>
                        <MsgType><![CDATA[%s]]></MsgType>
                        <Content><![CDATA[%s]]></Content>
                        <FuncFlag>0</FuncFlag>
                        </xml>";//将变量依次赋给新的XML变量textTpl，注意里边将to和from调换 为什么多个%s？
            if($keyword == "?" || $keyword == "？")  //判断用户发送的关键词是不是问号
            {
                $msgType = "text";  //数据类型为文本方式text
                $contentStr = date("Y-m-d H:i:s",time());  //回复的内为未当前时间
                $resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);  //sprintf是把前边字符串里的%作为参数传递，第一个textTpl是前边定义的一串xml，接下来5个参数是要填充进XML中进行替换的内容
                echo $resultStr;  //输出XML，这时候微信服务器就会获得结果，并展示给用户
            }
        }else{  //如果接收到的数据是空的
            echo "";  //返回一个空值即可
            exit;
        }
    }
}
?>