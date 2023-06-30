import ReactDOM from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
)
