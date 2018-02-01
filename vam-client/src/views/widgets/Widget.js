import React from 'react';

import View from '~/react-views/View';
import ButtonView from '~/react-views/ButtonView';

import './widget.css';

class Widget extends View {

    render() {

        return (

            <div className="v-Widget">
                <div className="v-WidgetTitle v-DragHandle">
                    {this.props.title}
                        <div className="v-WidgetButtons">
                            {this.renderToolButtons()}
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


    renderToolButtons() {
        return null;
    }


}



export default Widget;
