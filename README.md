# ScalesAPIAsync
## About
**ScalesAPIAsync** - это REST API сервис, предоставляющий единый интерфейс для работы с различными электронными весами. 
Поддерживает одновременную работу с неограниченным количеством весов с различными интерфейсами 
(RS-232, USB, Ethernet, Wi-Fi). **ScalesAPIAsync** использует драйвер **ScalesDriverAsync** для получения данных с весов. 
API реализован на FastAPI. Код драйвера и API асинхронный, что дает возможность интенсивной работы с большим 
количеством весом одновременно с минимальными задержками. 

## Requirements
- [Python 3](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [ScalesDriverAsync](https://pypi.org/project/scales-driver-async/)

**ScalesAPIAsync** может запускаться в контейнере **Docker**.

## Usage
- Скопируйте файлы [docker-compose.yml](https://github.com/kr-aleksey/ScalesAPIAsync/blob/master/infra_scales_api_async/docker-compose.yml) 
и [settings.toml](https://github.com/kr-aleksey/ScalesAPIAsync/blob/master/infra_scales_api_async/settings.toml).

- Отредактируйте файл конфигурации settings.toml в соответствии с настройками ваших весов.

- В консоли перейдите в папку со скопированными файлами и выполните: 
```
docker compose --profile dockerhub up
```
После запуска будет доступна документация API по адресам [http://localhost:8080/api/docs]() и 
[http://localhost:8080/api/redoc]()

Пример конфигурации settings.toml:
```toml
[scales.1]
name='Bench scales'
driver='CASType6'
connection_type='serial'
transfer_timeout=1.5
port='/dev/ttyUSB0'
baudrate=9600
bytesize=8
parity='N'
stopbits=1

[scales.2]
name='Crane scales'
driver='MassK1C'
connection_type='socket'
transfer_timeout=1
host='10.1.20.30'
port=9000
```
В этой конфигурации используется два типа весов. Первые весы подключены к USB порту через USB-COM адаптер и 
поддерживают протокол CAS type 6. Вторые подключены через локальную сеть и поддерживают протокол Масса-К 1С.

Разберем конфигурацию подробнее. Конфигурация каждого устройства должна находиться в своем разделе файла. Название
раздела должно начинаться со слова scales, через точку должен следовать уникальный id весов (например 1, 2 ...). По 
этому id весы будут доступны через API. В примере [scales.1] - id = 1. В каждом разделе должны быть обязательные 
параметры `name`, `driver`, `connection_type`, `transfer_timeout`'. Параметр `name` - любая строка с человеко читаемым 
идентификатором весов. `driver` - используемый драйвер (протокол). `connection_type` - тип соединения, socket для 
сетевых и 'serial' для USB-COM адаптеров и RS-232. `transfer_timeout` - время ожидания ответа весов в секундах.

Для сетевого соединения должны быть параметры `host` - доменное имя или ip адрес устройства и `port` - ip порт 
устройства. Для последовательного подключения необходимо указать параметры `port` - имя порта в системе (например 
'/dev/ttyUSB0' в Linux или 'COM3' в Windows), `baudrate` - скорость передачи в бит/сек, `bytesize` - количество 
бит (7 или 8), `parity` - проверка четности ('Y' или 'N') и `stopbits` - количество стоп битов (1 или 2).

