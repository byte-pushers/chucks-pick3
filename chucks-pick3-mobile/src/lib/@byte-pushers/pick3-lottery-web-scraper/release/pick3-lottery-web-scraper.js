/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

function BaseWebScraper(baseScraperConfig) {
    'use strict';
    var baseUrl = (baseScraperConfig && baseScraperConfig.baseUrl) ? baseScraperConfig.baseUrl : null,
        pr = (baseScraperConfig && baseScraperConfig.pageReader) ? baseScraperConfig.pageReader : {};

    this.getBaseUrl = function () {
        return baseUrl;
    };

    this.getPageReader = function () {
        return pr;
    };
}

module.exports = BaseWebScraper;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeInFutureException(drawingTime, drawingDate, expectedDrawTime) {
    'use strict';
    
    DrawingTimeInFutureException.prototype.superclass.apply(this);

    this.name = "DrawingTimeInFutureException";
    this.code = Exception.Code.DRAWING_TIME_IN_FUTURE;
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;
    this.expectedDrawTime = expectedDrawTime;

    this.toString = function () {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            this.drawingTime, this.drawingDate, this.expectedDrawTime);
    };
}

DrawingTimeInFutureException.prototype = BytePushers.inherit(Exception.prototype);
DrawingTimeInFutureException.prototype.constructor = DrawingTimeInFutureException;
DrawingTimeInFutureException.prototype.superclass = Exception;

module.exports = DrawingTimeInFutureException;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingTimeNotFoundException(drawingTime, drawingDate) {
    'use strict';

    DrawingTimeNotFoundException.prototype.superclass.apply(this);

    this.name = "DrawingTimeNotFoundException";
    this.code = Exception.Code.DRAWING_TIME_NOT_FOUND;
    this.drawingTime = drawingTime;
    this.drawingDate = drawingDate;

    this.toString = function () {
        return String.format("DrawingTimeNotFoundException: the requested drawing time \"{1}\" was not available for date {2}",
            this.drawingTime, this.drawingDate);
    };
}

DrawingTimeNotFoundException.prototype = BytePushers.inherit(Exception.prototype);
DrawingTimeNotFoundException.prototype.constructor = DrawingTimeNotFoundException;
DrawingTimeNotFoundException.prototype.superclass = Exception;

module.exports = DrawingTimeNotFoundException;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function DrawingYearNotAvailableException(drawingYear) {
    'use strict';
    
    DrawingYearNotAvailableException.prototype.superclass.apply(this);

    this.name = "DrawingYearNotAvailableException";
    this.code = Exception.Code.DRAWING_YEAR_NOT_AVAILABLE;
    this.drawingYear = drawingYear;

    this.toString = function () {
        return String.format("DrawingYearNotAvailableException: data is not available for the requested drawing year \"{1}\".",
            this.drawingYear);
    };
}

DrawingYearNotAvailableException.prototype = BytePushers.inherit(Exception.prototype);
DrawingYearNotAvailableException.prototype.constructor = DrawingYearNotAvailableException;
DrawingYearNotAvailableException.prototype.superclass = Exception;

module.exports = DrawingYearNotAvailableException;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');

function Exception() {
    'use strict';
    
    Exception.prototype.superclass.apply(this);

    this.name = "Exception";
    this.code = Exception.Code.BASE_EXCEPTION;

    this.toString = function () {
        return String.format("DrawingTimeInFutureException: the requested drawing time \"{1}\" is in the future. Check back on {2} after {3}",
            this.drawingTime, this.drawingDate, this.expectedDrawTime);
    };
}

Exception.prototype = BytePushers.inherit(Error.prototype);
Exception.prototype.constructor = Exception;
Exception.prototype.superclass = Error;

Exception.Code = {};
Exception.Code.BASE = "exception.base";
Exception.Code.DRAWING_TIME_IN_FUTURE = "exception.drawTimeInFuture";
Exception.Code.DRAWING_TIME_NOT_FOUND = "exception.drawTimeNotFound";
Exception.Code.DRAWING_YEAR_NOT_AVAILABLE = "exception.drawYearNotAvailable";
Exception.Code.HTML_PARSE_ERROR = "exception.htmlParseError";

module.exports = Exception;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function HtmlParseException(message) {
    'use strict';
    
    HtmlParseException.prototype.superclass.apply(this);

    this.name = "HtmlParseException";
    this.code = Exception.Code.HTML_PARSE_ERROR;
    this.message = message;

    this.toString = function () {
        return String.format("HtmlParseException: {1}", this.message);
    };
}

HtmlParseException.prototype = BytePushers.inherit(Exception.prototype);
HtmlParseException.prototype.constructor = HtmlParseException;
HtmlParseException.prototype.superclass = Exception;

module.exports = HtmlParseException;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var Exception = require('./software.bytepushers.pick3.lottery.web.exceptions.Exception');

function WinningNumberNotFoundException(digit1, digit2, digit3) {
    'use strict';

    WinningNumberNotFoundException.prototype.superclass.apply(this);

    this.name = "WinningNumberNotFoundException";
    this.code = Exception.Code.DRAWING_TIME_IN_FUTURE;
    this.digit1 = digit1;
    this.digit2 = digit2;
    this.digit3 = digit3;

    this.toString = function () {
        return String.format("WinningNumberNotFoundException: Cound not find winning number.  Num1: \"{1}\",  Num2: \"{2}\",  Num3: \"{3}\"",
            this.digit1, this.digit2, this.digit3);
    };
}

WinningNumberNotFoundException.prototype = BytePushers.inherit(Exception.prototype);
WinningNumberNotFoundException.prototype.constructor = WinningNumberNotFoundException;
WinningNumberNotFoundException.prototype.superclass = Exception;

module.exports = WinningNumberNotFoundException;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
// var request = require('request');
// var cheerio = require('cheerio');

var TexasPick3Lottery = require('./software.bytepushers.pick3.lottery.web.TexasPick3Lottery');

function Pick3LotteryWebScrapingService(webScraperBaseUrl) {
    'use strict';
    var registeredPick3Lotteries = [
        {
            state: "TX",
            stateName: "Texas",
            stateLottery: new TexasPick3Lottery(webScraperBaseUrl)
        }
    ];

    function findRegisteredPick3Lottery (drawingState) {
        var registeredPick3Lottery = registeredPick3Lotteries.find(function (registeredScraper) {
            return (drawingState && registeredScraper.state.toUpperCase() === drawingState.toUpperCase());
        });

        if (registeredPick3Lottery === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + drawingState);
        }

        return registeredPick3Lottery.stateLottery;
    }

    this.findRegisteredStateLottery = function (drawingState) {
        return findRegisteredPick3Lottery(drawingState);
    };

    /*this.retrievePastWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState, drawingDate, drawingTime);
        return registeredPick3Lottery.pick3Lottery.retrievePastWinningNumber(drawingState, drawingDate, drawingTime, request, pageReader);
    };*/

    /*this.getActualMorningDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualMorningDrawingTime();
    };

    this.getActualDayDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualDayDrawingTime();
    };

    this.getActualEveningDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualEveningDrawingTime();
    };

    this.getActualNightDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualNightDrawingTime();
    };*/

    /*this.getCurrentDrawingTime = function (drawingState, currentTime) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);
        var drawingTime = registeredPick3Lottery.getDrawingTime(currentTime);
        return drawingTime;
    };*/

}

module.exports = Pick3LotteryWebScrapingService;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
// var request = require('request');
// var cheerio = require('cheerio');

var TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');
var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

function TexasPick3Lottery(webScraperBaseUrl) {
    'use strict';
    var state = "TX",
        stateName = "state.tx",
        config = {
            state: state,
            stateName: stateName,
            WebScraper: TexasPick3WebScraper,
            baseUrl: ((webScraperBaseUrl === null || webScraperBaseUrl === undefined) ? TexasPick3UrlScraper.BASE_URL : webScraperBaseUrl),
            pathToScrapeForPastWinningNumbers: TexasPick3UrlScraper.PATH_TO_SCRAPE_FOR_PAST_WINNING_NUMBERS,
            pathToScrapeForCurrentWinningNumbers: TexasPick3UrlScraper.PATH_TO_SCRAPE_FOR_CURRENT_WINNING_NUMBERS,
            UrlScraper: TexasPick3UrlScraper,
            theme: {
                backgroundImageUrl: 'https://blairhouseinn.com/wp-content/uploads/2020/02/Bluebonnets-in-Texas-Hill-Country-1170x475.jpg'
            }
        };
    var scraper;

    function doScrape (url, callback, request) {
        request.request(url, callback);
    }

    function getWinningNumberSourcePath (winningNumberUrl, drawingDate, request, pageReader) {
        var winningNumberSourcePathPromise,
            sourcePath = {
                date: drawingDate,
                url: null
            };

        try {
            winningNumberSourcePathPromise = new Promise(function (resolve, reject) {
                doScrape(winningNumberUrl, function(error, ignore, html) {
                    if (error) {
                        reject(error);
                    } else {
                        scraper = (config === undefined) ? null : new config.UrlScraper({
                            baseUrl: config.baseUrl,
                            pageReader: pageReader.read(html),
                            drawingDate: drawingDate
                        });
                        try {
                            if (winningNumberUrl.endsWith("index.html")) {
                                sourcePath.url = winningNumberUrl;
                            } else {
                                sourcePath.url = scraper.findDrawingUrlForYear(drawingDate);
                            }
                            resolve(sourcePath);
                        } catch (err) {
                            reject(err);
                        }
                    }
                }, request);
            });
        } catch (e) {
            winningNumberSourcePathPromise = new Promise(function(ignore,reject) {
                reject(e);
            });
        }
        return winningNumberSourcePathPromise;
    }

    this.getState = function () {
        return state;
    };

    this.getStateName = function () {
        return stateName;
    };

    this.retrieveCurrentWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        var winningNumberPromise,
            winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

        try {
            winningNumberPromise = new Promise(function(resolve, reject) {
                /*getWinningNumberSourcePath(config.baseUrl + config.pathToScrapeForCurrentWinningNumbers, drawingDate, request, pageReader)
                    .then(function(winningNumberSourcePath) {
                        if (!winningNumberSourcePath || winningNumberSourcePath.url === null) {
                            reject("Could not find url in state " + drawingState + " for date " + drawingDate);
                        }*/
                        doScrape(config.baseUrl + config.pathToScrapeForCurrentWinningNumbers, function (error, ignore, html) {
                            if (error) {
                                reject(error);
                            } else {
                                scraper = (config === undefined)? null : new config.WebScraper({
                                    baseUrl: config.baseUrl + config.pathToScrapeForCurrentWinningNumbers,
                                    pageReader: pageReader.read2(html),
                                    drawingDate: drawingDate,
                                    drawingTime: drawingTime
                                });
                                try {
                                    winningNumber.number = scraper.findLastDrawingWinningNumber(drawingDate, drawingTime);
                                    resolve(winningNumber);
                                } catch (err) {
                                    reject(err);
                                }
                            }
                        }, request);/*
                    }).catch(function(error) {
                    reject(error);
                });*/
            });
        } catch (error) {
            winningNumberPromise = new Promise(function (ignore, reject) {
                reject(error);
            });
        }
        return winningNumberPromise;
    };

    this.retrievePastWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        var winningNumberPromise,
            winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

        try {
            winningNumberPromise = new Promise(function(resolve, reject) {
                getWinningNumberSourcePath(config.baseUrl + config.pathToScrapeForPastWinningNumbers, drawingDate, request, pageReader)
                    .then(function(successResult) {
                        if (!successResult || successResult.url === null) {
                            reject("Could not find url in state " + drawingState + " for date " + drawingDate);
                        }
                        doScrape(successResult.url, function (error, ignore, html) {
                            if (error) {
                                reject(error);
                            } else {
                                scraper = (config === undefined)? null : new config.WebScraper({
                                    baseUrl: successResult.url,
                                    pageReader: pageReader.read2(html),
                                    drawingDate: drawingDate,
                                    drawingTime: drawingTime
                                });
                                try {
                                    winningNumber.number = scraper.findPastWinningNumber(drawingDate, drawingTime);
                                    resolve(winningNumber);
                                } catch (err) {
                                    reject(err);
                                }
                            }
                        }, request);
                    }).catch(function(error) {
                    reject(error);
                });
            });
        } catch (error) {
            winningNumberPromise = new Promise(function (ignore, reject) {
                reject(error);
            });
        }
        return winningNumberPromise;
    };

    this.getDrawingTime = function(currentTime) {
        var midnight = new Date();
        midnight.setHours(23, 59, 59, 0);
        //TODO: re-factor to only look a the time of day and not include the date in calculation.
        if (compareTime(currentTime, TexasPick3Lottery.getActualMorningDrawingTime().getDateTime()) === -1 ||
            compareTime(currentTime, TexasPick3Lottery.getActualMorningDrawingTime().getDateTime()) === 0) {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualDayDrawingTime().getDateTime()) === -1 ||
                   compareTime(currentTime, TexasPick3Lottery.getActualDayDrawingTime().getDateTime()) === 0 ) {
            return TexasPick3Lottery.DRAWING_TIMES.DAY(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualEveningDrawingTime().getDateTime()) === -1 ||
                   compareTime(currentTime, TexasPick3Lottery.getActualEveningDrawingTime().getDateTime()) === 0) {
            return TexasPick3Lottery.DRAWING_TIMES.EVENING(currentTime);
        } else if (compareTime(currentTime, TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) === 1 ||
                   compareTime(currentTime, TexasPick3Lottery.getActualNightDrawingTime().getDateTime()) === 0){
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT(currentTime);
        } else if (compareTime(currentTime, midnight) === -1 || compareTime(currentTime, midnight) === 0) {
            return TexasPick3Lottery.DRAWING_TIMES.NIGHT(currentTime);
        } else if (compareTime(currentTime, midnight) === 1 &&
                   compareTime(currentTime, TexasPick3Lottery.getActualMorningDrawingTime().getDateTime()) === -1) {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING(currentTime);
        } else {
            return TexasPick3Lottery.DRAWING_TIMES.MORNING(currentTime);
        }
    };

    this.getDrawingTimeByName = function(drawingTime) {
        for (var prop in TexasPick3Lottery.DRAWING_TIMES) {
            if (TexasPick3Lottery.DRAWING_TIMES.hasOwnProperty(prop)) {
                if (prop === drawingTime) {
                    //console.log(`TexasPick3Lottery.DRAWING_TIMES.${prop} = ${TexasPick3Lottery.DRAWING_TIMES[prop]}`);
                    drawingTime = TexasPick3Lottery.DRAWING_TIMES[prop]();
                    break;
                }
            }
        }

        if (drawingTime == null) {
            //TODO: throw exception.
            throw "Unable to get Drawing Time By Name.";
        }

        return drawingTime;
    };

    this.getAvailableDrawingTimes = function(targetDrawingTime) {
        return TexasPick3Lottery.getAvailableDrawingTimes(targetDrawingTime);
    };

    function compareTime(time1, time2) {
        if (time1 && time2 ) {
            if (!time1.getHours() && !time2.getHours()) {
                return 0;
            } else if (!time1.getHours() && time2.getHours()) {
                return -1;
            } else if (time1.getHours() && !time2.getHours()) {
                return 1;
            } else if (time1.getHours() < time2.getHours()) {
                return -1;
            } else if (time1.getHours() > time2.getHours()) {
                return 1;
            } else if (time1.getHours() == time2.getHours()) {
                if (!time1.getMinutes() && !time2.getMinutes()) {
                    return 0;
                } else if (!time1.getMinutes() && time2.getMinutes()) {
                    return -1;
                } else if (time1.getMinutes() && !time2.getMinutes()) {
                    return 1;
                } else if (time1.getMinutes() < time2.getMinutes()) {
                    return -1;
                } else if (time1.getMinutes() > time2.getMinutes()) {
                    return 1;
                } else if (time1.getMinutes() == time2.getMinutes()) {
                    return 0;
                }
            }
        } else if (time1 && !time2) {
            return -1;
        } else if (!time1 && time2) {
            return 1;
        } else {
            return 0;
        }
    }

    this.getCurrentDrawingTime = function() {
        return this.getDrawingTime(new Date());
    };

    this.getBackgroundImageUrl = function () {
        return config.theme.backgroundImageUrl;
    };

    this.winningNumberHasBeenDrawn = function (pick3DrawTime) {
        var now = new Date();
        //now.setDate(now.getDate() - 1);
        //now.setHours(17, 30, 0, 0);

        var drawingTime = this.getDrawingTime(/*now*/pick3DrawTime.getDateTime());
        var winningNumberDrawn = false;

        if (now >= drawingTime.getDateTime()) {
            winningNumberDrawn = true;
        }

        return winningNumberDrawn;
    };
}
TexasPick3Lottery.getActualMorningDrawingTime = function(actualMorningDrawingTime) {
    if (!actualMorningDrawingTime) {
        actualMorningDrawingTime = new Date();
    }
    var drawingTime = {
        type: "Morning",
        dateTime: actualMorningDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(10, 15, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualDayDrawingTime = function(actualDayDrawingTime) {
    if (!actualDayDrawingTime) {
        actualDayDrawingTime = new Date();
    }

    var drawingTime = {
        type: "Day",
        dateTime: actualDayDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(12, 45, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualEveningDrawingTime = function(actualEveningDrawingTime) {
    if (!actualEveningDrawingTime) {
        actualEveningDrawingTime = new Date();
    }
    var drawingTime = {
        type: "Evening",
        dateTime: actualEveningDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

    drawingTime.getDateTime().setHours(18, 15, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getActualNightDrawingTime = function(actualNightDrawingTime) {
    if (!actualNightDrawingTime) {
        actualNightDrawingTime = new Date();
    }
    var drawingTime = {
        type: "Night",
        dateTime: actualNightDrawingTime,
        getType: function() {
            return this.type;
        },
        setType: function(type) {
            this.type = type;
        },
        getDateTime: function() {
            return this.dateTime;
        },
        setDateTime: function (dateTime) {
            this.dateTime = dateTime;
        }
    };

	drawingTime.getDateTime().setHours(22, 30, 0, 0);

    return drawingTime;
};

TexasPick3Lottery.getAvailableDrawingTimes = function(targetDrawingTime) {
    var collectAvailableDrawingTimes = false;
    var availableDrawingTimes = [];

    for (var drawingTime in TexasPick3Lottery.DRAWING_TIMES) {
        if (TexasPick3Lottery.DRAWING_TIMES.hasOwnProperty(drawingTime)) {
            if (drawingTime === targetDrawingTime) {
                collectAvailableDrawingTimes = true;
            }

            if (collectAvailableDrawingTimes) {
                availableDrawingTimes.push(TexasPick3Lottery.DRAWING_TIMES[drawingTime]());
            }
        }
    }

    return availableDrawingTimes;
};

TexasPick3Lottery.DRAWING_TIMES = {
    MORNING: TexasPick3Lottery.getActualMorningDrawingTime,
    DAY: TexasPick3Lottery.getActualDayDrawingTime,
    EVENING: TexasPick3Lottery.getActualEveningDrawingTime,
    NIGHT: TexasPick3Lottery.getActualNightDrawingTime
};
module.exports = TexasPick3Lottery;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var UrlScraper = require('./software.bytepushers.pick3.lottery.web.UrlScraper');
var DrawingYearNotAvailableException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingYearNotAvailableException');

function TexasPick3UrlScraper(TxPick3UrlScraperConfig) {
    'use strict';
    
    TexasPick3UrlScraper.prototype.superclass.apply(this, [TxPick3UrlScraperConfig]);

    this.scrapeUrlForYear = function(targetDate) {
        var targetYear = targetDate.getFullYear(),
            $html = this.getPageReader(),
            targetUrl = (Object.isFunction($html.find)) ?
                $html.find('#Pick3PastWinningNumbers').find('select > option:contains(' + targetYear + ')').attr("value") :
                $html('#Pick3PastWinningNumbers').find('select > option:contains(' + targetYear + ')').attr("value"),
            baseUrl = this.getBaseUrl();

        if (targetUrl === undefined || targetUrl === null) {
            throw new DrawingYearNotAvailableException(targetYear);
        }

        return baseUrl + targetUrl.replace("index", "print");
    };
}

TexasPick3UrlScraper.prototype = BytePushers.inherit(UrlScraper.prototype);
TexasPick3UrlScraper.prototype.constructor = TexasPick3UrlScraper;
TexasPick3UrlScraper.prototype.superclass = UrlScraper;

TexasPick3UrlScraper.PATH_TO_SCRAPE_FOR_PAST_WINNING_NUMBERS = "/export/sites/lottery/Games/Pick_3/Winning_Numbers/";
TexasPick3UrlScraper.PATH_TO_SCRAPE_FOR_CURRENT_WINNING_NUMBERS = "/export/sites/lottery/Games/Pick_3/index.html";
TexasPick3UrlScraper.BASE_URL = "https://www.txlottery.org";

module.exports = TexasPick3UrlScraper;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');
var WinningNumberNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.WinningNumberNotFoundException');
var DrawingYearNotAvailableException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingYearNotAvailableException');

function TexasPick3WebScraper(TxPick3WebScraperConfig) {
    'use strict';
    
    TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
    var $ = this.getPageReader(),
        self = this;

    function scrapeDrawDateTdElement(drawingDate) {
        var $drawDateTdElement = (Object.isFunction($.find)) ?
            $.find('tr > td:first-child:contains(' + drawingDate + ')') :
            $('tr > td:first-child:contains(' + drawingDate + ')');

        return $drawDateTdElement;
    }

    function scrapeDrawDateTrElement($targetTdElement) {
        var $drawDateTrElement = $targetTdElement.parent();

        return $drawDateTrElement;
    }

    function convertBinaryArrayToString(bytes) {
        var result = "",
            i = 0;

        for (i = 0; i < bytes.length; i += 1) {
            result += String.fromCharCode(bytes[i]);
        }

        return result;
    }
    function removeNewLineBytes(someText) {
        var bytes = [], // char codes
            code,
            i;

        for (i = 0; i < someText.length; i += 1) {
            code = someText.charCodeAt(i);

            bytes = bytes.concat([code]);
        }

        for (i = 0; i < bytes.length; i += 1) {
            if (bytes[i] === 92 && bytes[i+1] === 110) {
                bytes.splice(i, 2);
            }
        }

        someText = convertBinaryArrayToString(bytes);

        return someText.trim();
    }

    function parseTargetDrawDateSection($targetTrElement) {
        var tdElements = $targetTrElement.children('td'),
            result = { morningTdElements:[],
                dayTdElements: [],
                eveningTdElements: [],
                nightTdElements: []
            },
            columnCount = 0;

        // Iterate over the td elements and separate them into morning, day, evening, and night buckets
        // based on the column the element lies in.
        tdElements.each(function (ignore, $tdElement) {
            if ($tdElement.attribs && $tdElement.attribs.colspan) {
                columnCount += parseInt($tdElement.attribs.colspan);
            } else {
                columnCount += 1;
            }

            if (2 <= columnCount && columnCount <= 4) {
                result.morningTdElements.push($tdElement);
            } else if (6 <= columnCount && columnCount <= 8) {
                result.dayTdElements.push($tdElement);
            } else if (10 <= columnCount && columnCount <= 12) {
                result.eveningTdElements.push($tdElement);
            } else if (14 <= columnCount && columnCount <= 16) {
                result.nightTdElements.push($tdElement);
            }
        });

        return result;
    }

    function scrapeWinningNumber(parsedDrawDateSection) {
        var num1, num2, num3, winningNumber;

        if (parsedDrawDateSection.length !== 3) {
            throw new DrawingTimeNotFoundException(self.getDrawingTime(), self.getDrawingDate());
        }

        num1 = (parsedDrawDateSection[0] &&
                parsedDrawDateSection[0].children[0] &&
                parsedDrawDateSection[0].children[0].data) ?
            removeNewLineBytes(parsedDrawDateSection[0].children[0].data).trim() : (parsedDrawDateSection[0] && parsedDrawDateSection[0].innerText) ? parsedDrawDateSection[0].innerText.trim() : null;
        num2 = (parsedDrawDateSection[1] &&
            parsedDrawDateSection[1].children[0] &&
            parsedDrawDateSection[1].children[0].data) ?
            removeNewLineBytes(parsedDrawDateSection[1].children[0].data).trim() : (parsedDrawDateSection[1] && parsedDrawDateSection[1].innerText) ? parsedDrawDateSection[1].innerText.trim() : null;
        num3 = (parsedDrawDateSection[2] &&
            parsedDrawDateSection[2].children[0] &&
            parsedDrawDateSection[2].children[0].data) ?
            removeNewLineBytes(parsedDrawDateSection[2].children[0].data).trim(): (parsedDrawDateSection[2] && parsedDrawDateSection[2].innerText) ? parsedDrawDateSection[2].innerText.trim() : null;

        if (num1 && num2 && num3) {
            winningNumber = 100 * num1 + 10 * num2 + 1 * num3;
        } else {
            console.error("Could not convert number: num1: " + num1 + ", num2: " + num2 + ", num3: " + num3);
            throw new WinningNumberNotFoundException(num1, num2, num3);
        }

        return winningNumber;
    }

    function findTargetDrawDateSection(drawingDate){
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = null;

        if ($targetTdElement.length > 0) {
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement);
        } else {
            throw new DrawingYearNotAvailableException(drawingDate);
        }

        return $targetTrElement;
    }

    function getElementData (element) {
        var data = null;

        if (element && element.children && element.children[0] && element.children[0].innerText) {
            data = element.children[0].innerText.trim();
        } else if (element && element.children && element.children.length == 3 && element.children[1].children && element.children[1].children[0] && element.children[1].children[0].data) {
            data = element.children[1].children[0].data.trim();
        } else if (element && element.children && element.children[0] && element.children[0].children && element.children[0].children.length == 1) {
            data = element.children[0].children[0].data.trim();
        }

        return data;
    }

    this.findMorningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.morningTdElements);

        return winningNumber;
    };

    this.findLastDrawnMorningWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnDayWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnEveningWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };


    this.findLastDrawnNightWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnWinningNumber = function (drawingDate, drawingTime) {
        var lastDrawnWinningNumber = 0,
            digits = [],
            $drawDateDivElement = (Object.isFunction($.find)) ?
                $.find('div.large-6.cell > div.homePageCell:contains(' + drawingDate + ' ' + drawingTime + ')') :
                $('div.large-6.cell > div.homePageCell:contains(' + drawingDate + ' ' + drawingTime + ')');

        if ($drawDateDivElement === null || $drawDateDivElement === undefined || $drawDateDivElement.length == 0) {
            throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        if ($drawDateDivElement !== null && $drawDateDivElement !== undefined) {
            var $lastDrawWinningNumberLiElement = $drawDateDivElement.find('ol.winningNumberBalls > li:not(:contains(FIREBALL))');
            $lastDrawWinningNumberLiElement.each(function(index, element) {
                var data = getElementData(element);
                digits.push(data);

                if (data !== null && data !== undefined) {
                    if (index == 0){
                        lastDrawnWinningNumber = data * 100;
                    } else if (index == 1) {
                        lastDrawnWinningNumber = lastDrawnWinningNumber + (data * 10);
                    } else if (index === 2) {
                        lastDrawnWinningNumber = lastDrawnWinningNumber + (data * 1);
                    }
                }
            });
        }

        var throwWinningNumberNotFoundException = digits.some(function (digit) {
            return (digit === null || digit === undefined || digit === "");
        });

        if (throwWinningNumberNotFoundException) {
            throw new WinningNumberNotFoundException(digits[0], digits[1], digits[2]);
        }

        return lastDrawnWinningNumber;
    };

    this.findDayWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.dayTdElements);

        return winningNumber;
    };

    this.findEveningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.eveningTdElements);

        return winningNumber;
    };

    this.findNightWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.nightTdElements);

        return winningNumber;
    };
}

TexasPick3WebScraper.prototype = BytePushers.inherit(WebScraper.prototype);
TexasPick3WebScraper.prototype.constructor = TexasPick3WebScraper;
TexasPick3WebScraper.prototype.superclass = WebScraper;

module.exports = TexasPick3WebScraper;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */
/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');

function UrlScraper(urlScraperConfig) {
    'use strict';
    
    UrlScraper.prototype.superclass.apply(this, [urlScraperConfig]);
    var drawingDate = (urlScraperConfig && urlScraperConfig.drawingDate) ? urlScraperConfig.drawingDate : null;

    this.getDrawingDate = function() {
        return drawingDate;
    };

    this.scrapeUrlForYear = function(targetDate) {
        throw new Error("method not implemented by UrlScraper " + this.constructor.name);
    };

    this.findDrawingUrlForYear = function(drawingDate) {
        var targetUrl = this.scrapeUrlForYear(drawingDate);

        return targetUrl;
    };
}

UrlScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
UrlScraper.prototype.constructor = UrlScraper;
UrlScraper.prototype.superclass = BaseWebScraper;

module.exports = UrlScraper;
;/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');

function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    
    WebScraper.prototype.superclass.apply(this, [txPick3WebScraperConfig]);
    this.drawingDate = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingDate)? txPick3WebScraperConfig.drawingDate : null;
    this.drawingTime = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingTime)? txPick3WebScraperConfig.drawingTime : null;
    this.drawingNumber = -1;

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    this.getDrawingDate = function () {
        return this.drawingDate;
    };

    this.getDrawingTime = function () {
        return this.drawingTime;
    };

    this.getDrawingNumber = function () {
        return this.drawingNumber;
    };

    this.getActualMorningDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualDayDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualEveningDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualNightDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getNextDrawingDrawingTime = function (currentDate) {
        if (currentDate instanceof Date) {
            if (currentDate <= this.getActualMorningDrawingTime()) {
                return WebScraper.DRAWING_TIMES.MORNING;
            } else if (currentDate <= this.getActualDayDrawingTime()) {
                return WebScraper.DRAWING_TIMES.DAY;
            } else if (currentDate <= this.getActualEveningDrawingTime()) {
                return WebScraper.DRAWING_TIMES.EVENING;
            } else if (currentDate <= this.getActualNightDrawingTime()) {
                return WebScraper.DRAWING_TIMES.NIGHT;
            } else {
                return WebScraper.DRAWING_TIMES.TOMORROW_MORNING;
            }
        }

        throw new Error("parameter.must.be.a.date");
    };

    this.findMorningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findDayWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findEveningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findNightWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnMorningWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnDayWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnEveningWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnNightWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getMorningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getDayPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getEveningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getNightPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawingWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = this.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);

            throw new Error("Problem occurred while trying to format date: " + drawingDate);
        }

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = this.findLastDrawnMorningWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = this.findLastDrawnDayWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = this.findLastDrawnEveningWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = this.findLastDrawnNightWinningNumber(formattedDrawingDate, drawingTime);
                break;
            default:
                throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        return winningNumber;
    };

    this.findPastWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = this.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);

            throw new Error("Problem occurred while trying to format date: " + drawingDate);
        }

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = this.findMorningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = this.findDayWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = this.findEveningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = this.findNightWinningNumber(formattedDrawingDate);
                break;
            default:
                throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        return winningNumber;
    };

    this.formatDate = function(targetDate) {
        var formattedTargetDate = null;

        if (targetDate instanceof Date) {
            formattedTargetDate = pad(targetDate.getMonth()+1) + "/" + pad(targetDate.getDate()) + "/" + targetDate.getFullYear();
        } else if (typeof targetDate === 'string' || targetDate instanceof String) {
            formattedTargetDate = targetDate;
        }

        return formattedTargetDate;
    };
}
WebScraper.DRAWING_TIMES = BytePushers.enumeration({
    'MORNING': {
        value: 'Morning',
        description: "Pick 3 Lottery drawing time for morning time drawing."
    },
    'DAY': {
        value: 'Day',
        description: "Pick 3 Lottery drawing time for mid-day time drawing."
    },
    'EVENING': {
        value: 'Evening',
        description: "Pick 3 Lottery drawing time for evening time drawing."
    },
    'NIGHT': {
        value: 'Night',
        description: "Pick 3 Lottery drawing time for night time drawing."
    },
    'TOMORROW_MORNING': {
        value: 'Tomorrow Morning',
        description: "Pick 3 Lottery drawing time for tomorrow morning drawing."
    }
});

WebScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
WebScraper.prototype.constructor = WebScraper;
WebScraper.prototype.superclass = BaseWebScraper;

module.exports = WebScraper;
