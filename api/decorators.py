import functools
import logging

from fastapi import HTTPException

from scales_driver_async.exeptions import (ConnectorError,
                                           ScalesError,
                                           ScalesFunctionNotSupported)

logger = logging.getLogger('uvicorn.error')


def driver_handler(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except LookupError:
            scales_id = kwargs.get('scale_id', '')
            message = f'Весы с id = "{scales_id}" не найдены.'
            raise HTTPException(
                status_code=404,
                detail=message
            )
        except ConnectorError as e:
            logger.error(f'{kwargs}. {e}')
            raise HTTPException(
                status_code=503,
                detail='Нет ответа от весов.'
            )
        except ScalesFunctionNotSupported as e:
            raise HTTPException(
                status_code=405,
                detail='Функция не поддерживается весами.'
            )
        except ScalesError as e:
            logger.error(f'{kwargs}. {e}')
            raise HTTPException(
                status_code=202,
                detail='Получен неверный ответ от весов.'
            )

    return wrapper
