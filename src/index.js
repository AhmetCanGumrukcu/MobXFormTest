import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'style/index.css';
import Home from 'views/Home';
import FormSample from 'views/FormSample';

import Header from 'partials/Header';
import Drawer from 'partials/Drawer';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Header></Header>
        <Drawer></Drawer>
        <main className="mdl-layout__content">
           
                <Switch>
                    <Route path="/formsample" component={FormSample} />                   
                    <Route path="/" component={Home} />
                </Switch>
           
        </main>
    </div>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();