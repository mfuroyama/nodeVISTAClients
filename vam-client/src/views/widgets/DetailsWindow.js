import React from 'react';

import WindowPanel from '~/react-views/WindowPanel';
import ButtonView from '~/react-views/ButtonView';


class DetailsWindow extends WindowPanel {


    get toolButtons() {

        return [
             <ButtonView
                 className="v-WindowPanel-toolBtn"
                 key={1}
                 action={this.props.onPrint}
                 tooltip="Print"
                 iconOnly={true} icon="fa fa-print" />,

             <ButtonView
                 className="v-WindowPanel-toolBtn"
                 key={2}
                 action={this.props.onEnteredInError}
                 tooltip="Entered in Error"
                 iconOnly={true} icon="fa fa-exclamation-triangle" />
         ];

    }




}


export default DetailsWindow;