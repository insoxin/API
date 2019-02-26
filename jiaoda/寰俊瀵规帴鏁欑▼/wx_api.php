<?php
/**
 * API主题是为了重推https://api.isoyu.com/而产生的一款简洁css3大气时尚摄影杂志响应式typecho模板她的一大亮点就是调用//api.isoyu.com/mm_images.php随机妹子生活照API

 *

 * @package API Theme

 * @author 姬长信

 * @version 1.0

 * @link https://blog.isoyu.com/
 */

//define your token
//weixinabc是一个token,是一个令牌
define("TOKEN", "wxapi");
$wechatObj = new wechatCallbackapiTest();

$wechatObj->responseMsg();
//$wechatObj->valid();
//exit;

class wechatCallbackapiTest
{
	public function valid()
    {
        $echoStr = $_GET["echostr"];


        if($this->checkSignature()){
        	echo $echoStr;
        	exit;
        }
    }


    public function responseMsg()
    {

		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];


		if (!empty($postStr)){

                libxml_disable_entity_loader(true);
              	$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
                $fromUsername = $postObj->FromUserName;
                $toUsername = $postObj->ToUserName;
                $keyword = trim($postObj->Content);

				$event = $postObj->Event;			
                $time = time();
                $textTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[%s]]></MsgType>
							<Content><![CDATA[%s]]></Content>
							<FuncFlag>0</FuncFlag>
							</xml>";    
				


				switch($postObj->MsgType)
				{
					case 'event':

						if($event == 'subscribe')
						{
						//关注后的回复
												$contentStr = "欢迎关注<?php $this->options->title() ?>,<?php $this->options->description() ?>,输入【关键字】即可获取相关内容";


							$msgType = 'text';
							$textTpl = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
							echo $textTpl;

						}
						break;
					case 'text':
						{
							$newsTpl = "<xml>
							<ToUserName><![CDATA[%s]]></ToUserName>
							<FromUserName><![CDATA[%s]]></FromUserName>
							<CreateTime>%s</CreateTime>
							<MsgType><![CDATA[news]]></MsgType>
							<ArticleCount>1</ArticleCount>
							<Articles>
							<item>
							<Title><![CDATA[%s]]></Title> 
							<Description><![CDATA[%s]]></Description>
							<PicUrl><![CDATA[%s]]></PicUrl>
							<Url><![CDATA[%s]]></Url>
							</item>							
							</Articles>
							</xml>";	
 						if($keyword<>"")
						{
										$title = '您要看的《'.$keyword.'》,给您找到以下结果：';
										
										$des1 ="";
										//图片地址
										$picUrl1 ="https://api.isoyu.com/mm_images.php";
										//跳转链接
										$url="<?php $this->options->siteUrl(); ?>/search/".$keyword;

										$resultStr= sprintf($newsTpl, $fromUsername, $toUsername, $time, $title, $des1, $picUrl1, $url) ;
									
										echo $resultStr; 	
						}
												$contentStr = " \r\n 输入文章名如：姬长信API 即可在线观看！\r\n ";


							$msgType = 'text';
							$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
							echo $resultStr;
						}					
						break;
					default:
						break;
				}						

        }else {
        	echo "你好！欢迎进入【<?php $this->options->title() ?>】微信公众号";
        	exit;
        }
    }
		
	private function checkSignature()
	{
        // you must define TOKEN by yourself
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }
        
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
        		
		$token = TOKEN;
		$tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
		sort($tmpArr, SORT_STRING);
		$tmpStr = implode( $tmpArr );
		$tmpStr = sha1( $tmpStr );
		
		if( $tmpStr == $signature ){
			return true;
		}else{
			return false;
		}
	}
}

?>