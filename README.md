# SauceDemoAutomation

The test scenarios are BDD tests written in gherkin and located in the _features_ directory. 

The project has a github actioins workflow named _Run All Tests_ to run tests on ci. You could find a completed test run with the attached html report [here](https://github.com/DenysDavydov/SauceDemoAutomationFramework/actions/workflows/run-all-tests.yml)   

To execute tests on local windows environment make sure you have Node.js installed, then clone the repo, go to the project root and run the _run-all-tests.cmd_. After test execution completes, you could find the test results report named _cucumber-report.html_ in the project root dir. Keep in mind that the testrun may get failed due to catched bugs :)
