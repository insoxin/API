<?/*
Function: Show your IP in image
Nov 14,2005

参考Internet上的教程，修改制作

-Freeware-
*/
if(!function_exists('imagetypes')) die("ERROR: GD LIB IS NOT LOADED!");

header("Content-type: image/png");



/*=================*/

 =  ("test.png");//读取图片名

 = imagecolorallocate(, 183, 150, 37); //文字颜色


imagestring(,3,125,44,"[ From ".." / ".show_system()." / ".show_browser()." ]",); //（,字大小，左右，上下）
//imagestring(,3,72,26,"[".show_system()." / ".show_browser()."]",);
imagepng();
imagedestroy();

function show_browser(){
 = ;
 = preg_match("/IE 5.0/i", );
 = preg_match("/IE 5.5/i", );
 = preg_match("/IE 6.0/i", );
 = preg_match("/Opera/i", );
if ( == 1) {
 = "Ie 4.0";
} else if ( == 1) {
 = "IE 5.0";
} else if ( == 1) {
 = "IE 5.5";
} else if ( == 1) {
 = "IE 6.0";
} else if ( == 1) {
 = "Opera";
} else {
 = "n/a";
}
return();
}

function show_system(){
 = ;
 = preg_match("/Windows nt 5.1/i", );
 = preg_match("/Windows xp/i", );
 = preg_match("/Linux/i", );
 = preg_match("/Win 9x 4.90/i", );
 = preg_match("/Windows me/i", );
 = preg_match("/Windows nt 5.0/i", );
 = preg_match("/Windows 2000/i", );
 = preg_match("/Windows nt 3.1/i", );
 = preg_match("/Windows nt 3.5.0/i", );
 = preg_match("/Windows nt 3.5.1/i", );
 = preg_match("/Windows nt 4.0/i", );
 = preg_match("/Windows 98/i", );
 = preg_match("/Windows 95/i", );
if ( == 1 or  == 1) {
 = "Win XP";
} else if ( == 1) {
 = "Linux";
} else if ( == 1 or  == 1) {
 = "Win ME";
} else if ( == 1 or  == 1) {
 = "Win 2000";
} else if ( == 1 or  == 1 or  == 1 or  == 1) {
 = "Win NT";
} else if ( == 1 and  != 1) {
 = "Win 98";
} else if ( == 1) {
 = "Win 95";
} else {
 = "n/a";
}
return();
}

?>