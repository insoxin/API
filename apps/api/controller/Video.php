<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:32:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/
namespace app\api\controller;
class Video
{
    /**
     * 视频首页接口
     */
    public function index()
    {
        $res = HttpGet("http://c.3g.163.com/nc/video/home/0-10.html");
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);
    }

    /**
     *视频分类列表
     */
    public function video_type($type = 0, $page = 10)
    {

        $type = (isset($_GET['type'])) ? intval($_GET ['type']) : 0;
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 10;
        $video_type = \think\Config::get("news")['video_type'][$type];
        if (empty($video_type)) {
            return json([
                'msg' => '请填写正确的参数请求',
                'code' => 0
            ]);
        }
        $url = "http://c.m.163.com/nc/video/list/" . $video_type . "/y/" . $page . "-10.html";
        $res = HttpGet($url);
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr[$video_type]
        ]);

    }

    /**
     * @param string $vid
     * @return \think\response\Json
     */
    public function video_detail($vid = "VEKKO9TJP")
    {
        $vid = $_GET['vid'];
        if (empty($vid)) {
            return json([
                'msg' => '请填写正确的参数请求',
                'code' => 0
            ]);
        };
        $url = "http://3g.163.com/touch/video/detail/" . $vid . ".html";
        $res = HttpGet($url);
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);

    }

}
