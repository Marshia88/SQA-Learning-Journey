Load testing in non-GUI mode:

Command prompt used to run test

1. Renamed test plan to Bangla_Puzzle
2. Added Thread group by right clicking on Bangla_Puzzle -> Add -> Thread (Users) -> Thread Group
3. Renamed Thread Group to BanglaPuzzle_Users and Set the Numbers of threads (users) to 100, Ramp up period (secs) to 1, and Loop Count to 5.
4. Right click on BanglaPuzzle_Users (thread group) -> Add -> Samplers -> HTTP Request
5. Copy paste www.banglapuzzle.com on HTTP request sampler’s Server Name and let to test all pages, path is /. Name of sampler is renamed to All_Pages.
6. Another HTTP request sampler created (Renamed to Products) to test product page of Bangla Puzzle Limited, path is /products.
7. Yet another HTTP request sampler created (Renamed to MobileAppDev_Services) to test Mobile Application Development from Services of Bangla Puzzle Limited, path is /service/mobile-app-development.
8. Lastly another HTTP request sampler created (Renamed to Industry_Tourism) to test path is /industry/tourism.


Specifying location to run test script file:
D:\JMeter_Software\apache-jmeter-5.5\bin> jmeter -n -t D:\Marshia\SQA\Load_Testing_BanglaPuzzle_NON_GUI\BanglaPuzzle_Users.jmx -l D:\Marshia\SQA\Load_Testing_BanglaPuzzle_NON_GUI\LoadTestResults.csv


To get Dashboard Report, Command:
D:\JMeter_Software\apache-jmeter-5.5\bin> jmeter -n -t D:\Marshia\SQA\Load_Testing_BanglaPuzzle_NON_GUI\BanglaPuzzle_Users.jmx -l D:\Marshia\SQA\Load_Testing_BanglaPuzzle_NON_GUI\LoadTestResults.csv -f -e -o D:\Marshia\SQA\Load_Testing_BanglaPuzzle_NON_GUI\DashboardReport


Obtained Results in Dashboard Report:
100% error free