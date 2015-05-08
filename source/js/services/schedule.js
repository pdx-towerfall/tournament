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
  let minGames = options.minGames || 8
  let numberOfRounds = Math.ceil(toArray(players).length / (screens.length * 4) * minGames)
  let rounds = []
  let bag = toArray(players).map(p => {
    return {
      id: p.id,
      games: 0
    }
  })

  for (let i = 0; i < numberOfRounds; i++) {
    bag = mess(bag)
    bag = mess(bag) // shuffle twice, stupid Fisher–Yates shuffle...

    let range = bag.map(p => p.games)
    let min = Math.min.apply(Math, range)
    let max = Math.max.apply(Math, range)

    let eligible = bag.filter(p => p.games < minGames)
    if (max - min > 1) {
      eligible = eligible.sort((a,b) => a.games - b.games)
    }
    let round = [[],[]]
    let roundPlayers = eligible.slice(0,8)
    for (let j = 0; j < 8; j++) {
      let player = roundPlayers.shift()
      bag.forEach(p => {
        if (p.id === player.id) {
          p.games++
        }
      })
      round[j % 2].push(player.id)
    }
    rounds.push(round)
  }

  let games = rounds.map((round, i) => {
    return round.map((game, j) => {
      let gamePlayers = []
      for (let k = 0; k < 4; k++) {
        gamePlayers.push({
          id: game[k] || 'dummy',
          skulls: 0
        })
      }
      return {
        level: levels[i % levels.length],
        round: i + 1,
        screen: screens[j],
        id: muid(12),
        completed: false,
        winner: false,
        players: gamePlayers
      }
    })
  })

  // return object of games
  let flattened = games.reduce((a, b) => a.concat(b))
  return toObject(flattened)
}

export default schedule
