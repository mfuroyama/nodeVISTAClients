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


// new problem arguments
const createProbDiabetesArgs = CONFIG.problemStomachUlcer;
const probParams = [];

for (const key in createProbDiabetesArgs) {
    if (createProbDiabetesArgs.hasOwnProperty(key)) {
        probParams.push({
            key,
            value: createProbDiabetesArgs[key],
        });
    }
}

console.log(probParams);
console.log(rpcFormatter.buildListParamString(probParams));

const rpcGreeting = function rpcGreeting(msg) {
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res === rpcFormatter.encapsulate('accept')) {
            fulfill(res);
        } else {
            reject(new Error("get greeting error"));
        }
    }
    return Client.sendRpc(rpcFormatter.buildRpcGreetingString(
        Client.getClient().localAddress,
        msg), callback);
};

const setupSignon = function setupSignon() {
    const rpcName = 'XUS SIGNON SETUP';
    const rpc = rpcFormatter.buildRpcString(rpcName);

    const callback = function callback(err, res, fulfill, reject) {
            const signonSetupResponseArray = res.split(NEW_LINE);

            if (err) {
                reject(err);
            } else if (signonSetupResponseArray.length > 7 && signonSetupResponseArray[5] == 0) {
                fulfill(res);
            } else {
                reject(new Error("Signon setup error"));
            }
        }
        // send the rpc and wait on the promise of the response
    return Client.sendRpc(rpc, callback);
};

const authenticate = function authenticate() {
    const rpcName = 'XUS AV CODE';
    const rpcArgs = [rpcFormatter.buildEncryptedParamString(`${robertAccess};${robertVerify}`)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

    // send the rpc and wait on the promise of the response
    return Client.sendRpc(rpc);
};

const createContext = function createContext() {
    const context = 'OR CPRS GUI CHART';
    const rpcName = 'XWB CREATE CONTEXT';
    // console.log("arg: %j", rpcFormatter.buildEncryptedParamString(context));
    const rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

    // send the rpc and wait on the promise of the response
    return Client.sendRpc(rpc);
};

const selectPatient = function selectPatient() {
    const rpcName = 'ORWPT SELECT';
    const rpcArgs = [rpcFormatter.buildLiteralParamString(patientId)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    return Client.sendRpc(rpc);
};

const createProblem = function createProblem() {
    const rpcName = 'ORQQPL ADD SAVE';
    const rpcArgs = [rpcFormatter.buildLiteralParamString('25^CARTER,DAVID^0113^'),
        rpcFormatter.buildReferenceParamString('62'),
        rpcFormatter.buildReferenceParamString('2957'),
        rpcFormatter.buildListParamString(probParams),
        rpcFormatter.buildLiteralParamString('stomach ulcer'),
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    return Client.sendRpc(rpc);
};

const getProblemDetail = function getProblemDetail() {
    const rpcName = 'ORQQPL DETAIL';
    const rpcArgs = [
        rpcFormatter.buildLiteralParamString('3'),
        rpcFormatter.buildLiteralParamString('1'),
        rpcFormatter.buildLiteralParamString('2'),
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    return Client.sendRpc(rpc);
};

const signOff = function signOff() {
    return Client.sendRpc(rpcFormatter.buildRpcSignOffString());
};

function CallRPCs() {
    rpcGreeting('hello').then((response) => {

        console.log('TCPConnect OK, trying XUS SIGNON SETUP');
        return setupSignon();

    }).then((response) => {

        console.log('XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI');
        return authenticate();

    }).then((response) => {
        const responseArray = rpcFormatter.stripMarkers(response).split(NEW_LINE);

        if (response.match(/Good/)) {
            console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT: %j', response, 'OR CPRS GUI CHART');
            return createContext();
        }
        Client.throwError('XUS AV CODE', response);
    }).then((response) => {
        console.log(response);
        // select a patient
        if (response === rpcFormatter.encapsulate('1')) {
            return selectPatient();
        }
        Client.throwError('ORWPT SELECT', response);
    }).then((response) => {
        console.log(response);
        // create a problem
        if (response !== undefined && response.length > 3) {
            return createProblem();
        }
        Client.throwError('ORWPT SELECT', response);
    }).then((response) => {
        console.log(response);
        // get patient problem data
        if (response !== undefined && response.length > 3) {
            return getProblemDetail();
        }
        Client.throwError('ORWPT SELECT', response);
    }).then((response) => {
        console.log(response);
        if (response !== undefined && response.length > 3) {
            endTime = new Date().getTime();
            console.log('\n\nExecution time: %j ms\n\n', endTime - startTime);
            console.log('OK: %j, trying #BYE#', response);
            return signOff();
        }
        Client.throwError('ORWU DT', response);
    }).then((response) => {
        if (response === rpcFormatter.encapsulate('#BYE#')) {
            console.log('#BYE#');
            success('test1');
            // reconnectClientForNewTest(client, test2);
            Client.closeClient();
        } else Client.throwError('#BYE#', response);
    }).catch((error) => {
        console.log(error);
        Client.closeClient();
    });
}

function success(testName) {
    console.log(`\n\n${testName} SUCCESS!!!\n\n`);
}

Client.setClientTest(CallRPCs);
Client.startClient();
