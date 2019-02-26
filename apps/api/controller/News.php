<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/
namespace app\api\controller;
use think\Loader;
class News
{
    public function index()
    {
        return json([
            'msg' => '你好 IT开发者'
        ]);
    }


    /**
     * 新闻banner
     */
    public function banner()
    {
        $res = HttpGet(banner_url());
        $arr = json_decode($res, true);
        return json($arr['list'][0]);
    }


    /**
     *
     * 新闻分类
     */
    public function new_list()
    {


       $type = (isset($_REQUEST['type'])) ? intval($_REQUEST['type']) : 0;
       $page = (isset($_REQUEST['page'])) ? intval($_REQUEST['page']) : 10;
        $data = [
            'page' => $page,
            'type' =>$type,
        ];

        $validate = Loader::validate('News');
        if(!$validate->check($data)){
            return json([
                'msg'=>$validate->getError(),
                'code' => 0,
            ]);
        }
        $news_type = \think\Config::get("news")['news_type'][$type];
        if (empty($news_type)) {
            return json([
                'msg' => '请填写正确的请求参数',
                'code' => 0
            ]);
        }
        $res = HttpGet(new_list_url($news_type,$page));
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr[$news_type]
        ]);
    }


    /**
     * 新闻详情
     * @param string $postid
     * @return \think\response\Json
     */
    public function new_detail($postid = "CLJMJRRL000181KT")
    {
        $id = (isset($_GET['postid'])) ? $_GET ['postid'] : "CLJMJRRL000181KT";
        $res = HttpGet(new_detail_url($id));
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr[$id]
        ]);
    }


    /**
     * 本地新闻
     * @return \think\response\Json
     */
    public function local_news()
    {
        $name = (isset($_GET['name'])) ? $_GET ['name'] : $this->get_ip_address();
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 0;

        $res = HttpGet(local_news_url(urlencode($name),$page));
        $arr = json_decode(substr($res, 9, -1), true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr[$name]
        ]);
    }

	/**
	*微信精选
	*
	*/
	public function wx_select(){
		$ps = (isset($_GET['ps'])) ? intval($_GET ['ps']) : 10;
		$jkAPikey="d046cd1f569ed13d951f0258902ef9b2";
		$url="http://v.juhe.cn/weixin/query?key=d046cd1f569ed13d951f0258902ef9b2&ps=".$ps;
		$res=HttpGet($url);
		return  $res;
	
	
	
	}


    /**
     * 获取IP地址
     * @return string
     */
    public function get_ip_address(){
        $getIp = getRemoteIPAddress();
        $content = file_get_contents("http://api.map.baidu.com/location/ip?ak=enYCQ2yaIIjL8IZfYdA1gi6hK2eqqI2T&ip={$getIp}&coor=bd09ll");
        $json = json_decode($content, true);
        $place=$json['content']['address_detail']['province']."_".$json['content']['address_detail']['city'];
        return $place;
    }

}
