<?php
require "config.php";
if (!isset($_GET['getcwd'])) {
    $getcwd = OPEN;
} else {
    $getcwd = ___realpath(trim($_GET['getcwd']));
}
if (!is_dir($getcwd)) {
    header("Location: ./404.php");
    exit;
}
xhtml_head("批量上传");
echo "<div class=\"like\">\n";
echo "<a href=\"./index.php?path=" . urlencode($getcwd) . "\">返回目录</a>\n";
if (isset($_GET['url'])) {
    echo "<a href=\"?getcwd=" . urlencode($getcwd) . "\">本地上传</a>\n";
} else {
    echo "<a href=\"?url&getcwd=" . urlencode($getcwd) . "\">远程上传</a>\n";
}
echo "</div>\n";
echo "<div class=\"love\">\n";
echo "<form action=\"\" method=\"GET\">\n";
echo "<input type=\"hidden\" name=\"getcwd\" value=\"$getcwd\" />\n";
if (isset($_GET['url'])) echo "<input type=\"hidden\" name=\"url\" />\n";
echo "数量-&gt;<input type=\"text\" name=\"uploadnum\" />\n";
echo "<input type=\"submit\" value=\"GO\" />\n";
echo "</form>\n";
echo "</div>\n";
if (isset($_GET['url'])) {
    if (isset($_POST['fupload'])) if (is_array($_POST['fupload'])) if (count($_POST['fupload']) > 0) {
        $o = 0;
        $i = 0;
        echo "<div class=\"like\">上传文件信息报告</div>\n";
        while ($i < count($_POST['fupload'])) {
            if (!preg_match("/^[a-z0-9]+\:\/\/.+/si", $_POST['fupload'][$i])) {
                $i++;
                continue;
            }
            preg_match("/[^\/\?&\s\:\\\]+$/i", $_POST['fupload'][$i], $fname);
            $fname = $fname[0] != "" ? $fname[0] : time() . ".file";
            if (!($fp = fopen(trim($_POST['fupload'][$i]), "rb"))) {
                echo "<div class=\"error\">\n";
                echo "{$fname}（Error&nbsp;!）\n";
                echo "</div>\n";
            } elseif (!($fp2 = fopen($fpath = "$getcwd/$fname", "wb"))) {
                echo "<div class=\"error\">\n";
                echo "{$fname}（Error&nbsp;!）\n";
                echo "</div>\n";
            } else {
                while (!feof($fp)) {
                    fwrite($fp2, fread($fp, 4096));
                }
                fclose($fp);
                fclose($fp2);
                if (filesize($fpath) > 0) {
                    echo "<div class=\"love\">\n";
                    echo "{$fname}（Yes&nbsp;!）\n";
                    echo "</div>\n";
                } else {
                    unlink($fpath);
                    echo "<div class=\"error\">\n";
                    echo "{$fname}（Error&nbsp;!）\n";
                    echo "</div>\n";
                }
            }
            $o++;
            $i++;
        }
        if ($o < 1) echo "郁闷，没有任何文件被上传！\n";
    }
    echo "<div class=\"like\">输入您的上传地址</div>\n";
    echo "<form action=\"?url&getcwd=" . urlencode($getcwd) . "\" method=\"POST\">\n";
    if (!isset($_GET['uploadnum'])) {
        echo "<div class=\"love\">\n";
        echo "地址[+]<input type=\"text\" name=\"fupload[]\" />\n";
        echo "</div>\n";
    } else {
        $i = 0;
        $uploadnum = (int)trim($_GET['uploadnum']);
        if ($uploadnum < 1) $uploadnum = 1;
        while ($i < $uploadnum) {
            echo "<div class=\"love\">\n";
            echo "地址[" . ($i + 1) . "]<input type=\"text\" name=\"fupload[]\" />\n";
            echo "</div>\n";
            $i++;
        }
    }
    echo "<div class=\"love\">\n";
    echo "<input type=\"submit\" value=\"远程上传所有文件\" />（有效&nbsp;地址）\n";
    echo "</div>\n";
    echo "</form>\n";
} else {
    if (isset($_FILES['fupload'])) if (count($_FILES['fupload']) > 0) {
        $o = 0;
        $i = 0;
        echo "<div class=\"like\">上传文件信息报告</div>\n";
        while ($i < count($_FILES['fupload']['size'])) {
            if ($_FILES['fupload']['size'][$i] < 1) {
                $i++;
                continue;
            }
            if (!move_uploaded_file($_FILES['fupload']['tmp_name'][$i], $getcwd . "/" . $_FILES['fupload']['name'][$i])) {
                echo "<div class=\"error\">\n";
                echo "{$_FILES['fupload']['name'][$i]}（Error&nbsp;!）\n";
                echo "</div>\n";
            } else {
                echo "<div class=\"love\">\n";
                echo "{$_FILES['fupload']['name'][$i]}（" . ___filesize($_FILES['fupload']['size'][$i]) . "）\n";
                echo "</div>\n";
            }
            $o++;
            $i++;
        }
        if ($o < 1) echo "郁闷，没有任何文件被上传！\n";
    }
    echo "<div class=\"like\">选择您的上传文件</div>\n";
    echo "<form action=\"?getcwd=" . urlencode($getcwd) . "\" method=\"POST\" enctype=\"multipart/form-data\">\n";
    if (!isset($_GET['uploadnum'])) {
        echo "<div class=\"love\">\n";
        echo "文件[+]<input type=\"file\" name=\"fupload[]\" />\n";
        echo "</div>\n";
    } else {
        $i = 0;
        $uploadnum = (int)trim($_GET['uploadnum']);
        if ($uploadnum < 1) $uploadnum = 1;
        while ($i < $uploadnum) {
            echo "<div class=\"love\">\n";
            echo "文件[" . ($i + 1) . "]<input type=\"file\" name=\"fupload[]\" />\n";
            echo "</div>\n";
            $i++;
        }
    }
    echo "<div class=\"love\">\n";
    echo "<input type=\"submit\" value=\"上传所有选择文件\" />（有效&nbsp;文件）\n";
    echo "</div>\n";
    echo "</form>\n";
}
xhtml_footer();
?>
