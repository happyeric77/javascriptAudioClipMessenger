import Signup from './Signup';
import Dashboard from './Dashboard'
import AuthProvider from '../contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login';
import PrivateRoute from './PrivateRoute'
import ResetPassword from './ResetPassword';
import DatabaseProvider from '../contexts/DatabaseContext';
import UpdateProfile from './UpdateProfile';
import ZoomProvider from '../index'
import '../css/App.css'

function App(props) {
  return (
    <div className='App'>
    <Router>
      <DatabaseProvider>
        <AuthProvider>
          <ZoomProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/update-profile' component={UpdateProfile} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
              <Route path='/reset-password' component={ResetPassword} />
            </Switch>
          </ZoomProvider>
        </AuthProvider>
      </DatabaseProvider>
    </Router>
    </div>
  )
}

export default App;
