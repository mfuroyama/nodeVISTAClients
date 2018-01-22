import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import PatientSelectController from "../patientselect/PatientSelectController";
import AppToolbar from './toolbar/AppToolbar';
import Portal from './portal/Portal';

import ActiveProblems from "../widgets/ActiveProblems";

import Allergies from "../widgets/Allergies";
import Vitals from "../widgets/Vitals";
import PatientDemographicsView from "./PatientDemographicsView";

import './style.css';

class AppController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPatient:null
        };
    }

    render() {
        return (
            <div className="desktop">
                <AppToolbar target={this}/>
                <div className="content">
                    <div className="patientInfo">
                        <PatientDemographicsView patient={this.state.selectedPatient} />
                    </div>
                    <Portal ref={e=>this._portal=e}  />
                </div>
                <PatientSelectController
                    action={this.selectPatient.bind(this)}
                    ref={e => this._psController = e}/>
            </div>
        )
    }

    componentDidMount() {

        setTimeout(function(){
           this.showPatientSelectWindow();
        }.bind(this), 250);

    }

    addActiveProblems() {
        this._portal.addWidget(<ActiveProblems />);
    }


    addAllergies() {
        this._portal.addWidget(<Allergies />);
    }


    addVitals() {
        this._portal.addWidget(<Vitals />);
    }


    selectPatient() {

        let patient = this._psController.selectedPatient;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('x-access-token');
        axios.post('/patient/select', 'patientId='+patient.id).then(function(response){
            Cookies.set('x-patient-token', response.headers['x-patient-token']);
            this.setState({
                selectedPatient:patient
            });
        }.bind(this));

        this._psController.orderOut();
    }


    showPatientSelectWindow() {
        this._psController.orderFront();
    }




}

export default AppController;