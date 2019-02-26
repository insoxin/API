<?php
if (basename($_SERVER['SCRIPT_NAME']) != "auto.php") {
    if (!file_exists("admin.php")) {
        if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['password2'])) {
            if (strlen($u = trim($_POST['username'])) >= 5 && strlen($p = trim($_POST['password'])) >= 5 && $p === trim($_POST['password2'])) {
                $data = "<?php\ndefine(\"U\",\"$u\");\ndefine(\"P\",\"$p\");\n?>";
                if (file_put_contents("admin.php", $data)) {
                    header("Location: {$_SERVER['SCRIPT_NAME']}?{$_SERVER['QUERY_STRING']}");
                    exit;
                } else {
                    $info = "没有权限写入配置文件！";
                }
            } else {
                $info = "没有正确输入配置信息！";
            }
        }
        require "xhtml.php";
        header("Content-Type:text/html;charset=UTF-8");
        xhtml_head("配置系统");
        echo "<div class=\"love\">\n";
        echo "<form action=\"{$_SERVER['SCRIPT_NAME']}?{$_SERVER['QUERY_STRING']}\" method=\"POST\">\n";
        echo "用户昵称：<br />\n<input type=\"text\" name=\"username\" /><br />\n";
        echo "用户密码：<br />\n<input type=\"text\" name=\"password\" /><br />\n";
        echo "重复密码：<br />\n<input type=\"password\" name=\"password2\" /><br />\n";
        echo "<input type=\"submit\" value=\"配置超级帐号\" />\n";
        echo "</form>\n";
        echo "</div>\n";
        if (isset($info)) {
            echo "<div class=\"like\">\n配置系统错误信息\n</div>\n";
            echo "<div class=\"love\">\n$info\n</div>\n";
        }
        xhtml_footer();
        exit;
    }
}
?>
