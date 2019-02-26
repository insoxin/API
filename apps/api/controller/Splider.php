<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/
namespace app\api\controller;
include('QueryList.php');

class Splider
{
    public function index()
    {

    }

    public function splider()
    {
        $filePath = 'http://www.meizitu.com/';
        $data = Http_Spider($filePath);
        \phpQuery::newDocumentHTML($data);
        $arr = array();
        $list = pq('#picture')->find("a");
        foreach ($list as $li) {
            $title = pq($li)->attr('title');
            $url = pq($li)->attr('href');
            $img = pq($li)->find('img')->attr('src');

            $tmp = array(
                'title' => $title,
                'url' => $url,
                'img' => $img
            );
            array_push($arr, $tmp);
        }
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);

    }


    public function osc(){
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 1;
       // $id = (isset($_GET['id'])) ? intval($_GET ['id']) : 1;
        $url="https://my.oschina.net/u/2921900/home?type=tweet&scope=all&showme=NOTSHOW&p={$page}&temp=1500024889206";
        $res = HttpGet($url);
        \phpQuery::newDocumentHTML($res);
        $arr = array();
        $list = pq('.photo')->find("img");

        foreach ($list as $li) {
            $img = pq($li)->attr('data-raw-img');
            $tmp = array(
                'img' => $img
            );
            array_push($arr, $tmp);
        }
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);

    }



}
