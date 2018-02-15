import React from 'react';
import axios from 'axios';

import WindowPanel from '~/react-views/WindowPanel';
import DeckView from '~/react-views/DeckView';
import ButtonView from '~/react-views/ButtonView';
import SearchTextView from '~/react-views/SearchTextView';
import OutlineItemView from '~/react-views/OutlineItemView';

import AllergenSearchResultsView from './AllergenSearchResultsView';
import AllergyOptionsView from './AllergyOptionsView';

import './writeAllergy.css';
import EventResponder from "../../../../react-views/src/EventResponder";




class WriteAllergyDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searching:false,
            searchResults: [],
            selectedReactant: null,
            signsSymptoms: [],
            index: 0
        };
    }

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

                <DeckView index={this.state.index}>


                    <div className="search">
                        <div><b>Enter causative agent for Allergy or Adverse Drug Reaction:</b></div>
                        <p>
                            Enter the first few letters of the causative agent (minimum of 3) to allow
                            for a comprehensive search. Only one reactant maybe be entered at a time.
                        </p>

                        <SearchTextView ref={e => this._searchBox = e} textDidChange={this.searchTermChanged.bind(this)}/>
                        <AllergenSearchResultsView
                            onSelect={this.onSelectReactant.bind(this)}
                            loading={this.state.searching}>
                            {this.state.searchResults}
                        </AllergenSearchResultsView>

                    </div>

                    <AllergyOptionsView ref={e=>this._allergyForm=e} reactant={this.state.selectedReactant}/>


                </DeckView>

                <div className="buttonBar">
                    <ButtonView text="Cancel" action={this.orderOut.bind(this)} />
                    <div className="flex" />
                    <ButtonView text="Back"
                                action={this.onBack.bind(this)}
                                icon="fa fa-chevron-left" disabled={this.state.index === 0} />
                    <ButtonView text={this.state.index === 0 ? 'Next' : 'Create Allergy'} type="primary"
                                action={this.onNext.bind(this)}
                                disabled={this.state.selectedReactant === null}  />
                </div>


            </WindowPanel>

        );
    }

    searchTermChanged(sender) {
        let searchTerm = sender.value;

        if(searchTerm.length > 2) {

            this.setState({
                searching:true,
                searchResults:[],
                selectedReactant: null,
                signsSymptoms: [],
            });

            axios.get('/allergens?query=' + searchTerm, {headers: { Pragma: 'no-cache'}}).then(function (response) {

                let searchResults = [];

                if(response) {
                    let data = response.data,
                        j = 0;
                    for(let category in data) {

                        let results = data[category],
                            count = results.length,
                            i = 0;

                        let items = [];
                        for(; i < count; i++) {
                            items.push(<OutlineItemView key={i+j} reactant={results[i]} text={results[i].label} />)
                        }

                        searchResults.push(<OutlineItemView expanded={true} selectable={false} text={category + ' ('+count+')'} key={j}>{items}</OutlineItemView>);
                    }
                }

                this.setState({
                    searching:false,
                    searchResults: searchResults,
                    selectedReactant: null,
                    signsSymptoms: [],
                });

            }.bind(this));
        }
        else {
            this.setState({
                searching:false,
                searchResults: [],
                selectedReactant: null,
                signsSymptoms: [],
            });
        }
    }


    onSelectReactant(item) {
        this.setState({
            selectedReactant:item.props.reactant
        });

    }

    onNext() {

        if(this.state.index === 0) {
            this.setState({
                index: 1,
                signsSymptoms: []
            });
        }
        else {

            //create the allergy
            axios.post('/allergy', this._allergyForm.data).then(function(){
                this.orderOut();
                EventResponder.postNotification('loadAllergy');

            }.bind(this));

        }



    }

    onBack() {
        if(this.state.index === 1) {
            this.setState({
                searching:false,
                searchResults:[],
                selectedReactant: null,
                signsSymptoms: [],
                index: 0
            });

            setTimeout(function(){
                if(this._searchBox) { this._searchBox.focused = true; }
            }.bind(this), 250);
        }
    }




    orderFront() {
        if(this._window) {

            this.setState({
                selectedReactant: null,
                searchResults: [],
                searching:false,
                index:0
            });

            this._window.dropIn(function(){
                if(this._searchBox) { this._searchBox.focused = true; }
            }.bind(this));
        }
    }

    orderOut() {
        if(this._window) {
            this._window.close();
        }
    }

}



export default WriteAllergyDialog;