<template>
  <div class="container">
    <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo"><img :src="logo" alt="logo" /> Form Generator</div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <el-tabs v-model="leftTabActiveName" @tab-click="leftTabHandleClick">
          <el-tab-pane name="first">
            <span slot="label" style="margin-left: 20px"><el-icon><s-grid /></el-icon> 基础组件</span>
            <div class="components-list">
              <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
                <div class="components-title">
                  <svg-icon icon-class="component" />
                  {{ item.title }}
                </div>
                <draggable class="components-draggable" :list="item.list" :group="{
                  name: 'componentsGroup',
                  pull: 'clone',
                  put: false,
                }" :clone="cloneComponent" draggable=".components-item" :sort="false" @end="onEnd">
                  <div v-for="(element, index) in item.list" :key="index" class="components-item"
                    @click="addComponent(element)">
                    <div class="components-body">
                      <svg-icon :icon-class="element.__config__.tagIcon" />
                      {{ element.__config__.label }}
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><el-icon><more-outline /></el-icon> 复合组件</span>

            <div class="components-list">
              <div v-for="(item, listIndex) in left2Components" :key="listIndex">
                <div class="components-title">
                  <svg-icon icon-class="component" />
                  {{ item.title }}
                </div>
                <draggable class="components-draggable" :list="item.list" :group="{
                  name: 'componentsGroup',
                  pull: 'clone',
                  put: false,
                }" :clone="cloneComponent" draggable=".components-item" :sort="false" @end="onEnd">
                  <div v-for="(element, index) in item.list" :key="index" class="components-item"
                    @click="addComponent(element)">
                    <div class="components-body">
                      <svg-icon :icon-class="element.__config__.tagIcon" />
                      {{ element.__config__.label }}
                    </div>
                  </div>
                </draggable>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-scrollbar>
    </div>

    <div class="center-board">
      <div class="action-bar">
        <el-switch v-model="rightPanelSwitch" active-text="开启右侧" inactive-text="隐藏右侧" @change="rightPanelSwitchHandle">
        </el-switch>
        <el-button :icon="ElIconVideoPlay" type="text" @click="run">
          运行
        </el-button>
        <el-button :icon="ElIconView" type="text" @click="showJson">
          查看json
        </el-button>
        <el-dropdown>
          <span style="cursor: pointer; color: #409eff; margin-left: 5px">
            <el-icon>
              <more />
            </el-icon>
            更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <el-dropdown-menu slot="dropdown" style="font-size: 10px">
            <!-- icon="download" -->
            <el-dropdown-item>
              <el-button :icon="ElIconDownload" type="text" @click="download">
                导出vue文件
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="copy-btn-main" :icon="ElIconDocumentCopy" type="text" @click="copy">
                复制代码
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button class="delete-btn" :icon="ElIconDelete" type="text" @click="empty">
                清空
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-scrollbar class="center-scrollbar">
        <el-row class="center-board-row" :gutter="formConf.gutter">
          <el-form :size="formConf.size" :label-position="formConf.labelPosition" :disabled="formConf.disabled"
            :label-width="formConf.labelWidth + 'px'">
            <draggable class="drawing-board" :list="drawingList" :animation="340" group="componentsGroup">
              <draggable-item v-for="(item, index) in drawingList" :key="item.renderKey" :drawing-list="drawingList"
                :current-item="item" :index="index" :active-id="activeId" :form-conf="formConf"
                @activeItem="activeFormItem" @copyItem="drawingItemCopy" @deleteItem="drawingItemDelete" />
            </draggable>
            <div v-show="!drawingList.length" class="empty-info">
              从左侧拖入或点选组件进行表单设计
            </div>
          </el-form>
        </el-row>
      </el-scrollbar>
    </div>

    <right-panel :active-data="activeData" :form-conf="formConf" :show-field="!!drawingList.length"
      @tag-change="tagChange" @fetch-data="fetchData" v-show="rightPanelSwitch" />

    <form-drawer :visible.sync="drawerVisible" :form-data="formData" size="100%" :generate-conf="generateConf" />
    <json-drawer size="60%" :visible.sync="jsonDrawerVisible" :json-str="JSON.stringify(formData)"
      @refresh="refreshJson" />
    <code-type-dialog :visible.sync="dialogVisible" title="选择生成类型" :show-file-name="showFileName" @confirm="generate" />
    <input id="copyNode" type="hidden" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import beautifier from 'js-beautify'
import { debounce } from 'throttle-debounce'
// import { saveAs } from 'file-saver'
import ClipboardJS from 'clipboard'
import render from '@/utils/generator/render'
import RightPanel from './RightPanel'
import FormDrawer from './FormDrawer'
import JsonDrawer from './JsonDrawer'
import {
  inputComponents,
  selectComponents,
  layoutComponents,
  formConf,
  layout1Components,
} from '@/utils/generator/config'
import {
  exportDefault,
  beautifierConf,
  isNumberStr,
  titleCase,
  deepClone,
  isObjectObject,
} from '@/utils/index'
import {
  makeUpHtml,
  vueTemplate,
  vueScript,
  cssStyle,
} from '@/utils/generator/html'
import { makeUpJs } from '@/utils/generator/js'
import { makeUpCss } from '@/utils/generator/css'
import drawingDefault from '@/utils/generator/drawingDefault'
import logo from '@/assets/logo/logo.png'
import CodeTypeDialog from './CodeTypeDialog'
import DraggableItem from './DraggableItem'
import {
  getDrawingList,
  saveDrawingList,
  getIdGlobal,
  saveIdGlobal,
  getFormConf,
} from '@/utils/db'
import loadBeautifier from '@/utils/loadBeautifier'

// let beautifier
const emptyActiveData = { style: {}, autosize: {} }
let oldActiveId
let tempActiveData
const drawingListInDB = getDrawingList()
const formConfInDB = getFormConf()
const idGlobal = getIdGlobal()

export default {
  data() {
    return {
      rightPanelSwitch: true,
      leftTabActiveName: 'first',
      logo,
      idGlobal: 100,
      formConf,
      inputComponents,
      selectComponents,
      layoutComponents,
      labelWidth: 100,
      drawingList: drawingDefault,
      drawingData: {},
      activeId: drawingDefault[0].formId,
      drawerVisible: false,
      formData: {},
      dialogVisible: false,
      jsonDrawerVisible: false,
      generateConf: null,
      showFileName: false,
      activeData: drawingDefault[0],
      saveDrawingListDebounce: debounce(340, saveDrawingList),
      saveIdGlobalDebounce: debounce(340, saveIdGlobal),
      leftComponents: [
        {
          title: '输入型组件',
          list: inputComponents,
        },
        {
          title: '选择型组件',
          list: selectComponents,
        },
        {
          title: '布局型组件',
          list: layoutComponents,
        },
      ],
      left2Components: [
        {
          title: '复合型组件',
          list: layout1Components,
        },
      ],
    }
  },
  components: {
    draggable,
    render,
    FormDrawer,
    JsonDrawer,
    RightPanel,
    CodeTypeDialog,
    DraggableItem,
    ElIconSGrid,
    ElIconMoreOutline,
    ElIconMore,
    ElIconArrowDown,
  },
  created() {
    // 防止 firefox 下 拖拽 会新打卡一个选项卡
    document.body.ondrop = (event) => {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  computed: {},
  watch: {
    // eslint-disable-next-line func-names
    'activeData.__config__.label': function (val, oldVal) {
      if (
        this.activeData.placeholder === undefined ||
        !this.activeData.__config__.tag ||
        oldActiveId !== this.activeId
      ) {
        return
      }
      this.activeData.placeholder =
        this.activeData.placeholder.replace(oldVal, '') + val
    },
    activeId: {
      handler(val) {
        oldActiveId = val
      },
      immediate: true,
    },
    drawingList: {
      handler(val) {
        this.saveDrawingListDebounce(val)
        if (val.length === 0) this.idGlobal = 100
      },
      deep: true,
    },
    idGlobal: {
      handler(val) {
        this.saveIdGlobalDebounce(val)
      },
      immediate: true,
    },
  },
  mounted() {
    if (Array.isArray(drawingListInDB) && drawingListInDB.length > 0) {
      this.drawingList = drawingListInDB
    } else {
      this.drawingList = drawingDefault
    }
    this.activeFormItem(this.drawingList[0])
    if (formConfInDB) {
      this.formConf = formConfInDB
    }
    loadBeautifier((btf) => {
      this.beautifier = btf
    })
    const clipboard = new ClipboardJS('#copyNode', {
      text: (trigger) => {
        const codeStr = this.generateCode()
        this.$notify({
          title: '成功',
          message: '代码已复制到剪切板，可粘贴。',
          type: 'success',
        })
        return codeStr
      },
    })
    clipboard.on('error', (e) => {
      this.$message.error('代码复制失败')
    })
  },
  methods: {
    leftTabHandleClick(tab, event) {
      console.log(tab, event)
    },
    rightPanelSwitchHandle(val) {
      console.log('rightPanelSwitchHandle', val)
      if (!val) {
        document.getElementsByClassName('center-board')[0].style.cssText =
          'margin: 0 5px 0 260px;'
      } else {
        document.getElementsByClassName('center-board')[0].style.cssText =
          'margin: 0 350px 0 260px;'
      }
    },
    setObjectValueReduce(obj, strKeys, data) {
      const arr = strKeys.split('.')
      arr.reduce((pre, item, i) => {
        if (arr.length === i + 1) {
          pre[item] = data
        } else if (!isObjectObject(pre[item])) {
          pre[item] = {}
        }
        return pre[item]
      }, obj)
    },
    setRespData(component, resp) {
      const { dataPath, renderKey, dataConsumer } = component.__config__
      if (!dataPath || !dataConsumer) return
      const respData = dataPath
        .split('.')
        .reduce((pre, item) => pre[item], resp)

      // 将请求回来的数据，赋值到指定属性。
      // 以el-tabel为例，根据Element文档，应该将数据赋值给el-tabel的data属性，所以dataConsumer的值应为'data';
      // 此时赋值代码可写成 component[dataConsumer] = respData；
      // 但为支持更深层级的赋值（如：dataConsumer的值为'options.data'）,使用setObjectValueReduce
      this.setObjectValueReduce(component, dataConsumer, respData)
      const i = this.drawingList.findIndex(
        (item) => item.__config__.renderKey === renderKey
      )
      if (i > -1) this.$set(this.drawingList, i, component)
    },
    fetchData(component) {
      const { dataType, method, url } = component.__config__
      if (dataType === 'dynamic' && method && url) {
        this.setLoading(component, true)
        this.$axios({
          method,
          url,
        }).then((resp) => {
          this.setLoading(component, false)
          this.setRespData(component, resp.data)
        })
      }
    },
    setLoading(component, val) {
      const { directives } = component
      if (Array.isArray(directives)) {
        const t = directives.find((d) => d.name === 'loading')
        if (t) t.value = val
      }
    },
    activeFormItem(currentItem) {
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    onEnd(obj, a) {
      if (obj.from !== obj.to) {
        this.fetchData(tempActiveData)
        this.activeData = tempActiveData
        this.activeId = this.idGlobal
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item)
      this.fetchData(clone)
      this.drawingList.push(clone)
      this.activeFormItem(clone)
    },
    cloneComponent(origin) {
      const clone = deepClone(origin)
      const config = clone.__config__
      config.span = this.formConf.span // 生成代码时，会根据span做精简判断
      this.createIdAndKey(clone)
      clone.placeholder !== undefined && (clone.placeholder += config.label)
      tempActiveData = clone
      return tempActiveData
    },
    createIdAndKey(item) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map((childItem) =>
          this.createIdAndKey(childItem)
        )
      }
      return item
    },
    AssembleFormData() {
      console.debug('AssembleFormData-drawingList', this.drawingList)
      this.formData = {
        fields: deepClone(this.drawingList),
        // fields: JSON.parse(JSON.stringify(this.drawingList)),
        ...this.formConf,
      }
      console.debug('AssembleFormData-formData', this.formData)
    },
    generate(data) {
      const func = this[`exec${titleCase(this.operationType)}`]
      this.generateConf = data
      func && func(data)
    },
    execRun(data) {
      this.AssembleFormData()
      this.drawerVisible = true
    },
    execDownload(data) {
      const codeStr = this.generateCode()
      // const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      // saveAs(blob, data.fileName)

      // const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' })
      console.debug('execDownload-data:', data)
      this.$download.saveAs(codeStr, data.fileName, '*.vue')
    },
    execCopy(data) {
      document.getElementById('copyNode').click()
    },
    empty() {
      this.$confirm('确定要清空所有组件吗？', '提示', { type: 'warning' }).then(
        () => {
          this.drawingList = []
          // this.idGlobal = 100
        }
      )
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    },
    generateCode() {
      const { type, fileName } = this.generateConf
      this.AssembleFormData()
      console.debug('generateCode', this.formData)
      const script = vueScript(makeUpJs(this.formData, type, fileName))
      const html = vueTemplate(makeUpHtml(this.formData, type))
      const css = cssStyle(makeUpCss(this.formData))
      return beautifier.html(html + script + css, beautifierConf.html)
    },
    showJson() {
      this.AssembleFormData()
      this.jsonDrawerVisible = true
    },
    download() {
      this.dialogVisible = true
      this.showFileName = true
      this.operationType = 'download'
    },
    run() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'run'
    },
    copy() {
      this.dialogVisible = true
      this.showFileName = false
      this.operationType = 'copy'
    },
    tagChange(newTag) {
      newTag = this.cloneComponent(newTag)
      const config = newTag.__config__
      newTag.__vModel__ = this.activeData.__vModel__
      config.formId = this.activeId
      config.span = this.activeData.__config__.span
      this.activeData.__config__.tag = config.tag
      this.activeData.__config__.tagIcon = config.tagIcon
      this.activeData.__config__.document = config.document
      if (
        typeof this.activeData.__config__.defaultValue ===
        typeof config.defaultValue
      ) {
        config.defaultValue = this.activeData.__config__.defaultValue
      }
      Object.keys(newTag).forEach((key) => {
        if (this.activeData[key] !== undefined) {
          newTag[key] = this.activeData[key]
        }
      })
      this.activeData = newTag
      this.updateDrawingList(newTag, this.drawingList)
    },
    updateDrawingList(newTag, list) {
      const index = list.findIndex(
        (item) => item.__config__.formId === this.activeId
      )
      if (index > -1) {
        list.splice(index, 1, newTag)
      } else {
        list.forEach((item) => {
          if (Array.isArray(item.__config__.children))
            this.updateDrawingList(newTag, item.__config__.children)
        })
      }
    },
    refreshJson(data) {
      this.drawingList = deepClone(data.fields)
      delete data.fields
      this.formConf = data
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/home';
</style>
