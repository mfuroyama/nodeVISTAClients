import React from 'react';

import View from '~/react-views/View';

import './loading.css';

class LoadingView extends View {

    render() {
        return (

            <div className="v-loader"
                 style={{width:this.props.width,
                         height:this.props.height,
                         borderColor:this.props.color
                 }} />

        )
    }
}

LoadingView.defaultProps = {
    width:'14px',
    height:'14px',
    color:'#999'
};

export default LoadingView;