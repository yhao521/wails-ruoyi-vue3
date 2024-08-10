// import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

const reqs = import.meta.glob('./svg/*.svg');
// register globally

export function setSvgIcon(vue) {
    vue.component('svg-icon', SvgIcon)

    // const req = require.context('./svg', false, /\.svg$/)
    // const requireAll = (requireContext) => requireContext.keys().map(requireContext)
    // requireAll(req)
    for (const path in reqs) {
        reqs[path]().then((mod) => {
            // console.log(path, mod.default);
        })
    }
}