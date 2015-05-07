import events from 'events'
import closest from 'dom-closest'
import $ from '$'

function setWinner (e) {
  let id = closest(e.target, '.js-game').getAttribute('data-id')
  let winner = closest(e.target, '.js-match-player').getAttribute('data-id')
  events.emit('schedule:update', {id, winner})
}

let bind = () => {
  $('.js-winner').on('click', setWinner)
}

bind()
events.on('bind', bind)
