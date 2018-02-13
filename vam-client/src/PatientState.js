import isNull from 'lodash/isNull';
import isFunction from 'lodash/isFunction';
import axios from 'axios'

/**
 *  This singleton class contains the current selected patient.
 *  Use its static methods to access the selected patient
 */
class PatientState {

    constructor(){
        this.patient = null;
    }


    isNull() {
        return isNull(this.patient);
    }

    clear() {
        this.patient = null;
    }

    get patient() {
        return this._patient;
    }

    set patient(p) {
        this._patient = p;
    }

    select(patient, callback) {

        if(patient && patient.id) {
            axios.post('/patient/select', {
                patientId : patient.id
            }).then(function(response){
                this.patient = patient;
                if(isFunction(callback)) {
                    callback.call(this, patient);
                }
            }.bind(this))
                .catch(function(error){
                    if(isFunction(callback)) {
                        callback.call(this, null, error);
                    }
                }.bind(this));
        }
        else {
            this.clear();
            if(isFunction(callback)) {
                callback.call(this, null);
            }
        }


    }

}

export default new PatientState();