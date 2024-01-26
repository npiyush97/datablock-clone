import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import 'reactflow/dist/style.css';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
    <Toaster
      toastOptions={{
        style: {
          background: '#222138',
          color: '#fff'
        }
      }}
    />
  </Provider>
);
