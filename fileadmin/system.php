<?php
function ___sortcmp()
{
    $a = func_get_arg(0);
    $b = func_get_arg(1);
    return strcasecmp($a, $b);
}

function ___codepre()
{
    $str = func_get_arg(0);
    if (func_num_args() > 1) {
        $arr1 = array("&", "\"", "'", "<", ">", '"');
        $arr2 = array("&amp;", "&quot;", "&apos;", "&lt;", "&gt;", "&#039;");
    } else {
        $arr1 = array("&", "\"", "'", "<", ">", " ", '"');
        $arr2 = array("&amp;", "&quot;", "&apos;", "&lt;", "&gt;", "&nbsp;", "&#039;");
    }
    return str_replace($arr1, $arr2, $str);
}

function ___ziplist()
{
    $zip = trim(func_get_arg(0));
    if (!is_readable('pclzip.php') || !___getmime($zip, 'zip')) return false;
    require 'pclzip.php';
    $pclzip = new pclzip($zip);
    if (!($getlist = $pclzip->listContent())) return false;
    if (!is_array($getlist) || count($getlist) < 1) return false;
    return $getlist;
}

function ___convert()
{
    $str = func_get_arg(0);
    if (!function_exists("mb_convert_encoding")) return $str;
    $encode = func_num_args() < 2 ? "UTF-8" : func_get_arg(1);
    $enlist = func_num_args() > 2 ? func_get_arg(2) : "auto,CP936";
    return mb_convert_encoding($str, $encode, $enlist);
}

function ___getmime()
{
    $path = trim(func_get_arg(0));
    if (func_num_args() >= 2) {
        $type = trim(func_get_arg(1));
        $type = explode(':', $type);
    }
    if (!is_file($path)) return false;
    if (!($fp = fopen($path, "rb"))) return false;
    $bsupport = array(
        array('jpg', 'ffd8ff', 'image/jpeg'),
        array('png', '89504e47', 'image/png'),
        array('gif', '47494638', 'image/gif'),
        array('bmp', '424d', 'image/x-ms-bmp'),
        array('zip', '504b0304', 'application/zip'));
    $headstr = bin2hex(fread($fp, 4));
    fclose($fp);
    foreach ($bsupport as $temp) {
        if (preg_match("/^$temp[1]/i", $headstr)) {
            if (!isset($type)) {
                return $temp[2];
            } elseif (in_array($temp[0], $type)) {
                return $temp[2];
            }
        }
    }
    return false;
}

function ___sendfile()
{
    $i = 0;
    $to = func_get_arg(0);
    $fs = func_get_arg(1);
    if (!is_file("email.php")) {
        return false;
    } else {
        require "email.php";
    }
    if ($to == "" || !is_array($fs)) {
        return false;
    } elseif (count($fs) < 1) {
        return false;
    }
    $systags = uniqid("");
    $subject = "your files";
    $headers = "Content-Type: multipart/mixed; boundary=\"$systags\"\r\n";
    $emailbody = "--$systags\r\n";
    $emailbody .= "Content-type: text/plain; charset=utf-8\r\n";
    $emailbody .= "Content-transfer-encoding: 8bit\r\n\r\n";
    while ($i < count($fs)) {
        if (!is_file($fs[$i]) || !is_readable($fs[$i])) continue;
        $attachment = chunk_split(base64_encode(file_get_contents($fs[$i])));
        $emailbody .= "--$systags\r\n";
        $emailbody .= "Content-type: application/octet-stream; name=" . ___basename($fs[$i]) . "\r\n";
        $emailbody .= "Content-transfer-encoding: base64\r\n\r\n";
        $emailbody .= "$attachment\r\n\r\n";
        $i++;
    }
    $emailbody .= "--$systags--";
    return email($to, "from aite.me file manager", $emailbody, $headers);
}

function ___download()
{
    $path = trim(func_get_arg(0));
    $size = filesize($path);
    (isset($_SERVER['HTTP_RANGE']) && !empty($_SERVER['HTTP_RANGE']) && $range = substr($_SERVER['HTTP_RANGE'], 6)) || $range = '0-' . ($size - 1);
    if (substr($range, -1) == '-') {
        $init = substr($range, 0, -1);
        $stop = $size - 1;
    } elseif (substr($range, 0, 1) == '-') {
        $init = $size - substr($range, 1) - 1;
        $stop = $size - 1;
    } else {
        $init_stop = explode('-', $range);
        $init = $init_stop[0];
        $stop = $init_stop[1];
    }
    header('HTTP/1.1 206 Partial Content');
    header('Accept-Ranges: bytes');
    header('Content-Type: application/force-download');
    header('Content-Disposition: attachment; filename=' . ___basename($path));
    header("Content-Range: bytes $init-$stop/$size");
    header('Content-Length: ' . ($stop - $init + 1));
    $fp = fopen($path, "rb");
    fseek($fp, $init);
    while (!feof($fp)) {
        echo fread($fp, 4096);
        if (ftell($fp) > $stop) {
            break;
        }
    }
    fclose($fp);
}

function ___basename()
{
    $path = trim(func_get_arg(0));
    $path = str_replace("\\", "/", $path);
    $path = explode("/", $path);
    return ___convert($path[count($path) - 1]);
}

function ___realpath()
{
    $path = func_get_arg(0);
    $path = str_replace('\\', '/', $path);
    if (!is_link($path)) return realpath($path);
    return preg_replace('/[^:]?\/{2,}/si', '/', $path);
}

function ___filesize()
{
    $size = trim(func_get_arg(0));
    if ($size < 1024) {
        return $size . " B";
    } elseif ($size < 1024 * 1024) {
        return number_format($size / 1024, 3) . " KB";
    } elseif ($size < 1024 * 1024 * 1024) {
        return number_format($size / 1024 / 1024, 3) . " MB";
    } elseif ($size < 1024 * 1024 * 1024 * 1024) {
        return number_format($size / 1024 / 1024 / 1024, 3) . " GB";
    } else {
        return number_format($size / 1024 / 1024 / 1024 / 1024, 3) . " TB";
    }
}

function ___superexec()
{
    $cmd = trim(func_get_arg(0));
    if (php_uname("s") != "Linux") return false;
    if ($cmd == "" || !function_exists("proc_open") || !function_exists("stream_get_contents")) {
        return false;
    }
    if (!is_resource($sh = proc_open("exec sh", array(0 => array("pipe", "r"), 1 => array("pipe", "w")), $pipes))) {
        return false;
    }
    fwrite($pipes[0], "export LANG=\"zh_CN.utf8\"\n");
    fwrite($pipes[0], $cmd);
    fclose($pipes[0]);
    $result = stream_get_contents($pipes[1]);
    fclose($pipes[1]);
    proc_close($sh);
    return trim($result);
}

function ___shortpath()
{
    $path = trim(func_get_arg(0));
    $path = ___convert($path, "UTF-8");
    if (function_exists('mb_strlen')) {
        if (mb_strlen($path, "UTF-8") <= 18) return $path;
    } else {
        if (strlen($path) <= 18) return $path;
    }
    $path1 = function_exists('mb_substr') ? mb_substr($path, -9, 9, "UTF-8") : substr($path, -9);
    $path2 = function_exists('mb_substr') ? mb_substr($path, 0, 9, "UTF-8") : substr($path, 0, 9);
    return $path2 . "&nbsp;....&nbsp;" . $path1;
}

?>
