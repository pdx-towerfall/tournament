import page from 'page'
import events from 'events'

let emit = events.emit.bind(events, 'route')

page('/', () => emit('/'))
page('/schedule', () => emit('/schedule'))
page('/bracket', () => emit('/bracket'))
page('/awards', () => emit('/awards'))
