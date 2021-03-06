import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { DATE_PICKER } from '../identifiers';
import events from '../utils/events';
import time from '../utils/time';
import TextField from 'material-ui/TextField';
import DateRangeIcon from 'material-ui-icons/DateRange';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import DatePickerMobile from 'react-mobile-datepicker';

import InjectIconButton from '../button/IconButton';
import InjectInput from '../input/Input';
import InjectDialog from '../dialog/Dialog';
import calendarFactory from './Calendar';
import datePickerDialogFactory from './DatePickerDialog';
import style from './style.css'

class ReadOnlyTextField extends Component {
  render() {
    return (
      <TextField { ...this.props }></TextField>
    )
  };
}

const factory = (Input, DatePickerDialog) => {
  class DatePicker extends Component {
    static propTypes = {
      active: PropTypes.bool,
      autoOk: PropTypes.bool,
      cancelLabel: PropTypes.string,
      className: PropTypes.string,
      disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      enabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      error: PropTypes.string,
      icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
      ]),
      inputClassName: PropTypes.string,
      inputFormat: PropTypes.func,
      label: PropTypes.string,
      locale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      maxDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      name: PropTypes.string,
      okLabel: PropTypes.string,
      onChange: PropTypes.func,
      onClick: PropTypes.func,
      onDismiss: PropTypes.func,
      onEscKeyDown: PropTypes.func,
      onKeyPress: PropTypes.func,
      onOverlayClick: PropTypes.func,
      readonly: PropTypes.bool,
      sundayFirstDayOfWeek: PropTypes.bool,
      theme: PropTypes.shape({
        container: PropTypes.string,
        input: PropTypes.string,
      }),
      value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]),
    };

    static defaultProps = {
      active: false,
      locale: 'en',
      sundayFirstDayOfWeek: false,
    };

    state = {
      active: this.props.active,
      time: new Date()      
    };

    componentWillReceiveProps(nextProps) {
      if (nextProps.active !== this.props.active && this.state.active !== nextProps.active) {
        this.setState({ active: nextProps.active });
      }
    }

    handleDismiss = () => {
      this.setState({ active: false });
      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    };

    handleInputFocus = (event) => {
      events.pauseEvent(event);
      this.setState({ active: true });
    };

    handleInputBlur = (event) => {
      events.pauseEvent(event);
      this.setState({ active: false });
    };

    handleInputClick = (event) => {
      events.pauseEvent(event);
      this.setState({ active: true });
       this.setState({ active: true });
      if (this.props.onClick) this.props.onClick(event);
    };

    handleInputKeyPress = (event) => {
      if (event.charCode === 13) {
        events.pauseEvent(event);
        this.setState({ active: true });
      }
      if (this.props.onKeyPress) this.props.onKeyPress(event);
    };

    handleSelect = (value, event) => {
      //if (this.props.onChange) this.props.onChange(value, event);        
      let myEvent = {
        target: {
          name: this.props.name,
          value: value
        }
      }

      if (this.props.onChange) this.props.onChange(myEvent);
      this.setState({ active: false });
    };

    componentDidMount() {
      let inputNode = ReactDOM.findDOMNode(this.textField);
      let inputs = inputNode.querySelectorAll('input');
      try {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].setAttribute('readonly', 'readonly')
        }
      } catch (e) {
        alert(e);
      }
    }

    createDateView() {
      const { active, onDismiss,// eslint-disable-line
        autoOk, cancelLabel, enabledDates, disabledDates, inputClassName, inputFormat,
        locale, maxDate, minDate, okLabel, onEscKeyDown, onOverlayClick, readonly,
        sundayFirstDayOfWeek, value, classes, ...others } = this.props;
      const finalInputFormat = inputFormat || time.formatDate;
      const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      const formattedDate = date === undefined ? '' : finalInputFormat(value, locale);

      if (window.device.mobile()) {
        return <DatePickerMobile
          value={this.state.time}
          isOpen={this.state.active}
          onSelect={this.handleSelect}
          onCancel={this.handleDismiss} 
          dateFormat={["YYYY","MM","DD"]}
          confirmText="Tamam"
          cancelText="İptal2"
          />

      } else if (window.device.tablet() || window.device.desktop()) {
        return <DatePickerDialog
          active={this.state.active}
          autoOk={autoOk}
          cancelLabel={cancelLabel}
          className={this.props.className}
          disabledDates={disabledDates}
          enabledDates={enabledDates}
          locale={locale}
          maxDate={maxDate}
          minDate={minDate}
          name={this.props.name}
          onDismiss={this.handleDismiss}
          okLabel={okLabel}
          onEscKeyDown={onEscKeyDown || this.handleDismiss}
          onOverlayClick={onOverlayClick || this.handleDismiss}
          onSelect={this.handleSelect}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          theme={this.props.theme}
          value={date}
        />
      }
    }

    render() {
      const { active, onDismiss,// eslint-disable-line
        autoOk, cancelLabel, enabledDates, disabledDates, inputClassName, inputFormat,
        locale, maxDate, minDate, okLabel, onEscKeyDown, onOverlayClick, readonly,
        sundayFirstDayOfWeek, value, classes, ...others } = this.props;
      const finalInputFormat = inputFormat || time.formatDate;
      const date = Object.prototype.toString.call(value) === '[object Date]' ? value : undefined;
      const formattedDate = date === undefined ? '' : finalInputFormat(value, locale);

      const dia = this.createDateView();

      return (
        <ListItem style={{ padding: 0 }}>
          <ReadOnlyTextField ref={(r) => { this.textField = r; }}
            {...others}
            label={this.props.label}
            name={this.props.name}
            onFocus={this.handleInputFocus}
            onKeyPress={this.handleInputKeyPress}
            onClick={this.handleInputClick}
            value={formattedDate} />
          <IconButton className={style.iconButton}
            onClick={this.handleInputClick}>
            <DateRangeIcon />
          </IconButton>
          {dia}
        </ListItem>
      );
    }
  }

  return DatePicker;
};

const Calendar = calendarFactory(InjectIconButton);
const DatePickerDialog = datePickerDialogFactory(InjectDialog, Calendar);
const DatePicker = factory(InjectInput, DatePickerDialog);

export default themr(DATE_PICKER)(DatePicker);
export {
  DatePickerDialog,
  factory as datePickerFactory,
};
export { Calendar };
export { DatePicker };
