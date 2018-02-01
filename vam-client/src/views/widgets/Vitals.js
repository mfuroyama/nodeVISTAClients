import React from 'react';

import TableWidget from './TableWidget';




class Vitals extends TableWidget {

    get tableColumns() {
        return [];
    }
}

Vitals.defaultProps = {
    title: 'Vitals',
    emptyText: 'No data found'
};


export default Vitals;