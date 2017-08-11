import React from 'react';
import PropTypes from 'prop-types';

class TcellForm extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateProperty(key, value) {                
        if (this.props.model.fields.has(key)) {
            this.props.model.$(key).set('value', value)
            this.props.model.validate(key, { showErrors: true });
        }
    }

    onChange(event) {                
        this.updateProperty(event.target.name, event.target.value)
    }

    clear() {
        if (this.props.model) {
            this.props.model.clear();
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

TcellForm.propTypes = {
    model: PropTypes.any
};

export default TcellForm;