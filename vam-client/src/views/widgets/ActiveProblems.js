import React from 'react';
import format from 'date-fns/format';
import filter from 'lodash/filter';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from "./RecordsCollection";

import PatientState from '~/PatientState';

class ActiveProblems extends TableWidget {


    get tableColumns() {
        return [

            {
                id: 'name',
                name: 'Problem',
                sortable:true
            },

            {
                id: 'enteredDateValue',
                name: 'Entered Date',
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

ActiveProblems.defaultProps = {
    title: 'Active Problems',
    emptyText: 'No Problems Found',
    collection: new RecordsCollection({
        url: '/problem',
        parse: function(response){
            return filter(response.results, function(result){
                return result.problemStatus !== 'INACTIVE';
            });
        },
        record: function(data) {
            if(data.problem) {
                data.name = data.problem.label;
            }
            if(data.enteredDate) {
                data.enteredDateValue = data.enteredDate.value;
            }
            return data;
        }
    })
};


export default ActiveProblems;