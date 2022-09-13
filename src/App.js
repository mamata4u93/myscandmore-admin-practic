import React from 'react';
import { Provider } from 'react-redux';

import './shared/styles/crema.less';
import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
  AuthRoutes,
} from './@crema';
import { BrowserRouter } from 'react-router-dom';
import './@crema/services/index';

import { store } from './store';
import { saveState } from "./utility/browser-storage";
import { debounce } from "debounce";

store.subscribe(
  debounce(() => {
    saveState('redux', store.getState());
  }, 800)
);

const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <AuthRoutes>
              <AppLayout />
            </AuthRoutes>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
