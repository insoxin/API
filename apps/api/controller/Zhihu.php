<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/6/2
 * Time: 22:45
 */

namespace app\api\controller;


class Zhihu
{

    /**
     * 最新日报列表
     * @return \think\response\Json
     */
    public function zhihu_daily(){
        $url=config("ZHIHU_DOMAIN")."/news/latest";
        $res=HttpGet($url);

        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }

    /**
     * 知乎日报文章详情
     * @param string $id
     * @return \think\response\Json
     */
    public function news($id=""){
        $id=intval($_GET ['id']);
        if(empty($id)){
            return json([
                'msg' => '参数id不能为空',
                'code' => 0,
            ]);
        }
        $url=config("ZHIHU_DOMAIN")."/news/{$id}";
        $res=HttpGet($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }


    /**
     * 知乎日报短评论
     * @return \think\response\Json
     */
    public function new_comment(){
        $id=intval($_GET ['id']);
        if(empty($id)){
            return json([
                'msg' => '参数id不能为空',
                'code' => 0,
            ]);
        }

        $url=config("ZHIHU_DOMAIN")."/story/{$id}/short-comments";
        $res=HttpGet($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }
}