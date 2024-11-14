import { AxiosError } from 'axios';
import { FC, ReactNode } from 'react';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

type Props = {
  children: ReactNode;
};

const globalHandleError = (error: AxiosError | Error): void => {
  console.log('Сработал глобальный обработчик');
  console.log(error);
  // if (
  //   isAxiosError(error) &&
  //   (error.response?.status === 400 || error.response?.status === 401)
  // )
  //   return;
  //
  // if (isAxiosError(error) && error.response?.status === 403) {
  //   store.dispatch(
  //     openAlert({
  //       message: error.response.data.detail ?? 'Доступ запрещён.',
  //       alertType: 'error',
  //     }),
  //   );
  //
  //   return;
  // }
  //
  // if (isAxiosError(error) && error.response?.status === 404) {
  //   if (
  //     // если у пользователя не начата рабочая смена - это нормальное состояние
  //     error.config?.url === '/work_shifts/me/' &&
  //     error.config.method === 'get'
  //   )
  //     return;
  //
  //   const responseDetailMessage: string =
  //     typeof error.response.data.detail === 'string'
  //       ? error.response.data.detail
  //       : 'Данные не найдены';
  //
  //   store.dispatch(
  //     openAlert({
  //       message: responseDetailMessage.includes('Страница не найдена')
  //         ? 'Данные не найдены'
  //         : responseDetailMessage,
  //       alertType: 'error',
  //     }),
  //   );
  //
  //   return;
  // }
  //
  // if (isAxiosError(error) && error.code === 'ERR_CANCELED') return;
  //
  // if (isAxiosError(error) && error.code === 'ERR_NETWORK') {
  //   store.dispatch(
  //     openAlert({
  //       message:
  //         !!error.config?.baseURL && error.config?.baseURL.includes('weight')
  //           ? 'Нет данных с весов'
  //           : 'Не удалось подключиться к серверу',
  //       alertType: 'error',
  //     }),
  //   );
  //
  //   return;
  // }
  //
  // if (isAxiosError(error) && error.response?.status === 500) {
  //   store.dispatch(
  //     openAlert({ message: 'Ошибка сервера', alertType: 'error' }),
  //   );
  //
  //   return;
  // }
  //
  // if (isAxiosError(error) && error.response?.status === 503) {
  //   store.dispatch(
  //     openAlert({
  //       message:
  //         !!error.config?.baseURL &&
  //         error.config?.baseURL.includes('weight') &&
  //         error.response.data.detail
  //           ? error.response.data.detail
  //           : 'Сервер недоступен',
  //       alertType: 'error',
  //     }),
  //   );
  //
  //   return;
  // }
  //
  // if (error instanceof Error && error.message) {
  //   store.dispatch(
  //     openAlert({
  //       message: error.message || 'Обнаружены неизвестные ошибки.',
  //       alertType: 'error',
  //     }),
  //   );
  //
  //   if (IS_DEV) {
  //     // eslint-disable-next-line no-console
  //     console.log(error);
  //   }
  // }
};

export const QueryAppProvider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: globalHandleError,
    }),
    mutationCache: new MutationCache({
      onError: globalHandleError,
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
