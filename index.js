var webdriverio = require('webdriverio');
var wdioscreenshot = require('wdio-screenshot');

function takeScreenshot(settings) {
    var url = settings.url;
    var browserName = settings.browserName;
    var screenSize = settings.screenSize;
    var pageTitle;
    var options = {
        desiredCapabilities: {
            browserName: browserName
        }
    };
    var client = webdriverio.remote(options);
    wdioscreenshot.init(client);

    client.addCommand("saveScreenshots", function () {
        return this
                .saveViewportScreenshot('output/' + pageTitle + '/' + browserName + '/' + screenSize.name + '-viewport.jpg')
                .saveDocumentScreenshot('output/' + pageTitle + '/' + browserName + '/' + screenSize.name + '-document.jpg');
    });

    console.log('Taking screenshots of ' + url + ' on ' + browserName + ' at ' + screenSize.name + ' screensize');

    return client
        .init()
        .setViewportSize({
            width: screenSize.width,
            height: screenSize.height
        })
        .url(url)
        .getTitle().then(function(title) {
            pageTitle = title;
        })
        .pause(3000)
        .saveScreenshots()
        .end();
}

function getQueueFromRunConfig() {
    var queue = []; 
    var runconfig = require('./runconfig.json');
    var screensizes = require('./screesizes.json');
    for(var urlKey in runconfig.urls) {
        var url = runconfig.urls[urlKey];
        for (var browserName in runconfig.browsers) {
            var browser = runconfig.browsers[browserName];
            for(var deviceType in browser) {
                var isDeviceTypeToExecute = browser[deviceType];
                if(isDeviceTypeToExecute) {
                    var screeSizesToExecute = screensizes[deviceType];
                    for(var screenSizeKey in screeSizesToExecute) {
                        var screenSize = screeSizesToExecute[screenSizeKey];
                        queue.push({url: url, browserName: browserName, screenSize: screenSize});
                    }
                }
            }
        }
    }
    return queue;
}

function takeNextScreenshot() {
    if(currentQueueElementIndex < screenshotQueue.length) {
        console.log("Taking " + (currentQueueElementIndex + 1) + " of " + screenshotQueue.length + " screenshots");
        takeScreenshot(screenshotQueue[currentQueueElementIndex]).then(function() {
            currentQueueElementIndex++;
            takeNextScreenshot();
        });
    } else {
        console.log("Finished");
    }
}

var screenshotQueue = getQueueFromRunConfig();
var currentQueueElementIndex = 0;
takeNextScreenshot();