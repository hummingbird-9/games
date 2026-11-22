class NotificationManager
{
    NOTIFICATION_IDS = {
        "isCapacityFull":           0,
        "canCraftDrill":            1,
        "canCraftStructure":        2,
        "isScientist1Ready":        3,
        "isScientist1Dead":         4,
        "isScientist2Ready":        5,
        "isScientist2Dead":         6,
        "isScientist3Ready":        7,
        "isScientist3Dead":         8,
        "canSendDrone":             9,
        "isCaveTreasureAvailable":  10,
        "canUpgradeDrone":          11,
        "canCraftGem":              12,
        "hasReactorStopped":        13,
        "canCraftReactorComponent": 14
    }

    notifications = {};

    constructor()
    {
        this.initializeNotifications();
    }

    initializeNotifications()
    {
        this.addNotification(
            this.NOTIFICATION_IDS.isCapacityFull,
            isCapacityFull
        );
        this.addNotification(
            this.NOTIFICATION_IDS.canCraftDrill,
            () => getCraftableBlueprintCount(craftingCategories.drill)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.canCraftStructure,
            () => getCraftableBlueprintCount(craftingCategories.structures)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist1Ready,
            () => activeScientists[0].length > 0 && (isExcavationDone(0) || !isOnActiveExcavation(0)) && !isScientistDead(0)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist1Dead,
            () => activeScientists[0].length > 0 && isScientistDead(0)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist2Ready,
            () => activeScientists[1].length > 0 && (isExcavationDone(1) || !isOnActiveExcavation(1)) && !isScientistDead(1)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist2Dead,
            () => activeScientists[1].length > 0 && isScientistDead(1)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist3Ready,
            () => activeScientists[2].length > 0 && (isExcavationDone(2) || !isOnActiveExcavation(2)) && !isScientistDead(2)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isScientist3Dead,
            () => activeScientists[2].length > 0 && isScientistDead(2)
        );
        this.addNotification(
            this.NOTIFICATION_IDS.canSendDrone,
            function() {
                var droneCount = 0;
                for(var i in caves)
                {
                    if(caves[i].isActive && caves[i].currentFuel >= 100)
                    {
                        ++droneCount
                    }
                }
                return droneCount;
            }
        );
        this.addNotification(
            this.NOTIFICATION_IDS.isCaveTreasureAvailable,
            () => treasureStorage.treasure.length
        );
        this.addNotification(
            this.NOTIFICATION_IDS.canUpgradeDrone,
            () => getCraftableBlueprintCount(craftingCategories.droneUpgrades)
        );
        // Deactivated, may want to revisit
        this.addNotification(
            this.NOTIFICATION_IDS.canCraftGem,
            () => false
        );
        this.addNotification(
            this.NOTIFICATION_IDS.hasReactorStopped,
            () => !reactor.isRunning
        );
        this.addNotification(
            this.NOTIFICATION_IDS.canCraftReactorComponent,
            () => false
        );
    }

    update()
    {
        for (var i in this.notifications)
        {
            if (this.notifications[i].pollTime < 0 || 
                this.notifications[i].pollTime <= performance.now() - this.notifications[i].lastPollTime)
            {
                this.updateNotification(i);
            }
        }
    }

    addNotification(notificationId, valueFunction, cancelOnDecrease=true, pollTime=-1)
    {
        if (!this.notifications[notificationId])
        {
            this.notifications[notificationId] = {};
        }
        this.notifications[notificationId].valueFunction = valueFunction;
        this.notifications[notificationId].pollTime = pollTime;
        this.notifications[notificationId].lastPollTime = 0;
        this.notifications[notificationId].value = 0;
        this.notifications[notificationId].isSeen = true;
        this.notifications[notificationId].cancelOnDecrease = cancelOnDecrease;
    }

    updateNotification(notificationId)
    {
        if (!this.notifications[notificationId] || !this.notifications[notificationId].valueFunction)
        {
            return false;
        }
        if (this.notifications[notificationId].pollTime > 0)
        {
            this.notifications[notificationId].lastPollTime = performance.now();
        }
        this.notify(notificationId, this.notifications[notificationId].valueFunction());
    }

    notify(notificationId, value)
    {
        if (!this.notifications[notificationId])
        {
            this.notifications[notificationId] = {
                isSeen: !Boolean(value),
                value: value
            };
        }
        else if (typeof(this.notifications[notificationId].value) === "undefined" || 
            this.notifications[notificationId].value != value && 
            (!this.notifications[notificationId].cancelOnDecrease || this.notifications[notificationId].value < value))
        {
            this.notifications[notificationId].isSeen = !Boolean(value);
            this.notifications[notificationId].value = value;
        }
        else if (this.notifications[notificationId].cancelOnDecrease && this.notifications[notificationId].value > value)
        {
            this.notifications[notificationId].isSeen = true;
            this.notifications[notificationId].value = value;
        }
    }

    // LISTENER METHODS

    isNotificationUnseen(notificationId)
    {
        if (!this.notifications[notificationId])
        {
            return false;
        }
        return !this.notifications[notificationId].isSeen;
    }

    checkForUnseenNotifications(notificationIds)
    {
        for (var i in notificationIds)
        {
            if (this.isNotificationUnseen(notificationIds[i]))
            {
                return true;
            }
        }
        return false;
    }

    getNotificationValue(notificationId)
    {
        if (!this.notifications[notificationId])
        {
            return null;
        }
        return this.notifications[notificationId].value;
    }

    markAsSeen(notificationId)
    {
        if (this.notifications[notificationId])
        {
            this.notifications[notificationId].isSeen = true;
        }
    }

    markAllAsSeen(notificationIds)
    {
        for (var i in notificationIds)
        {
            this.markAsSeen(notificationIds[i]);
        }
    }
}

var notificationManager = new NotificationManager();