import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../checkbox';

class TcellCheckbox extends React.Component{
   
    render(){
        const { value } = this.props;
        return(
            <Checkbox checked={value} {...this.props} />
        );
    }
}

export default TcellCheckbox;