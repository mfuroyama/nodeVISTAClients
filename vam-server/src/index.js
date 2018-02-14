import express from 'express';
import session from 'express-session';

import AuthController from './controllers/AuthController';
import PatientsController from './controllers/PatientsController';
import AllergiesController from "./controllers/AllergiesController";
import ProblemsController from "./controllers/ProblemsController";
import VitalsController from "./controllers/VitalsController";

const app = express();

app.use(express.json());
app.use(session({
    secret: '4zkmWtXxOxJc5wuy',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public', {index:false}));

app.get('/', AuthController.loginCheck);

app.get('/app', function(req,res) {
    res.sendfile('public/index.html');
});

//auth
app.get('/auth', function(req,res) {
    res.sendfile('public/index.html');
});
app.post('/auth', AuthController.login);
app.get('/logout', AuthController.logout);

//patient
app.get('/patients', PatientsController.listPatients);
app.post('/patient/select', PatientsController.selectPatient);


//domains
app.get('/allergy', AllergiesController.listAllergies);
app.post('/allergy', AllergiesController.createAllergy);
app.put('/allergy/remove', AllergiesController.removeAllergy);
app.get('/allergyDetail/:allergyId', AllergiesController.allergyDetails);
app.get('/allergens', AllergiesController.allergenSearch);
app.get('/signsSymptoms', AllergiesController.allergenSignsSymptoms);

app.get('/problem', ProblemsController.listProblems);

app.get('/vitals', VitalsController.listVitals);



app.listen(9050, () => console.log('Server running at http://localhost:9050'));

