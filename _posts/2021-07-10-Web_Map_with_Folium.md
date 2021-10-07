---
title: 'Web Map with Folium'
date: 2021-07-10
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  teaser: "/images/20210710_web_map_Folium/map24.png"
tags:
  - Web Map
  - Folium
  - Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: Build a web map with [Folium](https://github.com/python-visualization/folium).

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2021-07-10-Web_Map_with_Folium.md).

**Contents:**
- [1. Create a map](#1-create-a-map)
- [2. Add marker](#2-add-marker)
  - [2.1 Add single marker](#21-add-single-marker)
  - [2.2 Add multiple markers from file](#22-add-multiple-markers-from-file)
  - [2.3 Add elevation to popup](#23-add-elevation-to-popup)
  - [2.4 Color generate function for markers](#24-color-generate-function-for-markers)
  - [2.5 Circle markers](#25-circle-markers)
- [3. Add population layer with json data](#3-add-population-layer-with-json-data)
  - [3.1 Add population layer](#31-add-population-layer)
  - [3.2 Stylize the population layer](#32-stylize-the-population-layer)
- [4 Add layer control panel](#4-add-layer-control-panel)

## 1. Create a map

```python
#import packages
import folium
import pandas as pd
```

```python
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map1.png)

## 2. Add marker

### 2.1 Add single marker
```python
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")
fg = folium.FeatureGroup(name="My map")
fg.add_child(folium.Marker(location=[38.2, -99.1], popup="I am a marker", tooltip="click me", icon=folium.Icon(color="green")))
mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map21.png)

### 2.2 Add multiple markers from file
```python
data = pd.read_csv("Volcanoes.txt")

#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])

mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

for lt, ln in zip(lat, lon):
    fg.add_child(folium.Marker(location=[lt, ln], popup="I am a marker", tooltip="click me", 
                              icon=folium.Icon(color="green")))

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map22.png)

### 2.3 Add elevation to popup

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.Marker(location=[lt, ln], popup=str(el)+" m", tooltip="click me", 
                              icon=folium.Icon(color="green")))

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map23.png)

### 2.4 Color generate function for markers

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.Marker(location=[lt, ln], popup=str(el)+" m", tooltip="click me", 
                              icon=folium.Icon(color=color_producer(el))))

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map24.png)

### 2.5 Circle markers

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=str(el)+" m", 
                fill_color=color_producer(el), color="grey", fill=True, fill_opacity=0.7))

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map25.png)

## 3. Add population layer with json data
### 3.1 Add population layer

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

#use circle marker
for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=str(el)+" m", 
                fill_color=color_producer(el), color="grey", fill=True, fill_opacity=0.7))

    #add world layer
fg.add_child(folium.GeoJson(data=open("world.json", "r", encoding="utf-8-sig").read())) 

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map31.png)

### 3.2 Stylize the population layer
Color the country by its population.

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

#use circle marker
for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=str(el)+" m", 
                fill_color=color_producer(el), color="grey", fill=True, fill_opacity=0.7))

#add world layer
fg.add_child(folium.GeoJson(data=open("world.json", "r", encoding="utf-8-sig").read(),
    style_function=lambda x: {"fillColor":"yellow" if x["properties"]["POP2005"] < 10000000
    else "orange" if 10000000 <= x["properties"]["POP2005"] < 20000000 else "red" })) 

mp.add_child(fg)
mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map32.png)

## 4 Add layer control panel

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fg = folium.FeatureGroup(name="My map")

#use circle marker
for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=str(el)+" m", 
                fill_color=color_producer(el), color="grey", fill=True, fill_opacity=0.7))

#add world layer
fg.add_child(folium.GeoJson(data=open("world.json", "r", encoding="utf-8-sig").read(),
    style_function=lambda x: {"fillColor":"yellow" if x["properties"]["POP2005"] < 10000000
    else "orange" if 10000000 <= x["properties"]["POP2005"] < 20000000 else "red" })) 

mp.add_child(fg)
mp.add_child(folium.LayerControl()) #add layer control panel

mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map41.png)

Now you only have one layer with name `"My map"`, because you only have one layer `fg`. To control different layers seperately, we need to set different name for different layer.

```python
#data = pd.read_csv("Volcanoes.txt")
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#color markers by elevation
def color_producer(elevation):
    if elevation < 1000:
        return "green"
    elif 1000 <= elevation < 3000:
        return "orange"
    else:
        return "red"
    
mp = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles="Stamen Terrain")

fgv = folium.FeatureGroup(name="Volcanoes")

#use circle marker
for lt, ln, el in zip(lat, lon, elev):
    fgv.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=str(el)+" m", 
                fill_color=color_producer(el), color="grey", fill=True, fill_opacity=0.7))

fgp = folium.FeatureGroup(name="Population")
#add world layer
fgp.add_child(folium.GeoJson(data=open("world.json", "r", encoding="utf-8-sig").read(),
    style_function=lambda x: {"fillColor":"yellow" if x["properties"]["POP2005"] < 10000000
    else "orange" if 10000000 <= x["properties"]["POP2005"] < 20000000 else "red" })) 

mp.add_child(fgv)
mp.add_child(fgp)
mp.add_child(folium.LayerControl()) #add layer control panel

mp.save("Map1.html")
mp
```
![name](/images/20210710_web_map_Folium/map42.png)

Now there are two layers: `Volcanoes` and `Population`.