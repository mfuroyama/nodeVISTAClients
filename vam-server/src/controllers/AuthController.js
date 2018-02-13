import request from "request";
import {CONSTANTS} from '../config';


exports.loginCheck = function(req, res) {

    let session = req.session;

    if(session.auth) {
        res.redirect('/app');
        return;
    }

    res.redirect('/auth');

};


exports.login = function(req, res) {

    let userId = req.body.userId,
        facilityId = req.body.facilityId,
        url = '/auth';

    let session = req.session;

    request.post({
        url: CONSTANTS.REST_BASE_URL+url,
        form: {
            userId : userId,
            facilityId: facilityId
        }
    }, function(err, response, body){

        if(err){
            res.sendStatus(500);
        }

        if(response) {
            let headers = response.headers;
            session.auth = true;
            session.accessToken = headers['x-access-token'];
            session.refreshToken = headers['x-refresh-token'];

            res.sendStatus(response.statusCode);
        }

    });

    return;

};


exports.logout = function(req, res) {
    req.session.auth = false;
    req.session.destroy();
    res.sendStatus(200);
};