import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { AppTheme } from './theme/AppTheme';
import { AppRoutes } from './AppRoutes/AppRoutes';
import { QueryAppProvider } from './QueryAppProvider';
import { ServerErrorProvider } from '../contexts/ServerErrorContext';

export const App: FC = () => {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ServerErrorProvider>
        <QueryAppProvider>
          <AppRoutes />
        </QueryAppProvider>
      </ServerErrorProvider>
    </AppTheme>
  );
};
