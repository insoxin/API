<?php
require "config.php";
if (!isset($_GET['gopath']) || !isset($_SESSION['flist']) || !file_exists("pclzip.php")) {
    header("Location: ./404.php");
    exit;
}
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
xhtml_head("文件压缩");
if (count($_SESSION['flist']) < 1) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，文件清单为空！\n";
    echo "</div>\n";
} else {
    require "pclzip.php";
    $pkzip = new pclzip($gopath = trim($_GET['gopath']));
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">目录</a>]\n";
    if ($pkzip->create($_SESSION['flist'], PCLZIP_OPT_REMOVE_PATH, dirname($gopath))) {
        echo "文件&nbsp;" . ___basename($gopath) . "&nbsp;创建成功！";
    } else {
        echo "文件&nbsp;" . ___basename($gopath) . "&nbsp;无法建立！";
    }
}
xhtml_footer();
?>
