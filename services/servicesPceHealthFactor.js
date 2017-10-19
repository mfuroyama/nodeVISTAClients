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
 * Invokes the clinical service create PCE healthFactor action.
 * @param {Object} options Create PCE healthFactor options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE healthFactor arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE healthFactor MVDM response.
 */
const createPceHealthFactor = function createPceHealthFactor(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/healthFactor`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE healthFactor request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE healthFactor action.
 * @param {Object} options Update PCE healthFactor options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE healthFactor arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE healthFactor MVDM response.
 */
const updatePceHealthFactor = function updatePceHealthFactor(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/healthFactor`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE healthFactor request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE healthFactor action.
 * @param {Object} options Update PCE healthFactor options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE healthFactor list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE healthFactor list.
 */
const listPceHealthFactors = function listPceHealthFactors(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/healthFactor`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list health factor request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE healthFactor action.
 * @param {Object} options Update PCE healthFactor options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.healthFactorId HealthFactor identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE healthFactor list.
 */
const describePceHealthFactor = function describePceHealthFactor(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/healthFactor/${options.healthFactorId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE healthFactor request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new healthFactor arguments
const createPceHealthFactorArgs = {

    healthFactorId: {
        id: '9999999_64-489',
        label: 'ABD AORTIC ANEURYSM 3.0-3.9 CM'
    },
    levelSeverity: 'MINIMAL',
    visit: {
        id: '9000010-1'
    },
    //orderingProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //encounterProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    comments: 'original comments'

};

/**
 * Run service calls: authenticate -> patientSelect -> createPceHealthFactor -> updatePceHealthFactor -> listPceHealthFactors -> describePceHealthFactor
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let healthFactor;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

        patientToken = res.patientToken;

        return createPceHealthFactor({
            accessToken,
            patientToken,
            args: createPceHealthFactorArgs,
        });
    }).then((res) => {
        console.log(`New PCE healthFactor successfully created!${NEW_LINES}`);
        healthFactor = res.body.created;
        console.log(`${JSON.stringify(healthFactor, null, 2)}${NEW_LINES}`);

        const updateHealthFactorOptions = {
            accessToken,
            patientToken,
            args: {
                id: healthFactor.id,
                healthFactorId: {
                    id: '9999999_64-489',
                    label: 'ABD AORTIC ANEURYSM 3.0-3.9 CM'
                },
                levelSeverity: 'MODERATE',
                visit: {
                    id: '9000010-1'
                },
                comments: 'updated comments'

            },
        };

        return updatePceHealthFactor(updateHealthFactorOptions);
    }).then((res) => {
        console.log(`PCE healthFactor successfully updated!${NEW_LINES}`);
        healthFactor = res.body.updated;
        console.log(`${JSON.stringify(healthFactor, null, 2)}${NEW_LINES}`);

        return describePceHealthFactor({
            accessToken,
            patientToken,
            healthFactorId: healthFactor.id,
        });
    }).then((res) => {
        console.log(`Describe PCE healthFactor success!${NEW_LINES}`);
        healthFactor = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(healthFactor, null, 2)}${NEW_LINES}`);

        return listPceHealthFactors({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE healthFactors success!${NEW_LINES}`);
        const healthFactors = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(healthFactors, null, 2)}${NEW_LINES}`);

        return describePceHealthFactor({
            accessToken,
            patientToken,
            healthFactorId: healthFactor.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();