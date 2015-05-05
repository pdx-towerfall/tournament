import events from 'events'
import $ from '$'

events.on('route', route => {
  $('.fullscreen').removeClass('is-active')
  $(`.fullscreen[data-url="${route}"`).addClass('is-active')
})
