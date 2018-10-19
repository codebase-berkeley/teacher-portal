<<<<<<< HEAD
#!/usr/bin/env node

/**
 * Module dependencies.
 */

const debug = require('debug')('express:server');
const http = require('http');
const app = require('./app');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`App is listening on port ${port}`);
=======
const express = require('express')
const router = express.Router();
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

// Allow cross origin requests
app.use(cors());

router.get('/', function (req, res, next) {
  res.send({ 'key': 4 });
});

router.get('/lessons/:unitID', function (req, res, next) {
  res.send([
    { id: 1, name: 'One Weird Ass Class Name Here', color: "aqua" },
    { id: 2, name: 'Another Weird Ass Class Name Here', color: "aqua" },
    { id: 3, name: 'One Last Weird Ass Class Name Here', color: "aqua" },
    { id: 4, name: 'JUST KIDDING ANUTHA ONE YEET', color: "aqua" },
    { id: 5, name: 'ANUTHA ONE ANUTHA ONE ANUTHA ONE ANUTHA ONE', color: "aqua" }
  ]);
});

router.get('/teacherNotes/:lessonID', function (req, res, next) {
  res.send([
    { pdf: "/lesson1.pdf", notes: 'blah, blah' },
    { pdf: "/lesson2.pdf", notes: 'blah, blah' },
    { pdf: "/lesson3.pdf", notes: 'blah, blah' },
    { pdf: "/lesson4.pdf", notes: 'blah, blah' },
    { pdf: "/lesson5.pdf", notes: 'blah, blah' }
  ]);
});

router.get('/teacherNotes/:lessonID', function (req, res, next) {
  res.send(req.params.classID);
});

app.use('/api', router);

app.listen(port);

process.env.RUNKIT_ENDPOINT_URL
>>>>>>> paths added
