<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (is_dir($path = ___realpath(trim($_GET['path'])))) {
    header("Location: ./404.php");
    exit;
}
$fs = new filesystem($path);
xhtml_head(___shortpath($path));
if (!($data = $fs->getpath($path))) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>]\n";
    echo "</div>\n";
} else {
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\">返回目录</a>文件详情\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "文件名称：" . ___basename($path) . "<br />\n";
    if ($perms = $fs->getperms()) echo "文件权限：$perms<br />\n";
    echo "文件大小：" . ___filesize($data['size']) . "<br />\n";
    echo "所有者ID：{$data['uid']}<br />\n";
    echo "所有组ID：{$data['gid']}<br />\n";
    if (function_exists("mime_content_type")) echo "文件类型：" . mime_content_type($path) . "<br />\n";
    echo "上次访问：" . gmdate("Y-m-d H:i:s", ($data['atime']) + TIME) . "<br />\n";
    echo "上次修改：" . gmdate("Y-m-d H:i:s", ($data['mtime']) + TIME) . "<br />\n";
    echo "上次改变：" . gmdate("Y-m-d H:i:s", ($data['ctime']) + TIME) . "<br />\n";
    if (is_link($path)) echo "链接指向：" . readlink($path) . "<br />\n";
    if ($finfo = $fs->getfinfo()) echo "档案信息：$finfo\n";
    echo "</div>\n";
    echo "<div class=\"like\">\n";
    echo "爱特解压<a href=\"./index.php?new&path=" . urlencode(dirname($path)) . "&multiple=unpackdir&getcwd=" . urlencode($path) . "\">目标目录</a>\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "<form action=\"unpack.php\" method=\"GET\">\n";
    echo "<input type=\"hidden\" name=\"path\" value=\"$path\" />";
    if (!isset($_GET['unpackdir'])) {
        echo "目标：<input type=\"text\" name=\"unpackdir\" value=\"" . dirname($path) . "\" /><br />\n";
    } else {
        echo "目标：<input type=\"text\" name=\"unpackdir\" value=\"" . trim($_GET['unpackdir']) . "\" /><br />\n";
    }
    echo "类型：<input type=\"radio\" name=\"type\" value=\"gz\" />GZ<input type=\"radio\" name=\"type\" value=\"bz2\" />BZ2<input type=\"radio\" name=\"type\" value=\"zip\" checked />ZIP<input type=\"radio\" name=\"type\" value=\"tar\" />TAR<br />\n";
    if (___superexec('pwd') != "") {
        echo "[+]高级：<input type=\"radio\" name=\"type\" value=\"7za\" />7ZA（众多格式支持）<br />\n";
        echo "[+]特殊：<input type=\"radio\" name=\"type\" value=\"rar\" />RAR（调用软件解压）<br />\n";
        echo "[+]密码：<input type=\"text\" name=\"password\" /><br />\n";
    }
    echo "<input type=\"submit\" value=\"释放资源到指定的目录\" />（目录需存在）\n";
    echo "</form>\n";
    echo "</div>\n";
    if (function_exists("mb_convert_encoding") && function_exists("mb_list_encodings")) {
        $sencode = mb_list_encodings();
        usort($sencode, "___sortcmp");
        echo "<div class=\"like\">\n爱特编码转换工具\n</div>\n";
        echo "<div class=\"love\">\n";
        echo "<form action=\"mbconv.php\" method=\"GET\">\n";
        echo "<input type=\"hidden\" name=\"path\" value=\"$path\" />\n";
        echo "输入编码：<select name=\"ic\">\n";
        foreach ($sencode as $encode) {
            if ($encode == "pass") {
                continue;
            } else {
                if (function_exists("mb_encoding_aliases")) {
                    $alias = mb_encoding_aliases($encode);
                    echo "\n<optgroup label=\"$encode\">\n";
                    if ($encode == "auto") {
                        echo "<option value=\"$encode\" selected>$encode</option>\n";
                    } else {
                        echo "<option value=\"$encode\">$encode</option>\n";
                    }
                    if (is_array($alias)) if (count($alias) >= 1) {
                        usort($alias, "___sortcmp");
                        foreach ($alias as $encodealias) {
                            if ($encodealias == $encode) {
                                continue;
                            }
                            echo "<option value=\"$encode\">$encodealias</option>\n";
                        }
                    }
                    echo "</optgroup>\n";
                } else {
                    if ($encode == "auto") {
                        echo "<option value=\"$encode\" selected>$encode</option>\n";
                    } else {
                        echo "<option value=\"$encode\">$encode</option>\n";
                    }
                }
            }
        }
        echo "</select>\n";
        echo "<br />\n";
        echo "输出编码：<select name=\"pc\">\n";
        foreach ($sencode as $encode) {
            if ($encode == "auto" || $encode == "pass") {
                continue;
            } else {
                if (function_exists("mb_encoding_aliases")) {
                    $alias = mb_encoding_aliases($encode);
                    echo "\n<optgroup label=\"$encode\">\n";
                    if ($encode == "UTF-8") {
                        echo "<option value=\"$encode\" selected>$encode</option>\n";
                    } else {
                        echo "<option value=\"$encode\">$encode</option>\n";
                    }
                    if (is_array($alias)) if (count($alias) >= 1) {
                        usort($alias, "___sortcmp");
                        foreach ($alias as $encodealias) {
                            if ($encodealias == $encode) {
                                continue;
                            }
                            echo "<option value=\"$encode\">$encodealias</option>\n";
                        }
                    }
                    echo "</optgroup>\n";
                } else {
                    if ($encode == "UTF-8") {
                        echo "<option value=\"$encode\" selected>$encode</option>\n";
                    } else {
                        echo "<option value=\"$encode\">$encode</option>\n";
                    }
                }
            }
        }
        echo "</select>\n";
        echo "<br />\n";
        echo "存档路径：<input type=\"text\" name=\"save\" value=\"" . ___basename($path) . ".out\" />（RW）\n";
        echo "<br />\n";
        echo "<input type=\"submit\" value=\"转换编码并存档到指定文件路径\" />（覆盖式写入）\n";
        echo "<br />\n";
        echo "</form>\n";
        echo "</div>\n";
    }
    echo "<div class=\"like\">\n爱特文件效验工具\n</div>\n";
    echo "<div class=\"love\">\n";
    echo "md5：";
    if (isset($_GET['md5'])) {
        echo "<br />" . md5_file($path);
    } else {
        echo "<a href=\"./file.php?{$_SERVER['QUERY_STRING']}&md5\">文件的&nbsp;MD5&nbsp;散列值</a>（效验文件）\n";
    }
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "sha1：";
    if (isset($_GET['sha1'])) {
        echo "<br />" . sha1_file($path);
    } else {
        echo "<a href=\"./file.php?{$_SERVER['QUERY_STRING']}&sha1\">文件的&nbsp;SHA1&nbsp;散列值</a>（效验文件）\n";
    }
    echo "</div>\n";
}
xhtml_footer();
?>
