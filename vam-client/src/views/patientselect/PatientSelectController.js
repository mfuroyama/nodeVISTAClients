import React from 'react';
import uniqueId from 'lodash/uniqueId';

import View from '~/react-views/View';
import WindowPanel from '~/react-views/WindowPanel';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import ProgressiveListView from '~/react-views/ProgressiveListView';
import RadioView from '~/react-views/RadioView';
import TableView from "~/react-views/TableView";

import './style.css';




let patientDb = [

    {
        firstName: "David",
        lastName: "Carter",
        ssn:"000-00-0113",
        dob:"March 02, 1981",
        gender:"Male"
    },

    {
        firstName: "Patient",
        lastName: "Eight",
        ssn:"655-44-7777",
        dob:"April 01, 1933",
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
                <h5>Patient Demographics</h5>
                <table>
                    <tr><td colSpan={2}><b>{demographics.lastName}, {demographics.firstName}</b></td></tr>
                    <tr><td>SSN:</td><td>{demographics.ssn}</td></tr>
                    <tr><td>DOB:</td><td>{demographics.dob}</td></tr>
                    <tr><td>{demographics.gender}</td></tr>
                    <tr><td>Veteran</td></tr>
                </table>
            </div>
        }


        return (

            <WindowPanel title="Patient Selection"
                         width={760}
                         minSize={{width:740, height:500}}
                         height={580}
                         modal={true}
                         ref={(e)=> this._window = e}
                         className="patientSelectWindow">


                <div className="content">
                    <div className="top">
                        <div className="patientSelect">
                            <SearchTextView placeholder="Patient Search" />
                            <div className="patientList">
                                <PatientListView onSelect={this.onPatientSelect.bind(this)}
                                    ref={(e)=> this._patientList = e}/>
                            </div>
                        </div>

                        {patientInfo}
                    </div>

                    <div className="bottom">
                        <div className="notificationsLabel">Notifications</div>
                        <TableView columns={[
                            {
                                name: 'Info',
                                resizable:true,
                                width:70
                            },
                            {
                                name: 'Patient',
                                resizable:true,
                                width:130
                            },
                            {
                                name: 'Location',
                                resizable:true,
                                width:130
                            },
                            {
                                name: 'Alert Date/Time',
                                resizable:true,
                                width:185
                            },
                            {
                                name: 'Message',
                                resizable:true,
                                width:210
                            },



                        ]}
                        emptyText="No Notifications"
                        className="notificationsTable"/>

                        <div className="bottomBtns">
                            <ButtonView text="Process Info"/>
                            <ButtonView text="Process All"/>
                            <ButtonView text="Process" disabled={true}/>
                            <ButtonView text="Forward" disabled={true}/>
                            <ButtonView text="Show Comments" disabled={true}/>
                            <ButtonView text="Remove" disabled={true}/>
                        </div>

                    </div>

                    <div className="confirmBtns">
                        <ButtonView text="OK" type="primary" />
                        <ButtonView text="Cancel" action={this.orderOut.bind(this)}  />
                    </div>
                </div>

            </WindowPanel>

        )
    }

    orderFront() {
        if(this._window) {
            this._window.dropIn();
        }

        this.setState({
            selectedPatient:null
        });

        this._patientList.content = patientDb;


    }

    orderOut() {
        if(this._window){
            this._window.close();
        }
    }

    onPatientSelect(sender) {
        this.setState({
            selectedPatient: sender.props.data
        });

    }

}



export default PatientSelectController;