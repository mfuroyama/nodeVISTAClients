import React from 'react';
import axios from 'axios';

import View from '~/react-views/View';
import DetailsWindow from './DetailsWindow';
import MessageBox from "~/react-views/MessageBox";

import './details.css';
import EventResponder from "../../react-views/src/EventResponder";


class AllergyDetail extends React.Component {

    render() {

        let content = <div className="detailsLoading">
            <div className='v-loading'/>
        </div>;

        if(this.props.data) {
            content = <pre>{this.props.data.detail}</pre>;
        }

        return (

            <DetailsWindow
                title="Allergy Detail"
                width={500}
                height={480}
                minSize={{width:500, height:200}}
                modal={true}
                onPrint={this.onPrint.bind(this)}
                onEnteredInError={this.onEnteredInError.bind(this)}
                ref={e => this._window = e}>

                <View className="allergyDetails" ref={e=>this._content=e}>
                    {content}
                </View>

            </DetailsWindow>
        );

        return null;

    }

    onPrint() {
        let html = '<html><head><title>Allergy Detail</title></head><body>';
        html += this._content.el.innerHTML;
        html += '</body></html>';
        let printWindow = window.open('', '_blank', 'left=100,top=100,width=600,height=600');
        printWindow.document.body.innerHTML = html;
        setTimeout(function(){
            (function(){
                printWindow.close();
            }(printWindow.print()));
        }.bind(this), 500);
    }

    onEnteredInError() {

        let allergy = this.props.data.allergy;

        if(allergy) {
            MessageBox.prompt({
                title: 'Entered In Error',
                message:<div style={{fontSize:'14px'}}>Clicking OK will mark {allergy.reactant.label} as 'Entered in Error'. <br/><br/>Comments (optional)</div>
            }, function(ret) {

                if(ret !== false) {
                    axios.put('/allergy/remove', {

                        id: allergy.id,
                        comment: ret

                    }).then(function(response){

                        EventResponder.postNotification('loadAllergy');
                        this.orderOut();

                    }.bind(this));
                }

            }.bind(this));
        }

    }


    orderFront() {
        if(this._window) {
            this._window.dropIn();

        }
    }

    orderOut() {
        if(this._window) {
            this._window.close();
        }
    }
}

export default AllergyDetail;