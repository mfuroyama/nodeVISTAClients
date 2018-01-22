import React from 'react';

import WindowPanel from '~/react-views/WindowPanel';

import './details.css';

class AllergyDetail extends React.Component {


    render() {

        if(this.props.data) {
            return (

                <WindowPanel
                    title="Allergy Detail"
                    width={460}
                    height={460}
                    minSize={{width:460, height:460}}
                    modal={true}
                    ref={e => this._window = e}>

                    <div className="allergyDetails">
                        <table>
                            <tbody>
                            <tr><td>Causative agent:</td><td>{this.props.data.reactant.label}</td></tr>
                            <tr><td>Nature of reaction:</td><td>Adverse Reaction</td></tr>

                            <tr><td>Signs/Symptions:</td><td></td></tr>
                            </tbody>
                        </table>
                    </div>


                </WindowPanel>


            )
        }

        return null;

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