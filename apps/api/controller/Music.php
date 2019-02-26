<?php
/*
* @Author: ecitlm
* @Date:   2017-05-29 19:31:05
* @Last Modified by:   ecitlm
* @Last Modified time: 2017-05-30 18:04:42
*/

namespace app\api\controller;


class Music
{
    /**
     * 音乐新歌榜
     * @return \think\response\Json
     */
    public function new_songs()
    {
        $res = HttpGet(config("MUSIC_API") . "&json=true");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['data']
        ]);

    }

    /**
     * 音乐排行榜
     * @return \think\response\Json
     */
    public function rank_list()
    {
        $res = HttpGet(config("MUSIC_API") . "/rank/list&json=true");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['rank']['list']
        ]);
    }

    /**
     *排行榜下的音乐列表
     */
    public function rank_info_list()
    {
        $rankid = intval($_GET ['rankid']);
        $url = config("MUSIC_API") . "/rank/info/{$rankid}&json=true";
        $res = HttpGet($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);

    }

    /**
     * 歌单
     * @return \think\response\Json
     */
    public function plist()
    {
        $res = HttpGet(config("MUSIC_API") . "/plist/index&json=true");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['plist']['list']['info']
        ]);
    }


    /**
     * 歌单下的列表
     * @return \think\response\Json
     */
    public function plist_list()
    {

        $specialid = intval($_GET ['specialid']);
        $url = config("MUSIC_API") . "/rank/list/{$specialid}&json=true";
        $res = HttpGet($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['rank']['list']
        ]);
    }

    /**
     * 歌手分类
     * @return \think\response\Json
     */
    public function singer_class()
    {
        $res = HttpGet(config("MUSIC_API") . "/singer/class&json=true");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['list']
        ]);
    }


    /**分类下面的歌手列表
     * @return \think\response\Json
     */

    public function singer_list()
    {

        $classid = intval($_GET ['classid']);
        $url = config("MUSIC_API") . "/singer/list/{$classid}&json=true";
        $res = HttpGet($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }


    /**
     * 歌手信息
     * @return \think\response\Json
     */
    public function singer_info()
    {
        $singerid = intval($_GET ['singerid']);
        $url = config("MUSIC_API") . "/singer/info/{$singerid}&json=true";
        $res = mobile_curl($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }

    /**
     * 音乐详情
     * @return \think\response\Json
     */
    public function song_info()
    {

        $hash = $_GET['hash'];
        $url = config("MUSIC_API") . "app/i/getSongInfo.php?cmd=playInfo&hash={$hash}";
        $res = mobile_curl($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }

    /**
     * 带歌词歌曲信息
     * @return \think\response\Json
     */
    public function song_info1()
    {
        $hash = $_GET['hash'];
        $url = "http://www.kugou.com/yy/index.php?r=play/getdata&hash={$hash}";
        $res = mobile_curl($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }

    /**
     * 音乐搜索
     * @return \think\response\Json
     */
    public function search()
    {
        $keyword = $_GET['keyword'];
        $url = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=" . $keyword . "&page=1&pagesize=20&showtype=1";
        $res = mobile_curl($url);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)
        ]);
    }
}