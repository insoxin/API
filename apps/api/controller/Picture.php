<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/

namespace app\api\controller;

class Picture
{

    /**
     * 图片接口
     * @param int $page
     * @return \think\response\Json
     */
    public function index($page = 20)
    {
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 20;
        $url = "http://pic.news.163.com/photocenter/api/list/0031/6LRK0031,6LRI0031/" . $page . "/20/data.json";
        $res = HttpGet($url);
        $arr = json_decode(substr($res, 5, -1), true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);
    }


    public function hua_ban()
    {
        $url = "http://huaban.com/favorite/beauty?j3ej14y9&max=11".$this->get_random(8)."&limit=20&wfl=1";
        $res = HttpGet($url, true);
        $query = json_decode($res, true);

        $arr = array();
        foreach ($query['pins'] as &$k) {
            $tmp = array(
                'img' => "http://img.hb.aicdn.com/" . $k['file']['key'],
                'title' => $k['board']['title'],
                'desc' => $k['board']['description'],
                'like' => $k['like_count'],
                'repin_count'=> $k['repin_count']
            );
            array_push($arr, $tmp);
        }

        //return json($query['pins']);

        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);

    }


    public function hbmv(){
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 1;
        $type = (isset($_GET['type'])) ? intval($_GET ['type']) : 34;
        $url = "http://www.hbmeinv.com/index.php?m=Content&c=Index&a=gengduolist&p={$page}&catid={$type}";
        $res = HttpGet($url);

        $query = json_decode($res, true);
        $arr = array();
        foreach ($query as &$k) {
            $tmp = array(
            'title' =>$k['title'],
            'thumb' =>$k['thumb']
            );
            array_push($arr, $tmp);
        }
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);
    }


    /**
     * 生成随机数
     * @param $len
     * @return string
     *
     */
   protected function get_random($len)
    {
        $chars_array = array(
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

        );
        $charsLen = count($chars_array) - 1;

        $outputstr = "";
        for ($i=0; $i<$len; $i++)
        {
            $outputstr .= $chars_array[mt_rand(0, $charsLen)];
        }
        return $outputstr;
    }



}
