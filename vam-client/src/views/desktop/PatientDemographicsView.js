import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import differenceInYears from 'date-fns/difference_in_years';

import Control from '~/react-views/Control';

import './demographics.css';

class PatientDemographicsView extends Control {
    render() {

        let patient = this.props.patient;
        if(patient) {

            return (
                <div className={this.className}>
                    <div className="patientName">{patient.lastName}, {patient.firstName}</div>
                    <div className="patientStats">
                        <div className="patientSSN">{patient.ssn}</div>
                        <div className="patientDOB">{format(patient.dob, 'MMMM DD, YYYY')} ({differenceInYears(new Date(),patient.dob)})</div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={this.className}>
                    <div className="noPatient">No patient selected.</div>
                </div>
            )
        }

    }



    mouseDown(e) {
        if(this.props.patient) {
            e.preventDefault();

            this.el.removeEventListener('mouseup', this.mouseUp);
            document.addEventListener('mouseup', this.mouseUp, false);

            this.setState({
                active:true
            });
        }

    }

    mouseUp() {

        //release the mouse up
        this.el.addEventListener('mouseup', this.mouseUp);
        document.removeEventListener('mouseup', this.mouseUp, false);

        this.setState({
            active:false
        })
    }


    get className() {
        return classNames('v-PatientDemographics', {
            'hasPatient' : this.props.patient,
            'is-active' : this.state.active
        }, super.className);
    }


}



export default PatientDemographicsView;