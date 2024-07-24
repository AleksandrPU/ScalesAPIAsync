import tomllib
from pprint import pprint
from typing import Type

from scales_driver_async.drivers import ScalesDriver, CASType6, MassK1C


class Settings:
    drivers = {
        'CASType6': CASType6,
        'MassK1C': MassK1C
    }

    def __init__(self):
        with open('settings.toml', 'r') as f:
            conf = tomllib.loads(f.read())
        self.scales = {}
        for s_id, s_params in conf['scales'].items():
            driver: Type[ScalesDriver] = self.drivers[s_params.pop('driver')]
            connection_params = s_params.pop('connection_params')
            self.scales[s_id] = driver(
                **s_params,
                **connection_params
            )


settings = Settings()
