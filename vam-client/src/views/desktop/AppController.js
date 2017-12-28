import React from 'react';

import PatientSelectController from "../patientselect/PatientSelectController";
import AppToolbar from './toolbar/AppToolbar';

import './style.css';

class AppController extends React.Component {

    render() {
        return (
            <div className="desktop">
                <AppToolbar target={this}/>
                <PatientSelectController ref={(e) => this._patientSelect = e}/>
            </div>
        )
    }

    componentDidMount() {
        setTimeout(function(){
            this.showPatientSelectWindow();
        }.bind(this), 250);
    }

    showPatientSelectWindow() {
        this._patientSelect.orderFront();
    }

}

export default AppController;