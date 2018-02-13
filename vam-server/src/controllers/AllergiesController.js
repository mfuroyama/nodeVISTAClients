import request from "request";
import {CONSTANTS} from '../config';
import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';

import Handlebars from 'handlebars';
import format from 'date-fns/format';

import {AllergiesDb, SignSymptoms} from "../FakeDb";


exports.createAllergy = function(req, res) {

    let session = req.session;

    if(session.auth) {
        let url = '/allergy';
        if(session.patToken) {
            request.post({
                headers: {
                    'Authorization' : 'Bearer '+ session.accessToken,
                    'x-patient-token' : session.patToken,
                    'Content-Type': 'application/json'
                },
                url: CONSTANTS.REST_BASE_URL+url,
                json : Object.assign(req.body, {
                    "allergySeverity": 'MODERATE'
                })
            }, function(err, response, body){
                if(err) {
                    res.sendStatus(500);
                }

                if(body) {
                    res.send(body);
                }
            });

            return;
        }
    }

    res.sendStatus(401);

};

exports.removeAllergy = function(req, res) {

    let session = req.session;

    if(session.auth) {
        let url = '/allergy/remove';
        if(session.patToken) {
            request.put({
                headers: {
                    'Authorization' : 'Bearer '+ session.accessToken,
                    'x-patient-token' : session.patToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: CONSTANTS.REST_BASE_URL+url,
                form: {
                    id: req.body.id,
                    comment: req.body.comment
                }
            }, function(err, response, body){
                if(err) {
                    res.sendStatus(500);
                }

                console.log(body);

                if(body) {
                    res.send(body);
                }
            });

            return;
        }
    }

    res.sendStatus(401);

};


exports.listAllergies = function(req, res) {

    let session = req.session;

    if(session.auth) {
        let url = '/allergy/';
        if(session.patToken) {

            request.get({
                headers: {
                    'Authorization' : 'Bearer '+ session.accessToken,
                    'x-patient-token' : session.patToken
                },
                url: CONSTANTS.REST_BASE_URL+url,
            }, function(err, response, body){
                if(err) {
                    res.sendStatus(500);
                }

                if(body) {
                    res.send(body);
                }


            });

            return;

        }
    }

    res.sendStatus(401);
};

exports.allergenSearch = function(req, res) {

    if(req.session.auth) {
        let searchTerm = req.query.query;
        if(searchTerm) {

            let results = {};

            for(var idx in AllergiesDb) {

                let cat = AllergiesDb[idx];
                results[cat.fileName] = filter(cat.reactants, function(item){
                    return startsWith(item.label.toUpperCase(), searchTerm.toUpperCase());
                });
            }


            res.send(results);
        }
        else {
            res.send({});
        }
        return;
    }

    res.sendStatus(401);
};


exports.allergenSignsSymptoms = function(req, res) {

    if(req.session.auth) {
        res.send(SignSymptoms);
        return;
    }

    res.sendStatus(401)
};

exports.allergyDetails = function(req, res) {

    let session = req.session;

    if(session.auth) {
        let url = '/allergy/';
        if(session.patToken) {

            request.get({
                headers: {
                    'Authorization' : 'Bearer '+ session.accessToken,
                    'x-patient-token' : session.patToken
                },
                url: CONSTANTS.REST_BASE_URL+url + req.params.allergyId,
            }, function(err, response, body){
                if(err) {
                    res.sendStatus(500);
                }
                if(body) {
                    let allergy = JSON.parse(body).result;
                    res.send({
                        allergy:allergy,
                        detail: AllergyDetails.returnValue(allergy)
                    });

                }
            });

            return;

        }
    }

    res.sendStatus(401);

};

let AllergyDetails =  {

    template : function() {
        return [
            '    Causative agent: {{causativeAgent}}',
            ' Nature of Reaction: {{natureOfReaction}}',
            ' ',
            '{{#if reactions}}',
            '     Signs/symptoms: {{signsAndSymptoms}}',
            ' ',
            '{{/if}}',
            '{{#if reactantDetails.drugClasses}}',
            '       Drug Classes: {{drugClasses}}',
            ' ',
            '{{/if}}',
            '         Originator: {{toUpperCase enteredBy}}',
            '         Originated: {{originated dateTimeEntered}}',
            '{{#if dateOccurred}}',
            ' Obs dates/severity: {{obsDates}}',
            ' ',
            '{{/if}}',
            '           Verified: <auto-verified>', // hard coded
            'Observed/Historical: {{toTitleCase observedOrHistorical}}',
            '{{#if hasComments}}',
            ' ',
            'Comments:',
            '{{#if comments}}',
            '{{#each comments as |comment|}}',
            '   {{commentTimestamp dateTimeEntered}} by ORIGINATOR',
            '{{comment.comment}}',
            '{{/each}}',
            '{{else}}',
            '{{#if removalDetails}}',
            '   {{commentTimestamp removalDetails.dateTimeEntered}} by ORIGINATOR',
            '{{removalDetails.comment}}',
            '{{/if}}',
            '{{/if}}',
            ' ',
            '{{/if}}',
        ];

    },

    returnValue: function(allergy) {

        allergy.hasComments = allergy.comments || allergy.removalDetails;

        Handlebars.registerHelper('causativeAgent', function(){
            return this.reactant.label.replace('_', '/');
        });

        Handlebars.registerHelper('toUpperCase', function(val){
            if (val && val.label) {
                return val.label.toUpperCase();
            }

            return val.toUpperCase();
        });

        Handlebars.registerHelper('toTitleCase',function(str) {
            return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        });

        Handlebars.registerHelper('natureOfReaction', function () {
            const mechanismMap = new Map([['ALLERGY',
                'Allergy'],
                ['PHARMACOLOGIC',
                    'Adverse Reaction'],
                ['UNKNOWN',
                    'Unknown']]);
            return mechanismMap.get(this.mechanism);
        });

        Handlebars.registerHelper('natureOfReaction', function () {
            const mechanismMap = new Map([['ALLERGY',
                'Allergy'],
                ['PHARMACOLOGIC',
                    'Adverse Reaction'],
                ['UNKNOWN',
                    'Unknown']]);
            return mechanismMap.get(this.mechanism);
        });

        Handlebars.registerHelper('signsAndSymptoms', function () {

            const reactions = this.reactions;

            let line = 0;
            const result = reactions.map((reactionDetail) => {
                let output = reactionDetail.reaction.label;

                if (reactionDetail.dateTimeOccurred) {
                    const enteredTimeFormed = format(reactionDetail.dateTimeOccurred.value, 'M/D/YY@HH:mm');
                    output += ` (${enteredTimeFormed})`;
                }

                if (line > 0) {
                    output = new Array('     Signs/symptoms: '.length + 1).join(' ') + output;
                }

                line += 1;

                return output;
            });

            return result.join('\r\n');
        });

        Handlebars.registerHelper('drugClasses', function () {
            // classes have CODE [LABEL] and just want LABEL
            return this.reactantDetails.drugClasses.map(dc => dc.label.split('[')[1].slice(0, -1)).join('\r\n');
        });

        Handlebars.registerHelper('originated', function () {
            return format(this.dateTimeEntered.value, 'MMM DD, YYYY@HH:mm:ss');
        });

        Handlebars.registerHelper('obsDates', function () {
            let output = format(this.dateOccurred.value, 'MMM DD, YYYY').toUpperCase();

            if (this.allergySeverity) {
                output += ` ${this.allergySeverity}`;
            }

            return output;
        });

        Handlebars.registerHelper('commentTimestamp', dateTime => format(dateTime.value, 'MMM DD, YYYY@HH:mm').toUpperCase());

        return Handlebars.compile(this.template().join('\r\n'))(allergy);
    }

};

