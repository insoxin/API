姬长信API
===============
食用方法

 基于Thinkphp 和X 易新闻 完善整理的新闻API接口
 + 新闻分类(头条/军事/娱乐/体育/科技/艺术/教育/要闻)数据接口
 + 视频分类(精品视频/搞笑视频/美女视频/体育视频/新闻现场)接口
 + 图片(cosplay)接口,花瓣相册接口
 + 段子笑话接口、天气预报接口
 + IT资讯前端开发日报、知乎日报等
 + bing每日图片壁纸
 + 二维码在线生成(phpqrcode)
 + ARU(阿鲁)表情包[作者授权]
 + 内置动漫二次元美女图片壁纸随机美女,宠物图片,随机动漫图片,随机抱枕图,卡通图片,二次元图片,IP图片
 + 各种精品美图，美术基础，游戏原画设定，插画，漫画，动画造型设定，
动画学习教程，动漫教程，画集，画册，UI，场景，3D模型素材，三次元艺用模特图片，二次元萝莉，萌图福利，可爱美少女壁纸，CG资源素材

---
###### 须知：姬长信API将会记录你的域名、使用流量、调用次数等重要信息，如介意，请勿使用。
---
###### 条款：姬长信API拥有所有运行权，在某些特定情况下，姬长信API有权利禁止你的网站调用。
---
## 0. 壁纸模块

说明:含http与https方式，国内外CDN驱动
使用百度云加速专业版,腾讯万象优图。
### 0.1 每日bing 

   **接口地址:**`bing_images.php`

   **调用例子:**
`//api.isoyu.com/bing_images.php`
### 0.2 美女图片壁纸 
说明:已经用了万象优图筛选，若遇到大尺度图片请记录图片id并admin@isoyu.com，我们会在第一时间删除
*2017.07.31增加至2257张*

   **接口地址:**`mm_images.php`

   **调用例子:**

`//api.isoyu.com/mm_images.php`
### 0.3 动态IP签名图片 
说明:可能会显cdnIP,字体<书体坊兰亭体>
   **可选参数:**
   `signature`自定义文本
   **接口地址:**

`ip_images.php`或`ip_images.php?signature=早安`

   **调用例子:**

`//api.isoyu.com/ip_images.php`或`//api.isoyu.com/ip_images.php?signature=早安`

### 0.4 动态图 
说明:资源还是有点少

   **接口地址:**
`gif_images.php`
   **调用例子:**

`//api.isoyu.com/gif_images.php`

### 0.5 抱枕图生成器 
说明:已经用了万象优图筛选，若遇到露骨图片请记录图片id并admin@isoyu.com，我们会在第一时间删除。
*2017.08.14增加至7391张，共20G。部分单个图片大小最高会在60Mb，所以加载会慢。*

   **接口地址:**`bao_images.php`

   **调用例子:**

`//api.isoyu.com/bao_images.php`
### 0.6 ARU(阿鲁)表情包 
说明:格式为png，gif 大小为s，l，xl ARU(阿鲁)表情包。表情包作者:`@_SiC_ `创意：＠YDXX丶（室友）

*2018.01.06更新*
*2018.01.09ARU(阿鲁)表情包。表情包作者:`@_SiC_ `已免费授权，会长期更新。*
   **接口地址:**
   <table>
   <tr>
    <td>GIF</td>
    <td>ARU_GIF_S.php</td>
    <td>ARU_GIF_L.php</td>
    <td>ARU_GIF_XL.php</td>
   </tr>
   <tr>
    <td>PNG</td>
    <td>ARU_PNG_S.php</td>
    <td>ARU_PNG_L.php</td>
    <td>ARU_PNG_XL.php</td>
   </tr>
   </table>
   **调用例子:**`//api.isoyu.com/ARU_GIF_S.php`

### 0.7 在线二维码 
说明：依靠phpqrcode，Version: 1.1.4 Build: 2010100721 下面是参数介绍。

**url**: *二维码对应的网址*

**m**  : *二维码白色边框尺寸,缺省值: 0px*

**e**  : *容错级别(errorLevel)，可选参数如下(缺省值 L)*：
     > L水平 7%的字码可被修正
     > M水平 15%的字码可被修正
     > Q水平 25%的字码可被修正
     > H水平 30%的字码可被修正
**p**  : *二维码尺寸，可选范围1-10(具体大小和容错级别有关)（缺省值：3）*

**常规用法**:  
`https://api.isoyu.com/qr/?m=0&e=L&p=3&url=https://api.isoyu.com`
**伪静态格式**:  
**格式**:    
`https://api.isoyu.com/qr/$m_$e_$p_$url_static.png`
**示 例**:  
`https://api.isoyu.com/qr/0_l_3_https://api.isoyu.com_static.png`

## 1. 新闻模块

说明: 包括 新闻模块banner轮播图接口、新闻分类列表分类接口、新闻详情接口、本地新闻接口 如下详情：

### 1.1新闻轮播图接口

   **必选参数:**
   无
   **接口地址:**
   `News/banner`

   **调用例子:**
   `//api.isoyu.com/demo/index.php/api/News/banner`

   返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:

### 1.2 新闻分类列表分类接口

   **必选参数:**
   `type` int : 新闻类型

   <table>
   <tr>
    <td>type</td>
    <td>0</td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
     <td>5</td>
     <td>6</td>
     <td>7</td>
   </tr>
   <tr>
    <td>名称</td>
    <td>头条</td>
    <td>军事</td>
    <td>娱乐</td>
    <td>体育</td>
    <td>科技</td>
    <td>艺术</td>
     <td>教育</td>
     <td>要闻</td>
   </tr>
   </table>

  `page` int : 分页页数,每页返回10条

   **接口地址:**
   `/News/new_list?type=1&page=20`

   **调用例子:**
   `//api.isoyu.com/demo/index.php/api/News/new_list?type=1&page=20`

   返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:


  

### 1.3 新闻详情接口

  **必选参数:**
    `postid` 新闻列表下的 postid

  **接口地址:**
  `/index.php/api/News/new_detail?postid=CLJN5K2M000181KT`

  **调用例子:**
  `//api.isoyu.com/demo//index.php/api/News/new_detail?postid=CLJN5K2M000181KT`

  返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "data": {
        "body": "<!--IMG#0--><p>　　毛泽东同志在《论持久战》一文中指出，日本的军力在东方是一等的。抗战中，真实的侵华日军并非像某些影视作品中所描述的那样不堪一击，而是十分凶狠猖狂、具有很强战斗力。为了战胜这只军国主义怪兽，中国军民进行了长达14年的生死搏斗才赢得战争胜利。中国人民抗日战争可以说是异常惨烈，这是为什么呢？这又能给今天的我们以什么样启示呢？</p><p>　　<strong>为什么抗日战争异常惨烈？</strong></p><p>　　<strong>——侵华日军作战能力分析及启示</strong></p><p>　　■王晓辉 李雨樵</p><p>　　毛泽东同志在《论持久战》一文中指出，日本的军力在东方是一等的。抗战中，真实的侵华日军并非像某些影视作品中所描述的那样不堪一击，而是十分凶狠猖狂、具有很强战斗力。为了战胜这只军国主义怪兽，中国军民进行了长达14年的生死搏斗才赢得战争胜利。中国人民抗日战争可以说是异常惨烈，这是为什么呢？这又能给今天的我们以什么样启示呢？</p><p>　　<strong>部队结构合成，具备了协同作战能力</strong></p><p>　　日本发动侵华战争时已经完成了工业化，其军队在组织结构和武器装备上已经初步完成机械化。日本陆军是侵华的主力，师团是其具有确定编制的第一级作战单位，一般由步兵、炮兵、骑兵、工兵和辎重部队等混合编成。其中，除步兵外，炮兵、骑兵、工兵等兵种也属于直接作战力量，其数量几乎占了师团编成内联队数量的一半。因此，一支现代陆军所要求的火力、突击力、机动力与保障力等，日军师团一个也不缺。故日军的陆、海、空军既能联手打大战，单个陆军师团也敢孤军突入，与数倍于己的对手独立作战。如淞沪会战与武汉会战，是日军侵华的两次大规模陆、海、空三军联合作战。日军两度获胜，反映出其三军协同作战的能力，这是当时中国军队所不及的；也反映出当时中国军队的落后，是一种结构性的整体性的落后。</p><p>　　<strong>结构决定功能，体系决定战斗力。军队结构落后于时代、落后于战争形态和作战方式发展，必然丧失军事竞争主动权。可以说，在未来战场上，谁的结构更利于集聚潜能、释放效能，谁的结构更符合制胜机理、打赢要求，谁就能占据优势、赢得先机。</strong></p><p>　　<strong>武器装备精良，形成了联合火力杀伤</strong></p><p>　　抗战期间，中日两军在武器装备质量数量方面存在着很大的差距。以侵华日军一个常设师团（即甲种师团）与中国精锐的陆军第88师（德械师）相比，两军装备的各种枪炮在性能上互有优长，但在数量上却拉开了差距：日军步枪数量是中国军队的1.6倍多，轻重机枪是2倍多，野战重炮是4倍多。在密集火力与重火力杀伤等方面，日本陆军对中国陆军构成了成倍的数量优势。此外，日本陆军作战还可以得到相当数量的空中火力支援以及坦克装甲部队的加强，可构筑一张陆、海、空三军联合火力网。如淞沪会战，是抗战中中日两军精锐部队首次硬碰硬的较量，也是中国军队牺牲最大、战斗最为惨烈的一役。中国军队进攻时，就会陷入日军的立体火力网；防御时，又会饱受日军的火力轰击，兵员损失达到一天一个师的惨烈程度。因此，面对侵华日军的立体火力网，中国军队只能凭借数量优势，以人海填火海，极为悲壮。</p><p>　　<strong>武器装备是构成战斗力最直接的物质基础。武器装备落后，人的能动作用在战争中也很难最大限度地发挥出来，要打赢战争就会付出更大的代价。因此，要赢得胜利既要敢于亮剑，又要善于铸剑，加快构建适应未来战争和履行使命要求的武器装备体系。</strong></p><p>　　<strong>作战组织严密，使得攻防转换比较灵活</strong></p><p>　　侵华日军作战组织与实施严密，使其火力杀伤更加精准、高效，因此总能掌控战场主动权。比如日军在淞沪会战时，首先，通过观测气球侦察中国军队阵地，标定攻击目标，然后召唤飞机、野战重炮与海军舰炮进行狂轰滥炸，尽量摧毁中国军队阵地。其次，待其陆、海、空火力突击后，日军便出动坦克掩护步兵，向中国军队阵地发起猛攻；与此同时，其炮兵火力实施延伸射击，对中国军队后方增援部队进行火力拦阻，力求大量杀伤有生力量。再次，如遭遇中国军队强力还击，日军即再次召唤火力轰击，然后再进行新一波步、坦协同攻击。此外，日本战机以组、队形式，在战场上空巡视，发现中国军队目标即进行轰炸与扫射，或召唤野战重炮与舰炮进行远程轰击。由于侵华日军在作战组织与实施上的严密性，使其无论在大兵团联合作战中，还是小股部队攻防战斗中，都能够做到军种间行动联合，步、坦、炮间火力协同，左右邻间相互配合，发挥出整体战力来。而正面战场中国军队在指挥上鲜有灵活创举，基本上处于见招拆招的被动地位。</p><p>　　<strong>战争对抗不仅是力量的对抗，而是综合较量。作战指挥，不是简单照条文操作或单纯计算就能解决的，面对战争复杂性的增加，单纯的技术或者单纯的谋略，都不可能掌控战场的主动权。而是应该谋力并举，既要讲指导的艺术，又要注重实力，二者相互支撑、不可偏废。</strong></p><p>　　<strong>军事训练严苛，保证了人员较高作战素养</strong></p><p>　　日军严苛的军事训练是其作战素养较高的主要原因。日军的训练可分为军官和士兵两部分，具有训练层次科学、训练课目覆盖面大、训练要求严格的特点。通过陆军士官学校文理兼顾的各兵种专业课程训练和后期各类技术兵种军官学校再教育，使得日军能够培养出一支高质量的基层军官队伍，且便于各兵种间的沟通和配合。士兵依照《步兵操典》组织常规单兵综合素质训练和中队以上的协同作战训练以及两个月的大队、联队级作战协同训练。而且日军新兵在转入小队、中队级协同战术训练时，往往会被老兵们带着加练夜间100米精确射击、避弹奔跑及针对避弹奔跑的射击方法、狙击与反狙击术、突发情况下防守与反击的动作等额外的训练课目，这些都是在战场上非常实用的技术。相比之下，当时中国军队则面临着军官受教育层次低、训练体系不完整、训练经费欠缺、训练装备差等问题。因缺少科学系统的训练，中国军队手中少量精良武器装备在战场上常常不能充分发挥应有作用。</p><p>　　<strong>军事训练是未来战争的预演。坚持军事训练是和平时期军队战斗力生成的基本途径。打仗硬碰硬，训练必须实打实。军事训练水平上不去，部队战斗力也很难提高，战时必然吃大亏。所以，要想赢得未来战争，必须通过严酷的实战化训练这块“磨刀石”，把打赢本领锤炼得更过硬。</strong></p><p>　　<strong>情报工作缜密，获得了事半功倍的作战效果</strong></p><p>　　自明治维新以来，日军在对外扩张战争中，屡屡尝到情报工作带来的甜头，故其视情报侦察为战争制胜的捷径，始终高度重视情报侦察工作。日本发动侵华战争前的数十年间，在中国加紧了对未来预定战场的情报侦察。如据日本防卫厅战史研究所编写的《大本营陆军部》记载，1923年日军就制订了对中国的作战计划设想要点。根据此要点，1925年，日军参谋本部作战科长畑俊六率参谋本部、陆军省、海军军令部作战科等一行人员，乘军舰用一个月的时间，对上海至汉口的登陆点逐段进行侦察，这为以后日军进攻淞沪、武汉等要地，摸清兵要地志情况做好了准备。九一八事变后，日军更是通过各种途径、运用各种手段进行情报侦察，可以说无孔不入、用尽其力。比如当时中国军用地图的兵要地志却没有日军地图标注得清晰完备。</p><p>　　<strong>“知彼知己，百战不殆”。情报工作的优劣、得失与高下，对于战争决策、作战部署乃至最后的战争胜负，起到极为重要的作用。通过缜密细致长期的情报工作，找出对手要害，针对性地设计战法，就能达到“四两拨千斤”的作战效果。</strong></p><p>　　<strong>思想控制严密，部队具有畸形的战斗意志</strong></p><p>　　抗战初期，侵华日军士兵普遍表现“不怕死”，这与长期日本武士道的文化贻害有关，但是更大程度上还是因为受到了军国主义思想的毒害。日本在近代走上武力扩张的道路之后，非常重视向军人灌输“效忠天皇”的封建忠君思想，同时日本还开展反华灭华教育；将侵略战争说成是为了解决日本“人口过剩”问题，捍卫日本的“生命线”“主权线”等。日军士兵长期受到军国主义思想的毒害，形成畸形的死战不降的战斗意志。在战局陷入僵持后，日军往往会组织自杀式的死亡冲锋。二战末期，美国最终决定先向日本投掷原子弹，而不是直接登陆日本。一个很重要的原因，就是美国惮于日本在本土进行“玉碎”作战，将会给美军带来巨大人员伤亡。与日军不同，中国军民的抵抗意志和战斗精神是在民族危亡中激发出来的，具有自发性、深刻性和持久性、正义性，这也是我们最终取得抗战胜利的重要原因。</p><p>　　<strong>战斗意志是军队战斗力的重要构成。今天，培育军人的战斗意志，必须以过硬的军事技术和丰富的科技知识作基础。要把战斗意志培育融入军事训练内容体系，渗入各项军事实践活动，紧紧围绕担负的作战任务，练胆量、练意志、练作风、练技术战术，保证战斗意志和军事素质同步提升。</strong></p><p>　　<strong>编后感言：</strong></p><p>　　<strong>以敌为鉴是赢得胜利的重要方式</strong></p><p>　　面对侵华日军这部高效运转的战争机器，这头人类历史上武装到牙齿的法西斯主义怪兽，中国军民不屈不挠、奋起抵抗，使侵略者陷入人民战争的汪洋大海。侵华日军是“很难打”，但绝非“不可战胜”。特别是到了战争中后期，随着日本战争潜力的枯竭、士兵反战情绪的蔓延，侵华日军的战斗力迅速衰落，已难逃失败投降的结局。历史已经雄辩地证明，正义必胜、和平必胜、人民必胜。因此，作为战胜者，承认敌人的强悍不需要什么勇气，但需要秉持正确认知态度。以敌为鉴为我所用，是胜者恒强的重要手段，也是赢得胜利的方式。随意消费血与火的历史，是对历史的不尊重，更是对未来的不负责任。</p><p>原标题：为何抗日战争异常惨烈？日军并非神剧不堪一击</p>",
        "ydbaike": [],
        "replyCount": 86,
        "link": [],
        "img": [
            {
                "ref": "<!--IMG#0-->",
                "pixel": "600*399",
                "alt": "",
                "src": "http://cms-bucket.nosdn.127.net/catchpic/5/5a/5a67d106dd715cc465c97092d71b197b.jpg"
            }
        ],
        "votes": [],
        "shareLink": "https://c.m.163.com/news/a/CLJN5K2M000181KT.html?spss=newsapp&spsw=1",
        "digest": "",
        "topiclist_news": [
            {
                "hasCover": false,
                "subnum": "超过1000万",
                "alias": "Military",
                "tname": "军事",
                "ename": "junshi",
                "tid": "T1348648141035",
                "cid": "C1348647991705"
            }
        ],
        "dkeys": "日军,中国军队,侵华日军,淞沪会战",
        "ec": "李曦_NN2587",
        "topiclist": [
            {
                "hasCover": false,
                "subnum": "181.4万",
                "alias": "网易军事频道，关注军事新闻",
                "tname": "网易军事",
                "ename": "wangyijunshi",
                "tid": "T1401334013017",
                "cid": "C1378977941637"
            }
        ],
        "docid": "CLJN5K2M000181KT",
        "picnews": true,
        "title": "为何抗战异常惨烈？日军并非如神剧中不堪一击",
        "tid": "",
        "template": "recommend",
        "threadVote": 30,
        "threadAgainst": 3,
        "boboList": [],
        "category": "历史",
        "replyBoard": "news_junshi_bbs",
        "source": "中国军网",
        "hasNext": false,
        "voicecomment": "off",
        "relative_sys": [
            {
                "id": "CLBSS1EJ000187UE",
                "title": "抗战期间,中国哪里的军人最容易变节投敌?",
                "source": "大象公会",
                "imgsrc": "http://cms-bucket.nosdn.127.net/f636439c8a89400c8cb829bfba778b2820170526101336.jpeg",
                "docID": "CLBSS1EJ000187UE",
                "from": "HZ",
                "type": "doc",
                "ptime": "2017-05-26 10:13:36",
                "href": ""
            },
            {
                "id": "CL7JRHFB0523D46J",
                "title": "一寸山河一寸血，南京光华门血战，撤退时教导总队泪奔了",
                "source": "不二书说历史",
                "imgsrc": "http://dingyue.nosdn.127.net/Ewnq46iqIU4hDHPhr3V80sK30DcK384lkBe0hNvRFoP=V1495621093803compressflag.jpg",
                "docID": "CL7JRHFB0523D46J",
                "from": "HZ",
                "type": "doc",
                "ptime": "2017-05-24 18:19:07",
                "href": ""
            },
            {
                "id": "CLC2DNAH05239N17",
                "title": "淞沪会战中，日军对中国军队是这样记载的！",
                "source": "68讲台",
                "imgsrc": "http://dingyue.nosdn.127.net/ogdZAXPtO2q8OK06qjeDTz2tWJ6bdjQ6MnqxnptQHvanQ1495770638931compressflag.jpg",
                "docID": "CLC2DNAH05239N17",
                "from": "HZ",
                "type": "doc",
                "ptime": "2017-05-26 11:50:42",
                "href": ""
            }
        ],
        "book": [],
        "ptime": "2017-05-29 11:07:54"
    }
}
 
```


### 1.3 本地新闻

**必选参数:**
  `name` 地名 如:`广东省_深圳市`，`江西省_南昌市`  不填写获取你的定位默认地址
  
  `page` 分页 如0 从第0 条数据开始返回10条数据(最新的10条数据)   10 20 30 每次返回10条数据

  **接口地址:**
  `/News/local_news?name=广东省_深圳市&page=0`

  **调用例子:**
  `//api.isoyu.com/demo/index.php/api/News/local_news?name=广东省_深圳市&page=0`

  返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
  ```
   ```




## 2. 视频模块

说明: 包括 视频首页数据、视频分类列表 视频详情、如下详情：

### 2.1 视频首页数据

**必选参数:**
      `无`
      
  **接口地址:**
      `/Video/index`
      
 **调用例子:**  `//api.isoyu.com/demo/index.php/api/Video/index`
      
      返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
      ```
      ```

### 2.2 视频分类列表
**必选参数:**
`type` int : 新闻类型
<table>
       <tr>
        <td>type</td>
        <td>0</td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
       </tr>
       <tr>
        <td>名称</td>
        <td>精品视频</td>
        <td>搞笑视频</td>
        <td>美女视频</td>
        <td>体育视频</td>
        <td>新闻现场</td>
       </tr>
  </table>
  `page` int : 分页页数,每页返回10条
  **接口地址:**
  
  `/Video/video_type?type=2&page=10`
  **调用例子:** 
  
   `//api.isoyu.com/demo//index.php/api/Video/video_type?type=2&page=10`
   返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
``` javascript
{
    "msg": "success",
    "code": 1,
    "data": [
        {
            "sizeSHD": 22050,
            "replyCount": 0,
            "videosource": "新媒体",
            "mp4Hd_url": "http://flv2.bn.netease.com/videolib3/1705/30/aYNXb0812/HD/aYNXb0812-mobile.mp4",
            "title": "小清新美女爱跳舞，夜里房间优雅独舞",
            "cover": "http://vimg3.ws.126.net/image/snapshot/2017/5/J/F/VCKOETEJF.jpg",
            "videoTopic": {
                "alias": "多彩人生，你我共同编织",
                "tname": "韬哥学霸哥",
                "ename": "T1494085453258",
                "tid": "T1494085453258",
                "topic_icons": "http://dingyue.nosdn.127.net/tHYrjgCtrdmQP3Nvygaa75m3BMOxdY5ZJ8RVPGgMj9Njt1494085452329.jpg"
            },
            "description": "小清新美女爱跳舞，夜里房间优雅独舞",
            "replyid": "BKOD7PO4050835RB",
            "length": 147,
            "m3u8_url": "http://flv.bn.netease.com/videolib3/1705/30/aYNXb0812/SD/movie_index.m3u8",
            "vid": "VBKOD7PO4",
            "topicName": "韬哥学霸哥",
            "votecount": 0,
            "topicImg": "http://vimg3.ws.126.net/image/snapshot/2017/5/9/B/VCKI1SH9B.jpg",
            "topicDesc": "让生活慢下来，品味阅读，享受人生，活到老学到老，教育大家，心灵美好，我们一起携手共创美好世界。",
            "topicSid": "VCKI1SH8S",
            "replyBoard": "video_bbs",
            "playCount": 0,
            "sectiontitle": "",
            "mp4_url": "http://flv2.bn.netease.com/videolib3/1705/30/aYNXb0812/SD/aYNXb0812-mobile.mp4",
            "playersize": 1,
            "sizeSD": 11025,
            "sizeHD": 14700,
            "m3u8Hd_url": "http://flv.bn.netease.com/videolib3/1705/30/aYNXb0812/HD/movie_index.m3u8",
            "ptime": "2017-05-30 10:21:30"
        }
    ]
}
```

### 2.3 视频详情
**必选参数:**
`vid` 视频列表下的vid  VEKKO9TJP

**接口地址:**
`/Video/video_detail?vid=VEKKO9TJP`

**调用例子:**
 `//api.isoyu.com/demo/index.php/api/Video/video_detail?vid=VEKKO9TJP`
 返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
 
```javascript
{
    "msg": "success",
    "code": 1,
    "data": {
        "topicid": "1000",
        "replyCount": 0,
        "mp4Hd_url": "http://flv2.bn.netease.com/videolib3/1705/29/BWixL8250/HD/BWixL8250-mobile.mp4",
        "recommend": [],
        "title": "搞笑段子：老婆，咱们去旅游吧",
        "hits": 0,
        "cover": "http://vimg1.ws.126.net/image/snapshot/2017/5/S/Q/VCKMKITSQ.jpg",
        "replyBoard": "video_bbs",
        "replyid": "EKKO9TJP050835RB",
        "mp4_url": "http://flv2.bn.netease.com/videolib3/1705/29/BWixL8250/SD/BWixL8250-mobile.mp4",
        "length": 13,
        "videotype": "搞笑的小妖精",
        "playersize": 0,
        "vurl": "http://v.163.com/paike/VCH0LU18J/VEKKO9TJP.html",
        "m3u8Hd_url": "http://flv.bn.netease.com/videolib3/1705/29/BWixL8250/HD/movie_index.m3u8",
        "m3u8_url": "http://flv.bn.netease.com/videolib3/1705/29/BWixL8250/SD/movie_index.m3u8",
        "ptime": "2017-05-29 00:17:56",
        "vid": "VEKKO9TJP"
    }
}
 
```

## 3. 笑话段子轻松一刻

说明: 包括 视频首页数据、视频分类列表 视频详情、如下详情：

### 3.1 笑话段子

**必选参数:**
      `page`   分页数 10  20  30
      
 **接口地址:**
      `/Joke/index?page=10`
      
 **调用例子:**
      `//api.isoyu.com/demo/index.php/api/joke/index?page=10`
      返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "data": [
        {
            "adtype": 0,
            "boardid": "comment_bbs",
            "clkNum": 0,
            "danmu": 1,
            "digest": "上语文课时，老师提问：“小明，请你用文明礼貌的‘礼’字造个句子。”小明思索了一会说：“爸爸提着包出门托人办事。”老师说：“没‘礼’字呀？”小明认真的说：“咋没‘礼’呀？礼在包里呢，爸爸说没礼人家不办事。”",
            "docid": "CEJIS0I69001S0I7",
            "downTimes": 208,
            "imgType": 0,
            "imgsum": 0,
            "picCount": 0,
            "program": "HY",
            "recNews": 0,
            "recType": 0,
            "refreshPrompt": 0,
            "replyCount": 4,
            "replyid": "CEJIS0I69001S0I7",
            "source": "ZOL笑话大全",
            "title": "幽默的孩子和家长,不只是好笑。",
            "upTimes": 309
        }
    ]
}
```


## 4. 图片相册接口

说明: 包括 Cosplay相册、花瓣相册：

### 4.1 cosplay 相册

**必选参数:**
      `page`   分页数 10  20  30 
      
 **接口地址:**
      `/Picture/index?page=20` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/picture/index?page=20`
      
返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "data": [
        {
            "desc": "喜欢神奇宝贝的人一定都知道鲤鱼王。这个特别的精灵没有特别强大的能力，除了长相呆萌，好像没有其他优点。不过下面这名男子却对这个超弱的精灵情有独钟，他戴着鲤鱼王面具大玩Cosplay，照片被上传到网路后立刻成为网友们热议的话题。",
            "pvnum": "",
            "createdate": "2017-01-11 01:39:21",
            "scover": "http://img3.cache.netease.com/photo/0031/2017-01-11/s_CAFBLLL26LRK0031.jpg",
            "setname": "靠Cosplay鲤鱼王而走红的型男真面目",
            "cover": "http://img3.cache.netease.com/photo/0031/2017-01-11/CAFBLLL26LRK0031.jpg",
            "pics": [
                "http://img3.cache.netease.com/photo/0031/2017-01-11/CAFBLLL26LRK0031.jpg",
                "http://img4.cache.netease.com/photo/0031/2017-01-11/CAFBLLTT6LRK0031.jpg",
                "http://img4.cache.netease.com/photo/0031/2017-01-11/CAFBLM0J6LRK0031.jpg"
            ],
            "clientcover1": "",
            "replynum": "57",
            "topicname": "",
            "setid": "91744",
            "seturl": "http://play.163.com/photoview/6LRK0031/91744.html",
            "datetime": "2017-01-11 01:42:32",
            "clientcover": "",
            "imgsum": "7",
            "tcover": "http://img4.cache.netease.com/photo/0031/2017-01-11/t_CAFBLLL26LRK0031.jpg"
        },
        {
            "desc": "最后要推荐的一组图是台湾Coser：Mon小夢夢的最新作品——菲利克斯COS。在原作里，这位角色拥有着不属于女性的萌系着装以及言行举止，然而事实上却是个真·汉子......",
            "pvnum": "",
            "createdate": "2017-01-10 10:58:46",
            "scover": "http://img4.cache.netease.com/photo/0031/2017-01-10/s_CADP9L5P6LRK0031.jpg",
            "setname": "灵魂陷入危机之中 Re:0菲利克斯COS",
            "cover": "http://img3.cache.netease.com/photo/0031/2017-01-10/CADP9L5P6LRK0031.jpg",
            "pics": [
                "http://img3.cache.netease.com/photo/0031/2017-01-10/CADP9L5P6LRK0031.jpg",
                "http://img3.cache.netease.com/photo/0031/2017-01-10/CADP9JU36LRK0031.jpg",
                "http://img4.cache.netease.com/photo/0031/2017-01-10/CADP9K7J6LRK0031.jpg"
            ],
            "clientcover1": "",
            "replynum": "0",
            "topicname": "",
            "setid": "91731",
            "seturl": "http://play.163.com/photoview/6LRK0031/91731.html",
            "datetime": "2017-01-10 11:00:15",
            "clientcover": "",
            "imgsum": "5",
            "tcover": "http://img3.cache.netease.com/photo/0031/2017-01-10/t_CADP9L5P6LRK0031.jpg"
        }
    ]
}

```

### 4.2 花瓣照片相册

**必选参数:**
      `无`   每次生成20条随机数据
      
 **接口地址:**
      `/Picture/hua_ban` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Picture/hua_ban`
      
返回数据(每次返回是20条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "data": [
        {
            "img": "http://img.hb.aicdn.com/623a6284b7fb7cc297bfadaf101a07677817136543f3a-ksxY2x",
            "title": "小清新女生",
            "desc": "唯美气息"
        },
        
        {
            "img": "http://img.hb.aicdn.com/1130866c1c6b90456f0488d2d42279740740c97d6d805-DHmPo2",
            "title": "小清新女生",
            "desc": "唯美气息"
        }
    ]
}
```


## 5. 天气预报

说明: 获取城市天气预报：

### 5.1 获取城市天气预报

**必选参数:**
      `city`   城市地址 如 `深圳市` `北京市` 
      
 **接口地址:**
      `/Weather/get_weather?city=广州市` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Weather/get_weather?city=广州市`
      
返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "error": 0,
    "status": "success",
    "date": "2017-05-31",
    "results": [
        {
            "currentCity": "广州市",
            "pm25": "57",
            "index": [
                {
                    "title": "穿衣",
                    "zs": "热",
                    "tipt": "穿衣指数",
                    "des": "天气热，建议着短裙、短裤、短薄外套、T恤等夏季服装。"
                },
                {
                    "title": "洗车",
                    "zs": "不宜",
                    "tipt": "洗车指数",
                    "des": "不宜洗车，未来24小时内有雨，如果在此期间洗车，雨水和路上的泥水可能会再次弄脏您的爱车。"
                },
                {
                    "title": "感冒",
                    "zs": "少发",
                    "tipt": "感冒指数",
                    "des": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"
                },
                {
                    "title": "运动",
                    "zs": "较适宜",
                    "tipt": "运动指数",
                    "des": "天气较好，较适宜进行各种运动，但因湿度偏高，请适当降低运动强度。"
                },
                {
                    "title": "紫外线强度",
                    "zs": "中等",
                    "tipt": "紫外线强度指数",
                    "des": "属中等强度紫外线辐射天气，外出时建议涂擦SPF高于15、PA+的防晒护肤品，戴帽子、太阳镜。"
                }
            ],
            "weather_data": [
                {
                    "date": "周三 05月31日 (实时：32℃)",
                    "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/duoyun.png",
                    "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/duoyun.png",
                    "weather": "多云",
                    "wind": "南风3-4级",
                    "temperature": "32 ~ 26℃"
                },
                {
                    "date": "周四",
                    "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/leizhenyu.png",
                    "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/dayu.png",
                    "weather": "雷阵雨转大雨",
                    "wind": "西南风4-5级",
                    "temperature": "32 ~ 24℃"
                },
                {
                    "date": "周五",
                    "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/dayu.png",
                    "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/zhenyu.png",
                    "weather": "大雨转阵雨",
                    "wind": "微风",
                    "temperature": "29 ~ 24℃"
                },
                {
                    "date": "周六",
                    "dayPictureUrl": "http://api.map.baidu.com/images/weather/day/dayu.png",
                    "nightPictureUrl": "http://api.map.baidu.com/images/weather/night/zhongyu.png",
                    "weather": "中到大雨转中雨",
                    "wind": "微风",
                    "temperature": "28 ~ 24℃"
                }
            ]
        }
    ]
}

```

## 6. Web 前端开发资讯日报

说明: 获取每日前端开发日报列表、单日日报详情信息列表：

### 6.1 每日前端开发日报列表

**必选参数:**
      `page`  1,2,3  第一页第一二页日报列表当前日期一次往前走 
      
 **接口地址:**
      `/Web/web_daily_list?page=1` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Web/web_daily_list?page=1`
      
返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "data": [
        {
            "title": "20170530 前端开发日报",
            "date": "2017-05-31",
            "desc": "Vue全家桶填坑之路；Webpack 最详解；前端开发规范：命名规范、html 规范、css 规范、js 规范；前端性能优化的三个维度；Angular4实现个人作品展示站；HTTP Session 的工作原理以及几个思维扩展；React 教 ...",
            "daily_id": 20170530
        },
        {
            "title": "20170529 前端开发日报",
            "date": "2017-05-30",
            "desc": "web前端面试题汇总（JS）；Vue 重写前端导航；Webpack 2 中一些常见的优化措施；Canvas之基础；https那些事；煦涵说JSON；redux-demo；Angular 组件间通信 WEB前端面试题汇总（JS）如何解决跨域问 ...",
            "daily_id": 20170529
        },
        {
            "title": "20170528 前端开发日报",
            "date": "2017-05-29",
            "desc": "大白话 JavaScript 创建对象思维导图；学习阮一峰的WebSocket；从 JavaScript 作用域说开去；前端周刊第 57 期：《战争与和平版》的 CSS-IN-JS 黑历史；Alloy 前端周刊第 7 期；JavaScrip ...",
            "daily_id": 20170528
        },
        {
            "title": "20170527 前端开发日报",
            "date": "2017-05-28",
            "desc": "JavaScript 函数式编程指南；JS 函数式编程指南（中文版）；快速掌握ECMAScript 6新特性；基于 TypeScript 的 Node.js 框架 Nest 正式版发布（下）；2017-05-27 前端日报；一个后端程序员的 ...",
            "daily_id": 20170527
        },
        {
            "title": "20170526 前端开发日报",
            "date": "2017-05-27",
            "desc": "Vue.js 入门最佳项目实践-个人博客全栈应用从零到上线；JTaro：基于 Vue 2.0 的轻量级 SPA 框架；为什么我们需要 Vuex；【小程序可用】css3 animation 实现的跑马灯；Sessions by Pusher: ...",
            "daily_id": 20170526
        },
        {
            "title": "20170525 前端开发日报",
            "date": "2017-05-26",
            "desc": "不仅仅是粘贴复制——聊聊前端脚手架；值得多聊聊的 Promise 模式，以及它能解决什么问题；发布自己第一个 npm 组件包（基于 Vue 的文字跑马灯组件）；一个简单express+jade+mysql+bootstrap+nodejs的 ...",
            "daily_id": 20170525
        },
        {
            "title": "20170524 前端开发日报",
            "date": "2017-05-25",
            "desc": "JavaScript 疑难汇总；Vue的Mock数据（一） JSON-server；React VR 快速入门中文文档；javascript——window对象；jQuery效果—雪花飘落；移动 web 之滚动篇；10分钟教你撸一个node ...",
            "daily_id": 20170524
        },
        {
            "title": "20170523 前端开发日报",
            "date": "2017-05-24",
            "desc": "基于栈的 HTML 解析器；React学习报告；WebP 已经适合主流使用？美图图像选型评测及优化历程；一、如何将Vue初始项目发布到github上；还在找react例子？ 记录一下react练习小心得；前端每周清单第 14 期：编写现代  ...",
            "daily_id": 20170523
        },
        {
            "title": "20170522 前端开发日报",
            "date": "2017-05-23",
            "desc": "前端 (Not just) 工程师终究要掌握的知识；css3动画（二）：波浪效果；JS 与多线程；每天 10 个前端知识点：杂技；GB-respond：移动端响应式布局解决方案（JavaScript + rem）；React实战 ̵ ...",
            "daily_id": 20170522
        },
        {
            "title": "20170521 前端开发日报",
            "date": "2017-05-22",
            "desc": "总有你要的编程书单（GitHub）；JavaScript 编码指南；学习JavaScript之闭包；Vue 用户的 React 上手小结；初识weex（前端视角） – 环境搭建；JQuery 中的 setTimeout(fn,  ...",
            "daily_id": 20170521
        }
    ]
}
```



### 6.2 单个日报列表

**必选参数:**
      `$daily_id`  如：`20170520`  某个日期数
      
 **接口地址:**
      `/Web/every_daily_list?$daily_id=20170520` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Web/every_daily_list?$daily_id=20170520`
      
返回数据(每次返回是10条数据,这里就不全部列出来了)如下图:
```javascript
{
    "msg": "success",
    "code": 1,
    "title": "20170530 前端开发日报",
    "data": [
        {
            "title": "vue全家桶填坑之路",
            "url": "https://segmentfault.com/a/1190000009599025",
            "desc": "vue全家桶填坑之路近些日子上手vue全家桶，深感自己的知识水平浅薄，在摸索之中记录了我遇到的一些问题的解决方法。 场景：表单需要打开新页面修改参数返回保存数据 这个一开始我就想利用vuex的store存储到state之中就大功告成了。..."
        },
        {
            "title": "Webpack 最详解",
            "url": "http://zcfy.cc/article/a-detailed-introduction-to-webpack-ndash-smashing-magazine-2974.html",
            "desc": "Webpack 最详解 JavaScript模块打包的概念已经出现一段时间了。RequireJS在2009年首次发声，之后Browserify粉墨登场。接着各种打包工具如雨后春笋纷纷涌现。而webpack以其优异的特性脱颖而出。如果你还不了解它，希望这篇文章可以带你熟悉这一款强大的工具。 什么是模块打包工具 我们见过的多数编程语言（包括ECMAScr..."
        },
        {
            "title": "前端开发规范：命名规范、html 规范、css 规范、js 规范",
            "url": "https://juejin.im/post/592d4a5b0ce463006b43b6da",
            "desc": "前端开发规范：命名规范、html 规范、css 规范、js 规范 本文首发于我的个人网站：http://cherryblog.site/ （背景更换了不知道大家有没有发现呢，嘻嘻） 一个好的程序员肯定是要能书写可维护的代码，而不是一次性的代码，怎么能让团队当中其他人甚至一段时间时候你再看你某个时候写的代码也能看懂呢，这就需"
        },
        {
            "title": "前端性能优化的三个维度",
            "url": "https://juejin.im/post/592d0f4ca0bb9f00570f4408",
            "desc": "前端性能优化的三个维度 前端性能优化可以分为三个level：静态资源优化、接口访问优化、页面渲染速度优化，在操控门槛上依次递增，优化效果上越发没有这么明显，所以很多小团队只会做到了第一个level追求极致的前端性能体验，提升自己的level，come on ~ 目录 一、静态资源"
        },
        {
            "title": "Angular4实现个人作品展示站",
            "url": "https://segmentfault.com/a/1190000009599190",
            "desc": "Angular4实现个人作品展示站Angular4实现个人作品展示站，模板仿慕课。 SPA site for displaying owner project http://project.giscafer.com github:https://github.com/giscafer/p..."
        },
        {
            "title": "HTTP Session 的工作原理以及几个思维扩展",
            "url": "https://swiftcafe.io/2017/05/30/about-session/",
            "desc": "HTTP Session 的工作原理以及几个思维扩展 大家都知道，HTTP 协议本身是无状态的，Session 的出现解决了这个问题，也被大多数 web 端采用。 但它背后的实现原理你是否有兴趣了解呢，以及在它基础上的思维发散，和你聊聊。 无状态的 HTTP 大家都知道，我们目前使用的互联网应用层协议基本上都是基于 HTTP 和 HTTPS 的，它们的本身是无状态的， 只负..."
        },
        {
            "title": "",
            "url": "http://miaoyunze.com/2017/05/30/React-Tutorial-11-Composition-vs-Inheritance/",
            "desc": "React 教程 - 11. 组合与继承 React 官方文档翻译 - 11. 组合与继承 —— 由缪运泽分享"
        },
        {
            "title": "angular中的作用域及继承",
            "url": "https://segmentfault.com/a/1190000009598760",
            "desc": "angular中的作用域及继承在一些使用angular框架的大型项目中，似乎有很多个controller，而每个controller都有自己的$scope. $rootscope$rootScope顶级作用域，也叫根作用域，类似于window，window的属性在任何子作用域都可以访问。$rootS..."
        },
        {
            "title": "",
            "url": "https://segmentfault.com/a/1190000009597241",
            "desc": "杂篇 - Vue豆瓣系列文章项目地址 在线演示 不识庐山真面目，只缘身在此山中。 大概一个月前，开源了Vue重构豆瓣移动端的项目，效果还可以，收到了很多小伙伴的反馈，话说是要写一些文章的，但迟迟没有动笔，估计小伙伴们等的花都谢了，..."
        },
        {
            "title": "如何在JavaScript中实现一个Long型——Long.js源码学习与分析",
            "url": "https://segmentfault.com/a/1190000009599204",
            "desc": "如何在JavaScript中实现一个Long型——Long.js源码学习与分析背景 由于在项目中使用到了WebSocket的自定义二进制协议，需要将二进制转为后端服务中定义的Long型。而在JavaScript中的Number类型由于自身原因，并不能完全表示Long型的数字，因此需要我们通过其他的方式来对Lon..."
        },
        {
            "title": "WebAssembly基础",
            "url": "https://segmentfault.com/a/1190000009598598",
            "desc": "WebAssembly基础WebAssembly定义 WebAssembly是一种的语言，可以在现代浏览器环境中运行，并提供了功能和性能上的优势。可以将其它语言，如C/C++等，编译成Assembly格式的代码，然后在浏览器中运行。 WebAssembly的目标 WebAssem..."
        },
        {
            "title": "canvas 图像旋转与翻转姿势解锁",
            "url": "http://t.cn/RSzpxck",
            "desc": "《canvas 图像旋转与翻转姿势解锁》从一个游戏需求说起：“可乐瓶”里有多个“气泡”，需要设置不同的动画效果，且涉及 deviceOrientation 的交互，需要有大量计算改变元素状态……  （by 凹凸实验室） ​​​"
        },
        {
            "title": "如何瘦身 Git 仓库",
            "url": "http://t.cn/RSqz6LY",
            "desc": "如何瘦身 Git 仓库 » 译者:zhousiyu325 对 Git 仓库的维护通常是为了减少仓库的大小。如果你从另外一个版本控制系统导入了一个仓库，你可能需要在导入后清除掉不必要的文件。 ​​​"
        }
    ]
}
```


## 7. Web 知乎日报数据

说明: 获取每日每日知乎日报、日报详情、日报短评论

### 7.1 每日知乎日报列表

**必选参数:**
      `无`  
      
 **接口地址:**
      `/Zhihu/zhihu_daily` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Zhihu/zhihu_daily`
      
返回数据(每次返回是18条数据,这里就不全部列出来了)如下图:
```
{
    "msg": "success",
    "code": 1,
    "data": {
        "date": "20170603",
        "stories": [
            {
                "title": "《萤火虫之墓》是我不敢看第二遍的动画片",
                "ga_prefix": "060321",
                "images": [
                    "https://pic4.zhimg.com/v2-1ce18fa4888ea20fba5526579d8e039b.jpg"
                ],
                "multipic": true,
                "type": 0,
                "id": 9456269
            },
            {
                "image": "https://pic1.zhimg.com/v2-1a842a11ed0b989a7e7a24a9e01cc7b4.jpg",
                "type": 0,
                "id": 9453152,
                "ga_prefix": "060207",
                "title": "《加勒比海盗 5》：很亲切但并不激动，很高兴但没有惊喜"
            }
        ]
    }
}
```


### 7.2 日报详情

**必选参数:** 
      `id`   日报列表中的 id
      
 **接口地址:**
      `/Zhihu/news?id=9454551` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Zhihu/news?id=9454551`
      
返回数据()如下图:
```
{
    "msg": "success",
    "code": 1,
    "data": {
        "body": "<div class=\"main-wrap content-wrap\">\n<div class=\"headline\">\n\n<div class=\"img-place-holder\"></div>\n\n\n\n</div>\n\n<div class=\"content-inner\">\n\n\n\n<div class=\"question\">\n<h2 class=\"question-title\"></h2>\n<div class=\"answer\">\n\n<div class=\"meta\">\n<img class=\"avatar\" src=\"http://pic3.zhimg.com/v2-ee0501398d5895abc672bdb905c8e66e_is.jpg\">\n<span class=\"author\">故园风雨前，</span><span class=\"bio\">写作业者</span>\n</div>\n\n<div class=\"content\">\n<p style=\"text-align: center;\">* * *</p>\r\n<p style=\"text-align: center;\">一场用生命炫技结果演砸了的惨败</p>\r\n<p style=\"text-align: center;\">* * *</p>\r\n<hr />\r\n<p>附近有新楼盘开建，工地都围上了。昨经过，发现已有一幢精美小筑落成，沿街矗立。走在矮墙外，看见一蓬一蓬的白雾从墙里漫出来，在墙头上铺开回旋，被后面几枝殷红的鸡爪槭衬着，袅袅流云似的，顺墙飘落，刚落就散了。特意跑去淋了一下，不是干烟，真是水汽。又发现地面也有一团团白雾，原是从里面沿着墙根转出来的，蒸蒸然在人脚面汇聚，刚聚就散了。啊，好一个神仙似的姐姐，我自喜道。</p>\r\n<p>原来是售楼处。仰头看见几个金色大字，是楼盘名，花着锦火烹油那意思。楼盘我当然惦记不上，但诱人而免费的售楼处必需到此一游。我因强扮一脸阔气踱进去。</p>\r\n<p>进去是一方仿照日式的庭园，百十平米。造园的人真费心了：远观路尽头有片白色沙石地，用细耙梳理出涟漪波涛，上踞胖瘦不一几尊山石，山石之间生出一株老松，虬曲苍劲，好像已经在此守候了几百年。沙海之外围着一圈浅水，缓缓似有流动。可惜池中未见锦鲤睡莲，过于清汤寡水。池塘两侧大概装有类似加湿器那样的机关，不断喷出水汽，以保证整个庭院腾云驾雾。我猜这里面是有些学问的，喷水汽得把握好分寸，云雾小了显寒酸，稍大一点又像澡堂子。这里的控制刚刚好，还能漫出墙去把路人勾进来。我一边赞叹一边往里去，瞧见浅池中立了一块牌子，白地红字，乍看像一句题诗，为这精美小景做一个文学的定性，并骄傲地落下款识。然而走进一看，吓一大跳：</p>\r\n<p>&ldquo;警告！危险！水中有电！！禁止戏水！！！&rdquo;</p>\r\n<p>好嘛，我说怎么不种莲不养鱼。也可想而知之前的它们是怎么死的。</p>\r\n<p>真是费解，既然已经致命，那还不赶紧切断电源？可一转念，假使切断电源，那潺潺流水就成了死水，山间也不再有晓岚暮霭，没了仙气儿，这些损失对销售来讲也致命吧？所以切还是不切，这是一个问题。然而再细想，断然不能买这楼盘啊！售楼处本该是一个建筑在实力、才华上的最高体现，可此间连最基本的水电问题都没解决好，还警告，还危险，还禁止。真所谓用绳命炫技结果演砸了，多么难堪的惨败。</p>\r\n<p>我一个不相干的人都替他焦虑了。</p>\r\n<p>这桩焦虑让我记起另一桩焦虑。</p>\r\n<p>那时我上二三年级，不学好，放学不回家，喜欢在路上看热闹。八十年代初的成都，街头巷尾还能看见耍猴戏的班子，和表演武术的班子。那天我就挤进一个圈场，正赶上他们的压轴大戏，硬气功。出场的是一个胖大的中年男人，穿条黑绸布灯笼裤，扎着裤脚，上身赤裸着，肥敦敦的。裤腰上紧紧地绑一条很宽的红腰带，上钉黄铜钉，杀气腾腾的红和黄。脑袋绑一条红布头带，也扎得紧紧的，扯着他的眉眼，像景阳岗那只老虎一样&ldquo;吊睛&rdquo;。因为太紧，他眨眼时都不能完全闭上，总留着一截眼白，这更增添了他的威慑。</p>\r\n<p>他说一口北方话，滔滔不绝。大意是他们从黄河水最凶猛的地方来，经过了很多城市村庄，为很多观众表演过，观众都被他们高超的武艺震惊了，而他本人是台柱子，全国上下都给了他很高的荣誉。这次也要让你们开开眼，你们把亲戚邻居都叫来看吧，看我的硬气功，机会难得。</p>\r\n<p>他一边说一边绕着场子阔步疾走，手里攥一条皮鞭不停往脊背和胸腹上抽打，留下浅红色的痕迹，啪啪啪声音很响，又很巧妙地穿插在他的演说声中，光看这个我就觉得很来劲了。</p>\r\n<p>台柱子先耍了一通大刀，轰然叫好。又舞了一通棍子，轰然叫好。又把竖在地上的红缨枪，尖头刺着自己喉咙，跟地面角力，枪杆子弯得很厉害了也不饶它，看到危急处人们都疯狂了。最后一个节目据说最厉害，他进棚子里喝了口水才又出来，好故意吊一下胃口。</p>\r\n<p>他走到中央，一抱拳，把束额头的带子解下来，抛走。虽然吊睛白眼没了，他看着不那么凶狠了，甚至露出了一个北方胖农民的憨厚老实，但又显出肃穆和苍凉，一个身怀绝技的高人的麻木。他说了几句话，大意是你们瞧好了&mdash;&mdash;我反正没事，但你们小心你们的心脏。</p>\r\n<p>他从旁人手中接过一摞瓦片，特意告诉说这是你们这儿的瓦片，我就地取材。观众不知道他什么意思，都嗫嚅着不敢接话。只见他举起这摞瓦片到半空，森然宣布，我要砸我的额头，用额头击碎瓦片，但我自己完好无损，这是硬气功里最见真本事的一个了。说完，又运了一口气，猛地把瓦片砸向额头。</p>\r\n<p>轰然叫好。雷鸣般的掌声。观众沸腾了。</p>\r\n<p>可欢呼持续了不到几秒就停下来，人群里传出惊叫。一个小孩大声喊：</p>\r\n<p>&ldquo;流血了流血了！脑壳顶顶！&rdquo;</p>\r\n<p>真是，一条浓浓的血从他额上留下来，在鼻尖上积成血滴，啪哒啪哒滴到地上。他额上头发上脸上全是瓦灰。大概不知道伤口在那里，他也不敢去抹，一时只能由着血往下流。他手里还有瓦片，唉，真不忍看，只碎了第一片，剩下的都还瓦全着。</p>\r\n<p>那时已黄昏，人们都是在归家路上顺便停一脚，看这么一场价廉物美的演出，晚餐时好口若悬河地海吹一番，只会把这卖艺人吹得更神乎其神，而决不会塌他的台，但没想到他自己竟然弄成一场血光之灾。要说我们成都人那时风气真好，场子上没有一声倒彩，人们没有幸灾乐祸的需求，只是惊愕，只是叹息。台柱子这时已经回到那个半敞开的棚子里，坐在高高的板凳上，垂着胳膊，似乎累极了。场子上的人们不知所措了一阵，交头接耳了一阵，逐渐散去。一个老婆婆没急着离开，她迈着小脚，拄着拐，滴滴哚哚地走向棚子，边走边颤颤巍巍扬着手里的一张帕子，说要他拿去擦血。然而台柱子摇摇手，很粗鲁地拒绝了，并且别过头去，我再也看不到他的脸。</p>\r\n<p>人走光了，菜场边的空地上只剩下一个莫名其妙的棚子，不知道他们为什么还没收摊。街上有人家点了灯，天真的晚了。</p>\r\n<p>因为目睹了一场用绳命炫技结果演砸了的惨败，我在人生很早很早的时候就尝到了难堪的焦虑，因为太刺激，在之后漫长的人生里，对景儿就要发作。</p>\n\n<div class=\"view-more\"><a href=\"http://zhuanlan.zhihu.com/p/26354455\">查看知乎讨论</a></div>\n\n</div>\n</div>\n</div>\n\n\n</div>\n</div>",
        "image_source": "《霸王别姬》",
        "title": "小事 · 头上流血，水中有电",
        "image": "https://pic4.zhimg.com/v2-cd33491815c9911d5d976b6c016614af.jpg",
        "share_url": "http://daily.zhihu.com/story/9454551",
        "js": [],
        "ga_prefix": "060222",
        "section": {
            "thumbnail": "https://pic4.zhimg.com/v2-b3a98eac72f2e81e7257d4b6600ed47b.jpg",
            "id": 35,
            "name": "小事"
        },
        "images": [
            "https://pic4.zhimg.com/v2-b3a98eac72f2e81e7257d4b6600ed47b.jpg"
        ],
        "type": 0,
        "id": 9454551,
        "css": [
            "http://news-at.zhihu.com/css/news_qa.auto.css?v=4b3e3"
        ]
    }
}
```

### 7.3 日报短评论列表 

**必选参数:** 
      `id`   日报列表中的 id
      
 **接口地址:**
      `/Zhihu/new_comment?id=9454551` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Zhihu/new_comment?id=9454551`
      
返回数据(最多返回20条数据)如下图:
```
{
    "msg": "success",
    "code": 1,
    "data": {
        "comments": [
            {
                "author": "pokemonex",
                "content": "这散文也太散了，散了一地。",
                "avatar": "http://pic4.zhimg.com/874cb7b6a9b102cbc0b1d50c5c4e81f7_im.jpg",
                "time": 1496490410,
                "id": 29187452,
                "likes": 1
            },

            {
                "author": "扎卡云_884",
                "content": "我一个不相干的人都替他焦虑了。",
                "avatar": "http://pic3.zhimg.com/1ae5f682bba916af97aaaddbf193a0f6_im.jpg",
                "time": 1496450729,
                "id": 29182161,
                "likes": 0
            },
            {
                "author": "刘山",
                "content": "水里是可能会有电，有漏电风险而已，不是真的一直有电。\n你放鱼进去，常规没有问题，漏电的话不光是碰水不安全的问题了。",
                "avatar": "http://pic1.zhimg.com/a4ae6b3c9b931ab18ac1a15740b6c5c8_im.jpg",
                "time": 1496450483,
                "reply_to": {
                    "content": "挺好看的散文，不知道为什么评论里那么多人抱怨。\n而且作者明明通过水里没有荷、鱼点出来了水里是真有电，一堆人抓着“仅仅是个警告”的假设不放，就不能轻轻松松看小品么。\n不过我猜依照作者的性格，只会对评论里的煞风景一哂而过。",
                    "status": 0,
                    "id": 29179844,
                    "author": "王王各"
                },
                "id": 29182126,
                "likes": 0
            }
        ]
    }
}
```


## 8. 豆瓣热播电影

说明: 获取热播电影列表、电影详情

### 8.1 热播电影列表

**必选参数:**
      `start`   开始数0. 9 18 
      
      `count` 返回列表数
      
      
 **接口地址:**
      `/Movie/playing_movie_list?start=0&count=9` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api//Movie/playing_movie_list?start=0&count=9`
      
返回数据(每次返回数据,这里就不全部列出来了)如下图:
```json
{
    "msg": "success",
    "code": 1,
    "data": {
        "rating": {
            "max": 10,
            "average": 7.4,
            "stars": "40",
            "min": 0
        },
        "reviews_count": 937,
        "wish_count": 36862,
        "douban_site": "",
        "year": "2017",
        "images": {
            "small": "http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2459723975.jpg",
            "large": "http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2459723975.jpg",
            "medium": "http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2459723975.jpg"
        },
        "alt": "https://movie.douban.com/subject/6311303/",
        "id": "6311303",
        "mobile_url": "https://movie.douban.com/subject/6311303/mobile",
        "title": "加勒比海盗5：死无对证",
        "do_count": null,
        "share_url": "http://m.douban.com/movie/subject/6311303",
        "seasons_count": null,
        "schedule_url": "https://movie.douban.com/subject/6311303/cinema/",
        "episodes_count": null,
        "countries": [
            "美国"
        ],
        "genres": [
            "动作",
            "奇幻",
            "冒险"
        ],
        "collect_count": 109318,
        "casts": [
            {
                "alt": "https://movie.douban.com/celebrity/1054456/",
                "avatars": {
                    "small": "http://img7.doubanio.com/img/celebrity/small/562.jpg",
                    "large": "http://img7.doubanio.com/img/celebrity/large/562.jpg",
                    "medium": "http://img7.doubanio.com/img/celebrity/medium/562.jpg"
                },
                "name": "约翰尼·德普",
                "id": "1054456"
            },
            {
                "alt": "https://movie.douban.com/celebrity/1054414/",
                "avatars": {
                    "small": "http://img3.doubanio.com/img/celebrity/small/587.jpg",
                    "large": "http://img3.doubanio.com/img/celebrity/large/587.jpg",
                    "medium": "http://img3.doubanio.com/img/celebrity/medium/587.jpg"
                },
                "name": "哈维尔·巴登",
                "id": "1054414"
            },
            {
                "alt": "https://movie.douban.com/celebrity/1010543/",
                "avatars": {
                    "small": "http://img7.doubanio.com/img/celebrity/small/1243.jpg",
                    "large": "http://img7.doubanio.com/img/celebrity/large/1243.jpg",
                    "medium": "http://img7.doubanio.com/img/celebrity/medium/1243.jpg"
                },
                "name": "杰弗里·拉什",
                "id": "1010543"
            },
            {
                "alt": "https://movie.douban.com/celebrity/1325896/",
                "avatars": {
                    "small": "http://img7.doubanio.com/img/celebrity/small/1410910563.02.jpg",
                    "large": "http://img7.doubanio.com/img/celebrity/large/1410910563.02.jpg",
                    "medium": "http://img7.doubanio.com/img/celebrity/medium/1410910563.02.jpg"
                },
                "name": "布伦顿·思韦茨",
                "id": "1325896"
            }
        ],
        "current_season": null,
        "original_title": "Pirates of the Caribbean: Dead Men Tell No Tales",
        "summary": "故事发生在《加勒比海盗3：世界的尽头》沉船湾之战20年后。男孩亨利（布兰顿·思怀兹 Brenton Thwaites 饰）随英国海军出航寻找被聚魂棺诅咒的父亲“深海阎王”威尔·特纳（奥兰多·布鲁姆 Orlando Bloom 饰），却在百慕大三角遭遇被解封的亡灵萨拉查船长（哈维尔·巴登 Javier Bardem 饰）。获取自由的萨拉查屠尽加勒比海盗，征服了整个海域。里海海盗王赫克托·巴博萨船长（杰弗里·拉什 Geoffrey Rush 饰）在女巫Haifaa Meni（格什菲·法拉哈尼 Golshifteh Farahani 饰）口中得知了萨拉查的真实目的：为寻找他的宿敌杰克船长（约翰尼·德普 Johnny Depp 饰）。海盗的命运皆压在落魄的老杰克被封印的黑珍珠号，以及天文学家卡琳娜·史密斯（卡雅·斯考达里奥 Kaya Scodelario 饰）口中的远古三叉戟上。",
        "subtype": "movie",
        "directors": [
            {
                "alt": "https://movie.douban.com/celebrity/1019391/",
                "avatars": {
                    "small": "http://img7.doubanio.com/img/celebrity/small/58032.jpg",
                    "large": "http://img7.doubanio.com/img/celebrity/large/58032.jpg",
                    "medium": "http://img7.doubanio.com/img/celebrity/medium/58032.jpg"
                },
                "name": "艾斯彭·山德伯格",
                "id": "1019391"
            },
            {
                "alt": "https://movie.douban.com/celebrity/1216851/",
                "avatars": {
                    "small": "http://img7.doubanio.com/img/celebrity/small/58031.jpg",
                    "large": "http://img7.doubanio.com/img/celebrity/large/58031.jpg",
                    "medium": "http://img7.doubanio.com/img/celebrity/medium/58031.jpg"
                },
                "name": "乔阿吉姆·罗恩尼",
                "id": "1216851"
            }
        ],
        "comments_count": 47631,
        "ratings_count": 101974,
        "aka": [
            "加勒比海盗：恶灵启航(港)",
            "加勒比海盗 神鬼奇航：死无对证(台)",
            "加勒比海盗5：亡灵的缄默",
            "加勒比海盗5：亡者无言",
            "加勒比海盗5：死人不会告密",
            "Pirates of the Caribbean 5"
        ]
    }
}
```


### 8.2 热播电影详情

**必选参数:**
      `id`   电影 `id` 
      
      
      
 **接口地址:**
      `/Movie/movie_info?id=6311303` 
      
  **调用例子:**
      `//api.isoyu.com/demo/index.php/api/Movie/movie_info?id=6311303`
      
返回数据(每次返回数据,这里就不全部列出来了)如下图:
