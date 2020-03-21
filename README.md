# Socket.IO Conway's Game of Life
A [Socket.IO](https://socket.io/) demo implementing [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

A workable demo is hosted on https://socketio-gol.herokuapp.com/.


## Features
- Every player will be assigned with a random color.
- World update only happens when there is at least one player connected.
- When new cell is produced, it's color will be a [color mix](https://github.com/Qix-/color/blob/a6fce8808b1845bfd38a6ccc5b9a369e010ada82/index.js#L366)
	of all 3 cells around it.


## Prerequisite
- Node.js 12.16.x


## Install
For local development, run the following command.
```
npm install
```

For production hosting, run the following command.
```
npm install --only=production
```


## Run
For local development, run the following command. By default this web application will
listen to port 3000 so that you can access the application from your browser at http://localhost:3000.
```
npm run nodemon
```

To run in production mode, run the following command.
```
npm start
```


## Accepted environment variables
- `PORT`: The port that this web application will listen to, default is `3000`.
- `NODE_ENV`: The node environment that this web application will be running in. Possible
	values are `development` and `production`. Default is `undefined` which is equal
	to `development`.


## Known issues
- When player add cells to the world, it is possible that those new cells disappeared
	for a short period of time because the world is updated before those new cells arrived to server.


## TODO
Below are items which are currently missing and can be further enhanced.
- Features
	- World size configuration
	- Adjustable world update interval
	- World reset button
- UX
	- Pause and resume of world update, so that player can add the cell pattern as they
		wanted.
	- Add game information to the screen, for example player color, number of connected players,
		current number of turn of the world
- Testing
	- Implement pending test cases
- Infrastructure
	- HTTPS support
- Security
	- Validation on client-sent data
- Optimizations
	- Webpack browser side script


## License
This demo is licensed under the [MIT License](LICENSE).


## Acknowledge
Source code `server/random-color.js` is written based on [random-color](https://www.npmjs.com/package/random-color).

Favicon are taken from [Wikipedia](https://commons.wikimedia.org/wiki/File:Game_of_life_fpento.svg).
