<?php
/*
 * @Author: ecitlm 
 * @Date: 2017-05-31 10:14:09 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-05-31 10:14:36
 */
namespace app\api\validate;
use think\Validate;

class News extends Validate{
    protected $rule = [
        'page'  =>  'require|number',
        'type'  =>  'require|number',
    ];

    protected $message  =   [
        'page.require' => '缺少必要参数page',
        'page.number'  => 'page参数必须为正整数',
        'type.require' => '缺少必要参数type',
        'type.number' =>  'type参数必须为正整数',

     
    ];
}