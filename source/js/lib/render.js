var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var VNode = require('virtual-dom/vnode/vnode')
var VText = require('virtual-dom/vnode/vtext')

var convertHTML = require('html-to-vdom')({
    VNode: VNode,
    VText: VText
})

function render (node, view, data) {
  if (data) {
    var tmpNode = node.cloneNode(false)
    tmpNode.innerHTML = view(data)
    var tree = convertHTML(node.outerHTML)
    var newTree = convertHTML(tmpNode.outerHTML)
    var patches = diff(tree, newTree)
    node = patch(node, patches)
  }
}

export default render
