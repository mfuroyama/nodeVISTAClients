import React from 'react';
import isNil from 'lodash/isNil';

import View from '~/react-views/View';
import OutlineView from '~/react-views/OutlineView';


import './writeAllergy.css';


class AllergenSearchResultsView extends View {

    constructor(props) {
        super(props);

        this.state = {
            loading: this.props.loading
        }
    }

    componentWillReceiveProps(newProps) {

        if(!isNil(newProps.loading)) {
            if(newProps.loading !== this.state.loading) {
                this.state.loading = newProps.loading
            }
        }
    }


    render() {

        let content = null;

        if(this.state.loading) {
            content = <div className="v-loading"/>;
        }
        else {
            content = <OutlineView onSelect={this.props.onSelect}>{this.props.children}</OutlineView>;
        }

        return (
            <div className="results">
                {content}
            </div>
        )
    }

}


export default AllergenSearchResultsView;