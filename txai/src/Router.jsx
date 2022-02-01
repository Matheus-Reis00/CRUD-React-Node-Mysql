import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Login from './views/Login'

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />

                <Route exact path='/Dashboard' component={Dashboard}/>
            </Switch>
        </Router>
    )
}
