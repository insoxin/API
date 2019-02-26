<?php
require "config.php";
$path = isset($_GET['path']) ? trim($_GET['path']) : OPEN;
if ($path == "" || !is_dir($path)) $path = OPEN;
$filesystem = new filesystem($path);
if (!isset($_GET['multiple'])) {
    $multiple = null;
} else {
    if (($multiple = trim($_GET['multiple'])) == "") {
        $multiple = null;
    } else {
        if (($multiple == "unzipdir" || $multiple == "unpackdir") && isset($_GET['getcwd'])) if (file_exists($getcwd = trim($_GET['getcwd']))) {
            if (isset($_GET['new'])) $_SESSION['ffpath'] = $getcwd;
        }
        $multiple = "&multiple=$multiple";
    }
}
xhtml_head("爱特文件管理器");
echo "<div class=\"love\">\n";
echo "<form action=\"\" method=\"GET\">\n";
echo "路径跳转:<input type=\"text\" name=\"path\" />\n";
if ($multiple != null) echo "<input type=\"hidden\" name=\"multiple\" value=\"{$_GET['multiple']}\" />\n";
echo "<input type=\"submit\" value=\"GO\" />\n";
echo "</form>\n";
echo "</div>\n";
echo "<div class=\"love\">\n";
if (function_exists("disk_total_space") && function_exists("disk_free_space")) {
    echo "分区大小:" . ___filesize(disk_total_space($path)) . "&nbsp;&nbsp;空闲空间:" . ___filesize(disk_free_space($path)) . "<br />";
}
echo "浏览路径:[<a href=\"?path=" . urlencode(___realpath($path . "/..")) . "$multiple\">UP</a>]&nbsp;&nbsp;" . ___shortpath(___realpath($path));
if ($multiple != null) echo "&nbsp;&nbsp;[<a href=\"./multiple.php?type={$_GET['multiple']}&gopath=" . urlencode($path) . "\">选定</a>|<a href=\"./index.php?path=" . urlencode($path) . "\">关闭</a>]";
echo "&nbsp;&nbsp;[<a href=\"{$_SERVER['SCRIPT_NAME']}?{$_SERVER['QUERY_STRING']}&logout\">Logout</a>]\n";
echo "\n</div>\n";
if (($data = $filesystem->getpath()) === false) {
    echo "<div class=\"error\">抱歉，系统无法获取对应目录内容！</div>\n";
} elseif ($data === null) {
    echo "<div class=\"error\">抱歉，这是一个无内容的空目录哦！</div>\n";
    echo "<div class=\"love\">\n";
    echo "<form action=\"multiple.php?getcwd=" . urlencode($path) . "\" method=\"POST\">";
    echo "<select name=\"type\">\n";
    echo "<option value=\"list\">文件清单（管理）</option>\n";
    echo "<option value=\"move\">移动文件（多选）</option>\n";
    echo "<option value=\"copy\">复制文件（多选）</option>\n";
    echo "<option value=\"pkzip\">压缩文件（多选）</option>\n";
    echo "<option value=\"chmod\">权限修改（多选）</option>\n";
    echo "<option value=\"delete\">删除文件（多选）</option>\n";
    echo "<option value=\"create\">建立数据（目录）</option>\n";
    echo "<option value=\"upload\">本地远程（上传）</option>\n";
    echo "<option value=\"addlist\">文件清单（加入）</option>\n";
    echo "<option value=\"sendfile\">发送文件（邮箱）</option>\n";
    if (function_exists("shell_exec")) {
        echo "<option value=\"shell_exec\">终端命令（高级）</option>\n";
    }
    echo "</select>\n";
    echo "<input type=\"submit\" value=\"执行操作\" />\n";
    echo "</form>\n";
    echo "</div>\n";
} else {
    $select = isset($_GET['select']) ? "checked " : null;
    echo "<form action=\"multiple.php?getcwd=" . urlencode($path) . "\" method=\"POST\">";
    echo "<div class=\"love\">\n";
    echo "<select name=\"type\">\n";
    echo "<option value=\"list\">文件清单（管理）</option>\n";
    echo "<option value=\"move\">移动文件（多选）</option>\n";
    echo "<option value=\"copy\">复制文件（多选）</option>\n";
    echo "<option value=\"pkzip\">压缩文件（多选）</option>\n";
    echo "<option value=\"chmod\">权限修改（多选）</option>\n";
    echo "<option value=\"delete\">删除文件（多选）</option>\n";
    echo "<option value=\"create\">建立数据（目录）</option>\n";
    echo "<option value=\"upload\">本地远程（上传）</option>\n";
    echo "<option value=\"addlist\">文件清单（加入）</option>\n";
    echo "<option value=\"sendfile\">发送文件（邮箱）</option>\n";
    if (function_exists("shell_exec")) {
        echo "<option value=\"shell_exec\">终端命令（高级）</option>\n";
    }
    echo "</select>\n";
    echo "<input type=\"submit\" value=\"执行\" />\n";
    echo "（<a href=\"?path=" . urlencode($path) . "&select$multiple\">全选</a>|<a href=\"?path=" . urlencode($path) . "$multiple\">消选</a>）\n";
    echo "</div>\n";
    if (count($data[0]) != 0) {
        echo "\n<div class=\"like\">目录列表</div>\n";
        foreach ($data[0] as $tmp) {
            $filesystem->chpath($tmp);
            echo "<div class=\"love\">\n";
            echo "<input type=\"checkbox\" name=\"flist[]\" value=\"" . urlencode($tmp) . "\" $select/>\n";
            echo ($perms = $filesystem->getperms()) == false ? "[????]" : "[$perms]";
            echo "<a href=\"?path=" . urlencode($tmp) . "$multiple\">" . ___basename($tmp) . "</a>\n";
            if (is_link($tmp)) echo "[&nbsp;Link&nbsp;-&gt;&nbsp;" . readlink($tmp) . "&nbsp;]";
            echo "（<a href=\"./rename.php?path=" . urlencode($tmp) . "\">命名</a>|<a href=\"./autocp.php?path=" . urlencode($tmp) . "\">复件</a>）\n";
            echo "</div>\n";
        }
    }
    if (count($data[1]) != 0) {
        echo "\n<div class=\"like\">文件列表</div>\n";
        foreach ($data[1] as $tmp) {
            $filesystem->chpath($tmp);
            $iget = $filesystem->getpath();
            echo "<div class=\"love\">\n";
            echo "<input type=\"checkbox\" name=\"flist[]\" value=\"" . urlencode($tmp) . "\" $select/>\n";
            echo ($perms = $filesystem->getperms()) == false ? "[????]" : "[$perms]";
            echo "<a href=\"./file.php?path=" . urlencode($tmp) . "\">" . ___basename($tmp) . "</a>（" . ___filesize($iget['size']) . "）\n";
            echo "<br />\n";
            echo "<a href=\"./dget.php?path=" . urlencode($tmp) . "\">下载</a>|";
            if ($mime = ___getmime($tmp, 'png:jpg:gif:bmp:zip')) {
                if ($mime == 'application/zip') {
                    echo "<a href=\"./unzip.php?path=" . urlencode($tmp) . "\">解压</a>";
                } else {
                    echo "<a href=\"./dget.php?mime=" . urlencode($mime) . "&path=" . urlencode($tmp) . "\">打开</a>";
                }
            } else {
                echo "<a href=\"./view.php?path=" . urlencode($tmp) . "\">查看</a>";
            }
            echo "|<a href=\"./editor.php?path=" . urlencode($tmp) . "\">编辑</a>|<a href=\"./rename.php?path=" . urlencode($tmp) . "\">命名</a>|<a href=\"./autocp.php?path=" . urlencode($tmp) . "\">复件</a>|<a href=\"./autopk.php?path=" . urlencode($tmp) . "\">压缩</a>\n";
            if (is_link($tmp)) echo "<br />\n链接指向&nbsp;:&nbsp;" . readlink($tmp) . "\n";
            if ($finfo = $filesystem->getfinfo()) echo "\n<br />\n档案信息&nbsp;:&nbsp;$finfo\n";
            echo "</div>\n";
        }
    }
    if (count($data[2]) != 0) {
        echo "\n<div class=\"like\">未知列表</div>\n";
        foreach ($data[2] as $tmp) {
            $filesystem->chpath($tmp);
            echo "<div class=\"love\">\n";
            echo "<input type=\"checkbox\" name=\"flist[]\" value=\"" . urlencode($tmp) . "\" $select/>\n";
            if (is_link($tmp)) echo "[Link]";
            echo ($perms = $filesystem->getperms()) == false ? "[????]" : "[$perms]";
            echo "$tmp\n";
            echo "</div>\n";
        }
    }
    echo "</form>\n";
}
xhtml_footer();
?>
