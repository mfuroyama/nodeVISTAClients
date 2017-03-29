#!/usr/bin/env node

'use strict';

/**
 * A node.js client using promises that demonstrates how to use VISTA's RPC interface. 
 * Contrast the complexity and flow of the calls below to nodeVISTA's service client,
 * 'serviceProblems.js'. The more natural and standard form of the service interface
 * should be obvious.
 *
 * A series of convenience functions for invoking particular RPCs is followed by
 * a Promise-based sequence of RPC calls to nodeVISTA.
 */

const _ = require('lodash');
const rpcFormatter = require('nodevista-rpcparser/rpcFormatter.js');

const NEW_LINE = '\r\n';
const shiftMultiLineString = function(val) {
    let shifted = '';
    val.split(NEW_LINE).forEach(function(line) {
        shifted += '\t' + line + '\n';
    });
    return shifted;
};

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
    // arguments of msg and the client's IP address
    return Client.sendRpc(rpcFormatter.buildRpcGreetingString(
        Client.getClient().localAddress,
        msg), callback);
};

const setupSignon = function setupSignon() {
    const rpcName = 'XUS SIGNON SETUP';
    // very simple - no arguments
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
    return Client.sendRpc(rpc, callback);
};

const authenticate = function authenticate(access, verify) {
    const rpcName = 'XUS AV CODE';
    const rpcArgs = [rpcFormatter.buildEncryptedParamString(`${access};${verify}`)];
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

/*
 * getUserInfo takes no arguments - is about user previously authenticated
 */ 
const getUserInfo = function getUserInfo() {
    const rpcName = "XUS GET USER INFO";
    const rpc = rpcFormatter.buildRpcString(rpcName);

    const callback = function callback(err, res, fulfill, reject) {
        const responseArray = rpcFormatter.stripMarkers(res).split(NEW_LINE); //not used
        if (err) {
            reject(err);
        } else {
            fulfill(res);
        }
    }
    return Client.sendRpc(rpc, callback);
}

const createContext = function createContext(context) {
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

const selectPatient = function selectPatient(patientIEN) {
    const rpcName = 'ORWPT SELECT';
    const rpcArgs = [rpcFormatter.buildLiteralParamString(patientIEN)];
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

const createProblem = function createProblem(patientIEN, patientName, userIEN, locationIEN, otherParameters, providerNarrativeLabel) {
    const rpcName = 'ORQQPL ADD SAVE';
    const rpcArgs = [rpcFormatter.buildLiteralParamString(`${patientIEN}^${patientName}^0113^`),
        rpcFormatter.buildReferenceParamString(userIEN),
        rpcFormatter.buildReferenceParamString(locationIEN),
        rpcFormatter.buildListParamString(otherParameters),
        rpcFormatter.buildLiteralParamString(providerNarrativeLabel), // GMPSRCH - passed by CPRS
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

const updateProblem = function updateProblem(problemIEN, userIEN, locationIEN, otherParameters) {
    const rpcName = 'ORQQPL EDIT SAVE';
    const rpcArgs = [rpcFormatter.buildLiteralParamString(problemIEN),
        rpcFormatter.buildReferenceParamString(userIEN),
        rpcFormatter.buildReferenceParamString(locationIEN),
        rpcFormatter.buildLiteralParamString('1'),
        rpcFormatter.buildListParamString(otherParameters),
        rpcFormatter.buildLiteralParamString(''),
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

const getProblemDetail = function getProblemDetail(patientIEN, problemIEN) {
    const rpcName = 'ORQQPL DETAIL';
    const rpcArgs = [
        rpcFormatter.buildLiteralParamString(patientIEN),
        rpcFormatter.buildLiteralParamString(problemIEN),
        rpcFormatter.buildLiteralParamString(''), // unused argument in source code
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
        if (err) {
            reject(err);
        } else if (res !== undefined && res.length > 3) {
            fulfill(res);
        } else {
            reject(new Error("Get problem detail error(ORQQPL DETAIL)"));
        }
    }
    return Client.sendRpc(rpc, callback);
};

const listProblems = function listProblems(patientIEN, statusFilter) {
    const rpcName = 'ORQQPL PROBLEM LIST';
    const rpcArgs = [
        rpcFormatter.buildLiteralParamString(patientIEN), // DFN (patient ien)
        rpcFormatter.buildLiteralParamString(statusFilter), // FILTER: active (A), inactive (I), both (B)
        rpcFormatter.buildLiteralParamString('0') // Date (filter) - CPRS has zero
    ];
    const rpc = rpcFormatter.buildRpcString(rpcName, rpcArgs);
    const callback = function callback(err, res, fulfill, reject) {
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

/*
 * Initialize Promise's supporting singleton for RPC communications
 */
const rpcHost = "10.2.2.100";
const rpcPort = 9010;
const Client = new require('./rpcClient').Client(rpcPort, rpcHost);

/*
 * Settings of User, Patient and Location
 */
const userAccess = 'fakedoc1';
const userVerify = '1Doc!@#$';
let userIEN; // will retrieve using getUserInfo after login with the access and verify
let userName; 

const patientIEN = "25"; // David Carter's IEN in Patient file 2
let patientName; // will retrieve from select

const locationIEN = "2957";

let problemIEN; // will be fixed after create
let createProblemParameters; // for reuse by update

/*
 * A series of Promise based calls that [a] login to VISTA, [b] create a problem,
 * [c] get details of what's been created, [d] update the problem, [e] list all
 * problems and then exits.
 */
function CallRPCs() {

    rpcGreeting('hello').then((response) => {

        console.log("\n\nTCP Connect Success\n");

        return setupSignon();

    }).then((response) => {

        console.log("Setup Signon (XUS SIGNON SETUP) Success\n");

        return authenticate(userAccess, userVerify);

    }).then((response) => {

        console.log("Authenticate 'User Robert' (XUS AV CODE) Success\n");
   
        // After signing on with a user's access and verify, we can find out more
        // about that user.
        return getUserInfo();

    }).then((response) => {

        userIEN = response.split(NEW_LINE)[0].replace(/\u0000/g, ""); // see leading \u0000
        userName = response.split(NEW_LINE)[1];
        console.log(`Get User Info (XUS GET USER INFO) Success - IEN of user with access/verify used to Authenticate is ${userIEN}:`);
        console.log(shiftMultiLineString(response), "\n\n");

        // this 'context' gives broad access to RPCs used in CPRS, VISTA's client
        return createContext('OR CPRS GUI CHART');

    }).then((response) => {

        console.log("Create Context (XWB CREATE CONTEXT) <OR CPRS GUI CHART> Success\n");

        return selectPatient(patientIEN);

    }).then((response) => {

        patientName = response.split("^")[0];
        console.log(`Select Patient (ORWPT SELECT) Success - name of patient with IEN '${patientIEN}' is ${patientName}:`);
        console.log(shiftMultiLineString(response), "\n\n");

        // Note how 'MUMPS code like' these arguments are: CPRS sends these.
        // ... a variation here would have date/time being set to NOW using moment.
        const createProviderNarrativeLabel = "Diabetes mellitus";
        createProblemParameters = [
            { key: '1', value: 'GMPFLD(.01)="521774^R69."' }, // Diagnosis (file 80 reference)
            { key: '2', value: 'GMPFLD(.03)="0^"' }, // Date last modified - 0 == NOW
            { key: '3', value: `GMPFLD(.05)="^${createProviderNarrativeLabel}"` }, // Problem (Provider Narrative Label)
            { key: '4', value: 'GMPFLD(.08)="3170316"' }, // Date entered (FileMan format of date)
            { key: '5', value: 'GMPFLD(.12)="A^ACTIVE"' }, // Problem Status
            { key: '6', value: 'GMPFLD(.13)="^"' }, // Date of onset
            { key: '7', value: 'GMPFLD(1.01)="7130783^"' }, // Problem (Lexicon IEN)
            { key: '8', value: 'GMPFLD(1.02)="P"' }, // Condition (Permanent)
            { key: '9', value: `GMPFLD(1.03)="${userIEN}^${userName}"` }, // Entered By (Provider)
            { key: '10', value: `GMPFLD(1.04)="${userIEN}^${userName}"`}, // Recording Provider
            { key: '11', value: `GMPFLD(1.05)="${userIEN}^${userName}"`}, // Responsible Provider
            { key: '12', value: 'GMPFLD(1.06)="^"' }, // Service (empty in CPRS calling)
            { key: '13', value: 'GMPFLD(1.07)="^"' }, // Date Resolved (Not applicable here as ACTIVE)
            { key: '14', value: 'GMPFLD(1.08)="3^VISTA HEALTH CARE"' }, // Clinic (Hospital Location)
            { key: '15', value: 'GMPFLD(1.09)="3170316"' }, // Date Recorded
            { key: '16', value: 'GMPFLD(1.1)="^Unknown"' }, // Service Connected
            { key: '17', value: 'GMPFLD(1.11)="0^NO"' }, // Agent Orange Exposure
            { key: '18', value: 'GMPFLD(1.12)="0^NO"' }, // Ionizing Radiation Exposure
            { key: '19', value: 'GMPFLD(1.13)="0^NO"' }, // Persian Gulf Exposure
            { key: '20', value: 'GMPFLD(1.14)="@^"' }, // Priority
            { key: '21', value: 'GMPFLD(1.15)="0^NO"' }, // Head and/or Neck Cancer
            { key: '22', value: 'GMPFLD(1.16)="0^NO"' }, // Military Sexual Trauma
            { key: '23', value: 'GMPFLD(1.17)="0^NO"' }, // Combat Veteran
            { key: '24', value: 'GMPFLD(1.18)="0^NO"' }, // Shipboard Habit and Defense
            { key: '25', value: 'GMPFLD(80001)="73211009"' }, // SNOMED Concept Code
            { key: '26', value: 'GMPFLD(80002)="121589010"' }, // SNOMED Designation Code
            { key: '27', value: 'GMPFLD(80101)="^"' }, // Unique New Term Requested
            { key: '28', value: 'GMPFLD(80102)="^"' }, // Unique New Term comments
            { key: '29', value: 'GMPFLD(80201)="3170316"' }, // Date of Interest
            { key: '30', value: 'GMPFLD(80202)="10D^ICD-10-CM"' }, // Coding System
            { key: '31', value: 'GMPFLD(10,0)="0"' } // New Problem Comment
        ];
        return createProblem(patientIEN, patientName, userIEN, locationIEN, createProblemParameters, createProviderNarrativeLabel);

    }).then((response) => {

        console.log("Create Problem (ORQQPL ADD SAVE) Success - but see how complicated the arguments were:");
        console.log(shiftMultiLineString(createProblemParameters.map(x => JSON.stringify(x)).join(NEW_LINE)), "\n");
        

        // One RPC quirk is that Create DOESN'T return the IEN of the problem created. Just picking 1 here
        // though if there were problems before the creation above then this won't return the created problem's details!
        problemIEN = "1";

        // Notice that though we've selected a patient, we continue to pass in details on that patient (IEN, name) in
        // subsequent RPC calls. This is either [a] redundant or [b] a security hole as it allows us to change the record
        // of a patient we haven't selected. The second behavior is NOW prevented in the RPC Emulator.
        return getProblemDetail(patientIEN, problemIEN);

    }).then((response) => {

        console.log("Get Problem Detail (ORQQPL DETAIL) Success:");
        console.log(shiftMultiLineString(response), "\n");

        /*
         * Update the problem marking it inactive. Note how you need to reset all parameters
         * in an update even those which aren't changing. Here we copy the create values and 
         * only update the status parameter (5) which is changed from ACTIVE to INACTIVE
         */
        let updateProblemParameters = createProblemParameters;
        let statusAssertion = updateProblemParameters.find(x => (x.key === '5'));
        statusAssertion.value = 'GMPFLD(.12)="I^INACTIVE"';

        return updateProblem(problemIEN, userIEN, locationIEN, updateProblemParameters);

    }).then((response) => {

        // Like Create, Update doesn't return any details about the updated problem. A separate details call
        // would be needed to cache the updated data (and 'chatty' CPRS makes such calls)
        console.log("Update Problem (ORQQPL EDIT SAVE) Success - set problem to INACTIVE (I)\n");

        return listProblems(patientIEN, "B");

    }).then((response) => {

        console.log("List Problems (ORQQPL PROBLEM LIST) Success - notice 'I' for INACTIVE due to UPDATE:");
        console.log(shiftMultiLineString(response), "\n");

        return signOff();

    }).then((response) => {

        if (response === rpcFormatter.encapsulate('#BYE#')) {

            console.log('#BYE#\n');

            Client.closeClient(); 

        } else Client.throwError('#BYE#', response);

    }).catch((error) => {

        console.log(error);

        Client.closeClient();

    });

}

Client.setClientTest(CallRPCs);
Client.startClient();
