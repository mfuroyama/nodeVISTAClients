import React from 'react';

import View from '~/react-views/View';
import ButtonView from '~/react-views/ButtonView';

import './widget.css';
import axios from "axios/index";
import Cookies from "js-cookie";

class Widget extends View {

    render() {

        return (

            <div className="v-Widget">
                <div className="v-WidgetTitle v-DragHandle">
                    {this.props.title}
                        <div className="v-WidgetButtons">
                            <ButtonView className="v-WidgetWrite" tooltip="Write" iconOnly={true} icon="fa fa-pencil"  />
                            <ButtonView className="v-WidgetClose" iconOnly={true} icon="fa fa-close" action={this.props.closeAction} />
                        </div>
                    </div>
                {this.renderContent()}
            </div>

        )
    }


    renderContent() {
        return null;
    }


    setupRequest() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('x-access-token');
        axios.defaults.headers.common['x-patient-token'] = Cookies.get('x-patient-token');
    }

}


export default Widget;
