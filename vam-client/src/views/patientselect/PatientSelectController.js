import React from 'react';
import uniqueId from 'lodash/uniqueId';
import format from 'date-fns/format';

import WindowPanel from '~/react-views/WindowPanel';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import ProgressiveListView from '~/react-views/ProgressiveListView';
import RadioView from '~/react-views/RadioView';
import TableView, {ColumnResizePolicy} from "~/react-views/TableView";

import './style.css';



//temp hardcoded patients
let patientDb = [

    {
        id: '2-25',
        firstName: "David",
        lastName: "Carter",
        ssn:"000-00-0113",
        dob:new Date(1981, 3, 2),
        gender:"Male"
    },

    {

        id: '2-17',
        firstName: "Patient",
        lastName: "Eight",
        ssn:"655-44-7777",
        dob:new Date(1933, 4, 1),
        gender:"Male"

    }

];


class PatientListView extends ProgressiveListView {


    static radioName = uniqueId("ps");

    itemHeight() {
        return 35;
    }

    renderItem(data) {
        return  (
            <div className="patientItem">
                <RadioView name={PatientListView.radioName}
                    action={this.props.onSelect} data={data}
                           text={data.lastName +", " + data.firstName} />
            </div>
        )
    }

}




class PatientSelectController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedPatient:null
        };
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
                            <SearchTextView placeholder="Patient Search" ref={e => this._patientSearch = e} />
                            <div className="patientList">
                                <PatientListView onSelect={this._onPatientSelect.bind(this)}
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

        this._patientList.content = patientDb;
        this._patientSearch.focused = true;


    }

    orderOut() {
        if(this._window){
            this._window.close();
        }
    }



    _onPatientSelect(sender) {

        this.setState({
            selectedPatient: sender.props.data
        });

    }

}



export default PatientSelectController;