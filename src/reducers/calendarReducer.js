import { types } from "../types/types";

//referencia
// {
//       id: from DB,
//       title: 'Cumpleaños del jefe',
//       start: moment().toDate(),
//       end: moment().add(2, 'hours').toDate(),
//       notes: 'Comprar queso',
//       user: {
//            _id: '123',
//            name: 'Santiago'
//        }
// }

const initialState = {
      events: [],
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
            case types.eventClearActiveEvent:
                  return {
                        ...state,
                        activeEvent: null
                  }
            case types.eventUpdate:
                  return {
                        ...state,
                        // como quiero actualizar un evento y el evento esta dentro del arreglo
                        // de events -> tengo que mapear para buscar el evento que quiero 
                        // actualizar
                        events: state.events.map(
                              e => (e.id === action.payload.id) ? action.payload : e
                        )
                        // action.payload es todo el nuevo evento modificado
                        // e => es evento como estaba en un principio
                  }
            case types.eventDeleted:
                  return {
                        ...state,
                        events: state.events.filter(
                              e => (e.id !== state.activeEvent.id)
                        ),
                        activeEvent: null
                  }
            case types.eventLoaded:
                  return {
                        ...state,
                        events: [...action.payload]
                  }
            case types.eventCleanStorage:
                  return {
                        ...initialState
                  }

            default:
                  return state;
      }
};