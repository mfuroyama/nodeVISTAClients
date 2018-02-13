import React from 'react';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from "./RecordsCollection";

import PatientState from '~/PatientState';

class Vitals extends TableWidget {

    get tableColumns() {
        return [

            {
                id: 'name',
                name: 'Vital',
                sortable:true
            },
            {
                id: 'value',
                name: 'Value',
                sortable:true
            },
            {
                id: 'units',
                name: 'Units',
                sortable:true
            }
        ];
    }

    renderToolButtons() {
        return [
            <ButtonView className="v-WidgetRefresh" tooltip="Refresh" key={2}
                        iconOnly={true} icon="fa fa-refresh" disabled={PatientState.isNull()}
                        action={this.loadData.bind(this)}  />
        ];

    }
}



Vitals.defaultProps = {
    title: 'Vitals',
    emptyText: 'No data found',
    collection: new RecordsCollection({
        url: '/vitals',
        parse: function(response){
            return response.results;
        },
        record: function(data) {
            if(data.vitalType) {
                data.name = data.vitalType.label;
            }

            return data;
        }
    })
};


export default Vitals;