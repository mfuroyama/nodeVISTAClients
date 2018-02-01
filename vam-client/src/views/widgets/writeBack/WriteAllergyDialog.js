import React from 'react';

import WindowPanel from '~/react-views/WindowPanel';
import DeckView from '~/react-views/DeckView';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import OutlineView from '~/react-views/OutlineView';
import OutlineItemView from '~/react-views/OutlineItemView';

import {AllergiesDb} from '~/FakeDb';


import './writeAllergy.css';




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


                    <div className="search">
                        <div><b>Enter causative agent for Allergy or Adverse Drug Reaction:</b></div>
                        <p>
                            Enter the first few letters of the causative agent (minimum of 3) to allow
                            for a comprehensive search. Only one reactant maybe be entered at a time.
                        </p>

                        <SearchTextView ref={e => this._searchBox = e} textDidChange={this.searchTermChanged.bind(this)}/>
                        <div className="results">
                            <OutlineView>
                                <OutlineItemView text="VA Allergies File" />
                                <OutlineItemView text="National Drug File - Generic Drug Name" />
                                <OutlineItemView text="National Drug File - Trade Name" />
                                <OutlineItemView text="Local Drug File" />
                                <OutlineItemView text="Drug Ingredients File" />
                                <OutlineItemView text="VA Drug Class File" />
                            </OutlineView>
                        </div>

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

    searchTermChanged(sender) {
        let searchTerm = sender.value;




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