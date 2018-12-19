let tool = {
  formatOptions: {
    'indent_size': '4',
    'indent_char': ' ',
    'max_preserve_newlines': '5',
    'preserve_newlines': true,
    'keep_array_indentation': false,
    'break_chained_methods': false,
    'indent_scripts': 'normal',
    'brace_style': 'collapse',
    'space_before_conditional': true,
    'unescape_strings': false,
    'jslint_happy': false,
    'end_with_newline': false,
    'wrap_line_length': '0',
    'indent_inner_html': false,
    'comma_first': false,
    'e4x': false
  },
  compareObj (obj1, obj2) {
    if (tool.length(obj1) !== tool.length(obj2)) {
      return false
    } else {
      for (let i in obj1) {
        if (obj1[i] !== obj2[i]) {
          return false
        }
      }
      return true
    }
  },
  length (obj) {
    var t = typeof obj
    if (t === 'string') {
      return obj.length
    } else if (t === 'object') {
      let n = 0
      for (let i in obj) {
        n++
      }
      return n
      // return Object.getOwnPropertyNames(obj).length
    }
    return false
  },
  formatJs (code) {
    var beautify = require('js-beautify').js
    // return beautify(code, { indent_size: 2, space_in_empty_paren: true })
    return beautify(code, tool.formatOptions)
  }
}

export default tool
