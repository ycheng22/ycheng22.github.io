---
title: 'SQL on HackerRank'
date: 2020-07-15
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  # teaser: "/images/show_session.png"
categories:
  - blog
tags:
  - SQL
  - HackerRank
  - MySQL
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: solving the SQL problems on HackerRank.

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2020-07-15-SQL_on_HackerRank.md)

- [Aggregation](#aggregation)
  - [Revising Aggregations - The Count Function](#revising-aggregations---the-count-function)
  - [Revising Aggregations - Averages](#revising-aggregations---averages)
  - [Average Population](#average-population)
  - [Japan Population](#japan-population)
  - [Population Density Difference](#population-density-difference)
  - [The Blunder](#the-blunder)
  - [Top Earners](#top-earners)
  - [Weather Observation Station 2](#weather-observation-station-2)
  - [Weather Observation Station 13](#weather-observation-station-13)
  - [Weather Observation Station 14](#weather-observation-station-14)
  - [Weather Observation Station 15](#weather-observation-station-15)
  - [Weather Observation Station 16](#weather-observation-station-16)
  - [Weather Observation Station 17](#weather-observation-station-17)
  - [Weather Observation Station 18](#weather-observation-station-18)
  - [Weather Observation Station 19](#weather-observation-station-19)
  - [Weather Observation Station 20](#weather-observation-station-20)
- [Basic Join](#basic-join)
  - [Asian Population](#asian-population)
  - [African Cities](#african-cities)
  - [Average Population of Each Continent](#average-population-of-each-continent)
  - [The Report](#the-report)
  - [Top Competitors](#top-competitors)
  - [Ollivander's Inventory](#ollivanders-inventory)
  - [Challenges](#challenges)
  - [Contest Leaderboard](#contest-leaderboard)
- [Advanced Join](#advanced-join)
  - [SQL Project Planning](#sql-project-planning)
  - [Placements](#placements)
  - [Symmetric Pairs](#symmetric-pairs)
  - [Interviews](#interviews)

## Revising the Select Query I
<https://www.hackerrank.com/challenges/revising-the-select-query/problem>

```sql
SELECT * FROM CITY 
WHERE POPULATION > 100000 AND COUNTRYCODE='USA';
```

## Revising the Select Query II
<https://www.hackerrank.com/challenges/revising-the-select-query-2/problem>

```sql
SELECT NAME FROM CITY
WHERE POPULATION > 120000;
```

## Select All
<https://www.hackerrank.com/challenges/select-all-sql/problem>

```sql
SELECT * FROM CITY;
```

## Select By ID
<https://www.hackerrank.com/challenges/select-by-id/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT * FROM CITY WHERE ID=1661;
```

## Japanese Cities' Attributes
<https://www.hackerrank.com/challenges/japanese-cities-attributes/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```sql
SELECT * FROM CITY WHERE COUNTRYCODE='JPN';
```

## Japanese Cities' Names
<https://www.hackerrank.com/challenges/japanese-cities-name/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT NAME FROM CITY WHERE COUNTRYCODE='JPN';
```

## Weather Observation Station 1
<https://www.hackerrank.com/challenges/weather-observation-station-1/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```sql
SELECT CITY, STATE FROM STATION;
```

## Weather Observation Station 3
<https://www.hackerrank.com/challenges/weather-observation-station-3/problem>

```sql
SELECT DISTINCT CITY FROM STATION WHERE (ID%2)=0;
```

## Weather Observation Station 4
<https://www.hackerrank.com/challenges/weather-observation-station-4/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT (COUNT(CITY) - COUNT(DISTINCT CITY)) FROM STATION;
```

## Weather Observation Station 5
<https://www.hackerrank.com/challenges/weather-observation-station-5/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT city, LENGTH(city) FROM station
ORDER BY LENGTH(city), city ASC
LIMIT 1;
SELECT city, LENGTH(city) FROM station
ORDER BY LENGTH(city) DESC, city ASC
LIMIT 1;
```

## Weather Observation Station 6
<https://www.hackerrank.com/challenges/weather-observation-station-6/problem?h_r=next-challenge&h_v=zen>

Solution 1:
```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP "^[aeiou].*";
```
Solution 2:
```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LOWER(SUBSTRING(CITY, 1, 1)) 
IN ('a', 'e', 'i', 'o', 'u');
```

## Weather Observation Station 7
<https://www.hackerrank.com/challenges/weather-observation-station-7/problem>

Solution 1:
```sql
SELECT DISTINCT CITY FROM STATION WHERE CITY REGEXP '[aeiou]$';
```
Solution 2:
```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LOWER(SUBSTRING(CITY, LENGTH(CITY), 1)) 
IN ('a', 'e', 'i', 'o', 'u');
```
Solution 3:
```sql
SELECT DISTINCT CITY FROM STATION 
WHERE RIGHT(CITY, 1) 
IN ('a', 'e', 'i', 'o', 'u');
```

## Weather Observation Station 8
<https://www.hackerrank.com/challenges/weather-observation-station-8/problem?h_r=next-challenge&h_v=zen>

Solution 1:
```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LEFT(CITY, 1) IN ('a','e','i','o','u')
AND RIGHT(CITY, 1) IN ('a','e','i','o','u');
```
Solution 2:
```sql
SELECT DISTINCT CITY FROM STATION 
WHERE CITY RLIKE '^[aeiou].*[aeiou]$';
```

## Weather Observation Station 9
<https://www.hackerrank.com/challenges/weather-observation-station-9/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LEFT(CITY, 1) NOT IN ('a','e','i','o','u');
```

## Weather Observation Station 10
<https://www.hackerrank.com/challenges/weather-observation-station-10/problem>

```sql
SELECT DISTINCT CITY FROM STATION 
WHERE RIGHT(CITY, 1) NOT IN ('a','e','i','o','u');
```

## Weather Observation Station 11
<https://www.hackerrank.com/challenges/weather-observation-station-11/problem>

```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LEFT(CITY, 1) NOT IN ('a','e','i','o','u')
OR RIGHT(CITY, 1) NOT IN ('a','e','i','o','u');
```

## Weather Observation Station 12
<https://www.hackerrank.com/challenges/weather-observation-station-12/problem>

```sql
SELECT DISTINCT CITY FROM STATION 
WHERE LEFT(CITY, 1) NOT IN ('a','e','i','o','u')
AND RIGHT(CITY, 1) NOT IN ('a','e','i','o','u');
```

## Higher Than 75 Marks
<https://www.hackerrank.com/challenges/more-than-75-marks/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT Name FROM STUDENTS 
WHERE Marks>75 
ORDER BY RIGHT(Name, 3), ID ASC;
```

## Employee Names
<https://www.hackerrank.com/challenges/name-of-employees/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT name FROM Employee ORDER BY name ASC;
```

## Employee Salaries
<https://www.hackerrank.com/challenges/salary-of-employees/problem>

```sql
SELECT name FROM Employee
WHERE salary > 2000 AND months < 10;
```

## Type of Triangle
<https://www.hackerrank.com/challenges/what-type-of-triangle/problem>

```sql
SELECT CASE
            WHEN A+B>C AND B+C>A AND C+A>B THEN
                CASE 
                    WHEN A=B AND B=C THEN 'Equilateral'
                    WHEN A=B OR B=C OR C=A THEN 'Isosceles'
                    ELSE 'Scalene'
                END
            ELSE 'Not A Triangle'
        END
FROM TRIANGLES; 
```

## The PADS
<https://www.hackerrank.com/challenges/the-pads/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT CONCAT(Name, '(', SUBSTRING(Occupation,1,1),')') AS Name
FROM OCCUPATIONS ORDER BY Name ASC;
SELECT CONCAT('There are a total of', ' ', COUNT(Occupation), ' ', LOWER(Occupation), 's.') AS Total
FROM OCCUPATIONS GROUP BY Occupation ORDER BY Total;
```

## [Unsolved] Occupations 
<https://www.hackerrank.com/challenges/occupations/problem?h_r=next-challenge&h_v=zen>

```sql

```

## Binary Tree Nodes 
<https://www.hackerrank.com/challenges/binary-search-tree-1/problem>

```sql
SELECT CASE
        WHEN P IS NULL THEN CONCAT(N, ' Root')
        WHEN N IN (SELECT DISTINCT P FROM BST) THEN CONCAT(N, ' Inner')
        ELSE CONCAT(N, ' Leaf')
        END
FROM BST
ORDER BY N ASC;
```

## New Companies
<https://www.hackerrank.com/challenges/the-company/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT company_code, founder, 
(SELECT COUNT(DISTINCT lead_manager_code) FROM Lead_Manager WHERE company_code=c.company_code),
(SELECT COUNT(DISTINCT senior_manager_code) FROM Senior_Manager WHERE company_code=c.company_code),
(SELECT COUNT(DISTINCT manager_code) FROM Manager WHERE company_code=c.company_code),
(SELECT COUNT(DISTINCT employee_code) FROM Employee WHERE company_code=c.company_code)
FROM Company c
ORDER BY company_code;
```

# Aggregation

## Revising Aggregations - The Count Function
<https://www.hackerrank.com/challenges/revising-aggregations-the-count-function/problem>

```sql
SELECT COUNT(*) FROM CITY WHERE POPULATION > 100000;
```

## Revising Aggregations - Averages
<https://www.hackerrank.com/challenges/revising-aggregations-the-average-function/problem>

```sql
SELECT AVG(POPULATION) FROM CITY WHERE DISTRICT = 'California';
```

## Average Population
<https://www.hackerrank.com/challenges/average-population/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT FLOOR(AVG(POPULATION)) FROM CITY;
```

## Japan Population
<https://www.hackerrank.com/challenges/japan-population/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT SUM(POPULATION) FROM CITY WHERE COUNTRYCODE = 'JPN';
```

## Population Density Difference
<https://www.hackerrank.com/challenges/population-density-difference/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```sql
SELECT MAX(POPULATION)-MIN(POPULATION) FROM CITY;
```

## The Blunder
<https://www.hackerrank.com/challenges/the-blunder/problem>

```sql
SELECT CEIL(AVG(Salary)-AVG(REPLACE(Salary, '0', ''))) FROM EMPLOYEES;
```

## Top Earners
<https://www.hackerrank.com/challenges/earnings-of-employees/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT salary * months AS earnings, COUNT(*)
FROM Employee 
GROUP BY earnings
ORDER BY earnings DESC
LIMIT 1;
```

## Weather Observation Station 2
<https://www.hackerrank.com/challenges/weather-observation-station-2/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT ROUND(SUM(LAT_N), 2), ROUND(SUM(LONG_W), 2) FROM STATION;
```

## Weather Observation Station 13
<https://www.hackerrank.com/challenges/weather-observation-station-13/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT TRUNCATE(SUM(LAT_N), 4) FROM STATION WHERE  LAT_N BETWEEN 38.7880 AND 137.2345;
```

*Note:

`ROUND` vs `TRUNCATE`:
```sql
Select ROUND(1.289,2)AS 'AFTER ROUND',TRUNCATE(1.289,2)AS 'AFTER TRUNCATE';
```
| AFTER ROUND | AFTER TRUNCATE |
| ----------- | -------------- |
|        1.29 |           1.28 |

## Weather Observation Station 14
<https://www.hackerrank.com/challenges/weather-observation-station-14/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT TRUNCATE(MAX(LAT_N), 4) FROM STATION WHERE LAT_N < 137.2345;
```

## Weather Observation Station 15
<https://www.hackerrank.com/challenges/weather-observation-station-15/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```sql
SELECT ROUND(LONG_W, 4) FROM STATION 
WHERE LAT_N < 137.2345 
ORDER BY LAT_N DESC 
LIMIT 1;
```

## Weather Observation Station 16
<https://www.hackerrank.com/challenges/weather-observation-station-16/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT ROUND(MIN(LAT_N), 4) FROM STATION 
WHERE LAT_N > 38.7780;
```

## Weather Observation Station 17
<https://www.hackerrank.com/challenges/weather-observation-station-17/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```sql
SELECT ROUND(LONG_W, 4) FROM STATION 
WHERE LAT_N > 38.7780 
ORDER BY LAT_N ASC 
LIMIT 1;
```

## Weather Observation Station 18
<https://www.hackerrank.com/challenges/weather-observation-station-18/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT ROUND(ABS(MIN(LAT_N) - MAX(LAT_N)) + 
            ABS(MIN(LONG_W) - MAX(LONG_W)), 4) 
FROM STATION;
```

## Weather Observation Station 19
<https://www.hackerrank.com/challenges/weather-observation-station-19/problem>

```sql
SELECT ROUND(SQRT(POWER(MAX(LAT_N)-MIN(LAT_N), 2) + 
                POWER(MAX(LONG_W)-MIN(LONG_W), 2)
                ), 4)
FROM STATION;
```

## Weather Observation Station 20
<https://www.hackerrank.com/challenges/weather-observation-station-20/problem?h_r=next-challenge&h_v=zen>

```sql
SET @ROWINDEX := -1;
SELECT ROUND(AVG(LAT_N), 4)
FROM
(SELECT @ROWINDEX := @ROWINDEX + 1 AS ROWINDEX, LAT_N 
FROM STATION ORDER BY LAT_N) AS L
WHERE L.ROWINDEX IN (FLOOR(@ROWINDEX/2), CEIL(@ROWINDEX/2));
```

# Basic Join

## Asian Population
<https://www.hackerrank.com/challenges/asian-population/problem>

```sql
SELECT SUM(CITY.POPULATION) 
FROM CITY, COUNTRY
WHERE CITY.COUNTRYCODE = COUNTRY.CODE AND COUNTRY.CONTINENT = 'Asia';
```

## African Cities
<https://www.hackerrank.com/challenges/african-cities/problem>

```sql
SELECT CITY.NAME FROM CITY INNER JOIN COUNTRY
ON COUNTRYCODE = CODE
WHERE CONTINENT = 'Africa';
```

## Average Population of Each Continent
<https://www.hackerrank.com/challenges/average-population-of-each-continent/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT COUNTRY.CONTINENT, FLOOR(AVG(CITY.POPULATION))
FROM CITY INNER JOIN COUNTRY
ON CITY.COUNTRYCODE = COUNTRY.CODE
GROUP BY COUNTRY.CONTINENT;     
```

## The Report
<https://www.hackerrank.com/challenges/the-report/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT IF(GRADE <8, NULL, NAME), GRADE, MARKS
FROM STUDENTS JOIN GRADES
WHERE MARKS BETWEEN MIN_MARK AND MAX_MARK
ORDER BY GRADE DESC, NAME, MARKS;
```

## Top Competitors
<https://www.hackerrank.com/challenges/full-score/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT h.hacker_id, h.name
FROM submissions s 
INNER JOIN challenges c
ON s.challenge_id = c.challenge_id
INNER JOIN difficulty d
ON c.difficulty_level = d.difficulty_level
INNER JOIN hackers h
ON s.hacker_id = h.hacker_id
WHERE s.score = d.score and c.difficulty_level = d.difficulty_level
GROUP BY h.hacker_id, h.name
HAVING COUNT(s.hacker_id) > 1
ORDER BY COUNT(s.hacker_id) DESC, s.hacker_id ASC;
```

## Ollivander's Inventory
<https://www.hackerrank.com/challenges/harry-potter-and-wands/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT W.id, P.age, W.coins_needed, W.power
FROM Wands AS W
INNER JOIN Wands_Property AS P 
ON W.code = P.code
WHERE P.is_evil = 0 AND W.coins_needed = 
    (SELECT MIN(coins_needed)
    FROM Wands AS W1 
     INNER JOIN Wands_Property AS P1 
     ON W1.code = P1.code
     WHERE W1.power = W.power and P1.age = P.age)
ORDER BY W.power DESC, P.age DESC;
```

## Challenges
<https://www.hackerrank.com/challenges/challenges/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT h.hacker_id, h.name, COUNT(c.hacker_id)
FROM Hackers AS h, Challenges AS c
WHERE h.hacker_id = c.hacker_id
GROUP BY h.hacker_id, h.name
HAVING COUNT(c.hacker_id) NOT IN 
    (
    SELECT DISTINCT COUNT(hacker_id) 
     FROM Challenges 
        WHERE hacker_id <> h.hacker_id  /* ???????????  */
        GROUP BY hacker_id 
        HAVING COUNT(hacker_id) < 
        (SELECT MAX(x.challenge_count)  /* select max num of chanllenges */
         FROM (SELECT COUNT(c.challenge_id) AS challenge_count  
               FROM Challenges c 
               GROUP BY c.hacker_id) AS x)
    )
ORDER BY COUNT(c.hacker_id) DESC, H.hacker_id;
```

## Contest Leaderboard
<https://www.hackerrank.com/challenges/contest-leaderboard/problem>

```sql
SELECT t2.hid, h.name, t2.score
FROM 
    (SELECT SUM(t1.maxscore) AS score, t1.hid AS hid
    FORM
        (SELECT MAX(score) AS maxscore, challenge_id AS cid, hacker_id AS hid
        FROM submissions
        WHERE score > 0
        GROUP BY hacker_id, challenge_id) t1
     GROUP BY hid) t2
JOIN hackers h
ON h.hacker_id = t2.hid
ORDER BY t2.score DESC, t2.hid ASC;
```

# Advanced Join

## SQL Project Planning
<https://www.hackerrank.com/challenges/sql-projects/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT Start_Date, MIN(End_Date)
/*Min means for the particular start_date, we get the closest end_date, that doesn't coincide with the start_date of another task*/
FROM 
    (SELECT Start_Date 
     FROM Projects 
     WHERE Start_Date NOT IN 
        (SELECT End_Date FROM Projects)) a,
    (SELECT End_Date 
     FROM Projects 
     WHERE End_Date NOT IN 
        (SELECT Start_Date FROM Projects)) b
WHERE Start_Date < End_Date
GROUP BY Start_Date
ORDER BY DATEDIFF(Start_Date, MIN(End_Date)) DESC, Start_Date;
```

## Placements
<https://www.hackerrank.com/challenges/placements/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT s.Name FROM Students s
INNER JOIN Friends f ON s.ID = f.ID
INNER JOIN Packages p ON s.ID = p.ID
INNER JOIN Packages p1 ON f.Friend_ID = p1.ID
WHERE p.Salary < p1.Salary
ORDER BY p1.Salary;
```

## Symmetric Pairs
<https://www.hackerrank.com/challenges/symmetric-pairs/problem?h_r=next-challenge&h_v=zen>

```sql
SELECT f1.X, f1.Y FROM Functions f1
INNER JOIN Functions f2 
ON f1.X = f2.Y AND f1.Y = f2.X
GROUP BY f1.X, f1.Y
HAVING COUNT(f1.X) > 1 OR f1.X < f1.Y
ORDER BY f1.X;
```

## Interviews
<https://www.hackerrank.com/challenges/interviews/problem>

```sql

```

```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```
```sql

```