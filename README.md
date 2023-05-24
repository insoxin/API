# API For Docker
API For Docker 一个基于多种编程语言免费不限制提供生活常用,出行服务,开发工具,金融服务,通讯服务和公益大数据的平台. https://api.isoyu.com/

---

###### "食"用方法:个人近十年完善整理的API大杂烩接口,需要什么加什么功能,个人习惯比较乱,本页面公开的接口占所有接口五分之一.之前一直个人使用,在2017年首公开公益接口并逐渐开放更多接口并开源。 主Linux Docker容器,编程语言杂七杂八不介绍了 数据存储主OceanBase    采用 REST 风格设计。所有接口请求地址都是可预期的以及面向资源的。使用规范的 HTTP 响应代码来表示请求结果的正确或错误信息。使用 HTTP 内置的特性，如 HTTP Authentication 和 HTTP 请求方法让接口易于理解。所有的 API 请求都会以规范友好的 JSON 对象格式返回（包括错误信息）。

---
###### 须知：API将会记录你的域名、使用流量、调用次数等重要信息并存储六个月，如介意，请勿使用。日单IP过千请申请加白 [统计信息](#) 管理员邮箱admin@isoyu.com 
---
###### 条款：API拥有所有运行权，在某些特定情况下，姬长信API有权利禁止你的网站调用。

---

###### 警告⚠️禁止用于违法,商业用途。若发现有大批违禁滥用,会针对该功能加上授权码,仅供工信部备案,公安备案用户申请使用.

---

###### 不接受定制功能性捐助! [Who has donated recently?](https://github.com/insoxin/donate/blob/master/HISTORY.md)

<a href="https://www.upyun.com/?utm_source=isoyu" target="_blank" rel="nofollow"><img src="https://gcore.jsdelivr.net/gh/insoxin/API@master/images/upyun.png" width="80" height="25" alt="upyun" ><a>提供 CDN 赞助. <a href="https://www.upyun.com/league" target="_blank" rel="nofollow">推荐使用又拍云CDN加速网站,每月免费15G流量</a>
 
推荐[Cloudflare ](https://www.cloudflare.com/)全球加速

 
---
###### [基于TA的作品](https://blog.isoyu.com/inso.html)
---
###### API接口列表
 + 公益中国:宝贝回家核心数据 /全国通缉令数据 (ssl)/AI分析乳腺 X 线照片
 + 新闻分类(头条/军事/娱乐/体育/科技/艺术/教育/要闻)数据接口
 + 视频分类(精品视频/搞笑视频/美女视频/体育视频/新闻现场)接口
 + 图片(cosplay)接口,花瓣相册接口
 + 上海市政数据(数据由上海信息委提供)
 + 段子笑话接口、天气预报接口
 + IT资讯前端开发日报、知乎日报等
 + 招聘信息
 + bing每日图片壁纸
 + 二维码生成与解码(phpqrcode)
 + ARU(阿鲁)表情包[作者授权]
 + 图片反代(解决新浪图床反盗链)
 + 内置动漫二次元美女图片壁纸随机美女,宠物图片,随机动漫图片,随机抱枕图,卡通图片,二次元图片,IP图片
 + 开发杂类
 + QQ昵称和头像接口
 + 长网址缩短与还原
 + 抖音去水印(作者userId,抖音id,昵称,头像,签名,视频资源Id,视频信息,无水印视频等)
 + 实时热搜(来源百度)
 + 音频资源嗅探(p2p)
 + CSGO账号信息查询
 + 雅思成绩(以官为准)
 + isbn查询
 + 图片鉴黄
 + 百度逆向link
 + 待定...
 
 
 
 
 # 安装

## docker

1.
```
docker pull insoxin/api:latest
```
2.
```
docker run -dit --name api -p 8080:80  --restart unless-stopped insoxin/api:latest

```

访问 IP:8080


