/**
* Polyfills
*/
import polyfill from 'array.from'

/**
* Import Models
*/
import bracketModel from './models/bracket.js'
import playersModel from './models/players.js'
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

/**
* Routing
*/
import routes from './routes.js'

/**
* Startup
*/
import events from './events.js'
import Store from './lib/store.js'

let store = Store('towerfall-test')
events.emit('render', store())



