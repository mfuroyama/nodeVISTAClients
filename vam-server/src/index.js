import express from 'express';
import session from 'express-session';

import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';
import uniqueId from 'lodash/uniqueId';

import {PatientsDb} from "./FakeDb";
import request from "request";


const app = express();

app.use(express.json());
app.use(session({
    secret: '4zkmWtXxOxJc5wuy',
    resave: false,
    saveUninitialized: true
}));

app.get('/patients', (req, res) => {

    let searchTerm = req.query.lastName;
    if(searchTerm) {
        let results = filter(PatientsDb, function(item){
            return startsWith(item.lastName, searchTerm);
        });

        res.send(results);
    }
    else {
        res.send(PatientsDb);
    }


});

app.get('/allergy', (req, res) => {



});


app.post('/patient/select', (req, res) => {

    let session = req.session;

    if(session.id) {
        let patientId = req.body.patientId,
            url = 'http://10.2.2.100:9030/patient/select';
        if(patientId) {
            request.post({
                headers: {
                    'Authorization' : 'Bearer '+session.accessToken
                },
                url: url,
                form: {
                    patientId : patientId
                }
            }, function(err, response){

                if(err) {
                    res.sendStatus(404);
                }

                let headers = response.headers;
                session.selectedPatientToken = headers['x-patient-token'];
                res.sendStatus(200);
            });

            return;
        }
        else {
            res.sendStatus(404);
        }

    }

    res.sendStatus(403);


});


app.post('/auth', (req, res) => {

    let userId = req.body.userId,
        facilityId = req.body.facilityId,
        url = 'http://10.2.2.100:9030/auth';

    request.post({
        url: url,
        form: {
            userId : userId,
            facilityId: facilityId
        }
    }, function(err, response, body){

        if(err){
            res.sendStatus(403);
        }

        let headers = response.headers;
        req.session.accessToken = headers['x-access-token'];
        req.session.refreshToken = headers['x-refresh-token'];
        res.sendStatus(200);

    });

    return;

});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
});

app.listen(5000, () => console.log('Server running at http://localhost:5000'));

