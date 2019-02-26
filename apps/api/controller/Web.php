<?php
/**
 * Created by PhpStorm.
 * Date: 2017/6/1
 * Time: 9:38
 */

namespace app\api\controller;

include('QueryList.php');

class Web 
{

    public function index()
    {

    }


    /**
     * 前端周报列表
     * @return \think\response\Json
     */
    public function web_daily_list()
    {

        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : "";
        if (empty($page)) {
            $url = "http://caibaojian.com/c/news";
        } else {
            $url = "http://caibaojian.com/c/news/page/{$page}";
        }
        $data = Http_Spider($url);
        \phpQuery::newDocumentHTML($data);


        $arr = array();
        $list = pq('#content article');
        foreach ($list as $li) {
            $title = pq($li)->find('.entry-title span')->text();
            $desc = pq($li)->find('.entry-content p')->text();
            $url = pq($li)->find('.entry-title a')->attr('href');
            $date = pq($li)->find('.entry-date')->text();
            $id = intval(preg_replace('/\D/s', '', $url));


            $tmp = array(
                'title' => $title,
                'date' => $date,
                'desc' => $desc,
                'daily_id' => $id,
                'url'=>$url
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
     * 每日开发周报列表
     * @return \think\response\Json
     */
    public function every_daily_list()
    {

        $daily_id = (isset($_GET['daily_id'])) ? intval($_GET ['daily_id']) : "20170531";
        $url = "http://caibaojian.com/fe-daily-{$daily_id}.html";
        $data = Http_Spider($url);
        \phpQuery::newDocumentHTML($data);
        $arr = array();
        $list = pq('.feddaily-list li');

        $every_daily_title = pq('.entry-title a')->text();
        foreach ($list as $li) {
            $title = pq($li)->find('.fed-title a')->text();
            $desc = pq($li)->find('.fed-con')->text();
            $url = pq($li)->find('.tlink')->attr('href');

            $tmp = array(
                'title' => $title,
                'url' => explode("url=", $url)[1],
                'desc' => $desc,
            );
            array_push($arr, $tmp);
        }

        return json([
            'msg' => 'success',
            'code' => 1,
            'title' => $every_daily_title,
            'data' => $arr
        ]);
    }


    public function frame()
    {
        $url = "http://orz7qm1c9.bkt.clouddn.com/frame.html";
        $data = Http_Spider($url);
        return $data;

    }


}
