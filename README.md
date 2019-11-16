# Twitter EDF
## Purpose
This simple app intends to share on twitter the electric mix of Reunion Island twice a day (at midday and 10:00 PM).
Data is based on Open API https://opendata-reunion.edf.fr (dataset: prod-electricite-temps-reel) from EDF.
Licence of data: https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf

## Configuration
Define them for Twitter as environnement variable while running the script
`CONSUMER_KEY`
`CONSUMER_SECRET`
`ACCESS_KEY`
`ACCESS_SECRET`

## Deployement
The script only call EDF API to extract data and then send it to Twitter. To make it callable twice a day, simply use crontab.
```sh

````