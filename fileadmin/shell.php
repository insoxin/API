<?php
require "config.php";
if (!isset($_GET['getcwd'])) {
    header("Location: ./404.php");
    exit;
} elseif (!is_dir($getcwd = trim($_GET['getcwd']))) {
    header("Location: ./404.php");
    exit;
} elseif (!function_exists("shell_exec")) {
    xhtml_head("SHELL");
    echo "<div class=\"like\">\n";
    echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\"]>返回目录</a>错误提示\n";
    echo "</div>\n";
    echo "<div class=\"love\">\n";
    echo "您没有打开SHELL权限！";
    echo "</div>\n";
    xhtml_footer();
    exit;
}
chdir($getcwd);
xhtml_head("SHELL");
echo "<div class=\"like\">\n";
echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>SHELL\n";
echo "</div>\n";
echo "<div class=\"love\">\n";
echo "<form action=\"?getcwd=" . urlencode($getcwd) . "\" method=\"POST\">\n";
echo "<input type=\"submit\" value=\"执行命令\" />\n";
echo "<input type=\"reset\" value=\"重置终端\" />\n<br />\n";
echo "<textarea name=\"shell\" style=\"width:99%;height:100px;\"></textarea>\n<br/>\n";
echo "</form>\n";
echo "</div>\n";
if (isset($_POST['shell'])) if (($s = trim($_POST['shell'])) != "") {
    echo "<div class=\"like\">\n结果返回SHELL\n</div>\n";
    echo "<div class=\"love\">\n";
    if (function_exists("proc_open") && function_exists("stream_get_contents") && php_uname("s") == "Linux") {
        if (!($sh = proc_open("sh", array(0 => array("pipe", "r"), 1 => array("pipe", "w")), $pipes))) {
            echo "Open Shell Error !";
        } else {
            $i = 0;
            $shell = explode("\n", $s);
            while ($i < count($shell)) {
                $x = trim($shell[$i]);
                fwrite($pipes[0], "$x\n");
                $i++;
            }
            fclose($pipes[0]);
            $stream = stream_get_contents($pipes[1]);
            if ($stream != "") {
                echo "<pre>" . nl2br(___codepre(trim($stream))) . "</pre>";
            } else {
                echo "NULL";
            }
            fclose($pipes[1]);
            proc_close($sh);
        }
    } else {
        $i = 0;
        $shell = explode("\n", $s);
        while ($i < count($shell)) {
            $sh = trim($shell[$i]);
            echo "shell#&nbsp;$sh<br />\n";
            echo nl2br(___codepre(shell_exec($sh))) . "\n";
            $i++;
        }
    }
    echo "</div>\n";
}
xhtml_footer();
?>
