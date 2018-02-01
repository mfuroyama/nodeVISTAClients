import express from 'express';

import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';


import {PatientsDb} from "./FakeDb";
import request from "request";


const app = express();

app.use(express.json());

app.get('/patients', (req, res) => {

    let searchTerm = req.query.lastName,
        results = filter(PatientsDb, function(item){
        return startsWith(item.lastName, searchTerm);
    });

    res.send(results);
});

app.get('/allergy', (req, res) => {



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
    }).pipe(res);
});


app.listen(5000, () => console.log('Server running at http://localhost:5000'));

