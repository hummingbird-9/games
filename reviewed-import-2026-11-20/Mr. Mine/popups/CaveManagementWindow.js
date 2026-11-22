class CaveManagementWindow extends BottomTabbedPopup
{
    layerName = "caveManagement"; // Used as key in activeLayers
    domElementId = "CAVESYSTEMD"; // ID of dom element that gets shown or hidden
    context = CAVESYSTEM;         // Canvas rendering context for popup
    frameWidthFraction = 0.03;
    frameHeightFraction = 0.037;
    frameRightShadowFraction = 0.01;
    frameBottomShadowFraction = 0.05;

    lastRenderTreasureLength = -1;

    constructor(boundingBox)
    {
        super(boundingBox);
        this.popupFrameImage = caveManagerFrame;
        this.backgroundImage = popupBackground;
        this.context.imageSmoothingEnabled = true;
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        if (typeof(xmasFrame) != "undefined")
        {
            this.topFrameImage = xmasFrame;
            this.backgroundImage = snowBG;
        }

        this.initializeTabs([_("Caves"), _("Treasure"), _("Drones")]);
        this.initializeTabNotifications([
            [notificationManager.NOTIFICATION_IDS.canSendDrone],
            [notificationManager.NOTIFICATION_IDS.isCaveTreasureAvailable],
            [notificationManager.NOTIFICATION_IDS.canUpgradeDrone]
        ]);
        this.initializeCaveList();
        this.treasureScrollbox = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width * 0.95 - 15,
            1,
            this.context,
            this.bodyContainer.boundingBox.x + this.bodyContainer.boundingBox.width * 0.025,
            this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.1,
            this.bodyContainer.boundingBox.width * 0.95,
            this.bodyContainer.boundingBox.height * 0.9,
            15
        );
        this.treasureScrollbox.addHitbox(new EasyHintArrow(
            "right",
            () => !hasCollectedTreasure
        ))
        this.treasureScrollbox.scrollTo(0);
        this.treasureScrollbox.isVisible = () => this.currentTabIndex == 1;
        this.treasureScrollbox.isEnabled = () => this.currentTabIndex == 1;
        this.addHitbox(this.treasureScrollbox);

        this.blueprintPaneDefaultWidth = this.bodyContainer.boundingBox.width * 0.4;
        this.blueprintPane = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width,
            0,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height * 0.26,
            15,
        );
        this.blueprintPane.isVisible = () => (this.currentTabIndex == 2 && !this.selectedBlueprint);
        this.blueprintPane.isEnabled = () => (this.currentTabIndex == 2 && !this.selectedBlueprint);
        this.addHitbox(this.blueprintPane);
        this.craftingPane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.bodyContainer.boundingBox.width,
                height: this.bodyContainer.boundingBox.height
            },
            {},
            "",
            "craftingPane"
        )
        this.craftingPane.isVisible = () => (this.currentTabIndex == 2 && this.selectedBlueprint);
        this.craftingPane.isEnabled = () => (this.currentTabIndex == 2 && this.selectedBlueprint);
        this.craftingPane.render = function ()
        {
            var context = this.parent.parent.context;
            var coords = this.getRelativeCoordinates(0, 0, this.parent.parent);
            context.save();
            context.fillStyle = "#444444";
            context.fillRect(coords.x, coords.y, 3, this.boundingBox.height);
            this.renderChildren();
        }
        this.craftingPane.allowBubbling = true;
        this.bodyContainer.addHitbox(this.craftingPane);
        this.initializeBlueprintList();
        this.initializeCraftingPane();
        this.onTabChange();
    }

    onTabChange()
    {
        this.selectedBlueprint = null;
        if (this.currentTabIndex == 0)
        {
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.canSendDrone);
        }
        else if (this.currentTabIndex == 1)
        {
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.isCaveTreasureAvailable);
        }
        else if (this.currentTabIndex == 2)
        {
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.canUpgradeDrone);
        }
    }

    render()
    {
        this.clearCanvas();
        if(treasureStorage.treasure.length != this.lastRenderTreasureLength)
        {
            this.generateTreasureScrollboxContents();
        }
        this.renderChildren();
        if(this.currentTabIndex == 0)
        {
            this.context.save();
            this.context.fillStyle = "#FFFFFF";
            this.context.font = "24px KanitM";
            this.context.textBaseline = "top";
            fillTextWrap(
                this.context,
                _("Active Caves"),
                this.bodyContainer.boundingBox.x,
                this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.01,
                this.bodyContainer.boundingBox.width,
                "center"
            );
            this.context.restore();
        }
        else if (this.currentTabIndex == 1)
        {
            this.context.save();
            this.context.fillStyle = "#FFFFFF";
            this.context.font = "24px KanitM";
            this.context.textBaseline = "top";
            fillTextWrap(
                this.context,
                _("Stored Treasure"),
                this.bodyContainer.boundingBox.x,
                this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.01,
                this.bodyContainer.boundingBox.width,
                "center"
            );
            this.context.restore();
        }
        else
        {
            // this.blueprintPane.clearCanvas();
            // this.blueprintPane.render();
            this.blueprintPane.renderChildren();
        }
    }

    initializeCaveList()
    {
        this.caveList = new Hitbox(
            {
                x: this.bodyContainer.boundingBox.x,
                y: this.bodyContainer.boundingBox.y + this.bodyContainer.boundingBox.height * 0.02,
                width: this.bodyContainer.boundingBox.width,
                height: this.bodyContainer.boundingBox.height * 0.97,
            },
            {},
            ""
        );
        var lineHeightFraction = 1 / MAX_CAVE_SYSTEMS_AT_A_TIME;
        this.caveList.id = "caveList";
        this.caveList.allowBubbling = true;
        this.addHitbox(this.caveList);
        this.caveList.isVisible = () => this.currentTabIndex == 0;
        this.caveList.isEnabled = () => this.currentTabIndex == 0;
        for(var i = 0; i < MAX_CAVE_SYSTEMS_AT_A_TIME; ++i)
        {
            var lineYCoordinate = (this.caveList.boundingBox.height * (.07 + (lineHeightFraction * i))) - 2;
            var newLine = this.caveList.addHitbox(new Hitbox(
                {
                    x: 0,
                    y: lineYCoordinate,
                    width: this.caveList.boundingBox.width,
                    height: this.caveList.boundingBox.height * lineHeightFraction
                },
                {
                    onmousedown: function (caveIndex)
                    {
                        var activeCaves = getActiveCaves();
                        if(caveIndex < activeCaves.length)
                        {
                            if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                            changeViewedDepth(activeCaves[caveIndex].kmDepth - currentlyViewedDepth + 2);
                            openUi(CaveWindow, null, activeCaves[caveIndex].kmDepth);
                        }
                    }.bind(this, i)
                },
                "pointer"
            ));
            newLine.isEnabled = function (caveIndex)
            {
                var activeCaves = getActiveCaves();
                return caveIndex < activeCaves.length && activeCaves[caveIndex].isActive
            }.bind(this, i);

            newLine.render = function (root, i)
            {
                var coords = this.getRelativeCoordinates(0, 0, root);
                var context = root.context;
                context.globalAlpha = 0.5;
                if(i % 2 == 0)
                {
                    context.fillStyle = "#000000";
                    context.fillRect(
                        coords.x,
                        coords.y,
                        this.boundingBox.width,
                        this.boundingBox.height,
                    );
                }
                context.globalAlpha = 1;
                var barHeight = this.boundingBox.height;
                context.font = "15px Verdana";
                context.textBaseline = "middle";
                var activeCaves = getActiveCaves();
                if(i < activeCaves.length)
                {
                    var cave = activeCaves[i];
                    var colSpacing = this.boundingBox.width * 0.02;
                    var firstColWidth = this.boundingBox.width * 0.2;
                    var secondColWidth = this.boundingBox.width * 0.38;
                    var thirdColWidth = secondColWidth;
                    var fuelBarWidth = this.boundingBox.width / 3.5;
                    context.fillStyle = "#FFFFFF";
                    fillTextShrinkToFit(
                        context,
                        cave.kmDepth + "km",
                        coords.x,
                        coords.y + barHeight / 2,
                        firstColWidth,
                        "center"
                    );
                    renderFancyProgressBar(
                        context,
                        _("Time Remaining: {0}", formattedCountDown(cave.remainingSeconds)),
                        cave.remainingSeconds / cave.totalDuration,
                        coords.x + firstColWidth + colSpacing,
                        coords.y + barHeight * 0.075,
                        secondColWidth,
                        barHeight * 0.85,
                        "#7F7F7F",
                        "#000000",
                        "#FFFFFF",
                        timerFrame
                    );
                    renderFancyProgressBar(
                        context,
                        _("Fuel: {0}/{1}", Math.floor(cave.currentFuel), caveMaxFuelStructure.statValueForCurrentLevel()),
                        cave.currentFuel / caveMaxFuelStructure.statValueForCurrentLevel(),
                        coords.x + firstColWidth + secondColWidth + 2 * colSpacing,
                        coords.y + barHeight * 0.075,
                        thirdColWidth,
                        barHeight * 0.85,
                        "#5EB65D",
                        "#000000",
                        "#FFFFFF",
                        timerFrame
                    );
                    this.renderChildren();
                }
                else if(i == 0)
                {
                    context.textBaseline = "middle";
                    context.fillStyle = "#FFFFFF";
                    fillTextShrinkToFit(
                        context,
                        _("Any caves that spawn will be listed here"),
                        coords.x,
                        coords.y + this.boundingBox.height / 2,
                        this.boundingBox.width,
                        "center"
                    )
                }
            }.bind(newLine, this, i);
            // newLine.addHitbox(new Button(
            //     closei, "", "", "",
            //     {
            //         x: newLine.boundingBox.height * 0.075,
            //         y: newLine.boundingBox.height * 0.075,
            //         width: newLine.boundingBox.height * 0.85,
            //         height: newLine.boundingBox.height * 0.85
            //     },
            //     {
            //         onmousedown: function (i)
            //         {
            //             var activeCaves = getActiveCaves();
            //             if(i < activeCaves.length && confirm(_("Are you sure you want to collapse this cave? Any uncollected treasure will be lost.")))
            //             {
            //                 for(var j in caves)
            //                 {
            //                     if(caves[j] == activeCaves[i])
            //                     {
            //                         caves[j] = createCaveSystem(0, 0, 1)
            //                         caves[j].isActive = false;
            //                     }
            //                 }
            //             }
            //         }.bind(this, i),
            //         onmouseenter: function ()
            //         {
            //             var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
            //             showTooltip(
            //                 _("Collapse Cave"),
            //                 "",
            //                 coords.x * uiScaleX,
            //                 coords.y * uiScaleY
            //             );
            //         }.bind(newLine),
            //         onmouseexit: function ()
            //         {
            //             hideTooltip();
            //         }
            //     },
            //     'pointer',
            //     "closeButton"
            // ));
        }
    }

    getIngredientListWithDiscounts(ingredients)
    {
        var discountedIngredients = {};
        for(var i in ingredients)
        {
            discountedIngredients[i] = {
                item: ingredients[i].item,
                quantity: getDiscountedIngredientQuantity(ingredients[i])
            }
        }
        return discountedIngredients;
    }

    generateTreasureScrollboxContents()
    {
        this.lastRenderTreasureLength = treasureStorage.treasure.length;
        var box = this.treasureScrollbox;
        var slotSize = 42;
        var iconSize = 30;
        var padding = 10;
        box.clearHitboxes();
        box.context.save();
        box.context.clearRect(0, 0, box.contentWidth, box.contentWidth);
        var slotsPerRow = Math.min(9, Math.floor((box.contentWidth - padding * 2) / slotSize));
        var totalRows = Math.max(2, Math.ceil(MAX_STORED_TREASURE / slotsPerRow));
        var slotSpacingX = ((box.contentWidth - padding * 2) - (slotSize * slotsPerRow)) / (slotsPerRow - 1);
        var slotSpacingY = slotSpacingX / 3;
        box.contentHeight = totalRows * slotSize + (totalRows - 1) * slotSpacingY + 1;
        box.initializeScrollbar();
        box.canvas.height = box.contentHeight;
        box.setScale();
        for(var i = 0; i < MAX_STORED_TREASURE; ++i)
        {
            var indexInRow = i % slotsPerRow;
            var slotX = padding + indexInRow * (slotSize + slotSpacingX);
            var slotY = Math.floor(i / slotsPerRow) * (slotSize + slotSpacingY);
            box.context.fillStyle = "#000000";
            box.context.globalAlpha = 0.5;
            box.context.fillRect(slotX, slotY, slotSize, slotSize);
            box.context.globalAlpha = 1;
            if(i < treasureStorage.treasure.length)
            {
                var item = treasureStorage.treasure[i];
                // box.context.imageSmoothingEnabled = false;
                drawImageFitInBox(
                    box.context,
                    item.icon,
                    slotX + (slotSize - iconSize) / 2,
                    slotY + (slotSize - iconSize) / 2,
                    iconSize,
                    iconSize
                );
                box.addHitbox(new Hitbox(
                    {
                        x: slotX,
                        y: slotY,
                        width: slotSize,
                        height: slotSize,
                    },
                    {
                        onmousedown: function (item, index)
                        {
                            treasureStorage.grantAndRemove(index);
                        }.bind(this, item, i),
                        onmouseenter: function (item, x, y)
                        {
                            var coords = this.getGlobalCoordinates(x, y + slotSize);
                            showTooltip(
                                item.getName(),
                                "",
                                coords.x * uiScaleX,
                                coords.y * uiScaleY
                            );
                        }.bind(this.treasureScrollbox, item, slotX, slotY),
                        onmouseexit: function ()
                        {
                            hideTooltip();
                        }
                    },
                    "pointer"
                )
                );
            }
            box.context.drawImage(
                itemFrame,
                slotX,
                slotY,
                slotSize,
                slotSize
            );
        }
        box.context.restore();
        box.scrollTo(0);
    }

    initializeBlueprintList()
    {
        var parentHitbox = this.blueprintPane;
        parentHitbox.clearHitboxes();
        this.blueprintListHitboxes = [];
        this.generateMenuContents(this.blueprintPane);
        parentHitbox.isDirty = true;
        // parentHitbox.render();
        // this.render();
    }

    generateMenuContents(scrollbox)
    {
        var slotSize = 56;
        var padding = 3;
        scrollbox.context.save();
        scrollbox.context.clearRect(0, 0, scrollbox.canvas.width, scrollbox.canvas.height);
        var craftCategory = craftingCategories.droneUpgrades;
        var blueprintList = getKnownBlueprints();
        var blueprintsInCategory = filterBlueprintsByCategory(blueprintList, craftCategory);
        var slotsPerRow = Math.floor((scrollbox.boundingBox.width - padding * 2 - 15) / slotSize);
        var totalRows = Math.ceil(blueprintsInCategory / slotsPerRow);
        var slotSpacing = ((scrollbox.boundingBox.width - padding * 2 - 15) - (slotSize * slotsPerRow)) / (slotsPerRow - 1);
        scrollbox.contentHeight = totalRows * (slotSize + slotSpacing) + 2 * padding;
        for(var i = 0; i < blueprintsInCategory.length; ++i)
        {
            var indexInRow = i % slotsPerRow;
            var slotX = padding + indexInRow * (slotSize + slotSpacing);
            var slotY = padding + Math.floor(i / slotsPerRow) * (slotSize + slotSpacing);
            var blueprint = blueprintsInCategory[i];
            scrollbox.context.globalAlpha = 0.5;
            scrollbox.context.fillStyle = "#000000";
            scrollbox.context.fillRect(
                slotX,
                slotY,
                slotSize,
                slotSize
            );
            scrollbox.context.globalAlpha = 1;
            drawImageFitInBox(
                scrollbox.context,
                blueprint.craftedItem.item.getIcon(),
                slotX,
                slotY,
                slotSize - 6,
                slotSize - 6
            );
            drawImageFitInBox(
                scrollbox.context,
                itemFrame,
                slotX,
                slotY,
                slotSize,
                slotSize
            );
            if(this.selectedBlueprintIndex == i)
            {
                scrollbox.context.strokeStyle = "#76E374";
                scrollbox.context.lineWidth = 3;
                scrollbox.context.beginPath();
                scrollbox.context.strokeRect(
                    slotX + scrollbox.context.lineWidth,
                    slotY + scrollbox.context.lineWidth,
                    slotSize - 2 * scrollbox.context.lineWidth,
                    slotSize - 2 * scrollbox.context.lineWidth
                );
                scrollbox.context.stroke();
            }
            var blueprintHitbox = new Hitbox(
                {
                    x: slotX,
                    y: slotY,
                    width: slotSize,
                    height: slotSize
                },
                {
                    onmousedown: function (blueprint, i)
                    {
                        this.selectedBlueprint = blueprint;
                        if(blueprint.hasOwnProperty("levels"))
                        {
                            var nextLevel = 1 + this.selectedBlueprint.craftedItem.item.getCurrentLevel();
                            if(!blueprint.craftedItem.item.isAtMaxLevel())
                            {
                                this.discountedIngredients = this.getIngredientListWithDiscounts(blueprint.levels[nextLevel].ingredients);
                            }
                            else
                            {
                                this.discountedIngredients = null;
                            }
                        }
                        this.initializeCraftingPane();
                    }.bind(this, blueprint, i),
                    onmouseenter: function (blueprint, x, y)
                    {
                        var coords = this.getGlobalCoordinates(x, y);
                        // showTooltip(
                        //     blueprint.craftedItem.item.getName(),
                        //     blueprint.craftedItem.item.getDescription(),
                        //     coords.x * uiScaleX,
                        //     coords.y * uiScaleY
                        // );
                    }.bind(scrollbox, blueprint, slotX, slotY + slotSize),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer"
            );
            scrollbox.addHitbox(blueprintHitbox, true);
            var highlight = new EasyHintHighlight(function(blueprint)
            {
                return this.selectedBlueprint == null && canCraftBlueprint(blueprint.category, blueprint.id, -1);
            }.bind(this, blueprint));
            highlight.root = this;
            highlight.rootContext = this.context;
            highlight.fillRelativeAlpha = 0.3;
            highlight.highlightColor = "#71f06e";
            blueprintHitbox.addHitbox(highlight);
        }
        scrollbox.context.restore();
    }

    initializeCraftingPane()
    {
        if(this.selectedBlueprint)
        {
            if(this.currentTabIndex == 2)
            {
                if(this.selectedBlueprint.hasOwnProperty("levels"))
                {
                    var currentLevel = this.selectedBlueprint.craftedItem.item.getCurrentLevel() + 1;
                    if(!this.selectedBlueprint.craftedItem.item.isAtMaxLevel())
                    {
                        this.discountedIngredients = this.getIngredientListWithDiscounts(this.selectedBlueprint.levels[currentLevel].ingredients);
                    }
                    else
                    {
                        this.discountedIngredients = null;
                    }
                }
            }

            if(isBlueprintUnseen(this.selectedBlueprint.category, this.selectedBlueprint.id))
            {
                flagBlueprintAsSeen(this.selectedBlueprint.category, this.selectedBlueprint.id);
            }
            this.initializeBlueprintList();
            this.craftingPane.clearHitboxes();
            var isSelectedBlueprintKnown = isBlueprintKnown(
                this.selectedBlueprint.category,
                this.selectedBlueprint.id
            );
            var isSelectedBlueprintAvailable = isBlueprintAvailable(
                this.selectedBlueprint.category,
                this.selectedBlueprint.id
            );
            var xPadding = 20;
            var yPadding = this.boundingBox.height * 0.07;
            var iconSize = Math.min(85, Math.ceil(this.boundingBox.height * 0.16));
            var titleBoxPadding = iconSize / 10;
            var blueprintNameBox = new Hitbox(
                {
                    x: 0,
                    y: 0,
                    width: this.craftingPane.boundingBox.width,
                    height: iconSize + 2 * titleBoxPadding
                },
                {},
                "",
                "blueprintNameBox"
            );
            blueprintNameBox.render = function (parentWindow)
            {
                var context = parentWindow.getContext();
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                context.save();
                context.globalAlpha = 0.6;
                context.fillStyle = "#111111";
                context.fillRect(relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                context.globalAlpha = 1;
                var fontSize = iconSize;
                context.font = fontSize + "px KanitM";
                context.fillStyle = "#FFFFFF";
                context.textBaseline = "top";
                fillTextWrapWithHeightLimit(
                    context,
                    parentWindow.selectedBlueprint.craftedItem.item.getName(),
                    relativeCoords.x + 2 * iconSize + titleBoxPadding * 5,
                    relativeCoords.y + titleBoxPadding,
                    this.boundingBox.width - 2 * iconSize - titleBoxPadding * 6,
                    this.boundingBox.height - 2 * titleBoxPadding,
                    "left",
                    0.25,
                    "center"
                );
                context.restore();
                this.renderChildren();
            }.bind(blueprintNameBox, this);
            blueprintNameBox.allowBubbling = true;
            var backButton = new Button(
                backButtonIcon, "", "", "",
                {
                    x: titleBoxPadding,
                    y: titleBoxPadding,
                    width: iconSize,
                    height: iconSize
                },
                {
                    onmousedown: function ()
                    {
                        this.selectedBlueprint = null;
                    }.bind(this)
                },
                'pointer',
                "closeButton"
            )
            backButton.isVisible = () => this.selectedBlueprint != null;
            backButton.isEnabled = () => this.selectedBlueprint != null;
            blueprintNameBox.addHitbox(backButton);
            var blueprintIcon = new Hitbox(
                {
                    x: iconSize + 2 * titleBoxPadding,
                    y: titleBoxPadding,
                    width: iconSize,
                    height: iconSize
                },
                {
                    onmouseenter: function (blueprint, x, y)
                    {
                        var coords = this.getGlobalCoordinates(x, y);
                        var rawIngredients = getRawIngredientsForBlueprint(blueprint);
                        var ingredientsString = _("Requires") + ":<br>";
                        for(var i in rawIngredients)
                        {
                            ingredientsString += i + ": " + rawIngredients[i] + "<br>";
                        }
                        showTooltip(
                            _(blueprint.craftedItem.item.getName()),
                            blueprint.craftedItem.item.getDescription(),
                            coords.x * uiScaleX,
                            coords.y * uiScaleY
                        );
                    }.bind(blueprintNameBox, this.selectedBlueprint, titleBoxPadding, titleBoxPadding + iconSize),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer",
                "blueprintIcon"
            );
            blueprintIcon.render = function (parentWindow)
            {
                var context = this.getContext();
                var blueprint = parentWindow.selectedBlueprint;
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                drawImageFitInBox(context, blueprint.craftedItem.item.getIcon(), relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                context.drawImage(itemFrame, relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                if(blueprint.category != 1 && blueprint.craftedItem.item.getQuantityOwned() > -1)
                {
                    context.fillStyle = "#FFFFFF";
                    var fontSize = Math.min(16, this.boundingBox.height * 0.07);
                    context.font = fontSize + "px KanitM";
                    context.textBaseline = "bottom";
                    strokeTextShrinkToFit(
                        parentWindow.context,
                        blueprint.craftedItem.item.getCurrentLevel() + 1,
                        relativeCoords.x,
                        relativeCoords.y + iconSize,
                        this.boundingBox.height,
                        "right"
                    );
                    fillTextShrinkToFit(
                        parentWindow.context,
                        blueprint.craftedItem.item.getCurrentLevel() + 1,
                        relativeCoords.x,
                        relativeCoords.y + iconSize,
                        this.boundingBox.height,
                        "right"
                    );
                }


            }.bind(blueprintIcon, this);
            var ingredientsFontSize = Math.min(26, this.boundingBox.height * 0.07);
            var blueprintIngredientsBox = new Hitbox(
                {
                    x: xPadding,
                    y: blueprintNameBox.boundingBox.y + blueprintNameBox.boundingBox.height + titleBoxPadding,
                    width: this.boundingBox.width - 2 * xPadding,
                    height: titleBoxPadding * 4 + iconSize * 2 + ingredientsFontSize * 2
                },
                {}, "", "ingredients"
            );
            blueprintIngredientsBox.render = function (parentWindow)
            {
                var context = this.getContext();
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                context.save();
                context.textBaseline = "top";
                context.fillStyle = "#FFFFFF";
                context.font = ingredientsFontSize + "px KanitB";
                fillTextWrap(context, _("Blueprint"), relativeCoords.x, relativeCoords.y, parentWindow.boundingBox.width);
                context.font = ingredientsFontSize + "px KanitM";
                
                fillTextWrapWithHeightLimit(
                    context,
                    parentWindow.selectedBlueprint.craftedItem.item.getDescription(),
                    relativeCoords.x - titleBoxPadding / 2,
                    relativeCoords.y + ingredientsFontSize,
                    parentWindow.boundingBox.width / 2,
                    parentWindow.boundingBox.height * 0.4,
                    "left",
                    0.25
                );
                context.globalAlpha = 0.6;
                context.fillStyle = "#111111";
                context.fillRect(
                    relativeCoords.x + blueprintIngredientsBox.boundingBox.width * 0.55,
                    relativeCoords.y,
                    blueprintIngredientsBox.boundingBox.width * 0.5,
                    this.boundingBox.height * 0.8
                );
                context.restore();
                this.renderChildren();
            }.bind(blueprintIngredientsBox, this);

            var boxArea = (blueprintIngredientsBox.boundingBox.height * 0.8 - 10 * titleBoxPadding) * (blueprintIngredientsBox.boundingBox.width * 0.5 - 12 * titleBoxPadding);
            var ingredientIconSize = iconSize * 0.75;
            var slotsPerRow = Math.max(
                1,
                Math.floor((blueprintIngredientsBox.boundingBox.width * 0.5 - titleBoxPadding * 2) / ingredientIconSize)
            );
            var slotSpacing;
            if(slotsPerRow == 1)
            {
                slotSpacing = 0;
            }
            else
            {
                slotSpacing = titleBoxPadding;
            }

            if(isSelectedBlueprintKnown || isSelectedBlueprintAvailable)
            {
                var yOffset = 0;
                for(var i in this.discountedIngredients)
                {
                    var indexInRow = i % slotsPerRow;
                    var slotX = blueprintIngredientsBox.boundingBox.width * 0.55 + titleBoxPadding + indexInRow * (ingredientIconSize + slotSpacing);
                    var slotY = titleBoxPadding + Math.floor(i / slotsPerRow) * (ingredientIconSize + slotSpacing);
                    var ingredientIcon = new Hitbox(
                        {
                            x: slotX,
                            y: slotY + yOffset,
                            width: ingredientIconSize,
                            height: ingredientIconSize
                        },
                        {
                            onmousedown: function (blueprint)
                            {
                                if(blueprint)
                                {
                                    if(blueprint.category != this.currentTabIndex)
                                    {
                                        this.blueprintPane.scrollTo(0);
                                        this.currentTabIndex = blueprint.category + 1;
                                        this.initializeBlueprintList();
                                    }
                                    this.selectedBlueprint = blueprint;
                                    this.discountedIngredients = this.getIngredientListWithDiscounts(blueprint.ingredients);
                                    this.initializeCraftingPane();
                                }
                            }.bind(this, getBlueprintForCraftingItem(this.discountedIngredients[i].item, true)),
                            onmouseenter: function (ingredient, x, y)
                            {
                                var coords = this.getGlobalCoordinates(x, y);
                                showTooltip(
                                    _(ingredient.item.getName()),
                                    _("Owned: {0}<br>Required: {1}", beautifynum(ingredient.item.getQuantityOwned()), beautifynum(ingredient.quantity)),
                                    coords.x * uiScaleX,
                                    coords.y * uiScaleY
                                );
                            }.bind(blueprintIngredientsBox, this.discountedIngredients[i], slotX, slotY + ingredientIconSize + ingredientsFontSize),
                            onmousedown: function (ingredient)
                            {
                                var itemID = ingredient.item.id;
                                var isMineral = mineralIds.includes(itemID);
                                var isIsotope = isotopeIds.includes(itemID);
                                if(isIsotope && getDepthMineralIsFoundAt(itemID) == 99999 && itemID > highestIsotopeUnlocked)
                                {
                                    var bombardment = getBombardmentForIsotope(ingredient.item.id);
                                    if(depth >= 1134 && bombardment)
                                    {
                                        openUi(ReactorWindow, null, 1);
                                        activeLayers.Reactor.selectedBlueprint = getBlueprintById(6, bombardment.index - 1);
                                        activeLayers.Reactor.blueprintListHitboxes[5].toggle();
                                        activeLayers.Reactor.initializeCraftingPane();
                                    }
                                }
                                else if(managerStructure.level > 0 && (isMineral || isIsotope))
                                {
                                    var confirmationMessage = "";
                                    if(lockedMineralAmtsToSave[ingredient.item.id] > 0)
                                    {
                                        confirmationMessage += _("\n You're currently preventing {0} {1} from being sold. ", beautifynum(lockedMineralAmtsToSave[ingredient.item.id]), ingredient.item.getName());
                                    }
                                    confirmationMessage += _("Are you sure you want to prevent {0} {1} from being sold?", beautifynum(ingredient.quantity), ingredient.item.getName());
                                    showConfirmationPrompt(
                                        confirmationMessage,
                                        _("Yes"),
                                        function ()
                                        {
                                            lockedMineralAmtsToSave[ingredient.item.id] = ingredient.quantity;
                                            hideSimpleInput();
                                        },
                                        _("Cancel")
                                    )
                                }
                            }.bind(blueprintIngredientsBox, this.discountedIngredients[i]),
                            onmouseexit: function ()
                            {
                                hideTooltip();
                            }
                        },
                        "pointer"
                    )
                    ingredientIcon.render = function (parentWindow, ingredient)
                    {
                        var context = this.getContext();
                        var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                        drawImageFitInBox(context, ingredient.item.getIcon(), relativeCoords.x, relativeCoords.y, ingredientIconSize, ingredientIconSize);
                        context.fillStyle = "#FFFFFF";
                        var fontSize = Math.min(16, parentWindow.boundingBox.height * 0.07);
                        context.font = fontSize + "px KanitM";
                        context.textBaseline = "alphabetic";
                        context.lineWidth = 3;
                        context.strokeStyle = "#000000";
                        var barHeight = 0.2 * (this.boundingBox.height);
                        var percentQuantity = ingredient.item.percentageOfQuantity(ingredient.quantity);
                        renderFancyProgressBar(
                            context,
                            "",
                            percentQuantity,
                            relativeCoords.x,
                            relativeCoords.y + this.boundingBox.height - barHeight,
                            this.boundingBox.width,
                            barHeight,
                            percentQuantity >= 1 ? "#5EB65D" : "#c24242",
                            "#000000",
                            "#FFFFFF",
                            timerFrame
                        );
                        strokeTextShrinkToFit(
                            context,
                            ingredient.item.getFormattedQuantity(ingredient.quantity),
                            relativeCoords.x,
                            relativeCoords.y + ingredientIconSize - barHeight,
                            ingredientIconSize * 0.95,
                            "right"
                        );
                        fillTextShrinkToFit(
                            context,
                            ingredient.item.getFormattedQuantity(ingredient.quantity),
                            relativeCoords.x,
                            relativeCoords.y + ingredientIconSize - barHeight,
                            ingredientIconSize * 0.95,
                            "right"
                        );
                        if(ingredient.item.hasQuantity(ingredient.quantity))
                        {
                            // drawImageFitInBox(context, checkmark, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                            renderCheckmark(context, relativeCoords.x, relativeCoords.y, ingredientIconSize / 5, ingredientIconSize / 5);
                        }
                        else
                        {
                            // drawImageFitInBox(context, xmark, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                            renderXMark(context, relativeCoords.x, relativeCoords.y, ingredientIconSize / 5, ingredientIconSize / 5);
                        }
                    }.bind(ingredientIcon, this, this.discountedIngredients[i]);
                    blueprintIngredientsBox.addHitbox(ingredientIcon);
                }
            }
            var craftButton = new Hitbox(
                {
                    x: blueprintNameBox.boundingBox.x + blueprintNameBox.boundingBox.width * 0.05,
                    y: (this.craftingPane.boundingBox.height * .9) - yPadding,
                    width: blueprintNameBox.boundingBox.width * 0.9,
                    height: this.craftingPane.boundingBox.height * 0.15
                },
                {
                    onmousedown: function ()
                    {
                        var level = this.selectedBlueprint.craftedItem.item.getCurrentLevel();
                        if(craftBlueprint(this.selectedBlueprint.category, this.selectedBlueprint.id, level + 1, this.discountedIngredients))
                        {
                            newNews(_("You crafted {0}", this.selectedBlueprint.craftedItem.item.getName()), true);
                            if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }
                        this.initializeCraftingPane();
                    }.bind(this),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer",
                "craftButton"
            )
            craftButton.onmouseenter = function (parentWindow)
            {
                if(parentWindow.currentTabIndex == 0 && !canCraftBlueprint(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id, 0, parentWindow.discountedIngredients))
                {
                    var coords = this.getGlobalCoordinates(0, this.boundingBox.height);
                    showTooltip(getBlueprintNotCraftableReason(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id), "", coords.x, coords.y);
                }
            }.bind(craftButton, this);
            craftButton.render = function (parentWindow)
            {
                var context = parentWindow.context;
                context.save();
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                if(parentWindow.currentTabIndex == 0)
                {
                    if((isSelectedBlueprintKnown && canCraftBlueprint(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id, 0, parentWindow.discountedIngredients)))
                    {
                        context.drawImage(upgradeb, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                        context.fillStyle = "#000000";
                    }
                    else
                    {
                        context.drawImage(upgradebg_blank, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                        context.fillStyle = "#444444";
                    }
                }
                else if(parentWindow.currentTabIndex == 2)
                {
                    var nextLevel = parentWindow.selectedBlueprint.craftedItem.item.getCurrentLevel() + 1;
                    if((isSelectedBlueprintKnown && canCraftBlueprint(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id, nextLevel, parentWindow.discountedIngredients)))
                    {
                        context.drawImage(upgradeb, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                        context.fillStyle = "#000000";
                    }
                    else
                    {
                        context.drawImage(upgradebg_blank, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                        context.fillStyle = "#444444";
                    }
                }
                context.textBaseline = "middle";
                var buttonText;
                if(parentWindow.currentTabIndex == 0)
                {
                    if(drillState.equippedDrillEquips.indexOf(getDrillEquipByBlueprintId(parentWindow.selectedBlueprint.id).id) > -1)
                    {
                        buttonText = _("Equipped");
                        var fontSize = Math.min(26, parentWindow.boundingBox.height * 0.065);
                        context.font = fontSize + "px KanitB";
                    }
                    else
                    {
                        buttonText = _("Upgrade");
                        var fontSize = Math.min(32, parentWindow.boundingBox.height * 0.080);
                        context.font = fontSize + "px KanitB";
                    }
                }
                else if(parentWindow.currentTabIndex == 2)
                {
                    buttonText = _("Upgrade");
                    var fontSize = Math.min(32, parentWindow.boundingBox.height * 0.080);
                    context.font = fontSize + "px KanitB";
                }
                fillTextShrinkToFit(context, buttonText, relativeCoords.x + 10, relativeCoords.y + this.boundingBox.height / 2 + 2, this.boundingBox.width - 20, "center");
                context.restore();
            }.bind(craftButton, this)
            this.craftingPane.addHitbox(blueprintNameBox);
            blueprintNameBox.addHitbox(blueprintIcon);
            this.craftingPane.addHitbox(blueprintIngredientsBox);
            this.craftingPane.addHitbox(craftButton);
            this.isCraftingPaneInitialized = true;
        }
        else
        {
            var instructionsText;
            if(this.currentTabIndex == 0 || this.currentTabIndex == 2)
            {
                if(knownBlueprints.length == 0 || knownBlueprints.length == 1 && knownBlueprints[0] == "")
                {
                    instructionsText = _("You don't own any blueprints. Find more in the mines.");
                }
                else
                {
                    if(isMobile())
                    {
                        instructionsText = _("Tap on a blueprint on the left to craft it");
                    }
                    else
                    {
                        instructionsText = _("Click on a blueprint on the left to craft it");
                    }
                }
            }
            this.craftingPane.clearHitboxes();
            var instructionsHitbox = new Hitbox(
                {
                    x: 20,
                    y: 20,
                    width: this.craftingPane.boundingBox.width - 40,
                    height: this.craftingPane.boundingBox.height - 40,
                },
                {},
                "",
                "instructionsHitbox"
            );
            instructionsHitbox.render = function (parentWindow)
            {
                var coords = this.getRelativeCoordinates(0, 0, parentWindow);
                var context = parentWindow.context;
                context.font = "18px KanitM";
                context.fillStyle = "#FFFFFF";
                context.textBaseline = "middle";
                fillTextWrap(
                    context,
                    instructionsText,
                    coords.x,
                    coords.y + this.boundingBox.height / 2 - 30,
                    this.boundingBox.width
                );
            }.bind(instructionsHitbox, this);
            this.craftingPane.addHitbox(instructionsHitbox);
        }
    }
}