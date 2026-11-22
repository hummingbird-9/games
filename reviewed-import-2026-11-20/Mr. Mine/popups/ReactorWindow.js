class ReactorWindow extends BottomTabbedPopup
{
    layerName = "Reactor"; // Used as key in activeLayers
    domElementId = "REACTORD"; // ID of dom element that gets shown or hidden
    context = REACTOR;         // Canvas rendering context for popup
    widthHeightPerCell;

    reactorGrid;
    inventoryPane;

    blueprintPane;
    blueprintPaneDefaultWidth;
    blueprintListHitboxes;

    craftingPane;
    isCraftingPaneInitialized = false;
    selectedBlueprint;

    craftCategory = 6;

    constructor(boundingBox)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }
        // this.context.imageSmoothingEnabled = false;
        // this.setFrameImagesByWorldIndex(MOON_INDEX);

        var tabCategories = {
            0: _("Reactor"),
            1: _("Craft"),
            2: _("Upgrade"),
        }

        this.initializeTabs(Object.values(tabCategories));
        this.initializeTabNotifications([
            [notificationManager.NOTIFICATION_IDS.hasReactorStopped],
            [notificationManager.NOTIFICATION_IDS.canCraftReactorComponent]
        ])

        this.reactorPane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.boundingBox.width,
                height: this.boundingBox.height
            },
            {},
            "",
            "reactorPane"
        );
        this.reactorPane.allowBubbling = true;
        this.addHitbox(this.reactorPane);

        this.blueprintPaneDefaultWidth = this.bodyContainer.boundingBox.width * 0.4;
        this.blueprintPane = new Scrollbox(
            this.bodyContainer.boundingBox.width - 15,
            this.bodyContainer.boundingBox.height,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            15
        );
        this.blueprintPane.isVisible = () => (this.currentTabIndex == 1 && this.selectedBlueprint == null);
        this.blueprintPane.isEnabled = () => (this.currentTabIndex == 1 && this.selectedBlueprint == null);
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
        this.craftingPane.render = function ()
        {
            var context = this.parent.parent.context;
            var coords = this.getRelativeCoordinates(0, 0, this.parent.parent);
            context.save();
            context.fillStyle = "#444444";
            context.fillRect(coords.x, coords.y, 3, this.boundingBox.height);
            this.renderChildren();
        }
        this.craftingPane.isVisible = () => (this.currentTabIndex == 1 && this.selectedBlueprint != null);
        this.craftingPane.isEnabled = () => (this.currentTabIndex == 1 && this.selectedBlueprint != null);
        this.craftingPane.allowBubbling = true;
        this.bodyContainer.addHitbox(this.craftingPane);
        this.initializeBlueprintList();
        this.initializeCraftingPane();

        this.upgradePane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.boundingBox.width,
                height: this.boundingBox.height
            },
            {},
            "",
            "upgradePane"
        );
        this.upgradePane.allowBubbling = true;
        this.addHitbox(this.upgradePane);

        this.onTabChange();
    }

    onTabChange()
    {
        this.selectedBlueprint = null;
        this.blueprintListHitboxes = [];

        if(this.currentTabIndex == 0)
        {
            this.reactorPane.isVisible = () => true;
            this.reactorPane.isEnabled = () => true;
            this.upgradePane.isEnabled = () => false;
            this.upgradePane.isEnabled = () => false;

            this.initializeReactorHitboxes();
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.hasReactorStopped);
        }
        else if(this.currentTabIndex == 1)
        {
            this.reactorPane.isVisible = () => false;
            this.reactorPane.isEnabled = () => false;
            this.upgradePane.isEnabled = () => false;
            this.upgradePane.isEnabled = () => false;

            this.blueprintPane.scrollTo(0);
            this.initializeBlueprintList();
            this.initializeCraftingPane();
            this.blueprintPane.contentHeight = 1;
            this.blueprintPane.clearCanvas();
            this.blueprintPane.initializeScrollbar();
            notificationManager.markAsSeen(notificationManager.NOTIFICATION_IDS.canCraftReactorComponent);
        }
        else if(this.currentTabIndex == 2)
        {
            this.reactorPane.isVisible = () => false;
            this.reactorPane.isEnabled = () => false;
            this.upgradePane.isEnabled = () => true;
            this.upgradePane.isEnabled = () => true;

            this.initializeReactorUpgradeHitboxes();
        }
    }

    initializeReactorHitboxes()
    {
        this.reactorPane.clearHitboxes();
        this.craftingPane.clearHitboxes();
        this.blueprintPane.clearHitboxes();
        this.upgradePane.clearHitboxes();

        this.widthHeightPerCell = Math.min(
            this.boundingBox.width / MAX_REACTOR_CELLS_COLUMNS,
            this.boundingBox.height * 0.83 / MAX_REACTOR_CELLS_ROWS
        );

        this.reactorGrid = new Hitbox(
            {
                x: this.boundingBox.width / 2 - (this.widthHeightPerCell * MAX_REACTOR_CELLS_COLUMNS / 2),
                y: this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.05,
                width: this.widthHeightPerCell * MAX_REACTOR_CELLS_COLUMNS,
                height: this.widthHeightPerCell * MAX_REACTOR_CELLS_ROWS
            },
            {},
            "",
            "reactorGrid"
        );
        this.reactorGrid.allowBubbling = true;
        this.reactorPane.addHitbox(this.reactorGrid);

        for(var i = 0; i < MAX_REACTOR_CELLS_ROWS; i++)
        {
            for(var j = 0; j < MAX_REACTOR_CELLS_COLUMNS; j++)
            {
                var reactorGridCell = new ReactorGridCell({
                    x: this.widthHeightPerCell * j,
                    y: this.widthHeightPerCell * i,
                    width: this.widthHeightPerCell,
                    height: this.widthHeightPerCell
                }, i, j);
                this.reactorGrid.addHitbox(reactorGridCell);

                if(reactor.grid.grid[i][j] != EMPTY_INTEGER_VALUE)
                {
                    var gridComponent = new ReactorComponentUI({
                        x: 0,
                        y: 0,
                        width: this.widthHeightPerCell,
                        height: this.widthHeightPerCell
                    }, reactor.grid.grid[i][j]);
                    gridComponent.gridSlotX = j;
                    gridComponent.gridSlotY = i;
                    gridComponent.isOnGrid = true;
                    reactorGridCell.addHitbox(gridComponent);
                }
            }
        }
        

        var reactorNotRunningReason = new Hitbox(
            {
                x: this.boundingBox.width * 0.15,  
                y: this.boundingBox.height * 0.88,
                width: this.boundingBox.width * 0.85,
                height: this.boundingBox.height * 0.12
            },
            {},
            '',
            "reactorNotRunningReason"
        );
        reactorNotRunningReason.render = function (root)
        {
            if(root.currentTabIndex == 0 && !reactor.isAbleToRun())
            {
                root.context.save();
                root.context.strokeStyle = "#000000";
                root.context.fillStyle = "#DD5555";
                root.context.textBaseline = "top";
                root.context.lineWidth = 3;
                root.context.font = "20px Verdana";
                var coords = this.getRelativeCoordinates(0, 0, root);
                strokeTextWrapWithHeightLimit(
                    root.context,
                    reactor.getReasonForNotRunning(),
                    coords.x,
                    coords.y,
                    this.boundingBox.width,
                    this.boundingBox.height,
                    "center"
                );
                fillTextWrapWithHeightLimit(
                    root.context,
                    reactor.getReasonForNotRunning(),
                    coords.x,
                    coords.y,
                    this.boundingBox.width,
                    this.boundingBox.height,
                    "center"
                );
                root.context.restore();
            }
        }.bind(reactorNotRunningReason, this);
        reactorNotRunningReason.allowBubbling = true;
        this.addHitbox(reactorNotRunningReason);

        var inventoryButton = new ReactorInventorySlot(
            {
                x: this.boundingBox.width * 0.01,
                y: this.boundingBox.height * 0.89,
                width: this.boundingBox.height * 0.1,
                height: this.boundingBox.height * 0.1
            },
            -1
        );
        inventoryButton.render = function()
        {
            var image = inventoryIcon;
            if(!this.context) this.context = this.getContext();
            this.context.save();
            if(this.isDropCandidate)
            {
                this.context.shadowBlur = 11;
                this.context.shadowColor = "rgba(255, 255, 0, 1)";
            }
            var coords = this.getRelativeCoordinates(0, 0, this.getRootLayer());
            renderButton(
                this.context,
                image,
                "",
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height,
                "",
                ""
            );
            this.context.restore();
        }
        inventoryButton.onmousedown = function(parentWindow)
        {
            parentWindow.inventoryPane.toggle(
                this.boundingBox.x, 
                this.boundingBox.y - parentWindow.inventoryPane.boundingBox.height
            );
        }.bind(inventoryButton, this);

        inventoryButton.isVisible = () => this.currentTabIndex == 0;
        inventoryButton.isEnabled = () => this.currentTabIndex == 0;
        this.addHitbox(inventoryButton);

        this.inventoryPane = new ContextMenu(
            {
                x: 0,
                y: 0,
                width: this.reactorGrid.boundingBox.width * 0.5,
                height: this.reactorGrid.boundingBox.height * 0.89
            },
            "inventoryPane"
        );
        this.reactorPane.addHitbox(this.inventoryPane);
        this.inventoryPane.initialize();
        this.inventoryPane.hide();
        this.inventoryPane.inventorySlots = [];

        var inventoryColumnCount = Math.floor(this.inventoryPane.boundingBox.width / this.widthHeightPerCell);
        var inventoryRowCount = Math.ceil(reactorComponents.length / inventoryColumnCount);

        for(var i = 1; i < reactorComponents.length; i++)
        {
            var typeInSlot = reactor.getTypeForSlot(i);

            var reactorInventorySlot = new ReactorInventorySlot({
                x: ((i - 1) % inventoryColumnCount) * this.widthHeightPerCell,
                y: Math.floor((i - 1) / inventoryColumnCount) * this.widthHeightPerCell,
                width: this.widthHeightPerCell,
                height: this.widthHeightPerCell
            }, i);
            this.inventoryPane.inventorySlots.push(reactorInventorySlot);
            this.inventoryPane.bodyContainer.addHitbox(reactorInventorySlot);

            if(typeInSlot > -1)
            {
                var inventoryComponent = new ReactorComponentUI({
                    x: 0,
                    y: 0,
                    width: this.widthHeightPerCell,
                    height: this.widthHeightPerCell
                }, typeInSlot);
                inventoryComponent.isOnGrid = false;
                reactorInventorySlot.addHitbox(inventoryComponent);
            }
        }

        this.reactorPane.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.1,     // Copied from renderButton call below
                y: this.boundingBox.height * 0.10,
                width: this.boundingBox.width * 0.8,
                height: this.boundingBox.height * 0.04
            },
            {
                onmouseenter: function ()
                {
                    if(!reactor.isAbleToRun())
                    {
                        showTooltip(_("Reactor is unable to run"), reactor.getReasonForNotRunning(), mouseX, mouseY, 180);
                    }
                },
                onmouseexit: function ()
                {
                    hideTooltip();
                }
            },
            'pointer',
            "reactorStats"
        ));
    }

    initializeReactorUpgradeHitboxes()
    {
        this.reactorPane.clearHitboxes();
        this.craftingPane.clearHitboxes();
        this.blueprintPane.clearHitboxes();
        this.upgradePane.clearHitboxes();
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.context.restore();

        if(this.currentTabIndex == 0)
        {
            this.context.imageSmoothingEnabled = true;
            super.render(); // Render any child layers
            // this.context.imageSmoothingEnabled = false;

            //Render the title text
            this.context.save();
            this.context.strokeStyle = "#000000";
            this.context.textBaseline = "top";
            this.context.lineWidth = 3;
            this.context.font = "20px Verdana";
            var titleText = _("Energy/Sec: {0}", beautifynum(reactor.grid.energyProductionRatePerSecond())) + " - " +
                _("Battery: {0}", beautifynum(reactor.currentBatteryCharge()) + "/" + beautifynum(reactor.grid.maxBatteryCapacity()));
            this.context.fillStyle = (reactor.isRunning) ? "#FFFFFF" : "#DD5555";
            var textWidth = this.context.measureText(titleText).width;


            fillTextShrinkToFit(
                this.context,
                titleText,
                this.boundingBox.width * 0.02,
                this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.01,
                this.boundingBox.width * 0.96
            );

            /*this.context.strokeText(
                titleText,
                this.boundingBox.width * .5 - textWidth / 2,
                this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.01
            );
            this.context.fillText(
                titleText,
                this.boundingBox.width * .5 - textWidth / 2,
                this.bodyContainer.boundingBox.y + this.boundingBox.height * 0.01
            );*/
            this.context.restore();
        }

        if(this.currentTabIndex == 1)
        {
            var menuPadding = 2;
            this.context.save();
            this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
            if(isKnownBlueprintsDirty)
            {
                this.initializeBlueprintList();
                isKnownBlueprintsDirty = false;
            }
            if(this.blueprintListHitboxes.length > 0)
            {
                // Update bounding boxes to account for menu expansion
                for(var i = 1; i < this.blueprintListHitboxes.length; ++i)
                {
                    if(this.blueprintListHitboxes[i].boundingBox.y != this.blueprintListHitboxes[i - 1].boundingBox.y + this.blueprintListHitboxes[i - 1].boundingBox.height + menuPadding)
                    {
                        this.blueprintListHitboxes[i].boundingBox.y = this.blueprintListHitboxes[i - 1].boundingBox.y + this.blueprintListHitboxes[i - 1].boundingBox.height + menuPadding;
                    }
                }
                var bottomOfLastMenu = this.blueprintListHitboxes[i - 1].boundingBox.y + this.blueprintListHitboxes[i - 1].boundingBox.height + menuPadding;
                if(bottomOfLastMenu != this.blueprintPane.contentHeight)
                {
                    this.blueprintPane.contentHeight = bottomOfLastMenu;
                    this.blueprintPane.initializeScrollbar();
                    this.blueprintPane.render();
                    this.blueprintPane.scrollTo(this.blueprintPane.currentScrollY);
                }
            }
            this.context.restore();
            super.render();
            this.blueprintPane.renderChildren();
        }

        if(this.currentTabIndex == 2)
        {
            //upgrading
            super.render(); // Render any child layers

            this.context.save();
            this.context.fillStyle = "#FFFFFF";
            this.context.strokeStyle = "#000000";
            this.context.textBaseline = "bottom";
            this.context.lineWidth = 3;

            if(!reactor.isAtMaxLevel())
            {
                var headerText = _("CURRENT");
                var levelText = _("Reactor Level: {0}", reactorStructure.level);
                this.context.font = "bold 20px Verdana";
                this.context.strokeText(headerText, this.boundingBox.width * .25 - this.context.measureText(headerText).width / 2, this.boundingBox.height * .5);
                this.context.fillText(headerText, this.boundingBox.width * .25 - this.context.measureText(headerText).width / 2, this.boundingBox.height * .5);
                this.context.font = "20px Verdana";
                this.context.strokeText(levelText, this.boundingBox.width * .25 - this.context.measureText(levelText).width / 2, this.boundingBox.height * .57);
                this.context.fillText(levelText, this.boundingBox.width * .25 - this.context.measureText(levelText).width / 2, this.boundingBox.height * .57);
                this.drawReactorGrid(this.boundingBox.width * .10, this.boundingBox.height * .14, this.boundingBox.width * .30, this.boundingBox.height * .30, reactorStructure.level);

                var headerText = _("NEXT LEVEL");
                var levelText = _("Reactor Level: {0}", reactorStructure.level + 1);
                this.context.font = "bold 20px Verdana";
                this.context.strokeText(headerText, this.boundingBox.width * .75 - this.context.measureText(headerText).width / 2, this.boundingBox.height * .5);
                this.context.fillText(headerText, this.boundingBox.width * .75 - this.context.measureText(headerText).width / 2, this.boundingBox.height * .5);
                this.context.font = "20px Verdana";
                this.context.strokeText(levelText, this.boundingBox.width * .75 - this.context.measureText(levelText).width / 2, this.boundingBox.height * .57);
                this.context.fillText(levelText, this.boundingBox.width * .75 - this.context.measureText(levelText).width / 2, this.boundingBox.height * .57);
                this.drawReactorGrid(this.boundingBox.width * .60, this.boundingBox.height * .14, this.boundingBox.width * .30, this.boundingBox.height * .30, reactorStructure.level + 1);
            }
            else
            {
                var reactorLevelText = _("You Are At the Max Level");
                this.context.strokeText(reactorLevelText, this.boundingBox.width * .5 - this.context.measureText(reactorLevelText).width / 2, this.boundingBox.height * .4);
                this.context.fillText(reactorLevelText, this.boundingBox.width * .5 - this.context.measureText(reactorLevelText).width / 2, this.boundingBox.height * .4);
            }

            this.context.restore();
        }
    }

    drawReactorGrid(x, y, width, height, level)
    {
        this.context.save();

        this.context.strokeStyle = "#333333";
        this.context.lineWidth = 3;
        for(var i = 0; i < REACTOR_LAYOUTS[level].length; i++)
        {
            for(var j = 0; j < REACTOR_LAYOUTS[level][i].length; j++)
            {
                if(REACTOR_LAYOUTS[level][i][j] == 0)
                {
                    this.context.fillStyle = "#AAAAAA";
                }
                else
                {
                    this.context.fillStyle = "#FFFFFF";
                }
                this.context.fillRect(x + (i * width / MAX_REACTOR_CELLS_ROWS), y + (j * height / MAX_REACTOR_CELLS_COLUMNS), width / MAX_REACTOR_CELLS_ROWS, height / MAX_REACTOR_CELLS_COLUMNS);
                this.context.strokeRect(x + (i * width / MAX_REACTOR_CELLS_ROWS), y + (j * height / MAX_REACTOR_CELLS_COLUMNS), width / MAX_REACTOR_CELLS_ROWS, height / MAX_REACTOR_CELLS_COLUMNS);
            }
        }
        this.context.restore();
    }


    //######################### CRAFTING ##############################

    initializeBlueprintList(openSubcategoryMenus = [])
    {
        var parentHitbox = this.blueprintPane;
        parentHitbox.clearHitboxes();
        for(var i in this.blueprintListHitboxes)
        {
            if(!this.blueprintListHitboxes[i].isCollapsed)
            {
                openSubcategoryMenus.push(i);
            }
        }
        // parentHitbox.context.clearRect(0, 0, parentHitbox.contentWidth, parentHitbox.contentHeight);
        this.blueprintListHitboxes = [];
        var cumulativeHeight = 0;
        var blueprintList;
        if(this.currentTabIndex == 1)
        {
            blueprintList = getKnownBlueprints();
            var blueprintsInCategory = filterBlueprintsByCategory(blueprintList, this.craftCategory);
            blueprintsInCategory = sortBlueprintsBySubcategory(blueprintsInCategory);
        }
        for(var subcategory in blueprintsInCategory)
        {
            //targetCanvasContext, x, y, width, collapsedHeight, expandedHeight, titleText, fontSize, fontColor
            var newMenu = new CollapsibleMenu(
                parentHitbox.context,
                0,
                cumulativeHeight,
                parentHitbox.boundingBox.width - parentHitbox.scrollbarWidth,
                40,
                0,
                subcategory,
                "18px Verdana",
                "#FFFFFF"
            );
            this.generateSubcategoryMenuContents(blueprintsInCategory[subcategory], newMenu);
            this.blueprintListHitboxes.push(newMenu);
            parentHitbox.addHitbox(newMenu);
            cumulativeHeight += newMenu.boundingBox.height;
        }
        if(openSubcategoryMenus.length > 0)
        {
            for(var i in openSubcategoryMenus)
            {
                if(this.blueprintListHitboxes[openSubcategoryMenus[i]])
                {
                    this.blueprintListHitboxes[openSubcategoryMenus[i]].expand();
                }
            }
        }
        else if(this.blueprintListHitboxes.length == 1)
        {
            this.blueprintListHitboxes[0].expand();
        }
        parentHitbox.isDirty = true;
    }

    generateSubcategoryMenuContents(blueprintsInSubcategory, menuHitbox)
    {
        var slotSize = Math.min(50, Math.floor(this.boundingBox.height * 0.117));
        var padding = 3;
        var slotsPerRow = Math.floor((menuHitbox.boundingBox.width - padding * 2) / slotSize);
        var totalRows = Math.ceil(blueprintsInSubcategory.length / slotsPerRow);
        var slotSpacing = ((menuHitbox.boundingBox.width - padding * 2) - (slotSize * slotsPerRow)) / (slotsPerRow - 1);
        menuHitbox.setCanvasHeight(totalRows * (slotSize + slotSpacing) + 2 * padding);
        menuHitbox.expandedHeight = menuHitbox.canvas.height + menuHitbox.collapsedHeight;
        menuHitbox.context.save();
        menuHitbox.showNotificationIcon = false;
        for(var i = 0; i < blueprintsInSubcategory.length; ++i)
        {
            var blueprint = blueprintsInSubcategory[i];
            if(!blueprint) continue;
            var indexInRow = i % slotsPerRow;
            var slotX = padding + indexInRow * (slotSize + slotSpacing);
            var slotY = padding + Math.floor(i / slotsPerRow) * (slotSize + slotSpacing);

            drawImageFitInBox(menuHitbox.context, getSingleColoredPixelImage("#CCCCCC", 0.55), slotX, slotY, slotSize, slotSize);
            drawImageFitInBox(
                menuHitbox.context,
                blueprint.craftedItem.item.getIcon(),
                slotX,
                slotY,
                slotSize,
                slotSize
            );
            if(this.selectedBlueprint == blueprint)
            {
                menuHitbox.context.strokeStyle = "#76E374";
                menuHitbox.context.lineWidth = 3;
                menuHitbox.context.beginPath();
                menuHitbox.context.strokeRect(
                    slotX + menuHitbox.context.lineWidth,
                    slotY + menuHitbox.context.lineWidth,
                    slotSize - 2 * menuHitbox.context.lineWidth,
                    slotSize - 2 * menuHitbox.context.lineWidth
                );
                menuHitbox.context.stroke();
            }
            menuHitbox.context.fillStyle = "#FFFFFF";
            var fontSize = Math.min(16, this.boundingBox.height * 0.037);
            menuHitbox.context.font = fontSize + "px Verdana";
            menuHitbox.context.textBaseline = "bottom";
            menuHitbox.context.lineWidth = 3;
            menuHitbox.context.strokeStyle = "#000000";
            strokeTextShrinkToFit(
                menuHitbox.context,
                "",
                slotX,
                slotY + slotSize,
                slotSize,
                "right"
            );
            fillTextShrinkToFit(
                menuHitbox.context,
                "",
                slotX,
                slotY + slotSize,
                slotSize,
                "right"
            );
            var itemHitbox = new Hitbox(
                {
                    x: slotX,
                    y: slotY + menuHitbox.collapsedHeight,
                    width: slotSize,
                    height: slotSize
                },
                {
                    onmousedown: function (blueprint)
                    {
                        this.selectedBlueprint = blueprint;
                        this.initializeCraftingPane();
                    }.bind(this, blueprint),
                    onmouseenter: function (blueprint, x, y)
                    {
                        var coords = this.getGlobalCoordinates(x, y);
                        showTooltip(
                            _(blueprint.craftedItem.item.getName()),
                            _(blueprint.craftedItem.item.getDescription()),
                            coords.x * uiScaleX,
                            coords.y * uiScaleY,
                            200
                        );
                    }.bind(menuHitbox, blueprint, slotX, slotY + slotSize + menuHitbox.collapsedHeight),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer"
            );
            menuHitbox.addHitbox(itemHitbox, true);
            var highlight = new EasyHintHighlight(function(menuHitbox, blueprint)
            {
                var canCraft = canCraftBlueprint(blueprint.category, blueprint.id, -1);
                if (canCraft)
                {
                    menuHitbox.canCraftBlueprintInSubcategory = canCraft;
                }
                return !menuHitbox.isCollapsed && canCraft;
            }.bind(this, menuHitbox, blueprint));
            highlight.root = this.blueprintPane;
            highlight.rootContext = this.blueprintPane.context;
            highlight.fillRelativeAlpha = 0.3;
            highlight.highlightColor = "#71f06e";
            itemHitbox.addHitbox(highlight);
        }
        var highlight = new EasyHintHighlight(function(menuHitbox)
        {
            return menuHitbox.isCollapsed && menuHitbox.canCraftBlueprintInSubcategory;
        }.bind(this, menuHitbox, blueprint));
        highlight.root = this.blueprintPane;
        highlight.rootContext = this.blueprintPane.context;
        highlight.fillRelativeAlpha = 0.3;
        highlight.highlightColor = "#71f06e";
        menuHitbox.addHitbox(highlight);
        menuHitbox.context.restore();
    }

    initializeCraftingPane()
    {
        if(this.selectedBlueprint)
        {
            if(this.currentTabIndex == 1 && isBlueprintUnseen(this.selectedBlueprint.category, this.selectedBlueprint.id))
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
            var yPadding = 0;
            var iconSize = Math.min(55, Math.floor(this.boundingBox.height * 0.128));
            var titleBoxPadding = iconSize / 10;
            var blueprintNameBox = new Hitbox(
                {
                    x: xPadding,
                    y: yPadding,
                    width: this.craftingPane.boundingBox.width - 2 * xPadding,
                    height: iconSize + 2 * titleBoxPadding
                },
                {}, ""
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
                var fontSize = Math.min(22, parentWindow.boundingBox.height * 0.051);
                context.font = fontSize + "px KanitM";
                context.fillStyle = "#FFFFFF";
                context.textBaseline = "top";
                fillTextWrap(
                    context,
                    parentWindow.selectedBlueprint.craftedItem.item.getName(),
                    relativeCoords.x + iconSize + titleBoxPadding * 4,
                    relativeCoords.y + titleBoxPadding,
                    this.boundingBox.width - iconSize - titleBoxPadding * 5,
                    "left",
                    0.25
                );
                context.restore();
                this.renderChildren();
            }.bind(blueprintNameBox, this);
            var blueprintIcon = new Hitbox(
                {
                    x: titleBoxPadding,
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
                            coords.y * uiScaleY,
                            200
                        );
                    }.bind(blueprintNameBox, this.selectedBlueprint, titleBoxPadding, titleBoxPadding + iconSize),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer"
            );
            blueprintIcon.render = function (parentWindow)
            {
                var context = this.getContext();
                var blueprint = parentWindow.selectedBlueprint;
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                drawImageFitInBox(context, getSingleColoredPixelImage("#CCCCCC", 1), relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                drawImageFitInBox(context, blueprint.craftedItem.item.getIcon(), relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                context.fillStyle = "#FFFFFF";
                var fontSize = Math.min(16, parentWindow.boundingBox.height * 0.037);
                context.font = fontSize + "px Verdana";
                context.textBaseline = "bottom";
                context.lineWidth = 3;
                context.strokeStyle = "#000000";
                strokeTextShrinkToFit(
                    context,
                    "",
                    relativeCoords.x,
                    relativeCoords.y + iconSize,
                    iconSize,
                    "right"
                );
                fillTextShrinkToFit(
                    context,
                    "",
                    relativeCoords.x,
                    relativeCoords.y + iconSize,
                    iconSize,
                    "right"
                );
            }.bind(blueprintIcon, this);
            var ingredientsFontSize = Math.min(16, this.boundingBox.height * 0.037);
            var blueprintIngredientsBox = new Hitbox(
                {
                    x: xPadding,
                    y: ingredientsFontSize + blueprintNameBox.boundingBox.y + blueprintNameBox.boundingBox.height + titleBoxPadding,
                    width: blueprintNameBox.boundingBox.width,
                    height: titleBoxPadding * 3 + iconSize * 2 + ingredientsFontSize
                },
                {}, "", "ingredients"
            );
            blueprintIngredientsBox.render = function (parentWindow)
            {
                var context = this.getContext();
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                context.save();
                if(parentWindow.currentTabIndex == 1)
                {
                    context.globalAlpha = 0.6;
                    context.fillStyle = "#111111";
                    context.fillRect(relativeCoords.x, relativeCoords.y + ingredientsFontSize * 6, this.boundingBox.width, this.boundingBox.height - ingredientsFontSize * 5);
                    // context.fillRect(relativeCoords.x, relativeCoords.y + ingredientsFontSize, this.boundingBox.width, this.boundingBox.height - ingredientsFontSize);
                    context.globalAlpha = 1;
                    context.fillStyle = "#FFFFFF";
                    context.font = ingredientsFontSize + "px KanitM";
                    // context.textBaseline = "top";
                    fillTextWrap(context, parentWindow.selectedBlueprint.craftedItem.item.getDescription(), relativeCoords.x, relativeCoords.y, parentWindow.boundingBox.width, "left", 0.05);

                    context.fillText(_("Ingredients"), relativeCoords.x, relativeCoords.y + ingredientsFontSize * 6);
                }
                context.restore();
                this.renderChildren();
            }.bind(blueprintIngredientsBox, this);

            var slotsPerRow = Math.floor((blueprintIngredientsBox.boundingBox.width - titleBoxPadding * 2) / iconSize);
            var slotSpacing = ((blueprintIngredientsBox.boundingBox.width - titleBoxPadding * 2) - (iconSize * slotsPerRow)) / (slotsPerRow - 1);
            if(isSelectedBlueprintKnown || isSelectedBlueprintAvailable)
            {
                var yOffset = ingredientsFontSize * 6;
                var ingredients = getBlueprintIngredients(this.craftCategory, this.selectedBlueprint.id);
                for(var i in ingredients)
                {
                    var indexInRow = i % slotsPerRow;
                    var slotX = titleBoxPadding + indexInRow * (iconSize + slotSpacing);
                    var slotY = titleBoxPadding + Math.floor(i / slotsPerRow) * (iconSize + slotSpacing);
                    var ingredientIcon = new Hitbox(
                        {
                            x: slotX,
                            y: slotY + yOffset,
                            width: iconSize,
                            height: iconSize
                        },
                        {
                            onmouseenter: function (ingredient, x, y)
                            {
                                var coords = this.getGlobalCoordinates(x, y);
                                showTooltip(
                                    _(ingredient.item.getName()),
                                    _("Owned: {0}<br>Required: {1}", beautifynum(ingredient.item.getQuantityOwned()), beautifynum(ingredient.quantity)),
                                    (coords.x + iconSize) * uiScaleX,
                                    coords.y * uiScaleY
                                );
                            }.bind(blueprintIngredientsBox, ingredients[i], slotX, slotY + iconSize + ingredientsFontSize),
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
                        drawImageFitInBox(context, ingredient.item.getIcon(), relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                        context.fillStyle = "#FFFFFF";
                        var fontSize = Math.min(16, parentWindow.boundingBox.height * 0.037);
                        context.font = fontSize + "px Verdana";
                        context.textBaseline = "bottom";
                        context.lineWidth = 3;
                        context.strokeStyle = "#000000";
                        strokeTextShrinkToFit(
                            context,
                            shortenNum(ingredient.quantity),
                            relativeCoords.x,
                            relativeCoords.y + iconSize,
                            iconSize * 0.95,
                            "right"
                        );
                        fillTextShrinkToFit(
                            context,
                            shortenNum(ingredient.quantity),
                            relativeCoords.x,
                            relativeCoords.y + iconSize,
                            iconSize * 0.95,
                            "right"
                        );
                        if(ingredient.item.hasQuantity(ingredient.quantity))
                        {
                            // drawImageFitInBox(context, checkmark, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                            renderCheckmark(context, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                        }
                        else
                        {
                            // drawImageFitInBox(context, xmark, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                            renderXMark(context, relativeCoords.x, relativeCoords.y, iconSize / 5, iconSize / 5);
                        }
                    }.bind(ingredientIcon, this, ingredients[i]);
                    blueprintIngredientsBox.addHitbox(ingredientIcon);
                }


                //HANDLE FUEL ROD DECAY REWARD DISPLAY
                var blueprintRewardsBox = new Hitbox(
                    {
                        x: xPadding,
                        y: ingredientsFontSize + blueprintNameBox.boundingBox.y + blueprintNameBox.boundingBox.height + titleBoxPadding + (iconSize * 2 + ingredientsFontSize),
                        width: blueprintNameBox.boundingBox.width,
                        height: titleBoxPadding * 3 + iconSize * 2 + ingredientsFontSize
                    },
                    {}, "", "ingredients"
                );

                var reactorComponent = reactorComponents[this.selectedBlueprint.craftedItem.item.id];
                if(reactorComponent.hasOwnProperty("rewardOutput") && reactorComponent["rewardOutput"] != null)
                {
                    blueprintRewardsBox.render = function (parentWindow)
                    {
                        var context = this.getContext();
                        var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
                        context.save();
                        if(parentWindow.currentTabIndex == 1)
                        {
                            context.globalAlpha = 0.6;
                            context.fillStyle = "#111111";
                            context.fillRect(relativeCoords.x, relativeCoords.y + ingredientsFontSize * 6, this.boundingBox.width, this.boundingBox.height - ingredientsFontSize * 5);
                            // context.fillRect(relativeCoords.x, relativeCoords.y + ingredientsFontSize, this.boundingBox.width, this.boundingBox.height - ingredientsFontSize);
                            context.globalAlpha = 1;
                            context.fillStyle = "#FFFFFF";
                            context.font = ingredientsFontSize + "px KanitM";
                            // context.textBaseline = "top";

                            context.fillText(_("Decay Rewards"), relativeCoords.x, relativeCoords.y + ingredientsFontSize * 6);
                        }
                        context.restore();
                        this.renderChildren();
                    }.bind(blueprintRewardsBox, this);


                    var fuelRodRewardOutput = reactorComponent.rewardOutput;
                    for(var i in fuelRodRewardOutput)
                    {
                        var indexInRow = i % slotsPerRow;
                        var slotX = titleBoxPadding + indexInRow * (iconSize + slotSpacing);
                        var slotY = titleBoxPadding + Math.floor(i / slotsPerRow) * (iconSize + slotSpacing);
                        var ingredientIcon = new Hitbox(
                            {
                                x: slotX,
                                y: slotY + yOffset,
                                width: iconSize,
                                height: iconSize
                            },
                            {
                                onmouseenter: function (ingredient, x, y)
                                {
                                    var coords = this.getGlobalCoordinates(x, y);
                                    showTooltip(
                                        _(ingredient.item.getName()),
                                        _("Owned: {0}", beautifynum(ingredient.item.getQuantityOwned())),
                                        (coords.x + iconSize) * uiScaleX,
                                        coords.y * uiScaleY
                                    );
                                }.bind(blueprintRewardsBox, fuelRodRewardOutput[i], slotX, slotY + iconSize + ingredientsFontSize),
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
                            drawImageFitInBox(context, ingredient.item.getIcon(), relativeCoords.x, relativeCoords.y, iconSize, iconSize);
                            context.fillStyle = "#FFFFFF";
                            var fontSize = Math.min(16, parentWindow.boundingBox.height * 0.037);
                            context.font = fontSize + "px Verdana";
                            context.textBaseline = "bottom";
                            context.lineWidth = 3;
                            context.strokeStyle = "#000000";
                            strokeTextShrinkToFit(
                                context,
                                shortenNum(ingredient.quantity),
                                relativeCoords.x,
                                relativeCoords.y + iconSize,
                                iconSize * 0.95,
                                "right"
                            );
                            fillTextShrinkToFit(
                                context,
                                shortenNum(ingredient.quantity),
                                relativeCoords.x,
                                relativeCoords.y + iconSize,
                                iconSize * 0.95,
                                "right"
                            );
                        }.bind(ingredientIcon, this, fuelRodRewardOutput[i]);
                        blueprintRewardsBox.addHitbox(ingredientIcon);
                    }
                }

            }
            var craftButton = new Hitbox(
                {
                    x: blueprintNameBox.boundingBox.x + blueprintNameBox.boundingBox.width * 0.05,
                    y: this.craftingPane.boundingBox.height - 38,
                    width: blueprintNameBox.boundingBox.width * 0.9,
                    height: 38
                },
                {
                    onmousedown: function ()
                    {
                        if(isSelectedBlueprintKnown && this.currentTabIndex == 1)
                        {
                            if(craftBlueprint(this.selectedBlueprint.category, this.selectedBlueprint.id))
                            {
                                if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                                this.initializeCraftingPane();
                                newNews(_("You crafted {0}", this.selectedBlueprint.craftedItem.item.getName()), true);
                            }
                        }
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
                if(parentWindow.currentTabIndex == 1 && !canCraftBlueprint(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id))
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
                if(parentWindow.currentTabIndex == 1 && isSelectedBlueprintKnown && canCraftBlueprint(parentWindow.selectedBlueprint.category, parentWindow.selectedBlueprint.id))
                {
                    context.drawImage(upgradeb, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                    context.fillStyle = "#000000";
                }
                else
                {
                    context.drawImage(upgradebg_blank, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                    context.fillStyle = "#444444";
                }
                context.textBaseline = "middle";
                var buttonText;
                var fontSize = Math.min(32, parentWindow.boundingBox.height * 0.074);
                context.font = fontSize + "px KanitB";
                if(parentWindow.currentTabIndex == 1)
                {
                    buttonText = _("Craft");
                }
                fillTextShrinkToFit(context, buttonText, relativeCoords.x + 10, relativeCoords.y + this.boundingBox.height / 2 + 2, this.boundingBox.width - 20, "center");
                context.restore();
            }.bind(craftButton, this)
            this.craftingPane.addHitbox(blueprintNameBox);
            blueprintNameBox.addHitbox(blueprintIcon);
            this.craftingPane.addHitbox(blueprintIngredientsBox);
            this.craftingPane.addHitbox(blueprintRewardsBox);
            this.craftingPane.addHitbox(craftButton);
            this.isCraftingPaneInitialized = true;
        }
        else
        {
            var instructionsText = "";
            var instructionsText2 = "";
            if(this.currentTabIndex == 1)
            {
                if(getAvailableBlueprints().length > 0)
                {
                    instructionsText = _("Click on a blueprint on the left to view it");
                }
            }
            this.craftingPane.clearHitboxes();
            var instructionsHitbox = new Hitbox(
                {
                    x: 10,
                    y: 10,
                    width: this.craftingPane.boundingBox.width - 20,
                    height: this.craftingPane.boundingBox.height - 20,
                },
                {},
                ""
            );
            instructionsHitbox.render = function (parentWindow)
            {
                var coords = this.getRelativeCoordinates(0, 0, parentWindow);
                var context = parentWindow.context;
                context.fillStyle = "#FFFFFF";
                context.textBaseline = "middle";
                fillTextWrap(
                    context,
                    instructionsText,
                    coords.x,
                    coords.y + 10,
                    this.boundingBox.width
                );
                fillTextWrap(
                    context,
                    instructionsText2,
                    coords.x,
                    coords.y + 70,
                    this.boundingBox.width
                );
            }.bind(instructionsHitbox, this);
            this.craftingPane.addHitbox(instructionsHitbox);
        }
    }

}

const HOVER_SYSTEM_COLORS = [
    'rgb(140, 110, 110)',
    'rgb(110, 110, 160)',
    'rgb(110, 160, 110)',
    'rgb(110, 160, 160)',
    'rgb(140, 110, 160)',
    'rgb(140, 160, 110)'
];
class ReactorGridCell extends DragDropUIComponent
{
    row;
    column;

    constructor(boundingBox, row, column)
    {
        super(boundingBox); // Need to call base class constructor

        this.displayType = 2;
        this.isDropRegion = true;
        this.dropTypesAccepted = [1];
        this.row = row;
        this.column = column;
        this.id = "Cell_" + row + "_" + column;
    }

    onmousedown()
    {
        var root = this.getRootLayer();
        if (root.inventoryPane && root.inventoryPane.hide)
        {
            root.inventoryPane.hide();
        }
    }

    render()
    {
        var rootContext = this.getRootLayer().context;
        rootContext.save();

        if(this.isDropCandidate && reactor.isCellUsable(this.column, this.row))
        {
            rootContext.shadowBlur = 11;
            rootContext.shadowColor = "rgba(255, 255, 0, 1)";
        }

        var cellHoverSystemIndex = reactor.grid.getCellHoveredSystemIndex(this.column, this.row);
        if(cellHoverSystemIndex > -1)
        {
            rootContext.fillStyle = HOVER_SYSTEM_COLORS[cellHoverSystemIndex];
            rootContext.strokeStyle = 'rgb(0, 0, 0)';
        }
        else if(reactor.isCellUsable(this.column, this.row))
        {
            if(reactor.grid.isCellInOverheatingSystem(this.column, this.row))
            {
                var redAmt = (oscillate(numFramesRendered, 14) * 80) + 125;
                rootContext.fillStyle = 'rgb(' + redAmt + ', 25, 25)';
                rootContext.strokeStyle = 'rgb(0, 0, 0)';
            }
            else
            {
                rootContext.fillStyle = 'rgb(220, 220, 220)';
                rootContext.strokeStyle = 'rgb(0, 0, 0)';
            }
        }
        else
        {
            rootContext.fillStyle = 'rgb(64, 64, 64)';
            rootContext.strokeStyle = 'rgb(42, 42, 42)';
            rootContext.globalAlpha = 0.55;
        }
        rootContext.lineWidth = 2;
        var localCoordinates = this.parent.getRelativeCoordinates(this.boundingBox.x, this.boundingBox.y, this.getRootLayer());
        rootContext.strokeRect(localCoordinates.x, localCoordinates.y, this.boundingBox.width, this.boundingBox.height);
        rootContext.fillRect(localCoordinates.x, localCoordinates.y, this.boundingBox.width, this.boundingBox.height);
        rootContext.globalAlpha = 1;
        super.render();

        rootContext.restore();
    }

    onAcceptDrop()
    {
        hideTooltip();
        if(!reactor.isCellUsable(this.column, this.row))
        {
            activeDraggingInstance.onDropFailed();
            return;
        }
        if(this.hitboxes.length > 0) //deal with swapping later
        {
            activeDraggingInstance.onDropFailed();
            return;
        }
        super.onAcceptDrop();


        if(activeDraggingInstance.reactorComponentType != null && activeDraggingInstance.parentBeforeDrag.displayType == 2)
        {
            if(activeDraggingInstance.parentBeforeDrag.hasOwnProperty("row"))
            {
                var column = activeDraggingInstance.parentBeforeDrag.column;
                var row = activeDraggingInstance.parentBeforeDrag.row;
                reactor.grid.removeComponentFromCell(column, row);
            }
        }

        if(activeDraggingInstance.reactorComponentType != null)
        {
            if(activeDraggingInstance.parentBeforeDrag.hasOwnProperty("row"))
            {
                var column = activeDraggingInstance.parentBeforeDrag.column;
                var row = activeDraggingInstance.parentBeforeDrag.row;
                reactor.grid.addComponentToCell(this.column, this.row, activeDraggingInstance.reactorComponentType, column, row);
            }
            else
            {
                reactor.grid.addComponentToCell(this.column, this.row, activeDraggingInstance.reactorComponentType, null, null);
            }
        }

        this.addHitbox(activeDraggingInstance);
        redrawInventoryAndGrid();
        activeDraggingInstance.boundingBox.x = 1;
        activeDraggingInstance.boundingBox.y = 1;
    }

    onChildRemoved()
    {
        super.onChildRemoved();
        redrawInventoryAndGrid();
    }
}

function redrawInventoryAndGrid()
{
    for(var i = 1; i < reactorComponents.length; i++)
    {
        var typeInSlot = reactor.getTypeForSlot(i);
        var slotHitbox = activeLayers.Reactor.inventoryPane.inventorySlots[i-1];

        slotHitbox.clearHitboxes();

        if(typeInSlot > -1)
        {
            var inventoryComponent = new ReactorComponentUI({
                x: 0,
                y: 0,
                width: activeLayers.Reactor.widthHeightPerCell,
                height: activeLayers.Reactor.widthHeightPerCell
            }, typeInSlot);
            inventoryComponent.isOnGrid = false;
            slotHitbox.addHitbox(inventoryComponent);
        }
    }

    for(var i = 0; i < MAX_REACTOR_CELLS_ROWS; i++)
    {
        for(var j = 0; j < MAX_REACTOR_CELLS_COLUMNS; j++)
        {
            var gridCellHitbox = activeLayers.Reactor.reactorGrid.getHitboxById("Cell_" + i + "_" + j);
            gridCellHitbox.clearHitboxes();

            if(reactor.grid.grid[i][j] != EMPTY_INTEGER_VALUE)
            {
                var gridComponent = new ReactorComponentUI({
                    x: 0,
                    y: 0,
                    width: activeLayers.Reactor.widthHeightPerCell,
                    height: activeLayers.Reactor.widthHeightPerCell
                }, reactor.grid.grid[i][j]);
                gridComponent.gridSlotX = j;
                gridComponent.gridSlotY = i;
                gridComponent.isOnGrid = true;
                gridCellHitbox.addHitbox(gridComponent);
            }
        }
    }
}

class ReactorInventorySlot extends DragDropUIComponent
{
    slotIndex;

    constructor(boundingBox, slotIndex)
    {
        super(boundingBox); // Need to call base class constructor

        this.displayType = 3;
        this.isDropRegion = true;
        this.dropTypesAccepted = [1];
        this.slotIndex = slotIndex;
        this.id = "Inv_" + slotIndex;
    }

    render()
    {
        var rootContext = this.getRootLayer().context;

        rootContext.save();
        if(this.isDropCandidate)
        {
            rootContext.shadowBlur = 11;
            rootContext.shadowColor = "rgba(255, 255, 0, 1)";
        }

        rootContext.strokeStyle = 'rgb(0, 0, 0)';
        rootContext.fillStyle = 'rgb(200, 200, 200)';
        var localCoordinates = this.parent.getRelativeCoordinates(this.boundingBox.x, this.boundingBox.y, this.getRootLayer());
        rootContext.strokeRect(localCoordinates.x, localCoordinates.y, this.boundingBox.width, this.boundingBox.height);
        rootContext.fillRect(localCoordinates.x, localCoordinates.y, this.boundingBox.width, this.boundingBox.height);
        super.render();

        rootContext.fillStyle = 'rgb(255, 255, 255)';
        rootContext.textBaseline = "bottom";
        rootContext.lineWidth = 2;
        rootContext.font = "14px Verdana"

        var typeToRender = reactor.getTypeForSlot(this.slotIndex);
        var numOfTypeInInventory = reactor.numOfTypeInInventory(typeToRender);
        if(numOfTypeInInventory > 0)
        {
            var textLength = rootContext.measureText(numOfTypeInInventory).width;
            rootContext.strokeText(numOfTypeInInventory, localCoordinates.x + this.boundingBox.width - (textLength + 1), localCoordinates.y + this.boundingBox.height - 1);
            rootContext.fillText(numOfTypeInInventory, localCoordinates.x + this.boundingBox.width - (textLength + 1), localCoordinates.y + this.boundingBox.height - 1);
        }

        rootContext.restore();
    }

    onAcceptDrop()
    {
        hideTooltip();
        super.onAcceptDrop();

        if(activeDraggingInstance.reactorComponentType != null && activeDraggingInstance.parentBeforeDrag.displayType == 2)
        {
            if(activeDraggingInstance.parentBeforeDrag.hasOwnProperty("row"))
            {
                var column = activeDraggingInstance.parentBeforeDrag.column;
                var row = activeDraggingInstance.parentBeforeDrag.row;

                var componentTypeAtCell = reactor.grid.getComponentTypeInCellAtLocation(column, row);
                if(FUEL_ROD_TYPES.includes(componentTypeAtCell))
                {
                    if(reactorComponents[componentTypeAtCell].energyProductionPerSecond > 0)
                    {
                        if(reactor.grid.isFuelCellBurnedUp(column, row))
                        {
                            //They should be prompted when clicking this
                            activeDraggingInstance.onDropFailed();
                            return;
                        }
                        else if(reactor.grid.getFuelCellRemainingEnergy(column, row) != reactorComponents[componentTypeAtCell].totalEnergyOutput)
                        {
                            //some of the fuel already burned do not allow return without deletion first
                            //prompt for deletion
                            showConfirmationPrompt(
                                _("This Fuel Rod has been partially used, it cannot be returned to inventory. Do you wish to delete it?"),
                                _("Yes, Delete It"),
                                function (gridSlotX, gridSlotY)
                                {
                                    reactor.grid.deleteFuelCellState(gridSlotX, gridSlotY);
                                    reactor.grid.deleteComponentInCellAndRemoveQuantityOwned(gridSlotX, gridSlotY);
                                    redrawInventoryAndGrid();
                                    hideSimpleInput();
                                }.bind(null, column, row),
                                _("Cancel")
                            );
                            activeDraggingInstance.onDropFailed();
                            return;
                        }
                        else
                        {
                            //fuel cell was never used allow it to be returned to inventory
                            reactor.grid.deleteFuelCellState(column, row);
                        }
                    }
                    else
                    {
                        reactor.grid.deleteFuelCellState(column, row);
                    }
                }
                else if(BATTERY_TYPES.includes(componentTypeAtCell))
                {
                    var totalCapacityWithBatteryRemoved = reactor.grid.maxBatteryCapacity() - reactorComponents[componentTypeAtCell].energyStorage;
                    if(reactor.currentBatteryCharge() > totalCapacityWithBatteryRemoved)
                    {
                        showConfirmationPrompt(
                            _("Returning this battery to storage will result in decreased total energy stored.  Do you want to proceed?"),
                            _("Yes"),
                            function (gridSlotX, gridSlotY)
                            {
                                reactor.grid.removeComponentFromCell(gridSlotX, gridSlotY);
                                redrawInventoryAndGrid();
                                hideSimpleInput();
                            }.bind(null, column, row),
                            _("Cancel")
                        );
                        activeDraggingInstance.onDropFailed();
                        return;
                    }
                }
                reactor.grid.removeComponentFromCell(column, row);
            }
        }
        redrawInventoryAndGrid();

        activeDraggingInstance.boundingBox.x = 1;
        activeDraggingInstance.boundingBox.y = 1;
    }

    onChildRemoved()
    {
        super.onChildRemoved();
        redrawInventoryAndGrid();
    }
}

class ReactorComponentUI extends DragDropUIComponent
{
    reactorComponentType;
    gridSlotX;
    gridSlotY;
    isOnGrid;
    isMouseOver = false;

    constructor(boundingBox, reactorComponentType)
    {
        super(boundingBox); // Need to call base class constructor

        this.displayType = 1;
        this.isDraggable = true;
        this.reactorComponentType = reactorComponentType;
    }

    cellTypeTop()
    {
        if(this.isOnGrid && this.gridSlotY > 0)
        {
            return reactor.grid.getComponentTypeInCellAtLocation(this.gridSlotX, this.gridSlotY - 1);
        }
        return null;
    }

    cellTypeBottom()
    {
        if(this.isOnGrid && this.gridSlotY < MAX_REACTOR_CELLS_ROWS - 1)
        {
            return reactor.grid.getComponentTypeInCellAtLocation(this.gridSlotX, this.gridSlotY + 1);
        }
        return null;
    }

    cellTypeRight()
    {
        if(this.isOnGrid && this.gridSlotX < MAX_REACTOR_CELLS_COLUMNS - 1)
        {
            return reactor.grid.getComponentTypeInCellAtLocation(this.gridSlotX + 1, this.gridSlotY);
        }
        return null;
    }

    cellTypeLeft()
    {
        if(this.isOnGrid && this.gridSlotX > 0)
        {
            return reactor.grid.getComponentTypeInCellAtLocation(this.gridSlotX - 1, this.gridSlotY);
        }
        return null;
    }

    render()
    {
        var rootContext = this.getRootLayer().context;

        if(this.isDropCandidate)
        {
            rootContext.save();
            rootContext.shadowBlur = 11;
            rootContext.shadowColor = "rgba(255, 255, 0, 1)";
        }

        rootContext.strokeStyle = 'rgb(0, 0, 0)';
        rootContext.fillStyle = 'rgb(255, 255, 255)';
        this.renderComponent();
        super.render();

        if(this.isDropCandidate)
        {
            rootContext.restore();
        }
    }

    onmouseenter(e)
    {
        super.onmouseenter(e);
        reactorComponents[this.reactorComponentType].showTooltip(this);

        this.isMouseOver = true;
        reactor.grid.setComponentAsInFocus(this.gridSlotX, this.gridSlotY);
    }

    onmouseexit(e)
    {
        super.onmouseexit(e);
        hideTooltip();

        this.isMouseOver = false;
        reactor.grid.unsetComponentAsInFocus(this.gridSlotX, this.gridSlotY);
    }

    onmousedown(e)
    {
        super.onmousedown(e);

        if(this.isOnGrid && FUEL_ROD_TYPES.includes(this.reactorComponentType))
        {
            if(reactor.grid.isFuelCellBurnedUp(this.gridSlotX, this.gridSlotY))
            {
                showConfirmationPrompt(
                    _("Collect materials from decayed fuel rod?"),
                    _("Yes"),
                    function ()
                    {
                        reactor.grid.collectFuelCell(this.gridSlotX, this.gridSlotY);
                        hideSimpleInput();
                        redrawInventoryAndGrid();
                    }.bind(this),
                    _("Cancel")
                );
            }
        }
    }

    renderComponent()
    {
        var rootContext = this.getRootLayer().context;
        var localCoordinates = this.parent.getRelativeCoordinates(this.boundingBox.x, this.boundingBox.y, this.getRootLayer());
        reactorComponents[this.reactorComponentType].render(this, rootContext, localCoordinates.x, localCoordinates.y, this.boundingBox.width, this.boundingBox.height);
    }

    onDragStarted()
    {
        var root = activeLayers.Reactor;
        if (root && root.inventoryPane && root.inventoryPane.hide)
        {
            root.inventoryPane.hide();
        }
    }
}