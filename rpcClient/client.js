'use strict';

var net = require('net');
var CONFIG = require('./cfg/testconfig.js');
var rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
var Client = new require('./RPCClientFramework').Client(CONFIG.rpcServer.port, CONFIG.rpcServer.host);

var NEW_LINE = '\r\n';


// change for local VistA
var robertSSN = CONFIG.robertSSN;
var robertName = CONFIG.robertName;
var robertIEN = CONFIG.robertIEN;
var robertAccess = CONFIG.robertAccess;
var robertVerify = CONFIG.robertVerify;

var startTime, endTime;

// build ORWU DT RPC
var dtRpcName = "ORWU DT";
var dtRpcArgs = [rpcFormatter.buildLiteralParamString("NOW")];
var dtRpc = rpcFormatter.buildRpcString(dtRpcName, dtRpcArgs);
var CPRS_CONTEXT = "OR CPRS GUI CHART";


function CallRPCs() {
    Client.sendRpc(rpcFormatter.buildRpcGreetingString(Client.getClient().localAddress, 'testClient'))
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                var rpcName = "XUS SIGNON SETUP";
                var rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Client.sendRpc(rpc);
            } else Client.throwError('TCPConnect', response);
        })
        .then(function (response) {
            var signonSetupResponseArray = response.split(NEW_LINE);

            if (signonSetupResponseArray.length > 7 && signonSetupResponseArray[5] == 0) {
                console.log('XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI');

                // build next rpc
                var rpcName = "XUS AV CODE";
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(robertAccess + ";" + robertVerify)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Client.sendRpc(rpc);
            } else Client.throwError('XUS SIGNON SETUP', response);
        })
       .then(function (response) {
            var responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);
            var context = CPRS_CONTEXT;

            if (response.match(/Good/)) {
                console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT: %j', response, context);

                // build next rpc
                var rpcName = "XWB CREATE CONTEXT";
                // console.log("arg: %j", rpcFormatter.buildEncryptedParamString(context));
                var rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
                var rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Client.sendRpc(rpc);
            } else Client.throwError('XUS AV CODE', response);
        })
        .then(function (response) {

            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, running  ORWU DT');

                // send the rpc and wait on the promise of the response
                startTime = new Date().getTime();

                return Client.sendRpc(dtRpc);
            } else Client.throwError('XWB CREATE CONTEXT', response);
        })

        .then(function (response) {
            console.log(response);
            if (response !== undefined && response.length > 3) {
                return Client.sendRpc(dtRpc);
            } else Client.throwError('ORWU DT', response);
        })

        .then(function (response) {
            console.log(response);
            if (response !== undefined && response.length > 3) {

                endTime = new Date().getTime();
                console.log("\n\nExecution time of ORWU DT: %j ms\n\n", endTime - startTime);

                console.log('ORWU DT OK: %j, trying #BYE#', response);

                return Client.sendRpc(rpcFormatter.buildRpcSignOffString());
            } else Client.throwError('ORWU DT', response);
        })
        .then(function (response) {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test1')
                //reconnectClientForNewTest(client, test2);
                Client.closeClient();
            } else Client.throwError('#BYE#', response);
        })
        .catch(function (error) {
            console.log(error);
            Client.closeClient();
        });

}



function success(testName) {
    console.log('\n\n' + testName + ' SUCESS!!!\n\n');
}

Client.setClientTest(CallRPCs);
Client.startClient();

