<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/

namespace app\api\controller;


class Address
{


    public function get_address(){

        $getIp = getRemoteIPAddress();

        $content = file_get_contents("http://api.map.baidu.com/location/ip?ak=enYCQ2yaIIjL8IZfYdA1gi6hK2eqqI2T&ip={$getIp}&coor=bd09ll");
        $json = json_decode($content, true);

        $latitude_longitude=$json['content']['point']['y'].",".$json['content']['point']['x'];

        $address = file_get_contents("http://api.map.baidu.com/geocoder/v2/?ak=enYCQ2yaIIjL8IZfYdA1gi6hK2eqqI2T&location={$latitude_longitude}&output=json&pois=0");


        $arr= json_decode($address, true);

        echo "你当前的位置:".$arr['result']['formatted_address'].$arr['result']['sematic_description']."<br>";
        echo "你当前IP:".$getIp;
    }
}