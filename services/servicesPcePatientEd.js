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
 * Invokes the clinical service create PCE patientEd action.
 * @param {Object} options Create PCE patientEd options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE patientEd arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE patientEd MVDM response.
 */
const createPcePatientEd = function createPcePatientEd(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/patientEd`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                console.log(options.args, '<<>>', options.patientToken);
 
                throw new Error(`There was issue with the create PCE patientEd request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE patientEd action.
 * @param {Object} options Update PCE patientEd options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE patientEd arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE patientEd MVDM response.
 */
const updatePcePatientEd = function updatePcePatientEd(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/patientEd`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE patientEd request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE patientEd action.
 * @param {Object} options Update PCE patientEd options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE patientEd list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE patientEd list.
 */
const listPcePatientEds = function listPcePatientEds(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/patientEd`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list patient education request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE patientEd action.
 * @param {Object} options Update PCE patientEd options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.patientEdId PatientEd identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE patientEd list.
 */
const describePcePatientEd = function describePcePatientEd(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/patientEd/${options.patientEdId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE patientEd request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new patientEd arguments
const createPcePatientEdArgs = {

    topicType: {
        id: '9999999_09-612027',
        label: 'ALCOHOL USE AND MEDICAL PROBLEMS'
    },
    levelOfUnderstanding: 'POOR',
    visit: {
        id: '9000010-1'
    },
    comments: 'original comments'

};

/**
 * Run service calls: authenticate -> patientSelect -> createPcePatientEd -> updatePcePatientEd -> listPcePatientEds -> describePcePatientEd
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let patientEd;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    })
     .then((res) => {
         console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

         patientToken = res.patientToken;

        return createPcePatientEd({
            accessToken,
            patientToken,
            args: createPcePatientEdArgs
        });
    })
    .then((res) => {
        console.log(`New PCE patientEd successfully created!${NEW_LINES}`);
        patientEd = res.body.created;
        console.log(`${JSON.stringify(patientEd, null, 2)}${NEW_LINES}`);

        const updatePatientEdOptions = {
            accessToken,
            patientToken,
            args: {
                id: patientEd.id,
                topicType: {
                id: '9999999_09-9',
                   label: 'VA-ADVANCE DIRECTIVES SCREENING'
                },
                visit: {id: '9000010-1'},
                comments: 'updated comments',
            },
        };

        return updatePcePatientEd(updatePatientEdOptions);
    }).then((res) => {
        console.log(`PCE patientEd successfully updated!${NEW_LINES}`);
        patientEd = res.body.updated;
        console.log(`${JSON.stringify(patientEd, null, 2)}${NEW_LINES}`);

        return describePcePatientEd({
            accessToken,
            patientToken,
            patientEdId: patientEd.id,
        });
    })
    .then((res) => {
        console.log(`Describe PCE patientEd success!${NEW_LINES}`);
        patientEd = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(patientEd, null, 2)}${NEW_LINES}`);

        return listPcePatientEds({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    })
    .then((res) => {
       console.log(`List PCE patientEds success!${NEW_LINES}`);
       const patientEds = JSON.parse(res.body).results;
       console.log(`${JSON.stringify(patientEds, null, 2)}${NEW_LINES}`);

        return describePcePatientEd({
            accessToken,
            patientToken,
            patientEdId:  patientEd.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();