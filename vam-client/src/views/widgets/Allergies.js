import React from 'react';
import axios from 'axios';


import PaginatedTableView from '~/react-views/PaginatedTableView';
import {ColumnResizePolicy} from "~/react-views/TableView";
import Pager from '~/react-views/Pager';

import AllergyDetail from './AllergyDetail';
import Widget from './Widget';


class Allergies extends Widget {

    constructor(props) {
        super(props);

        Object.assign(this.state, {
            detail : null
        });
    }

    renderContent() {

        let detail = this.state.detail;

        return (

            <div className="v-WidgetContent">
                <PaginatedTableView emptyText="No Allergy Assessment"
                                    hasHeader={false}
                                    fitColumns={true}
                                    columnResizePolicy={ColumnResizePolicy.LAST_COLUMN}
                                    columns={[

                                        {
                                            id: 'reactant',
                                            formatter: function(value, row) {
                                                return <a href="#" onClick={this._allergyDetail.bind(this, row)}>{value.label}</a>;
                                            }.bind(this)
                                        }


                                    ]}
                    ref={e => this._table = e} className="v-WidgetTable"/>
                <div className="v-WidgetFooter">
                    <Pager table={() => this._table } />

                </div>

                <AllergyDetail ref={e => this._detailWindow = e} data={this.state.detail}/>

            </div>
        )
    }

    _allergyDetail(data) {

        this.setupRequest();
        axios.get('/allergy/'+data.id).then(function(response){

            this.setState({
                detail:response.data.result
            });
            console.log(this.state.detail);

            setTimeout(function(){
                this._detailWindow.orderFront();
            }.bind(this), 0);


        }.bind(this))





    }

    didEnterDocument() {
        //fetch the allergies list
        this.setupRequest();
        axios.get('/allergy').then(function(response){
            let data = response.data;
            if(data.results) {
                console.log(data.results)
                this._table.data = data.results;
            }
        }.bind(this));
    }


}

Allergies.defaultProps = {
    title: 'Allergies / Adverse Reactions'
};


export default Allergies;