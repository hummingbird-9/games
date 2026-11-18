class PushNotificationManager
{
    isActive = true;

    url = "https://notifications.playsaurus.com/";
    scheduleEndpoint = "notifications/schedule.php";
    clearEndpoint = "notifications/clear.php";
    gameName = "mrmine";

    deviceToken;

    isPaused = false;
    lastStartTime;

    notificationQueue = []
    internetPollInterval = null;
    pollPeriodSeconds = 30;
    
    sleepNotifications = [
        {
            // Capacity full (running in background)
            "title": "Mr.Mine",
            "body": _("Your mineral capacity is full. Sell minerals to continue mining!!"),
            "scheduleFunction": function()
            {
                var timeUntilFullBufferSeconds = 1; //will want to give more buffer than 1 second later
                var secondsUntilFull = timeUntilFullBufferSeconds + timeUntilCapacityIsFullSeconds(); 
                if (secondsUntilFull > 7200 && managerStructure.level > 0)
                {
                    var effectiveManagerLevel = Math.min(managerStats.length, managerStructure.level);
                    var offlineEfficiency = managerStats[effectiveManagerLevel - 1].efficiency;
                    secondsUntilFull = secondsUntilFull / offlineEfficiency;
                }
                return secondsUntilFull
            }.bind(this),
            "isRelative": true,
            "isActiveFunction": function() {
                var secondsUntilFull = timeUntilCapacityIsFullSeconds()
                if (secondsUntilFull < 120 || secondsUntilFull == Infinity)
                {
                    // Time is too short or player has no miners
                    return false;
                }
                if (secondsUntilFull > 7200 && managerStructure.level > 0)
                {
                    // At least two hours until full; assume offline progress
                    var effectiveManagerLevel = Math.min(managerStats.length, managerStructure.level);
                    var offlineEfficiency = managerStats[effectiveManagerLevel - 1].efficiency;
                    var offlineDurationMins = managerStats[effectiveManagerLevel - 1].durationMins * STAT.offlineProgressMaxDurationMultiplier();
                    if (offlineDurationMins * 60 < secondsUntilFull / offlineEfficiency)
                    {
                        // Player will run out of offline progress before capacity is full
                        return false;
                    }
                }
                return true
            }
        },
        {
            "title": "Mr.Mine",
            "body": _("Your offline progress has maxed out, come collect it!"),
            "scheduleFunction": function()
            {
                var effectiveManagerLevel = Math.min(managerStats.length, managerStructure.level);
                return 60 * managerStats[effectiveManagerLevel - 1].durationMins * STAT.offlineProgressMaxDurationMultiplier();
            }.bind(this),
            "isRelative": true,
            "isActiveFunction": () => managerStructure.level > 0
        },
        {
            "title": "Mr.Mine",
            "body": _("Your miners are slacking without you. Come back and put them to work!"),
            "scheduleFunction": function()
            {
                // Start time + 24 hours
                return this.lastStartTime + 86400
            }.bind(this),
            "isRelative": false,
            "isActiveFunction": () => true
        },
        {
            "title": "Mr.Mine",
            "body": _("A lot has happened in the mine, check in now!"),
            "scheduleFunction": function()
            {
                // Start time + 1 week
                return this.lastStartTime + 604800
            }.bind(this),
            "isRelative": false,
            "isActiveFunction": () => true
        },
        {
            "title": "Mr.Mine",
            "body": _("Your scientists found something special!"),
            "scheduleFunction": function()
            {
                var shortestTime = Number.MAX_SAFE_INTEGER
                for (var i in activeExcavations)
                {
                    var remainingTime = excavationTimeRemainingSeconds(i);
                    if (activeExcavations[i][3] <= 0 && !isExcavationDone(i) && remainingTime < shortestTime)
                    {
                        shortestTime = remainingTime;
                    }
                }
                return shortestTime
            }.bind(this),
            "isRelative": true,
            "isActiveFunction": function()
            {
                for (var i in activeExcavations)
                {
                    if (activeExcavations[i].length > 0 && activeExcavations[i][3] <= 0 && !isExcavationDone(i))
                    {
                        return true;
                    }
                }
                return false;
            }.bind(this)
        }
    ]

    constructor()
    {
        if (
            typeof(cordova) == "undefined" 
            || typeof(cordova.plugins) == "undefined"
            || typeof(cordova.plugins.firebase) == "undefined"
            || typeof(cordova.plugins.firebase.messaging) == "undefined"
        ) 
        {
            console.log("[PUSH NOTIFICATIONS] Push notifications disabled")
            this.isActive = false;
            return;
        }
        this.lastStartTime = Math.floor(Date.now() / 1000);
        this.clearNotifications();
        this.setupEventListeners();
    }

    setupEventListeners()
    {
        if (!this.isActive) return;
        
        document.addEventListener("pause", function() {
            this.isPaused = true
            this.scheduleStandardSleepNotifications();
        }.bind(this));
        document.addEventListener("resume", function()
        {
            this.isPaused = false;
            this.lastStartTime = Math.floor(Date.now() / 1000);
            if (this.internetPollInterval)
            {
                clearInterval(this.internetPollInterval);
            }
            this.clearNotifications();
            cordova.plugins.firebase.messaging.clearNotifications()
        }.bind(this));
        document.addEventListener("online", function() {
            if (!this.isPaused)
            {
                this.clearNotifications();
            }
            if (this.internetPollInterval)
            {
                clearInterval(this.internetPollInterval);
            }
        }.bind(this));
        window.addEventListener('beforeunload', function(event) {
            this.clearNotifications()
        }.bind(this));
    }

    passDeviceToken(callback)
    {
        if (!this.isActive) return;
        if (this.deviceToken)
        {
            callback(this.deviceToken);
        }
        else
        {
            if(cordova.plugins.hasOwnProperty("firebase"))
            {
                if(cordova.plugins.firebase.hasOwnProperty("messaging"))
                {
                    cordova.plugins.firebase.messaging.getToken().then(
                        function(token) {
                            this.deviceToken = token;
                            callback(token);
                        }.bind(this)
                    );
                }
            }
        }
    }

    scheduleNotification(title, body, sendTime, isRelative, queueOnFailure=true)
    {
        if (!this.isActive) return;
        
        this.passDeviceToken(
            function(token) {
                var args = {
                    "game": this.gameName,
                    "deviceToken": token,
                    "messageTitle": title,
                    "messageBody": body,
                }
                if (isRelative)
                {
                    args.relativeSendTime = sendTime;
                }
                else
                {
                    args.sendTime = sendTime;
                }
                ajax(
                    this.url + this.scheduleEndpoint,
                    args,
                    "POST",
                    function(response, xhr)
                    {
                        if (queueOnFailure && response == "" && xhr.status == 0)
                        {
                            console.log("FAILED TO SCHEDULE NOTIFICATION");
                            this.queueNotification(title, body, sendTime, isRelative);
                            if (!this.isPollingInternetConnection())
                            {
                                this.pollInternetConnection(
                                    this.scheduleQueuedNotifications.bind(this)
                                )
                            }
                        }
                    }.bind(this)
                )
            }.bind(this)
        )
    }

    scheduleStandardSleepNotifications()
    {
        if (!this.isActive) return;
        
        for (var notification of this.sleepNotifications)
        {
            if (notification.isActiveFunction())
            {
                this.scheduleNotification(
                    notification.title,
                    notification.body,
                    notification.scheduleFunction(),
                    notification.isRelative
                )
            }
        }
    }

    clearNotifications()
    {
        if (!this.isActive) return;
        
        this.notificationQueue = []
        this.passDeviceToken(
            function(token) {
                ajax(
                    this.url + this.clearEndpoint,
                    {
                        "game": this.gameName,
                        "deviceToken": token
                    },
                    "POST"
                )
            }.bind(this)
        )
    }

    sendNotification(title, body)
    {
        if (!this.isActive) return;
        
        this.scheduleNotification(title, body, 0, false);
    }

    queueNotification(title, body, sendTime, isRelative)
    {
        if (!this.isActive) return;
        
        this.notificationQueue.push(
            {
                title: title, 
                body: body, 
                sendTime: sendTime, 
                isRelative: isRelative,
                queuedTime: Date.now() / 1000
            });
    }

    scheduleQueuedNotifications()
    {
        if (!this.isActive) return;

        console.log("SCHEDULING QUEUED NOTIFICATIONS");
        var now = Math.floor(Date.now() / 1000);
        for (var i = this.notificationQueue.length - 1; i >= 0; --i)
        {
            var notification = this.notificationQueue.pop();
            var timeOffset = notification.isRelative ? notification.queuedTime : 0;
            if (now <= timeOffset + notification.sendTime)
            {
                // Queued notifications are scheduled relative to the time they were queued
                this.scheduleNotification(
                    notification.title,
                    notification.body,
                    timeOffset + notification.sendTime,
                    false
                )
            }
        }
        this.notificationQueue = [];
    }

    // Continually poll the internet connection and trigger the callback function on success
	pollInternetConnection(callback)
	{
        if (!this.isActive) return;
        
        console.log("STARTING CONNECTION POLL INTERVAL");
		this.internetPollInterval = window.setInterval(
			function()
			{
                console.log("CHECKING INTERNET CONNECTION (" + Math.floor(Date.now() / 1000) + ")");
                ajax(
                    this.url + "?t=" + Date.now(),
                    {},
                    "GET",
                    function(response, xhr)
                    {
                        if (xhr.status == 200)
                        {
                            console.log("INTERNET CONNECTED");
                            clearInterval(this.internetPollInterval);
                            this.internetPollInterval = null;
                            callback();
                        }
                        else
                        {
                            console.log("INTERNET DISCONNECTED");
                        }
                    }.bind(this)
                )
			}.bind(this), this.pollPeriodSeconds * 1000
		)
	}

    isPollingInternetConnection()
    {
        if (!this.isActive) return;
        
        return this.internetPollInterval != null;
    }
}

var pushNotificationManager;
document.addEventListener("deviceready", () => {
    pushNotificationManager = new PushNotificationManager();
}, false);