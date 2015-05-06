import events from 'events'
import closest from 'dom-closest'
import $ from '$'

let nickname = $('.new-player-nickname')[0]
let email = $('.new-player-email')[0]

function add (e) {
  e.preventDefault()
  events.emit('player:add', {
    nickname: nickname.value.trim(),
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

function schedule (e) {
  e.preventDefault()
  events.emit('route', '/schedule')
  events.emit('schedule:create')
}

let bind = () => {
  $('.new-player').on('submit', add)
  $('.destroy').on('click', destroy)
  $('.js-create-schedule').on('click', schedule)
}

bind()
events.on('bind', bind)
