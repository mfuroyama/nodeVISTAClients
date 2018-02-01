import axios from "axios/index";
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';

import Cookies from "js-cookie";


/**
 *
 * A data store for records fetched from the server
 *
 */
class RecordsCollection  {

    constructor(props) {
        this.props = props;
    }

    /**
     *
     * Fetch the records from the server
     *
     * @param callback - callback function when fetch is complete, accepts the returned data as arg
     */

    fetch(callback) {
        if(this.props.url) {
            this._setupRequest();
            axios.get(this.props.url).then(function(response){
                let data = response.data;
                if(isFunction(this.props.parse)){
                    this.data = map(data.results, this.props.parse);
                }
                else {
                    this.data = data.results;
                }
                if(isFunction(callback)) {
                    callback.call(this, this.data);
                }

            }.bind(this));
        }
    }

    _setupRequest() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('x-access-token');
        axios.defaults.headers.common['x-patient-token'] = Cookies.get('x-patient-token');
    }


    set data(d) {
        this._data = d;
    }

    get data() {
        return this._data;
    }

}


export default RecordsCollection;