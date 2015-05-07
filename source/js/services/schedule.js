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

  // seed matrix with a hash of player ids
  let matrix = [toArray(players).map(p => p.id)]

  // until we have enough games, wrap the hash for unique player matchups:
  // 1,2,3,4,5,6 => 2,3,4,5,6,1 => 3,4,5,6,1,2 ... n
  for (let i = 0; i < minGames; i++) {
    let newOrder = matrix[i].slice(0)
    newOrder.push(newOrder.shift())
    matrix.push(newOrder)
  }

  /**
  * in groups of 4, vertically select player ids
  * 1,2,3,4,5
  * 2,3,4,5,1  =>  [1,2,3,4], [2,3,4,5], [3,4,5,1], [4,5,1,2], [5,1,2,3]
  * 3,4,5,1,2
  * 4,5,1,2,3
  */
  for (let x = 0; x < matrix[0].length; x++) {
    let round = []
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
      round.push(game)
    }
    games.push(round)
  }

  // randomize order of games to minimize wait time
  games = mess(games).map((pair, i) => {
    let info = {
      round: i + 1,
      level: levels[i % levels.length]
    }
    let game1 = assign(pair[0], info, {screen: 'A'})
    let game2 = assign(pair[1], info, {screen: 'B'})
    return [game1, game2]
  })

  // return object of games
  let flattened = games.reduce((a, b) => a.concat(b))
  return toObject(flattened)
}

export default schedule
