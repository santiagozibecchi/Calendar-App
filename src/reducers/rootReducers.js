// COMBINACION DE TODOS LOS REDUCERS
// AUTH, CALENDAR, UI

import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { calendarReducer } from "./calendarReducer"
import { uiReducer } from "./uiReducer"


export const rootReducers = combineReducers({
      ui: uiReducer,
      calendar: calendarReducer,
      auth: authReducer
      // TODO AuthReducer
})

