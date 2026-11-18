class PurchaseWindow extends BottomTabbedPopup
{
    layerName = "Purchase"; // Used as key in activeLayers
    domElementId = "PURCHASED"; // ID of dom element that gets shown or hidden
    context = PU;         // Canvas rendering context for popup

    buyButtons = [];
    useButtons = [];

    buyTabIndex = 0;
    useTabIndex = 1;

    constructor(boundingBox, worldIndex = 0, tabIndex = 0)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }
        this.currentTabIndex = tabIndex;

        if(purchaseWindowTabOrder == 1)
        {
            this.initializeTabs([_("Use Tickets"), _("Get Tickets")]);
            this.useTabIndex = 0;
            this.buyTabIndex = 1;
        }
        else
        {
            this.initializeTabs([_("Get Tickets"), _("Use Tickets")]);
        }
        
        var fontToUse = "14px Verdana"
        if(language == "french") {fontToUse = "12px Verdana";}

        if(shopVariantId == 0)
        {
            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 - ticketImage1.width * 1.6,
                    y: ticketImage1.height * 1.6,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_10tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                'pointer',
                "buyButton1"
            )));

            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 - ticketImage1.width * 0.5,
                    y: ticketImage1.height * 1.6,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_55tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                'pointer',
                "buyButton2"
            )));

            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 + ticketImage1.width * 0.6,
                    y: ticketImage1.height * 1.6,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_120tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                'pointer',
                "buyButton3"
            )));

            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 - ticketImage1.width * 1.6,
                    y: ticketImage1.height * 3.1,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_250tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                'pointer',
                "buyButton4"
            )));

            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 - ticketImage1.width * 0.5,
                    y: ticketImage1.height * 3.1,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_650tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    },
                    onmouseenter: function ()
                    {
                        showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", mouseX, mouseY);
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                'pointer',
                "buyButton5"
            )));

            this.buyButtons.push(this.addHitbox(new Button(
                upgradeb, _("BUY"), fontToUse, "#000000",
                {
                    x: this.boundingBox.width * 0.5 + ticketImage1.width * 0.6,
                    y: ticketImage1.height * 3.1,
                    width: ticketImage1.width,
                    height: 18
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_1400tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    },
                    onmouseenter: function ()
                    {
                        showTooltip(_("Buying this ticket pack also grants you the ability to name one of the miners in the game for all Mr.Mine players to see!<br><br>(Added to next update)"), "", mouseX, mouseY);
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                'pointer',
                "buyButton6"
            )));
        }
        else
        {
            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .03,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_10tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton1"
            )));

            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .35,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_55tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton2"
            )));

            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .67,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_120tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton3"
            )));

            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .03,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_250tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton4"
            )));

            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .35,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_650tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton5"
            )));

            this.buyButtons.push(this.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .67,
                    y: this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46),
                    width: this.bodyContainer.boundingBox.width * .3,
                    height: this.bodyContainer.boundingBox.height * .41
                },
                {
                    onmousedown: function ()
                    {
                        platform.buyPack("mrmine_1400tickets");
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
                "pointer",
                "newBuyButton6"
            )));
        }

        this.shopScrollBox = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width - 15,
            this.bodyContainer.boundingBox.height * .9 + (purchasedh * .15 * Math.max(0, shopManager.getAvailableShopItems().length - 3)),
            this.context,
            this.bodyContainer.boundingBox.x + (this.bodyContainer.boundingBox.width * .05),
            this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .05),
            this.bodyContainer.boundingBox.width * .9,
            this.bodyContainer.boundingBox.height * .82,
            15
        );
        this.shopScrollBox.shopItems = [];
        this.addHitbox(this.shopScrollBox);
        this.shopScrollBox.isVisible = () => this.currentTabIndex == this.useTabIndex;
        this.shopScrollBox.isEnabled = () => this.currentTabIndex == this.useTabIndex;
        
        if (!platform.isIOs())
        {
            this.useButtons.push(this.addHitbox(new Button(
                craftb, _("REDEEM"), fontToUse, "#000000",
                {
                    x: purchasedw * .75,
                    y: purchasedh * .94,
                    width: purchasedw * .23,
                    height: purchasedh * .05
                },
                {
                    onmousedown: function ()
                    {
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        if (platform.isIOs && platform.isIOs())
                        {
                            // store.getAdapter(CdvPurchase.Platform.APPLE_APPSTORE).presentCodeRedemptionSheet()
                        }
                        else
                        {
                            showRedeemPrompt();
                        }
                    }
                },
                "pointer"
            )))
        }

        for(var i in this.buyButtons)
        {
            this.buyButtons[i].isVisible = () => this.currentTabIndex == this.buyTabIndex;
            this.buyButtons[i].isEnabled = () => this.currentTabIndex == this.buyTabIndex;
        }
        this.onTabChange();

        this.initializeShopMenu();
        
        trackEvent_logPurchaseWindowOpen();

        if (!window.store)
        {
            console.log('Store not available');
            return;
        }
    }

    createChestButton(type, cost, x, y, width, height)
    {
        var container = this.bodyContainer.addHitbox(new Hitbox(
            {
                x: x,
                y: y,
                width: width,
                height: height
            },
            {
            },
            "pointer"
        ));

        container.chestType = type;

        var button = container.addHitbox(new Hitbox(
            {
                x: width * 0.22,
                y: height * 0.75,
                width: width * 0.55,
                height: height * 0.2
            },
            {
            },
            "pointer"
        ));

        button.chestType = container.chestType;

        button.onmousedown = function ()
        {
            if(tickets >= cost)
            {
                if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                var eventDetails;
                switch (this.chestType)
                {
                    case ChestType.basic:
                        eventDetails = "BASIC CHEST";
                        break;
                    case ChestType.gold:
                        eventDetails = "GOLD CHEST";
                        break;
                    case ChestType.black:
                        eventDetails = "BLACK CHEST";
                        break;
                    default:
                        eventDetails = "CHEST";
                }
                // Spawn at depth 0 or search for depth with available miner
                var spawnDepth = 0;
                if (workersHiredAtDepth(spawnDepth > 0))
                {
                    while (chestService.getChestsAtDepth(spawnDepth).length >= workersHiredAtDepth(spawnDepth) 
                        || isDepthWithoutWorkers(spawnDepth))
                    {
                        ++spawnDepth;
                    }
                }
                var chest = chestService.spawnChest(spawnDepth, Chest.purchased, this.chestType);
                chestService.presentChest(chest.depth, chest.worker);
                trackEvent_SpentTickets(cost, eventDetails);
                tickets -= cost;
            } else
            {
                newNews(_("Not enough tickets. You need 10 tickets. You have {0} tickets.", tickets));
            }
        }.bind(button);

        container.render = function()
        {
            var context = this.parent.parent.context;
            var coords = this.getRelativeCoordinates(0, 0, this.parent.parent);
            var chestImage;
            switch (this.chestType)
            {
                case ChestType.basic:
                    chestImage = chest1;
                    break;
                case ChestType.gold:
                    chestImage = chest2;
                    break;
                case ChestType.black:
                    chestImage = chest3;
                    break;
                default:
                    chestImage = chest1;
            }
            drawImageFitInBox(
                context,
                chestImage, 
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            );
            context.font = "26px KanitM";
            context.fillStyle = "#1798c7";
            context.textBaseline = "middle";
            fillTextWrap(
                context,
                _("BUY"), 
                coords.x + this.boundingBox.width * 0.25, 
                coords.y + this.boundingBox.height * 0.85, 
                this.boundingBox.width * 0.50, 
                "center"
            );
        }.bind(container);

        container.isVisible = () => this.currentTabIndex == 1;
        container.isEnabled = () => this.currentTabIndex == 1;
    }

    initializeShopMenu()
    {
        this.shopScrollBox.clearHitboxes();

        this.availableShopItems = shopManager.getAvailableShopItems();
        this.availableShopItems.forEach((item, i) => 
        {
            let column = i % 3;
            let row = Math.floor(i / 3);

            this.shopScrollBox.shopItems.push(this.shopScrollBox.addHitbox(new Hitbox(
                {
                    x: this.bodyContainer.boundingBox.width * .02 + (this.bodyContainer.boundingBox.width * .31 * column),
                    y: this.bodyContainer.boundingBox.height * .01 + (this.bodyContainer.boundingBox.height * .52 * row),
                    width: this.bodyContainer.boundingBox.width * .31,
                    height: this.bodyContainer.boundingBox.height * .5
                },
                {
                    onmousedown: function ()
                    {
                        hideTooltip();
                        if(item.isPurchaseable())
                        {
                            if(item.getCost() != 0)
                            {
                                showConfirmationPrompt(
                                    _("Spend {0} tickets to purchase {1}?", item.getCost(), item.name),
                                    _("Yes"),
                                    () =>
                                    {
                                        item.onPurchase();
                                    },
                                    _("Cancel")
                                );
                            }
                            else
                            {
                                adManager.showAd(item.onPurchase.bind(item), "ShopMysteryChest");
                            }
                        }
                        else if(tickets < item.getCost())
                        {
                            showConfirmationPrompt(
                                _("Not enough tickets. You need {0} tickets.", item.getCost()),
                                _("BUY TICKETS"),
                                () =>
                                {
                                    openUi(PurchaseWindow, null, 0, purchaseWindowTabOrder);
                                },
                                _("Cancel")
                            );
                        }
                    },
                    onmouseenter: () =>
                    {
                        item.tooltip(mouseX, mouseY)
                    },
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer"
            )));
        })
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.context.restore();
        super.render();
        
        if(this.currentTabIndex == this.useTabIndex)
        {
            this.shopScrollBox.context.clearRect(0, 0, this.shopScrollBox.contentWidth, this.shopScrollBox.contentHeight);
            this.availableShopItems.forEach((shopItem, i) => 
            {
                let hitbox = this.shopScrollBox.shopItems[i];
                let xScale = this.bodyContainer.boundingBox.width / this.shopScrollBox.boundingBox.width;
                let scale = (2 - this.shopScrollBox.scale);

                this.shopScrollBox.context.drawImage(
                    shopItemFrame,
                    hitbox.boundingBox.x * xScale,
                    hitbox.boundingBox.y * scale,
                    hitbox.boundingBox.width * scale,
                    hitbox.boundingBox.height * scale
                );

                renderRoundedRectangle(
                    this.shopScrollBox.context,
                    (hitbox.boundingBox.x + (hitbox.boundingBox.width * .1)) * xScale,
                    (hitbox.boundingBox.y + (hitbox.boundingBox.height * .15)) * scale,
                    hitbox.boundingBox.width * scale * .8,
                    hitbox.boundingBox.height * scale * .44,
                    10,
                    "rgba(0, 0, 0, 0.5)",
                    "rgba(0, 0, 0, 0.5)",
                    0
                )

                drawImageFitInBox(
                    this.shopScrollBox.context,
                    shopItem.image,
                    hitbox.boundingBox.x * xScale,
                    (hitbox.boundingBox.y + (hitbox.boundingBox.height * .15)) * scale,
                    hitbox.boundingBox.width * scale,
                    hitbox.boundingBox.height * scale * .43,
                )

                if(shopItem.maxQuantity)
                {
                    for(var i = 0; i < shopItem.maxQuantity; i++)
                    {
                        let fillColor = i < shopItem.getCurrentQuantity() || shopItem.isMaxedOut() ? "#F7BD00" : "#dedede";

                        drawCircle(
                            this.shopScrollBox.context,
                            (hitbox.boundingBox.x + (hitbox.boundingBox.width * .15) + (hitbox.boundingBox.width * .07 * i)) * xScale,
                            (hitbox.boundingBox.y + (hitbox.boundingBox.height * .2)) * scale,
                            hitbox.boundingBox.height * .02 * scale,
                            fillColor,
                            "#000000",
                            2
                        );
                    }
                }

                this.shopScrollBox.context.save();
                this.shopScrollBox.context.font = (hitbox.boundingBox.height * .1) + "px Verdana";
                this.shopScrollBox.context.fillStyle = "#FFFFFF";

                fillTextShrinkToFit(
                    this.shopScrollBox.context,
                    shopItem.name,
                    (hitbox.boundingBox.x + (hitbox.boundingBox.height * .05)) * xScale,
                    (hitbox.boundingBox.y + (hitbox.boundingBox.height * .115)) * scale,
                    hitbox.boundingBox.width * .88 * scale,
                    "center"
                )

                if(!shopItem.isMaxedOut() && shopItem.getCost() > 0)
                {

                    drawImageFitInBox(
                        this.shopScrollBox.context,
                        smallShopTicketGold,
                        (hitbox.boundingBox.x + (hitbox.boundingBox.width * .22)) * xScale,
                        (hitbox.boundingBox.y + (hitbox.boundingBox.height * .62)) * scale,
                        hitbox.boundingBox.width * .75 * scale,
                        hitbox.boundingBox.height * .1 * scale,
                        "left"
                    )

                    this.shopScrollBox.context.fillStyle = "#F8E460";
                    fillTextShrinkToFit(
                        this.shopScrollBox.context,
                        "x" + shopItem.getCost(),
                        (hitbox.boundingBox.x + (hitbox.boundingBox.width * .55)) * xScale,
                        (hitbox.boundingBox.y + (hitbox.boundingBox.height * .7)) * scale,
                        hitbox.boundingBox.width * .7 * scale,
                    )
                }

                this.shopScrollBox.context.font = (hitbox.boundingBox.height * .17) + "px KanitM";
                this.shopScrollBox.context.fillStyle = "#1798c7";

                if(shopItem.getCost() > 0)
                {
                    let buttonText = shopItem.isMaxedOut() ? _("MAX LEVEL") : _("BUY");
                    fillTextShrinkToFit(
                        this.shopScrollBox.context,
                        buttonText,
                        (hitbox.boundingBox.x + (hitbox.boundingBox.width * .125)) * xScale,
                        (hitbox.boundingBox.y + (hitbox.boundingBox.height * .88)) * scale,
                        hitbox.boundingBox.width * .75 * scale,
                        "center"
                    )
                }
                else
                {
                    let buttonText = _("FREE");

                    if(shopItem.update) shopItem.update(); //probably shouldn't do this here. 

                    if(shopItem.maxRewardsAvailable)
                    {
                        for(var i = 1; i <= shopItem.maxRewardsAvailable; i++)
                        {

                            let fillColor = i <= shopItem.adsAvailable ? "#ee6b6e" : "#dedede";

                            drawCircle(
                                this.shopScrollBox.context,
                                (hitbox.boundingBox.x + (hitbox.boundingBox.width * .15) + (hitbox.boundingBox.width * .07 * i)) * xScale,
                                (hitbox.boundingBox.y + (hitbox.boundingBox.height * .2)) * scale,
                                hitbox.boundingBox.height * .02 * scale,
                                fillColor,
                                "#000000",
                                2
                            );
                        }
                    }

                    drawImageFitInBox(
                        this.shopScrollBox.context,
                        adIcon,
                        (hitbox.boundingBox.x + (hitbox.boundingBox.width * .125)) * xScale,
                        (hitbox.boundingBox.y + (hitbox.boundingBox.height * .75)) * scale,
                        hitbox.boundingBox.width * .2 * scale,
                        hitbox.boundingBox.height * .2 * scale,
                    )

                    fillTextShrinkToFit(
                        this.shopScrollBox.context,
                        buttonText,
                        (hitbox.boundingBox.x + (hitbox.boundingBox.width * .3)) * xScale,
                        (hitbox.boundingBox.y + (hitbox.boundingBox.height * .88)) * scale,
                        hitbox.boundingBox.width * .4 * scale,
                        "center"
                    )


                    if(!shopItem.isPurchaseable())
                    {

                        renderRoundedRectangle(
                            this.shopScrollBox.context,
                            (hitbox.boundingBox.x + (hitbox.boundingBox.height * .025)) * xScale,
                            (hitbox.boundingBox.y + (hitbox.boundingBox.height * .025)) * scale,
                            (hitbox.boundingBox.width - (hitbox.boundingBox.height * .05)) * scale,
                            (hitbox.boundingBox.height - (hitbox.boundingBox.height * .06)) * scale,
                            5,
                            "rgba(0, 0, 0, 0)",
                            "rgba(0, 0, 0, 0.95)",
                            0
                        )

                        this.shopScrollBox.context.font = (hitbox.boundingBox.height * .2) + "px KanitM";
                        this.shopScrollBox.context.fillStyle = "#1798c7";

                        fillTextShrinkToFit(
                            this.shopScrollBox.context,
                            _("Next Reward"),
                            (hitbox.boundingBox.x + (hitbox.boundingBox.width * .125)) * xScale,
                            (hitbox.boundingBox.y + (hitbox.boundingBox.height * .4)) * scale,
                            hitbox.boundingBox.width * .75 * scale,
                            "center"
                        )

                        this.shopScrollBox.context.font = (hitbox.boundingBox.height * .1) + "px KanitM";
                        this.shopScrollBox.context.fillText(
                            formattedCountDown(((shopItem.msBetweenSingleAdRefresh + shopItem.lastRefresh) - Date.now()) / 1000),
                            ((hitbox.boundingBox.x + (hitbox.boundingBox.width * .5)) * xScale) - this.shopScrollBox.context.measureText("00:00:00").width / 2,
                            (hitbox.boundingBox.y + (hitbox.boundingBox.height * .6)) * scale
                        );

                    }

                }

                this.shopScrollBox.context.restore();
            })
        }
        else
        {
            if(this.currentTabIndex == this.buyTabIndex)
            {
                if(shopVariantId == 0)
                {
                    this.context.drawImage(ticketImage1, this.boundingBox.width / 2 - ticketImage1.width * 1.6, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage5, this.boundingBox.width / 2 - ticketImage1.width * 0.5, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage10, this.boundingBox.width / 2 + ticketImage1.width * 0.6, this.bodyContainer.boundingBox.y);
                    this.context.drawImage(ticketImage20, this.boundingBox.width / 2 - ticketImage1.width * 1.6, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                    this.context.drawImage(ticketImage50, this.boundingBox.width / 2 - ticketImage1.width * 0.5, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                    this.context.drawImage(ticketImage100, this.boundingBox.width / 2 + ticketImage1.width * 0.6, this.bodyContainer.boundingBox.y + ticketImage1.height * 1.5);
                }
                else if(shopVariantId == 1)
                {
                    this.context.drawImage(v1Tix10, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix55, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix120, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix250, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix650, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v1Tix1400, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
    
                    this.context.fillStyle = "#000";
                    this.context.font = "24px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    
                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 14px Verdana";
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                }
                else if(shopVariantId == 2)
                {
                    this.context.drawImage(v2Tix10, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix55, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix120, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix250, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix650, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v2Tix1400, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
    
                    this.context.fillStyle = "#000";
                    this.context.font = "24px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    
                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 14px Verdana";
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
    
                }
                else if(shopVariantId == 3)
                {
                    this.context.drawImage(v3Tix10, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix55, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix120, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix250, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix650, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v3Tix1400, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
    
                    this.context.fillStyle = "#000";
                    this.context.font = "24px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    
                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 14px Verdana";
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                }
                else if(shopVariantId == 4)
                {
                    this.context.drawImage(v4Tix10, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix55, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix120, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix250, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix650, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v4Tix1400, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
    
                    this.context.fillStyle = "#000";
                    this.context.font = "24px KanitB";
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .37, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("BUY"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .81, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    
                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "bold 14px Verdana";
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .28, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .72, this.bodyContainer.boundingBox.width * .24, "center", 0);
                }
                else //shopVariantId == 5
                {
                    this.context.drawImage(v5Tix10, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix55, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix120, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .02), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix250, this.bodyContainer.boundingBox.width * .03, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix650, this.bodyContainer.boundingBox.width * .35, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
                    this.context.drawImage(v5Tix1400, this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + (this.bodyContainer.boundingBox.height * .46), this.bodyContainer.boundingBox.width * .3, this.bodyContainer.boundingBox.height * .41);
    
                    this.context.fillStyle = "#FFF";
                    this.context.strokeStyle = "#000";
                    this.context.font = "22px Matiz";
                    this.context.lineWidth = 4;
    
                    this.context.fillStyle = "#FFF";
                    this.context.shadowColor="black";
                    this.context.shadowOffsetX = 1;
                    this.context.shadowOffsetY = 4;
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_10tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_55tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_120tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .38, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_250tickets"), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_650tickets"), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, platform.getPackPrice("mrmine_1400tickets"), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .82, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    
                    this.context.lineWidth = 2;
                    this.context.shadowOffsetX = 0;
                    this.context.shadowOffsetY = 0;
                    //this.context.font = "bold 14px Verdana";
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 10), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 10), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 55), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 55), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 120), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 120), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .07, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 250), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 250), this.bodyContainer.boundingBox.width * .06, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 650), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 650), this.bodyContainer.boundingBox.width * .38, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    strokeTextShrinkToFit(this.context, _("Pack of {0} tickets", 1400), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                    fillTextShrinkToFit(this.context, _("Pack of {0} tickets", 1400), this.bodyContainer.boundingBox.width * .70, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .51, this.bodyContainer.boundingBox.width * .24, "center", 0);
                }
    
                this.context.save();
    
                if (showShopPurchaseHeaders)
                {
                    this.context.textBaseline = "top";
                    drawImageFitInBox(this.context,
                        salesBanner,
                        this.bodyContainer.boundingBox.width * 0.0,
                        this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.384,
                        this.bodyContainer.boundingBox.width * 0.35,
                        this.bodyContainer.boundingBox.height * 0.15
                    )
                    drawImageFitInBox(this.context,
                        salesBanner,
                        this.bodyContainer.boundingBox.width * 0.645,
                        this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.384,
                        this.bodyContainer.boundingBox.width * 0.35,
                        this.bodyContainer.boundingBox.height * 0.15
                    )
                    strokeTextShrinkToFit(this.context, _("Most Popular"), this.bodyContainer.boundingBox.width * .028, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .432, this.bodyContainer.boundingBox.width * .30, "center", 0);
                    fillTextShrinkToFit(this.context, _("Most Popular"), this.bodyContainer.boundingBox.width * .028, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .432, this.bodyContainer.boundingBox.width * .30, "center", 0);
                
                    strokeTextShrinkToFit(this.context, _("Best Value"), this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .432, this.bodyContainer.boundingBox.width * .30, "center", 0);
                    fillTextShrinkToFit(this.context, _("Best Value"), this.bodyContainer.boundingBox.width * .67, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * .432, this.bodyContainer.boundingBox.width * .30, "center", 0);
                }
                
                if (showShopBadges)
                {
                    var badgeWidth = this.boundingBox.width * 0.13;
                    this.drawSalesStar(
                        "+10%", 
                        this.boundingBox.width * 0.63,
                        this.boundingBox.height * 0.23,
                        badgeWidth,
                        badgeWidth
                    );
                    
                    this.drawSalesStar(
                        "+20%", 
                        this.boundingBox.width * 0.95,
                        this.boundingBox.height * 0.23,
                        badgeWidth,
                        badgeWidth
                    );

                    this.drawSalesStar(
                        "+25%", 
                        this.boundingBox.width * 0.31,
                        this.boundingBox.height * 0.62,
                        badgeWidth,
                        badgeWidth
                    );

                    this.drawSalesStar(
                        "+30%", 
                        this.boundingBox.width * 0.63,
                        this.boundingBox.height * 0.62,
                        badgeWidth,
                        badgeWidth
                    );

                    this.drawSalesStar(
                        "+40%", 
                        this.boundingBox.width * 0.95,
                        this.boundingBox.height * 0.62,
                        badgeWidth,
                        badgeWidth
                    );

                }
    
                this.context.fillStyle = "#FFFFFF";
                this.context.font = "24px KanitM";
                this.context.textBaseline = "middle";
                var box = drawImageFitInBox(
                    this.context,
                    smallShopTicket, 
                    purchasedw * 0.025, 
                    purchasedh * 0.93, 
                    purchasedw * .09, 
                    purchasedh * .05
                );
                this.context.fillText(
                    "x" + tickets, 
                    box.x + box.width + purchasedw * 0.0125, 
                    box.y + box.height / 2
                );
                this.context.restore();
            }
        }
    }

    drawSalesStar(text, x, y, width, height)
    {
        this.context.save();
        var fontSize = 18;
        this.context.font = fontSize + "px Matiz";
        this.context.textBaseline = "middle";

        drawImageFitInBox(
            this.context,
            salesStar,
            x - width / 2,
            y - height / 2,
            width, 
            height
        )

        strokeTextShrinkToFit(
            this.context,
            text,
            x - width / 2,
            y,
            width,
            "center",
            0
        );
        fillTextShrinkToFit(
            this.context,
            text,
            x - width / 2,
            y,
            width,
            "center",
            0
        );
        this.context.restore();
    }
}