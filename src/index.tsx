import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store';
//
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// STYLE
import './styles/index.scss';
import './index.css';
import './fonts/line-awesome-1.3.0/css/line-awesome.css';
//
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';//
import App from './App';
//

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);
