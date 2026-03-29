import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '姬长信API For Docker官方文档',
  description: '姬长信API 一个基于多种编程语言并运行在Docker上开源免费不限制提供生活常用、出行服务、开发工具、金融服务、通讯服务和公益大数据的平台。',
  ignoreDeadLinks: true,
  markdown: {
    html: false
  },
  themeConfig: {
    nav: [
      {
        text: 'Translations',
        items: [
          { text: '🇨🇳 中文', link: '/' },
          { text: '🇬🇧 English', link: '/' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      { text: 'GY.公益中国', link: '/公益中国' },
      { text: '0. 壁纸模块', link: '/壁纸模块' },
      { text: '1. 新闻模块', link: '/新闻模块' },
      { text: '2. 视频模块', link: '/视频模块' },
      { text: '3. 笑话段子轻松一刻', link: '/笑话段子轻松一刻' },
      { text: '4. 图片相册接口', link: '/图片相册接口' },
      { text: '5. 天气预报', link: '/天气预报' },
      { text: '6. Web 前端开发资讯日报', link: '/前端开发资讯日报' },
      { text: '7. Web 知乎日报数据', link: '/知乎日报数据' },
      { text: '8. 豆瓣热播电影', link: '/豆瓣热播电影' },
      { text: '9. 招聘信息', link: '/招聘信息' },
      { text: '10. 开发杂类', link: '/开发杂类' },
      { text: '11. 电子商务', link: '/电子商务' },
      { text: '12. 人工智能', link: '/人工智能' },
      { text: '13. 生活服务', link: '/生活服务' },
      { text: '14. 实名鉴权', link: '/实名鉴权' },
      { text: '15. 网络信息', link: '/网络信息' },
      { text: '16. 新闻资讯', link: '/新闻资讯' },
      { text: '17. 知识问答', link: '/知识问答' }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/insoxin/API' }]
  },
  head: [
    [
      'script',
      {
        type: 'text/javascript',
        charset: 'UTF-8',
        src: 'https://fastly.jsdelivr.net/gh/insoxin/API@master/js/v1.js',
        'exte-id': '548',
        'data-size': '36x140',
        'data-color': '#FF7119',
        'data-show': '1'
      }
    ],
    [
      'script',
      {},
      "var _hmt = _hmt || [];(function(){var hm=document.createElement('script');hm.src='https://hm.baidu.com/hm.js?fda02e31e77cd366043a929e3043c19f';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(hm,s);})();"
    ]
  ]
})
