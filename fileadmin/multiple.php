<?php
require "config.php";
if (!isset($_REQUEST['type'])) {
    header("Location: ./404.php");
    exit;
} elseif (($type = trim($_REQUEST['type'])) == "") {
    header("Location: ./404.php");
    exit;
}
if (!isset($_GET['gopath'])) {
    $gopath = OPEN;
} else {
    $gopath = ___realpath(trim($_GET['gopath']));
}
if (!isset($_GET['getcwd'])) {
    $getcwd = $gopath;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
if ($type == "list") {
    header("Location: ./flist.php?getcwd=" . urlencode($getcwd));
    exit;
} elseif ($type == "create") {
    header("Location: ./create.php?getcwd=" . urlencode($getcwd));
    exit;
} elseif ($type == "upload") {
    header("Location: ./upload.php?getcwd=" . urlencode($getcwd));
    exit;
} elseif ($type == "addlist") {
    if (isset($_POST['flist'])) if (count($_POST['flist']) > 0) {
        if (!isset($_SESSION['flist'])) $_SESSION['flist'] = array();
        $_SESSION['flist'] = array_filter(array_unique(array_merge($_SESSION['flist'], array_map('urldecode', $_POST['flist']))));
        usort($_SESSION['flist'], "___sortcmp");
    }
    header("Location: ./flist.php?getcwd=" . urlencode($getcwd));
    exit;
} elseif ($type == "unzipdir") {
    if (isset($_SESSION['ffpath'])) if (!is_dir($_SESSION['ffpath'])) {
        header("Location: ./unzip.php?path=" . urlencode($_SESSION['ffpath']) . "&unzipdir=" . urlencode($getcwd));
        exit;
    }
    header("Location: ./404.php");
    exit;
} elseif ($type == "unpackdir") {
    if (isset($_SESSION['ffpath'])) if (!is_dir($_SESSION['ffpath'])) {
        header("Location: ./file.php?path=" . urlencode($_SESSION['ffpath']) . "&unpackdir=" . urlencode($getcwd));
        exit;
    }
    header("Location: ./404.php");
    exit;
} elseif ($type == "shell_exec") {
    header("Location: ./shell.php?getcwd=" . urlencode($getcwd));
    exit;
}
if (isset($_POST['flist'])) {
    if (!is_array($_POST['flist'])) {
        $_SESSION['flist'] = array();
    } else {
        $_SESSION['flist'] = array_map('urldecode', $_POST['flist']);
    }
} elseif (!isset($_SESSION['flist'])) {
    $_SESSION['flist'] = array();
}
switch ($type) {
    case "move" :
        xhtml_head("批量移动");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            echo "<div class=\"like\">\n";
            echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "&multiple=$type\">选择路径</a>(目标目录)\n";
            echo "</div>\n";
            echo "<div class=\"love\">\n";
            echo "<form action=\"move.php\" method=\"GET\">\n";
            echo "<input type=\"text\" name=\"gopath\" value=\"$getcwd\" />\n";
            echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
            echo "<input type=\"submit\" value=\"GO\" />\n";
            echo "</form>\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    case "copy" :
        xhtml_head("批量复制");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            echo "<div class=\"like\">\n";
            echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "&multiple=$type\">选择路径</a>(目标目录)\n";
            echo "</div>\n";
            echo "<div class=\"love\">\n";
            echo "<form action=\"copy.php\" method=\"GET\">\n";
            echo "<input type=\"text\" name=\"gopath\" value=\"$getcwd\" />\n";
            echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
            echo "<input type=\"submit\" value=\"GO\" />\n";
            echo "</form>\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    case "pkzip" :
        xhtml_head("压缩文件");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            if (($zpath = ___realpath($getcwd)) == "/") {
                $zpath = $zpath .= "archive.zip";
            } else {
                $zpath = $zpath .= "/archive.zip";
            }
            echo "<div class=\"like\">\n";
            echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "&multiple=$type\">存放目录</a>(归档路径)\n";
            echo "</div>\n";
            echo "<div class=\"love\">\n";
            echo "<form action=\"pkzip.php\" method=\"GET\">\n";
            echo "<input type=\"text\" name=\"gopath\" value=\"$zpath\" />\n";
            echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
            echo "<input type=\"submit\" value=\"GO\" />\n";
            echo "</form>\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    case "chmod" :
        xhtml_head("批量改权");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            echo "<div class=\"like\">\n";
            echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">文件列表</a>(返回浏览)\n";
            echo "</div>\n";
            echo "<div class=\"love\">\n";
            echo "<form action=\"chmod.php\" method=\"GET\">\n";
            echo "递归权限:<input type=\"radio\" name=\"recursive\" value=\"on\" checked />开启\n";
            echo "<input type=\"radio\" name=\"recursive\" value=\"off\" />关闭\n<br />\n";
            echo "目录权限:<input type=\"text\" name=\"dirperms\" value=\"0755\" />\n";
            echo "<br />\n文件权限:<input type=\"text\" name=\"fileperms\" value=\"0644\" />\n";
            echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
            echo "<br />\n<input type=\"submit\" value=\"GO\" />\n";
            echo "</form>\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    case "delete";
        xhtml_head("批量删除");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            echo "<div class=\"love\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]\n";
            echo "此操作不可逆，<a href=\"./delete.php?getcwd=" . urlencode($getcwd) . "\">确认删除</a>？\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    case "sendfile" :
        xhtml_head("文件发送");
        if (count($_SESSION['flist']) < 1) {
            echo "<div class=\"error\">\n";
            echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，没有文件列表！\n";
            echo "</div>\n";
        } else {
            echo "<div class=\"like\">\n";
            echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>(接收邮箱)\n";
            echo "</div>\n";
            echo "<div class=\"love\">\n";
            echo "<form action=\"mail.php\" method=\"GET\">\n";
            echo "<input type=\"text\" name=\"mail\" />\n";
            echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
            echo "<input type=\"submit\" value=\"GO\" />\n";
            echo "</form>\n";
            echo "</div>\n";
            echo "<div class=\"like\">文件清单(选择列表)</div>\n";
            for ($i = 0; $i < count($_SESSION['flist']); $i++) {
                echo "<div class=\"love\">[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}</div>\n";
            }
        }
        xhtml_footer();
        break;
    default :
        header("Location: ./404.php");
        exit;
}
?>
