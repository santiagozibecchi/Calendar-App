import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
      BrowserRouter as Router,
      Switch,
      Route,
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import {LoginScreen} from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';

const AppRouter = () => {

      const dispatch = useDispatch();

      useEffect(() => {

            dispatch(startChecking())
        
      }, [dispatch])
      


      return (
            <Router>

                  <div>
                        <Switch>

                              <Route
                                    exact
                                    path={'/login'}
                                    component={LoginScreen}
                              />
                              <Route
                                    exact
                                    path={'/'}
                                    component={CalendarScreen}
                              />

                              {/* Para cualquier otra ruta que no sea ninguna de las anteriores: */}
                              <Redirect to={'/'} />

                        </Switch>

                  </div >

            </Router>
      )
}

export default AppRouter