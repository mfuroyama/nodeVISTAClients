'use strict';

var net = require('net');
var CONFIG = require('./cfg/testconfig.js');

var Promise = require('promise');

var NUL = '\u0000';
var SOH = '\u0001';
var EOT = '\u0004';
var ENQ = '\u0005';

function Client(port, host) {
    if (!(this instanceof Client)) {
        return new Client(port, host);
    }

    this.client = new net.Socket();
    this.chunk = '';
    var self = this;
    this.client.on('error', function(error) {
        console.log('ERROR in client', error);
        self.client.end();
    });

    if (port !== undefined) {
        this.serverPort = port;
    } else {
        this.serverPort = CONFIG.rpcServer.port;
    }
    if (host !== undefined) {
        this.serverHost = host;
    } else {
        this.serverHost = CONFIG.rpcServer.host;
    }

    // this.sendRpc = this.sendRpc.bind(this);
}


/**
 * Passes the rpc to the socket for the specified client. sets up handlers for the promise.
 * Returns the promise
 *
 * @param client net.Socket
 * @param rpc rpcString
 * @returns promise {*|exports|module.exports}
 */
Client.prototype = {
    constructor: Client,

    sendRpc: function (rpc) {
        var self = this;
        self.chunk = '';

        return new Promise(function (fulfill, reject) {

            function errorFunction(error) {
                console.log('error....');
                reject(error);
            }

            function dataFunction(data) {
                // console.log('data', data);
                // clean up the 'data' and 'error' listeners for the next step through
                self.client.removeListener('data', dataFunction);
                self.client.removeListener('error', errorFunction);
                // console.log('fullfill...');
                fulfill(receiveData(self.chunk, data));
            }
            self.client.on('data', dataFunction);
            self.client.on('error', errorFunction);

            var rpcBuffer = new Buffer(rpc, 'binary');
            self.client.write(rpcBuffer);
        });
    },

    startClient: function() {
        this.client.connect(this.serverPort, this.serverHost);
    },

    setClientTest: function(testFunction) {
        this.client.on('connect', testFunction);
    },

    closeClient: function() {
        this.client.end();
    },

    throwError: function (rpcName, response) {
        throw new Error(rpcName + " Error: " + response);
    },

    getClient: function() {
        return this.client;
    }

}

function receiveData(chunk, data) {
    chunk += data;
    // find the end of a RPC packet
    var eotIndex = chunk.indexOf(EOT);

    // loop for each packet in the data chunk
    while (eotIndex > -1) {
        var response = '';

        // get a packet from the chunk (without the EOT)
        var recievedPacket = chunk.substr(0, eotIndex + 1);
        // remove the RPC packet from the chunk
        chunk = chunk.substring(eotIndex + 1);
        // find the end of the next RPC packet
        eotIndex = chunk.indexOf(EOT);
    }

    return recievedPacket;

}

module.exports.Client = Client;
