import playersView from '../templates/players.dot'
import scheduleView from '../templates/schedule.dot'
import leaderboardView from '../templates/leaderboard.dot'
import awardsView from '../templates/awards.dot'
import toArray from '../lib/toArray.js'
import render from '../lib/render.js'
import assign from 'object-assign'
import events from 'events'
import $ from '$'

let playersNode = $('.players-list')[0]
let leaderboardNode = $('.leaderboard-list')[0]
let scheduleNode = $('.schedule')[0]
let awardsNode = $('.awards')[0]

function players (state) {
  return toArray(state.players).reverse()
}

function schedule (state) {
  let games = toArray(state.games)
  .sort((a, b) => a.round - b.round)
  .map(g => {
    g.players = g.players.map(p => {
      return {
        id: p.id,
        winner: (p.id === g.winner),
        gravatar: state.players[p.id].gravatar,
        nickname: state.players[p.id].nickname,
        skulls: p.skulls
      }
    })
    return g
  })
  return {
    A: games.filter(g => g.screen === 'A'),
    B: games.filter(g => g.screen === 'B')
  }
}

function leaderboard (state) {
  let players = toArray(state.players)
  .sort((a, b) => a.skulls - b.skulls)
  .reverse()
  return players
}

function awards (state) {
  let players = toArray(state.players)
  let mostWins = players.reduce((a, b) => a.wins > b.wins ? a : b)
  let mostSkulls = players.reduce((a, b) => a.skulls > b.skulls ? a : b)
  let awards = {
    winner: {}, //state.bracket.winner,
    mostWins: mostWins || {},
    mostSkulls: mostSkulls || {}
  }
  return awards
}

events.on('render', (state) => {
  render(playersNode, playersView, players(state))
  render(scheduleNode, scheduleView, schedule(state))
  render(leaderboardNode, leaderboardView, leaderboard(state))
  render(awardsNode, awardsView, awards(state))
  events.emit('bind')
})
