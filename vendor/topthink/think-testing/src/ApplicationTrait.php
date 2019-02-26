<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2015 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: yunwuxin <448901948@qq.com>
// +----------------------------------------------------------------------
namespace think\testing;

use think\Db;
use think\Session;

trait ApplicationTrait
{
    public function withSession(array $data)
    {
        foreach ($data as $key => $value) {
            Session::set($key, $value);
        }
        return $this;
    }

    public function clearSession()
    {
        Session::clear();
    }


    protected function seeInDatabase($table, array $data)
    {
        $count = Db::name($table)->where($data)->count();

        $this->assertGreaterThan(0, $count, sprintf(
            'Unable to find row in database table [%s] that matched attributes [%s].', $table, json_encode($data)
        ));

        return $this;
    }

    protected function notSeeInDatabase($table, array $data)
    {
        $count = Db::name($table)->where($data)->count();

        $this->assertEquals(0, $count, sprintf(
            'Found unexpected records in database table [%s] that matched attributes [%s].', $table, json_encode($data)
        ));

        return $this;
    }
}