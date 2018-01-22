import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { rehydrate } from 'rfx-core'
import App from 'views/App'
import stores from 'stores'

const store = rehydrate();

ReactDOM.render(
    <Provider store={ store }>  
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

