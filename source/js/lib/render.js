import virtualize from 'vdom-virtualize'
import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'

/**
* Render anything that has changed to a DOM Node
* @param  {Element} node Root DOM Node to be rendered to
* @param  {String}  html String representing desired html state
* @param  {Object}  tree Current virtual DOM tree
* @return {Object}       Updated virtual DOM tree
*/
function render (node, html, tree) {
  let tmp = node.cloneNode(false)
  tmp.innerHTML = html
  let newTree = virtualize(tmp)
  let patches = diff(tree, newTree)
  patch(node, patches)
  return newTree
}

export default render

