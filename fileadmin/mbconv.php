<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (!is_file($path = trim($_GET['path']))) {
    header("Location: ./404.php");
    exit;
} else {
    xhtml_head("文件编码转换");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>转换提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    if (!function_exists("mb_convert_encoding") || !function_exists("mb_list_encodings")) {
        echo "核心函数库没有被支持！\n";
    } elseif (!is_readable($path)) {
        echo "无法读取输入文件内容！\n";
    } elseif (!isset($_GET['ic']) || !isset($_GET['pc']) || !isset($_GET['save'])) {
        echo "编码转换参数没有设置！\n";
    } elseif (($ic = trim($_GET['ic'])) == "" || ($pc = trim($_GET['pc'])) == "" || ($save = trim($_GET['save'])) == "") {
        echo "编码转换参数不能为空！\n";
    } elseif ($ic == $pc) {
        echo "输入输出编码不能一致！\n";
    } elseif (!in_array($ic, mb_list_encodings()) || !in_array($pc, mb_list_encodings())) {
        echo "选择的编码格式不支持！\n";
    } else {
        if (!strstr($save, "/") && !strstr($save, "\\")) $save = (dirname($path) . "/" . $save);
        if ($save == $path) {
            echo "新路径应不同于老路径！\n";
        } elseif (!($data = file_get_contents($path))) {
            echo "读取失败或者文件为空！\n";
        } elseif (!file_put_contents($save, mb_convert_encoding($data, $pc, $ic))) {
            echo "无权限写入或写入错误！\n";
            file_exists($save) && unlink($save);
        } elseif (filesize($save) < 1) {
            unlink($save);
            echo "无法成功进行编码转换！\n";
        } else {
            echo "编码已转换并写入文件！\n";
        }
    }
    echo "</div>\n";
    xhtml_footer();
}
?>
