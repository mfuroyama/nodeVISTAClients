import React from "react";

import PaginatedTableView from "./PaginatedTableView";
import Pager from "./Pager";

let testData = [],
    i = 0;

for(; i < 100; i++) {
    testData.push({
        name: 'JohnDoe'+i,
        age: i,
        score: Math.ceil(Math.random()*50),
        height: Math.ceil(Math.random()*10)
    })
}

class TableViewTest extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: testData
        }
    }

    render(){
        return (
            <div style={{height:'100%'}}>
                <PaginatedTableView className="tabletest"
                    recordsPerPage={25}
                    ref={(e)=>this._table = e}
                    columns={[
                        {
                            name: 'Name',
                            id: 'name',
                            width:150,
                            resizable:true,
                            sortable:true,
                            formatter: function(value, data) {
                                return (<b>{value}</b>)
                            }

                        },
                        {
                            name: 'Age',
                            id: 'age',
                            width:150,
                            resizable:true,
                            sortable:true
                        },
                        {
                            name: 'Score',
                            id: 'score',
                            width:150,
                            resizable:true,
                            sortable:true
                        },
                        {
                            name: 'Height',
                            id: 'height',
                            width:150,
                            resizable:true,
                            sortable:true
                        }

                    ]}
                    data={this.state.data} />
                <Pager />
            </div>
        )
    }

    componentDidMount() {

        //this._table.page = 1;

    }


}

export default TableViewTest;