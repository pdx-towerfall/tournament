import events from 'events'
import closest from 'dom-closest'
import $ from '$'

function setWinner (e) {
  let id = closest(e.target, '.js-game').getAttribute('data-id')
  let winner = closest(e.target, '.js-match-player').getAttribute('data-id')
  events.emit('schedule:update', {id, winner})
}

function setSkullCount (e) {
  let game = closest(e.target, '.js-game').getAttribute('data-id')
  let id = closest(e.target, '.js-match-player').getAttribute('data-id')
  let skulls = parseInt(e.target.value)
  events.emit('schedule:updateSkulls', game, {id, skulls})
  e.target.focus()
}

let bind = () => {
  $('.js-winner').on('click', setWinner)
  $('.js-skull-count').on('change', setSkullCount)
}

bind()
events.on('bind', bind)
