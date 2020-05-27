import React from 'react';
import { Store } from 'redux';
import { History } from 'history';
import { AppStore } from 'interfaces';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles';
import { Light, MaterialUITheme } from 'themes';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  store: Store<AppStore>;
  history: History;
}

const App: React.FC<Props> = ({ store, history }) => {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ThemeProvider theme={Light}>
          <MuiThemeProvider theme={MaterialUITheme}>
            <CssBaseline />
            <ToastContainer />
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </MuiThemeProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
