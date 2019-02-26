<?php
require "config.php";
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
if (!isset($_SESSION['flist'])) $_SESSION['flist'] = array();
if (isset($_POST['addpath'])) if (is_array($_POST['addpath'])) {
    if (count($_POST['addpath']) > 0) {
        $_SESSION['flist'] = array_filter(array_unique(array_merge($_SESSION['flist'], $_POST['addpath'])));
        usort($_SESSION['flist'], "___sortcmp");
    }
}
if (isset($_GET['clean'])) if (($clean = trim($_GET['clean'])) != "") {
    switch ($clean) {
        case "all" :
            $_SESSION['flist'] = array();
            header("Location: flist.php?getcwd=" . urlencode($getcwd));
            break;
        case "array" :
            if (isset($_POST['fclean'])) if (is_array($_POST['fclean'])) if (count($_POST['fclean']) > 0) {
                foreach ($_POST['fclean'] as $tmp) {
                    unset($_SESSION['flist'][(int)trim($tmp)]);
                }
                usort($_SESSION['flist'], "___sortcmp");
            }
            header("Location: flist.php?getcwd=" . urlencode($getcwd));
            break;
        default :
            if (isset($_SESSION['flist'][(int)$clean])) {
                unset($_SESSION['flist'][(int)$clean]);
                usort($_SESSION['flist'], "___sortcmp");
            }
            header("Location: flist.php?getcwd=" . urlencode($getcwd));
            exit;
    }
}
xhtml_head("文件清单");
echo "<div class=\"like\">添加自定义的路径(/file||url://)</div>\n";
echo "<div class=\"love\">\n";
echo "<form action=\"\" method=\"GET\">\n";
echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
echo "添加-&gt;<input type=\"text\" name=\"addnum\" />\n";
echo "<input type=\"submit\" value=\"GO\" />\n";
echo "</form>\n";
echo "</div>\n";
echo "<form action=\"?getcwd=" . urlencode($getcwd) . "\" method=\"POST\">\n";
if (!isset($_GET['addnum'])) {
    echo "<div class=\"love\">\n";
    echo "路径[+]<input type=\"text\" name=\"addpath[]\" />\n";
    echo "</div>\n";
} else {
    $i = 0;
    $addnum = (int)trim($_GET['addnum']);
    if ($addnum < 1) $addnum = 1;
    while ($i < $addnum) {
        echo "<div class=\"love\">\n";
        echo "路径[" . ($i + 1) . "]<input type=\"text\" name=\"addpath[]\" /><br />\n";
        echo "</div>\n";
        $i++;
    }
}
echo "<div class=\"love\">\n";
echo "<input type=\"submit\" value=\"添加所有输入路径\" />（有效&nbsp;路径）\n";
echo "</div>\n";
echo "</form>\n";
if (count($_SESSION['flist']) < 1) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>]抱歉，没有文件列表查看！\n";
    echo "</div>\n";
} else {
    echo "<div class=\"like\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>]\n";
    echo "文件清单(<a href=\"./flist.php?getcwd=" . urlencode($getcwd) . "&clean=all\">清空列表</a>)\n";
    echo "</div>\n";
    echo "<form action=\"./flist.php?clean=array&getcwd=" . urlencode($getcwd) . "\" method=\"POST\">\n";
    echo "<div class=\"love\">\n";
    echo "<input type=\"submit\" value=\"从清单中清除所选\" />\n";
    echo "（<a href=\"?cs&getcwd=" . urlencode($getcwd) . "\">全选</a>|<a href=\"?getcwd=" . urlencode($getcwd) . "\">消选</a>）\n";
    echo "</div>\n";
    $select = isset($_GET['cs']) ? "checked " : null;
    for ($i = 0; $i < count($_SESSION['flist']); $i++) {
        echo "<div class=\"love\">\n";
        echo "<input type=\"checkbox\" name=\"fclean[]\" value=\"$i\" $select/>\n";
        echo "[<a href=\"./flist.php?getcwd=" . urlencode($getcwd) . "&clean=$i\">清除</a>]\n";
        echo "[$i]&nbsp;-&nbsp;{$_SESSION['flist'][$i]}\n";
        echo "</div>\n";
    }
    echo "</form>\n";
}
xhtml_footer();
?>
