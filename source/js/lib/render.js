import DiffDOM from 'diff-dom'

let dd = new DiffDOM()

function render (node, view, data) {
  if (data) {
    node.innerHTML = view(data)
    // let tmpNode = node.cloneNode(false)
    // tmpNode.innerHTML = view(data)
    // dd.apply(node, dd.diff(node, tmpNode))
  }
}

export default render
