<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (!is_file($path = trim($_GET['path']))) {
    header("Location: ./404.php");
    exit;
} elseif (!($ziplist = ___ziplist($path))) {
    xhtml_head("爱特ZIP工具");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>错误提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "此文件暂时不能被系统操作！";
    echo "</div>\n";
    xhtml_footer();
    exit;
}
xhtml_head("爱特ZIP工具");
if (isset($_POST['z']) && is_array($_POST['z']) && isset($_POST['undir']) && is_dir(trim($_POST['undir']))) {
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>解压结果\n";
    echo "</div>\n";
    $pk = new pclzip($path);
    $dir = trim($_POST['undir']);
    $arr = array_map('urldecode', $_POST['z']);
    if (($zip = $pk->extract(PCLZIP_OPT_PATH, $dir, PCLZIP_OPT_BY_NAME, $arr)) == false) {
        echo "<div class=\"love\">\n";
        echo "无法成功解压您的文件！";
        echo "\n</div>\n";
    } else {
        echo "<div class=\"love\">\n";
        echo "本次共操作&nbsp;" . count($zip) . "&nbsp;个档案！";
        echo "\n</div>\n";
        foreach ($zip as $zf) {
            echo "<div class=\"love\">\n";
            if ($zf['folder']) {
                echo "[目录]";
            } else {
                echo "[文件]";
            }
            echo ___convert($zf['filename'], "UTF-8") . "（" . $zf['status'] . "）\n<br />\n";
            echo "</div>\n";
        }
    }
} else {
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>文件列表\n";
    echo "</div>\n";
    echo "<form action=\"{$_SERVER['REQUEST_URI']}\" method=\"post\">\n";
    echo "<div class=\"love\">\n";
    $unzipdir = dirname($path);
    isset($_GET['unzipdir']) && is_dir($_GET['unzipdir']) && $unzipdir = trim($_GET['unzipdir']);
    echo "解压<a href=\"./index.php?new&path=" . urlencode(dirname($path)) . "&multiple=unzipdir&getcwd=" . urlencode($path) . "\">到此</a>路径：\n";
    echo "<input type=\"text\" name=\"undir\" value=\"$unzipdir\" />\n";
    echo "<input type=\"submit\" value=\"UNZIP\" />\n";
    echo "（<a href=\"{$_SERVER['REQUEST_URI']}&select\">全选</a>|<a href=\"./unzip.php?path=" . urlencode($path) . "&unzipdir=" . urlencode($unzipdir) . "\">消选</a>）\n";
    echo "</div>\n";
    $select = isset($_GET['select']) ? "checked " : null;
    foreach ($ziplist as $zfile) {
        echo "<div class=\"love\">\n";
        echo "<input type=\"checkbox\" name=\"z[]\" value=\"" . urlencode($zfile['stored_filename']) . "\" $select/>\n";
        if ($zfile['folder']) {
            echo "[目录]" . ___codepre(___convert($zfile['stored_filename'], "UTF-8"));
        } else {
            echo "[文件]" . ___codepre(___convert($zfile['stored_filename'], "UTF-8"));
            echo "（" . ___filesize($zfile['size']) . "-&gt;" . ___filesize($zfile['compressed_size']) . "）";
        }
        echo "\n</div>\n";
    }
    echo "</form>\n";
}
xhtml_footer();
?>
