<?php
/*
/**
* Index 模块服务接口
*/

namespace app\api\controller;
use \think\View;
class Index extends Common
{
    /**
     * 前端日报
     * @desc 获取前端开发日报
     * @return string title 商品id
     * @return int daily_id   详情id
     * @return string des  描述
     * @return string date  时间日期
     */
    public function index()
    {
        $res=HttpGet("https://api.isoyu.com/docs/#/");
        return $res;
    }
}
