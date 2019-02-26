<?php
require "config.php";
if (!isset($_GET['gopath']) || !isset($_SESSION['flist'])) {
    header("Location: ./404.php");
    exit;
}
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
xhtml_head("批量移动");
if (!is_dir($gopath = trim($_GET['gopath']))) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./multiple.php?type=move&getcwd=" . urlencode($getcwd) . "\">返回</a>]抱歉，目标目录非法！\n";
    echo "</div>\n";
} elseif (count($_SESSION['flist']) < 1) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，文件清单为空！\n";
    echo "</div>\n";
} else {
    $i = 0;
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">文件列表</a>(操作结果)\n";
    echo "</div>";
    while ($i < count($_SESSION['flist'])) {
        if (rename($_SESSION['flist'][$i], $tmp = ($gopath . "/" . ___basename($_SESSION['flist'][$i])))) {
            echo "<div class=\"love\">[$i][√]&nbsp;-&nbsp;$tmp</div>\n";
        } else {
            echo "<div class=\"error\">[$i][×]&nbsp;-&nbsp;$tmp</div>\n";
        }
        $i++;
    }
    unset($_SESSION['flist']);
}
xhtml_footer();
?>
