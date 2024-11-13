import { FC } from 'react';
import { AppTheme } from './theme/AppTheme';
import { QueryAppProvider } from './QueryAppProvider';
import { AppRoutes } from './AppRoutes/AppRoutes.tsx';

export const App: FC = () => {
  return (
    <QueryAppProvider>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </QueryAppProvider>
  );
};
