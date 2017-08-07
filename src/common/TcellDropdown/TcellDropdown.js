import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../dropdown';

class TcellDropdown extends React.Component{   
    render(){        
        return(
            <Dropdown {...this.props} />
        );
    }
}

export default TcellDropdown;