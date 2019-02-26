<?php
require "config.php";
if (!isset($_GET['recursive']) || !isset($_GET['dirperms']) || !isset($_GET['fileperms']) || !isset($_SESSION['flist'])) {
    header("Location: ./404.php");
    exit;
}
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
xhtml_head("批量改权");
if (count($_SESSION['flist']) < 1) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，文件清单为空！\n";
    echo "</div>\n";
} else {
    $i = 0;
    $fs = new filesystem();
    $recursive = trim($_GET['recursive']) == "on" ? true : false;
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">文件列表</a>(操作结果)\n";
    echo "</div>";
    while ($i < count($_SESSION['flist'])) {
        $fs->chpath($tmp = $_SESSION['flist'][$i]);
        if ($fs->chmod(trim($_GET['dirperms']), trim($_GET['fileperms']), $recursive)) {
            echo "<div class=\"love\">[$i][√]&nbsp;-&nbsp;$tmp</div>\n";
        } else {
            echo "<div class=\"error\">[$i][×]&nbsp;-&nbsp;$tmp</div>\n";
        }
        $i++;
    }
}
xhtml_footer();
?>
