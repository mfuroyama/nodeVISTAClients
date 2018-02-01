import React from 'react';
import isFunction from 'lodash/isFunction';

import PaginatedTableView from '~/react-views/PaginatedTableView';
import {ColumnResizePolicy} from "~/react-views/TableView";
import Pager from '~/react-views/Pager';
import Widget from './Widget';
import PatientState from '~/PatientState';
import EventResponder from "../../react-views/src/EventResponder";

/**
 *  A widget that contains a Table as the central component
 */
class TableWidget extends Widget {

    constructor(props) {
        super(props);

        Object.assign(this.state, {
            detail : null,
            recordCount: 0,
            startRecord:0,
            endRecord:0,
            collection: props.collection,
            patientToken: null
        });


    }

    renderContent() {

        return (

            <div className="v-WidgetContent">
                <PaginatedTableView emptyText={PatientState.patient ? this.props.emptyText : 'No Patient Selected'}
                                    recordsPerPage={50}
                                    fitColumns={true}
                                    headerAlign="left"
                                    columnResizePolicy={ColumnResizePolicy.UNIFORM}
                                    columns={this.tableColumns}
                                    ref={e => this._table = e} className="v-WidgetTable"/>
                <div className="v-WidgetFooter">
                    <Pager table={() => this._table } onPageChange={this._updateDisplayInfo.bind(this)} buttonCount={4} />
                    <div className="displayInfo">Displaying {this.state.startRecord}-{this.state.endRecord} of {this.state.recordCount}</div>
                </div>

                {this.renderWindows()}

            </div>
        )
    }

    renderWindows() {
        return null;
    }

    /**
     * Override to configure the table columns
     * @returns {Array}
     */

    get tableColumns() {
        return [];
    }

    get data() {
        return this.state.collection;
    }

    set data(data) {
       this.state.collection = data;
    }

    loadData(callback) {

        if(this.state.collection && !PatientState.isNull()) {

            this.setState({
                startRecord:0,
                endRecord:0,
                recordCount:0
            });

            this._table.setState({
                loading:true
            });

            this.state.collection.fetch(function(data){
                this._table.data = data;

                this._updateDisplayInfo(0);

                if(isFunction(callback)){
                    callback.call(this, data);
                }

                this._table.setState({
                    loading:false
                });

            }.bind(this));
        }
    }

    _updateDisplayInfo(page) {
        let s = page*25;
        this.setState({
            startRecord:Math.min(s+1,this._table.data.length),
            endRecord:Math.min(s+25, this._table.data.length),
            recordCount:this._table.data.length
        });
    }

    didEnterDocument() {
        EventResponder.listenFor('load', this, this.loadData);
        this.loadData();
    }

    didLeaveDocument() {
        EventResponder.removeListener('load', this);
    }

}



export default TableWidget;