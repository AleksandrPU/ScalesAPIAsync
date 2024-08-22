from fastapi import FastAPI
from pydantic import BaseModel

from scales_driver_async.drivers import ScalesDriver

from config import settings
from decorators import driver_handler


scales: dict[str, ScalesDriver] = settings.scales

status_repr = {
    ScalesDriver.STATUS_STABLE: 'stable',
    ScalesDriver.STATUS_UNSTABLE: 'unstable',
    ScalesDriver.STATUS_OVERLOAD: 'overloaded'
}
unknown_status = 'unknown'


class ScaleModel(BaseModel):
    id: str
    name: str


class InfoModel(BaseModel):
    info: str


class WeightModel(BaseModel):
    weight: str = '0'
    status: str = 'unknown'


class ErrMessage(BaseModel):
    detail: str


err_responses = {
    202: {
        'model': ErrMessage,
        'description': 'No response from device or device error'
    },
    404: {
        'model': ErrMessage, 'description': 'Not found'
    },
    500: {
        'model': ErrMessage,
        'description': 'Internal Server Error.'
    }
}


app = FastAPI(title='ScalesAPIAsync',
              debug=settings.DEBUG,
              docs_url='/api/docs',
              redoc_url='/api/redoc')


@app.get('/api/scales')
async def get_scales_list() -> list[ScaleModel]:
    return [ScaleModel(id=s_id, name=s.name) for s_id, s in scales.items()]


@app.get(
    '/api/scales/{scale_id}/weight',
    responses=err_responses
)
@driver_handler
async def get_weight(scale_id: str) -> WeightModel:
    weight, status = await (scales[scale_id]
                            .get_weight(ScalesDriver.UNIT_KG))
    return WeightModel(weight=str(weight),
                       status=status_repr.get(status, unknown_status))


@app.get(
    '/api/scales/{scale_id}/info',
    responses=err_responses
)
@driver_handler
async def get_info(scale_id: str) -> InfoModel:
    return InfoModel(info=await scales[scale_id].get_info())
