import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
      BrowserRouter as Router,
      Switch,
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {

      const dispatch = useDispatch();
      const { checking, uid } = useSelector(state => state.auth);

      useEffect(() => {

            dispatch(startChecking())

      }, [dispatch])

      // console.log(checking);
      if (checking) {
            return <h5>Espere un momento...</h5>
      }



      return (
            <Router>

                  <div>
                        <Switch>

                              <PublicRoute
                                    exact
                                    path={'/login'}
                                    component={LoginScreen}
                                    isAuthenticated={!!uid}
                              />
                              <PrivateRoute
                                    exact
                                    path={'/'}
                                    component={CalendarScreen}
                                    isAuthenticated={!!uid}
                              />

                              {/* Para cualquier otra ruta que no sea ninguna de las anteriores: */}
                              <Redirect to={'/'} />

                        </Switch>

                  </div >

            </Router>
      )
}

export default AppRouter