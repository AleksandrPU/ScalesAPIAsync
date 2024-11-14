import {
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import MuiCard from '@mui/material/Card';
import { FC, useState } from 'react';
import {
  useServerError,
  useServerErrorDispatch,
} from '../../contexts/ServerErrorContext';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '800px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const ScalesDataContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export const ScalesData: FC = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const dispatch = useServerErrorDispatch();
  const serverError = useServerError();

  return (
    <ScalesDataContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Stack>
          <Typography variant="h4" mb={2}>
            Данные с весов{' '}
          </Typography>
          <Stack sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: '40%', mb: 4 }}>
              <Select value={age} onChange={handleChange}>
                <MenuItem value={10}>Крановые весы</MenuItem>
                <MenuItem value={20}>Настольные весы</MenuItem>
                <MenuItem value={30}>Весы для отладки</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Divider />
          <Button
            onClick={() =>
              dispatch({
                type: 'set',
                payload: { code: 404, message: 'Азаза не найдено' },
              })
            }
          >
            сет
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: 'clear',
              })
            }
          >
            очистить
          </Button>
          {serverError && (
            <Typography>
              {serverError.code} {serverError.message}
            </Typography>
          )}
        </Stack>
      </Card>
    </ScalesDataContainer>
  );
};
