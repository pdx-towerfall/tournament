// Save items to local storage
// Surface add, remove, update, and delete
import muid from 'muid'
import events from 'events'
import assign from 'object-assign'
import Store from '../lib/store.js'
import toArray from '../lib/toArray.js'
import toObject from '../lib/toObject.js'

let store = Store('towerfall-test')

function create () {
  store(state => {
    let players = toArray(state.players).sort((a, b) => a.rank - b.rank)
    state.bracket = state.bracket || {
      round1: [
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: players[0],
            2: players[7],
            3: players[11],
            4: players[15]
          }
        },
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: players[1],
            2: players[6],
            3: players[10],
            4: players[14]
          }
        },
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: players[2],
            2: players[5],
            3: players[9],
            4: players[13]
          }
        },
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: players[3],
            2: players[4],
            3: players[8],
            4: players[12]
          }
        }
      ],
      round2: [
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: bracket.round1[0].firstPlace,
            2: bracket.round1[0].secondPlace,
            3: bracket.round1[1].firstPlace,
            4: bracket.round1[1].firstPlace
          }
        },
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: bracket.round1[3].firstPlace,
            2: bracket.round1[3].secondPlace,
            3: bracket.round1[4].firstPlace,
            4: bracket.round1[4].firstPlace
          }
        },
      ],
      round3: [
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: bracket.round2[0].firstPlace,
            2: bracket.round2[0].secondPlace,
            3: bracket.round2[1].firstPlace,
            4: bracket.round2[1].firstPlace
          }
        }
      ],
      round4: [
        {
          firstPlace: false,
          secondPlace: false,
          players: {
            1: bracket.round3[0].firstPlace,
            2: bracket.round3[1].secondPlace
          }
        }
      ]
    }
    return state
  })
}

function update (changes) {
  store(state => {
    state.bracket = assign({}, state.bracket, changes)
    return state
  })
}

store.on('changed', state => {
  events.emit('render', state)
})

events.on('bracket:create', create)
events.on('bracket:update', update)
