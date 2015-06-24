import virtualize from 'vdom-virtualize'
import playersView from '../templates/players.dot'
import scheduleView from '../templates/schedule.dot'
import leaderboardView from '../templates/leaderboard.dot'
import awardsView from '../templates/awards.dot'
import toArray from '../lib/toArray.js'
import render from '../lib/render.js'
import assign from 'object-assign'
import events from 'events'
import $ from '$'

let playersNode = virtualize($('[data-view="players"]')[0])
let leaderboardNode = virtualize($('[data-view="leaderboard"]')[0])
let scheduleNode = virtualize($('[data-view="schedule"]')[0])
let awardsNode = virtualize($('[data-view="awards"]')[0])

let playersTree = virtualize(playersNode)
let leaderboardTree = virtualize(leaderboardNode)
let scheduleTree = virtualize(scheduleNode)
let awardsTree = virtualize(awardsNode)

function players (state) {
  return toArray(state.players).reverse()
}

function schedule (state) {
  if (!state.games) {
    return false
  }
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
  .sort((a, b) => b.skulls - a.skulls)
  return players
}

function awards (state) {
  let players = toArray(state.players)

  let mostWins = false
  let mostSkulls = false

  if (players.length) {
    mostWins = players.reduce((a, b) => a.wins > b.wins ? a : b)
    mostSkulls = players.reduce((a, b) => a.skulls > b.skulls ? a : b)
  }

  return {
    mostWins,
    mostSkulls
  }
}

let playersTree = virtualize(el)

events.on('render', (state) => {
  playersTree = render(playersNode, playersView(players(state)), playersTree)
  scheduleTree = render(scheduleNode, scheduleView(schedule(state)), scheduleTree)
  leaderboardTree = render(leaderboardNode, leaderboardView(leaderboard(state)), leaderboardTree)
  awardsTree = render(awardsNode, awardsView(awards(state)), awardsTree)
  events.emit('bind')
})
