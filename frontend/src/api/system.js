import calc from '@/assets/system/calc.png'
import explorer from '@/assets/system/explorer.png'
import control from '@/assets/system/control.png'
import osk from '@/assets/system/osk.png'
import notepad from '@/assets/system/notepad.png'
import devmgmt from '@/assets/system/devmgmt.png'
import dxdiag from '@/assets/system/dxdiag.png'
import msconfig from '@/assets/system/msconfig.png'
import regedit from '@/assets/system/regedit.png'
import taskmgr from '@/assets/system/taskmgr.png'
import mspaint from '@/assets/system/mspaint.png'
import mstsc from '@/assets/system/mstsc.png'
import magnify from '@/assets/system/magnify.png'
import diskmgmt from '@/assets/system/diskmgmt.png'


export function getCMDList() {
  return [
    {
      cmd: 'calc', //命令
      param: '', //命令参数
      name: '计算器',
      icon: calc,
      desc: '计算器',
    },
    {
      cmd: 'explorer', //命令
      param: 'D:\\', //指定目录
      name: '打开目录',
      icon: explorer,
      desc: '以资源管理器方式，打开目录',
    },
    {
      cmd: 'control', //命令
      param: '',
      name: '控制面板',
      icon: control,
      desc: '控制面板',
    },
    {
      cmd: 'osk', //命令
      param: '',
      name: '屏幕键盘',
      icon: osk,
      desc: '屏幕键盘',
    },
    {
      cmd: 'notepad', //命令
      param: '',
      name: '记事本',
      icon: notepad,
      desc: '记事本',
    },
    {
      cmd: 'devmgmt.msc', //命令
      param: '',
      name: '设备管理',
      icon: devmgmt,
      desc: '设备管理',
    },
    {
      cmd: 'dxdiag', //命令
      param: '',
      name: 'DirectX',
      icon: dxdiag,
      desc: '检查DirectX信息',
    },
    {
      cmd: 'Msconfig', //命令
      param: '',
      name: '系统配置',
      icon: msconfig,
      desc: '系统配置',
    },
    {
      cmd: 'regedit', //命令
      param: '',
      name: '注册表',
      icon: regedit,
      desc: '注册表',
    },
    {
      cmd: 'taskmgr', //命令
      param: '',
      name: '任务管理',
      icon: taskmgr,
      desc: '任务管理',
    },
    {
      cmd: 'mspaint', //命令
      param: '',
      name: '画图',
      icon: mspaint,
      desc: '画图',
    },
    {
      cmd: 'mstsc', //命令
      param: '',
      name: '远程桌面',
      icon: mstsc,
      desc: '远程桌面',
    },
    {
      cmd: 'magnify', //命令
      param: '',
      name: '放大镜',
      icon: magnify,
      desc: '放大镜',
    },
    {
      cmd: 'diskmgmt.msc', //命令
      param: '',
      name: '磁盘管理',
      icon: diskmgmt,
      desc: '磁盘管理',
    },
  ]
}
