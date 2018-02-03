import React from 'react';

import ButtonView from '~/react-views/ButtonView';

import TableWidget from './TableWidget';
import RecordsCollection from "./RecordsCollection";

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
                name: 'Entered Date'
            }
        ];
    }


    renderToolButtons() {
        return [
            <ButtonView className="v-WidgetRefresh" tooltip="Refresh" key={2}
                        iconOnly={true} icon="fa fa-refresh"
                        action={this.loadData.bind(this)}  />
        ];

    }



}

ActiveProblems.defaultProps = {
    title: 'Active Problems',
    emptyText: 'No Problems Found',
    collection: new RecordsCollection({
        url: '/problem',
        parse: function(data) {
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