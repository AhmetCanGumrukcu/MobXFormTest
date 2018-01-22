import { store } from 'rfx-core'
import AppState from './AppState'
import FormSampleViewStore from './formSampleViewStore'

export default store.setup({    
    appState: AppState,
    formSampleViewStore: FormSampleViewStore
});
