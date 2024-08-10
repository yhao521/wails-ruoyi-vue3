import hasRole from './permission/hasRole'
import hasPermi from './permission/hasPermi'
import dialogDrag from './dialog/drag'
import dialogDragWidth from './dialog/dragWidth'
import dialogDragHeight from './dialog/dragHeight'
import clipboard from './module/clipboard'
import copyText from './common/copyText'

export default function directive(app) {
  app.directive('hasRole', hasRole)
  app.directive('hasPermi', hasPermi)
  app.directive('copyText', copyText)
  app.directive('clipboard', clipboard)
  app.directive('dialogDrag', dialogDrag)
  app.directive('dialogDragWidth', dialogDragWidth)
  app.directive('dialogDragHeight', dialogDragHeight)
}
// const install = function (Vue) {
//   Vue.directive('hasRole', hasRole)
//   Vue.directive('hasPermi', hasPermi)
//   Vue.directive('clipboard', clipboard)
//   Vue.directive('dialogDrag', dialogDrag)
//   Vue.directive('dialogDragWidth', dialogDragWidth)
//   Vue.directive('dialogDragHeight', dialogDragHeight)
// }

// if (window.Vue) {
//   window['hasRole'] = hasRole
//   window['hasPermi'] = hasPermi
//   Vue.use(install) // eslint-disable-line
// }

// export default install
