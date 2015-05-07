/**
* Polyfills
*/
import polyfill from 'array.from'

/**
* Import Models
*/
import playersModel from './models/players.js'
import bracketModel from './models/bracket.js'
import scheduleModel from './models/schedule.js'

/**
* Import Views
*/
import Views from './views/view.js'
import routesView from './views/routes.js'

/**
* Import Controllers
*/
import playerController from './controllers/player.js'
import scheduleController from './controllers/schedule.js'

/**
* Startup
*/
import events from './events.js'
import Store from './lib/store.js'

let store = Store('towerfall-test')
events.emit('render', store())



