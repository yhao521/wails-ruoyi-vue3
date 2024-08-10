<template>
  <div class="full flex flex-column">
    <!-- <div class="flex-1 mt10 main" ref="main"></div> -->
    <textarea v-model="markdown"></textarea>
    <div v-html="markdownToHtml"></div>
  </div>
</template>

<script>
// import marked from 'marked'
// import * as marked from 'marked'
// var marked = import('marked');
// import { marked } from 'marked/lib/marked.esm.js';
// import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

export default {
  model: {
    prop: 'value',
    event: 'onchange',
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    config: [Object],
  },
  data() {
    return {
      markdown: '# Hello World',
    }
  },
  computed: {
    markdownToHtml() {
      // return marked(this.markdown);
    },
  },
  mounted() {
    this.init()
  },
  // watch: {
  //     value(val) {
  //         if (this.monacoEditor.getValue() !== val) {
  //             this.monacoEditor.setValue(val);
  //         }
  //     }
  // },
  methods: {
    init() {
      // marked.parse('# Marked in the browser\n\nRendered by **marked**.');
      // marked.setOptions({
      //     renderer: new marked.Renderer(),
      //     gfm: true,
      //     tables: true,
      //     breaks: false,
      //     pedantic: false,
      //     sanitize: true,
      //     smartLists: true,
      //     smartypants: false
      // });
      // console.log(marked('I am using __markdown__.'));
    },
  },
}
</script>

<style lang="scss" scoped>
.full {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.toolbar {
  position: absolute;
  right: 15px;
  top: 10px;
  color: #fff;
  z-index: 2;
}
</style>
