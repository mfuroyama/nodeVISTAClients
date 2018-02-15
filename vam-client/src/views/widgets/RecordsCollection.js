import axios from "axios/index";
import isFunction from 'lodash/isFunction';
import map from 'lodash/map';


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
            axios.get(this.props.url, {headers: { Pragma: 'no-cache'}}).then(function(response){
                let data = response.data;
                if(isFunction(this.props.parse)){
                    data = this.props.parse(data);
                }

                this.data = map(data, function(attr){
                    if(isFunction(this.props.record)) {
                        return this.props.record(attr);
                    }

                    return attr;

                }.bind(this));

                if(isFunction(callback)) {
                    callback.call(this, this.data);
                }

            }.bind(this));
        }
    }

    set data(d) {
        this._data = d;
    }

    get data() {
        return this._data;
    }



}


export default RecordsCollection;