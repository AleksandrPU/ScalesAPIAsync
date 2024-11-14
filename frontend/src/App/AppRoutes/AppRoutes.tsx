import { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound } from './PageNotFound';
import { SuspenseLoadingSpinner } from './SuspenseLoadingSpinner';
import { ErrorBoundary } from '../ErrorBoundary';
import { ScalesData } from '../ScalesData/ScalesData.tsx';

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
        <ScalesData />
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
