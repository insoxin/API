<?php
require "config.php";
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
xhtml_head("建立数据");
echo "<div class=\"like\">\n<a href=\"./index.php?path=" . urlencode($getcwd) . "\"]>返回目录</a>\n数据数量</div>\n";
echo "<div class=\"love\">\n";
echo "<form action=\"\" method=\"GET\">\n";
echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
echo "数量-&gt;<input type=\"text\" name=\"createnum\" />\n";
echo "<input type=\"submit\" value=\"GO\" />\n";
echo "</form>\n";
echo "</div>\n";
if (isset($_POST['createtype']) && isset($_POST['createpath'])) if (is_array($_POST['createtype']) && is_array($_POST['createpath'])) if (count($_POST['createtype']) == count($_POST['createpath']) && count($_POST['createtype']) > 0) {
    $o = 0;
    $i = 0;
    echo "<div class=\"like\">批量创建数据报告</div>\n";
    while ($i < count($_POST['createtype'])) {
        $createtype = trim($_POST['createtype'][$i]);
        $createpath = trim($_POST['createpath'][$i]);
        if ($getcwd == $createpath || $createpath == "") {
            $i++;
            continue;
        }
        if ($createtype == "dir") {
            if (!strstr($createpath, "/") && !strstr($createpath, "\\")) {
                if (mkdir($getcwd . "/" . $createpath, 0755)) {
                    echo "<div class=\"love\">\n";
                    echo "文件目录&nbsp;$createpath&nbsp;成功创建\n";
                    echo "</div>\n";
                } else {
                    echo "<div class=\"error\">\n";
                    echo "文件目录&nbsp;$createpath&nbsp;无法创建\n";
                    echo "</div>\n";
                }
            } else {
                if (mkdir($createpath, 0755)) {
                    echo "<div class=\"love\">\n";
                    echo "文件目录&nbsp;$createpath&nbsp;成功创建\n";
                    echo "</div>\n";
                } else {
                    echo "<div class=\"error\">\n";
                    echo "文件目录&nbsp;$createpath&nbsp;无法创建\n";
                    echo "</div>\n";
                }
            }
        } elseif ($createtype == "file") {
            if (!strstr($createpath, "/") && !strstr($createpath, "\\")) {
                if (file_exists($getcwd . "/" . $createpath)) {
                    echo "<div class=\"error\">\n";
                    echo "文件路径&nbsp;$createpath&nbsp;已经存在\n";
                    echo "</div>\n";
                } else {
                    if (!($fp = fopen($getcwd . "/" . $createpath, "w"))) {
                        echo "<div class=\"error\">\n";
                        echo "空白文件&nbsp;$createpath&nbsp;无法创建\n";
                        echo "</div>\n";
                    } else {
                        fclose($fp);
                        echo "<div class=\"love\">\n";
                        echo "空白文件&nbsp;$createpath&nbsp;成功创建\n";
                        echo "</div>\n";
                    }
                }
            } else {
                if (file_exists($createpath)) {
                    echo "<div class=\"error\">\n";
                    echo "文件路径&nbsp;$createpath&nbsp;已经存在\n";
                    echo "</div>\n";
                } else {
                    if (!($fp = fopen($createpath, "w"))) {
                        echo "<div class=\"error\">\n";
                        echo "空白文件&nbsp;$createpath&nbsp;无法创建\n";
                        echo "</div>\n";
                    } else {
                        fclose($fp);
                        echo "<div class=\"love\">\n";
                        echo "空白文件&nbsp;$createpath&nbsp;成功创建\n";
                        echo "</div>\n";
                    }
                }
            }
        }
        $o++;
        $i++;
    }
    if ($o < 1) echo "郁闷，没有任何文件被操作！\n";
}
echo "<div class=\"like\">定义创建数据路径</div>\n";
echo "<form action=\"?getcwd=" . urlencode($getcwd) . "\" method=\"POST\">\n";
if (!isset($_GET['createnum'])) {
    echo "<div class=\"love\">\n";
    echo "<select name=\"createtype[]\">\n";
    echo "<option value=\"dir\">文件目录</option>\n";
    echo "<option value=\"file\">空白文件</option>\n";
    echo "</select>\n";
    echo "路径[+]<input type=\"text\" name=\"createpath[]\" />\n";
    echo "</div>\n";
} else {
    $i = 0;
    $createnum = (int)trim($_GET['createnum']);
    if ($createnum < 1) $createnum = 1;
    while ($i < $createnum) {
        echo "<div class=\"love\">\n";
        echo "<select name=\"createtype[]\">\n";
        echo "<option value=\"dir\">文件目录</option>\n";
        echo "<option value=\"file\">空白文件</option>\n";
        echo "</select>\n";
        echo "路径[" . ($i + 1) . "]<input type=\"text\" name=\"createpath[]\" />\n";
        echo "</div>\n";
        $i++;
    }
}
echo "<div class=\"love\">\n";
echo "<input type=\"submit\" value=\"创建所有输入数据\" />（有效&nbsp;数据）\n";
echo "</div>\n";
echo "</form>\n";
xhtml_footer();
?>
