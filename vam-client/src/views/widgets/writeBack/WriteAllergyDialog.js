import React from 'react';

import WindowPanel from '~/react-views/WindowPanel';
import DeckView from '~/react-views/DeckView';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import ProgressiveListView from '~/react-views/ProgressiveListView';

import './writeAllergy.css';


class AllergyListView extends ProgressiveListView {


    renderItem(item) {

    }


    itemHeight() {
        return 50;
    }



}





class WriteAllergyDialog extends React.Component {

    render() {

        return (


            <WindowPanel
                className="writeAllergyDialog"
                title="Enter New Allergy"
                width={700}
                height={500}
                ref={e => this._window = e}
                modal={true}
            >

                <DeckView>


                    <div className="findCausativeAgentView">

                        <div><b>Enter causative agent for Allergy or Adverse Drug Reaction:</b></div>
                        <p>
                            Enter the first few letters of the causative agent (minimum of 3) to allow
                            for a comprehensive search. Only one reactant maybe be entered at a time.
                        </p>

                        <SearchTextView ref={e => this._searchBox = e}/>
                        <AllergyListView />
                    </div>
                </DeckView>

                <div className="buttonBar">
                    <ButtonView text="Cancel" action={this.orderOut.bind(this)} />
                    <div className="flex" />
                    <ButtonView text="Back" icon="fa fa-chevron-left" disabled={true} />
                    <ButtonView text="Next" type="primary"  />
                </div>


            </WindowPanel>

        );


    }

    orderFront() {
        if(this._window) {
            this._window.dropIn();
            setTimeout(function(){
                if(this._searchBox) { this._searchBox.focused = true; }
            }.bind(this), 0);
        }
    }

    orderOut() {
        if(this._window) {
            this._window.close();
        }
    }

}



export default WriteAllergyDialog;