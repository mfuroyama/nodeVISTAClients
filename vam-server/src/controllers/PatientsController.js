import request from "request";
import {CONSTANTS} from '../config';
import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';




import {PatientsDb} from "../FakeDb";


exports.listPatients = function(req, res) {

    if(req.session.auth) {
        let searchTerm = req.query.lastName;
        if(searchTerm) {
            let results = filter(PatientsDb, function(item){
                return startsWith(item.lastName ? item.lastName.toUpperCase() : '', searchTerm.toUpperCase());
            });

            res.send(results);
        }
        else {
            res.send(PatientsDb);
        }

        return;
    }

    res.sendStatus(401);

};


exports.selectPatient = function(req, res) {

    let session = req.session;
    if(session.auth) {
        let patientId = req.body.patientId,
            url = '/patient/select';
        if(patientId) {
            request.post({
                headers: {
                    'Authorization' : 'Bearer '+ session.accessToken
                },
                url: CONSTANTS.REST_BASE_URL+url,
                form: {
                    patientId : patientId
                }
            }, function(err, response){

                if(err) {
                    res.sendStatus(500);
                }

                if(response) {
                    let headers = response.headers;
                    session.patToken = headers['x-patient-token'];
                    res.sendStatus(response.statusCode);
                }


            });

            return;
        }
        else {
            res.sendStatus(404);
        }

    }

    res.sendStatus(401);
}