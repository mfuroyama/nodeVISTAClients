import Cookies from 'js-cookie';
import isNull from 'lodash/isNull';

/**
 *  This singleton class contains the current selected patient.
 *  Use its static methods to access the selected patient
 */
class PatientState {

    constructor(){
        this.token = null;
        this.patient = null;
    }


    isNull() {
        return isNull(this.patient);
    }

    set(config) {

        if(config) {
           this.token = config.token;
           this.patient = config.patient;
        }
        else {
            this.token = null;
            this.patient = null;
        }
    }

    get token() {
        return Cookies.get('x-patient-token');
    }

    set token(tkn) {
        Cookies.set('x-patient-token', tkn);
    }

    get patient() {
        return this._patient;
    }

    set patient(p) {
        this._patient = p;
    }

}

export default new PatientState();