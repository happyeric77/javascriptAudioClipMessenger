import Signup from './Signup';
import Dashboard from './Dashboard'
import AuthProvider from '../contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/reset-password' component={ResetPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
