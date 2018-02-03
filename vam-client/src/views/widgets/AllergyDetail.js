import React from 'react';

import DetailsWindow from './DetailsWindow';

import './details.css';

class AllergyDetail extends React.Component {

    render() {

        let content = <div className="detailsLoading">
            <div className='v-loading'/>
        </div>;

        if(this.props.data) {
            content = <pre>{this.props.data}</pre>;
        }

        return (

            <DetailsWindow
                title="Allergy Detail"
                width={500}
                height={480}
                minSize={{width:500, height:200}}
                modal={true}
                ref={e => this._window = e}>

                <div className="allergyDetails">
                    {content}
                </div>

            </DetailsWindow>
        );

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