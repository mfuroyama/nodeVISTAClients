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
 * Invokes the clinical service create PCE cpt action.
 * @param {Object} options Create PCE cpt options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE cpt arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE cpt MVDM response.
 */
const createPceCpt = function createPceCpt(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/cpt`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE cpt request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE cpt action.
 * @param {Object} options Update PCE cpt options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE cpt arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE cpt MVDM response.
 */
const updatePceCpt = function updatePceCpt(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/cpt`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE cpt request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE cpt action.
 * @param {Object} options Update PCE cpt options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE cpt list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE cpt list.
 */
const listPceCpts = function listPceCpts(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/cpt`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE cpt action.
 * @param {Object} options Update PCE cpt options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.cptId Cpt identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE cpt list.
 */
const describePceCpt = function describePceCpt(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/cpt/${options.cptId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE cpt request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new cpt arguments
const createPceCptArgs = {

    cptType: {
        id: '81-1',
        label: 'Splint'
    },
    quantity: 1,
    visit: {
        id: '9000010-1'
    },
    providerNarrative: {
        id: '9999999_27-1',
        label: 'Splint'
    },
    //orderingProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //encounterProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //cptModifier: 
    //orderingProvider: 
    comments: 'original comments'
};

/**
 * Run service calls: authenticate -> patientSelect -> createPceCpt -> updatePceCpt -> listPceCpts -> describePceCpt
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let cpt;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

        patientToken = res.patientToken;

        return createPceCpt({
            accessToken,
            patientToken,
            args: createPceCptArgs,
        });
    }).then((res) => {
        console.log(`New PCE cpt successfully created!${NEW_LINES}`);
        cpt = res.body.created;
        console.log(`${JSON.stringify(cpt, null, 2)}${NEW_LINES}`);

        const updateCptOptions = {
            accessToken,
            patientToken,
            args: {
                id: cpt.id,
                cptType: {
                    id: '81-1',
                    laxbel: 'Splint'
                },
                quantity: 3,
                visit: {
                    id: '9000010-1'
                },
                providerNarrative: {
                    id: '9999999_27-1',
                    label: 'Splint'
                },
                comments: "updated comments"


            },
        };

        return updatePceCpt(updateCptOptions);
    }).then((res) => {
        console.log(`PCE cpt successfully updated!${NEW_LINES}`);
        cpt = res.body.updated;
        console.log(`${JSON.stringify(cpt, null, 2)}${NEW_LINES}`);

        return describePceCpt({
            accessToken,
            patientToken,
            cptId: cpt.id,
        });
    }).then((res) => {
        console.log(`Describe PCE cpt success!${NEW_LINES}`);
        cpt = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(cpt, null, 2)}${NEW_LINES}`);

        return listPceCpts({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE cpts success!${NEW_LINES}`);
        const cpts = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(cpts, null, 2)}${NEW_LINES}`);

        return describePceCpt({
            accessToken,
            patientToken,
            cptId: cpt.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();