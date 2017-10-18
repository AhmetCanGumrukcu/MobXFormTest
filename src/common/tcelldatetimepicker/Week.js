"use strict";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TcellComponent } from 'common/tcellcomponent'
import moment from 'moment'
import {Day} from './Day'

export class Week extends TcellComponent {
    static propTypes = {
        day:             PropTypes.string.isRequired,
        month:           PropTypes.string.isRequired,
        year:            PropTypes.string.isRequired,
        week:            PropTypes.number.isRequired,
        handleChangeDay: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { day, month, year, week, handleChangeDay } = this.props;
        let correctWeek, correctYear;
        const weekInYear = moment(`${year}`, 'YYYY').isoWeeksInYear();
        if (week > weekInYear) {
            correctWeek = '01';
            correctYear = String(parseInt(year, 10) + 1);
        } else {
            correctWeek = week;
            correctYear = year;
        }
        let currentWeek = moment(`${correctYear}-${correctWeek}`, 'YYYY-WW'), days = [];
        for (let i = 1; i <= 7; ++i) {
            days.push(
                <Day
                    active={ currentWeek.isoWeekday(i).format('MMMM') === month }
                    day={ currentWeek.isoWeekday(i).format("DD") }
                    handleChangeDay={ handleChangeDay }
                    key={ `Day_${i}` }
                    selectedDay={ day === currentWeek.isoWeekday(i).format("DD") }
                />
            );
        }
        return (
            <tr className="c-datepicker__days-row">
                {days}
            </tr>
        );
    }
}