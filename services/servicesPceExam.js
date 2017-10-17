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
 * Invokes the clinical service create PCE exam action.
 * @param {Object} options Create PCE exam options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create PCE exam arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create PCE exam MVDM response.
 */
const createPceExam = function createPceExam(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/pce/exam`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create PCE exam request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update PCE exam action.
 * @param {Object} options Update PCE exam options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update PCE exam arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update PCE exam MVDM response.
 */
const updatePceExam = function updatePceExam(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/pce/exam`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update PCE exam request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list PCE exam action.
 * @param {Object} options Update PCE exam options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter PCE exam list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE exam list.
 */
const listPceExams = function listPceExams(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/exam`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list exams request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe PCE exam action.
 * @param {Object} options Update PCE exam options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.examId Exam identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include PCE exam list.
 */
const describePceExam = function describePceExam(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/pce/exam/${options.examId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list PCE exam request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new exam arguments
const createPceExamArgs = {
    examId: {
        id: '9999999_15-9',
        label: 'ABDOMEN EXAM.'
    },
    result: 'NORMAL',
    visit: {
        id: '9000010-1'
    },
    comments: 'comment for ABDOMEN EXAM'
};

/**
 * Run service calls: authenticate -> patientSelect -> createPceExam -> updatePceExam -> listPceExams -> describePceExam
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let exam;

    const NEW_LINES = '\n\n\n';

    authenticate(config.userId, config.facilityId).then((res) => {
        console.log(`Authentication success! Received the access and refresh JWT tokens!${NEW_LINES}`);

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log(`Patient select success! Received a patient JWT token!${NEW_LINES}`);

        patientToken = res.patientToken;

        return createPceExam({
            accessToken,
            patientToken,
            args: createPceExamArgs,
        });
    }).then((res) => {
        console.log(`New PCE exam successfully created!${NEW_LINES}`);
        exam = res.body.created;
        console.log(`${JSON.stringify(exam, null, 2)}${NEW_LINES}`);

        const updateExamOptions = {
            accessToken,
            patientToken,
            args: {
                id: exam.id,
                examStatus: 'INACTIVE',
            },
        };

        return updatePceExam(updateExamOptions);
    }).then((res) => {
        console.log(`PCE exam successfully updated!${NEW_LINES}`);
        exam = res.body.updated;
        console.log(`${JSON.stringify(exam, null, 2)}${NEW_LINES}`);

        return describePceExam({
            accessToken,
            patientToken,
            examId: exam.id,
        });
    }).then((res) => {
        console.log(`Describe PCE exam success!${NEW_LINES}`);
        exam = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(exam, null, 2)}${NEW_LINES}`);

        return listPceExams({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log(`List PCE exams success!${NEW_LINES}`);
        const exams = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(exams, null, 2)}${NEW_LINES}`);

        return describePceExam({
            accessToken,
            patientToken,
            examId: exam.id,
        });
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();