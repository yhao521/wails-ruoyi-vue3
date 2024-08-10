import wails from '@/assets/site/wails.jpg'
import gorm from '@/assets/site/gorm.svg'
import vue from '@/assets/site/vue.svg'
import element from '@/assets/site/element.jpg'
import gin from '@/assets/site/gin.png'
import npm from '@/assets/site/npm.png'
import iconfont from '@/assets/site/iconfont.jpg'
import ico from '@/assets/site/ico.png'
import waifu2 from '@/assets/site/waifu2.png'
import gitee from '@/assets/site/gitee.jpg'
import github from '@/assets/site/github.jpg'
import doubao from '@/assets/site/doubao.jpeg'
import wenxinyiyan from '@/assets/site/wenxinyiyan.png'
import yasuo360 from '@/assets/site/360yasuo.jpg'
import qq from '@/assets/site/qq.jpg'
import idea from '@/assets/site/idea.jpg'
import wechat from '@/assets/site/wechat.jpg'
import wps from '@/assets/site/wps.jpg'
import aliuyundrive from '@/assets/site/aliuyundrive.jpg'
import baidudrive from '@/assets/site/baidudrive.jpg'
import leidian from '@/assets/site/leidian.jpg'
import sougou from '@/assets/site/sougou.jpg'
import wangyi from '@/assets/site/wangyi.jpg'
import kugou from '@/assets/site/kugou.jpg'
import markman from '@/assets/site/markman.png'
import snipaste from '@/assets/site/snipaste.svg'

export function getSiteList() {
  return [
    {
      title: '开发者',
      list: [
        {
          icon: wails,
          title: 'Wails',
          remark: '使用 Go 构建漂亮的跨平台应用程序',
          url: 'https://wails.io/zh-Hans/',
        },
        {
          icon: gorm,
          title: 'GORM',
          remark: 'Golang的ORM库',
          url: 'https://gorm.io/zh_CN/',
        },
        {
          icon: vue,
          title: 'Vue',
          remark:
            '渐进式 JavaScript 框架易学易用，性能出色，适用场景丰富的 Web 前端框架。',
          url: 'https://cn.vuejs.org/',
        },
        {
          icon: element,
          title: 'Element UI',
          remark:
            '一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库',
          url: 'https://element.eleme.cn/',
        },
        {
          icon: element,
          title: 'Element Plus',
          remark:
            '一套为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库',
          url: 'https://element-plus.org/zh-CN/',
        },
        {
          icon: gin,
          title: 'Gin Web Framework',
          remark: 'Go语言最快的全功能Web框架',
          url: 'https://gin-gonic.com/zh-cn/',
        },
        {
          icon: npm,
          title: 'NPM',
          remark: '是一个NodeJS包管理和分发工具',
          url: 'https://www.npmjs.com/',
        },
        {
          icon: iconfont,
          title: '阿里巴巴矢量图标库',
          remark:
            '国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
          url: 'https://www.iconfont.cn/',
        },
        {
          icon: ico,
          title: '图片转ICO',
          remark: '在线把图片转为软件图标ico文件',
          url: 'https://www.bitbug.net/',
        },
        {
          icon: waifu2,
          title: '图片无损放大',
          remark: '在线把图片无损放大2倍',
          url: 'https://www.waifu2x.net/',
        },
        {
          icon: gitee,
          title: 'Gitee',
          remark: '基于 Git 的代码托管和研发协作平台',
          url: 'https://gitee.com/',
        },
        {
          icon: github,
          title: 'GitHub',
          remark: '基于 Git 的代码托管和研发协作平台',
          url: 'https://github.com/',
        },
        {
          icon: doubao,
          title: '豆包',
          remark: '字节首个AI对话式APP',
          url: 'https://www.doubao.com/',
        },
        {
          icon: wenxinyiyan,
          title: '文心一言',
          remark: '百度全新一代知识增强大语言模型',
          url: 'https://yiyan.baidu.com/',
        },
      ],
    },
    {
      title: '常用软件下载',
      list: [
        {
          icon: yasuo360,
          title: '360压缩',
          remark: '压缩解压一键处理，助力办公安全省时',
          url: 'https://yasuo.360.cn/',
        },
        {
          icon: qq,
          title: 'QQ',
          remark: '不仅是轻松聊天，更是兴趣社区的聚集地。',
          url: 'https://im.qq.com/',
        },
        {
          icon: idea,
          title: 'IDEA',
          remark: '我们热衷于构建我们的软件，并将为您带来同样愉悦的构建体验。',
          url: 'https://www.jetbrains.com/',
        },
        {
          icon: wechat,
          title: '微信',
          remark: '聊天,语音,朋友圈,发信息,发图片,发视频,视频聊天',
          url: 'https://weixin.qq.com/',
        },
        {
          icon: wps,
          title: 'WPS',
          remark: '让你高效解决办公问题',
          url: 'https://www.wps.cn/',
        },
        {
          icon: aliuyundrive,
          title: '阿里云盘',
          remark:
            '一款速度快、不打扰、够安全、易于分享的网盘，你可以在这里存储、管理和探索内容，尽情打造丰富的数字世界。',
          url: 'https://www.alipan.com/',
        },
        {
          icon: baidudrive,
          title: '百度网盘',
          remark:
            '为你电脑/手机中的文件提供云备份、预览、分享等服务，帮你更便捷安全地管理数据。',
          url: 'https://pan.baidu.com/',
        },
        {
          icon: leidian,
          title: '雷电模拟器',
          remark: '全新云模拟器，手机远程控制',
          url: 'https://www.ldmnq.com/',
        },
        {
          icon: sougou,
          title: '搜狗输入法',
          remark: '中文输入法',
          url: 'https://shurufa.sogou.com/',
        },
        {
          icon: wangyi,
          title: '网易云音乐',
          remark: '网易云音乐',
          url: 'https://music.163.com/',
        },
        {
          icon: kugou,
          title: '酷狗音乐',
          remark: '就是歌多',
          url: 'https://www.kugou.com/',
        },
        {
          icon: markman,
          title: 'MarkMan',
          remark: '高效的设计稿标注、测量工具',
          url: 'http://www.getmarkman.com/',
        },
        {
          icon: snipaste,
          title: 'Snipaste',
          remark: '一个简单但强大的截图工具，也可以让你将截图贴回到屏幕上！',
          url: 'https://zh.snipaste.com/',
        },
      ],
    },
  ]
}
