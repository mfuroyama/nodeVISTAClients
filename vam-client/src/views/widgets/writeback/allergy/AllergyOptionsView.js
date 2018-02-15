import React from 'react';
import pull from 'lodash/pull';
import format from 'date-fns/format';
import axios from 'axios';


import View from '~/react-views/View';
import SelectView from '~/react-views/SelectView';
import ProgressiveListView from '~/react-views/ProgressiveListView';
import DatePickerView from '~/react-views/DatePickerView';
import TextView from '~/react-views/TextView';
import CheckboxView from '~/react-views/CheckboxView';

class SignSymptomsListView extends ProgressiveListView {

    renderItem(item) {
        return (
            <div className="signSymptomsItem">
                <CheckboxView text={item.label} action={this.props.onCheck.bind(this,item)} />
            </div>
        )
    }

    itemHeight() {
        return 32;
    }
}

let SignsSymptoms = null;

class AllergyOptionsView extends View {

    constructor(props) {
        super(props);

        Object.assign(this.state, {
            selectedSignSymptoms : [],
        });
    }

    didEnterDocument() {
        if(!SignsSymptoms) {
            axios.get('/signsSymptoms', {headers: { Pragma: 'no-cache'}}).then(function (response) {
                SignsSymptoms = response.data;
                this.forceUpdate();
            }.bind(this));
        }
    }

    render() {

        return (


            <div className="allergyOptions">

                <div className="allergyOption">

                    <div className="v-table-layout">
                        <div className="v-tr">
                            <div className="v-td">
                                <div className="causativeAgent">
                                    <b>Causative Agent:</b>
                                    <div>
                                        {this.props.reactant.label}
                                    </div>
                                </div>
                            </div>

                            <div className="v-td">
                                <b>Originatior:</b>
                                <SelectView>
                                    <option value="Alexander, Robert" />
                                </SelectView>
                            </div>

                            <div className="v-td">
                                <b>Observed/Historical:</b>
                                <SelectView ref={e=>this._ohCtrl=e}>
                                    <option value="Historical" />
                                </SelectView>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="allergyOption">

                    <div className="v-table-layout">
                        <div className="v-tr">
                            <div className="v-td">
                                <b>Nature of Reaction:</b>
                                <SelectView ref={e=>this._mechanismCtrl=e}>
                                    <option value="Allergy"/>
                                    {/*<option value="Pharmacological"/>*/}
                                    <option value="Unknown"/>
                                </SelectView>
                            </div>

                            <div className="v-td">
                                <b>Origination Date:</b>
                                <TextView readOnly={true} value={format(new Date(), 'MM/DD/YYYY')}/>
                            </div>

                        </div>

                    </div>
                </div>


                <div className="allergyOption">


                    <div className="v-table-layout">
                        <div className="v-tr">
                            <div className="v-td">
                                <div className="signsSymptoms">
                                    <b>Signs/Symptoms:</b>
                                    <SignSymptomsListView onCheck={this._onAddSignSymptom.bind(this)} content={SignsSymptoms} className={"signSymptomsList"}/>
                                </div>
                            </div>

                            <div className="v-td">
                                <b>Comments:</b>
                                <TextView ref={e=>this._commentsCtrl = e} multiline={true} className={"comments"} />
                            </div>

                        </div>

                    </div>



                </div>


            </div>
        )
    }

    _onAddSignSymptom(item, sender) {

        let signsSymptoms = this.state.selectedSignSymptoms;

        if(sender.value) {
            signsSymptoms.push(item.id);
        }
        else {
            pull(signsSymptoms, item.id);
        }
    }

    get data() {

       return {
            type: 'Allergy',
            comments: [this._commentsCtrl.value],
            reactant: this.props.reactant,
            reactions: this.state.selectedSignSymptoms,
            observedOrHistorical: this._ohCtrl.value.toUpperCase(),
            dateOccurred: format(new Date()),
            mechanism: this._mechanismCtrl.value.toUpperCase(),
            allergyType:this.props.reactant.type
        };



    }



}


export default AllergyOptionsView;