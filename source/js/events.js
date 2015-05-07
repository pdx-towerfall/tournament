/**
* Create an events bus
*/
import pubSub from './lib/pub-sub.js'

let events = {
  'route': 'Route application to specified route (route)',
  'bind': 'Rebind controller event listeners',
  'player:add': 'Add player (nickname, email)',
  'player:remove': 'Remove a player (id)',
  'schedule:create': 'Create a new schedule',
  'schedule:update': 'Update schedule ({changedProperties})',
  'bracket:create': 'Create a new bracket',
  'bracket:update': 'Update bracket ({changedProperties})',
  'render': 'Render state to DOM ({state})'
}

export default pubSub(events, false)
