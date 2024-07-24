from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from config import settings
from scales_driver_async.drivers import ScalesDriver


scales = settings.scales
app = FastAPI()


class Weight(BaseModel):
    weight: str = '25.1'
    status: int


@app.get("/scales/{scale_id}/weight")
async def get_weight(scale_id: str) -> Weight:
    scale = scales.get(scale_id, None)
    if scale is None:
        raise HTTPException(status_code=404)
    weight, status = await scales[scale_id].get_weight(ScalesDriver.UNIT_KG)
    return Weight(weight=str(weight), status=status)
