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
 * Invokes the clinical service create PCE skin test action.
 * @param {Object} options Create PCE skin test options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE skin test arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE skin test MVDM response.
 */
const createPceSkin = function createPceSkin(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/skin`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE skin test request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE skin test action.
 * @param {Object} options Update PCE skin test options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE skin test arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE skin test MVDM response.
 */
const updatePceSkin = function updatePceSkin(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/skin`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE skin test request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE skin test action.
 * @param {Object} options Update PCE skin test options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE skin test list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE skin test list.
 */
const listPceSkins = function listPceSkins(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/skin`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list skin tests request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE skin test action.
 * @param {Object} options Update PCE skin test options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.skin testId skin test identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE skin test list.
 */
const describePceSkin = function describePceSkin(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/skin/${options.skinId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE skin test request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new skin test arguments
const createPceSkinArgs = {
    skinTestType: {
        id: '9999999_28-7',
        // label: 'CANDIDA',
        // sameAs: 'vuid:5198079'
    },
    results: 'POSITIVE',
    visit: {
        id: '9000010-1'
    },
    reading: 1,
    comments: 'comment for skin test'

};

/**
 * Run service calls: authenticate -> patientSelect -> createPceSkin -> updatePceSkin -> listPceSkins -> describePceSkin
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

        return createPceSkin({
            accessToken,
            patientToken,
            args: createPceSkinArgs,
        });
    }).then((res) => {
        console.log(`New PCE skin test successfully created!${NEW_LINES}`);
        skin = res.body.created;
        console.log(`${JSON.stringify(skin, null, 2)}${NEW_LINES}`);

        const updateSkinOptions = {
            accessToken,
            patientToken,
            args: {
                id: skin.id,
                skinTestType: {
                    id: '9999999_28-7',
                    label: 'CANDIDA',
                    sameAs: 'vuid:5198079'
                },
                results: 'NEGATIVE',
                visit: {
                    id: '9000010-1'
                },
                reading: 1,
                comments: 'updated comments'

            },
        };

        return updatePceSkin(updateSkinOptions);
    }).then((res) => {
        console.log(`PCE skin test successfully updated!${NEW_LINES}`);
        skin = res.body.updated;
        console.log(`${JSON.stringify(skin, null, 2)}${NEW_LINES}`);

        return describePceSkin({
            accessToken,
            patientToken,
            skinId: skin.id,
        });
    }).then((res) => {
        console.log(`Describe PCE skin test success!${NEW_LINES}`);
        skin = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(skin, null, 2)}${NEW_LINES}`);

        return listPceSkins({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE skin tests success!${NEW_LINES}`);
        const skins = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(skins, null, 2)}${NEW_LINES}`);

        return describePceSkin({
            accessToken,
            patientToken,
            skinId: skin.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();