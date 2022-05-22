// import { moment } from "moment";

import { types } from "../types/types";

const initialState = {
      events: [{
            title: 'Cumpleaños del jefe',
            // start: moment().toDate(),
            // end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'Comprar queso',
            user: {
                  _id: '123',
                  name: 'Santiago'
            }
      }],
      activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {

      switch (action.type) {
            case types.eventSetActive:
                  return {
                        ...state,
                        activeEvent: action.payload
                  }
            case types.eventAddNew:
                  return {
                        ...state,
                        // Todos los eventos que se van agregando
                        events: [
                              ...state.events,
                              // el nuevo formulario que estoy guardando
                              action.payload
                        ]
                  }


            default:
                  return state;
      }
};