import { observable } from "mobx";
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = { dvr: validatorjs };

export default {
    setModelRules(model, rules) {     
        const fields = model.get();       
        if (rules) {
            for (let ruleKey in rules) {
                if (fields[ruleKey]) {
                    fields[ruleKey].rules = rules[ruleKey].rules;
                    fields[ruleKey].validators = rules[ruleKey].validators;
                }
            }
        }
        class Model extends MobxReactForm {
            clear() {
                this.init(fields);
            }
        }
        return new Model({ fields }, { plugins });

    },
    generateModel(fields, rules = null) {
        if (rules) {
            for (let ruleKey in rules) {
                if (fields[ruleKey]) {
                    fields[ruleKey].rules = rules[ruleKey]
                }
            }
        }
        class Model extends MobxReactForm {
            clear() {
                this.init(fields);
            }
        }
        return new Model({ fields }, { plugins });
    }
}