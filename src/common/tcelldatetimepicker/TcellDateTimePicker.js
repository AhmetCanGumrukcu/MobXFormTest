import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import { ListItem } from 'material-ui/List';
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown';
import { DateTimePicker } from './DateTimePicker';
import { TcellComponent } from 'common/tcellcomponent'
import moment from 'moment'
import _ from 'lodash';

class ReadOnlyTextField extends TcellComponent {
    render() {
        return (
            <TextField { ...this.props }></TextField>
        )
    };
}

class TcellDateTimePicker extends TcellComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            display: null
        };
    }

    shapeDisplay = (event) => {
        let actualDisplay = "";
        let value = null;
        let monthInt = null;
        switch (event.state.month) {
            case "Ocak":
                monthInt = "01";
                break;
            case "January":
                monthInt = "01";
                break;
            case "Şubat":
                monthInt = "02";
                break;
            case "Februray":
                monthInt = "02";
                break;
            case "Mart":
                monthInt = "03";
                break;
            case "March":
                monthInt = "03";
                break;
            case "Nisan":
                monthInt = "04";
                break;
            case "April":
                monthInt = "04";
                break;
            case "Mayıs":
                monthInt = "05";
                break;
            case "May":
                monthInt = "05";
                break;
            case "Haziran":
                monthInt = "06";
                break;
            case "June":
                monthInt = "06";
                break;
            case "Temmuz":
                monthInt = "07";
                break;
            case "July":
                monthInt = "07";
                break;
            case "Ağustos":
                monthInt = "08";
                break;
            case "August":
                monthInt = "08";
                break;
            case "Eylül":
                monthInt = "09";
                break;
            case "September":
                monthInt = "09";
                break;
            case "Ekim":
                monthInt = "10";
                break;
            case "October":
                monthInt = "10";
                break;
            case "Kasım":
                monthInt = "11";
                break;
            case "November":
                monthInt = "11";
                break;
            case "Aralık":
                monthInt = "12";
                break;
            case "December":
                monthInt = "12";
                break;
        }

        if (event.state && event.state.showClock) {
            actualDisplay = `${event.state.day} ${event.state.month} ${event.state.year} ${event.state.hours}:${event.state.minutes}`
            value = `${event.state.year}-${monthInt}-${event.state.day} ${event.state.hours}:${event.state.minutes}`
        }
        else if (event.state) {
            actualDisplay = `${event.state.day} ${event.state.month} ${event.state.year}`
            value = `${event.state.year}-${monthInt}-${event.state.day}`
        }
        let myEvent = {
            target: {
                name: event.name,
                value: value
            }
        }
        this.setState({ display: actualDisplay, open: false });
        if (this.props.onChange) {
            this.props.onChange(myEvent);
        }
    }
    handleClick = (event) => {
        this.setState({
            open: true
        });
    };
    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };
    handleChange = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.onChange(event);
    }
    componentWillReceiveProps(nextProps) {      
        if (this.props.value != nextProps.value && nextProps.value) {
            const { value } = nextProps;
            let tempDate = null;
            var formattedDate = "";
            if (_.isString(value)) {
                tempDate = moment(value);
            }
            else if (_.isDate(value)) {
                tempDate = value;
            }
            if (this.props.showClock) {              
                formattedDate = tempDate.format("DD MMM YYYY HH:mm");
                console.log(formattedDate);
            }
            else {              
                formattedDate = tempDate.format("DD MMM YYYY");
                console.log(formattedDate);
            }
        }
        else if (this.props.value != nextProps.value && !nextProps.value) {
            formattedDate = "";
        }

        //this.setState({ display: formattedDate });

        setTimeout(() => {                      
            this.setState({ display: formattedDate });
        }, 100)

    }

    render() {
        const { dataSource, onChange, name, value, classes, showCalendar, showClock, ...others } = this.props;
        this.handleChange = onChange;
        return (
            <div>
                <ListItem>
                    <ReadOnlyTextField
                        ref={(r) => { this.textField = r; }}
                        multiline
                        aria-owns={this.state.open ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        onChange={this.handleChange}
                        value={this.state.display}
                        { ...others }
                    >
                    </ReadOnlyTextField>
                    <ArrowDropDownIcon />
                </ListItem>
                {
                    this.state.open && <DateTimePicker
                    showCalendar={showCalendar}
                    clickOnCancel={this.handleRequestClose}
                    clickOnOK={this.shapeDisplay}
                    showClock={showClock}
                    name={name}/>
                }
            </div>
        );
    }
}

export default TcellDateTimePicker;