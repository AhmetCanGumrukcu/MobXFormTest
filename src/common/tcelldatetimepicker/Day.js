"use strict";

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TcellComponent } from 'common/tcellcomponent'

export class Day extends TcellComponent {
    static propTypes = {
        day:             PropTypes.string.isRequired,
        selectedDay:     PropTypes.bool.isRequired,
        active:          PropTypes.bool.isRequired,
        handleChangeDay: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    handleClickOnDay = (e) => {
        const { handleChangeDay } = this.props;
        handleChangeDay(e.target.innerText);
    };

    render() {
        const { day, active, selectedDay } = this.props;

        return (
            <td
                className={active ? (selectedDay ? "c-datepicker__day-body c-datepicker__day--selected" : "c-datepicker__day-body") : "c-datepicker__day-body rd-day-prev-month"}
                onClick={this.handleClickOnDay}
            >
                {day}
            </td>
        );
    }
}