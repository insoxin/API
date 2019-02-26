<?php
/**
 * Date: 2017/9/5
 * Time: 14:13
 */

namespace app\api\controller;
class Base
{

    /**
     * Base constructor.
     * 构造函数初始化签名验证
     */
    public function __construct()
    {
        $this->checkParams();
    }

    /**
     * 校验签名
     */
    private function checkParams()
    {
        $params = $_REQUEST;
        $times = time() * 1000;
        if(empty($params['timestamp'])){
        	 echo json_encode(array(
                'msg' => '缺少timestamp参数',
                'code' => 999
            ));
        	 die();
        }
        if ($times - floatval($params['timestamp']) >300000) {
            echo json_encode(array(
                'msg' => '请求时间失效',
                'code' => 999
            ));
            die();
        }
        if (empty($params['sign'])) {
            echo json_encode(array(
                'msg' => '缺少Sign参数',
                'code' => 999
            ));
            die();
        } else {
            $responseSign = $params['sign'];
            $params['appkey'] = config('appkey');
            unset($params['sign']);
            ksort($params);
            $str = implode($params);
            $sign = MD5($str);
            if ($sign != $responseSign) {
                echo json_encode(array(
                    'msg' => 'sign签名错误',
                    'code' => 406
                ));
                die();
            }
        }
    }
}
