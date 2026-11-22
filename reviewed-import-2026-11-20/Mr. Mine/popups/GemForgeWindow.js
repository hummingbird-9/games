class GemForgeWindow extends BottomTabbedPopup
{
    layerName = "gemforge"; // Used as key in activeLayers
    domElementId = "GEMFORGED"; // ID of dom element that gets shown or hidden
    context = GEMFORGE;         // Canvas rendering context for popup

    constructor(boundingBox)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        var tabCategories = {
            0: _("Home"),
            1: _("Queue"),
            2: _("Stats")
        };

        this.initializeTabs(Object.values(tabCategories));

        this.forgeHomePane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.boundingBox.width,
                height: this.boundingBox.height
            },
            {},
            "",
            "forgeHomePane"
        );
        this.forgeHomePane.allowBubbling = true;
        this.addHitbox(this.forgeHomePane);

        // DP: bodyContainer boundingbox isn't scaling correctly
        this.forgeQueuePane = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width,
            0,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.05,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height * 0.95,
            15,
        );
        this.forgeQueuePane.allowBubbling = true;
        this.addHitbox(this.forgeQueuePane);

        this.forgeStatsPane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.boundingBox.width,
                height: this.boundingBox.height
            },
            {},
            "",
            "forgeStatsPane"
        );
        this.forgeStatsPane.allowBubbling = true;
        this.addHitbox(this.forgeStatsPane);

        this.onTabChange();
    }

    onTabChange()
    {
        if(this.currentTabIndex == 0)
        {
            this.forgeHomePane.isVisible = () => true;
            this.forgeHomePane.isEnabled = () => true;
            this.forgeQueuePane.isVisible = () => false;
            this.forgeQueuePane.isEnabled = () => false;
            this.forgeStatsPane.isVisible = () => false;
            this.forgeStatsPane.isEnabled = () => false;

            this.initializeHomeHitboxes();
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.canCraftGem);
        }
        else if(this.currentTabIndex == 1)
        {
            this.forgeHomePane.isVisible = () => false;
            this.forgeHomePane.isEnabled = () => false;
            this.forgeQueuePane.isVisible = () => true;
            this.forgeQueuePane.isEnabled = () => true;
            this.forgeStatsPane.isVisible = () => false;
            this.forgeStatsPane.isEnabled = () => false;

            this.initializeQueueHitboxes();
        }
        else if(this.currentTabIndex == 2)
        {
            this.forgeHomePane.isVisible = () => false;
            this.forgeHomePane.isEnabled = () => false;
            this.forgeQueuePane.isVisible = () => false;
            this.forgeQueuePane.isEnabled = () => false;
            this.forgeStatsPane.isVisible = () => true;
            this.forgeStatsPane.isEnabled = () => true;

            this.initializeStatsHitboxes();
        }
    }

    initializeHomeHitboxes()
    {
        this.forgeHomePane.clearHitboxes();

        // Red Gem
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.15,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.60,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(RED_FORGED_GEM_INDEX))
                    {
                        GemForger.addGemToQueue(RED_FORGED_GEM_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            'pointer',
            "craftRedGemButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.20,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.475,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(RED_FORGED_GEM_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds * STAT.gemSpeedMultiplier()), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftRedGemIcon"
        ));

        // Blue Gem
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.4,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.60,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(BLUE_FORGED_GEM_INDEX))
                    {
                        GemForger.addGemToQueue(BLUE_FORGED_GEM_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                },
            },
            'pointer',
            "craftBlueGemButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.45,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.475,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(BLUE_FORGED_GEM_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds * STAT.gemSpeedMultiplier()), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftBlueGemIcon"
        ));

        // Green Gem
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.65,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.60,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(GREEN_FORGED_GEM_INDEX))
                    {
                        GemForger.addGemToQueue(GREEN_FORGED_GEM_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            'pointer',
            "craftGreenGemButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.7,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.475,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(GREEN_FORGED_GEM_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds * STAT.gemSpeedMultiplier()), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftGreenGemIcon"
        ));

        // Purple Gem
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.15,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.805,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(PURPLE_FORGED_GEM_INDEX))
                    {
                        GemForger.addGemToQueue(PURPLE_FORGED_GEM_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            'pointer',
            "craftPurpleGemButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.2,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.68,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(PURPLE_FORGED_GEM_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds * STAT.gemSpeedMultiplier()), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftPurpleGemIcon"
        ));

        // Yellow Gem
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.4,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.805,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(YELLOW_FORGED_GEM_INDEX))
                    {
                        GemForger.addGemToQueue(YELLOW_FORGED_GEM_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            'pointer',
            "craftYellowGemButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.45,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.68,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(YELLOW_FORGED_GEM_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds * STAT.gemSpeedMultiplier()), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftYellowGemIcon"
        ));

        // FORGE CATALYZER
        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.65,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.805,
                width: this.boundingBox.width * 0.2,
                height: this.boundingBox.height * 0.05
            },
            {
                onmousedown: function ()
                {
                    if(GemForger.canQueueGem(FORGE_CATALYST_INDEX))
                    {
                        GemForger.addGemToQueue(FORGE_CATALYST_INDEX);
                        this.parent.parent.flickerTab(1, 500);
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    }
                }
            },
            'pointer',
            "craftCatalyzerButton"
        ));

        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.7,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.68,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    var gemBlueprint = getGemBlueprintForGemId(FORGE_CATALYST_INDEX);
                    var tooltipDetails = generatePrettyBlueprintTooltip(gemBlueprint);
                    tooltipDetails.description = _("<b>Time:</b> {0}<br><b>Workload:</b> {1}<br><br><b>Materials:</b><br>{2}", formattedCountDown(gemBlueprint.forgeTimeSeconds), gemBlueprint.forgeCost, tooltipDetails.description)
                    showTooltip(tooltipDetails.title, tooltipDetails.description, mouseX, mouseY, 180);
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "craftCatalyzerIcon"
        ));


        this.forgeHomePane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * .75,
                y: this.boundingBox.height * .22,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.width * 0.1
            },
            {
                onmouseenter: function ()
                {
                    showTooltip(_("Forge Catalyst"), _("Decreases the time to forge a gem by {0}%.<br><br>(Stacks multiplicatively)", "20"));
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "catalystTooltip"
        ));
    }

    //Add cancel button
    initializeCancelButton(queuedGem, drawY, i)
    {
        var gemID = i;

        var button = new Hitbox(
            {
                x: this.forgeQueuePane.contentWidth * 0.935,
                y: drawY,
                width: this.forgeQueuePane.contentWidth * 0.05,
                height: this.forgeQueuePane.boundingBox.height * 0.07
            },
            {
                onmousedown: function (queuedGem)
                {
                    if(queuedGem != null)
                    {
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        GemForger.forgeQueue.dequeuFinishedGems(gemID);

                        for(var i = 0; i < queuedGem.blueprint.ingredients.length; i++)
                        {
                            if(queuedGem.blueprint.ingredients[i])
                            {
                                queuedGem.blueprint.ingredients[i].item.grantQuantity(queuedGem.blueprint.ingredients[i].quantity);

                                //Workaround for GemCraftingItem
                                if(queuedGem.blueprint.ingredients[i].item instanceof GemCraftingItem)
                                {
                                    console.log("Returning GemCraftingItem " + queuedGem.blueprint.ingredients[i].item.id);
                                    worldResources[queuedGem.blueprint.ingredients[i].item.id].numOwned += queuedGem.blueprint.ingredients[i].quantity;
                                }
                            }
                        }
                    }

                }.bind(button, queuedGem),

                onmouseenter: function (queuedGem)
                {
                    if(queuedGem != null)
                    {
                        showTooltip(_("Cancel"), _("Cancel crafting and refund the cost."));
                    }
                }.bind(button, queuedGem),
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "cancelGemCraftButton" + i
        );
        button.render = function ()
        {
            var cancelGemCraftButton;
            cancelGemCraftButton = deleteb;
            this.isEnabled = () => true;

            var context = this.parent.context;
            renderButton(
                context,
                cancelGemCraftButton,
                "",
                this.boundingBox.x + this.parent.scrollbarWidth,
                this.boundingBox.y / this.parent.scale,
                this.boundingBox.width,
                this.boundingBox.height,
                "11px KanitM",
                "#000000"
            );
        }
        this.forgeQueuePane.addHitbox(button);
    }

    initializeQueueHitboxes()
    {
        this.forgeQueuePane.clearHitboxes();

        //Add catalyst buttons
        var drawY = this.forgeQueuePane.boundingBox.height * .07;
        GemForger.forgeQueue.forEachQueuedGem((queuedGem, i) =>
        {
            var button = new Hitbox(
                {
                    x: this.forgeQueuePane.contentWidth * 0.725,
                    y: drawY,
                    width: this.forgeQueuePane.contentWidth * 0.195,
                    height: this.forgeQueuePane.boundingBox.height * 0.07
                },
                {
                    onmouseenter: function (queuedGem)
                    {
                        if(queuedGem != null)
                        {
                            showTooltip(_("Apply Catalyst"), _("Speed up crafting of {0} by {1}%", queuedGem.blueprint.name, "20"));
                        }
                    }.bind(button, queuedGem),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                'pointer',
                "applyCatalystButton_" + i
            );
            
            button.onmousedown = function (queuedGem)
            {
                if(GemForger.canApplyCatalyst())
                {
                    if(queuedGem != null)
                    {
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        queuedGem.applyCatalyst();
                        this.parent.parent.initializeQueueHitboxes();
                    }
                }
            }.bind(button, queuedGem)
            
            button.render = function ()
            {
                var applyCatalystButton;
                if(GemForger.canApplyCatalyst())
                {
                    applyCatalystButton = craftb;
                    this.isEnabled = () => true;
                }
                else
                {
                    applyCatalystButton = craftbg;
                    this.isEnabled = () => false;
                }
                var context = this.parent.context;
                renderButton(
                    context,
                    applyCatalystButton,
                    _("APPLY CATALYST"),
                    this.boundingBox.x + this.parent.scrollbarWidth,
                    this.boundingBox.y / this.parent.scale,
                    this.boundingBox.width,
                    this.boundingBox.height,
                    "11px KanitM",
                    "#000000"
                );
            }
            this.forgeQueuePane.addHitbox(button);

            //Add cancel button
            this.initializeCancelButton(queuedGem, drawY, i);

            drawY += this.forgeQueuePane.boundingBox.height * (queuedGem.forgeWorkloadBase + queuedGem.numCatalystsApplied) * .09;
        });
    }

    initializeStatsHitboxes()
    {
        this.forgeStatsPane.clearHitboxes();
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.context.restore();
        super.render();

        if(this.currentTabIndex == 0)
        {
            this.context.save();
            this.context.fillStyle = "#FFFFFF";
            this.context.strokeStyle = "#000000";
            this.context.textBaseline = "bottom";
            this.context.lineWidth = 3;

            //Boxes to separate
            this.context.save();
            this.context.globalAlpha = 0.4;
            renderRoundedRectangle(this.context, this.boundingBox.width * .06, this.boundingBox.height * .15, this.boundingBox.width * .87, this.boundingBox.height * .235, 5, "#AAAAAA", "#151515", 1);
            renderRoundedRectangle(this.context, this.boundingBox.width * .06, this.boundingBox.height * .445, this.boundingBox.width * .87, this.boundingBox.height * .445, 5, "#AAAAAA", "#151515", 1);
            this.context.globalAlpha = 1;
            this.context.restore();

            //Titles
            this.context.font = "16px KanitM";
            this.context.strokeText(_("Inventory"), this.boundingBox.width * .075, this.boundingBox.height * .205);
            this.context.fillText(_("Inventory"), this.boundingBox.width * .075, this.boundingBox.height * .205);
            this.context.strokeText(_("Actions"), this.boundingBox.width * .075, this.boundingBox.height * .5);
            this.context.fillText(_("Actions"), this.boundingBox.width * .075, this.boundingBox.height * .5);
            var currentlWorkloadText = GemForger.currentLoad() + "/" + GemForger.currentMaxLoad();
            this.context.strokeText(_(currentlWorkloadText), this.boundingBox.width * .925 - this.context.measureText(currentlWorkloadText).width, this.boundingBox.height * .5);
            this.context.fillText(_(currentlWorkloadText), this.boundingBox.width * .925 - this.context.measureText(currentlWorkloadText).width, this.boundingBox.height * .5);

            this.context.font = "15px KanitM";

            var forgeGemHoldings = [];
            forgeGemHoldings.push({
                "icon": forgedRedGem,
                "numOwned": numRedForgedGemsOwned()
            });
            forgeGemHoldings.push({
                "icon": forgedBlueGem,
                "numOwned": numBlueForgedGemsOwned()
            });
            forgeGemHoldings.push({
                "icon": forgedGreenGem,
                "numOwned": numGreenForgedGemsOwned()
            });
            forgeGemHoldings.push({
                "icon": forgedPurpleGem,
                "numOwned": numPurpleForgedGemsOwned()
            });
            forgeGemHoldings.push({
                "icon": forgedYellowGem,
                "numOwned": numYellowForgedGemsOwned()
            });
            forgeGemHoldings.push({
                "icon": forgeCatalystAsset,
                "numOwned": numforgeCatalystsOwned()
            });

            for(var i = 0; i < forgeGemHoldings.length; i++)
            {
                var forgeGemDetails = forgeGemHoldings[i];

                var xCoordinate = this.boundingBox.width * .125 + (this.boundingBox.width * .125 * i);

                this.context.drawImage(darkdot, 0, 0, darkdot.width, darkdot.height, xCoordinate, this.boundingBox.height * .22, this.boundingBox.width * .1, this.boundingBox.height * .125);
                this.context.drawImage(forgeGemDetails.icon, 0, 0, forgeGemDetails.icon.width, forgeGemDetails.icon.height, xCoordinate, this.boundingBox.height * .22, this.boundingBox.width * .1, this.boundingBox.height * .125);

                strokeTextShrinkToFit(
                    this.context,
                    forgeGemDetails.numOwned,
                    xCoordinate,
                    this.boundingBox.height * .22 + this.boundingBox.height * .125,
                    this.boundingBox.width * .1 * .95,
                    "right"
                );
                fillTextShrinkToFit(
                    this.context,
                    forgeGemDetails.numOwned,
                    xCoordinate,
                    this.boundingBox.height * .22 + this.boundingBox.height * .125,
                    this.boundingBox.width * .1 * .95,
                    "right"
                );
            }
            this.context.restore();

            //Craft Buttons
            this.context.drawImage(forgedRedGem, 0, 0, forgedRedGem.width, forgedRedGem.height, this.boundingBox.width * .185, this.boundingBox.height * .47, this.boundingBox.width * .13, this.boundingBox.width * .13);
            var craftButtonImage = GemForger.canQueueGem(RED_FORGED_GEM_INDEX) ? craftb : craftbg;
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .15, this.boundingBox.height * .60, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");

            craftButtonImage = GemForger.canQueueGem(BLUE_FORGED_GEM_INDEX) ? craftb : craftbg;
            this.context.drawImage(forgedBlueGem, 0, 0, forgedBlueGem.width, forgedBlueGem.height, this.boundingBox.width * .435, this.boundingBox.height * .47, this.boundingBox.width * .13, this.boundingBox.width * .13);
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .40, this.boundingBox.height * .60, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");

            craftButtonImage = GemForger.canQueueGem(GREEN_FORGED_GEM_INDEX) ? craftb : craftbg;
            this.context.drawImage(forgedGreenGem, 0, 0, forgedGreenGem.width, forgedGreenGem.height, this.boundingBox.width * .685, this.boundingBox.height * .47, this.boundingBox.width * .13, this.boundingBox.width * .13);
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .65, this.boundingBox.height * .60, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");

            craftButtonImage = GemForger.canQueueGem(PURPLE_FORGED_GEM_INDEX) ? craftb : craftbg;
            this.context.drawImage(forgedPurpleGem, 0, 0, forgedPurpleGem.width, forgedPurpleGem.height, this.boundingBox.width * .185, this.boundingBox.height * .675, this.boundingBox.width * .13, this.boundingBox.width * .13);
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .15, this.boundingBox.height * .805, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");

            craftButtonImage = GemForger.canQueueGem(YELLOW_FORGED_GEM_INDEX) ? craftb : craftbg;
            this.context.drawImage(forgedYellowGem, 0, 0, forgedYellowGem.width, forgedYellowGem.height, this.boundingBox.width * .435, this.boundingBox.height * .675, this.boundingBox.width * .13, this.boundingBox.width * .13);
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .4, this.boundingBox.height * .805, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");

            craftButtonImage = GemForger.canQueueGem(FORGE_CATALYST_INDEX) ? craftb : craftbg;
            this.context.drawImage(forgeCatalystAsset, 0, 0, forgeCatalystAsset.width, forgeCatalystAsset.height, this.boundingBox.width * .685, this.boundingBox.height * .675, this.boundingBox.width * .12, this.boundingBox.width * .12);
            renderButton(this.context, craftButtonImage, _("CRAFT"), this.boundingBox.width * .65, this.boundingBox.height * .805, this.boundingBox.width * .20, this.boundingBox.height * .06, "12px KanitM", "#000000");
        }

        if(this.currentTabIndex == 1)
        {
            this.renderQueue();
        }

        if(this.currentTabIndex == 2)
        {
            this.context.save();
            this.context.fillStyle = "#FFFFFF";
            this.context.strokeStyle = "#000000";
            this.context.textBaseline = "bottom";
            this.context.lineWidth = 3;

            if(!GemForger.isAtMaxLevel())
            {
                var headerText = _("CURRENT");
                var levelText = _("Forge Level: {0}", gemForgeStructure.level);
                var statsText = _("Forge Max Workload: {0}", GemForger.currentMaxLoad());
                this.context.font = "bold 20px Verdana";
                strokeTextShrinkToFit(this.context, headerText, this.boundingBox.width * .08, this.boundingBox.height * .2, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, headerText, this.boundingBox.width * .08, this.boundingBox.height * .2, this.boundingBox.width * .38, "center");
                this.context.font = "20px Verdana";
                strokeTextShrinkToFit(this.context, levelText, this.boundingBox.width * .08, this.boundingBox.height * .27, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, levelText, this.boundingBox.width * .08, this.boundingBox.height * .27, this.boundingBox.width * .38, "center");
                strokeTextShrinkToFit(this.context, statsText, this.boundingBox.width * .08, this.boundingBox.height * .34, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, statsText, this.boundingBox.width * .08, this.boundingBox.height * .34, this.boundingBox.width * .38, "center");

                var headerText = _("NEXT LEVEL");
                var levelText = _("Forge Level: {0}", gemForgeStructure.level + 1);
                var statsText = _("Forge Max Workload: {0}", GemForger.currentMaxLoad() + GemForger.levelUpWorkloadIncrease());
                this.context.font = "bold 20px Verdana";
                strokeTextShrinkToFit(this.context, headerText, this.boundingBox.width * .5, this.boundingBox.height * .2, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, headerText, this.boundingBox.width * .5, this.boundingBox.height * .2, this.boundingBox.width * .38, "center");
                this.context.font = "20px Verdana";
                strokeTextShrinkToFit(this.context, levelText, this.boundingBox.width * .5, this.boundingBox.height * .27, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, levelText, this.boundingBox.width * .5, this.boundingBox.height * .27, this.boundingBox.width * .38, "center");
                strokeTextShrinkToFit(this.context, statsText, this.boundingBox.width * .5, this.boundingBox.height * .34, this.boundingBox.width * .38, "center");
                fillTextShrinkToFit(this.context, statsText, this.boundingBox.width * .5, this.boundingBox.height * .34, this.boundingBox.width * .38, "center");
            }
            else
            {
                var forgeLevelText = _("You Are At the Max Level");
                strokeTextShrinkToFit(this.context, forgeLevelText, 0, this.boundingBox.height * .4, this.boundingBox.width, "center");
                fillTextShrinkToFit(this.context, forgeLevelText, 0, this.boundingBox.height * .4, this.boundingBox.width, "center");
            }

            this.context.restore();
        }
    }

    renderQueue()
    {
        var context = this.forgeQueuePane.context;
        context.save();
        // context.imageSmoothingEnabled = false;
        this.forgeQueuePane.clearCanvas();
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#000000";
        context.textBaseline = "bottom";
        context.lineWidth = 3;
        this.forgeQueuePane.contentHeight = this.forgeQueuePane.boundingBox.height * .08 + (this.forgeQueuePane.boundingBox.height * .09 * GemForger.currentMaxLoad());

        this.context.font = "20px KanitM";
        this.context.textBaseline = "top";
        this.context.fillStyle = "#FFFFFF";
        this.context.strokeStyle = "#000000";
        this.context.lineWidth = 3;
        var workloadText = _("Current Workload: {0}", GemForger.currentLoad() + "/" + GemForger.currentMaxLoad());
        outlineTextWrap(this.context, workloadText, 0, this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.02, this.bodyContainer.boundingBox.width, "center");

        context.globalAlpha = 0.3;
        renderRoundedRectangle(context, 0, this.forgeQueuePane.boundingBox.height * .07, this.forgeQueuePane.contentWidth, this.forgeQueuePane.boundingBox.height * .01 + (this.forgeQueuePane.boundingBox.height * .09 * GemForger.currentMaxLoad()), 2, "#AAAAAA", "#111111", 1);
        for(var i = 0; i < GemForger.currentMaxLoad() - 1; i++)
        {
            var lineYCoordinate = (this.forgeQueuePane.boundingBox.height * (.07 + (.09 * i))) - 2;
            if(i % 2 == 0)
            {
                renderRoundedRectangle(context, 0, lineYCoordinate, this.forgeQueuePane.contentWidth, this.forgeQueuePane.boundingBox.height * .09, 0, "#AAAAAA", "#555555", 0);
            }
        }
        context.globalAlpha = 1;

        context.restore();
        var queudRenderIndex = 0;
        GemForger.forgeQueue.forEachQueuedGem((queuedGem, index) =>
        {
            var drawY = this.forgeQueuePane.boundingBox.height * .07 + (this.forgeQueuePane.boundingBox.height * queudRenderIndex * .09);
            drawImageFitInBox(context, queuedGem.icon, 0, drawY - this.forgeQueuePane.boundingBox.height * .01, this.forgeQueuePane.boundingBox.height * .12, this.forgeQueuePane.boundingBox.height * .09);
            var barHeight = this.forgeQueuePane.boundingBox.height * (.08 + (.08 * (queuedGem.forgeWorkloadBase - 1)));
            context.font = "15px KanitM";
            renderProgressBar(context, _("Time Remaining: {0}", formattedCountDown(queuedGem.remainingTimeAfterCatalysts())), extradarkgreydot, blackdot, this.forgeQueuePane.contentWidth * .11, drawY, this.forgeQueuePane.contentWidth * .60, barHeight, "#FFFFFF", queuedGem.percentComplete());
            queudRenderIndex += queuedGem.forgeWorkloadBase;
            this.forgeQueuePane.getHitboxById("applyCatalystButton_" + index).boundingBox.y = drawY * this.forgeQueuePane.scale;
            for(var i = 0; i < queuedGem.numCatalystsApplied; i++)
            {
                drawY = this.forgeQueuePane.boundingBox.height * .07 + (this.forgeQueuePane.boundingBox.height * queudRenderIndex * .09);
                context.drawImage(forgeCatalystAsset, 0, 0, forgeCatalystAsset.width, forgeCatalystAsset.height, this.forgeQueuePane.contentWidth * .15, drawY - this.forgeQueuePane.boundingBox.height * .01, this.forgeQueuePane.contentWidth * .055, this.forgeQueuePane.boundingBox.height * .07);
                renderProgressBar(context, _("Catalyst"), blackdot, blackdot, this.forgeQueuePane.contentWidth * .21, drawY, this.forgeQueuePane.contentWidth * .50, this.forgeQueuePane.boundingBox.height * .05, "#FFFFFF", 1);
                queudRenderIndex++;
            }
        });
        if(this.forgeQueuePane.hitboxes.length != 1 + GemForger.forgeQueue.queuedGems.length)
        {
            this.initializeQueueHitboxes();
        }
        this.forgeQueuePane.renderChildren();
    }
}