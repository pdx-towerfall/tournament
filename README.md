# Towerfall Tournament

## Requirements

1. Interface should let you add and remove players from a pool. Players have:
  - `email` (used for gravatar and stuff)
  - `id` (randomly generated id)
  - `skulls` (starts at 0)
  - `wins` (starts at 0)
  - `played` (starts at 0)

2. Interface should have a round view that schedules open play. If there is no schedule data, routing to `/schedule` should populate the schedule with players until they all play the same amount of games.

3. Interface should allow you to enter kills and a winner for each game. Should also show the current standings of skull count.

4. Interface should allow you to create a bracket with seeds.
Navigating to `/bracket` if there is no bracket should generate a bracket based on the standings. Should let you choose the winner from each game.

5. Navigating to `/awards` should display winner, and various awards.

## Implementation

Models:
  - players
  - schedule
  - bracket

Controllers:
  - players
  - schedule
  - bracket

Views:
  - players
  - leaderboard
  - schedule
  - bracket
  - awards

Routes:
  - `/` (add players)
  - `/schedule` leaderboard + schedule
  - `/bracket` final bracket
  - `/awards` results, awards

## Contributing

```
npm install
```

```
npm run dev
```

A development server is now running on [localhost:7777](localhost:7777).
