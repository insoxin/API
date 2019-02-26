<?php

/**
 * Created by PhpStorm.
 * User: cnmobi
 * Date: 2017/5/31
 * Time: 16:44
 */
namespace app\api\controller;
class Weather
{
    /**
     * 获取城市天气预报
     * @return bool|string
     */
    public function get_weather()
    {

        $city=$_GET['city'];
        if(empty($city)){
            $city= $this->get_city();
        }
        $res = file_get_contents("http://api.map.baidu.com/telematics/v3/weather?location={$city}&output=json&ak=32da004455c52b48d84a3a484c0dbc99");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }

    protected function get_city(){
        $getIp = getRemoteIPAddress();
        $content = file_get_contents("http://api.map.baidu.com/location/ip?ak=enYCQ2yaIIjL8IZfYdA1gi6hK2eqqI2T&ip=120.237.113.106&coor=bd09ll");
        $json = json_decode($content, true);
        $place =urlencode($json['content']['address_detail']['city']);
        return $place;
    }
}