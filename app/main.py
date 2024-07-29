from fastapi import FastAPI
from pydantic import BaseModel

from config import settings
from decorators import driver_handler
from scales_driver_async.drivers import ScalesDriver

scales: dict[str, ScalesDriver] = settings.scales

status_repr = {
    ScalesDriver.STATUS_STABLE: 'stable',
    ScalesDriver.STATUS_UNSTABLE: 'unstable',
    ScalesDriver.STATUS_OVERLOAD: 'overloaded'
}
unknown_status = 'unknown'


class Weight(BaseModel):
    weight: str = '0'
    status: str = 'unknown'


app = FastAPI(title=settings.APP_NAME, debug=settings.DEBUG)


@app.get("/scales/{scale_id}/weight")
@driver_handler
async def get_weight(scale_id: str) -> Weight:
    weight, status = await (scales[scale_id]
                            .get_weight(ScalesDriver.UNIT_KG))
    return Weight(weight=str(weight),
                  status=status_repr.get(status, unknown_status))


@app.get("/scales/{scale_id}/info")
@driver_handler
async def get_info(scale_id: str) -> str:
    return await (scales[scale_id].get_info())
