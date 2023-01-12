# SQA-Learning-Journey
SQA:
Verifying requirements
Testing bugs
Ensuring product is valid and working

Performance Testing (Type of non functional testing):
Load, Stress, Endurance, Spike, Scalability, Volume Testing
Ensures software applications perform well under expected workload and in extreme stress conditions as well

Jmeter (Java open source application): 
Covers Stress, Load, Functional testing
Helps to create a test plan (XML format). So test plan can be generated from text editor
Can run complete load test without code
Provides support for protocols like HTTP, JDBC, FTP etc
Allows user to record HTTP/ HTTPS to create test plan using recording facility 

Using Jmeter:
Run jmeter.bat from bin to start jmeter in GUI mode (shows cpu but good for running new test configurations)

Elements of Jmeter: 
Thread group:
Each thread represents one user using the application under test.
100 threads in thread group = 100 user request to server under test
Samplers:
Helps thread group to know which type of request (http/ ftp etc) to make to the server. 
Ex: FTP request sampler is used to make FTP request. HTTP request sampler lets you send an HTTP/ HTTPS request to a web server. Like to retrieve HTML files/ images from Google. JDBC request to database to execute database performance testing. SMTP sampler to send email messages using SMTP protocol and test email server.
Listeners:
Shows result of test execution.
Configuration:
Steps of Jmeter: 
Create a test plan:



Stress Testing Using JMeter:

See whether proper error messages are shown under stress
If server can manage fine under high load and limited resources
Constrained conditions/ Maximum load that web server can handle is tested


Load Testing Using JMeter:

Testing whether application can handle required number of concurrent users accessing the web server without failure
