// COMBINACION DE TODOS LOS REDUCERS
// AUTH, CALENDAR, UI

import { combineReducers } from "redux"
import { uiReducer } from "./uiReducer"


export const rootReducers = combineReducers({
      ui: uiReducer,
      // TODO AuthReducer
      // TODO CalendarReducer
})
