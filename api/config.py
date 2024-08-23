import os
import tomllib
from typing import Type
from dotenv import load_dotenv

from scales_driver_async.drivers import CASType6, MassK1C, ScalesDriver

load_dotenv()

class Settings:
    _DRIVERS = {
        'CASType6': CASType6,
        'MassK1C': MassK1C
    }
    _CONF_FILE = r'settings.toml'
    _ERR_MSG = f'Ошибка конфигурации. Файл {_CONF_FILE}. {{details}}'

    DEBUG = os.getenv('DEBUG', 'False') == 'true'
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '').split(', ')

    def __init__(self):
        try:
            with open(self._CONF_FILE, 'r') as f:
                conf = tomllib.loads(f.read())
        except FileNotFoundError:
            raise FileNotFoundError(
                f'Не найден файл конфигурации "{self._CONF_FILE}"'
            )

        if 'scales' not in conf:
            raise ValueError(
                self._ERR_MSG.format(
                    details='Добавьте раздел "[scales.<unique_id>]".')
            )

        self.scales = {}
        for s_id, s_params in conf['scales'].items():
            if type(s_params) is not dict:
                raise ValueError(
                    self._ERR_MSG.format(
                        details='Неверно сконфигурирован раздел "[scales]". '
                                'Параметры весов должны находиться во '
                                'вложенном разделе "[scales.<unique_id>]".'
                    )
                )
            missed_params = ({'name', 'driver', 'connection_type'}
                             - set(s_params.keys()))
            if missed_params:
                raise ValueError(
                    self._ERR_MSG.format(
                        details=f'Раздел "[scales.{s_id}]". '
                                f'Отсутствуют  обязательные параметры: '
                                f'{", ".join(missed_params)}.')
                )
            if s_params['driver'] not in self._DRIVERS:
                raise ValueError(self._ERR_MSG.format(
                    details=f'Раздел "[scales.{s_id}]". Не найден драйвер '
                            f'{s_params["driver"]}')
                )

            driver: Type[ScalesDriver] = self._DRIVERS[s_params.pop('driver')]
            self.scales[s_id] = driver(**s_params)


settings = Settings()
