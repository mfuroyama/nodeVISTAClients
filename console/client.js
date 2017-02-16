#!/usr/bin/env node

'use strict';

/**
 * This module demonstrates how to make REST calls to the nodeVISTA clinical service interface.
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
 * Invokes the clinical service create problem action.
 * @param {Object} options Create problem options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Create problem arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include create problem MVDM response.
 */
const createProblem = function createProblem(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${serverURL}/problem`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.CREATED) {
                throw new Error(`There was issue with the create problem request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service update problem action.
 * @param {Object} options Update problem options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {Object} options.args Update problem arguments.
 * @returns {Promise} A promise that handles the REST call response. Will include update problem MVDM response.
 */
const updateProblem = function updateProblem(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'PUT',
            uri: `${serverURL}/problem`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            json: options.args,
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the update problem request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service list problems action.
 * @param {Object} options Update problem options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String=} options.filter Problem list status filter. Possible values: active, inactive, both, removed. Defaults to all.
 * @returns {Promise} A promise that handles the REST call response. Will include problem list.
 */
const listProblems = function listProblems(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/problem`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
            qs: { filter: options.filter },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list problems request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

/**
 * Invokes the clinical service describe problem action.
 * @param {Object} options Update problem options.
 * @param {String} options.accessToken. JWT access token.
 * @param {String} options.patientToken JWT patient token.
 * @param {String} options.problemId Problem identifier to describe.
 * @returns {Promise} A promise that handles the REST call response. Will include problem list.
 */
const describeProblem = function describeProblems(options) {
    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${serverURL}/problem/${options.problemId}`,
            headers: {
                Authorization: `Bearer ${options.accessToken}`,
                'x-patient-token': options.patientToken,
            },
        }, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode !== HttpStatus.OK) {
                throw new Error(`There was issue with the list problems request: ${res.body}`);
            } else {
                resolve(res);
            }
        });
    });
};

// new problem arguments
const createProbDiabetesArgs = {
    diagnosis: '80-521774',
    providerNarrative: 'Diabetes mellitus',
    problemStatus: 'ACTIVE',
    problem: '757_01-7130783',
    clinic: '44-8',
    snomedCTConceptCode: '73211009',
    snomedCTDesignationCode: '121589010',
    codingSystem: '10D',
};

/**
 * Run service calls: authenticate -> patientSelect -> createProblem
 */
function runCalls() {
    let accessToken;
    let refreshToken;
    let patientToken;
    let problem;
    authenticate(config.userId, config.facilityId).then((res) => {
        console.log('Authentication success! Received the access and refresh JWT tokens!\n\n');

        accessToken = res.accessToken;
        refreshToken = res.refreshToken;

        console.log(`accessToken: ${accessToken}\n\n`);
        console.log(`refreshToken: ${refreshToken}\n\n`);

        return patientSelect(accessToken, config.patientId);
    }).then((res) => {
        console.log('Patient select success! Received a patient JWT token!\n\n');

        patientToken = res.patientToken;

        console.log(`patientToken: ${patientToken}\n\n`);

        return createProblem({
            accessToken,
            patientToken,
            args: createProbDiabetesArgs,
        });
    }).then((res) => {
        console.log('New problem successfully created!\n\n');
        problem = res.body.created;
        console.log(`${JSON.stringify(problem, null, 2)}\n\n`);

        const updateProbOptions = {
            accessToken,
            patientToken,
            args: {
                id: problem.id,
                problemStatus: 'INACTIVE',
            },
        };

        return updateProblem(updateProbOptions);
    }).then((res) => {
        console.log('Problem successfully updated!\n\n');
        problem = res.body.updated;
        console.log(`${JSON.stringify(problem, null, 2)}\n\n`);

        return listProblems({
            accessToken,
            patientToken,
            filter: 'inactive',
        });
    }).then((res) => {
        console.log('List problems success!\n\n');
        const problems = JSON.parse(res.body).results;
        console.log(`${JSON.stringify(problems, null, 2)}\n\n`);

        return describeProblem({
            accessToken,
            patientToken,
            problemId: problem.id,
        });
    }).then((res) => {
        console.log('Describe problem success!\n\n');
        const problem = JSON.parse(res.body).result;
        console.log(`${JSON.stringify(problem, null, 2)}\n\n`);
    }).catch((err) => {
        console.log(err);
    });
}

runCalls();


