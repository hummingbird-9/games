class TradeWindow extends BottomTabbedPopup
{
    layerName = "tradingPost"; // Used as key in activeLayers
    domElementId = "TRADINGPOSTD"; // ID of dom element that gets shown or hidden
    context = TRADINGPOST;         // Canvas rendering context for popup
    worldIndex;

    defaultWidth;
    defaultHeight;

    trades = [];
    tradeBox1;
    tradeBox2;
    tradeButton1;
    tradeButton2;

    getWorld()
    {
        return worlds[this.worldIndex];
    }

    constructor(boundingBox, worldIndex)
    {
        super(boundingBox);
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        // this.setFrameImagesByWorldIndex(worldIndex);

        this.defaultWidth = this.boundingBox.width;
        this.defaultHeight = this.boundingBox.height;
        this.initializeTabs([]);
        this.worldIndex = worldIndex;
        this.tradeBox1 = this.createTradeBox(0);
        this.tradeBox1.boundingBox.x = 300;
        this.tradeBox1.boundingBox.y = 100;
        this.addHitbox(this.tradeBox1);
        this.tradeBox2 = this.createTradeBox(1);
        this.addHitbox(this.tradeBox2);
        var fontSize = 14;
        this.tradeButton1 = new Button(
            bigbutton, _("MAKE TRADE"), fontSize + "px KanitB", "#000000",
            {
                x: -100, // Coordinates are set in render()
                y: -100,
                width: this.boundingBox.width * .25,
                height: this.boundingBox.height * .15
            },
            {
                onmousedown: function ()
                {
                    var trade = getTradesForWorld(this.getRootLayer().worldIndex)[0];
                    makeTrade(this.getRootLayer().worldIndex, trade);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "tradeButton1"
        );
        this.tradeButton1.textLocation = "top"; 
        this.tradeButton2 = new Button(
            bigbutton, _("MAKE TRADE"), fontSize + "px KanitB", "#000000",
            {
                x: -100, // Coordinates are set in render()
                y: -100,
                width: this.boundingBox.width * .25,
                height: this.boundingBox.height * .15
            },
            {
                onmousedown: function ()
                {
                    var trade = getTradesForWorld(this.getRootLayer().worldIndex)[1];
                    makeTrade(this.getRootLayer().worldIndex, trade);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "tradeButton2"
        );
        this.tradeButton2.textLocation = "top"; 
        this.timer = new Hitbox(
            {
                x: this.bodyContainer.boundingBox.x + this.boundingBox.width * 0.32,
                y: this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.18,
                width: this.boundingBox.width * 0.6,
                height: this.boundingBox.height * 0.08,
            },
            {
                onmouseenter: function ()
                {
                    var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
                    showTooltip(_("Time Left In Trade"), "", coords.x, coords.y);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            }
        )
        this.newTradeButton = new Hitbox(
            {
                x: this.timer.boundingBox.x - (this.timer.boundingBox.width * .075), //set in render
                y: this.timer.boundingBox.y + this.timer.boundingBox.height * 1.2,
                width: this.boundingBox.width * .33,
                height: this.boundingBox.height * .08
            },
            {
                onmousedown: function ()
                {
                    showAdPrompt(
                        _("Get a new trade"),
                        1,
                        function()
                        {
                            generateTrade(worldIndex);
                        }.bind(this),
                        "RerollTrade"
                    );
                }.bind(this),
                onmouseenter: function ()
                {
                    var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
                    showTooltip(_("New Trade"), _("Get a new trade"), coords.x, coords.y);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "newTradeButton"
        );
        this.extendTradeButton = new Hitbox(
            {
                x: this.timer.boundingBox.x + (this.timer.boundingBox.width * .55),
                y: this.timer.boundingBox.y + this.timer.boundingBox.height * 1.2,
                width: this.boundingBox.width * .33,
                height: this.boundingBox.height * .08
            },
            {
                onmousedown: function ()
                {
                    showAdPrompt(
                        _("Extend the trade duration by 1 hour"),
                        1,
                        function()
                        {
                            extendTradeDuration(this.getRootLayer().worldIndex, 3600);
                        }.bind(this),
                        "ExtendTrade"
                    );
                }.bind(this),
                onmouseenter: function ()
                {
                    var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
                    showTooltip(_("Extend Trade"), _("Extend the trade duration by 1 hour"), coords.x, coords.y);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "extendTradeButton"
        );
        this.addHitbox(this.tradeButton1);
        this.addHitbox(this.tradeButton2);
        this.addHitbox(this.newTradeButton);
        this.addHitbox(this.timer);
        this.addHitbox(this.extendTradeButton);
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.defaultWidth, this.defaultHeight);
        this.context.restore();
        super.render(); // Render any child layers

        this.context.fillStyle = "#FFFFFF";
        this.trades = getTradesForWorld(this.worldIndex);
        if(!isTradeAvailable(this.trades[0]) && !isTradeAvailable(this.trades[1]))
        {
            this.boundingBox.width = this.defaultWidth;
            this.boundingBox.height = this.defaultHeight;
            var fontSize = Math.min(14, 0.032 * this.boundingBox.height);
            var fontToUse = fontSize + "px Verdana";
            this.context.font = fontToUse;
            this.tradeBox1.isVisible = () => false;
            this.tradeBox1.isEnabled = () => false;
            this.tradeBox2.isVisible = () => false;
            this.tradeBox2.isEnabled = () => false;
            this.tradeButton1.isVisible = () => false;
            this.tradeButton1.isEnabled = () => false;
            this.tradeButton2.isVisible = () => false;
            this.tradeButton2.isEnabled = () => false;
            this.extendTradeButton.isVisible = () => false;
            this.extendTradeButton.isEnabled = () => false;
            this.newTradeButton.isVisible = () => true;
            this.newTradeButton.isEnabled = () => true;
            var message = _("There's nobody here...");
            var messageBox = this.context.fillText(message, this.boundingBox.width * .48 - this.context.measureText(message).width / 2, this.boundingBox.height * .3);           
            var remainingTime = getNextTradeTimeForWorld(this.worldIndex) - playtime;
            var duration = getTimeBetweenTrades(this.worldIndex);
            var percentComplete = 1 - (duration - remainingTime) / duration;

            this.newTradeButton.boundingBox.x = (this.boundingBox.width / 2) - (this.newTradeButton.boundingBox.width / 2);
            this.context.drawImage(adButton, 0, 0, adButton.width, adButton.height, this.newTradeButton.boundingBox.x, this.newTradeButton.boundingBox.y, this.newTradeButton.boundingBox.width, this.newTradeButton.boundingBox.height);
            this.context.drawImage(
                adButtonSmall, 
                0,
                0, 
                adButtonSmall.width, 
                adButtonSmall.height, 
                this.newTradeButton.boundingBox.x + (this.newTradeButton.boundingBox.width * .1), 
                this.newTradeButton.boundingBox.y + (this.newTradeButton.boundingBox.height * .2), 
                this.newTradeButton.boundingBox.height * .6, 
                this.newTradeButton.boundingBox.height * .6
                );
            this.context.font = this.boundingBox.height * .04 + "px Verdana";
            this.context.lineWidth = 2;
            strokeTextShrinkToFit(
                this.context,
                _("New Trade"),
                this.newTradeButton.boundingBox.x + (this.newTradeButton.boundingBox.width * .25), 
                this.newTradeButton.boundingBox.y + (this.newTradeButton.boundingBox.height / 2) + (this.boundingBox.height * 0.015),
                this.newTradeButton.boundingBox.width * .73,
                "center"
                );
            fillTextShrinkToFit(
                this.context,
                _("New Trade"),
                this.newTradeButton.boundingBox.x + (this.newTradeButton.boundingBox.width * .25), 
                this.newTradeButton.boundingBox.y + (this.newTradeButton.boundingBox.height / 2) + (this.boundingBox.height * 0.015),
                this.newTradeButton.boundingBox.width * .73,
                "center"
            );

            renderProgressBar(
                this.context,
                _("New Trade In {0}", formattedCountDown(remainingTime)),
                darkdot,
                darkdot,
                this.boundingBox.width * 0.2,
                this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height - this.boundingBox.height * 0.16,
                this.boundingBox.width * 0.6,
                this.boundingBox.height * 0.08,
                "#FFFFFF",
                Math.min(1, Math.max(0, percentComplete))
            );
        }
        else if(!isTradeAvailable(this.trades[0]) || !isTradeAvailable(this.trades[1]))
        {
            this.tradeBox1.isVisible = () => false;
            this.tradeBox1.isEnabled = () => false;
            this.tradeBox2.isVisible = () => false;
            this.tradeBox2.isEnabled = () => false;
            this.tradeButton1.isVisible = () => false;
            this.tradeButton1.isEnabled = () => false;
            this.tradeButton2.isVisible = () => false;
            this.tradeButton2.isEnabled = () => false;
            this.newTradeButton.isVisible = () => false;
            this.newTradeButton.isEnabled = () => false;
            this.extendTradeButton.isVisible = () => false;
            this.extendTradeButton.isEnabled = () => false;

            var message = _("There was an error, please contact a dev with your export code if you are able to.\nThis error should resolve itself on the next trade.");
            fillTextWrap(this.context, message, this.bodyContainer.boundingBox.x, this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.3, this.bodyContainer.boundingBox.width, "center");

            var duration = this.trades[0][TRADE_INDEX_DURATION];
            var startTime = this.trades[0][TRADE_INDEX_START_TIME];
            if(isNaN(duration) || isNaN(startTime))
            {
                duration = this.trades[1][TRADE_INDEX_DURATION];
                startTime = this.trades[1][TRADE_INDEX_START_TIME];
            }
            var remainingTime = duration - ((currentTime() / 1000) - startTime);
            var percentComplete = (duration - remainingTime) / duration;
            renderProgressBar(
                this.context,
                _("Time Remaining: {0}", formattedCountDown(remainingTime)),
                darkdot,
                darkdot,
                this.boundingBox.width * 0.2,
                this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height - this.boundingBox.height * 0.16,
                this.boundingBox.width * 0.6,
                this.boundingBox.height * 0.08,
                "#FFFFFF",
                percentComplete
            );
        }
        else
        {
            this.tradeBox1.isVisible = () => true;
            this.tradeBox1.isEnabled = () => true;
            this.tradeBox2.isVisible = () => true;
            this.tradeBox2.isEnabled = () => true;
            this.tradeButton1.isVisible = () => true;
            this.tradeButton1.isEnabled = () => true;
            this.tradeButton2.isVisible = () => true;
            this.tradeButton2.isEnabled = () => true;
            this.newTradeButton.isVisible = () => true;
            this.newTradeButton.isEnabled = () => true;
            this.extendTradeButton.isVisible = () => true;
            this.extendTradeButton.isEnabled = () => true;
            var trader = traders[this.worldIndex][this.trades[0][TRADE_INDEX_TRADER]];
            var startTime = this.trades[0][TRADE_INDEX_START_TIME];
            var duration = this.trades[0][TRADE_INDEX_DURATION];
            var portraitWidth = this.boundingBox.width * 0.2;
            var portraitHeight = portraitWidth * (trader.portrait.height / trader.portrait.width);
            var frameWidth = portraitWidth * 1.2;
            var frameHeight = portraitHeight * 1.2;
            var fontSize = Math.min(14, 0.032 * this.boundingBox.height);
            var fontToUse = fontSize + "px Verdana";
            this.context.font = fontToUse;

            this.newTradeButton.boundingBox.x = this.timer.boundingBox.x - (this.timer.boundingBox.width * .075);
            let adButtons = [{text: _("New Trade"), hitbox: this.newTradeButton}, {text: _("Extend Trade"), hitbox: this.extendTradeButton}];
            
            this.context.save();
            adButtons.forEach(adButtonItem => {
                this.context.drawImage(adButton, 0, 0, adButton.width, adButton.height, adButtonItem.hitbox.boundingBox.x, adButtonItem.hitbox.boundingBox.y, adButtonItem.hitbox.boundingBox.width, adButtonItem.hitbox.boundingBox.height);
                this.context.drawImage(
                    adButtonSmall, 
                    0,
                    0, 
                    adButtonSmall.width, 
                    adButtonSmall.height, 
                    adButtonItem.hitbox.boundingBox.x + (adButtonItem.hitbox.boundingBox.width * .1), 
                    adButtonItem.hitbox.boundingBox.y + (adButtonItem.hitbox.boundingBox.height * .2), 
                    adButtonItem.hitbox.boundingBox.height * .6, 
                    adButtonItem.hitbox.boundingBox.height * .6
                    );
                this.context.font = this.boundingBox.height * .04 + "px Verdana";
                this.context.lineWidth = 2;
                strokeTextShrinkToFit(
                    this.context,
                    adButtonItem.text, 
                    adButtonItem.hitbox.boundingBox.x + (adButtonItem.hitbox.boundingBox.width * .25), 
                    adButtonItem.hitbox.boundingBox.y + (adButtonItem.hitbox.boundingBox.height / 2) + (this.boundingBox.height * 0.015),
                    adButtonItem.hitbox.boundingBox.width * .73,
                    "center"
                    );
                fillTextShrinkToFit(
                    this.context,
                    adButtonItem.text, 
                    adButtonItem.hitbox.boundingBox.x + (adButtonItem.hitbox.boundingBox.width * .25), 
                    adButtonItem.hitbox.boundingBox.y + (adButtonItem.hitbox.boundingBox.height / 2) + (this.boundingBox.height * 0.015),
                    adButtonItem.hitbox.boundingBox.width * .73,
                    "center"
                );
            })
            this.context.restore();

            this.context.drawImage(
                darkgreydot,
                this.bodyContainer.boundingBox.x + this.boundingBox.width * 0.03,
                this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.03,
                portraitWidth,
                portraitHeight
            );
            this.context.drawImage(
                trader.portrait,
                this.bodyContainer.boundingBox.x + this.boundingBox.width * 0.03,
                this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.03,
                portraitWidth,
                portraitHeight
            );
            var traderName = fillTextShrinkToFit(
                this.context,
                trader.name,
                this.bodyContainer.boundingBox.x + this.boundingBox.width * 0.02,
                this.bodyContainer.boundingBox.y + frameHeight + this.boundingBox.height * 0.03,
                frameWidth,
                "center"
            );
            var introDialogueIndex = Math.floor(this.trades[0][TRADE_INDEX_START_TIME]) % trader.introDialogue.length;
            var introDialogueBox = fillTextWrap(
                this.context,
                trader.introDialogue[introDialogueIndex],
                this.bodyContainer.boundingBox.x + frameWidth + 30,
                this.bodyContainer.boundingBox.y + Math.min(40, 0.066 * this.boundingBox.height),
                this.bodyContainer.boundingBox.width - frameWidth - 50
            );
            this.tradeBox1.boundingBox.x = this.boundingBox.x + this.boundingBox.width * .05;
            this.tradeBox1.boundingBox.y = this.boundingBox.y * .58;
            this.tradeBox1.boundingBox.width = (this.bodyContainer.boundingBox.width - frameWidth) * .9;

            this.tradeButton1.boundingBox.x = (this.tradeBox1.boundingBox.x + this.tradeBox1.boundingBox.width + (this.tradeBox1.boundingBox.width * .01));
            this.tradeButton1.boundingBox.y = this.tradeBox1.boundingBox.y + ((this.tradeBox1.boundingBox.height / 2) - (this.tradeButton1.boundingBox.height / 2));

            this.tradeBox2.boundingBox.x = this.boundingBox.x + this.boundingBox.width * .05;
            this.tradeBox2.boundingBox.y = this.tradeBox1.boundingBox.y + this.tradeBox1.boundingBox.height + 7;
            this.tradeBox2.boundingBox.width = (this.bodyContainer.boundingBox.width - frameWidth) * .9;

            this.tradeButton2.boundingBox.x = (this.tradeBox2.boundingBox.x + this.tradeBox2.boundingBox.width + (this.tradeBox2.boundingBox.width * .01));
            this.tradeButton2.boundingBox.y = this.tradeBox2.boundingBox.y + ((this.tradeBox1.boundingBox.height / 2) - (this.tradeButton1.boundingBox.height / 2));;

            var remainingTime = duration - ((currentTime() / 1000) - startTime);
            var percentComplete = (duration - remainingTime) / duration;
            renderProgressBar(
                this.context,
                formattedCountDown(remainingTime),
                darkdot,
                darkdot,
                this.timer.boundingBox.x,
                this.timer.boundingBox.y,
                this.timer.boundingBox.width,
                this.timer.boundingBox.height,
                "#FFFFFF",
                percentComplete
            );
        }
        this.context.restore();
    }

    createTradeBox(tradeIndex)
    {
        var iconWidth = Math.min(55, 0.091 * this.boundingBox.height);
        var iconHeight = iconWidth;
        var padding = 5;
        var width = this.boundingBox.width;
        var height = this.boundingBox.height;
        var arrowLength = width * 0.05;
        var arrowHeight = height * 0.05;
        var tradeBox = new Hitbox(
            {
                x: -300,
                y: -300,
                width: this.boundingBox.width * 0.5,
                height: Math.min(100, 0.17 * this.boundingBox.height)
            },
            {},
            ""
        );
        tradeBox.render = function ()
        {
            var context = this.getContext();
            var root = this.getRootLayer();
            if(root.trades.length == 0 || !isTradeAvailable(root.trades[0])) return;
            var trade = root.trades[tradeIndex];
            var tradeStrings = generateTradeOfferStrings(trade);
            var coords = this.getRelativeCoordinates(0, 0, root);
            var x = coords.x;
            var y = coords.y;
            context.save();
            context.fillStyle = "#000000";
            context.globalAlpha = 0.4;
            context.fillRect(x, y, this.boundingBox.width, this.boundingBox.height);
            context.globalAlpha = 1;
            context.fillStyle = "#FFFFFF";
            context.strokeStyle = "#FFFFFF";
            context.textBaseline = "top";
            var fontSize = Math.min(14, 0.032 * root.boundingBox.height);
            context.font = fontSize + "px Verdana";
            // var paymentLabel = fillTextWrap(
            //     context,
            //     _("YOU PAY:"),
            //     x,
            //     y + padding,
            //     this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
            //     "center",
            //     0.25
            // );
            var paymentString = fillTextWrapWithHeightLimit(
                context,
                tradeStrings.paymentString,
                x,
                y + padding,
                this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
                this.boundingBox.height / 4,
                "center",
                0.15
            );
            var paymentValueString = fillTextWrapWithHeightLimit(
                context,
                _("Value: ") + tradeStrings.paymentValueString,
                x,
                y + iconHeight + 5 * padding,
                this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
                this.boundingBox.height / 5,
                "center",
                0.25
            );
            // var rewardLabel = fillTextWrap(
            //     context,
            //     _("YOU RECEIVE:"),
            //     x + 3 * this.boundingBox.width / 4 + arrowLength / 4 - (this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding) / 2,
            //     y + padding,
            //     this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
            //     "center",
            //     0.25
            // );
            var rewardString = fillTextWrapWithHeightLimit(
                context,
                tradeStrings.rewardString,
                x + 3 * this.boundingBox.width / 4 + arrowLength / 4 - (this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding) / 2,
                y + padding,
                this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
                this.boundingBox.height / 4,
                "center",
                0.15
            );
            var rewardValueString = fillTextWrapWithHeightLimit(
                context,
                _("Value: ") + tradeStrings.rewardValueString,
                x + 3 * this.boundingBox.width / 4 + arrowLength / 4 - (this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding) / 2,
                y + iconHeight + 5 * padding,
                this.boundingBox.width / 2 - arrowLength / 2 - 2 * padding,
                this.boundingBox.height / 5,
                "center",
                0.25
            );
            if(paymentString.y2 - y > this.boundingBox.height) this.boundingBox.height = paymentString.y2 - y + 2 * padding;
            if(rewardString.y2 - y > this.boundingBox.height) this.boundingBox.height = rewardString.y2 - y + 2 * padding;
            if(tradeStrings.paymentValueString.length > 1 && paymentValueString.y2 - y > this.boundingBox.height) this.boundingBox.height = paymentValueString.y2 - y + 2 * padding;
            if(tradeStrings.rewardValueString.length > 1 && rewardValueString.y2 - y > this.boundingBox.height) this.boundingBox.height = rewardValueString.y2 - y + 2 * padding;
            // Draw arrow
            context.lineWidth = 3;
            context.beginPath();
            context.moveTo(x + this.boundingBox.width / 2 - arrowLength / 2, y + this.boundingBox.height / 2 + arrowHeight / 4);  // Top left of stem
            context.lineTo(x + this.boundingBox.width / 2 + arrowLength / 12, y + this.boundingBox.height / 2 + arrowHeight / 4); // Top right of stem
            context.lineTo(x + this.boundingBox.width / 2 + arrowLength / 12, y + this.boundingBox.height / 2 + arrowHeight / 2); // Top of point
            context.lineTo(x + this.boundingBox.width / 2 + arrowLength / 2, y + this.boundingBox.height / 2);                    // End of point
            context.lineTo(x + this.boundingBox.width / 2 + arrowLength / 12, y + this.boundingBox.height / 2 - arrowHeight / 2); // Bottom of point
            context.lineTo(x + this.boundingBox.width / 2 + arrowLength / 12, y + this.boundingBox.height / 2 - arrowHeight / 4); // Bottom right of stem
            context.lineTo(x + this.boundingBox.width / 2 - arrowLength / 2, y + this.boundingBox.height / 2 - arrowHeight / 4);  // Bottom left of stem
            context.closePath();
            // context.stroke();
            context.fill();
            context.restore();
            this.renderChildren();
        }

        var paymentBox = new Hitbox(
            {
                x: tradeBox.boundingBox.width / 4 - arrowLength / 8 - iconWidth / 2,
                y: 0,
                width: iconWidth,
                height: tradeBox.boundingBox.height
            },
            {},
            ""
        );

        tradeBox.addHitbox(paymentBox);

        paymentBox.render = function ()
        {
            var context = this.getContext();
            var root = this.getRootLayer();
            var trade = root.trades[tradeIndex];
            var coords = this.getRelativeCoordinates(0, 0, root);
            var x = coords.x;
            var y = coords.y;
            context.save();
            drawTradeIcon(
                context,
                trade[TRADE_INDEX_PAYMENT_TYPE],
                trade[TRADE_INDEX_PAYMENT_SUBTYPE],
                tradeBox.boundingBox.width * 0.225,
                tradeBox.boundingBox.y + (tradeBox.boundingBox.height * .10),
                this.boundingBox.width,
                this.boundingBox.height
            );
            context.restore();
        }

        var rewardBox = new Hitbox(
            {
                x: 3 * tradeBox.boundingBox.width / 4 + 5 * arrowLength / 8,
                y: 0,
                width: iconWidth,
                height: tradeBox.boundingBox.height
            },
            {
                onmouseenter: function ()
                {
                    var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
                    var trade = this.getRootLayer().trades[tradeIndex];
                    switch(trade[TRADE_INDEX_REWARD_TYPE])
                    {
                        case TRADE_TYPE_BUFF:
                            //AO: This is jank as hell fix this later
                            if(trade[TRADE_INDEX_REWARD_SUBTYPE] != 6)
                            {
                                buffs.showInactiveBuffTooltip(trade[TRADE_INDEX_REWARD_SUBTYPE], coords.x, coords.y, 50, 5);
                            }
                            else
                            {
                                buffs.showInactiveBuffTooltip(trade[TRADE_INDEX_REWARD_SUBTYPE], coords.x, coords.y, 50, 0.5);
                            }
                            break;
                        case TRADE_TYPE_RELIC:
                            showTooltipForUnequippedRelic(trade[TRADE_INDEX_REWARD_SUBTYPE], coords.x, coords.y);
                            break;
                        case TRADE_TYPE_BLUEPRINT:
                            var rewardBlueprintStats = getDrillEquipByBlueprintId(trade[TRADE_INDEX_REWARD_SUBTYPE]);
                            var description = _("Base Watts: {0}", beautifynum(rewardBlueprintStats.baseWatts)) + "<br>" + _("Total Watts Multiplier: {0}", beautifynum(rewardBlueprintStats.wattMultiplier));
                            showTooltip(rewardBlueprintStats.name + " (Lvl " + rewardBlueprintStats.level + ")", description, coords.x, coords.y);
                            break;
                    }
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            ""
        )

        tradeBox.addHitbox(rewardBox);

        rewardBox.render = function ()
        {
            var context = this.getContext();
            var root = this.getRootLayer();
            var trade = root.trades[tradeIndex];
            var coords = this.getRelativeCoordinates(0, 0, root);
            var x = coords.x;
            var y = coords.y;
            context.save();
            drawTradeIcon(
                context,
                trade[TRADE_INDEX_REWARD_TYPE],
                trade[TRADE_INDEX_REWARD_SUBTYPE],
                tradeBox.boundingBox.width * 0.78,
                tradeBox.boundingBox.y + (tradeBox.boundingBox.height * .10),
                this.boundingBox.width,
                this.boundingBox.height
            );
            context.restore();
        }

        return tradeBox;
    }
}