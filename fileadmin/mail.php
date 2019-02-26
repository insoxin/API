<?php
require "config.php";
if (!isset($_SESSION['flist']) || !isset($_GET['mail'])) {
    header("Location: ./404.php");
    exit;
}
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
xhtml_head("文件发送");
if (count($_SESSION['flist']) < 1) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回</a>]抱歉，文件清单为空！\n";
    echo "</div>\n";
} elseif (!stripos($_GET['mail'], "@")) {
    echo "<div class=\"error\">\n";
    echo "[<a href=\"./multiple.php?type=sendfile&getcwd=" . urlencode($getcwd) . "\">返回</a>]抱歉，明显不是邮箱！\n";
    echo "</div>\n";
} else {
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">文件列表</a>(操作结果)\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    if (function_exists("pcntl_fork")) {
        $pid = pcntl_fork();
    }
    if (!isset($pid)) {
        if (___sendfile(trim($_GET['mail']), $_SESSION['flist'])) {
            echo "系统已经发送邮件！\n";
        } else {
            echo "系统无法发送邮件！\n";
        }
    } elseif ($pid == -1) {
        if (___sendfile(trim($_GET['mail']), $_SESSION['flist'])) {
            echo "系统已经发送邮件！\n";
        } else {
            echo "系统无法发送邮件\n！";
        }
    } else {
        if ($pid == 0) {
            ___sendfile(trim($_GET['mail']), $_SESSION['flist']);
            exit;
        }
        echo "系统正在投递邮件！\n";
    }
    echo "</div>\n";
}
xhtml_footer();
?>
