#!/usr/bin/env node

'use strict';

/**
 * A node.js client using promises that demonstrates how to make REST calls to the nodeVISTA clinical service interface.
 *
 * A web client would typically follow an ajax pattern using XMLHttpRequests.
 *
 * The first call is to the authentication action to retrieve a JWT accessToken.
 *
 * The second call is to the patient select action to retrieve a JWT patientToken.
 *
 * The access and patient tokens are used by the reminder of the service calls.
 */

const request = require('request');
const HttpStatus = require('http-status');
const config = require('./config');

const serverURL = config.serverURL;

/**
 * Invokes the clinical service authentication action.
 * @param {String} userId User identifier.
 * @param {String} facilityId facilityId
 * @returns {Promise} A promise that handles the REST call response.
 *                  A successful response will return JWT access and refresh tokens.
 */
const authenticate = function authenticate(userId, facilityId) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/auth`,
            form: { userId, facilityId },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the authenticate request: ${res.body}`);
            } else if (!res.headers['x-access-token']) {
                throw new Error('Something went wrong: authenticate request did not return an access token.');
            } else if (!res.headers['x-refresh-token']) {
                throw new Error('Something went wrong: authenticate request did not return a refresh token.');
            } else {
                resolve({
                    accessToken: res.headers['x-access-token'],
                    refreshToken: res.headers['x-refresh-token'],
                });
            }
        });
    });
};

/**
 * Invokes the clinical service patient select action.
 * @param {String} accessToken JWT access token.
 * @param {String} patientId Patient identifier.
 * @returns {Promise} A promise that handles the REST call response.
 *                          A successful response will return a JWT patient token.
 */
const patientSelect = function patientSelect(accessToken, patientId) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/patient/select`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            form: { patientId },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the patient select request: ${res.body}`);
            } else if (!res.headers['x-patient-token']) {
                throw new Error('Something went wrong: patient select request did not return a patient token.');
            } else {
                resolve({
                    patientToken: res.headers['x-patient-token'],
                });
            }
        });
    });
};

/**
 * Invokes the clinical service create PCE diagnosis action.
 * @param {Object} options Create PCE diagnosis options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE diagnosis arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE diagnosis MVDM response.
 */
const createPceDiagnosis = function createPceDiagnosis(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/pov`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE diagnosis request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE diagnosis action.
 * @param {Object} options Update PCE diagnosis options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE diagnosis arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE diagnosis MVDM response.
 */
const updatePcePov = function updatePcePov(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/pov`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE diagnosis request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE diagnosis action.
 * @param {Object} options Update PCE diagnosis options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE diagnosis list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE diagnosis list.
 */
const listPceDiagnosiss = function listPceDiagnosiss(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/pov`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list POVs request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE diagnosis action.
 * @param {Object} options Update PCE diagnosis options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.diagnosisId diagnosis identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE diagnosis list.
 */
const describePceDiagnosis = function describePceDiagnosis(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/pov/${options.povId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE diagnosis request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new diagnosis arguments
const createPceDiagnosisArgs = {
    povType: {
        id: '80-571830',
        label: 'Z98.890'
    },
    visit: {
        id: '9000010-1'
    },
    providerNarrative: {
        id: '9999999_27-35708',
        label: 'Other specified Postprocedural State'
    },
    clicnicalTerm: {
        id: '757_01-5063754',
        label: 'Other specified Postprocedural States'
    },
    primarySecondary: 'PRIMARY',
    //orderingProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //encounterProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //cptModifier: 
    //orderingProvider: 
    comments: 'original comments'


};

/**
 * Run service calls: authenticate -> patientSelect -> createPceDiagnosis -> updatePceDiagnosis -> listPceDiagnosiss -> describePceDiagnosis
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let skin;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

        patientToken = res.patientToken;

        return createPceDiagnosis({
            accessToken,
            patientToken,
            args: createPcePovArgs,
        });
    }).then((res) => {
        console.log(`New PCE diagnosis successfully created!${NEW_LINES}`);
        pov = res.body.created;
        console.log(`${JSON.stringify(pov, null, 2)}${NEW_LINES}`);

        const updateDiagnosisOptions = {
            accessToken,
            patientToken,
            args: {
                id: pov.id,
                povStatus: 'INACTIVE',
            },
        };

        return updatePceDiagnosis(updatDiagnosisOptions);
    }).then((res) => {
        console.log(`PCE diagnosis successfully updated!${NEW_LINES}`);
        pov = res.body.updated;
        console.log(`${JSON.stringify(pov, null, 2)}${NEW_LINES}`);

        return describePceDiagnosis({
            accessToken,
            patientToken,
            povId: pov.id,
        });
    }).then((res) => {
        console.log(`Describe PCE diagnosis success!${NEW_LINES}`);
        pov = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(pov, null, 2)}${NEW_LINES}`);

        return listPceDiagnosiss({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE diagnosis success!${NEW_LINES}`);
        const povs = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(povs, null, 2)}${NEW_LINES}`);

        return describePceDiagnosis({
            accessToken,
            patientToken,
            povId: pov.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();