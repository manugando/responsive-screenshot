var webdriverio = require('webdriverio');
var wdioscreenshot = require('wdio-screenshot');

function takeScreenShots(url, browserName, screenSize) {
    var pageTitle;
    var options = {
        desiredCapabilities: {
            browserName: browserName
        }
    };
    var client = webdriverio.remote(options);
    wdioscreenshot.init(client);

    client.addCommand("takeScreenshots", function () {
        console.log('Taking screenshots of ' + pageTitle);
        return this
                .saveViewportScreenshot('output/' + pageTitle + '/' + browserName + '-' + screenSize.name + '-viewport.jpg')
                .saveDocumentScreenshot('output/' + pageTitle + '/' + browserName + '-' + screenSize.name + '-document.jpg');
    });

    client
        .init()
        .setViewportSize({
            width: screenSize.width,
            height: screenSize.height
        })
        .url(url)
        .getTitle().then(function(title) {
            pageTitle = title;
        })
        .pause(5000)
        .takeScreenshots()
        .end();
}

takeScreenShots('http://tangodev.it', 'chrome', {name: "Nexus 5", width: 360, height: 640});