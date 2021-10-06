---
title: '2020_Houston_flights_delay_dashboard'
date: 2021-09-30
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  # teaser: "/images/20210805_blog_pymol/show_session.png"
tags:
- Bokeh
- Dashboard
- Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Create standalone Bokeh dashboard.

Check this blog on [github]().

**Contents:**
- [1 .Introduction](#1-introduction)
- [2. Data collecting and processing](#2-data-collecting-and-processing)
  - [2.1 Collecting data by `anyflights`](#21-collecting-data-by-anyflights)
  - [2.2 Combining 12 months data](#22-combining-12-months-data)
  - [2.3 Add logitude and latitude to Hou_flights](#23-add-logitude-and-latitude-to-hou_flights)
  - [2.4 Delay time statistics (arrival delay's mean, max, min)](#24-delay-time-statistics-arrival-delays-mean-max-min)
- [3. Creating dashboard step by step](#3-creating-dashboard-step-by-step)
  - [3.1](#31)

## 1 .Introduction

Bokeh is a Python library for creating interactive visualizations for modern web browsers. According to this [blog](), I collected information about all flights depart Houston in 2020. 

## 2. Data collecting and processing

### 2.1 Collecting data by `anyflights`

The [anyflights](https://github.com/simonpcouch/anyflights) package supplies a set of functions to generate air travel data (and data packages!) similar to [nycflights13](https://github.com/hadley/nycflights13). With a user-defined year and airport, the anyflights function will grab data on
- `flights`: all flights that departed a given airport in a given year and month
- `weather`: hourly meterological data for a given airport in a given year and month
- `airports`: airport names, FAA codes, and locations
- `airlines`: translation between two letter carrier (airline) codes and names
- `planes`: construction information about each plane found in flights

It's a `R` package, install the package and download the data in `Rstudio`:

- Download flights data: `HOUflights20_ <- anyflights(c("IAH", "HOU"), 2020)`
  
  Note: the package has bug now, but it can download all 12 months flights data. 

-Download airports data:  `airports <- get_airports()`

Write them to csv file. 

### 2.2 Combining 12 months data

Note: check details in this [notebook](https://github.com/ycheng22/Trye_Bokeh/blob/main/Bokeh_standalon_JS_demo/data/Data_Processing_part1.ipynb).

```python
import glob
import pandas as pd
from tqdm.notebook import tqdm

select_cols = ['FlightDate', 'Reporting_Airline', 'Origin', 'OriginCityName', 'OriginStateName', 
               'Dest', 'DestCityName', 'DestStateName', 'CRSDepTime', 'DepTime', 'DepDelay', 
               'CRSArrTime', 'ArrTime', 'ArrDelay']

Hou_flights = pd.DataFrame(columns = select_cols)
for name in tqdm(names):
    print(name)
    df = pd.read_csv(name, usecols=select_cols)
    df.dropna(inplace=True)
    df = df[(df['Origin']=='IAH') | (df['Origin']=='HOU')]
    Hou_flights = Hou_flights.append(df)

#add carrier name
carrier_names = pd.read_excel('airlines_code.xlsx')
Hou_flights = Hou_flights.merge(carrier_names, how = 'left', left_on = 'Reporting_Airline', right_on = 'carrier')
Hou_flights.to_csv('Hou_flights.csv', index=False)
```

### 2.3 Add logitude and latitude to Hou_flights

Note: check details in this [notebook](https://github.com/ycheng22/Trye_Bokeh/blob/main/Bokeh_standalon_JS_demo/data/Data_Processing_part2.ipynb).

```python
import glob
import pandas as pd
from tqdm.notebook import tqdm

#Add logitude and latitude to Hou_flights
Hou_flights = pd.read_csv('Hou_flights.csv')
air_columns = ['faa', 'lat', 'lon']
airport_orig = pd.read_csv("airports.csv", usecols = air_columns) #merge for origin location
airport_orig.rename(columns = {'lat': 'orig_lat', 'lon': 'orig_lon'}, inplace=True)
airport_dest = pd.read_csv("airports.csv", usecols = air_columns) #merger for destination location
airport_dest.rename(columns = {'lat': 'dest_lat', 'lon': 'dest_lon'}, inplace=True)

Hou_flights_location = Hou_flights.merge(airport_orig, how = 'left', left_on='Origin', right_on = 'faa')

Hou_flights_location = Hou_flights_location.merge(airport_dest, how = 'left', left_on='Dest', right_on = 'faa')

Hou_flights_location.drop(columns=['faa_x', 'faa_y'], inplace=True)
Hou_flights_location.to_csv('Hou_flights_location.csv', index=False)
```

### 2.4 Delay time statistics (arrival delay's mean, max, min)

Note: check details in this [notebook](https://github.com/ycheng22/Trye_Bokeh/blob/main/Bokeh_standalon_JS_demo/data/Data_Processing_part2.ipynb).

```python
Hou_flights_location = pd.read_csv('Hou_flights_location.csv')

#group by carrier, destination, 
#mean, max, min of arrival delay time, number of flights
df1 = Hou_flights_location.groupby(by=['name', 'Dest', 'Origin'])['ArrDelay'].agg(['mean', 'max', 'min']).reset_index()
counts =  pd.DataFrame(Hou_flights_location.groupby(by=['name', 'Dest', 'Origin']).size().reset_index(name='counts'))

df1 = df1.merge(counts, how='left', on=['name', 'Dest', 'Origin'])
df1.rename(columns={'mean':'ArrDelay_mean', 'max':'ArrDelay_max', 'min':'ArrDelay_min'}, inplace=True)

df2 = Hou_flights_location[['name', 'Origin', 'OriginCityName', 
                         'OriginStateName', 'Dest', 'DestCityName', 'DestStateName','orig_lat',
                         'orig_lon', 'dest_lat', 'dest_lon']]

arr_delay = df1.merge(df2, how='left', on=['name', 'Dest', 'Origin'])

arr_delay.drop_duplicates(inplace=True)

arr_delay.to_csv('arr_delay.csv', index=False)
```

## 3. Creating dashboard step by step

Note: 
- check details in this [notebook](https://github.com/ycheng22/Trye_Bokeh/blob/main/Bokeh_standalon_JS_demo/scripts_nb/scripts_nb.ipynb).
- Final [dashboard](https://github.com/ycheng22/Trye_Bokeh/blob/main/Bokeh_standalon_JS_demo/scripts_nb/Hou_flights_delay_plots.html).
  
  *Note:* Download and open the html file in browser to explore the full function. 

### 3.1 