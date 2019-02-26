<?php
/**
 * Created by PhpStorm.
 * User: cnmobi
 * Date: 2017/6/6
 * Time: 10:17
 */

namespace app\api\controller;


class Movie
{

    /**
     * 正在上映电影列表
     * @return mixed
     */
    public function playing_movie_list(){
        $start = (isset($_GET['start'])) ? intval($_GET ['start']) : 0;
        $url="http://api.douban.com/v2/movie/in_theaters?start={$start}&count=9";
        $res=HttpGet($url);
        return $res;
    }

    /**
     * 电影详情
     * @return mixed
     */
    public function movie_info(){
        $id = (isset($_GET['id'])) ? intval($_GET ['id']) : 6311303;
        $url="http://api.douban.com/v2/movie/subject/{$id}";
        $res=HttpGet($url);
        $arr = json_decode($res, true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);
    }
}