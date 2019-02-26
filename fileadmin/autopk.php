<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (!is_file($path = trim($_GET['path']))) {
    header("Location: ./404.php");
    exit;
} elseif (!is_readable($path)) {
    xhtml_head("压缩文件");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>错误提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "此文件您没有读取权限！";
    echo "</div>\n";
    xhtml_footer();
    exit;
}
xhtml_head("压缩文件");
echo "[<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\">返回目录</a>]\n";
if (isset($_GET['pk'])) {
    $pk = trim($_GET['pk']);
    if ($pk != "gz" && $pk != "bz2") {
        echo "无法支持你的压缩！";
    } elseif (file_exists("$path.$pk")) {
        echo "目标压缩已经存在！";
    } elseif (!($fp = fopen($path, "rb"))) {
        echo "无法打开您的文件！";
    } else {
        switch ($pk) {
            case "gz" :
                if (!function_exists("gzopen")) {
                    echo "没有核心函数支持！";
                } elseif (!($gz = gzopen("$path.$pk", "w"))) {
                    echo "无法打开目标文件！";
                } else {
                    while (!feof($fp)) {
                        gzwrite($gz, fread($fp, 4096));
                    }
                    gzclose($gz);
                    echo "压缩文件已经创建！";
                }
                break;
            case "bz2" :
                if (!function_exists("bzopen")) {
                    echo "没有核心函数支持！";
                } elseif (!($bz2 = bzopen("$path.$pk", "w"))) {
                    echo "无法打开目标文件！";
                } else {
                    while (!feof($fp)) {
                        bzwrite($bz2, fread($fp, 4096));
                    }
                    bzclose($bz2);
                    echo "压缩文件已经创建！";
                }
                break;
        }
        fclose($fp);
    }
} else {
    echo "创建<a href=\"?pk=gz&path=" . urlencode($path) . "\">Gzip</a>&nbsp;<a href=\"?pk=bz2&path=" . urlencode($path) . "\">Bzip2</a>压缩！";
}
xhtml_footer();
?>
