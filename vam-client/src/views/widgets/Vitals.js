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
                id: 'abbr',
                name: 'Vital',
                sortable:true,
                width:40
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

            if(data.vitalsTakenDateTime) {
                data.dateTaken = data.vitalsTakenDateTime.value;
            }

            if(data.vitalType) {
                data.name = data.vitalType.label;
            }

            switch (data.name) {
                case 'BLOOD PRESSURE': {
                    data.abbr = 'BP';
                }break;
                case 'TEMPERATURE': {
                    data.abbr = 'T'
                }break;
                case 'RESPIRATION': {
                    data.abbr = 'R'
                }break;
                case 'PULSE': {
                    data.abbr = 'P'
                }break;
                case 'HEIGHT': {
                    data.abbr = 'HT'
                }break;
                case 'WEIGHT': {
                    data.abbr = 'WT'
                }break;
                case 'CENTRAL VENOUS PRESSURE': {
                    data.abbr = 'CVP'
                }break;
                case 'CIRCUMFERENCE_GIRTH': {
                    data.abbr = 'CG'
                }break;
                case 'PULSE OXIMETRY': {
                    data.abbr = 'PO2'
                }break;
                case 'PAIN': {
                    data.abbr = 'PN'
                }break;
                default: {
                    break;
                }
            }

            return data;
        }
    })
};


export default Vitals;