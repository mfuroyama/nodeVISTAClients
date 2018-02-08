import React from 'react';
import axios from 'axios';

import EventResponder from "~/react-views/EventResponder";
import PatientState from '~/PatientState';

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
            selectedPatient: null
        };


        axios.interceptors.response.use(function(response){
                return response;
        }, function(error){

            if(401 === error.response.status){
                window.location = '/auth';
            }

        });



    }


    render() {
        return (
            <div className="desktop">
                <AppToolbar target={this}/>
                <div className="content">
                    <div className="patientInfo">
                        <PatientDemographicsView patient={this.patient} />
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

        PatientState.clear();

        this._portal.setup([

            {
                i: "n0",
                x: 0,
                y: 0,
                w: 4,
                h: 6,
                minW: 3,
                minH: 5,
                widget: <Allergies/>
            },
            {

                i: "n1",
                x: 4,
                y: 0,
                w: 4,
                h: 6,
                minW: 3,
                minH: 5,
                widget: <ActiveProblems/>

            }

        ]);


        setTimeout(function(){
           this.showPatientSelectWindow();
        }.bind(this), 250);
    }

    logout() {
        axios.get('/logout').then(function(){
            window.location = '/auth';
        }.bind(this));
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


    refreshPatientInformation() {
        EventResponder.postNotification('load');
    }

    selectPatient() {

        let patient = this._psController.selectedPatient;

        PatientState.select(patient, function(){
            this.setState({
                selectedPatient: PatientState.patient
            });

            this._psController.orderOut();
            EventResponder.postNotification('load');

        }.bind(this));
    }


    showPatientSelectWindow() {
        this._psController.orderFront();
    }


    get patient() {
        return this.state.selectedPatient;
    }
}

export default AppController;