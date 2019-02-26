<?php

class filesystem
{
    private $path = null;

    function __construct()
    {
        if (func_num_args() > 0) $this->path = func_get_arg(0);
    }

    function chmod()
    {
        if (!function_exists("chmod") || !file_exists("perms.php")) return false;
        if (func_num_args() == 3) {
            $path = $this->path;
            $dirperms = func_get_arg(0);
            $fileperms = func_get_arg(1);
            $recursive = func_get_arg(2);
        } elseif (func_num_args() == 4) {
            $path = func_get_arg(0);
            $dirperms = func_get_arg(1);
            $fileperms = func_get_arg(2);
            $recursive = func_get_arg(3);
        } else {
            return false;
        }
        if (!file_exists($path)) return false;
        require "perms.php";
        if (!isset($perms["$dirperms"]) || !isset($perms["$fileperms"])) return false;
        if (!is_dir($path)) return chmod($path, $perms["$fileperms"]);
        if (!$recursive || !($dh = opendir($path))) return chmod($path, $perms["$dirperms"]);
        while (($entry = readdir($dh)) !== false) {
            if ($entry != "." && $entry != "..") {
                $this->chmod($path . "/" . $entry, $dirperms, $fileperms, $recursive);
            }
        }
        closedir($dh);
        return chmod($path, $perms["$dirperms"]);

    }

    function chpath()
    {
        if (func_num_args() < 1) {
            return false;
        } else {
            $this->path = func_get_arg(0);
        }
    }

    function cppath()
    {
        if (func_num_args() == 1) {
            $path = $this->path;
            $topath = func_get_arg(0);
        } elseif (func_num_args() == 2) {
            $path = func_get_arg(1);
            $topath = func_get_arg(0);;
        } else {
            return false;
        }
        if (!file_exists($path)) {
            return false;
        } elseif (!is_dir($path)) {
            return copy($path, $topath);
        } elseif (!mkdir($topath, 0755, true)) {
            return false;
        }
        if (!($dh = opendir($path))) return false;
        while (($entry = readdir($dh)) !== false) {
            if ($entry != "." && $entry != "..") {
                $this->cppath($topath . "/" . $entry, $path . "/" . $entry);
            }
        }
        closedir($dh);
        return true;
    }

    function rmpath()
    {
        if (func_num_args() > 0) {
            $path = func_get_arg(0);
        } else {
            $path = $this->path;
        }
        if (!file_exists($path) && !is_link($path)) {
            return true;
        } elseif (is_link($path)) {
            return unlink($path);
        } elseif (!is_dir($path)) {
            return unlink($path);
        }
        if (!($dh = opendir($path))) return false;
        while (($entry = readdir($dh)) !== false) {
            if ($entry != "." && $entry != "..") {
                $this->rmpath($path . "/" . $entry);
            }
        }
        return rmdir($path);
    }

    function getpath()
    {
        if (func_num_args() > 0) {
            $path = func_get_arg(0);
        } else {
            $path = $this->path;
        }
        if (is_dir($path)) {
            $fs = array(array(), array(), array());
            if (!($dh = opendir($path))) return false;
            while (($entry = readdir($dh)) !== false) {
                if ($entry != "." && $entry != "..") {
                    if (is_dir($entry = ___realpath($path . "/" . $entry))) {
                        $fs[0][] = $entry;
                    } elseif (is_file($entry)) {
                        $fs[1][] = $entry;
                    } else {
                        if ($entry != "") {
                            $fs[2][] = $entry;
                        }
                    }
                }
            }
            closedir($dh);
            if ((count($fs, 1) - 3) < 1) return null;
            if (count($fs[0]) > 0) usort($fs[0], "___sortcmp");
            if (count($fs[1]) > 0) usort($fs[1], "___sortcmp");
            if (count($fs[2]) > 0) usort($fs[2], "___sortcmp");
            return $fs;
        } elseif (file_exists($path)) {
            if (!($fs = stat($path))) {
                return false;
            } else {
                return $fs;
            }
        } else {
            return false;
        }
    }

    function getfinfo()
    {
        if (!function_exists("finfo_open")) return false;
        $finfo = finfo_open();
        if (func_num_args() > 0) {
            return finfo_file($finfo, func_get_arg(0));
        }
        return finfo_file($finfo, $this->path);
    }

    function getperms()
    {
        if (!function_exists("fileperms")) return false;
        if (func_num_args() > 0) {
            $path = func_get_arg(0);
            if (($perms = fileperms($path)) === false) {
                return false;
            } else {
                return substr(sprintf("%o", $perms), -4);
            }
        }
        if (($perms = fileperms($this->path)) === false) {
            return false;
        } else {
            return substr(sprintf("%o", $perms), -4);
        }
    }
}

?>
