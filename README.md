# responsive-screenshot
A simple node utility to take screenshots of web pages at different resolutions, based on [WebdriverIO](http://webdriver.io/).

## How to use it
- Download the [selenium standalone server](http://www.seleniumhq.org/download/) and save the .jar file in the **libs** folder
- If you want to use Chrome, download the [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) and save the executable file in the **libs** folder
- If you want to use Firefox, download the [geckodriver](https://github.com/mozilla/geckodriver/releases) and save the executable file in the **libs** folder
- If you want to use IE, download the [IEdriver](http://www.seleniumhq.org/download/) and save the executable file in the **libs** folder
- From the project root folder launch the selenium server:
`java -jar -Dwebdriver.chrome.driver=./libs/chromedriver.exe -Dwebdriver.gecko.driver=./libs/geckodriver.exe -Dwebdriver.ie.driver=./libs/IEDriverServer.exe ./libs/selenium-server-standalone-3.0.1.jar`
- Launch the node script: `node index.js`
