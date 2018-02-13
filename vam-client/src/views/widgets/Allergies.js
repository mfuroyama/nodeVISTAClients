import React from 'react';
import axios from 'axios';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from './RecordsCollection';

import AllergyDetail from "./AllergyDetail";
import WriteAllergyDialog from "./writeback/allergy/WriteAllergyDialog";
import EventResponder from "~/react-views/src/EventResponder";

import PatientState from '~/PatientState';



class Allergies extends TableWidget {

    get tableColumns() {

        return [
            {
                name: 'Allergy Name',
                id: 'causativeAgent',
                sortable:true,
                width:180,
                formatter: function(value, row) {
                    return <ButtonView text={value}
                                       type="link" action={this._allergyDetail.bind(this,row)}/>
                }.bind(this)
            },

            {

                name: 'Facility',
                id: 'facility',
                sortable:true,
                formatter: function(value, row) {
                    return 'VISTA HEALTH CARE';
                }

            }
        ];
    }


    renderWindows() {
        return [
            <AllergyDetail data={this.state.detail} ref={e => this._detailWindow = e} key={1} />,
            <WriteAllergyDialog ref={e => this._writeDialog = e} key={2} />
         ];

    }

    renderToolButtons() {
        return [
            <ButtonView className="v-WidgetWrite" tooltip="Enter New Allergy" key={1}
                        iconOnly={true} icon="fa fa-pencil"
                        disabled={PatientState.isNull()}
                        action={this._showWriteAllergy.bind(this)}  />,

            <ButtonView className="v-WidgetRefresh" tooltip="Refresh" key={2}
            iconOnly={true} icon="fa fa-refresh" disabled={PatientState.isNull()}
            action={this.loadData.bind(this)}  />
        ];

    }


    _showWriteAllergy() {
        this._writeDialog.orderFront();
    }


    _allergyDetail(data) {

        this.setState({
            detail:null
        });

        this._detailWindow.orderFront();

        setTimeout(function(){
            axios.get('/allergyDetail/'+data.id).then(function(response){
                if(response) {
                    this.setState({
                        detail:response.data
                    });
                }
            }.bind(this));

        }.bind(this), 0);

    }

    didEnterDocument() {
        EventResponder.listenFor('loadAllergy', this, this.loadData);
        super.didEnterDocument();
    }

    didLeaveDocument() {
        EventResponder.removeListener('loadAllergy', this);
        super.didLeaveDocument();
    }

}

Allergies.defaultProps = {
    title: 'Allergies / Adverse Reactions',
    emptyText: 'No Allergy Assessment',
    collection: new RecordsCollection({
        url: '/allergy',
        parse: function(response) {
            return response.results;
        },
        record: function(data) {
            if(data.reactant) {
                data.causativeAgent = data.reactant.label.replace('_', '/');
            }

            data.hasComments = data.comments || data.removalDetails;

            if(data.enteredAtFacility) {
                data.facility = data.enteredAtFacility.id;
            }

            return data;
        }


    })
};


export default Allergies;