import { types } from "../types/types";


// Recibo en evento que quiero grabar
export const evenAddNew = (event) => ({
      type: types.eventAddNew,
      payload: event
});
export const eventSetActive = (event) => ({
      type: types.eventSetActive,
      payload: event
});
// limpiar la nota activa
export const eventClearActiveEvent = () => ({
      type: types.eventClearActiveEvent
})
export const eventUpdate = (event) => ({
      type: types.eventUpdate,
      payload: event
})
export const eventDelete = () => ({
      type: types.eventDeleted
})
