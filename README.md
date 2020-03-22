# Socket.IO Conway's Game of Life
An interacive [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
[Socket.IO](https://socket.io/) demo which allow multiple players interact with same world.
This is similar to the [chat demo](https://socket.io/demos/chat/) and
[whiteboard demo](https://socket.io/demos/whiteboard/) available on Socket IO.

Socket IO is used because WebSocket protocol is best suitable for real-time application
which requires low latency and bi-direction communication.

A workable demo is hosted on https://socketio-gol.herokuapp.com/.


## Features
- Allow multiple players accessing the same world. Every player will be assigned with a random color.
- World update only happens when there is at least one player connected.
- When new cell is produced, it's color will be a [color mix](https://github.com/Qix-/color/blob/a6fce8808b1845bfd38a6ccc5b9a369e010ada82/index.js#L366)
	of all 3 cells around it.


## Limitations
- Game status is only stored in memory and is not persistently stored in a file or database.
	As a result, game status will be lost upon web application restart.


## Known issues
- When player add cells to the world, it is possible that those new cells disappeared
	for a short period of time because the whold world is updated before those new
	cells arrived to server for processing. A possible solution to this will be sending only
	changed cells from server to client, instead of sending all cell status in the whole
	world.


## Prerequisite
- Node.js 12.16.x


## Install dependency
For local development, run the following command.
```
npm install
```

For production hosting, run the following command.
```
npm install --only=production
```


## Test
After installed dependency for local development, run the following command.
```
npm test
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

This web application is ready for [Heroku](https://www.heroku.com/) deployment by simply perform Git push to Heroku.


## Accepted environment variables
- `PORT`: The port that this web application will listen to, default is `3000`.
- `NODE_ENV`: The node environment that this web application will be running in. Possible
	values are `development` and `production`. Default is `undefined` which is equal
	to `development`.
- `LOG_LEVEL`: The log level of this web application. Default is `DEBUG`. Possible
	values are `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` and `SILENT`.


## TODO
Below are items which are currently missing and can be further enhanced.
- Features
	- World size configuration
	- Adjustable world update interval
	- World reset button
- UX
	- Pause and resume of world update, so that player can add the cell pattern as they
		wanted.
	- Tooltips on both sidebar to give more informative explanation.
	- Add game information to the screen, for example current number of turn of the world.
- Testing
	- Implement pending test cases
- Infrastructure
	- HTTPS support
- Security
	- Validation on client-sent data
- Optimizations
	- Webpack browser side script to allow use of new ECMAScript features on older browsers,
		and allow minimizing the file size and reduce network usage.
	- Set up common library which implement common game elements for use in both web browser
		client side and server side. This takes the advantage of using JavaScript for
		full stack development.
	- Implement caching marked by `TODO` in the source code in `server/game.js`.


## License
This demo is licensed under the [MIT License](LICENSE).


## Acknowledge
Source code `server/random-color.js` is written based on [random-color](https://www.npmjs.com/package/random-color).

Favicon is taken from [Wikipedia](https://commons.wikimedia.org/wiki/File:Game_of_life_fpento.svg)
which is released to [public domain](https://en.wikipedia.org/wiki/en:public_domain).
