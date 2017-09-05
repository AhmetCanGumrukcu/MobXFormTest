import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class TcellRadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (event) => {  
    const myVal = Number(event.target.value);
    let myEvent = {
      target: {
        name: event.target.name,
        value: event.target.value = (_.isNaN(myVal) ? event.target.value : myVal)
      }
    }
    this.props.onChange(myEvent);
  };
  render() {
    const { classes, name, label, value, children, error } = this.props;
    return (
      <FormControl component="fieldset" error={ error }>
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          aria-label={label}
          name={name}
          className={classes.group}
          value={value}
          onChange={this.handleChange}
        >
          {children}
        </RadioGroup>
      </FormControl>
    );
  }
}

TcellRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TcellRadioGroup);