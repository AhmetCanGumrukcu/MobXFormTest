import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Validation from './Validation';
import ValidationForm from './ValidationForm';

const ValidationSample = () => ( 
    <ValidationForm form={Validation} />  
);

ValidationSample.propTypes = {
  form: React.PropTypes.object,
};

export default observer(ValidationSample);


