<?php
/**************
 * 爱特网站文件专家
 * ----------------
 * 01.文件批量压缩功能
 * 02.批量网址获取文件
 * 03.文件批量上传功能
 * 04.强大权限设置支持
 * 05.批量文件删除功能
 * 06.批量文件复制支持
 * 07.批量文件移动支持
 * 08.批量建立目录文件
 * 09.高级终端命令执行
 * 10.批量文件传至邮箱
 * 11.实用文件清单支持
 * 12.自定编码查看文件
 * 13.自定编码编辑文件
 * 14.目录与文件的命名
 * 15.创建文件复件支持
 * 16.目录位置允许跳转
 * 17.文件效验Md5,Sha1
 * 18.硬盘使用情况查看
 * 19.任意文件下载支持
 * 20.牛逼强大解压支持
 * 21.文件编码转换工具
 * 22.下载文件断点续传
 * ----------------
 * ->>目前支持压缩类型
 * Gz,Bz2,Zip
 * ->>目前支持解压类型
 * Gz,Bz2,Tar,Tgz,Tbz,Zip
 * ----------------
 * ->>爱特文件专家安装
 * 环境:PHP5+  SESSION
 * 首次使用提示创建帐号密码
 * 修改密码直接编辑admin.php
 * 在Linux操作系统中将更好用
 * 不选择任何文件则使用清单文件
 * 选择文件并操作会清空文件清单
 * 编辑文件如不选择编码将用UTF-8
 * ->>爱特文件专家技巧
 * 文件列表添加Ftp://可以操作Ftp文件
 * 使用远程上传输入Url地址即可导入文件
 * 用清单功能批量操作不同目录文件,如压缩
 * 命名功能如果输入绝对路径还可以当移动使
 * 有时操作重要文件怕出错,文件复件让你安心
 * 谦容各种浏览器,甚至Elinks也能完美的使用
 * 更多技巧等你使用,欢迎Bug的反馈与交流讨论
 * ----------------
 * -->爱特文件专家作者
 * 官方网站:aite.me
 * 腾讯扣群:38181604
 * 腾讯扣扣:88966001
 * 腾讯扣扣:759234755
 * 电子邮箱:admin@aite.me
 * 电子邮箱:xiaoqidun@gmail.com
 * 组件下载:http://aite.me/7zrar.zip
 * 官方更新:http://aite.me/fileadmin.zip
 * ----------------
 * -->爱特文件专家版权
 * 爱特文件专家使用了Pclzip和Archive_Tar
 * http://www.phpconcept.net/pclzip
 * http://pear.php.net/package/Archive_Tar
 * 爱特文件专家除此库之外均为原创编码
 * ----------------
 * 如果解压选项中出现了rar和7za二个选项且是linux系统
 * 你可能需要安装爱特文件专家的unrar和p7zip组件才能用
 * unrar和p7zip（x64\x86\arm）http://aite.me/7zrar.zip
 * 借助这二个强大的组件你可以用爱特文件管理器解压任意格式压缩包
 * 可以用文件管理器的远程下载直接导入unrar和p7zip组件包,然后在线解压
 * 解压后有x64\x86\arm三个目录,一般空间用x86,一般安卓手机环境用arm组件
 * 进入对应的组件目录,将p7zip.bin和unrar.bin文件移动到文件管理器目录即可
 * 然后文件管理器的rar和7za解压选项就可以用了,当然也可以解压带密码压缩包
 **************/
//服务器会话
session_start();
//错误的屏蔽
error_reporting(0);
//时间戳修正
define("TIME", 8 * 3600);
//程序的名称
define("NAME", "&#x7231;&#x7279;&#x6587;&#x4EF6;&#x4E13;&#x5BB6;");
//程序根目录
define("ROOT", dirname(__FILE__));
//初始化目录
define("OPEN", ROOT . "/..");
//安装系统吧
require ROOT . "/auto.php";
//用户认证吧
require ROOT . "/admin.php";
//载入对象库
require ROOT . "/kernel.php";
//载入函数库
require ROOT . "/xhtml.php";
require ROOT . "/system.php";
//强制的编码
header("Content-Type:text/html;charset=UTF-8");
//密匙的安全
if (function_exists("chmod")) chmod("admin.php", 0600);
//最大化运行
if (function_exists("set_time_limit")) set_time_limit(0);
if (function_exists("ignore_user_abort")) ignore_user_abort(true);
if (function_exists("ini_set")) ini_set("max_execution_time", "0");
//用户的登录
if (!isset($_SESSION['adminstatus'])) {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if (U === $_POST['username'] && P === $_POST['password']) {
            $_SESSION['adminstatus'] = true;
            header("Location: {$_SERVER['SCRIPT_NAME']}?" . str_ireplace("&logout", "", $_SERVER['QUERY_STRING']));
            exit;
        }
    }
    xhtml_head("安全登录");
    echo "<div class=\"love\">\n";
    echo "<form action=\"{$_SERVER['SCRIPT_NAME']}?{$_SERVER['QUERY_STRING']}\" method=\"POST\">\n";
    echo "用户名称：<br />\n<input type=\"text\" name=\"username\" /><br />\n";
    echo "用户密码：<br />\n<input type=\"password\" name=\"password\" /><br />\n";
    echo "<input type=\"submit\" value=\"安全登录\" />\n";
    echo "</form>\n";
    echo "</div>\n";
    xhtml_footer();
    exit;
} else {
    if ($_SESSION['adminstatus'] !== true || isset($_GET['logout'])) {
        unset($_SESSION['adminstatus']);
        header("Location: {$_SERVER['SCRIPT_NAME']}?" . str_ireplace("&logout", "", $_SERVER['QUERY_STRING']));
        exit;
    }
}
?>
