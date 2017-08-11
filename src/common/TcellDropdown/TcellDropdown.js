import React from 'react';
import Dropdown from '../dropdown';

class TcellDropdown extends React.Component{   
    render(){        
        return(
            <Dropdown {...this.props} />
        );
    }
}

export default TcellDropdown;