# Socket.IO Conway's Game of Life
An interacive [Conway's Game of Life] [Socket.IO] demo which allow multiple players interact with same world.
This is similar to the [chat demo][1] and [whiteboard demo][2] available on Socket IO.

Socket IO is used because WebSocket protocol is best suitable for real-time application
which requires low latency and bi-direction communication.


## Features
- Allow multiple players accessing the same world. Every player will be assigned with a random color.
- World update only happens when there is at least one player connected.
- When new cell is produced, it's color will be a [color mix][3]
	of all 3 cells around it.
- Tested to work on Chrome.


## Limitations
- Game status is only stored in memory and is not persistently stored in a file or database.
	As a result, game status will be lost upon web application restart.
- Scalability was not included in the design. However it is possible with [Node.js cluster][4]
	with sticky session and [Redis adapater][5] with Socket IO.


## Known issues
- When player add cells to the world, it is possible that those new cells disappeared
	for a short period of time because the whold world is updated before those new
	cells arrived to server for processing. A possible solution to this will be sending only
	changed cells from server to client, instead of sending all cell status in the whole
	world.


## System requirement
- Node.js 12.16.x


## Install dependency
For local development, run the following commands.
```sh
cd server
npm install
cd ..
cd web
npm install
cd ..
```

For production hosting, run the following commands.
```sh
cd server
npm ci --only=production
cd ..
```


## Build
For production hosting, we need to build the frontend. This can be done using the following commands.
```sh
cd web
npm ci
npm run build
rm -rf node_modules    # For Windows, run `rmdir /s /q node_modules` instead
cd ..
```

## Test
After installed dependency for local development, run the following command.
```sh
cd server
npm test
cd ..
```


## Run
For local development, first start the backend with the following commands:
```sh
cd server
npm run nodemon
```

Then in a separated terminal start the frontend with the following commands:
```sh
cd web
npm run serve
```

By default the backend listen to port 3000 and frontend development server listen to
port 8080. The frontend development server will proxy the socket IO traffic to fixed
port 3000. Therefore you can access this web application from your browser at http://localhost:8080.


To run in production mode, make sure the frontend has been built, then run the following commands.
```sh
cd server
npm start
```

This web application is ready for [Heroku] deployment by simply perform Git push to Heroku.


## Accepted environment variables
The following environment variables are supported by the backend server:
- `PORT`: The port that the backend server will listen to, default is `3000`.
- `NODE_ENV`: The node environment that the backend server will be running in. Possible
	values are `development` and `production`. Default is `undefined` which is equal
	to `development`.
- `LOG_LEVEL`: The log level of this web application. Default is `DEBUG`. Possible
	values are `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR` and `SILENT`.

The following environment variables are supported by the frontend development server:
- `PORT`: The port that the frontend development server will listen to, default is `8080`.
- `NODE_ENV`: The node environment for frontend development. This affect lint checking.
	Possible values are `development` and `production`. Default is `undefined` which is equal
	to `development`.


## TODO
Below are items which are currently missing and can be further enhanced.
- Features
	- World size configuration.
	- Adjustable world update interval.
	- World reset button.
- UX
	- Pause and resume of world update, so that player can add the cell pattern as they
		wanted.
	- Tooltips on both sidebar to give more informative explanation.
	- Add game information to the screen, for example current number of turn of the world.
	- An overlay color of the picked cell pattern from the toolbox can be shown on
		the grid when the mouse cursor is over the grid.
- Testing
	- Implement pending test cases in backend.
	- Implement additional test cases to cover more components in backend.
	- Implement test cases in frontend.
- Stability
	- Better error handling with try-catch to avoid a single request triggered a bug
		and crashing the whole server.
- Infrastructure
	- HTTPS support.
- Security
	- Validation on client-sent data.
- Optimizations
	- Set up common library which implement common game elements for use in both web browser
		client side and server side. This takes the advantage of using JavaScript for
		full stack development.
	- Implement caching marked by `TODO` in the source code in `server/game.js`.


## License
This demo is licensed under the [MIT License](LICENSE).


## Acknowledge
Source code `server/random-color.js` is written based on [random-color].

Favicon is taken from [Wikipedia][6] which is released to [public domain][7].



[1]: https://socket.io/demos/chat/
[2]: https://socket.io/demos/whiteboard/
[3]: https://github.com/Qix-/color/blob/a6fce8808b1845bfd38a6ccc5b9a369e010ada82/index.js#L366
[4]: https://socket.io/docs/using-multiple-nodes/#Using-Node-JS-Cluster
[5]: https://socket.io/docs/using-multiple-nodes/#Passing-events-between-nodes
[6]: https://commons.wikimedia.org/wiki/File:Game_of_life_fpento.svg
[7]: https://en.wikipedia.org/wiki/en:public_domain
[Conway's Game of Life]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[Heroku]: https://www.heroku.com/
[random-color]: https://www.npmjs.com/package/random-color
[Socket.IO]: https://socket.io/
