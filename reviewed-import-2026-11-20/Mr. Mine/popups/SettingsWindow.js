class SettingsWindow extends BottomTabbedPopup
{
    layerName = "Settings"; // Used as key in activeLayers
    domElementId = "SETTINGSD"; // ID of dom element that gets shown or hidden
    context = SETTINGS;         // Canvas rendering context for popup

    debugLogBox;
    statsPanelBox;
    settingsPane;

    constructor(boundingBox, startTab = 0)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        var settingsCategories = {
            0: _("Settings"),
            1: _("Events"),
            2: _("Debug"),
            3: _("Stats")
        }

        if (CHEATS_ENABLED)
        {
            settingsCategories["4"] = "Cheats";
        }

        this.initializeTabs(Object.values(settingsCategories));

        this.settingsPane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.bodyContainer.boundingBox.width,
                height: this.bodyContainer.boundingBox.height
            }, {}, ""
        );
        this.settingsPane.allowBubbling = true;
        this.bodyContainer.addHitbox(this.settingsPane);

        this.debugLogBox = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            15
        );
        this.addHitbox(this.debugLogBox);

        this.statsPanelBox = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y + 10,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height + 15,
            15
        );
        this.addHitbox(this.statsPanelBox);

        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Save Game"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,    
                y: this.settingsPane.boundingBox.height * .05,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    savegame();
                    backupSavesToCloud();
                    newNews(_("Game saved!"));
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            }
        ));

        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Export Game"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,     
                y: this.settingsPane.boundingBox.height * .16,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    showExportPopup();
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            }
        ));

        if (platform.getCordovaPlatformId() != "ios")
        {
        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Import Game"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .27,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    showImportPopup();
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            }
        ));
        }

        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Subscribe to Updates"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .05,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    openExternalLinkInDefaultBrowser("https://mrmine.com/subscribePush.html");
                }
            }
        ));

        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Privacy Policy"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .16,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    openExternalLinkInDefaultBrowser("http://www.clickerheroes.com/privacyPolicy.txt");
                }
            }
        ));

        this.settingsPane.addHitbox(new Button(
            upgradeb, _("Language") + " (Language)", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .27,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    hideTooltip();
                    showLanguageSelection();
                }
            }
        ));

        var musicCheckbox = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.settingsPane.boundingBox.width * .045,
                y: this.boundingBox.height * .34,
                width: this.settingsPane.boundingBox.width * .945,
                height: this.settingsPane.boundingBox.height * .06
            }
        ));
        musicCheckbox.getValue = function()
        {
            if(mute == 1)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        musicCheckbox.setValue = function(newValue)
        {
            if(newValue) {mute = 0; platform.setMusicVolume(0.13);} else {mute = 1; platform.setMusicVolume(0);};
            localStorage["mute"] = mute;
        }
        musicCheckbox.labelText = _("Music On");

        var soundsCheckbox = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.boundingBox.width * .045,
                y: this.boundingBox.height * .41,
                width: this.boundingBox.width * .945,
                height: this.boundingBox.height * .06
            }
        ));
        soundsCheckbox.getValue = function()
        {
            if(mutebuttons == 1)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        soundsCheckbox.setValue = function(newValue)
        {
            if(newValue) {mutebuttons = 0;} else {mutebuttons = 1;}
            localStorage["mutebuttons"] = mutebuttons;
        }
        
        soundsCheckbox.labelText = isMobile() ? _("Tap Sounds On") : _("Click Sounds On");

        var capacityCheckbox = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.boundingBox.width * .045,
                y: this.boundingBox.height * .48,
                width: this.boundingBox.width * .945,
                height: this.boundingBox.height * .06
            }
        ));
        capacityCheckbox.getValue = function()
        {
            if(mutecapacity == 1)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
        capacityCheckbox.setValue = function(newValue)
        {
            if(newValue) {mutecapacity = 0;} else {mutecapacity = 1;}
            localStorage["mutecapacity"] = mutecapacity;
        }
        capacityCheckbox.labelText = _("Capacity Full Sound On");

        var mineralsCheckbox = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.boundingBox.width * .045,
                y: this.boundingBox.height * .55,
                width: this.boundingBox.width * .945,
                height: this.boundingBox.height * .06
            }
        ));
        mineralsCheckbox.getValue = function()
        {
            return quality;
        }
        mineralsCheckbox.setValue = function(newValue)
        {
            if(!newValue)
            {
                quality = 0;
                // MAIN.imageSmoothingEnabled = false;
                MAIN.imageSmoothingQuality = "high";
            }
            else
            {
                quality = 1;
                // MAIN.imageSmoothingEnabled = true;
                MAIN.imageSmoothingQuality = "high";
            }
        }
        mineralsCheckbox.labelText = _("Show Minerals Above Miners (And other effects)");

        var quotesCheckbox = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.boundingBox.width * .045,
                y: this.boundingBox.height * .62,
                width: this.boundingBox.width * .945,
                height: this.boundingBox.height * .06
            }
        ));
        quotesCheckbox.getValue = function()
        {
            return areQuotesEnabled;
        }
        quotesCheckbox.setValue = function(newValue)
        {
            areQuotesEnabled = newValue;
        }
        quotesCheckbox.labelText = _("Show Miner Quotes");

        var chestsPopup = this.settingsPane.addHitbox(new Checkbox(
            {
                x: this.boundingBox.width * .045,
                y: this.boundingBox.height * .69,
                width: this.boundingBox.width * .945,
                height: this.boundingBox.height * .06
            }
        ));
        chestsPopup.getValue = function()
        {
            return chestService.chestPopupEnabled;
        }
        chestsPopup.setValue = function(newValue)
        {
            chestService.chestPopupEnabled = newValue;
        }
        chestsPopup.labelText = _("Show chests popup");

        if(startTab > 0)
        {
            this.currentTabIndex = startTab;
        }
        this.onTabChange();

        this.settingsPane.isVisible = () => this.currentTabIndex == 0;
        this.settingsPane.isEnabled = () =>  this.currentTabIndex == 0;
        this.debugLogBox.isVisible = () =>  this.currentTabIndex == 2 || this.currentTabIndex == 1;
        this.debugLogBox.isEnabled = () =>  this.currentTabIndex == 2 || this.currentTabIndex == 1;
        this.statsPanelBox.isVisible = () =>  this.currentTabIndex == 3;
        this.statsPanelBox.isEnabled = () =>  this.currentTabIndex == 3;

        if (CHEATS_ENABLED)
        {
            settingsCategories["4"] = "Cheats";
            this.cheatsPane = new Hitbox(
                {
                    x: 0,
                    y: 0,
                    width: this.bodyContainer.boundingBox.width,
                    height: this.bodyContainer.boundingBox.height
                }, {}, ""
            );
            this.cheatsPane.allowBubbling = true;
            this.cheatsPane.isVisible = () => this.currentTabIndex == 4;
            this.cheatsPane.isEnabled = () =>  this.currentTabIndex == 4;
            this.bodyContainer.addHitbox(this.cheatsPane);
            this.addCheatButtons();
        }
    }

    onTabChange()
    {
        this.debugLogBox.currentScrollY = 0;
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.context.restore();
        super.render(); // Render any child layers
        //Settings
        this.context.fillStyle = "#FFFFFF";

        if(this.currentTabIndex == 0)
        {
            //--- General ---
            // this.context.drawImage(darkdot, 0, 0, 1, 1, this.boundingBox.width * .04, this.boundingBox.height * .11, this.context.measureText(_("GENERAL")).width + this.boundingBox.width * .02, this.boundingBox.height * .05);
            // this.context.fillText(_("GENERAL"), this.boundingBox.width * .05, this.boundingBox.height * .15);
            
            //--- Audio ---
            // this.context.drawImage(darkdot, 0, 0, 1, 1, this.boundingBox.width * .04, this.boundingBox.height * .39, this.context.measureText(_("AUDIO")).width + this.boundingBox.width * .02, this.boundingBox.height * .05);
            // this.context.fillText(_("AUDIO"), this.boundingBox.width * .05, this.boundingBox.height * .43);
            
            //--- Effects ---
            // this.context.drawImage(darkdot, 0, 0, 1, 1, this.boundingBox.width * .04, this.boundingBox.height * .73, this.context.measureText(_("EFFECTS")).width + this.boundingBox.width * .02, this.boundingBox.height * .05);
            // this.context.fillText(_("EFFECTS"), this.boundingBox.width * .05, this.boundingBox.height * .77);
            
            //--- Key Bindings ---
            //this.context.fillText("KEY BINDINGS", this.boundingBox.width*.05, this.boundingBox.height*.70);
            //Coming soon
        }
        else if(this.currentTabIndex == 1)
        {
            this.renderLog(this.debugLogBox, eventlog);
        }
        else if(this.currentTabIndex == 2)
        {
            this.renderLog(this.debugLogBox, consoleLog);
        }
        else if(this.currentTabIndex == 3)
        {
            //stats
            this.renderStatsPanel();
        }
    }

    renderLog(logScrollbox, logSourceArray)
    {
        logScrollbox.context.save();
        logScrollbox.context.clearRect(0, 0, logScrollbox.contentWidth, logScrollbox.contentHeight);
        var fontSize = 16;
        var maxLines = 100;
        if(logScrollbox.canvas.height != 1.5 * maxLines * fontSize)
        {
            logScrollbox.canvas.height = 1.5 * maxLines * fontSize;
        }
        var prevLineY = 0;
        logScrollbox.context.font = fontSize + "px Verdana";
        logScrollbox.context.textBaseline = "top";
        logScrollbox.context.fillStyle = "white";
        var text;
        for(var line = logSourceArray.length - 1; line >= 0; --line)
        {
            if(typeof (logSourceArray[line]) == "object")
            {
                text = logSourceArray[line][0] + " (" + formattedCountDown((currentTime() - logSourceArray[line][1]) / 1000) + " Ago)";
            }
            else
            {
                text = logSourceArray[line];
            }
            var lineBoundingBox = fillTextWrap(
                logScrollbox.context,
                text,
                5,
                prevLineY + fontSize / 2,
                logScrollbox.contentWidth - 10
            );
            logScrollbox.context.save();
            if(line % 2 == 1)
            {
                logScrollbox.context.fillStyle = "#333333";
            }
            else
            {
                logScrollbox.context.fillStyle = "#666666";
            }
            logScrollbox.context.globalAlpha = 0.3;
            logScrollbox.context.globalCompositeOperation = "destination-over";
            logScrollbox.context.fillRect(lineBoundingBox.x1, lineBoundingBox.y1 - fontSize / 4, logScrollbox.contentWidth, lineBoundingBox.height + fontSize / 2);
            logScrollbox.context.restore();
            prevLineY = lineBoundingBox.y2;
            if(prevLineY + fontSize * 1.5 > logScrollbox.canvas.height)
            {
                break;
            }
        }
        if(logScrollbox.contentHeight != prevLineY)
        {
            logScrollbox.contentHeight = prevLineY;
        }
        logScrollbox.context.restore();
    }

    renderStatsPanel()
    {
        var numberOfStatLines = 18;
        var context = this.statsPanelBox.context;
        context.save();
        context.imageSmoothingEnabled = false;
        this.statsPanelBox.clearCanvas();
        this.statsPanelBox.contentHeight = this.statsPanelBox.boundingBox.height * .08 + (this.statsPanelBox.boundingBox.height * .09 * numberOfStatLines);

        /*context.drawImage(drillState.drill().worldAsset, 168 * (numFramesRendered % 4), 0, 168, 158, buydw * .62, buydh * .05, buydw * .25, buydh * .4);
        context.drawImage(drillState.engine().worldAsset, 168 * (numFramesRendered % 4), 0, 168, 158, buydw * .62, buydh * .05, buydw * .25, buydh * .4);

        if(drillState.equippedDrillEquips[0] > -1) {context.drawImage(drillState.engine().icon, 0, 0, 50, 50, buydw * .57, buydh * .5, buydw * .07, buydh * .1);}
        if(drillState.equippedDrillEquips[1] > -1) {context.drawImage(drillState.drill().icon, 0, 0, 50, 50, buydw * .65, buydh * .5, buydw * .07, buydh * .1);}
        if(drillState.equippedDrillEquips[2] > -1) {context.drawImage(drillState.fan().icon, 0, 0, 50, 50, buydw * .73, buydh * .5, buydw * .07, buydh * .1);}
        if(drillState.equippedDrillEquips[3] > -1) {context.drawImage(drillState.cargo().icon, 0, 0, 50, 50, buydw * .81, buydh * .5, buydw * .07, buydh * .1);}*/

        context.fillStyle = "#FFFFFF";
        context.font = "14px Verdana";
        context.fillText(_("Time Played") + ": " + shortenedFormattedTime(playtime), buydw * .03, buydh * .05);
        context.fillText(_("Drill Power") + ": " + beautifynum(drillWattage()) + " W", buydw * .03, buydh * .11);
        var timeUntilNext = estimatedTimeUntilNextDepth();
        context.fillText(_("Time Until {0}km Depth", (depth + 1)) + ": ", buydw * .03, buydh * .17);
        context.drawImage(oneDicons, 220, 0, 20, 20, buydw * .01 + BY.measureText(_("Time Until {0}km Depth", (depth + 1)) + ": ").width - buydw * .005, buydh * .17 - Math.round(buydw * .0225), Math.round(buydw * .025), Math.round(buydw * .025));
        context.fillText(formattedCountDown((parseInt(timeUntilNext) + 1)), buydw * .01 + BY.measureText(_("Time Until {0}km Depth", (depth + 1)) + ": ").width + buydw * .02, buydh * .17);

        //graph
        if(mineralAndMoneyLog.length > 0)
        {
            var largestValue = bigNumberMax.apply(null, totalValueLog);
            for(var i = 60; i > 0; i--)
            {
                var totalValuePlotPoint = new BigNumber(0);
                var mineralValuePlotPoint = new BigNumber(0);
                if(mineralAndMoneyLog.length > i)
                {
                    totalValuePlotPoint = totalValueLog[i];
                    mineralValuePlotPoint = mineralAndMoneyLog[i][0];
                }
                var plotPointWidth = Math.ceil(buydw * .0077);
                var totalValueHeight = buydh * .44 * divideBigNumberToDecimalNumber(totalValuePlotPoint, largestValue);
                var mineralValueHeight = buydh * .44 * divideBigNumberToDecimalNumber(mineralValuePlotPoint, largestValue);
                context.fillStyle = "#004400";
                context.fillRect(Math.floor(plotPointWidth * (i + 1)), buydh * .62 - totalValueHeight, plotPointWidth, totalValueHeight);
                context.fillStyle = "#440000";
                context.fillRect(Math.floor(plotPointWidth * (i + 1)), buydh * .62 - mineralValueHeight, plotPointWidth, mineralValueHeight);
            }

            context.fillStyle = "#004400";
            context.fillRect(buydw * .11, buydh * .65, buydw * .01, buydh * .05);
            context.fillStyle = "#440000";
            context.fillRect(buydw * .11, buydh * .72, buydw * .01, buydh * .05);
            context.fillStyle = "#FFFFFF";
            context.font = "12px Verdana"
            context.fillText(_("Money Value") + " (" + beautifynum(money) + ")", buydw * .135, buydh * .68);
            context.fillText(_("Mineral Value") + " (" + beautifynum(getValueOfMinerals()) + ")", buydw * .135, buydh * .75);
            context.fillRect(buydw * .005, buydh * .18, buydw * .005, buydh * .44);
            context.fillRect(buydw * .005, buydh * .62, buydw * .50, buydh * .005);
            context.font = "12px Verdana"
            context.fillText(_("Before"), buydw * .01, buydh * .658);
            context.fillText(_("Now"), buydw * .51, buydh * .658);
            context.font = "14px Verdana";
        }
        else
        {
            context.font = "14px Verdana"
            context.fillText(_("Game must run for 60sec to get data for graph"), buydw * .01, buydh * .48);
        }

        var i = -1;
        var lineHeight = 0.07;
        var y0 = 0.87;
        context.fillText(_("Current Game Version") + ": " + "v"+((version-100)/100)+"."+buildLetter+"."+splitTestValue1, buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Minerals Mined") + ": " + beautifynum(totalMineralsMined), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Basic Chests Opened") + ": " + beautifynum(chestService.totalBasicChestsOpened), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Gold Chests Opened") + ": " + beautifynum(chestService.totalGoldChestsOpened), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Ethereal Chests Opened") + ": " + beautifynum(chestService.totalBlackChestsOpened), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Highest Level Scientist Ever") + ": " + beautifynum(highestLevelScientist), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Scientists Buried") + ": " + beautifynum(deadScientists), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Monsters Killed") + ": " + beautifynum(monsterskilled), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Minerals Sacrificed") + ": " + beautifynum(mineralsSacrificed), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Trades Done") + ": " + beautifynum(totalCompletedTrades), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Time Lapsed") + ": " + shortenedFormattedTime(totalTimeLapsedMinutes * 60), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Time Lapsed This Session") + ": " + shortenedFormattedTime(timelapseMinutesInSession * 60), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Money Earned This Session") + ": " + beautifynum(totalMoneyEarnedSession), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Value of Minerals Mined This Session") + ": " + beautifynum(mineralsMinedValue), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Value of Minerals Sold This Session") + ": " + beautifynum(mineralsSoldValue), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Total Money Collected from Chests This Session") + ": " + beautifynum(chestService.totalMoneyFromChests), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.fillText(_("Session Duration") + ": " + shortenedFormattedTime(performance.now() / 1000), buydw * .01, buydh * (y0 + (++i) * lineHeight));
        context.restore();
    }

    addCheatButtons()
    {
        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Add Money", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,    
                y: this.settingsPane.boundingBox.height * .05,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    addMoney(new BigNumber(999999999));
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Add resources"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,     
                y: this.settingsPane.boundingBox.height * .16,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    for (var i in worldResources)
                    {
                        worldResources[i].numOwned += 1000000;
                    }
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Add 50 depth"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .27,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    addDepth(50);
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Defeat Next Boss"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .49,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    if (bossesDefeated >= BattleManager.bosses.length - 1) return;
                    newNews("Defeated boss at " + BattleManager.bosses[bossesDefeated].minDepth)
                    ++bossesDefeated;
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Revive Last Boss"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .60,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    if (bossesDefeated <= 0) return;
                    --bossesDefeated;
                    newNews("Revived boss at " + BattleManager.bosses[bossesDefeated].minDepth)
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Spawn Caves"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .71,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    spawnTestCaves();
                }
            }
        ));
        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Grant Random Super Miner", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .82,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    superMinerManager.debugAddRandomSuperMiner({isOwned: false, rarity: superMinerRarities.common});
                    superMinerManager.debugAddRandomSuperMiner({isOwned: false, rarity: superMinerRarities.uncommon});
                    superMinerManager.debugAddRandomSuperMiner({isOwned: false, rarity: superMinerRarities.rare});
                    superMinerManager.debugAddRandomSuperMiner({isOwned: false, rarity: superMinerRarities.legendary});
                }
            }
        ));
        this.cheatsPane.addHitbox(new Button(
            upgradeb, _("Unlimited Capacity"), "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .5,
                y: this.settingsPane.boundingBox.height * .38,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    drillState.cargo().capacity = 99999999999999999999;
                    isCapacityFull = () => false;
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Timelapse (30 min)", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .05,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    timelapse(30);
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Timelapse (5 hours)", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .16,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    timelapse(300);
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Unlock All Blueprints", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .27,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    learnAllBlueprints();
                    newNews("Granted all blueprints");
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Forget Unlocked Blueprints", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .38,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    var initCount = knownBlueprints.length;
                    knownBlueprints = [];
                    initAvailableBlueprints();
                    learnReachedBlueprints();
                    newNews("Forgot " + (initCount - knownBlueprints.length) + " blueprints");
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Reset Offers", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .49,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    offerManager.init();
                    offerManager.update();
                }
            }
        ));

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "Log Device Info", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .60,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            },
            {
                onmousedown: function ()
                {
                    console.log(offerManager.getDeviceInfo());
                    alert(JSON.stringify(offerManager.getDeviceInfo()));
                }
            }
        ));

        // this.cheatsPane.addHitbox(new Button(
        //     upgradeb, "Pause", "12px Verdana", "#000000",
        //     {
        //         x: this.settingsPane.boundingBox.width * .12,
        //         y: this.settingsPane.boundingBox.height * .60,
        //         width: this.settingsPane.boundingBox.width * .37,
        //         height: this.settingsPane.boundingBox.height * .1
        //     },
        //     {
        //         onmousedown: function ()
        //         {
        //             var pauseEvent = new CustomEvent("pause");
        //             document.dispatchEvent(pauseEvent);
        //         }
        //     }
        // ));

        // this.cheatsPane.addHitbox(new Button(
        //     upgradeb, "Resume", "12px Verdana", "#000000",
        //     {
        //         x: this.settingsPane.boundingBox.width * .12,
        //         y: this.settingsPane.boundingBox.height * .71,
        //         width: this.settingsPane.boundingBox.width * .37,
        //         height: this.settingsPane.boundingBox.height * .1
        //     },
        //     {
        //         onmousedown: function ()
        //         {
        //             var resumeEvent = new CustomEvent("resume");
        //             document.dispatchEvent(resumeEvent);
        //         }
        //     }
        // ));

        var debugCheckbox = this.cheatsPane.addHitbox(new Checkbox(
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .9,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .1
            }
        ));
        debugCheckbox.getValue = function()
        {
            return typeof(activeLayers.HitboxDebug) != "undefined";
        }
        debugCheckbox.setValue = function(newValue)
        {
            if(newValue) { showHitboxDebug(1) } else { hideHitboxDebug() };
        }
        debugCheckbox.labelText = _("Hitbox Debug");

        this.cheatsPane.addHitbox(new Button(
            upgradeb, "New Game", "12px Verdana", "#000000",
            {
                x: this.settingsPane.boundingBox.width * .12,
                y: this.settingsPane.boundingBox.height * .8,
                width: this.settingsPane.boundingBox.width * .37,
                height: this.settingsPane.boundingBox.height * .06
            },
            {
                onmousedown: function ()
                {
                    localStorage.clear();
                    window.location.reload();
                }
            }
        ));
    }
}