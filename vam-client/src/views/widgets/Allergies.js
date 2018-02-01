import React from 'react';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from './RecordsCollection';

import AllergyDetail from "./AllergyDetail";
import WriteAllergyDialog from "./writeBack/WriteAllergyDialog";





// let fakeData = []
//
//
// for(var i = 0; i <40; i++) {
//     fakeData = fakeData.concat([{
//         reactant: { label: 'Pencillin'}
//     },
//         {
//             reactant: { label: 'Chocolate'}
//         },
//         {
//             reactant: { label: 'Nuts'}
//         },
//         {
//             reactant: { label: 'Butter'}
//         }])
// }


class Allergies extends TableWidget {


    get tableColumns() {

        return [
            {
                name: 'Allergy Name',
                id: 'causativeAgent',
                sortable:true,
                width:225,
                formatter: function(value, row) {
                    return <ButtonView text={value}
                                       type="link" action={this._allergyDetail.bind(this,row)}/>
                }.bind(this)
            },

            {

                name: 'Facility',
                id: 'facility',
                sortable:true

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
                        action={this._showWriteAllergy.bind(this)}  />,

            <ButtonView className="v-WidgetRefresh" tooltip="Refresh" key={2}
            iconOnly={true} icon="fa fa-refresh"
            action={this.loadData.bind(this)}  />
        ];

    }


    _showWriteAllergy() {
        this._writeDialog.orderFront();
    }


    _allergyDetail(data) {

        this.setState({
            detail:data
        });
        setTimeout(function(){
            this._detailWindow.orderFront();
        }.bind(this), 0);

    }

}

Allergies.defaultProps = {
    title: 'Allergies / Adverse Reactions',
    emptyText: 'No Allergy Assessment',
    collection: new RecordsCollection({
        url: '/allergy',
        parse: function(data) {
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