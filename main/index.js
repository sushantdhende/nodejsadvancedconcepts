process.env.UV_THREADPOOL_SIZE = 1;
const crypto = require('crypto');
const cluster = require('cluster');

/** Im a child, Im going to act like a server and do nothing else */
const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
    const worker = new Worker(function () {
        this.onmessage = function () {
            let counter = 0;
            while (counter < 100000000) counter++;

            postMessage(counter);
        }
    });

    worker.onmessage = function (myCounter) {
        console.log('myCounter =>',myCounter);
    }

    worker.postMessage();
});

app.get('/fast', (req, res) => {
    res.send('This is fast!!');
});

app.listen(3000);