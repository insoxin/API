<?php //随机输出目录中的图片
$image_directory = "./uploads/2017/08/"; //设定图片目录
$image_type = array(".jpg",".gif",".png"); //设定图片类型
header("location:$image_directory./".image_rand_output($image_directory,$image_type)."");
function image_rand_output($image_directory,$image_type) //随机输出图片函数
{
    $dh = dir($image_directory);
    while (false !== ($image = $dh -> read()))
    {
        if(in_array(strtolower(strrchr($image,".")),$image_type))
            $image_array[] = $image;
    }
    $dh -> close();
    $key = array_rand($image_array);
    return $image_array[$key];
}
?>