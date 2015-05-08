// Save items to local storage
// Surface add, remove, update, and delete
import events from 'events'
import assign from 'object-assign'
import Store from '../lib/store.js'
import toArray from '../lib/toArray.js'
import toObject from '../lib/toObject.js'
import schedule from '../services/schedule.js'

let store = Store('towerfall-test')

// update wins and skulls of all players
function calculatePlayerTotals (statePlayers, stateGames) {
  let games = toArray(stateGames)
  let players = toArray(statePlayers).map(p => {
    return assign(p, {wins: 0, skulls: 0})
  })
  games.forEach(game => {
    if (game.winner) {
      statePlayers[game.winner].wins += 1
    }
    game.players.forEach(player => {
      if (statePlayers[player.id]) {
        statePlayers[player.id].skulls += player.skulls
      }
    })
  })
  statePlayers = toObject(players)
}

function create () {
  store(state => {
    let players = toArray(state.players).map(p => {
      return assign(p, {wins: 0, skulls: 0})
    })
    state.players = toObject(players)
    state.games = schedule(state.players)
    return state
  })
}

function update (game) {
  store(state => {
    assign(state.games[game.id], game)
    calculatePlayerTotals(state.players, state.games)
    return state
  })
}


function updateSkulls (game, data) {
  console.log(data)
  store(state => {
    state.games[game].players.forEach((p, i) => {
      if (p.id === data.id) {
        state.games[game].players[i] = data
      }
    })
    calculatePlayerTotals(state.players, state.games)
    console.log(state.games[game])
    return state
  })
}

store.on('changed', state => {
  events.emit('render', state)
})

events.on('schedule:create', create)
events.on('schedule:update', update)
events.on('schedule:updateSkulls', updateSkulls)
