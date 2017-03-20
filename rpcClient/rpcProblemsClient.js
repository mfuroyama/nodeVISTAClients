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
const createProbDiabetesArgs = CONFIG.diabetes;
const probParams = [];

for (const key in createProbDiabetesArgs) {
    if (createProbDiabetesArgs.hasOwnProperty(key)) {
        probParams.push({
            key,
            value: createProbDiabetesArgs[key],
        });
    }
}

const rpcGreeting = function rpcGreeting(msg) {
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res === rpcFormatter.encapsulate('accept')) {
            fulfill(res);
        } else {
            reject(new Error("Greeting error (TCP Connect)"));
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
                reject(new Error("Signon setup error(XUS SIGNON SETUP)"));
            }
        }
        // send the rpc and wait on the promise of the response
    return Client.sendRpc(rpc, callback);
};

const authenticate = function authenticate() {
    const rpcName = 'XUS AV CODE';
    const rpcArgs = [rpcFormatter.buildEncryptedParamString(`${robertAccess};${robertVerify}`)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

    const callback = function callback(err, res, fulfill, reject) {
        const responseArray = rpcFormatter.stripMarkers(res).split(NEW_LINE); //not used
        if (err) {
            reject(err);
        } else if (res.match(/Good/)) {
            fulfill(res);
        } else {
            reject(new Error("Authenticate error(XUS AV CODE)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const createContext = function createContext() {
    const context = 'OR CPRS GUI CHART';
    const rpcName = 'XWB CREATE CONTEXT';
    const rpcArgs = [rpcFormatter.buildEncryptedParamString(context)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);

    const callback = function callback(err, res, fulfill, reject) {
        const responseArray = rpcFormatter.stripMarkers(res).split(NEW_LINE);
        if (err) {
            reject(err);
        } else if (res === rpcFormatter.encapsulate('1')) {
            fulfill(res);
        } else {
            reject(new Error("Context error(XWB CREATE CONTEXT)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const selectPatient = function selectPatient() {
    const rpcName = 'ORWPT SELECT';
    const rpcArgs = [rpcFormatter.buildLiteralParamString(patientId)];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res !== undefined && res.length > 3) {

            fulfill(res);
        } else {
            reject(new Error("Select patient error(ORWPT SELECT)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const createProblem = function createProblem() {
    const rpcName = 'ORQQPL ADD SAVE';
    const rpcArgs = [rpcFormatter.buildLiteralParamString('25^CARTER,DAVID^0113^'),
        rpcFormatter.buildReferenceParamString('62'),
        rpcFormatter.buildReferenceParamString('2957'),
        rpcFormatter.buildListParamString(probParams),
        rpcFormatter.buildLiteralParamString('Diabetes mellitus'),
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res !== undefined && res.length > 3) {

            fulfill(res);
        } else {
            reject(new Error("Create problem error(ORQQPL ADD SAVE)"));
        }
    }

    return Client.sendRpc(rpc, callback);
};

const updateProblem = function updateProblem() {
    const rpcName = 'ORQQPL EDIT SAVE';
    const rpcArgs = [rpcFormatter.buildLiteralParamString('1'),
        rpcFormatter.buildReferenceParamString('62'),
        rpcFormatter.buildReferenceParamString('2957'),
        rpcFormatter.buildLiteralParamString('1'),
        rpcFormatter.buildListParamString(probParams),
        rpcFormatter.buildLiteralParamString('Diabetes mellitus'),
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res !== undefined && res.length > 3) {

            fulfill(res);
        } else {
            reject(new Error("Create problem error(ORQQPL EDIT SAVE)"));
        }
    }

    return Client.sendRpc(rpc, callback);
};

const getProblemDetail = function getProblemDetail() {
    const rpcName = 'ORQQPL DETAIL';
    const rpcArgs = [
        rpcFormatter.buildLiteralParamString('3'),
        rpcFormatter.buildLiteralParamString('1'),
        rpcFormatter.buildLiteralParamString('2'),
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res !== undefined && res.length > 3) {
            console.log('get problem detail: ', res);
            fulfill(res);
        } else {
            reject(new Error("Get problem detail error(ORQQPL DETAIL)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const listProblems = function listProblems() {
    const rpcName = 'ORQQPL PROBLEM LIST';
    const rpcArgs = [
        rpcFormatter.buildLiteralParamString('3'),
        rpcFormatter.buildLiteralParamString('B'), //active problems
        rpcFormatter.buildLiteralParamString('0')
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        console.log('list problems: ', res);
        if (err) {
            reject(err);
        } else if (res !== undefined) {
            fulfill(res);
        } else {
            reject(new Error("Get problem list error(ORQQPL PROBLEM LIST)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const signOff = function signOff() {
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res === rpcFormatter.encapsulate('#BYE#')) {
            fulfill(res);
        } else {
            reject(new Error("Signoff error(BYE)"));
        }
    }
    return Client.sendRpc(rpcFormatter.buildRpcSignOffString(), callback);
};

function CallRPCs() {
    rpcGreeting('hello').then((response) => {

        console.log('TCPConnect OK, trying XUS SIGNON SETUP');
        return setupSignon();

    }).then((response) => {

        console.log('XUS SIGNON SETUP OK, trying XWB CREATE CONTEXT DVBA CAPRI GUI');
        return authenticate();

    }).then((response) => {
        console.log('XUS AV CODE OK: %j, trying XWB CREATE CONTEXT: %j', response, 'OR CPRS GUI CHART');
        startTime = new Date().getTime();
        return createContext();

    }).then((response) => {
        console.log(response);
        // select a patient
        return selectPatient();
    }).then((response) => {
        console.log(response);
        // create a problem
        return createProblem();
    }).then((response) => {
        console.log(response);
        // get patient problem data
        return getProblemDetail();
    }).then((response) => {
        console.log(response);
        //update problem
        return updateProblem();
    }).then((response) => {
        // list problems
        console.log(response);
        return listProblems();
    }).then((response) => {
        console.log(response);
        endTime = new Date().getTime();
        console.log('\n\nExecution time: %j ms\n\n', endTime - startTime);
        console.log('OK: %j, trying #BYE#', response);
        return signOff();
    }).then((response) => {
        if (response === rpcFormatter.encapsulate('#BYE#')) {
            console.log('#BYE#');
            success('test1');
            // reconnectClientForNewTest(client, test2);
            Client.closeClient(); //Need a function?
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
