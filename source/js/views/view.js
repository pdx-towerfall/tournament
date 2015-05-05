import playersView from '../templates/players.dot'
import scheduleView from '../templates/schedule.dot'
import leaderboardView from '../templates/leaderboard.dot'
import bracketView from '../templates/bracket.dot'
import awardsView from '../templates/awards.dot'
import toArray from '../lib/toArray.js'
import render from '../lib/render.js'
import events from 'events'
import $ from '$'

let playersNode = $('.players-list')[0]
let leaderboardNode = $('.leaderboard-list')[0]
let scheduleNode = $('.schedule')[0]
let bracketNode = $('.bracket')[0]
let awardsNode = $('.awards')[0]

function players (state) {
  return toArray(state.players)
}

function schedule (state) {
  return state.schedule
}

function leaderboard (state) {
  let players = toArray(state.players)
  .sort((a, b) => a.skulls - b.skulls)
  .slice(0, 10)
  return players
}

function bracket (state) {
  return state.bracket
}

function awards (state) {
  let players = toArray(state.players)
  let awards = {
    winner: {}, //state.bracket.winner,
    mostWins: players.reduce((a, b) => a.wins > b.wins ? a : b),
    mostSkulls: players.reduce((a, b) => a.skulls > b.skulls ? a : b)
  }
  return awards
}

events.on('render', (state) => {
  render(playersNode, playersView, players(state))
  render(scheduleNode, scheduleView, schedule(state))
  render(leaderboardNode, leaderboardView, leaderboard(state))
  render(bracketNode, bracketView, bracket(state))
  render(awardsNode, awardsView, awards(state))
  events.emit('bind')
})
