# Towerfall Tournament

## Requirements

1. Interface should let you add and remove players from a pool.

2. Interface should have a round view that schedules open play. Should populate the schedule with players until they all play the same amount of games.

3. Interface should allow you to enter kills and a winner for each game. Should also show the current standings of skull count.

4. Navigating to `/awards` should display winner, and various awards.

## Implementation

### Models

- players
- schedule

### Controllers

- players
- schedule

### Views

- players
- leaderboard
- schedule
- awards

### Routes:

- `/` (add players)
- `/schedule` leaderboard + schedule
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

## Contributing

```
npm install
```

```
npm run dev
```

A development server is now running on [localhost:7777](http://localhost:7777).
