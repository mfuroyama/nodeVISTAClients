'use strict';

const net = require('net');
const CONFIG = require('./cfg/testconfig.js');
const rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');
const Client = new require('./rpcUtils').Client(CONFIG.rpcServer.port, CONFIG.rpcServer.host);

const NEW_LINE = '\r\n';

// change for local VistA
const robertSSN = CONFIG.robertSSN;
const robertName = CONFIG.robertName;
const robertIEN = CONFIG.robertIEN;
const robertAccess = CONFIG.robertAccess;
const robertVerify = CONFIG.robertVerify;

const patientId = CONFIG.patientId;

let startTime,
    endTime;

// build ORWU DT RPC
const dtRpcName = 'ORWU DT';
const dtRpcArgs = [rpcFormatter.buildLiteralParamString('NOW')];
const dtRpc = rpcFormatter.buildRpcString(dtRpcName, dtRpcArgs);
const CPRS_CONTEXT = 'OR CPRS GUI CHART';


function CallRPCs() {
    Client.sendRpc(rpcFormatter.buildRpcGreetingString(Client.getClient().localAddress, 'testClient'))
        .then((response) => {
            if (response === rpcFormatter.encapsulate('accept')) {
                console.log('TCPConnect OK, trying XUS SIGNON SETUP');

                // build next rpc
                const rpcName = 'XUS SIGNON SETUP';
                const rpc = rpcFormatter.buildRpcString(rpcName);

                // send the rpc and wait on the promise of the response
                return Client.sendRpc(rpc);
            } Client.throwError('TCPConnect', response);
        })
        .then((response) => {
            const signonSetupResponseArray = response.split(NEW_LINE);

            if (signonSetupResponseArray.length > 7 && signonSetupResponseArray[5] == 0) {
                console.log('XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI');

                // build next rpc
                const rpcName = 'XUS AV CODE';
                const rpcArgs = [rpcFormatter.buildEncryptedParamString(`${robertAccess};${robertVerify}`)];
                const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
                return Client.sendRpc(rpc);
            } Client.throwError('XUS SIGNON SETUP', response);
        })
       .then((response) => {
           const responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);
           const context = CPRS_CONTEXT;

           if (response.match(/Good/)) {
               console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT: %j', response, context);

                // build next rpc
               const rpcName = 'XWB CREATE CONTEXT';
                // console.log("arg: %j", rpcFormatter.buildEncryptedParamString(context));
               const rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
               const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

                // send the rpc and wait on the promise of the response
               return Client.sendRpc(rpc);
           } Client.throwError('XUS AV CODE', response);
       })
        .then((response) => {
            if (response === rpcFormatter.encapsulate('1')) {
                console.log('XWB CREATE CONTEXT OK, running  ORWU DT');

                // send the rpc and wait on the promise of the response
                startTime = new Date().getTime();

                return Client.sendRpc(dtRpc);
            } Client.throwError('XWB CREATE CONTEXT', response);
        })

        .then((response) => {
            console.log(response);
            // select a patient
            if (response !== undefined && response.length > 3) {
                const rpcName = 'ORWPT SELECT';
                const rpcArgs = [rpcFormatter.buildLiteralParamString(patientId)];
                const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
                return Client.sendRpc(rpc);
            } Client.throwError('ORWPT SELECT', response);
        })

        .then((response) => {
            console.log(response);
            // create a problem
            if (response !== undefined && response.length > 3) {
                const rpcName = 'ORQQPL ADD SAVE';
                const rpcArgs = [
                    rpcFormatter.buildLiteralParamString('3'),
                    rpcFormatter.buildLiteralParamString('1'),
                    rpcFormatter.buildLiteralParamString('2'),
                ];
                const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
                return Client.sendRpc(rpc);
            } Client.throwError('ORWPT SELECT', response);
        })

        .then((response) => {
            console.log(response);
            // get patient allergy data
            if (response !== undefined && response.length > 3) {
                const rpcName = 'ORQQPL DETAIL';
                const rpcArgs = [
                    rpcFormatter.buildLiteralParamString('3'),
                    rpcFormatter.buildLiteralParamString('1'),
                    rpcFormatter.buildLiteralParamString('2'),
                ];
                const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
                return Client.sendRpc(rpc);
            } Client.throwError('ORWPT SELECT', response);
        })


        .then((response) => {
            console.log(response);
            if (response !== undefined && response.length > 3) {
                endTime = new Date().getTime();
                console.log('\n\nExecution time: %j ms\n\n', endTime - startTime);

                console.log('OK: %j, trying #BYE#', response);

                return Client.sendRpc(rpcFormatter.buildRpcSignOffString());
            } Client.throwError('ORWU DT', response);
        })
        .then((response) => {
            if (response === rpcFormatter.encapsulate('#BYE#')) {
                console.log('#BYE#');
                success('test1');
                // reconnectClientForNewTest(client, test2);
                Client.closeClient();
            } else Client.throwError('#BYE#', response);
        })
        .catch((error) => {
            console.log(error);
            Client.closeClient();
        });
}

function success(testName) {
    console.log(`\n\n${testName} SUCCESS!!!\n\n`);
}

Client.setClientTest(CallRPCs);
Client.startClient();

