<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (!file_exists($path = trim($_GET['path']))) {
    header("Location: ./404.php");
    exit;
}
xhtml_head("创建复件");
echo "[<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\">返回目录</a>]\n";
if (isset($_GET['yes'])) {
    $to = dirname($path) . "/" . ___basename($path) . "-copy";
    if (file_exists($to)) {
        echo "目标复件已经存在！";
    } else {
        $fs = new filesystem($path);
        if ($fs->cppath($to)) {
            echo "成功为您创建复件！";
        } else {
            echo "无法为您创建复件！";
        }
    }
} else {
    echo "需要复件，<a href=\"?yes&path=" . urlencode($path) . "\">确认创建</a>？";
}
xhtml_footer();
?>
