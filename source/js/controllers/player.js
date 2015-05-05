import events from 'events'
import closest from 'dom-closest'
import $ from '$'

let nickname = $('.new-player-nickname')[0]
let email = $('.new-player-email')[0]

function add (e) {
  e.preventDefault()
  events.emit('player:add', {
    nickname: nickname.value.trim()
    email: email.value.trim().toLowerCase()
  })
  nickname.value = ''
  email.value = ''
  nickname.focus()
}

function destroy (e) {
  let id = closest(e.target, 'li').getAttribute('data-id')
  events.emit('player:remove', id)
}

let bind = () => {
  $('.new-todo').on('submit', add)
  $('.destroy').on('click', destroy)
}

bind()
events.on('bind', bind)
