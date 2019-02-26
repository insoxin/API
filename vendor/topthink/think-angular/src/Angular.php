<?php

// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://www.thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 翟帅干 <zhaishuaigan@qq.com> <http://zhaishuaigan.cn>
// +----------------------------------------------------------------------

namespace think\angular;

class Angular
{

    public        $config      = [
        'debug'            => false, // 是否开启调试
        'tpl_path'         => './view/', // 模板根目录
        'tpl_suffix'       => '.html', // 模板后缀
        'tpl_cache_path'   => './cache/', // 模板缓存目录
        'tpl_cache_suffix' => '.php', // 模板缓存后缀
        'directive_prefix' => 'php-', // 指令前缀
        'directive_max'    => 10000, // 指令的最大解析次数
    ];
    public        $tpl_var     = []; // 模板变量列表
    public        $tpl_file    = ''; // 当前要解析的模板文件
    public        $tpl_block   = ''; // 模板继承缓存的block
    public        $tpl_literal = [];
    public static $extends     = []; // 扩展解析规则

    public function __construct($config)
    {
        $this->config = array_merge($this->config, $config);
    }

    /**
     * 分配模板变量
     * @param string|array $name  模板变量
     * @param mixed        $value 值
     */
    public function assign($name, $value = null)
    {
        if (is_array($name)) {
            $this->tpl_var = array_merge($this->tpl_var, $name);
        } else {
            $this->tpl_var[$name] = $value;
        }
    }

    /**
     * 获取模板文件内容
     * @param string $tpl_file
     * @return string
     */
    public function getTplContent($tpl_file)
    {
        // 如果长度超过255, 直接当模板内容返回
        if (strlen($tpl_file) > 255) {
            return $tpl_file;
        }
        // 如果文件存在, 直接返回文件内容
        if (file_exists($tpl_file)) {
            $this->tpl_file = $tpl_file;
            return file_get_contents($tpl_file);
        }

        // 如果有模板后缀, 直接当绝对地址
        if (strpos($tpl_file, $this->config['tpl_suffix']) > 0) {
            $this->tpl_file = $tpl_file;
            return file_get_contents($tpl_file);
        }

        // 根据模板目录定位文件
        $tpl_file_path = $this->config['tpl_path'] . $tpl_file . $this->config['tpl_suffix'];
        if (is_file($tpl_file_path)) {
            $this->tpl_file = $tpl_file_path;
            return file_get_contents($tpl_file_path);
        }

        // 如果不是文件, 就返回原始内容
        return $tpl_file;
    }

    /**
     * 编译模板
     * @param string $tpl_file 模板文件
     * @param array  $tpl_var  模板变量
     */
    public function fetch($tpl_file, $tpl_var = [])
    {
        // 缓存文件名文件路径连接上文件的修改时间, 然后计算md5值作为缓存文件名.
        $cache_file = $this->config['tpl_cache_path'] . md5($tpl_file) . $this->config['tpl_cache_suffix'];
        if (!file_exists($cache_file) || $this->config['debug']) {
            // 调试模式或换成不存在时, 重新生成编译缓存
            $cache_dir = dirname($cache_file);
            if (!is_dir($cache_dir)) {
                mkdir($cache_dir, 0777);
            }

            // 编译生成缓存
            $content = $this->compiler($tpl_file, $tpl_var);
            file_put_contents($cache_file, $content);
        }

        // 模板阵列变量分解成为独立变量
        if (!is_null($this->tpl_var)) {
            extract($this->tpl_var, EXTR_OVERWRITE);
        }
        // 页面缓存
        ob_start();
        ob_implicit_flush(0);
        require $cache_file;
        // 获取并清空缓存
        $content = ob_get_clean();
        return $content;
    }

    /**
     * 编译模板并输出执行结果
     * @param string $tpl_file 模板文件
     * @param array  $tpl_var  模板变量
     */
    public function display($tpl_file, $tpl_var = [])
    {
        echo $this->fetch($tpl_file, $tpl_var);
    }

    /**
     * 编译模板内容
     * @param string $tpl_file 模板内容
     * @return string 编译后的php混编代码
     */
    public function compiler($tpl_file, $tpl_var = [])
    {
        if ($tpl_var) {
            $this->tpl_var = array_merge($this->tpl_var, $tpl_var);
        }
        $content = $this->getTplContent($tpl_file);
        //模板解析
        $result = $this->parse($content);
        return $result;
    }

    /**
     * 解析模板标签属性
     * @param string $content 要模板代码
     * @return string 解析后的模板代码
     */
    public function parse($content)
    {
        $num = $this->config['directive_max'];
        while (true) {
            $sub = $this->match($content);
            if ($sub) {
                $method = 'parse' . $sub['directive'];
                if (method_exists($this, $method)) {
                    // 系统解析规则
                    $content = $this->$method($content, $sub);
                } elseif (isset(self::$extends[$sub['directive']])) {
                    // 扩展解析规则
                    $call    = self::$extends[$sub['directive']];
                    $content = $call($content, $sub, $this);
                } else {
                    // 未找到解析规则
                    throw new Exception("模板属性" . $this->config['directive_prefix'] . $sub['directive'] . '没有对应的解析规则');
                }
            } else {
                break;
            }
            if ($num-- <= 0) {
                throw new Exception('解析出错, 超过了最大属性数');
            }
        }
        $content = $this->parseValue($content);
        return $content;
    }

    /**
     * 解析include属性
     * @param string $content 源模板内容
     * @param array  $match   一个正则匹配结果集, 包含 html, value, directive
     * @return string 解析后的模板内容
     */
    public function parseInclude($content, $match)
    {
        $tpl_name = $match['value'];
        if (substr($tpl_name, 0, 1) == '$') {
            //支持加载变量文件名
            $tpl_name = $this->tpl_var[substr($tpl_name, 1)];
        }
        $array     = explode(',', $tpl_name);
        $parse_str = '';
        foreach ($array as $tpl) {
            if (empty($tpl)) {
                continue;
            }

            if (false === strpos($tpl, $this->config['tpl_suffix'])) {
                // 解析规则为 模块@主题/控制器/操作
                $tpl = $this->parseTemplateFile($tpl);
            }
            if (file_exists($tpl)) {
                // 获取模板文件内容
                $parse_str .= file_get_contents($tpl);
            } else {
                $parse_str .= '模板文件不存在: ' . $tpl;
            }
        }
        return str_replace($match['html'], $parse_str, $content);
    }

    /**
     * 处理include的模板路径
     * @param string $tpl 模板路径
     * @return string 模板的真实地址
     */
    public function parseTemplateFile($tpl)
    {
        if (strpos($tpl, $this->config['tpl_suffix'])) {
            return $tpl;
        } else {
            if (strpos($tpl, '/')) {
                return $this->config['tpl_path'] . $tpl . $this->config['tpl_suffix'];
            } else {
                return dirname($this->tpl_file) . '/' . $tpl . $this->config['tpl_suffix'];
            }
        }
    }

    /**
     * 解析init属性
     * @return string 解析后的模板内容
     */
    public function parseInit($content, $match)
    {
        $new = "<?php {$match['value']}; ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析exec属性
     * @return string 解析后的模板内容
     */
    public function parseExec($content, $match)
    {
        $new = "<?php {$match['value']}; ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析if属性
     * @return string 解析后的模板内容
     */
    public function parseIf($content, $match)
    {
        $new = "<?php if ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析elseif属性
     * @return string 解析后的模板内容
     */
    public function parseElseif($content, $match)
    {
        $new = "<?php elseif ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析else属性
     * @return string 解析后的模板内容
     */
    public function parseElse($content, $match)
    {
        $new = "<?php else { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析switch属性
     * @return string 解析后的模板内容
     */
    public function parseSwitch($content, $match)
    {
        $start = "<?php switch ({$match['value']}) { ?>";
        $end   = "<?php } ?>";
        $new   = preg_replace('/^[^>]*>/', $start, $match['html']);
        $new   = preg_replace('/<[^<]*$/', $end, $new);
        $new   = str_replace($match['html'], $new, $content);
        return $new;
    }

    /**
     * 解析case属性
     * @return string 解析后的模板内容
     */
    public function parseCase($content, $match)
    {
        $new = "<?php case {$match['value']}: ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php break; ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析defalut属性
     * @return string 解析后的模板内容
     */
    public function parseDefault($content, $match)
    {
        $new = "<?php default: ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php break; ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析repeat属性
     * @return string 解析后的模板内容
     */
    public function parseRepeat($content, $match)
    {
        $new = "<?php foreach ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析foreach属性
     * @return string 解析后的模板内容
     */
    public function parseForeach($content, $match)
    {
        $new = "<?php foreach ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析for属性
     * @return string 解析后的模板内容
     */
    public function parseFor($content, $match)
    {
        $new = "<?php for ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析show属性
     * @return string 解析后的模板内容
     */
    public function parseShow($content, $match)
    {
        $new = "<?php if ({$match['value']}) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析hide属性
     * @return string 解析后的模板内容
     */
    public function parseHide($content, $match)
    {
        $new = "<?php if (!({$match['value']})) { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析before属性
     * @return string 解析后的模板内容
     */
    public function parseBefore($content, $match)
    {
        $new = "<?php {$match['value']}; ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析after属性
     * @return string 解析后的模板内容
     */
    public function parseAfter($content, $match)
    {
        $new = self::removeExp($match['html'], $match['exp']);
        $new .= "<?php {$match['value']}; ?>";
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析function属性
     * @return string 解析后的模板内容
     */
    public function parseFunction($content, $match)
    {
        $new = "<?php function {$match['value']} { ?>";
        $new .= self::removeExp($match['html'], $match['exp']);
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析调用function属性
     * @return string 解析后的模板内容
     */
    public function parseCall($content, $match)
    {
        $new = "<?php {$match['value']}; ?>";
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析模板继承
     * @return string 解析后的模板内容
     */
    public function parseExtends($content, $match)
    {
        $this->tpl_block .= $content;
        $content       = 'extends';
        $match['html'] = $content;
        $content       = $this->parseInclude($content, $match);
        return $content;
    }

    /**
     * 解析继承的代码块
     * @return string
     */
    public function parseBlock($content, $match)
    {
        $block = $this->match($this->tpl_block, 'block', $match['value']);
        if ($block) {
            $new = self::removeExp($block['html'], $block['exp']);
            return str_replace($match['html'], $new, $content);
        } else {
            $new = self::removeExp($match['html'], $match['exp']);
            return str_replace($match['html'], $new, $content);
        }
    }

    /**
     * 原样输出解析, 先把代码替换为 #xxx#的形式
     * @return string
     */
    public function parseLiteral($content, $match)
    {
        $key  = '#' . md5($match['html']) . '#';
        $html = self::removeExp($match['html'], $match['exp']);
        switch ($match['value']) {
            case 'code':
                $html = str_replace('<', '&lt;', $html);
                break;

            default:

                break;
        }
        $this->tpl_literal[$key] = $html;
        return str_replace($match['html'], $key, $content);
    }

    /**
     * 原样输出反解析, 把代码还原
     * @param type $content
     * @return type
     */
    public function unparseLiteral($content)
    {
        foreach ($this->tpl_literal as $key => $literal) {
            $content = str_replace($key, $literal, $content);
        }
        return $content;
    }

    /**
     * 解析普通变量和函数{$title}{:function_name($var)}
     * @param string $content 源模板内容
     * @return string 解析后的模板内容
     */
    public function parseValue($content)
    {
        // {$vo.name} 转为 {$vo["name"]}
        $content = preg_replace('/\{(\$[\w\[\"\]]*)\.(\w*)([^\{\}]*)\}/', '{\1["\2"]\3}', $content);
        $content = preg_replace('/\{(\$[\w\[\"\]]*)\.(\w*)([^\{\}]*)\}/', '{\1["\2"]\3}', $content);

        // {$var ?? 'xxx'} 转为 {$var ? $var : 'xxx'}
        $content = preg_replace('/\{(\$.*?)\?\s*\?(.*)\}/', '{\1?\1:\2}', $content);

        // {$var ?= 'xxx'} to {$var ? 'xxx':''}
        $content = preg_replace('/\{(\$.*?)\?\=(.*)\}/', '{\1?\2:""}', $content);
        $content = preg_replace('/\{(\$.*?)\}/', '<?php echo \1; ?>', $content);
        $content = preg_replace('/\{\:(.*?)\}/', '<?php echo \1; ?>', $content);

        // 合并php代码结束符号和开始符号
        $content = preg_replace('/\?>[\s\n]*<\?php/', '', $content);

        // 处理原样输出
        $content = $this->unparseLiteral($content);

        // 过滤<php></php>标签, 保留标签之间的内容
        $content = preg_replace('/\<\/?php[^>]*>/', '', $content);

        return $content;
    }

    /**
     * 解析php-selected指令, 方便选择框做自动选中功能
     * @return string
     */
    public function parseSelected($content, $match)
    {
        $selected = self::replaceExp($match['html'], $match['exp'], ' selected="selected" ');
        $other    = self::removeExp($match['html'], $match['exp']);

        $new = "<?php if ({$match['value']}) { ?>";
        $new .= $selected;
        $new .= '<?php } else { ?>';
        $new .= $other;
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析php-checked指令, 方便复选框做自动选中功能
     * @return string
     */
    public function parseChecked($content, $match)
    {
        $selected = self::replaceExp($match['html'], $match['exp'], ' checked="checked" ');
        $other    = self::removeExp($match['html'], $match['exp']);

        $new = "<?php if ({$match['value']}) { ?>";
        $new .= $selected;
        $new .= '<?php } else { ?>';
        $new .= $other;
        $new .= '<?php } ?>';
        return str_replace($match['html'], $new, $content);
    }

    /**
     * 解析php-model指令, 方便做内容编辑功能，value会自动转移特殊字符(htmlentities)， 保证 input的value正确输出
     * @return string
     */
    public function parseModel($content, $match)
    {

        $new_exp  = ' value="<?php echo htmlentities(' . $match['value'] . '); ?>" ';
        $new_html = self::replaceExp($match['html'], $match['exp'], $new_exp);
        return str_replace($match['html'], $new_html, $content);
    }

    /**
     * 扩展解析规则
     * @param string|array $extends  属性名称
     * @param mixed        $callback 回调方法
     * @return void
     */
    public static function extend($extends, $callback = null)
    {
        if (is_array($extends)) {
            // 如果是数组, 就合并规则
            self::$extends = array_merge(self::$extends, $extends);
        } else {
            // 添加单个规则
            self::$extends[$extends] = $callback;
        }
    }

    /**
     * 从标签中移除指定属性表达式
     * @param string $tag   标签
     * @param string $exp   指令
     * @param int    $limit 替换次数, 默认只替换一次
     * @return string 替换后的标签
     */
    public static function removeExp($tag, $exp, $limit = 1)
    {
        return self::replaceExp($tag, $exp, '', $limit);
    }

    /**
     * 从标签中移除指定属性表达式
     * @param string $tag   标签
     * @param string $exp   指令
     * @param string $new   新的属性表达式
     * @param int    $limit 替换次数, 默认只替换一次
     * @return string 替换后的标签
     */
    public static function replaceExp($tag, $exp, $new, $limit = 1)
    {
        return preg_replace('/\s*' . preg_quote($exp, '/') . '/', $new, $tag, $limit);
    }

    /**
     * 获取第一个表达式
     * @param string $content   要解析的模板内容
     * @param string $directive 指令名称
     * @param string $val       属性值
     * @return array 一个匹配的标签数组
     */
    public function match($content, $directive = '[\w]+', $val = '[^\4]*?')
    {
        $reg   = '#<(?<tag>[\w]+)[^>]*?\s(?<exp>' . preg_quote($this->config['directive_prefix'])
            . '(?<directive>' . $directive
            . ')=([\'"])(?<value>' . $val . ')\4)[^>]*>#s';
        $match = null;
        if (!preg_match($reg, $content, $match)) {
            return null;
        }
        $sub = $match[0];
        $tag = $match['tag'];
        /* 如果是单标签, 就直接返回 */
        if (substr($sub, -2) == '/>') {
            $match['html'] = $match[0];
            return $match;
        }
        /* 查找完整标签 */
        $start_tag_len   = strlen($tag) + 1; // <div
        $end_tag_len     = strlen($tag) + 3; // </div>
        $start_tag_count = 0;
        $content_len     = strlen($content);
        $pos             = strpos($content, $sub);
        $start_pos       = $pos + strlen($sub);
        while ($start_pos < $content_len) {
            $is_start_tag = substr($content, $start_pos, $start_tag_len) == '<' . $tag;
            $is_end_tag   = substr($content, $start_pos, $end_tag_len) == "</$tag>";
            if ($is_start_tag) {
                $start_tag_count++;
            }
            if ($is_end_tag) {
                $start_tag_count--;
            }
            if ($start_tag_count < 0) {
                $match['html'] = substr($content, $pos, $start_pos - $pos + $end_tag_len);
                return $match;
            }
            $start_pos++;
        }
        return null;
    }

}
