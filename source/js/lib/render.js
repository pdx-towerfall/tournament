import diferente from 'diferente'

function render (node, view, data) {
  if (data) {
    let tmpNode = node.cloneNode(false)
    tmpNode.innerHTML = view(data)
    diferente(node, tmpNode)
  }
}

export default render
