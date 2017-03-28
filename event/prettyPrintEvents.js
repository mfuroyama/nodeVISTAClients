#!/usr/bin/env node

'use strict';

/**
 * A node.js client that prints events issued by nodeVISTA's web socket interface
 */

const WebSocket = require('ws');
const _ = require('lodash');

const host = '10.2.2.100';
const port = 9020;

function initWebSocket(socketRoute, onMessageCallback) {
    // Open an event web socket
    var eventsSocket = new WebSocket("ws://" + host + ":" + port + '/' + socketRoute);

    eventsSocket.onopen = function () {
        // Web Socket is connected, send data using send()
        console.log("WebSocket: %s Event Handler is connected...", socketRoute);
    };

    eventsSocket.onmessage = _.bind(function (eventMsg) {
        onMessageCallback(socketRoute, eventMsg);
    }, this);

    eventsSocket.onclose = function () {
        // websocket is closed.
        console.log("WebSocket: %s Event Handler connection is closed...", socketRoute);
    };

    return eventsSocket;
}

/*
 * TODO: pretty this up a lot more
 */
function prettyPrintEvent(socketRoute, eventMsg) {
    console.log("\n", socketRoute, eventMsg.data, "\n\n");
}

/*
 * Can listen for either or both of MVDM or RPC events
 */
console.log("=== Pretty Print Events ===", "\n\n");
initWebSocket('mvdmEvents', prettyPrintEvent);
initWebSocket('rpcEvents', prettyPrintEvent);
