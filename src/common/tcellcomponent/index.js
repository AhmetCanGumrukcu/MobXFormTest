import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { device } from 'device.js/dist/device.es'

export class TcellComponent extends Component {
    constructor(props, state) {
        super(props, state);
        this.unMounted = false;
    }

    get device(){
        return device;
    }

    componentWillUnmount() {
        this.unMounted = true;
    }

    shallowEqual(objA, objB) {
        if (objA === objB) {
            return true;
        }
        if (typeof objA !== 'object' || objA === null ||
            typeof objB !== 'object' || objB === null) {
            return false;
        }
        const keysA = Object.keys(objA);
        const keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) {
            return false;
        }
        const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
        for (let i = 0; i < keysA.length; i++) {
            if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
                return false;
            }
        }
        return true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.shallowEqual(this.props, nextProps) || !this.shallowEqual(this.state, nextState);
    }
};

TcellComponent.propTypes = {};