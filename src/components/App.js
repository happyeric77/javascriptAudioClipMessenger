import Signup from './Signup';
import Dashboard from './Dashboard'
import AuthProvider from '../contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword';
import DatabaseProvider from '../contexts/DatabaseContext';
import '../css/App.css'

function App() {
  return (
    <div className='App'>
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/reset-password' component={ResetPassword} />
          </Switch>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
    </div>
  )
}

export default App;
