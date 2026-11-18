class MainUILayer extends UiLayer
{
    layerName = "MainUILayer";
    zIndex = 3;
    isRendered = true;
    isPopup = false;
    allowBubbling = false;
    context = MAIN;
    isOnScroller = false;
    isHoveringOverScroller = false;
    defaultScrollbarHeight;

    shortcutButtons = {
        settings: 0,
        discord: 1,
        tradePostShortcut: 2,
        cityShortcut: 3,
        coreShortcut: 4,
        lunarTradePostShortcut: 5,
        reactorShortcut: 6,
    };

    //##### PC UNUSED #####
    activeDialogue = {
        "dialogueText": "",
        "dialogueImage": null,
        "dialoguePartyName": "",
        "popupId": "",
        "x": 0,
        "y": 0,
        "isActive": false
    };

    header;
    scrollbar;
    menuBar;

    isMouseInLayer() { return true; }

    constructor(boundingBox)
    {
        super(boundingBox);
        if(this.context)
        {
            this.context.canvas.style.x = boundingBox.x;
            this.context.canvas.style.y = boundingBox.y;
            this.context.canvas.style.width = boundingBox.width;
            this.context.canvas.style.height = boundingBox.height;
        }

        if (isMobile() && platform.getCordovaPlatformId() == "ios")
        {
            setDpi(this.context.canvas, 1);
        }

        //############# INTERACTIVE ELEMENTS ###########


        //############# CONTAINERS ###########

        var sidebarWidthPercent = worldConfig.sideBoundFraction;
        var menubarHeight = this.boundingBox.height - worldConfig.bottomBound;
        var topBarCollapsedHeight = worldConfig.topBound;
        this.defaultScrollbarHeight = 
        
        this.rightSidebar = new Hitbox(
            {
                x: (this.boundingBox.width / uiScaleX) * (1-sidebarWidthPercent),
                y: topBarCollapsedHeight,
                width: (this.boundingBox.width / uiScaleX) * sidebarWidthPercent,
                height: (this.boundingBox.height / uiScaleY) - topBarCollapsedHeight - menubarHeight
            },
            {},
            "",
            "rightSidebar"
        );
        this.rightSidebar.render = function()
        {
            this.parent.context.save();
            this.parent.context.globalAlpha = 0.25;
            this.parent.context.strokeStyle = "#000000";
            this.parent.context.lineWidth = 3;
            this.parent.context.beginPath();
            this.parent.context.moveTo(this.boundingBox.x, this.boundingBox.y);
            this.parent.context.lineTo(this.boundingBox.x, this.boundingBox.y + this.boundingBox.height);
            this.parent.context.stroke();
            this.parent.context.restore();
            this.parent.context.drawImage(rightSidebarBackground, this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
            this.renderChildren();
        }.bind(this.rightSidebar);
        this.addHitbox(this.rightSidebar);

        
        this.leftSidebar = new Hitbox(
            {
                x: 0,
                y: topBarCollapsedHeight,
                width: (this.boundingBox.width / uiScaleX) * sidebarWidthPercent,
                height: (this.boundingBox.height / uiScaleY) - topBarCollapsedHeight - menubarHeight
            },
            {},
            "",
            "leftSidebar"
        );
        this.leftSidebar.render = function()
        {
            this.parent.context.save();
            this.parent.context.globalAlpha = 0.25;
            this.parent.context.strokeStyle = "#000000";
            this.parent.context.lineWidth = 3;
            this.parent.context.beginPath();
            this.parent.context.moveTo(this.boundingBox.x + this.boundingBox.width, this.boundingBox.y);
            this.parent.context.lineTo(this.boundingBox.x + this.boundingBox.width, this.boundingBox.y + this.boundingBox.height);
            this.parent.context.stroke();
            this.parent.context.restore();
            this.parent.context.drawImage(leftSidebarBackground, this.boundingBox.x, this.boundingBox.y, this.boundingBox.width, this.boundingBox.height);
            this.renderChildren();
        }.bind(this.leftSidebar);
        this.addHitbox(this.leftSidebar);

        this.header = new MobileHeader(
            {
                x: 0,
                y: 0,
                width: this.boundingBox.width,
                height: topBarCollapsedHeight
            }
        );

        this.buffContainer = new Hitbox(
            {
                x: Math.ceil(this.boundingBox.width - 2 * this.rightSidebar.boundingBox.width),
                y: this.header.boundingBox.height,
                width: 0,
                height: (this.boundingBox.height) * 0.5
            },
            {},
            ""
        );
        this.buffContainer.allowBubbling = true;
        this.buffContainer.defaultX = this.buffContainer.boundingBox.x;
        this.addHitbox(this.buffContainer);
        this.addHitbox(this.header);

        this.header.isExpanded = false;
        this.header.collapsedHeight = this.header.boundingBox.height;
        // Header expanded height is set below, after all hitboxes are added

        //###################### HEADER #######################

        this.header.expandableInfo = new Hitbox(
            {
                x: this.header.collapsedHeight * 0.5,
                y: this.header.collapsedHeight * 1.5,
                width: this.boundingBox.width - this.header.collapsedHeight,
                height: -1 // Set to expanded height below
            },
            {
                onmouseenter: function()
                {
                },
                onmouseexit: function()
                {
                    if(currentTargetHitbox.hitbox != this.parent && !this.parent.isAncestorOf(currentTargetHitbox.hitbox))
                    {
                        this.parent.isExpanded = false;
                        this.parent.boundingBox.height = this.parent.collapsedHeight;
                        this.parent.expandableInfo.isVisible = () => false;
                        this.parent.expandableInfo.isEnabled = () => false;   
                        this.parent.parent.initializeScrollbar();
                    }
                }
            },
            "pointer",
            "headerExpandableInfo"
        );
        
        this.header.expandableInfo.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent.parent);
            var caratHeight = this.parent.collapsedHeight * 0.5;
            var caratWidth = caratHeight * 1.5;
            var caratX = coords.x + (this.boundingBox.width - caratWidth) / 2;
            var caratY = coords.y - caratHeight + 2;
            var context = this.parent.parent.context;
            context.save();
            context.fillStyle = "#444444";
            context.strokeStyle = "#000000";
            context.lineWidth = 4;
            context.lineCap = "round"
            context.beginPath();
            context.moveTo(coords.x, coords.y);
            context.lineTo(caratX, coords.y);
            context.lineTo(caratX + caratWidth / 2, caratY);
            context.lineTo(caratX + caratWidth / 2 - 2, caratY);
            context.lineTo(caratX + caratWidth / 2 + 2, caratY);
            context.lineTo(caratX + caratWidth, coords.y);
            context.lineTo(coords.x + this.boundingBox.width, coords.y);
            context.lineTo(coords.x + this.boundingBox.width, coords.y + this.parent.expandedHeight - this.parent.collapsedHeight * 1.5);
            context.lineTo(coords.x, coords.y + this.parent.expandedHeight - this.parent.collapsedHeight * 1.5);
            context.lineTo(coords.x, coords.y);
            context.stroke();
            context.fill();
            context.restore();
            this.renderChildren();
        }

        this.header.addHitbox(this.header.expandableInfo);
        this.header.expandableInfo.isEnabled = () => false;
        this.header.expandableInfo.isVisible = () => false;

        //############# LEFT SIDE BUTTON HITBOXES #############

        var leftButtonWidth = this.boundingBox.width * 0.12;
        
        //Offer Button
        this.offerButton = this.addHitbox(new Hitbox(
            {
                x: (this.boundingBox.width / uiScaleX) * .085,
                y: (this.boundingBox.height / uiScaleY) * .125,
                width: leftButtonWidth,
                height: leftButtonWidth
            },
            {
                onmousedown: function ()
                {
                    openUi(OfferWindow);
                }
            },
            '',
            "emailCollectionButton"
        ));

        this.offerButton.sprite = new SpritesheetAnimation(
            bundleButton1,
            9,
            20
        );
        this.offerButton.sprite.unpauseAfterFrames = 20;

        this.offerButton.render = function()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            this.sprite.drawAnimation(
                MAIN,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            )
            this.sprite.playUntilFinished();
            this.renderChildren();
        }

        this.offerButton.isVisible = () => offerManager.getCurrentOffer();
        this.offerButton.isEnabled = () => offerManager.getCurrentOffer();

        //Offer Timer
        this.offerTimer = this.addHitbox(new Hitbox(
            {
                x: (this.boundingBox.width / uiScaleX) * .085,
                y: this.offerButton.boundingBox.y + this.offerButton.boundingBox.height,
                width: leftButtonWidth,
                height: this.offerButton.boundingBox.height * 0.35
            },
            {},
            '',
            "emailCollectionButton"
        ));

        this.offerTimer.render = function()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var img = bundleTimerBackground;
            MAIN.drawImage(
                img,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            );
            MAIN.save();
            MAIN.font = this.boundingBox.height * 0.5 + "px KanitB";
            MAIN.fillStyle = "#FFFFFF";
            MAIN.textBaseline = "middle";
            fillTextShrinkToFit(
                MAIN,
                shortenedFormattedTime(offerManager.getTimeRemainingForOffer()),
                coords.x,
                coords.y + this.boundingBox.height / 2,
                this.boundingBox.width,
                "center"
            );
            MAIN.restore();
            this.renderChildren();
        }

        this.offerTimer.isVisible = () => offerManager.getCurrentOffer();
        this.offerTimer.isEnabled = () => offerManager.getCurrentOffer();

        //Offer Chests Button
        this.storedRewardsButton = this.addHitbox(new Hitbox(
            {
                x: (this.boundingBox.width / uiScaleX) * .085,
                y: (this.boundingBox.height / uiScaleY) * .12 + leftButtonWidth * 1.2,
                width: leftButtonWidth,
                height: leftButtonWidth
            },
            {
                onmousedown: function ()
                {
                    openUi(OfferChestWindow);
                }
            },
            '',
            "emailCollectionButton"
        ));

        this.storedRewardsButton.render = function()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var img = goldchesticon;
            drawImageFitInBox(
                MAIN,
                img,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            );
            this.renderChildren();
        }

        this.storedRewardsButton.isVisible = () => offerManager.hasUnclaimedChests();
        this.storedRewardsButton.isEnabled = () => offerManager.hasUnclaimedChests();

        //############# RIGHT SIDE SHORTCUT HITBOXES #############

        var shortcutButtonWidthFraction = 0.95;
        var shortcutButtonWidth = this.rightSidebar.boundingBox.width * shortcutButtonWidthFraction;
        var shortcutButtonPadding = this.rightSidebar.boundingBox.width * shortcutButtonWidthFraction / 10;

        //Settings
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["settings"] + 1) + shortcutButtonWidth * (this.shortcutButtons["settings"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    openUi(SettingsWindow);
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            '',
            "settingsButton"
        )).render = this.getShortcutRenderFunction(settingsb, () => true);

        //Crafting Window
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["craftShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["craftShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    openUi(CraftingWindow);
                    isCraftNotificationOn = false;
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            '',
            "craftShortcut"
        )).render = this.getShortcutRenderFunction(hammerAnvil, () => true)

        //Trading Post
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["tradePostShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["tradePostShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    if(depth >= tradeConfig.tradingPosts[0].depth)
                    {
                        currentlyViewedDepth = Math.min(depth, tradeConfig.tradingPosts[0].depth + 2);
                        movedivs();
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            '',
            "tradePostShortcut"
        )).render = function() {
                var coords = this.getGlobalCoordinates(0, 0);
                var context = this.getContext();
                if (depth >= tradeConfig.tradingPosts[0].depth)
                {
                    if(isTradeAvailable(earthTradeOffer1))
                    {
                        context.drawImage(tradingpostb, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
                    }
                    else
                    {
                        let timeRemainingUntilTrade = getNextTradeTimeForWorld(0) - playtime;
                        let icon;
                        if(tradingPostStructures[0].level > 0)
                        {
                            let maxTimeUntilNextTrade = getTimeBetweenTrades(0);
                            icon = generateIconWithCooldownOverlay(
                                tradingpostb,
                                this.boundingBox.width,
                                this.boundingBox.height,
                                timeRemainingUntilTrade / maxTimeUntilNextTrade
                            );
                        }
                        else
                        {
                            icon = generateIconWithCooldownOverlay(
                                tradingpostb,
                                this.boundingBox.width,
                                this.boundingBox.height,
                                1
                            );
                        }
                        context.drawImage(icon, coords.x, coords.y);
                    }
                }
                if (!this.isEnabled)
                {
                    this.isEnabled = conditionFunction;
                }
            }
        //Lunar Trading Post 
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["lunarTradePostShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["lunarTradePostShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    if(depth >= tradeConfig.tradingPosts[1].depth)
                    {
                        currentlyViewedDepth = Math.min(depth, tradeConfig.tradingPosts[1].depth + 2);
                        movedivs();
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            '',
            "lunarTradePostShortcut"
        )).render = function() {
            var coords = this.getGlobalCoordinates(0, 0);
            var context = this.getContext();
            if (depth >= tradeConfig.tradingPosts[1].depth)
            {
                if(isTradeAvailable(moonTradeOffer1))
                {
                    context.drawImage(lunartradingpostb, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
                }
                else
                {
                    let timeRemainingUntilTrade = getNextTradeTimeForWorld(1) - playtime;
                    let icon;
                    if(tradingPostStructures[1].level > 0)
                    {
                        let maxTimeUntilNextTrade = getTimeBetweenTrades(1);
                        icon = generateIconWithCooldownOverlay(
                            lunartradingpostb,
                            this.boundingBox.width,
                            this.boundingBox.height,
                            timeRemainingUntilTrade / maxTimeUntilNextTrade
                        );
                    }
                    else
                    {
                        icon = generateIconWithCooldownOverlay(
                            lunartradingpostb,
                            this.boundingBox.width,
                            this.boundingBox.height,
                            1
                        );
                    }
                    context.drawImage(icon, coords.x, coords.y);
                }
            }
            if (!this.isEnabled)
            {
                this.isEnabled = conditionFunction;
            }
        }

        //Core
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["coreShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["coreShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    if(depth >= 501)
                    {
                        currentlyViewedDepth = Math.min(depth, 503);
                        movedivs();
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            '',
            "coreShortcut"
        )).render = this.getShortcutRenderFunction(coreb, () => depth >= 501);

        // //City
        // this.rightSidebar.addHitbox(new Hitbox(
        //     {
        //         x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
        //         y: shortcutButtonPadding * (this.shortcutButtons["superMinerShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["superMinerShortcut"]),
        //         width: shortcutButtonWidth,
        //         height: shortcutButtonWidth
        //     },
        //     {
        //         onmousedown: function ()
        //         {
        //             openUi(SuperMinersWindow)
        //             if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
        //         }
        //     },
        //     '',
        //     "superMinerShortcut"
        // )).render = this.getShortcutRenderFunction(superminerb, () => superMinerManager.numSuperMiners() > 0 || chestService.totalBlackChestsOpened > 0);

        //City
        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["cityShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["cityShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    if(depth >= 303)
                    {
                        currentlyViewedDepth = Math.min(depth, 303);
                        movedivs();
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            '',
            "cityShortcut"
        )).render = this.getShortcutRenderFunction(undergroundb, () => depth >= 303);

        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["reactorShortcut"] + 1) + shortcutButtonWidth * (this.shortcutButtons["reactorShortcut"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function ()
                {
                    if(depth >= 1134)
                    {
                        panToViewDepth(1134);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            '',
            "reactorShortcut"
        )).render = this.getShortcutRenderFunction(reactorb, () => depth >= 1134);

        this.rightSidebar.addHitbox(new Hitbox(
            {
                x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                y: shortcutButtonPadding * (this.shortcutButtons["discord"] + 1) + shortcutButtonWidth * (this.shortcutButtons["discord"]),
                width: shortcutButtonWidth,
                height: shortcutButtonWidth
            },
            {
                onmousedown: function()
                {
                    openDiscord();
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }
            },
            '',
            "discord"
        )).render = this.getShortcutRenderFunction(discordb, () => true);

        if (CHEATS_ENABLED)
        {
            this.rightSidebar.addHitbox(new Hitbox(
                {
                    x: (this.rightSidebar.boundingBox.width - shortcutButtonWidth) / 2,
                    y: this.rightSidebar.boundingBox.height - shortcutButtonWidth,
                    width: shortcutButtonWidth,
                    height: shortcutButtonWidth
                },
                {
                    onmousedown: function ()
                    {
                        var targetDepth = Math.floor(currentlyViewedDepth - Math.ceil(worldConfig.numberOfDepthsVisible / 2));
                        chestService.spawnChest(
                            targetDepth,
                            Chest.natural,
                            false
                        )
                    }
                },
                '',
            ));
        }

        //Holiday Button
        if (limitedTimeEventManager.displayCountdown())
        {
            var holidayButtonHeight = this.boundingBox.height * 0.075;
            var holidayButtonWidth = getScaledImageDimensions(eventb, -1, holidayButtonHeight).width;
            var holidayButtonHitbox = this.addHitbox(new Hitbox(
                {
                    x: (this.boundingBox.width) * 0.10,
                    y: (this.boundingBox.height) * 0.09,
                    width: holidayButtonWidth,
                    height: holidayButtonHeight
                },
                {
                    onmousedown: function ()
                    {
                        if(limitedTimeEventManager.isEventActive)
                        {
                            if(limitedTimeEventManager.openHolidayUI)
                            {
                                limitedTimeEventManager.openHolidayUI();
                            }
                            if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                    },
                    onmouseenter: function ()
                    {
                        if(limitedTimeEventManager.isEventActive)
                        {
                            var tooltip = limitedTimeEventManager.eventTooltip();
                            showTooltip(tooltip.header, tooltip.body, "12.5%", "18.75%");
                        }
                        document.body.style.cursor = 'pointer';
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                        document.body.style.cursor = '';
                    }
                },
                '',
                "holidayEventButton"
            ))
            holidayButtonHitbox.render = function() {
                if(limitedTimeEventManager.isEventActive)
                {
                    var coords = this.getRelativeCoordinates(0, 0, this.parent);
                    MAIN.drawImage(eventb, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
                    MAIN.save();
                    MAIN.font = "12px Verdana";
                    MAIN.fillStyle = "#FFF";
                    MAIN.textBaseline = "top";
                    var textX = this.boundingBox.width * 0.12;
                    var textY = this.boundingBox.height * 0.275;
                    fillTextWrapWithHeightLimit(
                        MAIN,
                        limitedTimeEventManager.activeEvent.name + " <br> " + shortenedFormattedTime(limitedTimeEventManager.secondsRemainingInEvent()),
                        coords.x + textX,
                        coords.y + textY,
                        this.boundingBox.width * 0.86,
                        this.boundingBox.height * 0.59,
                        "center",
                        0.5,
                        "center",
                        false
                    );
                    MAIN.restore();
                }
            }.bind(holidayButtonHitbox);

            var minDepthForButton = Math.floor(worldConfig.numberOfDepthsVisible - worldConfig.specialLevels.topCity.height);
            holidayButtonHitbox.isEnabled = () => currentlyViewedDepth == minDepthForButton;
            holidayButtonHitbox.isVisible = () => currentlyViewedDepth == minDepthForButton;
        }

        this.displayAllBuffs();

        //#################### SCROLL BAR #####################
        this.initializeScrollbar();
    }

    setBoundingBox()
    {
        this.boundingBox = this.context.canvas.getBoundingClientRect();
        this.boundingBox.x /= uiScaleX;
        this.boundingBox.y /= uiScaleY;
        this.boundingBox.width /= uiScaleX;
        this.boundingBox.height /= uiScaleY;
    }

    render()
    {
        // this.renderHeader();
        // this.renderRightSideBar();
        // renderHintArrows();
        this.renderChildren();
        if (revisionNumber && revisionNumber != "")
        {
            this.context.save();
            this.context.globalAlpha = 0.3;
            this.context.textBaseline = "top";
            this.context.font = "7px Consolas";
            this.context.fillStyle = "#FFFFFF";
            MAIN.fillText("V" + ((version-100)/100) + buildLetter + "." + revisionNumber, 13, 3);
            this.context.restore();
        }
    }

    renderMineralDropDown()
    {
        this.header.expandableInfo.clearHitboxes();
        //Header Mineral Icons and tooltips
        var mineralEntryWidth = (this.boundingBox.width / uiScaleX) * .22;
        var mineralEntryHeight = (this.boundingBox.height / uiScaleY) * .05;
        var padding = 3;
        var mineralCount = worldBeingViewed().mineralIdsToSell.length;
        var isotopeCount = worldBeingViewed().isotopeIdsToSell.filter(isotope => worldResources[isotope].isotopeIndex == 0).length;
        var slotsPerRow = Math.floor((this.boundingBox.width - padding * 2) / mineralEntryWidth);
        var totalRows = Math.ceil(mineralCount / slotsPerRow);
        var slotSpacing = ((this.boundingBox.width - padding * 2) - (mineralEntryWidth * slotsPerRow)) / Math.max(1, slotsPerRow - 1);
        for(var i = 0; i < mineralCount; i++)
        {
            var xCoordinate = padding + (i % slotsPerRow) * (mineralEntryWidth + padding);
            var yCoordinate = padding + (Math.floor(i / slotsPerRow)) * (mineralEntryHeight + padding);

            var mineralHitbox = new Hitbox(
                {
                    x: xCoordinate,
                    y: yCoordinate,
                    width: mineralEntryWidth,
                    height: mineralEntryHeight
                },
                {
                    onmouseenter: function ()
                    {
                        var mineralIndex = parseInt(this.id.split("_")[1]);
                        var mineralOrder = worldBeingViewed().mineralIdsToSell;
                        if(mineralOrder.length <= mineralIndex) return;
                        var mineralIndexToRender = mineralOrder[mineralIndex];
                        if(!worldResources[mineralIndexToRender].isIsotope && worldResources[mineralIndexToRender].isOnHeader)
                        {
                            if(highestOreUnlocked >= mineralIndexToRender)
                            {
                                var valueOfMineralHoldings = worldResources[mineralIndexToRender].totalValue();
                                var mineralDescription = _("Value: $") + beautifynum(worldResources[mineralIndexToRender].sellValue) + "<br>" + _("Value Of Holdings: ${0}", beautifynum(valueOfMineralHoldings));

                                showTooltip(
                                    worldResources[mineralIndexToRender].name,
                                    mineralDescription,
                                    this.boundingBox.x + 20,
                                    this.boundingBox.y + 5
                                );
                            }
                            else
                            {
                                showTooltip(
                                    "???",
                                    "",
                                    this.boundingBox.x + 20,
                                    this.boundingBox.y + 5
                                );
                            }
                        }
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                        if(currentTargetHitbox.hitbox != this.parent.parent && !this.parent.parent.isAncestorOf(currentTargetHitbox.hitbox))
                        {
                            this.parent.parent.isExpanded = false;
                            this.parent.parent.boundingBox.height = this.parent.parent.collapsedHeight;
                            this.parent.parent.expandableInfo.isVisible = () => false;
                            this.parent.parent.expandableInfo.isEnabled = () => false;   
                            this.parent.parent.parent.initializeScrollbar();
                        }
                    }
                },
                '',
                "Mineral_" + i
            );
            mineralHitbox.render = function (root, mineralIndex)
            {
                root.context.save();
                var coords = this.getRelativeCoordinates(0, 0, root);
                var mineralOrder = worldBeingViewed().mineralIdsToSell;
                if(mineralIndex >= mineralOrder.length) return;
                var mineralIndexToRender = mineralOrder[mineralIndex];
                var iconBox;
                if (highestOreUnlocked >= mineralIndexToRender)
                {
                    iconBox = drawImageFitInBox(
                        root.context,
                        worldResources[mineralIndexToRender].largeIcon,
                        coords.x,
                        coords.y,
                        this.boundingBox.height,
                        this.boundingBox.height
                    );
                }
                else
                {
                    iconBox = drawImageFitInBox(
                        root.context,
                        worldResources[mineralIndexToRender].largeIconHidden,
                        coords.x,
                        coords.y,
                        this.boundingBox.height,
                        this.boundingBox.height
                    );
                }
                root.context.textBaseline = "middle";
                root.context.fillStyle = "#FFFFFF";
                root.context.strokeStyle = "#000000";
                root.context.lineWidth = 2;
                root.context.font = "1em Open Sans";
                strokeTextShrinkToFit(
                    root.context,
                    shortenAndBeautifyNum(worldResources[mineralIndexToRender].numOwned),
                    coords.x + iconBox.width + padding,
                    iconBox.y + iconBox.height / 2,
                    this.boundingBox.width - iconBox.width - padding
                );
                fillTextShrinkToFit(
                    root.context,
                    shortenAndBeautifyNum(worldResources[mineralIndexToRender].numOwned),
                    coords.x + iconBox.width + padding,
                    iconBox.y + iconBox.height / 2,
                    this.boundingBox.width - iconBox.width - padding
                );
                root.context.restore();
            }.bind(mineralHitbox, this, i);
            mineralHitbox.allowBubbling = true;
            this.header.expandableInfo.addHitbox(mineralHitbox);
        }
        //Header Isotope Icon Tooltips
        
        var numIsotopesRendered = 0;
        for(var i = 0; i < isotopeCount; i++)
        {
            var xCoordinate = padding + (i % 3) * (this.boundingBox.width / uiScaleX) * .3 ;
            var yCoordinate = padding + mineralHitbox.boundingBox.y + mineralHitbox.boundingBox.height + (Math.floor(i / 3)) * (mineralEntryHeight + padding);

            var isotopeHitbox = new Hitbox(
                {
                    x: xCoordinate,
                    y: yCoordinate,
                    width: mineralEntryWidth,
                    height: mineralEntryHeight
                },
                {
                    onmouseenter: function ()
                    {
                        var mineralIndex = parseInt(this.id.split("_")[1]);
                        var mineralOrder = worldBeingViewed().isotopeIdsToSell;
                        if(mineralOrder.length <= mineralIndex) return;
                        var mineralIndexToRender = mineralOrder[mineralIndex];

                        if(worldResources[mineralIndexToRender].isIsotope)
                        {
                            if(highestIsotopeUnlocked >= mineralIndexToRender)
                            {
                                var description = "";
                                for(var j = 0; j < 3; j++)
                                {
                                    description += "<center><u><b>" + worldResources[mineralIndexToRender + j].name + "</b></u></center><br>";
                                    var valueOfMineralHoldings = worldResources[mineralIndexToRender + j].totalValue();
                                    description += _("Value: $") + beautifynum(worldResources[mineralIndexToRender + j].sellValue) + "<br>" + _("Value Of Holdings: ${0}", beautifynum(valueOfMineralHoldings)) + "<br><br>";
                                }
                                showTooltip(
                                    "",
                                    description,
                                    this.boundingBox.x + 26,
                                    this.boundingBox.y + 5
                                );
                            }
                            else
                            {
                                showTooltip(
                                    "???",
                                    "",
                                    this.boundingBox.x + 20,
                                    this.boundingBox.y + 5
                                );
                            }
                        }
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                        if(currentTargetHitbox.hitbox != this.parent.parent && !this.parent.parent.isAncestorOf(currentTargetHitbox.hitbox))
                        {
                            this.parent.parent.isExpanded = false;
                            this.parent.parent.boundingBox.height = this.parent.parent.collapsedHeight;
                            this.parent.parent.expandableInfo.isVisible = () => false;
                            this.parent.parent.expandableInfo.isEnabled = () => false;   
                            this.parent.parent.parent.initializeScrollbar();
                        }
                    }
                },
                '',
                "Isotope_" + i
            );
            isotopeHitbox.render = function (root, isotopeIndex)
            {
                root.context.save();
                var coords = this.getRelativeCoordinates(0, 0, root);
                var isotopeOrder = worldBeingViewed().isotopeIdsToSell;
                var mineralIndexToRender = isotopeOrder[isotopeIndex];

                if (typeof(worldResources[mineralIndexToRender]) === "undefined")
                {
                    return;
                }
                if(worldResources[mineralIndexToRender].isIsotope && worldResources[mineralIndexToRender].isOnHeader)
                {
                    var iconBox;
                    if(highestIsotopeUnlocked >= mineralIndexToRender)
                    {
                        iconBox = drawImageFitInBox(
                            root.context,
                            worldResources[mineralIndexToRender].largeIcon,
                            coords.x,
                            coords.y,
                            this.boundingBox.height,
                            this.boundingBox.height
                        );                    
                    }
                    else
                    {
                        iconBox = drawImageFitInBox(
                            root.context,
                            worldResources[mineralIndexToRender].largeIconHidden,
                            coords.x,
                            coords.y,
                            this.boundingBox.height,
                            this.boundingBox.height
                        ); 
                    }
                    root.context.textBaseline = "middle";
                    root.context.fillStyle = "#FFFFFF";
                    root.context.font = "0.8em Open Sans";
                    root.context.strokeStyle = "#000000";
                    root.context.lineWidth = 2;
                    strokeTextShrinkToFit( root.context, "1: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .17, this.boundingBox.width * .95);
                    fillTextShrinkToFit( root.context, "1: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .17, this.boundingBox.width * .95);
                    strokeTextShrinkToFit( root.context, "2: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender + 1].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .5, this.boundingBox.width * .95);
                    fillTextShrinkToFit( root.context, "2: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender + 1].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .5, this.boundingBox.width * .95);
                    strokeTextShrinkToFit( root.context, "3: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender + 2].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .83, this.boundingBox.width * .95);
                    fillTextShrinkToFit( root.context, "3: " + shortenAndBeautifyNum(worldResources[mineralIndexToRender + 2].numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height * .83, this.boundingBox.width * .95);
                    numIsotopesRendered++;
                }
                root.context.restore();
            }.bind(isotopeHitbox, this, i * 3);
            isotopeHitbox.allowBubbling = true;
            this.header.expandableInfo.addHitbox(isotopeHitbox);
        }

        var specialRenders = 0;

        //building materials
        var buildingMaterialHitbox = new Hitbox(
            {
                x: padding + (specialRenders % 3) * (this.boundingBox.width / uiScaleX) * .3,
                y: padding + isotopeHitbox.boundingBox.y + isotopeHitbox.boundingBox.height + (Math.floor(specialRenders / 3)) * (mineralEntryHeight + padding),
                width: mineralEntryWidth,
                height: mineralEntryHeight
            },
            {},
            '',
            "buildingMaterials"
        );
        buildingMaterialHitbox.render = function (root)
        {
            root.context.save();
            var coords = this.getRelativeCoordinates(0, 0, root);
            let worldResource = worldResources[BUILDING_MATERIALS_INDEX];

            var iconBox = drawImageFitInBox(root.context, worldResource.largeIcon, coords.x, coords.y, this.boundingBox.height,this.boundingBox.height);                    

            root.context.textBaseline = "middle";
            root.context.fillStyle = "#FFFFFF";
            root.context.font = "1em Open Sans";
            root.context.strokeStyle = "#000000";
            root.context.lineWidth = 2;
            strokeTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);
            fillTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);

            root.context.restore();
        }.bind(buildingMaterialHitbox, this);
        buildingMaterialHitbox.allowBubbling = true;
        this.header.expandableInfo.addHitbox(buildingMaterialHitbox);
        specialRenders++;

        if(depth > 300)
        {
            var oilHitbox = new Hitbox(
                {
                    x: padding + (specialRenders % 3) * (this.boundingBox.width / uiScaleX) * .3,
                    y: padding + isotopeHitbox.boundingBox.y + isotopeHitbox.boundingBox.height + (Math.floor(specialRenders / 3)) * (mineralEntryHeight + padding),
                    width: mineralEntryWidth,
                    height: mineralEntryHeight
                },
                {},
                '',
                "oil"
            );
            oilHitbox.render = function (root)
            {
                root.context.save();
                var coords = this.getRelativeCoordinates(0, 0, root);
                let worldResource = worldResources[OIL_INDEX];

                var iconBox = drawImageFitInBox(root.context, worldResource.largeIcon, coords.x, coords.y, this.boundingBox.height,this.boundingBox.height);                    

                root.context.textBaseline = "middle";
                root.context.fillStyle = "#FFFFFF";
                root.context.font = "1em Open Sans";
                root.context.strokeStyle = "#000000";
                root.context.lineWidth = 2;
                strokeTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);
                fillTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);

                root.context.restore();
            }.bind(oilHitbox, this);
            oilHitbox.allowBubbling = true;
            this.header.expandableInfo.addHitbox(oilHitbox);
            specialRenders++;
        }

        if(depth > 1133)
        {
            var nuclearEnergyHitbox = new Hitbox(
                {
                    x: padding + (specialRenders % 3) * (this.boundingBox.width / uiScaleX) * .3,
                    y: padding + isotopeHitbox.boundingBox.y + isotopeHitbox.boundingBox.height + (Math.floor(specialRenders / 3)) * (mineralEntryHeight + padding),
                    width: mineralEntryWidth,
                    height: mineralEntryHeight
                },
                {},
                '',
                "nuclearEnergy"
            );
            nuclearEnergyHitbox.render = function (root)
            {
                root.context.save();
                var coords = this.getRelativeCoordinates(0, 0, root);
                let worldResource = worldResources[NUCLEAR_ENERGY_INDEX];

                var iconBox = drawImageFitInBox(root.context, worldResource.largeIcon, coords.x, coords.y, this.boundingBox.height,this.boundingBox.height);                    

                root.context.textBaseline = "middle";
                root.context.fillStyle = "#FFFFFF";
                root.context.font = "1em Open Sans";
                root.context.strokeStyle = "#000000";
                root.context.lineWidth = 2;
                strokeTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);
                fillTextShrinkToFit(root.context, shortenAndBeautifyNum(worldResource.numOwned), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);

                root.context.restore();
            }.bind(nuclearEnergyHitbox, this);
            nuclearEnergyHitbox.allowBubbling = true;
            this.header.expandableInfo.addHitbox(nuclearEnergyHitbox);
            specialRenders++;
        }

        var ticketHitbox = new Hitbox(
            {
                x: padding + (specialRenders % 3) * (this.boundingBox.width / uiScaleX) * .3,
                y: padding + isotopeHitbox.boundingBox.y + isotopeHitbox.boundingBox.height + (Math.floor(specialRenders / 3)) * (mineralEntryHeight + padding),
                width: mineralEntryWidth,
                height: mineralEntryHeight
            },
            {},
            '',
            "ticket"
        );
        ticketHitbox.render = function (root)
        {
            root.context.save();
            var coords = this.getRelativeCoordinates(0, 0, root);;

            var iconBox = drawImageFitInBox(root.context, ticketicon, coords.x, coords.y, this.boundingBox.height,this.boundingBox.height);                    

            root.context.textBaseline = "middle";
            root.context.fillStyle = "#FFFFFF";
            root.context.font = "1em Open Sans";
            root.context.strokeStyle = "#000000";
            root.context.lineWidth = 2;
            strokeTextShrinkToFit(root.context, shortenAndBeautifyNum(tickets), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);
            fillTextShrinkToFit(root.context, shortenAndBeautifyNum(tickets), coords.x + iconBox.width + padding, iconBox.y + iconBox.height / 2, this.boundingBox.width * .95);

            root.context.restore();
        }.bind(ticketHitbox, this);
        ticketHitbox.allowBubbling = true;
        this.header.expandableInfo.addHitbox(ticketHitbox);
        specialRenders++;


        // Set header expanded height to bottom of last element
        this.header.expandableInfo.boundingBox.height = this.header.collapsedHeight * 0.5 + padding + isotopeHitbox.parent.hitboxes[isotopeHitbox.parent.hitboxes.length - 1].boundingBox.y + isotopeHitbox.boundingBox.height;
        this.header.expandedHeight = this.header.expandableInfo.boundingBox.height + this.header.collapsedHeight;
    }

    renderHeader()
    {
        return;
    }

    getShortcutRenderFunction(shortcutImage, conditionFunction)
    {
        return function()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var context = this.getContext();
            if (conditionFunction())
            {
                context.drawImage(shortcutImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
            if (!this.isEnabled)
            {
                this.isEnabled = conditionFunction;
            }
        }
    }

    renderRightSideBar()
    {
        this.context.clearRect(Math.ceil(mainw * .937), Math.ceil(mainh * .115), Math.floor(mainw * .0305), Math.ceil(mainh * .885));
        this.context.drawImage(settingsb, 0, 0, 33, 34, Math.ceil(mainw * .937), Math.ceil(mainh * .115), Math.floor(mainw * .062), Math.ceil(mainh * .036));

        if(!isCraftNotificationOn)
        {
            this.context.drawImage(hammerAnvil, 0, 0, hammerAnvil.width, hammerAnvil.height, Math.ceil(mainw * .937), Math.ceil(mainh * .175), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
        }
        else
        {
            this.context.globalAlpha = 0.5 + (0.5 * oscillate(currentTime(), 500));
            this.context.drawImage(hammerAnvil, 0, 0, hammerAnvil.width, hammerAnvil.height, Math.ceil(mainw * .937), Math.ceil(mainh * .175), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
            this.context.globalAlpha = 1;
        }

        //Shortcuts
        if(depth >= tradeConfig.tradingPosts[0].depth)
        {
            if(isTradeAvailable(earthTradeOffer1))
            {
                this.context.drawImage(tradingpostb, 0, 0, 33, 39, Math.ceil(mainw * .937), Math.ceil(mainh * .25), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
            }
            else
            {
                let timeRemainingUntilTrade = getNextTradeTimeForWorld(0) - playtime;
                // The time since the countdown started isn't saved, so we just assume it takes up to 5 hours
                let maxTimeUntilNextTrade = 18000;
                let icon = generateIconWithCooldownOverlay(
                    tradingpostb,
                    Math.floor(mainw * .0305),
                    Math.ceil(mainh * .058),
                    timeRemainingUntilTrade / maxTimeUntilNextTrade
                );
                this.context.drawImage(icon, Math.ceil(mainw * .937), Math.ceil(mainh * .25));
            }
        }
        if(depth >= 304)
        {
            this.context.drawImage(undergroundb, Math.ceil(mainw * .937), Math.ceil(mainh * .37), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
        }
        if(depth >= 501)
        {
            this.context.drawImage(coreb, Math.ceil(mainw * .937), Math.ceil(mainh * .43), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
        }

        if(depth >= tradeConfig.tradingPosts[1].depth)
        {
            if(isTradeAvailable(moonTradeOffer1))
            {
                this.context.drawImage(lunartradingpostb, 0, 0, 33, 39, Math.ceil(mainw * .937), Math.ceil(mainh * .49), Math.floor(mainw * .0305), Math.ceil(mainh * .058));
            }
            else
            {
                let timeRemainingUntilTrade = getNextTradeTimeForWorld(1) - playtime;
                // The time since the countdown started isn't saved, so we just assume it takes up to 5 hours
                let maxTimeUntilNextTrade = 18000;
                let icon = generateIconWithCooldownOverlay(
                    lunartradingpostb,
                    Math.floor(mainw * .0305),
                    Math.ceil(mainh * .058),
                    timeRemainingUntilTrade / maxTimeUntilNextTrade
                );
                this.context.drawImage(icon, Math.ceil(mainw * .937), Math.ceil(mainh * .49));
            }
        }
    }

    initializeScrollbar(topYCoordinate = -1, bottomYCoordinate = -1)
    {
        var buttonWidth = mainw*.087;
        var buttonHeight = mainw*.087;
        if (topYCoordinate < 0)
        {
            topYCoordinate = this.header.boundingBox.height - this.leftSidebar.boundingBox.y;
        }
        if (bottomYCoordinate < 0)
        {
            bottomYCoordinate = this.leftSidebar.boundingBox.height;
        }
        var padding = buttonHeight / 2;
        if (this.scrollbar)
        {
            this.leftSidebar.deleteHitboxWithId('scrollbar');
        }
        // Container
        this.scrollbar = this.leftSidebar.addHitbox(new Hitbox(
            {
                x: this.leftSidebar.boundingBox.width / 2 - buttonWidth / 2,
                y: padding + topYCoordinate,
                width: buttonWidth,
                height: bottomYCoordinate - topYCoordinate - 2 * padding
            },
            {},
            "",
            "scrollbar"
        ));
        
        var upAllButton = new Hitbox(
            {
                x: 0,
                y: 0,
                width: buttonWidth,
                height: buttonHeight
            },
            {
                onmousedown: function ()
                {
                    changeViewedDepth(-1, true);
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                },
                onmouseenter: function ()
                {
                    document.body.style.cursor = 'pointer';
                },
                onmouseexit: function ()
                {
                    document.body.style.cursor = '';
                }
            },
            '',
            "upAllButton"
        );
        upAllButton.render = function ()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var context = this.getContext();
            if (currentlyViewedDepth > activeLayers.WorldLayer.minVisibleDepth)
            {
                drawImageFitInBox(context, upallb, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
            else
            {
                drawImageFitInBox(context, upallbg, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
            this.renderChildren();
        }
        upAllButton.addHitbox(new EasyHintArrow(
            "left",
            function()
            {
                return getVisibleDepthRange().min >= -1 && isArrowOnTopLevel;
            }
        ));

        var downAllButton = new Hitbox(
            {
                x: 0,
                y: this.scrollbar.boundingBox.height - buttonHeight,
                width: buttonWidth,
                height: buttonHeight
            },
            {
                onmousedown: function ()
                {
                    changeViewedDepth(1, true);
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                },
                onmouseenter: function ()
                {
                    document.body.style.cursor = 'pointer';
                },
                onmouseexit: function ()
                {
                    document.body.style.cursor = '';
                }
            },
            '',
            "downAllButton"
        );
        downAllButton.render = function ()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var context = this.getContext();
            if (currentlyViewedDepth < depth + 1)
            {
                drawImageFitInBox(context, downallb, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
            else
            {
                drawImageFitInBox(context, downallbg, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
        }

        var scroller = new Hitbox(
            {
                x: 0,
                y: buttonHeight * 1.25,
                width: buttonWidth,
                height: this.scrollbar.boundingBox.height - buttonHeight * 2.5
            },
            {
                onmouseenter: function ()
                {
                    parent.isHoveringOverScroller = true;
                },
                onmouseexit: function ()
                {
                    parent.isHoveringOverScroller = false;
                },
                onmousedown: function ()
                {
                    parent.isOnScroller = true;

                    var coords = this.getGlobalCoordinates(0, 0);
                    var startOfScroller = coords.y;
                    var mousePercent = (mouseY - startOfScroller) / this.boundingBox.height;
                    changeViewedDepthBasedOnMouseScrollerPosition(mousePercent);
                },
                onmouseup: function ()
                {
                    parent.isOnScroller = false;
                },
                onmousemove: function ()
                {
                    if(parent.isOnScroller)
                    {
                        
                        var coords = this.getGlobalCoordinates(0, 0);
                        var startOfScroller = coords.y;
                        var mousePercent = (mouseY - startOfScroller) / this.boundingBox.height;
                        
                        changeViewedDepthBasedOnMouseScrollerPosition(mousePercent);
                    }
                }
            },
            'pointer',
            "scroller"
        );
        
        scroller.render = function ()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var context = this.getContext();
            var worldLayer = activeLayers.WorldLayer;
            var depthFraction = getFractionalScrollerLocationFromDepth(currentlyViewedDepth + partialDepthOffset);
            var barHeight = 6;
            var barY = coords.y + ((this.boundingBox.height - (barHeight - 2)) * depthFraction);
            context.save();
            context.strokeStyle = "#519650";
            context.lineWidth = barHeight + 2;
            context.lineCap = "round";
            context.beginPath();
            context.moveTo(coords.x + ((this.boundingBox.width) / 2), coords.y);
            context.lineTo(coords.x + ((this.boundingBox.width) / 2), coords.y + this.boundingBox.height);
            context.stroke();
            context.strokeStyle = "#000000";
            context.lineWidth = barHeight;
            context.beginPath();
            context.moveTo(coords.x + ((this.boundingBox.width) / 2), coords.y);
            context.lineTo(coords.x + ((this.boundingBox.width) / 2), coords.y + this.boundingBox.height);
            context.stroke();
            context.strokeStyle = "#7fd179";
            context.beginPath();
            context.moveTo(coords.x + ((this.boundingBox.width) / 2), barY);
            context.lineTo(coords.x + ((this.boundingBox.width) / 2), barY + barHeight);
            context.stroke();

            //Show mineral deposits
            for(var i = 0; i < worldClickables.length; i++)
            {
                var dotImage;
                if(
                    worldClickables[i].type == MINERAL_DEPOSIT_ID ||
                    worldClickables[i].type == CAVE_SYSTEM_ID ||
                    (worldClickables[i].type == ORANGE_FISH_ID && metalDetectorStructure.level > 4)
                )
                {
                    if(metalDetectorStructure.level > 4)
                    {
                        var timeUntilExpire = worldClickables[i].expireTime - currentTime();
                        if(timeUntilExpire < 120)
                        {
                            var flickerRate = Math.max(3, ((timeUntilExpire / 60) * 16));
                            MAIN.globalAlpha = 0.25 + (oscillate(numFramesRendered, flickerRate) * .75);
                        }
                    }
                    if(worldClickables[i].type == MINERAL_DEPOSIT_ID)  dotImage = clickableDot;
                    else if(worldClickables[i].type == CAVE_SYSTEM_ID) dotImage = caveClickableDot;
                    else if(worldClickables[i].type == ORANGE_FISH_ID) dotImage = orangeClickableDot;
                    if (dotImage)
                    {
                        drawImageFitInBox(
                            MAIN,
                            dotImage,
                            coords.x + this.boundingBox.width / 2 - dotImage.width / 2,
                            coords.y + this.boundingBox.height * getFractionalScrollerLocationFromDepth(worldClickables[i].depth + worldConfig.numberOfDepthsVisible / 2) - dotImage.height / 2,
                            dotImage.width,
                            dotImage.height,
                            barHeight,
                            barHeight
                        );
                    }
                    if(metalDetectorStructure.level > 4)
                    {
                        MAIN.globalAlpha = 1;
                    }
                }
            }
            
            if(metalDetectorStructure.level > 0)
            {
                //Draw chest dots
                if(metalDetectorStructure.level > 1)
                {
                    chestService.forEachChest((chest) =>
                    {
                        let chestDot = sliderc;
                        if(metalDetectorStructure.level > 2)
                        {
                            if(chest.type == ChestType.gold)
                            {
                                chestDot = sliderg;
                            }
                            else if(chest.type == ChestType.black)
                            {
                                chestDot = sliderblack;
                            }
                        }

                        if(metalDetectorStructure.level > 4 && chest.source == Chest.natural.name && chest.timeToLive <= 120)
                        {
                            var flickerRate = Math.max(3, ((chest.timeToLive / 60) * 8));

                            MAIN.globalAlpha = 0.25 + (oscillate(numFramesRendered, flickerRate) * .75);
                        }
                        drawImageFitInBox(
                            MAIN,
                            chestDot,
                            coords.x + this.boundingBox.width / 2 - barHeight / 2,
                            coords.y + this.boundingBox.height * getFractionalScrollerLocationFromDepth(chest.depth + worldConfig.numberOfDepthsVisible / 2) - barHeight / 2,
                            chestDot.width,
                            chestDot.height,
                            barHeight,
                            barHeight
                        );
                        if(metalDetectorStructure.level > 4)
                        {
                            MAIN.globalAlpha = 1;
                        }
                    });
                }

                if(battleWaiting.length > 0)
                {
                    var battleDepth = battleWaiting[1];
                    drawImageFitInBox(
                        MAIN,
                        battleDot,
                        coords.x + this.boundingBox.width / 2 - barHeight / 2,
                        coords.y + this.boundingBox.height * getFractionalScrollerLocationFromDepth(battleDepth + worldConfig.numberOfDepthsVisible / 2) - barHeight / 2,
                        barHeight,
                        barHeight
                    );
                }
            }

            if(depth >= 50 && hasFoundGolem == 0)
            {
                var golemIcon = battleDot;
                drawImageFitInBox(
                    MAIN,
                    golemIcon,
                    coords.x + this.boundingBox.width / 2 - barHeight / 2,
                    coords.y + this.boundingBox.height * getFractionalScrollerLocationFromDepth(50),
                    barHeight,
                    barHeight
                );
            }

            if(depth >= 225 && hasFoundGidget == 0)
            {
                var robotIcon = battleDot;
                drawImageFitInBox(
                    MAIN,
                    robotIcon,
                    coords.x + this.boundingBox.width / 2 - barHeight / 2,
                    coords.y + this.boundingBox.height * getFractionalScrollerLocationFromDepth(225),
                    barHeight,
                    barHeight
                );
            }
            context.restore();
        }

        this.scrollbar.addHitbox(upAllButton);
        this.scrollbar.addHitbox(downAllButton);
        this.scrollbar.addHitbox(scroller);
        // changeViewedDepthBasedOnMouseScrollerPosition(currentlyViewedDepth / depth);
    }

    
    //###################### DESKTOP STUBS ########################
    removeDialogueAttachment(){}
    addPopupDialogueAttachment(dialogueText, dialogueImage, dialoguePartyName, dialoguePopupId){}

    displayNewBuff(activeBuffIndex)
    {
        var newBuffHitbox = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.rightSidebar.boundingBox.width,
                height: this.rightSidebar.boundingBox.width
            },
            {},
            "pointer"
        );

        newBuffHitbox.onmousedown = function (id) 
        {
            buffs.getStaticBuffById(id).onClick();
        }.bind(this, buffs.activeBuffs[activeBuffIndex].id);

        newBuffHitbox.onmouseenter = function (i) 
        {
            var tooltipWidth = 180;
            buffs.showBuffTooltip(
                i,
                (this.parent.boundingBox.x + this.boundingBox.x - tooltipWidth + this.boundingBox.width) * uiScaleX,
                (this.parent.boundingBox.y + this.boundingBox.y + this.boundingBox.height) * uiScaleY,
                180
            )
        }.bind(newBuffHitbox, activeBuffIndex)
        newBuffHitbox.onmouseexit = function ()
        {
            hideTooltip();
        }
        newBuffHitbox.render = function (root, i, buffObject)
        {
            var coords = this.getGlobalCoordinates(0, 0);
            renderBuff(
                root.context,
                coords.x * uiScaleX,
                coords.y * uiScaleY,
                this.boundingBox.width,
                this.boundingBox.height,
                i
            );
            if((buffs.activeBuffs[i] != buffObject || buffs.getBuffTimeRemaining(i) <= 0) && (buffs.activeBuffs[i] && buffs.activeBuffs[i].startSource != "Ad" && isMobile()))
            {
                root.deleteBuffFromOverlay(this);
            }
        }.bind(newBuffHitbox, this, activeBuffIndex, buffs.activeBuffs[activeBuffIndex]);
        this.buffContainer.addHitbox(newBuffHitbox);
        this.arrangeBuffsInOverlay();
    }

    displayAllBuffs()
    {
        this.buffContainer.clearHitboxes();
        for(var i in buffs.activeBuffs)
        {
            if(!buffs.activeBuffs[i].isPaused())
            {
                this.displayNewBuff(i);
            }
        }
        this.arrangeBuffsInOverlay();
    }

    arrangeBuffsInOverlay()
    {
        var buffList = this.buffContainer.hitboxes;
        var padding = 5;
        if(buffList.length > 0)
        {
            var numberOfBuffsPerColumn = Math.floor(this.buffContainer.boundingBox.height / ((buffList[0].boundingBox.height + padding) + padding));
            var numberOfColumns = Math.ceil(buffList.length / numberOfBuffsPerColumn);
            this.buffContainer.boundingBox.width = (buffList[0].boundingBox.width + padding) * numberOfColumns;
            this.buffContainer.boundingBox.x = this.buffContainer.defaultX - (numberOfColumns - 1) * (buffList[0].boundingBox.width + padding);
            for(var i = 0; i < buffList.length; ++i)
            {
                buffList[i].boundingBox.x = (numberOfColumns - 1 - Math.floor(i / numberOfBuffsPerColumn)) * (buffList[i].boundingBox.width + padding);
                buffList[i].boundingBox.y = (i % numberOfBuffsPerColumn) * (buffList[i].boundingBox.height + padding);
                // Reset hitbox ID to ensure it matches the buff's index in activeBuffs
                buffList[i].id = "buff_" + i;
            }
        }
        else
        {
            this.buffContainer.boundingBox.x = this.buffContainer.defaultX;
            this.buffContainer.boundingBox.width = 0;
        }
    }

    deleteBuffFromOverlay(activeBuffHitbox)
    {
        this.buffContainer.deleteHitboxWithId(activeBuffHitbox.id);
        this.displayAllBuffs();
    }
}



//############# GLOBAL SCOPED #############
var lastScrollTime = 0;
var maxRefreshRateMsecs = 10;
function changeViewedDepthBasedOnMouseScrollerPosition(mousePercent)
{
    mousePercent = Math.min(1, Math.max(0, mousePercent));
    var targetDepth = getDepthFromFractionalScrollerLocation(mousePercent);
    changeViewedDepth(targetDepth - currentlyViewedDepth - partialDepthOffset);
    lastScrollTime = currentTime();
}

function getFractionalScrollerLocationFromDepth(viewedDepth)
{
    var location = (viewedDepth - activeLayers.WorldLayer.minVisibleDepth) / ((depth+1) - activeLayers.WorldLayer.minVisibleDepth);
    location = Math.min(1, Math.max(0, location));
    return location;
}

function getDepthFromFractionalScrollerLocation(scrollerLocationPercent)
{
    return scrollerLocationPercent * (depth + worldConfig.specialLevels.topCity.height);
}