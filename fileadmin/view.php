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
} elseif (!is_readable($path)) {
    xhtml_head("查看文件");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>错误提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "此文件您没有读取权限！";
    echo "</div>\n";
    xhtml_footer();
} else {
    xhtml_head("查看文件");
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
    echo "<div class=\"like\">爱特文件内容浏览</div>\n";
    if (filesize($path) > (2 * 1024 * 1024)) {
        echo "<div class=\"love\">\n";
        echo "文件过大，请下载后查看！\n";
        echo "</div>\n";
    } else {
        echo "<div class=\"love\">\n";
        if (!($data = file_get_contents($path))) {
            echo "读取文件时发生了错误！\n";
        } else {
            echo "<pre>";
            if (!isset($_GET['charset'])) {
                echo nl2br(___codepre(___convert(trim($data), "UTF-8")));
            } elseif (($charset = trim($_GET['charset'])) == "") {
                echo nl2br(___codepre(___convert(trim($data), "UTF-8")));
            } else {
                echo nl2br(___codepre(___convert(trim($data), "UTF-8", $charset)));
            }
            echo "<pre>\n";
        }
        echo "</div>";
    }
    xhtml_footer();
}
?>
