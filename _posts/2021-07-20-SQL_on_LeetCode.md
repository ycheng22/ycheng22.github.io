---
title: 'SQL on LeetCode'
date: 2021-07-20
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  # teaser: "/images/20210805_blog_pymol/show_session.png"
tags:
  - SQL
  - LeetCode
  - MySQL
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: solving the SQL problems on LeetCode.

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/master/_posts/2021-07-20-SQL_on_LeetCode.md)

- [175. Combine Two Tables](#175combine-two-tables)
- [176. Second Highest Salary](#176second-highest-salary)
- [177. Nth Highest Salary](#177nth-highest-salary)
- [178. Rank Scores](#178rank-scores)
- [180. Consecutive Numbers](#180consecutive-numbers)
- [181. Employees Earning More Than Their Managers](#181employees-earning-more-than-their-managers)
- [182. Duplicate Emails](#182duplicate-emails)
- [183. Customers Who Never Order](#183customers-who-never-order)
- [184. Department Highest Salary](#184department-highest-salary)
- [185. Department Top Three Salaries](#185department-top-three-salaries)
- [196. Delete Duplicate Emails](#196delete-duplicate-emails)
- [197. Rising Temperature](#197rising-temperature)
- [262. Trips and Users](#262trips-and-users)
- [511. Game Play Analysis I](#511game-play-analysis-i)
- [512. Game Play Analysis II](#512game-play-analysis-ii)
- [534. Game Play Analysis III](#534game-play-analysis-iii)
- [550. Game Play Analysis IV](#550game-play-analysis-iv)

## 175. Combine Two Tables
<https://leetcode.com/problems/combine-two-tables/>

```sql
SELECT FirstName, LastName, City, State 
FROM Person LEFT JOIN Address 
ON Person.PersonId = Address.PersonId;
```

## 176. Second Highest Salary
<https://leetcode.com/problems/second-highest-salary/>

Solution 1:

```sql
SELECT
    IFNULL(
        (SELECT DISTINCT Salary
        FROM Employee 
        ORDER BY Salary DESC
        LIMIT 1 OFFSET 1),
        NULL) AS SecondHighestSalary;
```
Solution 2:

```sql
SELECT MAX(Salary) AS SecondHighestSalary
FROM Employee
WHERE Salary < (SELECT MAX(Salary) FROM Employee);
```

## 177. Nth Highest Salary
<https://leetcode.com/problems/nth-highest-salary/>

```sql
CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
declare off int;
set off = N - 1;
    RETURN (
        SELECT (
            SELECT DISTINCT Salary 
            FROM Employee 
            ORDER BY Salary DESC 
            LIMIT 1 OFFSET off
        )
    );
END
```
**CREATE FUNCTION:**

<https://www.sqlshack.com/learn-sql-user-defined-functions/>

## 178. Rank Scores
<https://leetcode.com/problems/rank-scores/>

```sql
SELECT Score, DENSE_RANK()
OVER(ORDER BY Score DESC) AS `Rank`
FROM Scores;
```
*Note: 

In MySQL, to escape reserved words used as column names, use apostrophe besore and after the keyword, like \`Rank\`.

## 180. Consecutive Numbers
<https://leetcode.com/problems/consecutive-numbers/>

Solution 1:

```sql
SELECT DISTINCT 
    l1.Num AS ConsecutiveNums
FROM 
    Logs l1,
    Logs l2,
    Logs l3
WHERE
    l1.Id = l2.Id - 1
    AND l2.Id = l3.Id - 1
    AND l1.Num = l2.Num
    AND l2.Num = l3.Num;

```

Solution 2:

```sql
SELECT DISTINCT t.num AS ConsecutiveNums
FROM 
(
    SELECT Num AS num, LEAD(Num) OVER (ORDER BY Id) AS 'lead', LAG(Num) OVER (ORDER BY Id) AS 'lag'
    FROM Logs
) AS t
WHERE t.num = t.lead AND t.num = t.lag
```

## 181. Employees Earning More Than Their Managers
<https://leetcode.com/problems/employees-earning-more-than-their-managers/>

```sql
SELECT e1.Name AS Employee
FROM Employee e1
JOIN Employee e2
ON e1.ManagerId = e2.Id
WHERE e1.Salary > e2.Salary;
```

## 182. Duplicate Emails
<https://leetcode.com/problems/duplicate-emails/>

```sql
SELECT Email FROM Person
GROUP BY Email 
HAVING COUNT(Email) > 1;
```
## 183. Customers Who Never Order
<https://leetcode.com/problems/customers-who-never-order/>

Solution 1: 

```sql
SELECT Name AS Customers 
FROM Customers
WHERE id NOT IN (
    SELECT CustomerId FROM Orders
);
```

Soliution 2:

```sql
SELECT c.Name AS Customers
FROM Customers c
LEFT JOIN Orders o
ON c.Id = o.CustomerId
WHERE o.CustomerId IS NULL
```

## 184. Department Highest Salary
<https://leetcode.com/problems/department-highest-salary/>

```sql
SELECT d.Name AS Department, e.Name AS Employee, e.Salary AS Salary
FROM Employee e INNER JOIN Department d
ON e.DepartmentID = d.Id
WHERE (DepartmentId, Salary) IN 
    (SELECT DepartmentId, MAX(Salary) FROM Employee
     GROUP BY DepartmentId
     ORDER BY Salary DESC
    );
```

## 185. Department Top Three Salaries
<https://leetcode.com/problems/department-top-three-salaries/>

```sql
SELECT Department, Employee, Salary FROM (
    SELECT d.Name AS Department, 
        e.Name AS Employee, 
        e.Salary AS Salary,
        DENSE_RANK() OVER (PARTITION BY d.Name ORDER BY e.Salary DESC) AS rk
    FROM Employee e INNER JOIN Department d
    ON e.DepartmentId = d.Id
    ) AS sub 
WHERE sub.rk <= 3
```

*Note:

**PARTITION BY** vs **GROUP BY**:
<https://help.benchling.com/en/articles/4450361-how-is-partition-by-different-from-group-by>

A `GROUP BY` normally reduces the number of rows returned by rolling them up and calculating averages or sums for each row. 


`PARTITION BY` does not affect the number of rows returned, but it changes how a window function's result is calculated.

```sql
# user$raw
6 rows:
name number_of_registered_entities
User_1 | 8
User_2 | 10
User_3 | 8
User_2 | 1
User_3 | 5
User_1 | 7

# SQL query 1
GROUP BY:
SELECT name, SUM(number_of_registered_entities)entitysum from user$raw
GROUP BY name

# Output 1 
3 rows:
name entitysum
User_1 | 15
User_2 | 11
User_3 | 13

# SQL query 2
PARTITION BY:
SELECT SUM(number_of_registered_entities) OVER (PARTITION BY name) AS name, entitysum FROM user$raw

# Output 2
6 rows:
name entitysum
User_1 | 15
User_1 | 15
User_2 | 11
User_2 | 11
User_3 | 13
User_3 | 13
```

## 196. Delete Duplicate Emails
<https://leetcode.com/problems/delete-duplicate-emails/>

Solution 1:
```sql
DELETE p1 FROM Person p1, Person p2
WHERE p1.Email = p2.Email AND p1.Id > p2.Id;
```
Solution 2:
```sql
DELETE FROM Person 
WHERE Id NOT IN (
    SELECT Id FROM (
        SELECT MIN(Id) AS Id
        FROM Person 
        GROUP BY Email) AS minIdbyEmail
    );
```
Solution 3:
```sql
DELETE FROM Person 
WHERE Id IN (
    SELECT Id FROM (
        SELECT Id, Email, RANK() OVER (PARTITION BY Email ORDER BY Id) AS rk
    FROM Person) AS t2
    WHERE t2.rk >=2
    );
```

## 197. Rising Temperature
<https://leetcode.com/problems/rising-temperature/>

```sql
SELECT high.id FROM Weather high, Weather low
WHERE DATEDIFF(high.recordDate, low.recordDate) = 1 
AND high.temperature > low.temperature;
```

## 262. Trips and Users
<https://leetcode.com/problems/trips-and-users/>    

```sql
SELECT Request_at AS "Day",
ROUND(COUNT(IF (Status <> "completed", 1, NULL))/COUNT(*), 2) AS "Cancellation Rate"
FROM Trips
WHERE Client_Id IN (SELECT Users_Id FROM Users WHERE Role = "client" AND Banned = "No")
AND Driver_Id IN (SELECT Users_Id FROM Users WHERE Role = "driver" AND Banned = "No")
AND CAST(Request_at AS DATE) BETWEEN "2013-10-01" AND "2013-10-03"
GROUP BY 1
ORDER BY 1;
```

## 511. Game Play Analysis I
<https://leetcode.com/problems/game-play-analysis-i/>

Solution 1:
```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```
Solution 2:
```sql
SELECT player_id, event_date AS first_login
FROM (
    SELECT player_id, event_date, 
    DENSE_RANK() OVER(PARTITION BY player_id ORDER BY event_date) AS rk
    FROM Activity) AS rk_sel
WHERE rk_sel.rk = 1;
```

## 512. Game Play Analysis II
<https://leetcode.com/problems/game-play-analysis-ii/>

```sql
SELECT DISTINCT ac.player_id AS player_id, ac.device_id AS device_id
FROM Activity ac
INNER JOIN (
    SELECT player_id, MIN(event_date) AS ev_dt
    FROM Activity
    GROUP BY 1) jn
ON ac.player_id = jn.player_id
AND ac.event_date = jn.ev_dt
ORDER BY 1;
```

## 534. Game Play Analysis III
<https://leetcode.com/problems/game-play-analysis-iii/>

```sql
SELECT player_id, event_date, 
    SUM(games_played) 
    OVER (PARTITION BY player_id ORDER BY event_date) games_played_so_far
FROM Activity;
```

## 550. Game Play Analysis IV
<https://leetcode.com/problems/game-play-analysis-iv/>

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