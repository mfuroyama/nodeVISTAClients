import React from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import reject from 'lodash/reject';

import View from '~/react-views/View';
import EventResponder from "~/react-views/EventResponder";

import './portal.css';


const ReactGridLayout = WidthProvider(RGL);


class Portal extends View {

    constructor(props) {
        super(props);

        Object.assign(this.state, {
            items : [],
            newCounter: 0
        })
    }

    render() {

        return (
            <div className="v-Portal">
                <ReactGridLayout className="layout"
                                 cols={12}
                                 containerPadding={[25,15]}
                                 margin={[15,15]}
                                 rowHeight={30}
                                 draggableHandle=".v-DragHandle"
                                 onResizeStop={()=> {
                                     setTimeout(function(){
                                         EventResponder.postNotification('resize');
                                         EventResponder.postNotification('resizeFinish');
                                     }, 0);
                                 }}
                >

                    {this.state.items.map( e => {
                        return this._createElement(e)
                    })}

                </ReactGridLayout>
            </div>
        );

    }

    _createElement(config) {
        const i = config.add ? "+" : config.i;
        return (
            <div className="v-Portlet" key={i} data-grid={config}>
                {React.cloneElement(config.widget, {
                    closeAction: this.removeWidget.bind(this, i)
                })}
            </div>
        );
    }

    removeWidget(index) {
        this.setState({
            items: reject(this.state.items, {i : index})
        })
    }

    addWidget(w) {

        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: "n" + this.state.newCounter,
                x: 0,
                y: 0,
                w: 4,
                h: 6,
                minW: 3,
                minH: 5,
                widget: w

            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 4
        });
    }
}


export default Portal;