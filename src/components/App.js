import Signup from './Signup';
import Dashboard from './Dashboard'
import AuthProvider from '../contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword';
import DatabaseProvider from '../contexts/DatabaseContext';
import Test from './Test';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <Test/>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/reset-password' component={ResetPassword} />
          </Switch>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;
