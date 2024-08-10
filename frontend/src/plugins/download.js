import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
// import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/ruoyi'
import { SaveFile, SaveFilePath, SelectPathDownload } from "wailsjs/go/baseAPI/App";

const baseURL = import.meta.env.VITE_APP_BASE_API
let downloadLoadingInstance;

export default {
  name(name, isDelete = true) {
    var url = baseURL + "/common/download?fileName=" + encodeURIComponent(name) + "&delete=" + isDelete
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURIComponent(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  resource(resource) {
    var url = baseURL + "/common/download/resource?resource=" + encodeURIComponent(resource);
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data])
        this.saveAs(blob, decodeURIComponent(res.headers['download-filename']))
      } else {
        this.printErrMsg(res.data);
      }
    })
  },
  zip(url, name) {
    var url = baseURL + url
    downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
    axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(async (res) => {
      const isLogin = await blobValidate(res.data);
      if (isLogin) {
        const blob = new Blob([res.data], { type: 'application/zip' })
        this.saveAs(blob, name)
      } else {
        this.printErrMsg(res.data);
      }
      downloadLoadingInstance.close();
    }).catch((r) => {
      console.error(r)
      Message.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close();
    })
  },
  saveAs(text, name, opts) {
    // saveAs(text, name, opts);
    // SaveFile(text, name, opts)

    new Promise((resolve, reject) => {
      SaveFile(text, name, opts).then((res) => {
        console.debug('saveAs', res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    })
  },
  saveAsFile(name, opts) {
    // return SaveFilePath(name, opts)

    return new Promise((resolve, reject) => {
      return SaveFilePath(name, opts).then((res) => {
        console.debug('saveAsFile', res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    })
  },
  // SelectPathDownload

  selectDownloadPath() {
    // return SaveFilePath(name, opts)

    return new Promise((resolve, reject) => {
      return SelectPathDownload().then((res) => {
        console.debug('SelectPathDownload', res)
        resolve(res)
      }).catch((err) => {
        reject(err)
      });
    })
  },
  async printErrMsg(data) {
    const resText = await data.text();
    const rspObj = JSON.parse(resText);
    const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
    ElMessage.error(errMsg);
  }
}

