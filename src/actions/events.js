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