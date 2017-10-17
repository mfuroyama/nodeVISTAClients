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
 * Invokes the clinical service create PCE immunization action.
 * @param {Object} options Create PCE immunization options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE immunization arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE immunization MVDM response.
 */
const createPceImmunization = function createPceImmunization(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/immunization`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE immunization request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE immunization action.
 * @param {Object} options Update PCE immunization options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE immunization arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE immunization MVDM response.
 */
const updatePceImmunization = function updatePceImmunization(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/immunization`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE immunization request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE immunization action.
 * @param {Object} options Update PCE immunization options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE immunization list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE immunization list.
 */
const listPceImmunizations = function listPceImmunizations(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/immunization`,
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
 * Invokes the clinical service describe PCE immunization action.
 * @param {Object} options Update PCE immunization options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.immunizationId Immunization identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE immunization list.
 */
const describePceImmunization = function describePceImmunization(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/immunization/${options.immunizationId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE immunization request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new immunization arguments
const createPceImmunizationArgs = {
    immunizationType: {
        id: '9999999_14-1020',
        label: 'DTAP'
    },
    series: 'SERIES 1',
    contraindicated: 'NO (OK TO USE IN THE FUTURE)',
    reaction: 'FEVER',
    visit: {
        id: '9000010-1'
    },
    //orderingProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    //encounterProvider: { id: '200-63', label: 'ALEXANDER,ROBERT' },
    comments: 'original comments'

};

/**
 * Run service calls: authenticate -> patientSelect -> createPceImmunization -> updatePceImmunization -> listPceImmunizations -> describePceImmunization
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let immunization;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

        patientToken = res.patientToken;

        return createPceImmunization({
            accessToken,
            patientToken,
            args: createPceImmunizationArgs,
        });
    }).then((res) => {
        console.log(`New PCE immunization successfully created!${NEW_LINES}`);
        immunization = res.body.created;
        console.log(`${JSON.stringify(immunization, null, 2)}${NEW_LINES}`);

        const updateImmunizationOptions = {
            accessToken,
            patientToken,
            args: {
                id: immunization.id,
                immunizationStatus: 'INACTIVE',
            },
        };

        return updatePceImmunization(updateImmunizationOptions);
    }).then((res) => {
        console.log(`PCE immunization successfully updated!${NEW_LINES}`);
        immunization = res.body.updated;
        console.log(`${JSON.stringify(immunization, null, 2)}${NEW_LINES}`);

        return describePceImmunization({
            accessToken,
            patientToken,
            immunizationId: immunization.id,
        });
    }).then((res) => {
        console.log(`Describe PCE immunization success!${NEW_LINES}`);
        immunization = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(immunization, null, 2)}${NEW_LINES}`);

        return listPceImmunizations({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE immunizations success!${NEW_LINES}`);
        const immunizations = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(immunizations, null, 2)}${NEW_LINES}`);

        return describePceImmunization({
            accessToken,
            patientToken,
            immunizationId: immunization.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();