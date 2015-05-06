import muid from 'muid'
import mess from 'mess'
import assign from 'object-assign'
import toArray from '../lib/toArray.js'
import toObject from '../lib/toObject.js'

let levels = [
  'Sacred Ground',
  'Twilight Spire',
  'Backfire',
  'Flight',
  'Mirage',
  'Thornwood',
  'Frostfang Keep',
  `King's Court`,
  'Sunken City',
  'Moonstone',
  'Towerforge',
  'Ascension'
]

function playersInGame(players, game) {
  return players.some(p1 => game.players.some(p2 => p1.id === p2.id))
}

/**
* Create a schedule where every player plays the same amount of games
* @param {Object}  players Pool of players to choose from
* @param {Object}  options Options (screens, minGames)
* @return {Object} games   Object of games with players assigned
*/
function schedule (players, options = {}) {
  let screens = options.screens || ['A', 'B']
  let minGames = Math.ceil((options.minGames || 8) / 4) * 4

  let games = []
  let matrix = [toArray(players).map(p => p.id)]

  for (let i = 0; i < minGames; i++) {
    let newOrder = matrix[i].slice(0)
    newOrder.push(newOrder.shift())
    matrix.push(newOrder)
  }

  for (let x = 0; x < matrix[0].length; x++) {
    let groups = matrix.length / 4 - 1
    for (let y = 0; y < groups; y++) {
      let row = y * 4
      let combination = [
        matrix[row + 0][x],
        matrix[row + 1][x],
        matrix[row + 2][x],
        matrix[row + 3][x]
      ]
      let game = {
        id: muid(12),
        completed: false,
        winner: false,
        players: combination.map(id => {
          return {id, skulls: 0}
        })
      }
      games.push(game)
    }
  }

  games = mess(games)

  for (let i = 1, j = 0; i < games.length; i += 2, j += 1) {
    let game = games[i]
    let prev = games[i - 1]
    let roundInfo = {
      round: j + 1,
      level: levels[j % levels.length]
    }
    assign(prev, roundInfo, {screen: 'A'})

    if (playersInGame(game.players, prev)) {
      games.push(games.splice(i, 1)[0])
      if (i < games.length - 1) {
        i = i - 2
        j = j - 1
      }
    } else {
      assign(game, roundInfo, {screen: 'B'})
    }
  }

  console.log(games)
  return toObject(games)
}

export default schedule
