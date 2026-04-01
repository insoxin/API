import{_ as s,o as t,c as n,ae as p}from"./chunks/framework.B6gjLfeO.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"guide/电子商务.md","filePath":"guide/电子商务.md","lastUpdated":1775036159000}'),e={name:"guide/电子商务.md"};function o(l,a,d,i,u,c){return t(),n("div",null,[...a[0]||(a[0]=[p(`<h2 id="书籍isbn数据查询" tabindex="-1">书籍ISBN数据查询 <a class="header-anchor" href="#书籍isbn数据查询" aria-label="Permalink to &quot;书籍ISBN数据查询&quot;">​</a></h2><p><a href="https://api.isoyu.com/" target="_blank" rel="noreferrer">https://api.isoyu.com/</a></p><blockquote><p>通过请求10位或13位的ISBN码可以反馈给用户相应的书籍信息和推荐指数</p></blockquote><blockquote><p>最低 0.02元/次</p></blockquote><h3 id="请求地址" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/book/isbn</span></span></code></pre></div><h3 id="请求参数" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>是</td><td>string</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>sub</td><td>是</td><td>string</td><td>10位或者13位的ISBN码</td></tr></tbody></table><h3 id="返回data参数" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>levelNum</td><td>string</td><td>推荐指数</td></tr><tr><td>subtitle</td><td>string</td><td>副标题</td></tr><tr><td>author</td><td>string</td><td>作者</td></tr><tr><td>pubdate</td><td>string</td><td>发版日期</td></tr><tr><td>origin_title</td><td>string</td><td>源标题(国外源标题)</td></tr><tr><td>binding</td><td>string</td><td>装订方式</td></tr><tr><td>pages</td><td>string</td><td>总页数</td></tr><tr><td>images_medium</td><td>string</td><td>缩略图</td></tr><tr><td>images_large</td><td>string</td><td>大图</td></tr><tr><td>publisher</td><td>string</td><td>出版社名称</td></tr><tr><td>isbn10</td><td>string</td><td>10位ISBN码</td></tr><tr><td>isbn13</td><td>string</td><td>13位ISBN码</td></tr><tr><td>title</td><td>string</td><td>书籍名称</td></tr><tr><td>summary</td><td>string</td><td>内容简介</td></tr><tr><td>price</td><td>string</td><td>销售价格</td></tr></tbody></table><h3 id="sdk调用" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;bookIsbn()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withSub(&#39;9787544258975&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功的返回&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>         &quot;levelNum&quot;:&quot;8.0&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;subtitle&quot;:&quot;&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;author&quot;:&quot; 加西亚·马尔克斯&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;pubdate&quot;:&quot;2012-9-1&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;origin_title&quot;:El amor en los tiempos del cólera&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;binding&quot;:&quot;精装&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;pages&quot;:&quot;401&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;images_medium&quot;:&quot;http://open.6api.net/mpic/s11284102.jpg&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;images_large&quot;:&quot;http://open.6api.net/lpic/s11284102.jpg&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;publisher&quot;:&quot;南海出版公司&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;isbn10&quot;:&quot;7544258971&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;isbn13&quot;:&quot;9787544258975&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;title&quot;:&quot;霍乱时期的爱情&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;summary&quot;:&quot;《霍乱时期的爱情》是加西亚•马尔克斯获得诺贝尔文学奖之后完成的第一部小说。讲述了一段跨越半个多世纪的爱情史诗，穷尽了所有爱情的可能性：忠贞的、隐秘的、粗暴的、羞怯的、柏拉图式的、放荡的、转瞬即逝的、生死相依的……再现了时光的无情流逝，被誉为“人类有史以来最伟大的爱情小说”，是20世纪最重要的经典文学巨著之一。&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         &quot;price&quot;:&quot;39.50元&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="常用快递查询" tabindex="-1">常用快递查询 <a class="header-anchor" href="#常用快递查询" aria-label="Permalink to &quot;常用快递查询&quot;">​</a></h2><blockquote><p>根据快递单号查询快递状态信息，支持国内常规快递公司和物流公司，信息更新及时</p></blockquote><h3 id="接口1-根据单号查询快递信息" tabindex="-1">接口1：根据单号查询快递信息 <a class="header-anchor" href="#接口1-根据单号查询快递信息" aria-label="Permalink to &quot;接口1：根据单号查询快递信息&quot;">​</a></h3><blockquote><p>最低 0.008元/次</p></blockquote><h3 id="请求地址-1" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-1" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/express/query</span></span></code></pre></div><h3 id="请求参数-1" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-1" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>是</td><td>string</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>com</td><td>是</td><td>string</td><td>快递公司字母简称。可以使用auto代替,此时将自动识别快递单号。【查询顺丰时，为了保证效率，请尽量提供寄件人或者收件人查询】</td></tr><tr><td>nu</td><td>是</td><td>string</td><td>需要查询的快递单号</td></tr><tr><td>phone</td><td>否</td><td>string</td><td>手机尾号后四位【寄件人手机号或者收件人手机号】</td></tr></tbody></table><h3 id="返回参数" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数名称</th><th>类型</th><th>示例值</th><th>描述</th></tr></thead><tbody><tr><td>update</td><td>Number</td><td>1588071235436</td><td>更新时间戳</td></tr><tr><td>upgrade_info</td><td>String</td><td></td><td>提示信息，用于提醒用户可能出现的情况</td></tr><tr><td>updateStr</td><td>String</td><td>2020-04-28 18:53:55</td><td>更新时间</td></tr><tr><td>logo</td><td>String</td><td><a href="http://app2.showapi.com/img/expImg/zto.jpg" target="_blank" rel="noreferrer">http://app2.showapi.com/img/expImg/zto.jpg</a></td><td>快递公司logo</td></tr><tr><td>dataSize</td><td>Number</td><td>11</td><td>数据节点的长度</td></tr><tr><td>status</td><td>Number</td><td>4</td><td>快递状态 1 暂无记录 2 在途中 3 派送中 4 已签收 (完结状态) 5 用户拒签 6 疑难件 7 无效单 (完结状态) 8 超时单 9 签收失败 10 退回</td></tr><tr><td>fee_num</td><td>Number</td><td>1</td><td>计费次数。例如：0为计费0次，即不计费；1为计费1次</td></tr><tr><td>tel</td><td>String</td><td>95311</td><td>快递公司联系方式</td></tr><tr><td>data</td><td>Object[]</td><td></td><td></td></tr><tr><td>-</td><td>time</td><td>String</td><td>2019-11-16 21:33:56</td></tr><tr><td>-</td><td>context</td><td>String</td><td>快件已在 【九江城西港】 签收, 签收人: 速递易, 如有疑问请电联:（15779254414）, 投诉电话:（13687028760）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】</td></tr><tr><td>expSpellName</td><td>String</td><td>zhongtong</td><td>快递编码</td></tr><tr><td>msg</td><td>String</td><td>查询成功</td><td>返回提示信息</td></tr><tr><td>mailNo</td><td>String</td><td>75312165465979</td><td>快递单号</td></tr><tr><td>queryTimes</td><td>Number</td><td>1</td><td>无走件记录时被查询次数 注意：在24小时内，查询次数&gt;10次将会计费</td></tr></tbody></table><p>| flag | Boolean | true | true：查询成功，表示ret_code=0且data的长度&gt;0。可使用本字段做是否读取data列表的依据。 false：查询失败。 | | expTextName | String | 中通快递 | 快递简称 | | possibleExpList | String[] | [] | 自动识别结果 |</p><h4 id="sdk调用-1" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-1" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;expressQuery()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withCom(&#39;快递公司简称&#39;)</span></span>
<span class="line"><span>    -&gt;withNu(&#39;运单号&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><h3 id="接口2-快递公司列表-免费" tabindex="-1">接口2：快递公司列表（免费） <a class="header-anchor" href="#接口2-快递公司列表-免费" aria-label="Permalink to &quot;接口2：快递公司列表（免费）&quot;">​</a></h3><h3 id="请求地址-2" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-2" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/express/exp_list</span></span></code></pre></div><h3 id="请求参数-2" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-2" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>expName</td><td>否</td><td>string</td><td>快递公司关键词</td></tr><tr><td>maxSize</td><td>否</td><td>string</td><td>分页时,返回的最大数据量</td></tr><tr><td>page</td><td>否</td><td>string</td><td>当前页数</td></tr></tbody></table><h3 id="返回参数-1" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数-1" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>expressList</td><td>String</td><td>快递公司列表数据</td></tr><tr><td>- expName</td><td>String</td><td>快递公司名称</td></tr><tr><td>- simpleName</td><td>String</td><td>简称</td></tr><tr><td>- url</td><td>String</td><td>官方网址</td></tr><tr><td>- note</td><td>String</td><td>描述</td></tr><tr><td>- phone</td><td>String</td><td>快递公司服务电话</td></tr><tr><td>- imgUrl</td><td>String</td><td>快递公司图标</td></tr></tbody></table><p>JSON返回示例：</p><h3 id="sdk调用-2" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-2" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;expressExpList()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withExpName(&#39;如风&#39;)</span></span>
<span class="line"><span>    -&gt;withMaxSize(20)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;message&quot;:&quot;操作成功&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &quot;data&quot;:{</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;page&quot;: 1,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;expressList&quot;: [</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;imgUrl&quot;: &quot;http://app2.showapi.com/img/expImg/rufeng.jpg&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;simpleName&quot;: &quot;rufeng&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;phone&quot;: &quot;400-010-6660&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;expName&quot;: &quot;如风达快递&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;note&quot;: &quot;&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;url&quot;: &quot;http://www.rufengda.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;imgUrl&quot;: &quot;http://app2.showapi.com/img/expImg/562.gif&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;simpleName&quot;: &quot;rufengda&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;phone&quot;: &quot;400-010-6660&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;expName&quot;: &quot;凡客如风达&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;note&quot;: &quot;&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            &quot;url&quot;: &quot;http://www.rufengda.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;allNum&quot;: 2,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;msg&quot;: &quot;查询成功!&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;maxSize&quot;: 20</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span></code></pre></div><h2 id="二维码解码" tabindex="-1">二维码解码 <a class="header-anchor" href="#二维码解码" aria-label="Permalink to &quot;二维码解码&quot;">​</a></h2><blockquote><p>请传递图片base64编码数据或图片地址（任选其一），自动识别常见的二维码类型。请注意：该接口请使用POST方式请求，base64数据大小不超过300k。在保证图片清晰度的情况下，图片越小识别速度越快，结果也越稳定。</p></blockquote><blockquote><p>最低 0.02元/次</p></blockquote><h3 id="请求地址-3" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-3" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/qrcode/codec</span></span></code></pre></div><h3 id="请求参数-3" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-3" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>string</td><td>是</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>qrpic</td><td>string</td><td>否</td><td>二维码图片的base64编码</td></tr><tr><td>qrurl</td><td>string</td><td>否</td><td>二维码图片地址</td></tr></tbody></table><h3 id="返回data参数-1" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-1" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>示例值</th><th>说明</th></tr></thead><tbody><tr><td>qrtype</td><td>string</td><td>WeChat</td><td>二维码类型</td></tr><tr><td>qrcodec</td><td>string</td><td><a href="http://weixin.qq.com/r/nEx-ZyfEaXoWrWME9xmO" target="_blank" rel="noreferrer">http://weixin.qq.com/r/nEx-ZyfEaXoWrWME9xmO</a></td><td>二维码内容</td></tr></tbody></table><h3 id="sdk调用-3" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-3" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;qrcodeCodec()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &quot;qrtype&quot;: &quot;Url&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>          &quot;qrcodec&quot;: &quot;https://api.isoyu.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="二维码生成" tabindex="-1">二维码生成 <a class="header-anchor" href="#二维码生成" aria-label="Permalink to &quot;二维码生成&quot;">​</a></h2><blockquote><p>[danger]### 免费接口，每日100次免费调用，会员可不限次数调用，购买<a href="https://api.isoyu.com/?product/210" target="_blank" rel="noreferrer">API会员</a></p></blockquote><blockquote><p>按照设定的参数、生成二维码</p></blockquote><p>每日100次免费调用</p><h3 id="请求地址-4" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-4" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/qrcode/index</span></span></code></pre></div><h3 id="请求参数-4" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-4" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>是</td><td>string</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>text</td><td>否</td><td>string</td><td>二维码内容</td></tr><tr><td>el</td><td>否</td><td>string</td><td>纠错等级，el可用值：h\\q\\m\\l，例如：h</td></tr><tr><td>bgcolor</td><td>否</td><td>string</td><td>背景色代码，例如：ffffff</td></tr><tr><td>fgcolor</td><td>否</td><td>string</td><td>前景色代码，例如：000000</td></tr><tr><td>logo</td><td>否</td><td>string</td><td>logo图片URL地址或base64encode编码的图片内容，需要urlencode</td></tr><tr><td>w</td><td>否</td><td>int</td><td>尺寸大小（像素），例如：300</td></tr><tr><td>m</td><td>否</td><td>int</td><td>边距大小（像素），例如：10</td></tr><tr><td>lw</td><td>否</td><td>int</td><td>logo宽度（像素），例如：60</td></tr><tr><td>type</td><td>否</td><td>int</td><td>返回模式，1:二维码图片以base64encode编码返回 2:直接返回二维码图像，默认1</td></tr></tbody></table><h3 id="返回data参数-2" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-2" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>见JSON返回示例</td><td>-</td><td></td></tr></tbody></table><h3 id="sdk调用-4" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-4" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;qrcodeIndex()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withText(&#39;二维码内容&#39;)</span></span>
<span class="line"><span>    -&gt;withBgcolor(&#39;ffffff&#39;)</span></span>
<span class="line"><span>    -&gt;withFgcolor(&#39;000000&#39;)</span></span>
<span class="line"><span>    -&gt;withLogo()</span></span>
<span class="line"><span>    -&gt;withW()</span></span>
<span class="line"><span>    -&gt;withM()</span></span>
<span class="line"><span>    -&gt;withType()</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{ </span></span>
<span class="line"><span>    &quot;message&quot;: &quot;success&quot;, </span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>         &quot;base64_image&quot;: &quot;base64encode编码的二维码图片内容&quot; </span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>     &quot;code&quot;: 0</span></span>
<span class="line"><span> }</span></span></code></pre></div><h2 id="汇率换算" tabindex="-1">汇率换算 <a class="header-anchor" href="#汇率换算" aria-label="Permalink to &quot;汇率换算&quot;">​</a></h2><blockquote><p>[danger]### 免费接口，每日100次免费调用，会员可不限次数调用，购买<a href="https://api.isoyu.com/?product/210" target="_blank" rel="noreferrer">API会员</a></p></blockquote><blockquote><p>外汇报价，货币汇率，包含三个接口：常用汇率查询、货币列表和实时汇率查询换算</p></blockquote><p>每日100次免费调用</p><h3 id="接口1-常用汇率查询" tabindex="-1">接口1：常用汇率查询 <a class="header-anchor" href="#接口1-常用汇率查询" aria-label="Permalink to &quot;接口1：常用汇率查询&quot;">​</a></h3><blockquote><p>汇率查询，数据仅供参考，交易时以银行柜台成交价为准</p></blockquote><h3 id="请求地址-5" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-5" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/exchange/query</span></span></code></pre></div><h3 id="请求参数-无" tabindex="-1">请求参数（无） <a class="header-anchor" href="#请求参数-无" aria-label="Permalink to &quot;请求参数（无）&quot;">​</a></h3><h4 id="sdk调用-5" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-5" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 常用汇率查询</span></span>
<span class="line"><span>$result = $client-&gt;exchangeQuery()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;查询成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;update&quot;: &quot;2016-07-22 10:32:31&quot;,</span></span>
<span class="line"><span>        &quot;list&quot;: [</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &quot;美元&quot;, /*货币名称*/</span></span>
<span class="line"><span>                &quot;100&quot;, /*交易单位*/</span></span>
<span class="line"><span>                &quot;665.63&quot;, /*现汇买入价*/</span></span>
<span class="line"><span>                &quot;660.3&quot;, /*现钞买入价*/</span></span>
<span class="line"><span>                &quot;668.3&quot;, /*现钞卖出价*/</span></span>
<span class="line"><span>                &quot;666.69&quot; /*中行折算价*/</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &quot;港币&quot;,</span></span>
<span class="line"><span>                &quot;100&quot;,</span></span>
<span class="line"><span>                &quot;85.83&quot;,</span></span>
<span class="line"><span>                &quot;85.14&quot;,</span></span>
<span class="line"><span>                &quot;86.15&quot;,</span></span>
<span class="line"><span>                &quot;85.96&quot;</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &quot;日元&quot;,</span></span>
<span class="line"><span>                &quot;100&quot;,</span></span>
<span class="line"><span>                &quot;6.2771&quot;,</span></span>
<span class="line"><span>                &quot;6.0834&quot;,</span></span>
<span class="line"><span>                &quot;6.3211&quot;,</span></span>
<span class="line"><span>                &quot;6.3014&quot;</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &quot;欧元&quot;,</span></span>
<span class="line"><span>                &quot;100&quot;,</span></span>
<span class="line"><span>                &quot;732.74&quot;,</span></span>
<span class="line"><span>                &quot;710.13&quot;,</span></span>
<span class="line"><span>                &quot;737.88&quot;,</span></span>
<span class="line"><span>                &quot;735.79&quot;</span></span>
<span class="line"><span>            ],</span></span>
<span class="line"><span>            [</span></span>
<span class="line"><span>                &quot;英镑&quot;,</span></span>
<span class="line"><span>                &quot;100&quot;,</span></span>
<span class="line"><span>                &quot;879.28&quot;,</span></span>
<span class="line"><span>                &quot;852.15&quot;,</span></span>
<span class="line"><span>                &quot;885.46&quot;,</span></span>
<span class="line"><span>                &quot;879.01&quot;</span></span>
<span class="line"><span>            ]</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;code&quot;: 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="接口2-货币列表" tabindex="-1">接口2：货币列表 <a class="header-anchor" href="#接口2-货币列表" aria-label="Permalink to &quot;接口2：货币列表&quot;">​</a></h3><blockquote><p>支持的货币列表</p></blockquote><h3 id="请求地址-6" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-6" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://api.isoyu.com/exchange/currency</span></span></code></pre></div><h3 id="请求参数-无-1" tabindex="-1">请求参数（无） <a class="header-anchor" href="#请求参数-无-1" aria-label="Permalink to &quot;请求参数（无）&quot;">​</a></h3><h4 id="sdk调用-6" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-6" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 获取货币列表</span></span>
<span class="line"><span>$result = $client-&gt;exchangeCurrency()</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;查询成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;list&quot;: [</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;name&quot;: &quot;人民币&quot;, /*货币名称*/</span></span>
<span class="line"><span>                &quot;code&quot;: &quot;CNY&quot; /*货币代码*/</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;name&quot;: &quot;美元&quot;,</span></span>
<span class="line"><span>                &quot;code&quot;: &quot;USD&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;name&quot;: &quot;日元&quot;,</span></span>
<span class="line"><span>                &quot;code&quot;: &quot;JPY&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;name&quot;: &quot;欧元&quot;,</span></span>
<span class="line"><span>                &quot;code&quot;: &quot;EUR&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>            {</span></span>
<span class="line"><span>                &quot;name&quot;: &quot;英镑&quot;,</span></span>
<span class="line"><span>                &quot;code&quot;: &quot;GBP&quot;</span></span>
<span class="line"><span>            },</span></span>
<span class="line"><span>        ...</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;code&quot;: 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="接口3-实时汇率查询" tabindex="-1">接口3：实时汇率查询 <a class="header-anchor" href="#接口3-实时汇率查询" aria-label="Permalink to &quot;接口3：实时汇率查询&quot;">​</a></h3><p>实时货币汇率查询换算，数据仅供参考，交易时以银行柜台成交价为准</p><h3 id="请求地址-7" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-7" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>https://api.isoyu.com/exchange/convert</span></span></code></pre></div><h3 id="请求参数-5" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-5" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>是</td><td>string</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>from</td><td>是</td><td>string</td><td>转换汇率前的货币代码</td></tr><tr><td>to</td><td>是</td><td>string</td><td>转换汇率成的货币代码</td></tr></tbody></table><h4 id="sdk调用-7" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-7" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 查询实时汇率</span></span>
<span class="line"><span>$result = $client-&gt;exchangeConvert()</span></span>
<span class="line"><span>    -&gt;withFrom()</span></span>
<span class="line"><span>    -&gt;withTo()</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;查询成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;currencyF&quot;: &quot;JPY&quot;, /*货币代码*/</span></span>
<span class="line"><span>            &quot;currencyF_Name&quot;: &quot;日元&quot;, /*货币名称*/</span></span>
<span class="line"><span>            &quot;currencyT&quot;: &quot;BHD&quot;, /*货币代码*/</span></span>
<span class="line"><span>            &quot;currencyT_Name&quot;: &quot;巴林第纳尔&quot;, /*货币名称*/</span></span>
<span class="line"><span>            &quot;currencyFD&quot;: 1,</span></span>
<span class="line"><span>            &quot;exchange&quot;: &quot;0.0032685972&quot;, /*当前汇率*/</span></span>
<span class="line"><span>            &quot;result&quot;: &quot;0.0032&quot;,/*当前汇率*/</span></span>
<span class="line"><span>            &quot;updateTime&quot;: &quot;2014-11-07 13:58:02&quot;</span></span>
<span class="line"><span>        },</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span>            &quot;currencyF&quot;: &quot;BHD&quot;,</span></span>
<span class="line"><span>            &quot;currencyF_Name&quot;: &quot;巴林第纳尔&quot;,</span></span>
<span class="line"><span>            &quot;currencyT&quot;: &quot;JPY&quot;,</span></span>
<span class="line"><span>            &quot;currencyT_Name&quot;: &quot;日元&quot;,</span></span>
<span class="line"><span>            &quot;currencyFD&quot;: 1,</span></span>
<span class="line"><span>            &quot;exchange&quot;: &quot;305.9416445623&quot;,</span></span>
<span class="line"><span>            &quot;result&quot;: 305.9416,</span></span>
<span class="line"><span>            &quot;updateTime&quot;: &quot;2014-11-07 13:58:01&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span>    &quot;code&quot;: 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="收货地址解析" tabindex="-1">收货地址解析 <a class="header-anchor" href="#收货地址解析" aria-label="Permalink to &quot;收货地址解析&quot;">​</a></h2><blockquote><p>[danger]### 会员接口，仅限会员使用，购买<a href="https://api.isoyu.com/?product/210" target="_blank" rel="noreferrer">API会员</a></p></blockquote><blockquote><p>此接口可以解析出文本中的收货人姓名、联系方式、邮编和详细地址。并且可以将地址拆分出省市区（自治区、旗、盟等），方便电商和物流等项目应用。text参数中的内容同一类型（例如电话号码和邮编都是数字，连在一起的话，最好有空格或逗号相隔）。</p></blockquote><h3 id="请求地址-8" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-8" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/express/address</span></span></code></pre></div><h3 id="请求参数-6" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-6" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>是</td><td>string</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>text</td><td>是</td><td>string</td><td>文本内容</td></tr></tbody></table><h3 id="返回data参数-3" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-3" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>示例值</th><th>说明</th></tr></thead><tbody><tr><td>mobile</td><td>string</td><td>13800138000</td><td>移动电话号码</td></tr><tr><td>name</td><td>string</td><td>马云</td><td>收货人姓名</td></tr><tr><td>province</td><td>string</td><td>浙江省</td><td>省/特区/自治区/直辖市</td></tr><tr><td>city</td><td>string</td><td>杭州市</td><td>城市</td></tr><tr><td>district</td><td>string</td><td>滨江区</td><td>区县</td></tr><tr><td>postcode</td><td>string</td><td>310052</td><td>邮编</td></tr><tr><td>detail</td><td>string</td><td>浙江省杭州市滨江区网商路699号</td><td>完整收货地址</td></tr></tbody></table><h3 id="sdk调用-8" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-8" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;expressAddress()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withText(&#39;马云,13800138000浙江省杭州市滨江区网商路699号310052&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功的返回&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;mobile&quot;:&quot;13800138000&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;name&quot;:&quot;马云&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;province&quot;:&quot;浙江省&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;city&quot;:&quot;杭州市&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;district&quot;:&quot;滨江区&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;postcode&quot;:&quot;310052&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;detail&quot;:&quot;浙江省杭州市滨江区网商路699号&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="淘宝客订单号检测" tabindex="-1">淘宝客订单号检测 <a class="header-anchor" href="#淘宝客订单号检测" aria-label="Permalink to &quot;淘宝客订单号检测&quot;">​</a></h2><blockquote><p>可以检测淘宝订单号是否使用淘客下单，避免商家损失佣金</p></blockquote><blockquote><p>最低 0.016元/次</p></blockquote><h3 id="请求地址-9" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-9" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/taobaoke/check_order</span></span></code></pre></div><h3 id="请求参数-7" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-7" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>string</td><td>是</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>orderNo</td><td>string</td><td>是</td><td>订单号</td></tr></tbody></table><h3 id="返回data参数-4" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-4" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>taoke</td><td>bool</td><td>true：淘客订单 false：非淘客订单或订单失效</td></tr><tr><td>remark</td><td>string</td><td>说明</td></tr></tbody></table><h3 id="sdk调用-9" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-9" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;taobaokeCheckOrder()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withOrderNo(&#39;淘宝订单号&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	  	&quot;taoke&quot;: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;remark&quot;: &quot;请注意，该订单为淘客订单&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;hasNextPage&quot;: &quot;1&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>		&quot;orders&quot;: []</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="淘口令解析" tabindex="-1">淘口令解析 <a class="header-anchor" href="#淘口令解析" aria-label="Permalink to &quot;淘口令解析&quot;">​</a></h2><blockquote><p>将淘口令解析还原成url，商品口令、券口令可完美解析出商品id</p></blockquote><blockquote><p>最低 0.0025元/次</p></blockquote><h3 id="请求地址-10" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-10" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/taobaoke/query</span></span></code></pre></div><h3 id="请求参数-8" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-8" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>string</td><td>是</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>tkl</td><td>string</td><td>是</td><td>淘口令</td></tr></tbody></table><h3 id="返回data参数-5" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-5" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>num_iid</td><td>string</td><td>商品id, 只要口令是商品口令或券口令时才返回商品id</td></tr><tr><td>content</td><td>string</td><td>淘口令-文案</td></tr><tr><td>title</td><td>string</td><td>商品标题</td></tr><tr><td>price</td><td>string</td><td>商品价格(手淘分享的口令，才可以解析出价格)</td></tr><tr><td>pic_url</td><td>string</td><td>口令图片</td></tr><tr><td>url</td><td>string</td><td>跳转url(长链)</td></tr><tr><td>native_url</td><td>string</td><td>移动端调起地址</td></tr><tr><td>thumb_pic_url</td><td>string</td><td>缩略图</td></tr></tbody></table><h3 id="sdk调用-10" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-10" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;taobaokeQuery()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withTkl(&#39;￥4SKAZC8brVD￥&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;content&quot;: &quot;FANBIYA X8隐形蓝牙耳机无线迷你超小挂耳式运动开车入耳塞微型头戴式可接听电话手机男女通用适用苹果&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;native_url&quot;: &quot;tbopen://m.taobao.com/tbopen/index.html?a.....&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;pic_url&quot;: &quot;https://img.alicdn.com/tfscom/i2/2289894494/O1CN01IFLHLJ1j4IOYvfX3g_!!0-item_pic.jpg&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;suc&quot;: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;thumb_pic_url&quot;: &quot;https://img.alicdn.com/tfscom/i2/2289894494/O1CN01IFLHLJ1j4IOYvfX3g_!!0-item_pic.jpg_170x170.jpg&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;title&quot;: &quot;淘口令-页面&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;url&quot;: &quot;https://uland.taobao.com/coupon/edetail?e=jTS9Uk507ZQG.......&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;request_id&quot;: &quot;88gbusl7o1at&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;num_iid&quot;: &quot;572096814881&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="条码查询" tabindex="-1">条码查询 <a class="header-anchor" href="#条码查询" aria-label="Permalink to &quot;条码查询&quot;">​</a></h2><blockquote><p>通过条码(条形码)查询商品信息（名称、价格、图片、厂家、描述等字段），融合了包括中国条码中心在内的多个数据源。</p></blockquote><blockquote><p>最低 0.005元/次</p></blockquote><h3 id="请求地址-11" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-11" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/barcode/query</span></span></code></pre></div><h3 id="请求参数-9" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-9" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数名称</th><th>类型</th><th>必须</th><th>描述</th></tr></thead><tbody><tr><td>appCode</td><td>string</td><td>是</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>code</td><td>String</td><td>是</td><td>条形码</td></tr></tbody></table><h3 id="返回data参数-6" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-6" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>示例值</th><th>描述</th></tr></thead><tbody><tr><td>flag</td><td>String</td><td>true</td><td>操作是否成功</td></tr><tr><td>code</td><td>String</td><td>6938166920785</td><td>条形码</td></tr><tr><td>goodsName</td><td>String</td><td>苹果醋</td><td>商品名称</td></tr><tr><td>manuName</td><td>String</td><td>新乡市和丝露饮品有限公司</td><td>厂商</td></tr><tr><td>spec</td><td>String</td><td>268ml</td><td>规格</td></tr><tr><td>price</td><td>String</td><td>3.00</td><td>参考价格(单位:元)</td></tr><tr><td>trademark</td><td>String</td><td>醋美人生</td><td>商标/品牌名称</td></tr><tr><td>img</td><td>String</td><td><a href="http://www.aijiazixuan.com/upfilesmall/2013-12/2013121962731065.jpg" target="_blank" rel="noreferrer">http://www.aijiazixuan.com/upfilesmall/2013-12/2013121962731065.jpg</a></td><td>图片地址</td></tr><tr><td>ret_code</td><td>String</td><td>0</td><td>返回代码 0为成功,其他为失败</td></tr><tr><td>goodsType</td><td>String</td><td>食品、饮料和烟草&gt;&gt;饮料</td><td>商品分类</td></tr><tr><td>sptmImg</td><td>String</td><td><a href="http://app2.showapi.com/img/barCode%5C_img/20161116/14792662xxxxxxx.png" target="_blank" rel="noreferrer">http://app2.showapi.com/img/barCode\\_img/20161116/14792662xxxxxxx.png</a></td><td>条码图片</td></tr><tr><td>ycg</td><td>String</td><td>中国</td><td>原产地(可能无此参数信息)</td></tr><tr><td>note</td><td>String</td><td></td><td>备注信息</td></tr><tr><td>remark</td><td>String</td><td>查询成功！</td><td>返回结果的描述</td></tr><tr><td>manuAddress</td><td>String</td><td></td><td>厂商地址</td></tr><tr><td>imgList</td><td>String</td><td></td><td>条码中心图片列表</td></tr></tbody></table><h3 id="sdk调用-11" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-11" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;barcodeQuery()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withCode(&#39;6938166920785&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;request();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>dump($result);</span></span></code></pre></div><p>返回数据示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;查询成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        &quot;sptmImg&quot;: &quot;&quot;,</span></span>
<span class="line"><span>        &quot;spec&quot;: &quot;268ml&quot;,</span></span>
<span class="line"><span>        &quot;remark&quot;: &quot;查询成功！&quot;,</span></span>
<span class="line"><span>        &quot;img&quot;: &quot;http://app2.showapi.com/img/barCode_img/2f7e639b-aa2f-4248-ae79-f0acc6ea56e6.jpg&quot;,</span></span>
<span class="line"><span>        &quot;code&quot;: &quot;6938166920785&quot;,</span></span>
<span class="line"><span>        &quot;ycg&quot;: &quot;&quot;,</span></span>
<span class="line"><span>        &quot;manuName&quot;: &quot;新乡市和丝露饮品有限公司&quot;,</span></span>
<span class="line"><span>        &quot;ret_code&quot;: &quot;0&quot;,</span></span>
<span class="line"><span>        &quot;imgList&quot;: [],</span></span>
<span class="line"><span>        &quot;flag&quot;: true,</span></span>
<span class="line"><span>        &quot;price&quot;: &quot;3.00&quot;,</span></span>
<span class="line"><span>        &quot;trademark&quot;: &quot;醋美人生&quot;,</span></span>
<span class="line"><span>        &quot;manuAddress&quot;: &quot;河南省新乡市原阳县新城开发区&quot;,</span></span>
<span class="line"><span>        &quot;note&quot;: &quot;备注：经查，该厂商识别代码已在中国物品编码中心注册，但编码信息未按规定通报&quot;,</span></span>
<span class="line"><span>        &quot;goodsName&quot;: &quot;苹果醋&quot;,</span></span>
<span class="line"><span>        &quot;goodsType&quot;: &quot;工业生产和制造业&gt;&gt;食品和饮料工业&gt;&gt;饮料加工&gt;&gt;水饮料加工&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;code&quot;: 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><blockquote><p>[danger] 返回<code>code</code>为0时计费。</p></blockquote><h2 id="图书电商数据" tabindex="-1">图书电商数据 <a class="header-anchor" href="#图书电商数据" aria-label="Permalink to &quot;图书电商数据&quot;">​</a></h2><blockquote><p>[danger]### 免费接口，每日100次免费调用，会员可不限次数调用，购买<a href="https://api.isoyu.com/?product/210" target="_blank" rel="noreferrer">API会员</a></p></blockquote><blockquote><p>于万千之中选择你所爱--好书推荐，值得你信赖。</p></blockquote><p>每日100次免费调用</p><h2 id="接口1-图书分类目录" tabindex="-1">接口1：图书分类目录 <a class="header-anchor" href="#接口1-图书分类目录" aria-label="Permalink to &quot;接口1：图书分类目录&quot;">​</a></h2><h3 id="请求地址-12" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-12" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/book/catalog</span></span></code></pre></div><h3 id="请求参数-10" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-10" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><p>无</p><h3 id="返回data参数-7" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-7" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>id</td><td>int</td><td>目录编号</td></tr><tr><td>catalog</td><td>string</td><td>目录内容</td></tr></tbody></table><h3 id="sdk调用-12" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-12" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;bookCatalog()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功的返回&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: {</span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;242&quot;, &quot;catalog&quot;:&quot;中国文学&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;243&quot;, &quot;catalog&quot;:&quot;外国文学&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;244&quot;, &quot;catalog&quot;:&quot;儿童文学&quot; },</span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;245&quot;, &quot;catalog&quot;:&quot;散文&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;246&quot;, &quot;catalog&quot;:&quot;经典名著&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;247&quot;, &quot;catalog&quot;:&quot;小说&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;248&quot;, &quot;catalog&quot;:&quot;历史&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;249&quot;, &quot;catalog&quot;:&quot;教育&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;250&quot;, &quot;catalog&quot;:&quot;成功励志&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;251&quot;, &quot;catalog&quot;:&quot;心灵鸡汤&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;252&quot;, &quot;catalog&quot;:&quot;人物传记&quot; },</span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;253&quot;, &quot;catalog&quot;:&quot;心理学&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;254&quot;, &quot;catalog&quot;:&quot;管理&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;255&quot;, &quot;catalog&quot;:&quot;经济&quot; }, </span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;256&quot;, &quot;catalog&quot;:&quot;理财&quot; },</span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;257&quot;, &quot;catalog&quot;:&quot;哲学&quot; },</span></span>
<span class="line"><span>        { &quot;id&quot;:&quot;258&quot;, &quot;catalog&quot;:&quot;计算机&quot; }</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h2 id="接口2-图书内容" tabindex="-1">接口2：图书内容 <a class="header-anchor" href="#接口2-图书内容" aria-label="Permalink to &quot;接口2：图书内容&quot;">​</a></h2><h3 id="请求地址-13" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-13" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/book/query</span></span></code></pre></div><h3 id="请求参数-11" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-11" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>必填</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>catalog_id</td><td>是</td><td>int</td><td>目录编号</td></tr><tr><td>pn</td><td>是</td><td>int</td><td>数据返回起始</td></tr><tr><td>rn</td><td>是</td><td>int</td><td>数据返回条数，最大30</td></tr></tbody></table><h3 id="返回参数-2" tabindex="-1">返回参数 <a class="header-anchor" href="#返回参数-2" aria-label="Permalink to &quot;返回参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>说明</th></tr></thead><tbody><tr><td>见JSON返回示例</td><td>-</td><td></td></tr></tbody></table><h3 id="sdk调用-13" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-13" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;bookQuery()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withCategoryId(242)</span></span>
<span class="line"><span>    -&gt;withPn(2)</span></span>
<span class="line"><span>    -&gt;withRn(1)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功的返回&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span> { &quot;title&quot;:&quot;明朝那些事儿&quot;, &quot;catalog&quot;:&quot;中国文学 历史 小说 &quot;, &quot;tags&quot;:&quot;中国历史 历史小说 好书推荐 明朝 畅销书排行榜 &quot;, &quot;sub1&quot;:&quot;当时明月经典著作：《明朝那些事儿》&quot;, &quot;sub2&quot;:&quot;《明朝那些事儿》是中国青年历史学者当时明月创作的一系列连载的历史小说，作品讲述了从1344年到1644年间中国明朝三百年的历史故事。小说以史料为基础，以年代和具体人物为主线，以小说的笔法，从朱元璋出生开始讲起，到崇祯皇帝自缢、明朝灭亡结束，将明朝十七帝、王公权贵和小人物的命运等娓娓道来，进行了全景式的展示与描写。而作品对官场政治、战争、帝王心术等的描写更为突出，着墨更多，也对当时的政治经济制度和人伦道德进行了演绎。《明朝那些事儿》精彩绝伦，引人入胜，掀起了一股明朝热。\\\\n《明朝那些事儿》的作者当年明月，原名石悦，男，于1979年出生在宜昌一个普通的干部家庭里，曾是广东顺德海关的一名公务员，现为中国海关总署缉私警察。他于2006年3月在天涯社区首次发表《明朝那些事儿》，于2009年3月21日连载完毕，现已全部集结成书出版发行，一共7部。当年明月是青年历史学者、畅销书作家，也是明史学会会员，更是心灵历史的开创者。他的代表作《明朝那些事儿》销量已过五百万册，为三十年来最畅销的史学读本。\\\\n《明朝那些事儿》共有七部，第一部从朱元璋的出身开始写起，到永乐大帝夺位的靖难之役结束为止，叙述了明朝最艰苦卓绝的开国过程和永乐夺位、建文失踪的靖难之役……第七部描写了明朝最后一位皇帝崇祯的故事和北方后金势力的崛起。七部历史小说，精彩的演绎了中国明代三百年的历史故事和重要历史人物，吸引了千千万万的读者。\\\\n《明朝那些事儿》是迄今为止唯一全本白话正说明朝大历史。作者当时明月以通俗浅显甚至娱乐化的手法重述、重写历史，引发了一场“感染”者高烧不退的“读史热”。而因这一系列作品的持续畅销，当时明月连续五年荣登“中国作家富豪榜”，成为近几年国内文化界的一大奇观，也引起了不少争议。\\\\n《明朝那些事儿》是一部“好读”的历史，也是一部“老百姓”可以读的历史，能够让大家阅读得畅快淋漓。让我们翻开《明朝那些事儿》，走进中国明朝，去细细体会那些事儿……\\\\n《明朝那些事儿》&quot;, &quot;img&quot;:&quot;http:\\\\/\\\\/apis.juhe.cn\\\\/goodbook\\\\/img\\\\/485e07a3ae0fc5de931b439881a4b013.jpg&quot;, &quot;reading&quot;:&quot;5841人阅读&quot;, &quot;online&quot;:&quot;京东商城:http:\\\\/\\\\/book.jd.com\\\\/11014800.html 当当网:http:\\\\/\\\\/product.dangdang.com\\\\/product.aspx?product\\_id=22554517 亚马逊:http:\\\\/\\\\/www.amazon.cn\\\\/%E6%98%8E%E6%9C%9D%E9%82%A3%E4%BA%9B%E4%BA%8B%E5%84%BF-%E5%BD%93%E5%B9%B4%E6%98%8E%E6%9C%88\\\\/dp\\\\/B005UIJ4NQ\\\\/ref=sr\\_1\\_1 苏宁易购:http:\\\\/\\\\/www.suning.com\\\\/emall\\\\/prd\\_10052\\_22001\\_-7\\_1382710\\_.html&quot;, &quot;bytime&quot;:&quot;2013年6月18日&quot; }],</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h2 id="语言翻译" tabindex="-1">语言翻译 <a class="header-anchor" href="#语言翻译" aria-label="Permalink to &quot;语言翻译&quot;">​</a></h2><blockquote><p>系统支持自动识别源语言也可以指定来源和翻译对象。单次请求不得超过5K字节，约为1600汉字。</p></blockquote><blockquote><p>最低 0.006元/次</p></blockquote><h3 id="请求地址-14" tabindex="-1">请求地址 <a class="header-anchor" href="#请求地址-14" aria-label="Permalink to &quot;请求地址&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GET https://api.isoyu.com/fanyi/index</span></span></code></pre></div><h3 id="请求参数-12" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数-12" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>必填</th><th>说明</th></tr></thead><tbody><tr><td>appCode</td><td>string</td><td>是</td><td>用户授权码，参考<a href="https://api.isoyu.com/?think-api/1835086" target="_blank" rel="noreferrer">API调用</a></td></tr><tr><td>text</td><td>string</td><td>是</td><td>需要翻译的内容</td></tr><tr><td>to</td><td>string</td><td>否</td><td>目标语言，默认自动识别</td></tr></tbody></table><h3 id="返回data参数-8" tabindex="-1">返回<code>data</code>参数 <a class="header-anchor" href="#返回data参数-8" aria-label="Permalink to &quot;返回\`data\`参数&quot;">​</a></h3><table tabindex="0"><thead><tr><th>名称</th><th>类型</th><th>示例值</th><th>说明</th></tr></thead><tbody><tr><td>from</td><td>string</td><td>en</td><td>来源语言</td></tr><tr><td>to</td><td>string</td><td>zh</td><td>目标语言</td></tr><tr><td>src</td><td>string</td><td>hello</td><td>翻译文本</td></tr><tr><td>dst</td><td>string</td><td>你好</td><td>翻译结果</td></tr></tbody></table><h3 id="sdk调用-14" tabindex="-1">SDK调用 <a class="header-anchor" href="#sdk调用-14" aria-label="Permalink to &quot;SDK调用&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$client = new Client(&quot;YourAppCode&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>$result = $client-&gt;fanyiIndex()</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    -&gt;withText(&#39;hello&#39;)</span></span>
<span class="line"><span>    -&gt;request();</span></span></code></pre></div><p>返回示例：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>    &quot;code&quot;:0,</span></span>
<span class="line"><span>    &quot;message&quot;: &quot;成功&quot;,</span></span>
<span class="line"><span>    &quot;data&quot;: [</span></span>
<span class="line"><span>        {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;from&quot;:&quot;en&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;to&quot;:&quot;zh&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;src&quot;:&quot;hello&quot;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &quot;dst&quot;:&quot;你好&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,190)])])}const q=s(e,[["render",o]]);export{h as __pageData,q as default};
