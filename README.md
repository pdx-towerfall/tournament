# Towerfall Tournament

## Requirements

1. Interface should let you add and remove players from a pool.

2. Interface should have a round view that schedules open play. If there is no schedule data, routing to `/schedule` should populate the schedule with players until they all play the same amount of games.

3. Interface should allow you to enter kills and a winner for each game. Should also show the current standings of skull count.

4. Interface should allow you to create a bracket with seeds.
Navigating to `/bracket` if there is no bracket should generate a bracket based on the standings. Should let you choose the winner from each game.

5. Navigating to `/awards` should display winner, and various awards.

## Implementation

### Models

- players
- schedule
- bracket

### Controllers

- players
- schedule
- bracket

### Views

- players
- leaderboard
- schedule
- bracket
- awards

### Routes:

- `/` (add players)
- `/schedule` leaderboard + schedule
- `/bracket` final bracket
- `/awards` results, awards

### State

Data structures for different models.

Players:

```js
players: {
  'idOfPlayer': {
    email: 'email address',
    gravatar:  'url for gravatar image',
    id:  'idOfPlayer',
    skulls:  0,
    wins:  0
  },
  ...
}
```

Games/Schedule:

```js
games: {
  idOfGame: {
    id: 'idOfGame',
    screen: 'A',
    winner: 'idOfPlayer',
    level: 'FrostFang'
    players: [
      {
        id: 'idOfPlayer',
        skulls: 0
      }
    ]
  },
  ...
}
```

```js
bracket: {
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
    ...
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
    ...
  ],
  ...
}
```

## Contributing

```
npm install
```

```
npm run dev
```

A development server is now running on [localhost:7777](http://localhost:7777).
