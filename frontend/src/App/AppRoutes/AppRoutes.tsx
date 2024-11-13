import { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { SuspenseLoadingSpinner } from './SuspenseLoadingSpinner';
import { ErrorBoundary } from '../ErrorBoundary';

// const Login = lazy(() =>
//   import('Login').then((module) => ({
//     default: module.Login,
//   })),
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseLoadingSpinner>
        <> </>
      </SuspenseLoadingSpinner>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export const AppRoutes = (): ReactNode => {
  return <RouterProvider router={router} />;
};
