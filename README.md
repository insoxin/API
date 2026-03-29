# API For Docker
API For Docker 是一个基于多种编程语言的开放 API 平台，免费、不限调用，覆盖生活常用、出行服务、开发工具、金融服务、通讯服务和公益大数据等场景。
官网：<https://api.isoyu.com/>

---

###### "食"用方法：个人近十年整理维护的 API 大杂烩，按需增加功能。当前页面公开的接口约占全部接口的五分之一。
###### 服务长期运行在 Linux Docker 容器中，数据存储以 OceanBase 为主。接口采用 REST 风格设计，请求地址可预期且面向资源；通过标准 HTTP 状态码表达成功或失败；并使用 HTTP Authentication 与标准请求方法提升易用性。所有 API 请求均返回规范友好的 JSON（含错误信息）。

---
###### 须知：API 将记录你的域名、使用流量、调用次数等信息并存储六个月，如介意请勿使用。日单 IP 过千请申请加白。 [统计信息](#) 管理员邮箱：admin@isoyu.com
---
###### 条款：API 拥有所有运行权，在某些特定情况下，姬长信 API 有权禁止你的网站调用。

---

###### 警告 ⚠️ 禁止用于违法、商业用途。若发现有大批违禁滥用，会针对该功能加上授权码，仅供工信部备案、公安备案用户申请使用。

---

###### 不接受定制功能性捐助！[Who has donated recently?](https://github.com/insoxin/donate/blob/master/HISTORY.md)


推荐 [Cloudflare](https://www.cloudflare.com/) 全球加速

###### 统计


![7-day Cloudflare traffic statistics](https://api.isoyu.com/CloudflareTrafficCard/cf_svg.php?period=7d)

![30-day Cloudflare traffic statistics](https://api.isoyu.com/CloudflareTrafficCard/cf_svg.php?period=30d)


---
###### [基于TA的作品](https://blog.isoyu.com/inso.html)
---
###### API 接口列表
+ 公益中国：宝贝回家核心数据 / 全国通缉令数据（SSL）/ AI 分析乳腺 X 线照片
+ 新闻分类（头条/军事/娱乐/体育/科技/艺术/教育/要闻）数据接口
+ 视频分类（精品视频/搞笑视频/美女视频/体育视频/新闻现场）接口
+ 图片（cosplay）接口、花瓣相册接口
+ 上海市政数据（数据由上海信息委提供）
+ 段子笑话接口、天气预报接口
+ IT 资讯前端开发日报、知乎日报等
+ 招聘信息
+ Bing 每日图片壁纸
+ 二维码生成与解码（phpqrcode）
+ ARU（阿鲁）表情包 [作者授权]
+ 图片反代（解决新浪图床反盗链）
+ 内置动漫二次元美女图片壁纸：随机美女、宠物图片、随机动漫图片、随机抱枕图、卡通图片、二次元图片、IP 图片
+ 开发杂类
+ QQ 昵称和头像接口
+ 长网址缩短与还原
+ 抖音去水印（作者 userId、抖音 id、昵称、头像、签名、视频资源 Id、视频信息、无水印视频等）
+ 实时热搜（来源百度）
+ 音频资源嗅探（p2p）
+ CSGO 账号信息查询
+ 雅思成绩（以官网为准）
+ ISBN 查询
+ 图片鉴黄
+ 百度逆向 Link
+ 待定...




## 安装

## docker

1. 拉取镜像
```
docker pull insoxin/api:latest
```
2. 运行容器
```
docker run -dit --name api -p 8080:80  --restart unless-stopped insoxin/api:latest

```

访问 `IP:8080`
