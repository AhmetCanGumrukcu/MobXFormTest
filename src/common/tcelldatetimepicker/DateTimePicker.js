'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment/locale/tr'
import { Clock } from './Clock'
import { Calendar } from './Calendar'
import './DateTimePicker.css'
import { TcellComponent } from 'common/tcellcomponent'

moment.locale('tr');

export class DateTimePicker extends TcellComponent {
    static propTypes = {
        clickOnCancel:       PropTypes.func,
        clickOnOK:           PropTypes.func,
        day:                 PropTypes.string,
        handleChangeDay:     PropTypes.func,
        handleChangeHours:   PropTypes.func,
        handleChangeMinutes: PropTypes.func,
        handleChangeMonth:   PropTypes.func,
        handleChangeType:    PropTypes.func,
        hours:               PropTypes.string,
        minutes:             PropTypes.string,
        month:               PropTypes.string,
        show:                PropTypes.bool,
        showCalendar:        PropTypes.bool,
        showClock:           PropTypes.bool,
        type:                PropTypes.bool,
        weekday:             PropTypes.string,
        year:                PropTypes.string,
        value:       PropTypes.string
    };

    constructor(props) {     
        super(props);
        this.displayName = "DataTimePicker";
        this.name = props.name,
        this.state = {
            day:          moment().format("DD"),
            hours:        moment().format("HH"),
            minutes:      moment().format("mm"),
            month:        moment().format("MMMM"),           
            show:         true,
            showCalendar: true,
            showClock:    false,
            type:         true,
            weekday:      moment().format("dddd"),
            year:         moment().format("YYYY"),
            value: null
        };
    }

    _checkFunc = (props, arg, lastFunc) => {       
        if (this.props.hasOwnProperty(props) && this.props[props] instanceof Function) {
            this.props[props](this, arg, lastFunc);
        } else {
            lastFunc();
        }
    };

    _props2state = (nextProps = this.props) => {
        const { _checkProp } = this,
            { day, hours, minutes, month, show, showCalendar, showClock, type, weekday, year } = nextProps;      
        _checkProp('day', day);
        _checkProp('hours', hours);
        _checkProp('minutes', minutes);
        _checkProp('month', month);
        _checkProp('show', show);
        _checkProp('showCalendar', showCalendar);
        _checkProp('showClock', showClock);
        _checkProp('type', type);
        _checkProp('weekday', weekday);
        _checkProp('year', year);
    };

    _checkProp = (name, props) => {
        let result = this.state;

        if (this.props.hasOwnProperty(name) && this.props[name] != undefined) {
            result[name] = props;
            this.setState(result);
        }
    };

    handleChangeType = (type) => {
        const f = () => {
            this.setState({
                type: type
            });
        };

        this._checkFunc('handleChangeType', { type: type }, f);
    };

    handleChangeMonth = (newMonth) => {      
        const f = () => {
            const { day, month, year } = this.state;
            if ((month === "Aralık" || month === "December") && 
                (newMonth === "Ocak" || newMonth === "January")) {
                const newYear = String(parseInt(year, 10) + 1);
                this.setState({
                    month:   newMonth,
                    year:    newYear,
                    weekday: moment(`${newYear}-${newMonth}-${day}`, 'YYYY-MMMM-DD').format('dddd')
                });
            } else if ((month === "Ocak" || month === "January") && 
                       (newMonth === "Aralık" || newMonth === "December")) {
                const newYear = String(parseInt(year, 10) - 1);
                this.setState({
                    month:   newMonth,
                    year:    newYear,
                    weekday: moment(`${newYear}-${newMonth}-${day}`, 'YYYY-MMMM-DD').format('dddd')
                });
            } else {
                this.setState({
                    month:   newMonth,
                    weekday: moment(`${year}-${newMonth}-${day}`, 'YYYY-MMMM-DD').format('dddd')
                });
            }
        };
        this._checkFunc('handleChangeMonth', { newMonth: newMonth }, f);
    };

    handleChangeDay = (day) => {
        const f = () => {
            this.setState({
                day: day,
                weekday: moment(`${day}`, 'DD').format('dddd'),
            });
        };
        this._checkFunc('handleChangeDay', { day: day }, f);
    };

    handleChangeHours = (hours) => {
        const f = () => {
            this.setState({
                hours: moment(String(hours), "HH").format("HH")
            });
        };
        this._checkFunc('handleChangeHours', { hours: hours }, f);
    };

    handleChangeMinutes = (minutes) => {
        const f = () => {
            this.setState({
                minutes: moment(String(minutes), "mm").format("mm")
            });
        };
        this._checkFunc('handleChangeMinutes', { minutes: minutes }, f);
    };

    clickOnCancel = () => {
        const f = () => {
            this.setState((prevState, props) => {
                return {
                    show: !prevState.show,
                };
            });
        };
        this._checkFunc('clickOnCancel', {}, f);
    };

    clickOnOK = () => {       
        const f = () => {
            this.setState((prevState, props) => {
                return {
                    show: !prevState.show,
                };
            });
        };
        this._checkFunc('clickOnOK', {}, f);
    };

    componentDidMount() {
        this._props2state();
    }

    componentWillReceiveProps(nextProps) {
        
        this._props2state(nextProps);
    }

    render() {
        const { day, hours, minutes, month, show, showCalendar, showClock, type, weekday, year } = this.state,
            { clickOnCancel, clickOnOK, handleChangeDay, handleChangeHours, handleChangeMinutes, handleChangeMonth, handleChangeType } = this;

        let body, button, picker;
        if (type) {
            if (showCalendar) {
                body = (
                    <Calendar
                        day={ day }
                        handleChangeDay={ handleChangeDay }
                        handleChangeMonth={ handleChangeMonth }
                        month={ month }
                        year={ year }
                    />
                );
            }
        } else {
            if (showClock) {
                body = (
                    <Clock
                        handleChangeHours={ handleChangeHours }
                        handleChangeMinutes={ handleChangeMinutes }
                        hours={ hours }
                        minutes={ minutes }
                    />
                );
            }
        }
        button = (
            <div className="modal-btns">
                <a style={{float: 'right'}} className="c-btn c-btn--flat js-cancel" onClick={ clickOnCancel }>Cancel</a>
                <a style={{float: 'left'}} className="c-btn c-btn--flat js-ok" onClick={ clickOnOK }>OK</a>
            </div>
        );
        let buttonCalendar, buttonClock;
        if (showCalendar && showClock) {
            buttonCalendar = (
                <input
                    className="c-datepicker__toggle c-datepicker__toggle--left  c-datepicker--show-calendar"
                    type="radio"
                    name="date-toggle"
                    value="calendar"
                    defaultChecked={ type }
                    onClick={ () => handleChangeType(true) }
                />
            );
            buttonClock = (
                <input
                    className="c-datepicker__toggle c-datepicker__toggle--right c-datepicker--show-time"
                    type="radio"
                    name="date-toggle"
                    value="time"
                    defaultChecked={ !type }
                    onClick={ () => handleChangeType(false) }
                />
            );
        }

        if (show) {
            picker = (
                <div id="date-time-picker">
                    <div className="c-scrim c-scrim--shown" onClick={ clickOnCancel }></div>
                    <div className="c-datepicker c-datepicker--open">
                        { buttonClock }
                        { buttonCalendar }
                        <div className="c-datepicker__header">
                            <div className="c-datepicker__header-day">
                                <span className="js-day">{ weekday }</span>
                            </div>
                            <div className="c-datepicker__header-date">
                                <span className="c-datepicker__header-date__month js-date-month">{ month } { year }</span>
                                <span className="c-datepicker__header-date__day js-date-day">{ day }</span>
                                <span className="c-datepicker__header-date__time js-date-time">
                                    <span className="c-datepicker__header-date__hours js-date-hours">{ hours }</span>:
                                    <span className="c-datepicker__header-date__minutes js-date-minutes">{ minutes }</span>
                                </span>
                            </div>
                        </div>
                        { body }
                        { button }
                    </div>
                </div>
            );
        }

        return (
            <div>
                { picker }
            </div>
        );
    }
}