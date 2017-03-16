'use strict';

const net = require('net');
const CONFIG = require('./cfg/testconfig.js');

const Promise = require('promise');

const NUL = '\u0000';
const SOH = '\u0001';
const EOT = '\u0004';
const ENQ = '\u0005';

function Client(port, host) {
    if (!(this instanceof Client)) {
        return new Client(port, host);
    }

    this.client = new net.Socket();
    this.chunk = '';
    const self = this;
    this.client.on('error', (error) => {
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

    sendRpc(rpc) {
        const self = this;
        self.chunk = '';

        return new Promise((fulfill, reject) => {
            function errorFunction(error) {
                console.log('error....');
                reject(error);
            }

            function dataFunction(data) {
                // clean up the 'data' and 'error' listeners for the next step through
                self.client.removeListener('data', dataFunction);
                self.client.removeListener('error', errorFunction);
                fulfill(receiveData(self.chunk, data));
            }
            self.client.on('data', dataFunction);
            self.client.on('error', errorFunction);

            const rpcBuffer = new Buffer(rpc, 'binary');
            self.client.write(rpcBuffer);
        });
    },

    startClient() {
        this.client.connect(this.serverPort, this.serverHost);
    },

    setClientTest(testFunction) {
        this.client.on('connect', testFunction);
    },

    closeClient() {
        this.client.end();
    },

    throwError(rpcName, response) {
        throw new Error(`${rpcName} Error: ${response}`);
    },

    getClient() {
        return this.client;
    },

};

function receiveData(chunk, data) {
    chunk += data;
    // find the end of a RPC packet
    let eotIndex = chunk.indexOf(EOT);

    // loop for each packet in the data chunk
    while (eotIndex > -1) {
        const response = '';

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
