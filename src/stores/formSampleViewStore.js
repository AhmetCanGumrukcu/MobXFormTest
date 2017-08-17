import { observable } from "mobx";
import { action } from "mobx";

class FormSampleViewStore {
    contactCard = observable({
        expanded: false
    })
    paymentCard = observable({
        expanded: true
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

export default new FormSampleViewStore();


// export default observable({
//     contactCard: {
//         expanded: false
//     },
//     paymentCard: {
//         expanded: true
//     },
//     validationCard: {
//         expanded: true
//     },
//     getItem: action(function (value) {
//         return this[value];
//     })
// })