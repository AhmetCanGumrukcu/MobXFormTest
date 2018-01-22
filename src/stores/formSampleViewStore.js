import { observable } from "mobx";
import { action } from "mobx";

export default class FormSampleViewStore {
    contactCard = observable({
        expanded: false
    })
    paymentCard = observable({
        expanded: false
    })
    validationCard = observable({
        expanded: true
    })
    getItem = action(function (value) {
        return this[value];
    })
    constructor(){
        console.log("One time FormSampleViewStore constructor...");
    }
}