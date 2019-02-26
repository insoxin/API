<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (($path = trim($_GET['path'])) == "") {
    header("Location: ./404.php");
    exit;
} elseif (!is_file($path)) {
    header("Location: ./404.php");
    exit;
} elseif (!is_writable($path)) {
    xhtml_head("编辑文件");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>错误提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "此文件您没有写入权限！";
    echo "</div>\n";
    xhtml_footer();
} else {
    xhtml_head("编辑文件");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>选择编码\n";
    echo "</div>\n";
    echo "<div class=\"love\">";
    echo "<form action=\"\" method=\"GET\">\n";
    echo "<select name=\"charset\">\n";
    if (!function_exists("mb_convert_encoding")) {
        echo "<option>缺少模块</option>\n";
    } else {
        $sencode = mb_list_encodings();
        usort($sencode, "___sortcmp");
        foreach ($sencode as $encode) {
            if ($encode == "pass") {
                continue;
            }
            if (function_exists("mb_encoding_aliases")) {
                $alias = mb_encoding_aliases($encode);
                echo "\n<optgroup label=\"$encode\">\n";
                echo "<option value=\"$encode\">$encode</option>\n";
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
                echo "<option value=\"$encode\">$encode</option>\n";
            }
        }
    }
    echo "</select>\n";
    echo "<input type=\"hidden\" name=\"path\" value=\"$path\" />";
    echo "<input type=\"submit\" value=\"设置编码\" />\n";
    echo "</form>\n";
    echo "</div>\n";
    if (isset($_POST['content'])) if (trim($_POST['content']) != "") {
        echo "<div class=\"like\">文件保存情况报告</div>\n";
        if (!get_magic_quotes_gpc()) {
            $fcontent = $_POST['content'];
        } else {
            $fcontent = stripslashes($_POST['content']);
        }
        if (isset($_POST['charset'])) if (trim($_POST['charset']) != "") {
            $fcontent = ___convert($fcontent, trim($_POST['charset']), "UTF-8");
        }
        echo "<div class=\"love\">\n";
        if (file_put_contents($path, $fcontent)) {
            echo "文件数据已经成功存储！\n";
        } else {
            echo "文件数据无法存入文件！\n";
        }
        echo "</div>\n";
    }
    $data = file_get_contents($path);
    if (!isset($_GET['charset'])) {
        $charset = null;
        $content = ___codepre($data, null);
    } elseif (($charset = trim($_GET['charset'])) == "") {
        $content = ___codepre($data, null);
    } else {
        $content = ___codepre(___convert($data, "UTF-8", $charset), null);
    }
    echo "<div class=\"like\">爱特文本编辑工具</div>\n";
    echo "<div class=\"love\">\n";
    echo "<form action=\"?path=" . urlencode($path) . "&charset={$charset}\" method=\"POST\">\n";
    echo "<input type=\"submit\" value=\"保存文件\" />\n";
    echo "<input type=\"reset\" value=\"重置文件\" />\n<br />\n";
    if (isset($_GET['charset'])) if ($charset != "") {
        echo "<input type=\"hidden\" name=\"charset\" value=\"$charset\" />\n";
    }
    echo "<textarea name=\"content\" style=\"width:99%;height:400px;\">$content</textarea>\n<br/>\n";
    echo "</form>\n";
    echo "</div>\n";
    xhtml_footer();
}
?>
