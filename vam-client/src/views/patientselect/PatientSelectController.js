import React from 'react';
import uniqueId from 'lodash/uniqueId';
import filter from 'lodash/filter';
import startsWith from 'lodash/startsWith';

import format from 'date-fns/format';
import axios from 'axios';

import WindowPanel from '~/react-views/WindowPanel';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import ProgressiveListView from '~/react-views/ProgressiveListView';
import RadioView from '~/react-views/RadioView';
import TableView, {ColumnResizePolicy} from "~/react-views/TableView";

import './style.css';

class PatientListView extends ProgressiveListView {


    static radioName = uniqueId("ps");

    itemHeight() {
        return 35;
    }

    renderItem(data) {
        return  (
            <div className="patientItem">
                <RadioView name={PatientListView.radioName}
                    action={this.props.onSelect.bind(this, data)}
                           text={data.lastName +", " + data.firstName} />
            </div>
        )
    }

}




class PatientSelectController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPatient:null,
            checkedRadio:null,
            patients: []
        };


        this.searchForPatients();
    }

    render() {

        let patientInfo = null,
            demographics = this.state.selectedPatient;

        if(demographics){

            patientInfo = <div className="demographics">
                <div className="heading">Patient Demographics</div>
                <table>
                    <tbody>
                        <tr><td colSpan={2}><b>{demographics.lastName}, {demographics.firstName}</b></td></tr>
                        <tr><td>SSN:</td><td>{demographics.ssn}</td></tr>
                        <tr><td>DOB:</td><td>{format(demographics.dob, 'MMMM DD, YYYY')}</td></tr>
                        <tr><td>{demographics.gender}</td></tr>
                        <tr><td>Veteran</td></tr>
                    </tbody>
                </table>
            </div>
        }


        return (

            <WindowPanel title="Patient Selection"
                         width={670}
                         height={460}
                         minSize={{width:670, height:460}}
                         modal={true}
                         ref={(e)=> this._window = e}
                         className="patientSelectWindow">

                <div className="content">
                    <div className="top">
                        <div className="patientSelect">
                            <SearchTextView placeholder="Patient Search"
                                            textDidChange={this.onLiveSearch.bind(this)}
                                            ref={e => this._patientSearch = e} />
                            <div className="patientList">
                                <PatientListView
                                    contentDidChange={this.patientListContentChanged.bind(this)}
                                    content={this.state.visiblePatients}
                                    onSelect={this._onPatientSelect.bind(this)}
                                    ref={(e)=> this._patientList = e}/>
                            </div>
                        </div>
                        {patientInfo}
                    </div>

                    <div className="confirmBtns">
                        <ButtonView text="OK" type="primary" action={this.props.action} />
                        <ButtonView text="Cancel" action={this.orderOut.bind(this)}  />
                    </div>
                </div>

            </WindowPanel>

        )
    }


    onLiveSearch(sender) {

        let value = sender.value;

        this.setState({
            visiblePatients: filter(this.state.patients, function(patient){
                return startsWith(patient.lastName.toUpperCase(), value.toUpperCase());
            })
        });

    }

    patientListContentChanged() {

        var el = document.getElementsByName(PatientListView.radioName),
            len = el.length,
            i = 0;
        for(; i < len; i++) {
            el[i].checked = false;
        }

        this.setState({
            selectedPatient:null
        });

    }


    searchForPatients() {

        if(this._patientList) {
            this._patientList.setState({
                loading:true
            });
        }

        axios.get('/patients', {headers: { Pragma: 'no-cache'}}).then(function(response){

            if(this._patientList) {
                this._patientList.setState({
                    loading:false
                });
            }
            if(response) {
                this.setState({
                    patients: response.data,
                    visiblePatients: response.data
                });
            }



        }.bind(this));
    }

    get selectedPatient() {
        return this.state.selectedPatient;
    }

    orderFront() {
        if(this._window) {
            this._window.dropIn();
        }

        this.setState({
            selectedPatient:null
        });
    }

    orderOut() {
        if(this._window){
            this._window.close();
        }
    }



    _onPatientSelect(data, sender) {

        this.setState({
            selectedPatient: data
        });
    }

}



export default PatientSelectController;