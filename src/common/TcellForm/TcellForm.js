import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class TcellForm extends React.Component {
    constructor(props){
        super(props);        
        this.onChange = this.onChange.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateProperty(key, value) {
        this.props.model[key] = value
    }

    onChange(event) {                 
        this.updateProperty(event.target.name, event.target.value)
    }

    clear(){
        if(this.props.model){
            for(let key in this.props.model){
                if(_.isBoolean(this.props.model[key])){
                    this.props.model[key] = false;
                }else if(_.isString(this.props.model[key]) || _.isNumber(this.props.model[key])){
                    this.props.model[key] = '';
                }else if(_.isDate(this.props.model[key])){
                    this.props.model[key] = null;
                }
            }
        }
    }

    render() {
        const { children } = this.props;
        return (
            <form onSubmit={(e) => { e.preventDefault() }}>
                {children}
            </form>
        );
    }
}

TcellForm.propTypes ={
    model: PropTypes.object
};

export default TcellForm;