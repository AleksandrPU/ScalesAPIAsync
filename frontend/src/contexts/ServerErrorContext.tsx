import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

type ServerError = {
  code: number;
  message: string;
} | null;

type Action = {
  type: 'set' | 'clear';
  payload?: ServerError;
};

const serverErrorReducer = (_: ServerError, action: Action): ServerError => {
  switch (action.type) {
    case 'set':
      return action.payload || null;
    case 'clear':
      return null;
    default:
      throw new Error(`Неизвестный action type: ${action.type}`);
  }
};

const ServerErrorContext = createContext<ServerError>(null);

const ServerErrorDispatchContext = createContext<Dispatch<Action>>(() => {});

export const useServerError = (): ServerError => useContext(ServerErrorContext);
export const useServerErrorDispatch = (): Dispatch<Action> =>
  useContext(ServerErrorDispatchContext);

export const ServerErrorProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [serverError, dispatch] = useReducer(serverErrorReducer, null);

  return (
    <ServerErrorContext.Provider value={serverError}>
      <ServerErrorDispatchContext.Provider value={dispatch}>
        {children}
      </ServerErrorDispatchContext.Provider>
    </ServerErrorContext.Provider>
  );
};
