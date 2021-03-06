// usuario autenticado

import { types } from "../types/types";

const initialState = {
      // cuando la aplicacion se carga, necesito verificar
      // si el usuario esta autenticado previamente, caso contrario hay que mandarlo al login
      checking: true,
      // uid: null,
      // name: null
}

export const authReducer = (state = initialState, action) => {

      switch (action.type) {

            case types.authLogin:
                  return {
                        ...state,
                        ...action.payload,
                        checking: false,
                  }

            case types.authCheckingFinish:
                  return {
                        ...state,
                        checking: false
                  }

            case types.authLogout:
                  return {
                        checking: false
                  }

            default:
                  return state;
      }
}