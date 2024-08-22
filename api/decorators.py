import functools

from fastapi import HTTPException
from scales_driver_async.exeptions import ConnectorError, ScalesError


def driver_handler(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except LookupError:
            scales_id = kwargs.get('scale_id', '')
            raise HTTPException(
                status_code=404,
                detail=f'Весы с id = "{scales_id}" не найдены.'
            )
        except ConnectorError:
            raise HTTPException(
                status_code=202,
                detail='Нет ответа от весов.'
            )
        except ScalesError:
            raise HTTPException(
                status_code=202,
                detail='Получен неверный ответ от весов.'
            )
    return wrapper
