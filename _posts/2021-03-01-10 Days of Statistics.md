---
title: '10 Days of Statistics'
date: 2021-03-01
header:
#   image: "/images/foo-bar-identity.jpg"
#   caption: "A beautiful photo"
  # teaser: "/images/20210805_blog_pymol/show_session.png"
tags:
  - Statistics
  - HackerRank
  - Python
# toc: true
# toc_label: "Contents"
# toc_icon: "cog"
classes: wide
---

Summary: solving some problems about statistics in 10 days. The problems are on [HackerRank](https://www.hackerrank.com/domains/tutorials/10-days-of-statistics).

# 10 Days of Statistics

Check this blog on [github](https://github.com/ycheng22/ycheng22.github.io/blob/main/_posts/2021-03-01-10%20Days%20of%20Statistics.md).

- [10 Days of Statistics](#10-days-of-statistics)
  - [Day 0: Mean, Median, and Mode](#day-0-mean-median-and-mode)
  - [Day 0: Weighted Mean](#day-0-weighted-mean)
  - [Day 1: Quartiles](#day-1-quartiles)
  - [Day 1: Interquartile Range](#day-1-interquartile-range)
  - [Day 1: Standard Deviation](#day-1-standard-deviation)
  - [Day 2: Basic Probability](#day-2-basic-probability)
  - [Day 2: More Dice](#day-2-more-dice)
  - [Day 2: Compound Event Probability](#day-2-compound-event-probability)
  - [Day 3: Conditional Probability](#day-3-conditional-probability)
  - [Day 3: Cards of the Same Suit](#day-3-cards-of-the-same-suit)
  - [Day 3: Drawing Marbles](#day-3-drawing-marbles)
  - [Day 4: Binomial Distribution I](#day-4-binomial-distribution-i)
  - [Day 4: Binomial Distribution II](#day-4-binomial-distribution-ii)
  - [Day 4: Geometric Distribution I](#day-4-geometric-distribution-i)
  - [Day 4: Geometric Distribution II](#day-4-geometric-distribution-ii)
  - [Day 5: Poisson Distribution I](#day-5-poisson-distribution-i)
  - [Day 5: Poisson Distribution II](#day-5-poisson-distribution-ii)
  - [Day 5: Normal Distribution I](#day-5-normal-distribution-i)
  - [Day 5: Normal Distribution II](#day-5-normal-distribution-ii)
  - [Day 6: The Central Limit Theorem I](#day-6-the-central-limit-theorem-i)
  - [Day 6: The Central Limit Theorem II](#day-6-the-central-limit-theorem-ii)
  - [Day 6: The Central Limit Theorem III](#day-6-the-central-limit-theorem-iii)
  - [Day 7: Pearson Correlation Coefficient I](#day-7-pearson-correlation-coefficient-i)
  - [Day 7: Spearman's Rank Correlation Coefficient](#day-7-spearmans-rank-correlation-coefficient)
  - [Day 8: Least Square Regression Line](#day-8-least-square-regression-line)
  - [Day 8: Pearson Correlation Coefficient II](#day-8-pearson-correlation-coefficient-ii)
  - [Day 9: Multiple Linear Regression](#day-9-multiple-linear-regression)

## Day 0: Mean, Median, and Mode
<https://www.hackerrank.com/challenges/s10-basic-statistics/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
def getMean(arr):
    len_arr=len(arr)
    acc = 0
    for i in arr:
        acc += i
    result = acc / len_arr
    return result
def getMedian(arr):
    len_arr=len(arr)
    arr = sorted(arr)
    if (len_arr%2==1):
        return arr[(len_arr)/2]
    else:
        return (arr[len_arr/2-1]+arr[len_arr/2])/2
def getMode(arr):
    len_arr=len(arr)
    arr=sorted(arr)
    count={}
    result=None
    for i in arr:
        if i in count:
            count[i] +=1
        else:
            count[i]=1
        if (result is None) or (count[i]>count[result]):
            result=i
        elif (count[i]==count[result]) and (i<result):
            result=i
    return result
n=int(input())
x=[int(val) for val in input().split()]
print(getMean(x))
print(getMedian(x))
print(getMode(x))
```

## Day 0: Weighted Mean
<https://www.hackerrank.com/challenges/s10-weighted-mean/problem?h_r=next-challenge&h_v=zen>

```python
def weighted_mean(values, weight):
    numerator=0
    denominator=0
    for idx in range(len(values)):
        numerator += values[idx]*weight[idx]
        denominator += weight[idx]
    return numerator/denominator

n=int(input())
x=[int(val) for val in input().split()]
w=[int(weit) for weit in input().split()]
print(round(weighted_mean(x,w),1))
```

## Day 1: Quartiles
<https://www.hackerrank.com/challenges/s10-quartiles/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
#Day 1: Quartiles
def getMedian(arr, start_index, end_index):
    len_index = end_index - start_index + 1
    m = start_index + len_index//2
    med = 0
    if (len_index%2) == 0:
        med = (arr[m-1] + arr[m])/2
    else:
        med = arr[m]
    return med

def getQuantile(arr):
    arr = sorted(arr)
    len_arr = len(arr)
    m = len_arr//2
    q2 = getMedian(arr, 0, len_arr-1)
    if (len_arr%2) == 0:
        q1 = getMedian(arr, 0, m-1)
        q3 = getMedian(arr, m, len_arr-1)
    else:
        q1 = getMedian(arr, 0, m-1)
        q3 = getMedian(arr, m+1, len_arr-1)
    return q1, q2, q3

n = int(input())
x = [int(i) for i in input().split()]
result = map('{:g}'.format, getQuantile(x))
print(*result, sep="\n")
# q1, q2, q3 = getQuantile(x)
# print(q1)
# print(q2)
# print(q3)
```

## Day 1: Interquartile Range
<https://www.hackerrank.com/challenges/s10-interquartile-range/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 1: Interquartile Range

def getMedian(arr, start_index, end_index):
    len_index = end_index - start_index + 1
    m = start_index + len_index//2
    med = 0
    if (len_index%2) == 0:
        med = (arr[m-1] + arr[m])/2
    else:
        med = arr[m]
    return med

def getQuantile(arr):
    arr = sorted(arr)
    len_arr = len(arr)
    m = len_arr//2
    q2 = getMedian(arr, 0, len_arr-1)
    if (len_arr%2) == 0:
        q1 = getMedian(arr, 0, m-1)
        q3 = getMedian(arr, m, len_arr-1)
    else:
        q1 = getMedian(arr, 0, m-1)
        q3 = getMedian(arr, m+1, len_arr-1)
    return q1, q2, q3

def interquartile_range(x, f):
    len_x = len(x)
    s = []
    for i in range(len_x):
        x_ele = x[i]
        f_ele = f[i]
        for j in range(f_ele):
            s.append(x_ele)
        #s.append([x_ele] * f_ele)
    s = sorted(s)
    qt = getQuantile(s)
    return float(qt[2] - qt[0])

n = int(input())
x = [int(i) for i in input().split()]
f = [int(i) for i in input().split()]
print(interquartile_range(x, f))
```

## Day 1: Standard Deviation
<https://www.hackerrank.com/challenges/s10-standard-deviation/problem?h_r=next-challenge&h_v=zen>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 1: Standard Deviation

def std_dev(arr):
    len_arr = len(arr)
    mean = sum(arr)/len_arr
    result = 0
    for val in arr:
        result += (val - mean)**2
    result = (result/len_arr)**0.5
    return result

n = int(input())
x = [int(token) for token in input().split()]
print(round(std_dev(x), 1))
```

## Day 2: Basic Probability
<https://www.hackerrank.com/challenges/s10-mcq-1/problem>

**Task:**

In a single toss of 2 fair (evenly-weighted) six-sided dice, find the probability that their sum will be at most 9.

**Solution:**

- scenarios summation equal 10: (4,6), (6,4), (5,5)
- scenarios summation equal 11: (5,6), (6,5)
- scenarios summation equal 12: (6,6)

answer: 1-(3+2+1)/(36) = 30/36 = 5/6

## Day 2: More Dice
<https://www.hackerrank.com/challenges/s10-mcq-2/problem>

**Task:**

In a single toss of 2 fair (evenly-weighted) six-sided dice, find the probability that the values rolled by each die will be different and the two dice have a sum of 6.

**Solution:**

(1,5), (5,1), (2,4), (4,2)

4/36 = 1/9

## Day 2: Compound Event Probability
<https://www.hackerrank.com/challenges/s10-mcq-3/problem>

**Task:**

There are 3 urns labeled X, Y, and Z.

- Urn X contains 4 red balls and 3 black balls.
- Urn Y contains 5 red balls and 4 black balls.
- Urn Z contains 4 red balls and 4 black balls.

One ball is drawn from each of the 3 urns. What is the probability that, of the 3 balls drawn, 2 are red and 1 is black?

**Solution:**

|   | p(red) | p(black) |
|---|--------|----------|
| X |  4/7   |   3/7    |
| Y |  5/9   |   4/9    |
| Z |  1/2   |   1/2    |

XYZ -> red,red,black -> 4/7 * 5/9 * 1/2 

XYZ -> red,black,red -> 4/7 * 4/9 * 1/2 

XYZ -> black,red,red -> 3/7 * 5/9 * 1/2 

sum up is 17/42


## Day 3: Conditional Probability
<https://www.hackerrank.com/challenges/s10-mcq-4/problem>

**Task:**

Suppose a family has 2 children, one of which is a boy. What is the probability that both children are boys?

**Solution:**

P(BB\|B) = BB/(BG+GB+BB) = 1/3

## Day 3: Cards of the Same Suit
<https://www.hackerrank.com/challenges/s10-mcq-5/problem>

**Task:**

You draw 2 cards from a standard 52-card deck without replacing them. What is the probability that both cards are of the same suit?

**Solution:**

Total choices C(52,2): $C_{52}^{2}$;

one of four suits: C(4,1);

two of same suit: C(13,2);

answer: C(4,1) * C(13,2) / C(52,2) = 12/51

## Day 3: Drawing Marbles
<https://www.hackerrank.com/challenges/s10-mcq-6/problem>

**Task:**

A bag contains 3 red marbles and 4 blue marbles. Then, 2 marbles are drawn from the bag, at random, without replacement. If the first marble drawn is red, what is the probability that the second marble is blue?

**Solution:**

After 1 drawing, there are total 6 marbles, 4 blue marbles, the probability that the second marble is blue is 4/6 = 2/3.

## Day 4: Binomial Distribution I
<https://www.hackerrank.com/challenges/s10-binomial-distribution-1/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 4: Binomial Distribution I

def factorial(n):
    if n==0 or n==1:
        return 1
    else:
        return n*factorial(n-1)
    
def nCr(n,r):
    return factorial(n)/(factorial(r) * factorial(n-r))

n1, n2 = list(map(float, input().split(" ")))
p=n1/(n1+n2)
q=n2/(n1+n2)
sum1=0
for i in range(3,7):
    temp=nCr(6,i)
    temp1=(p**i)*(q**(6-i))
    sum1+= temp*temp1
print(round(sum1,3))
```

## Day 4: Binomial Distribution II
<https://www.hackerrank.com/challenges/s10-binomial-distribution-2/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 4: Binomial Distribution II

def factorial(n):
    if n==0 or n==1:
        return 1
    else:
        return n*factorial(n-1)
    
def binomial(n,r,p):
    return (factorial(n)/(factorial(r) * factorial(n-r)))*p**r*(1-p)**(n-r)

p, N = list(map(int, input().split(" ")))
p=p/100

# sum1=0
# for i in range(0,3):
#     sum1 += binomial(N,i,p)

# sum2=0
# for i in range(2,N+1):
#     sum2 += binomial(N,i,p)

# print(round(sum1,3))
# print(round(sum2,3))

print(round(sum([binomial(N,r,p) for r in range(0,3)]),3))
print(round(sum([binomial(N,r,p) for r in range(2,N+1)]),3))
```

## Day 4: Geometric Distribution I 
<https://www.hackerrank.com/challenges/s10-geometric-distribution-1/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 4: Geometric Distribution I

numerator, denominator = list(map(float, input().split(" ")))
n=int(input())

p=numerator/denominator
result = ((1-p)**(n-1))*p
print(round(result, 3))
```

## Day 4: Geometric Distribution II
<https://www.hackerrank.com/challenges/s10-geometric-distribution-2/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 4: Geometric Distribution II

numerator, denominator = list(map(float, input().split(" ")))
n=int(input())

p=numerator/denominator

result=0
for i in range(1,n+1):
    result += (1-p)**(i-1)*p

print(round(result, 3))
```

## Day 5: Poisson Distribution I 
<https://www.hackerrank.com/challenges/s10-poisson-distribution-1/tutorial>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 5: Poisson Distribution I

from math import exp, factorial
lamd = float(input())
x= int(input())

pois=((lamd**x)*exp(-lamd))/factorial(x)
print(round(pois, 3))
```

## Day 5: Poisson Distribution II
<https://www.hackerrank.com/challenges/s10-poisson-distribution-2/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 5: Poisson Distribution II

meanA, meanB = list(map(float, input().split(" ")))
Ca = 160 + 40*(meanA + meanA**2)
Cb = 128 + 40*(meanB + meanB**2)

print(round(Ca, 3))
print(round(Cb, 3))
```

## Day 5: Normal Distribution I 
<https://www.hackerrank.com/challenges/s10-normal-distribution-1/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 5: Normal Distribution I

import math
mean, sd = list(map(float, input().split(" ")))
y = float(input())
y1, y2 = list(map(float, input().split(" ")))

def cumm_norm_prob(mean, sd, x):
    return 0.5*(1 + math.erf((x-mean)/(sd * (2**0.5))))

print(round(cumm_norm_prob(mean, sd, y), 3))
print(round(cumm_norm_prob(mean, sd, y2)-cumm_norm_prob(mean, sd, y1), 3))
```

## Day 5: Normal Distribution II
<https://www.hackerrank.com/challenges/s10-normal-distribution-2/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 5: Normal Distribution II

import math
mean, sd = list(map(float, input().split(" ")))
y1 = float(input()) #80
y2 = float(input()) #60

def cumm_norm_prob(mean, sd, x):
    return 0.5*(1 + math.erf((x-mean)/(sd * (2**0.5))))

print(round((1-cumm_norm_prob(mean, sd, y1))*100, 2))
print(round((1-cumm_norm_prob(mean, sd, y2))*100, 2))
print(round(cumm_norm_prob(mean, sd, y2)*100, 2))
```

## Day 6: The Central Limit Theorem I
<https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-1/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 6: The Central Limit Theorem I

import math
max_weight, n, mean, sd = input(),input(),input(),input()


def cumm_norm_prob(max_weight, n, mean, sd):
    new_mean = n * mean
    new_sd = n**0.5 * sd
    return round(0.5*(1 + math.erf((max_weight-new_mean)/(new_sd * (2**0.5)))), 4)

print(cumm_norm_prob(max_weight, n, mean, sd))
```

## Day 6: The Central Limit Theorem II
<https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-2/problem?h_r=next-challenge&h_v=zen>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 6: The Central Limit Theorem II

import math
all_tickets, student, mean, sd = input(),input(),input(),input()


def cumm_norm_prob(all_tickets, student, mean, sd):
    new_mean = student * mean
    new_sd = student**0.5 * sd
    return round(0.5*(1 + math.erf((all_tickets-new_mean)/(new_sd * (2**0.5)))), 4)

print(cumm_norm_prob(all_tickets, student, mean, sd))
```

## Day 6: The Central Limit Theorem III
<https://www.hackerrank.com/challenges/s10-the-central-limit-theorem-3/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

Learn [**Z-Score: Definition, Formula and Calculation**](https://www.statisticshowto.com/probability-and-statistics/z-score/).

Z-score: 

$z = \dfrac{x-\mu}{\sigma / \sqrt(n)}$

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 6: The Central Limit Theorem III

n, mean, sd, per, z_score = input(),input(),input(),input(),input()

sd_error = sd / n**0.5
print(round(mean - sd_error * z_score, 2))
print(round(mean + sd_error * z_score, 2))
```

## Day 7: Pearson Correlation Coefficient I
<https://www.hackerrank.com/challenges/s10-pearson-correlation-coefficient/problem?h_r=next-challenge&h_v=zen>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 7: Pearson Correlation Coefficient I

n = int(input())
x_arr = [float(i) for i in input().split()]
y_arr = [float(i) for i in input().split()]


def mean(x):
    return sum(x)/len(x)

def sd(x, x_mean):
    data = [(val - x_mean)**2 for val in x]
    return (sum(data) / len(data))**0.5

def pearson_corr(n, x_arr, y_arr):
    x_mean = mean(x_arr)
    x_sd = sd(x_arr, x_mean)
    y_mean = mean(y_arr)
    y_sd = sd(y_arr, y_mean)
    
    numerator = sum((x_arr[i]-x_mean) * (y_arr[i]-y_mean) for i in range(n))
    denominator = n * x_sd * y_sd
    return round(numerator/denominator, 3)

print(pearson_corr(n, x_arr, y_arr))
```

## Day 7: Spearman's Rank Correlation Coefficient
<https://www.hackerrank.com/challenges/s10-spearman-rank-correlation-coefficient/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 7: Spearman's Rank Correlation Coefficient

n = int(input())
x = [float(i) for i in input().split()]
y = [float(i) for i in input().split()]

def rank(arr):
    rank_of_arr = {}
    arr_sorted = sorted(arr)
    for i in arr:
        rank_of_arr[i] = arr_sorted.index(i) + 1
    return rank_of_arr

def spearman_rank_cc(n, x, y):
    rank_of_x = rank(x)
    rank_of_y = rank(y)

    d_sqr = []
    for i in range(n):
        temp = (rank_of_x[x[i]] - rank_of_y[y[i]])**2
        d_sqr.append(temp)
    numerator = 6*sum(d_sqr)
    denominator = n*(n**2-1)
    
    return round(1-numerator/denominator, 3)

print(spearman_rank_cc(n, x, y))
```

## Day 8: Least Square Regression Line
<https://www.hackerrank.com/challenges/s10-least-square-regression-line/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 8: Least Square Regression Line

maths, stats = [], []
for i in range(5):
    m, s = map(int, input().split())
    maths.append(m)
    stats.append(s)
    
def LSR(x,y):
    n = len(x)
    xy = [x[i]*y[i] for i in range(n)]
    x_sqr = [i**2 for i in x]
    numerator = n*sum(xy) - sum(x)*sum(y)
    denominator = n*sum(x_sqr) - sum(x)**2
    b = numerator/denominator
    a = sum(y)/n - b*sum(x)/n 
    return a, b
a, b = LSR(maths, stats)
print(round(a+b*80, 3))
```

## Day 8: Pearson Correlation Coefficient II
<https://www.hackerrank.com/challenges/s10-mcq-7/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen>

**Task:**

The regression line of y on x is 3x+4y+8=0, and the regression line of x on y is 4x+3y+7=0. What is the value of the Pearson correlation coefficient?

**Solution:**

Rewrite the 2 lines as:

y = -2 + (-3/4) * x

x = -7/4 + (-3/4) * y

as we know: $b=\rho \cdot \dfrac{\sigma_Y}{\sigma_X}$

so $\rho= b \cdot \dfrac{\sigma_X}{\sigma_Y}$

Pearson cc p equal:
- p = b1(x_std/y_std)
- p = b2(y_std/x_std)
  
multiply these 2 equations:

p^2 = 9/16

The answer is -3/4.

## Day 9: Multiple Linear Regression
<https://www.hackerrank.com/challenges/s10-multiple-linear-regression/problem>

```python
# Enter your code here. Read input from STDIN. Print output to STDOUT
# Day 9: Multiple Linear Regression

from sklearn.linear_model import LinearRegression
import numpy as np

m, n = map(int, input().split())
x, y = [], []
for i in range(n):
    xy_val = map(float, input().split())
    x.append(xy_val[:-1])
    y.append(xy_val[-1])
    
lm = LinearRegression()
lm.fit(x, y)

# q = int(input())
# test = []
# for i in range(q):
#     vals = map(float, input().split())
#     test.append(vals)

# pred = lm.predict(test)
# for i in pred:
#     print(i)
    
a = lm.intercept_
b = lm.coef_

for _ in range(int(input())):
    f = np.array(input().split(), np.float)
    y = a + np.sum(f * b)
    print(np.ceil(y * 100) / 100)
```
