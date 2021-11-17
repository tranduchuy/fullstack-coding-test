import React, { Dispatch, useContext, useReducer, useState } from "react";
import { ActionTypes } from "./actions";

type AppStateProps = {
  user: any;
};

const defaultAppState: AppStateProps = {
  user: null
};

type Action = {
  type: string;
  payload: any;
}

const AppStateContext = React.createContext<AppStateProps>(defaultAppState);
const AppDispatchContext = React.createContext<Dispatch<Action>>(() => {});

const MainReducer = (state: AppStateProps, action: Action): AppStateProps => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}

export const AppProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
  const [state, dispatch] = useReducer(MainReducer, defaultAppState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext);
}

export const useAppDispatch = () => {
  return useContext(AppDispatchContext);
}