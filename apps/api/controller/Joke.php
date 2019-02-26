<?php
/*
* @class 笑话段子
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/
namespace app\api\controller;
class Joke
{
    /**
     * @title 笑话接口
     * @param page 是 int 页数
     * @return  返回数据实例
     * @example 调用示例
     * @method GET http://192.168.1.2/api/Joke/index?page=10
     * @author xing <fbiufo@vip.qq.com>
     */
    public function index($page = 10)
    {
        $page = (isset($_GET['page'])) ? intval($_GET ['page']) : 10;
        $url = "http://3g.163.com/touch/jsonp/joke/chanListNews/T141931628472/2/{$page}-10.html?callback=data";
        $res = HttpGet($url);
        $arr = json_decode(substr($res, 5, -1), true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr['段子']
        ]);
    }


}
