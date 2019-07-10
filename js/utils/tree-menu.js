function TreeMenu(options, map) {
  this.arrayTree = options || []
  this.groups = {}
  this.map = map || { value: 'id', label: 'name', parent: 'parentId' }
}

TreeMenu.prototype = {
  constructor: TreeMenu,

  init: function(pid) {
    this.initGroups()
    return this.initDom(this.groups[pid])
  },

  initGroups: function() {
    for (var i = 0, len = this.arrayTree.length; i < len; i++) {
      var el = this.arrayTree[i]
      var p = el[this.map.parent]
      var groupItems = this.groups[p] || []
      groupItems.push(el)
      this.groups[p] = groupItems
    }
  },

  initDom: function(groupItems) {
    if (!groupItems) return ''
    var map = this.map
    var html = '\n<ul >\n'
    for (var i = 0, len = groupItems.length; i < len; i++) {
      html += '<li><a href="#">' + groupItems[i][map.label] + '</a>'
      html += this.initDom(this.groups[groupItems[i][map.value]])
      html += '</li>\n'
    }
    html += '</ul>\n'
    return html
  }
}

export default TreeMenu
