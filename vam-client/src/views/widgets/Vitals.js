import React from 'react';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from "./RecordsCollection";

import PatientState from '~/PatientState';
import format from "date-fns/format";

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
                sortable:true,
                formatter: function(value, row ) {
                    return value + (row.units ? ' ' + row.units : '');
                }
            },
            {
                id: 'dateTaken',
                name: 'Date Taken',
                sortable:true,
                formatter: function(value, row) {
                    return format(value, 'MM/DD/YYYY HH:mm')
                }
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

            console.log(data);
            if(data.vitalsTakenDateTime) {
                data.dateTaken = data.vitalsTakenDateTime.value;
            }

            if(data.vitalType) {
                data.name = data.vitalType.label;
            }

            return data;
        }
    })
};


export default Vitals;