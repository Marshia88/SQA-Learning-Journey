Stress testing in GUI mode:


1. Renamed test plan to StressTesting_BanglaPuzzle
2. Added Thread group by right clicking on StressTesting_BanglaPuzzle-> Add -> Thread (Users) -> Thread Group
3. Renamed Thread Group to BanglaPuzzle_Stress and Set the Numbers of threads (users) to 500, Ramp up period (secs) to 10, and Loop Count to 1.
4. Right click on BanglaPuzzle_Stress (thread group) -> Add -> Samplers -> HTTP Request
5. Copy paste www.banglapuzzle.com on HTTP request sampler’s Server Name and let to test all pages, path is /. Name of sampler is renamed to All_Pages.
6. Another HTTP request sampler created (Renamed to Products) to test product page of Bangla Puzzle Limited, path is /products.
7. Yet another HTTP request sampler created (Renamed to News) to test News page of Bangla Puzzle Limited, path is /news.
8. Lastly another HTTP request sampler created (Renamed to Industry_Tourism) to test path is /industry/tourism.
9. Listeners such as Summary Report, Tree Result, Graph Result Added.
10. Response Assertion added -> field to text set as Response Code -> Pattern Matching Rules as Contains -> 200 set as response rate


Obtained Result:

Few Errors under stress condition
