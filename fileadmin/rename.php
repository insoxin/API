<?php
require "config.php";
if (!isset($_GET['path'])) {
    header("Location: ./404.php");
    exit;
} elseif (!file_exists($path = trim($_GET['path']))) {
    header("Location: ./404.php");
    exit;
}
if (isset($_GET['name'])) if (($name = trim($_GET['name'])) != "") {
    if (strpos($name, "/") === false || strpos($name, "\\")) {
        $to = dirname($path) . "/$name";
    } else {
        $to = $name;
    }
    if (rename($path, $to)) {
        header("Location: ?path=" . urlencode($to));
        exit;
    }
}
xhtml_head("重新命名");
echo "<div class=\"like\">\n<a href=\"./index.php?path=" . urlencode(dirname($path)) . "\"]>返回目录</a>\n新的命名</div>\n";
echo "<div class=\"love\">\n";
echo "<form action=\"\" method=\"GET\">\n";
echo "<input type=\"hidden\" name=\"path\" value=\"$path\" />\n";
echo "<input type=\"text\" name=\"name\" value=\"" . ___basename($path) . "\" />\n";
echo "<input type=\"submit\" value=\"命名\" />\n";
echo "</form>\n";
echo "</div>\n";
xhtml_footer();
?>
