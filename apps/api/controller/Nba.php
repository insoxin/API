<?php

/**
 * @Author: ecitlm
 * @Date:   2017-10-26 21:25:53
 * @Last Modified by:   ecitlm
 * @Last Modified time: 2017-11-07 22:52:43
 */

namespace app\api\controller;

class Nba extends Base
{
    /**
     * @return \think\response\Json
     *  获取赛事直播列表
     */
    public function schedule()
    {
        $md = (isset($_GET['date'])) ? $_GET ['date'] : "";
        $res = HttpGet("https://nb.3g.qq.com/nba/api/schedule@getList?md={$md}&sid=");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['schedule@getList']
        ]);

    }


    /**
     * [live_detail 比赛直播详情信息]
     */
    public function live_detail()
    {
        $schid = (isset($_GET['schid'])) ? $_GET ['schid'] : "1470215";
        $liveid = (isset($_GET['liveid'])) ? $_GET ['liveid'] : "2009587";
        $res = HttpGet("https://nb.3g.qq.com/nba/api/live@getInfo?i_schid={$schid}&i_liveid={$liveid}");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['live@getInfo']['data']
        ]);
    }


    /**
     * @return \think\response\Json
     * 直播内容
     */
    public function live_content()
    {
        $schid = (isset($_GET['schid'])) ? $_GET ['schid'] : "1470215";
        $res = HttpGet("https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=broadcast_content%2Cbroadcast_info&sch_id={$schid}");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['broadcast_content']['contentAry']
        ]);
    }

    /**
     * 球员技术统计
     * @return \think\response\Json
     */
    public function technical_statistics()
    {

        $schid = (isset($_GET['schid'])) ? $_GET ['schid'] : "1470215";
        $res = HttpGet("https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=live_stat_4_nba%2Cbroadcast_info&sch_id={$schid}&bid=2009605");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['live_stat_4_nba']
        ]);
    }

    /**
     * @return \think\response\Json
     * 球员详情
     */
    public function player_detail()
    {
        $playerid = (isset($_GET['playerid'])) ? $_GET ['playerid'] : "4130";
        $res = HttpGet("https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=player_detail&playerId={$playerid}&sid=");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['player_detail']
        ]);

    }

    /**
     * @return \think\response\Json
     * 联盟排名
     */
    public function team_rank()
    {
        $res = HttpGet("https://matchweb.sports.qq.com/rank/team?columnId=100000&from=NBA");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)[1]
        ]);
    }

    /**
     * @return \think\response\Json
     * 球队详情
     */
    public function team_info()
    {
        $id = (isset($_GET['teamId'])) ? $_GET ['teamId'] : "24";
        $res = HttpGet("https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=team_detail&teamId={$id}&sid=");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['team_detail']
        ]);

    }
    //球队赛程
    public function team_schedule(){
        $id = (isset($_GET['teamId'])) ? $_GET ['teamId'] : "24";
        $mouth = (isset($_GET['mouth'])) ? $_GET ['mouth'] : "11";
        $res = HttpGet("https://nb.3g.qq.com/nba/api/schedule@getMonthListByTeam?teamid={$id}&mouth={$mouth}&sid=");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['schedule@getMonthListByTeam']['data']
        ]);
    }

    /**
     * 球队阵容
     */
    public function Lineup()
    {
        $id = (isset($_GET['teamId'])) ? $_GET ['teamId'] : "24";
        $res = HttpGet("https://live.3g.qq.com/g/s?aid=action_api&module=nba&action=team_player&teamId={$id}&sid=");
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => json_decode($res, true)['team_player']['players']
        ]);
    }


    /**
     * @return \think\response\Json
     * 网易NBA新闻列表
     */
    public function new_list()
    {
        $page = (isset($_GET['page'])) ? $_GET ['page'] : "0";
        $page = $page * 15;
        $res = HttpGet("https://3g.163.com/touch/reconstruct/article/list/BD2AQH4Qwangning/{$page}-15.html");
        $arr = json_decode(substr($res, 9, -1), true)['BD2AQH4Qwangning'];
        //数据里面有一些直播的新闻数据、需要删除那些数据
        foreach ($arr as $k => $v) {
            if (!empty($arr[$k]['liveInfo'])) {
                unset($arr[$k]);
            }
        }
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr
        ]);
    }

    /**
     * @return \think\response\Json
     * 网易NBA新闻详情
     */
    public function news_info()
    {
        $id = (isset($_GET['docid'])) ? $_GET ['docid'] : "D22DCS5S0005877U";
        $res = HttpGet("http://3g.163.com/touch/article/{$id}/full.html");
        $arr = json_decode(substr($res, 12, -1), true);
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $arr[$id]
        ]);
    }

    /**
     * @return \think\response\Json
     * 文章评论
     */
    public function news_comments()
    {
        $id = (isset($_GET['docid'])) ? $_GET ['docid'] : "D22DCS5S0005877U";
        $res = HttpGet("https://comment.news.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/{$id}/comments/newList?offset=0&limit=20&headLimit=1&tailLimit=2&ibc=newswap&showLevelThreshold");
        $arr = json_decode($res, true)['comments'];
        $newArr = array();
        foreach ($arr as $k => $v) {
            array_push($newArr, $arr[$k]);
        }
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => $newArr
        ]);
    }


    /**
     * @return \think\response\Json
     * 关于个人的JSON数据
     */
    public function website()
    {
        return json([
            'msg' => 'success',
            'code' => 1,
            'data' => [
                'name' => "没有故事的小明同学",
                'job' => "Web开发工程师",
                'icon' => "https://coding.it919.cn/static/images/zixia.jpg",
                'address' => "深圳市南山区科技园",
                'latitude' => "22.549990",
                'longitude' => "113.950660",
                'github' => "https://github.com/ecitlm",
                'blog' => "https://code.it919.cn",
                'mail' => "ecitlm@163.com",
                'Motto' => '我们这一生，要走很远的路，有如水坦途，有荆棘挡道；有簇拥同行，有孤独漫步；有幸福如影，有苦痛袭扰；有迅跑，有疾走，有徘徊，还有回首……正因为走了许多路，经历的无数繁华与苍凉，才在时光的流逝中体会岁月的变迁，让曾经稚嫩的心慢慢地趋于成熟。',
                'music' => [
                    'src' => "https://coding.it919.cn/static/images/lzxs.mp3",
                    'author' => "许冠杰",
                    'name' => "浪子心声-纯音乐Music",
                    'poster' => "https://coding.it919.cn/static/images/lzxs.jpg"
                ]
            ]
        ]);
    }


    /**
     * 转发图片
     */
    public function img()
    {
        $filename = (isset($_GET['imgurl'])) ? $_GET ['imgurl'] : "https://code.it919.cn/img/head.jpg";
		header('content-type: image/jpeg');
        echo file_get_contents($filename);
        die();
       
    }
}