import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Home from 'views/Home';
import FormSample from 'views/FormSample';
import ValidationSample from 'views/ValidationSample';

import Header from 'partials/Header';
import Drawer from 'partials/Drawer';

import viewStore from 'stores/formSampleViewStore';
const stores = { viewStore };

ReactDOM.render(   
     <Provider { ...stores }>
        <BrowserRouter>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header></Header>
                <Drawer></Drawer>
                <main className="mdl-layout__content">
                    <Switch>
                        <Route path="/validation" component={ValidationSample} />
                        <Route path="/formsample" component={FormSample} />
                        <Route path="/" component={Home} />
                    </Switch>

                </main>
            </div>
        </BrowserRouter></Provider>, document.getElementById('root'));

