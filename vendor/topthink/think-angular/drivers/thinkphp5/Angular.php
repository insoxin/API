<?php

// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016 http://www.thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 翟帅干 <zhaishuaigan@qq.com> <http://zhaishuaigan.cn>
// +----------------------------------------------------------------------

namespace think\view\driver;

use think\angular\Angular as AngularTpl;
use think\App;
use think\Request;
use think\template\driver\File as Storage;

class Angular
{

    private $template = null;
    private $config   = [];
    private $storage  = null;

    public function __construct($config = [])
    {
        $default = [
            'debug'            => App::$debug, // 是否开启调试模式
            'tpl_path'         => App::$modulePath . 'view' . DS, // 模板目录
            'tpl_suffix'       => '.html', // 模板后缀
            'tpl_cache_path'   => RUNTIME_PATH . 'temp' . DS, // 模板缓存目录
            'tpl_cache_suffix' => '.php', // 模板缓存文件后缀
            'directive_prefix' => 'php-', // 指令前缀
            'directive_max'    => 10000, // 指令的最大解析次数
        ];

        $this->config   = array_merge($default, $config);
        $this->template = new AngularTpl($this->config);
        // 初始化模板编译存储器
        $this->storage = new Storage();
    }

    /**
     * 获取模版运行结果
     * @param string $template 模版地址
     * @param array $data 模版数据
     * @param array $config 配置
     * @return string
     */
    public function fetch($template, $data = [], $config = [])
    {
        // 处理模版地址
        $template = $this->parseTemplatePath($template);

        // 根据模版文件名定位缓存文件
        $tpl_cache_file = $this->config['tpl_cache_path'] . 'angular_' . md5($template) . '.php';
        if ($this->config['debug'] || !is_file($tpl_cache_file) || !$this->storage->check($tpl_cache_file, 0)) {
            // 编译模板内容
            $content = $this->template->compiler($template, $data);
            $this->storage->write($tpl_cache_file, $content);
        }
        $this->storage->read($tpl_cache_file, $data);
    }

    /**
     * fetch的别名
     * @param string $template 模版地址
     * @param array $data 模版数据
     * @param array $config 配置
     * @return string
     */
    public function display($template, $data = [], $config = [])
    {
        return $this->fetch($template, $data, $config);
    }

    /**
     * 如果模版为空, 则通过URL参数获取模版地址
     * @param string $template 模版地址
     * @return string
     */
    public function parseTemplatePath($template = '')
    {
        $request    = Request::instance();
        $controller = strtolower($request->controller());
        $action     = $request->action();
        if (!$template) {
            // 没有传模版名
            $template = $controller . DS . $action;
            $template = str_replace('.', DS, $template);
            return $template;
        } elseif (strpos($template, '/') === false) {
            // 只传了操作名
            $template = $controller . DS . $template;
            $template = str_replace('.', DS, $template);
            return $template;
        }
        // 默认原样返回
        return $template;
    }

    public function __call($method, $params)
    {
        return call_user_func_array([$this->template, $method], $params);
    }

}
