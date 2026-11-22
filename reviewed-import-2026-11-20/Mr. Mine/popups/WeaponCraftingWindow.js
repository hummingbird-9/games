class WeaponCraftingWindow extends BottomTabbedPopup
{
    layerName = "weaponcrafting"; // Used as key in activeLayers
    domElementId = "CRAFTINGD"; // ID of dom element that gets shown or hidden
    context = CRAFTING;         // Canvas rendering context for popup

    blueprintPane;
    blueprintPaneDefaultWidth;
    blueprintListHitboxes;

    craftingPane;
    isCraftingPaneInitialized = false;
    selectedBlueprint;

    craftCategory = 2;

    constructor(boundingBox)
    {
        super(boundingBox);
        if(!boundingBox)
        {
            this.setBoundingBox();
        }
        // this.context.imageSmoothingEnabled = false;
        this.initializeTabs([_("Craft"), _("Stats")]);
        this.blueprintPaneDefaultWidth = this.bodyContainer.boundingBox.width * 0.4;
        this.blueprintPane = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width - 15,
            this.bodyContainer.boundingBox.height,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            15
        );
        this.blueprintPane.isVisible = () => (!this.selectedBlueprint && this.currentTabIndex == 0);
        this.blueprintPane.isEnabled = () => (!this.selectedBlueprint && this.currentTabIndex == 0);
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
        this.craftingPane.isVisible = () => (this.currentTabIndex == 0 && this.selectedBlueprint);
        this.craftingPane.isEnabled = () => (this.currentTabIndex == 0 && this.selectedBlueprint);
        this.craftingPane.allowBubbling = true;
        this.bodyContainer.addHitbox(this.craftingPane);
        this.initializeBlueprintList();
        this.initializeCraftingPane();
        this.initializeEquipList();
    }

    render()
    {
        if(this.currentTabIndex == 0)
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
        else if(this.currentTabIndex == 1)
        {
            //stats
            this.context.save();
            this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
            super.render();

            this.context.font = "19px KanitM";
            this.context.lineWidth = 4;
            this.context.fillStyle = "#FFFFFF";

            var maxHealth = userMaxHealth();
            var statsText = _("Max Health: {0}  -  Total DPS: {1}", beautifynum(maxHealth), getTotalDps().toFixed(3));
            this.context.strokeText(statsText, this.boundingBox.width * .5 - (this.context.measureText(statsText).width / 2), this.boundingBox.height * .86);
            this.context.fillText(statsText, this.boundingBox.width * .5 - (this.context.measureText(statsText).width / 2), this.boundingBox.height * .86);

            this.context.restore();
        }

        showTyrusDialogue();
    }

    close()
    {
        activeLayers.MainUILayer.removeDialogueAttachment();
        animate();

        return super.close();
    }

    onTabChange()
    {
        if(this.currentTabIndex == 1)
        {
            this.selectedBlueprint = null;
            this.blueprintListHitboxes = [];
        }
        else
        {
            this.initializeBlueprintList();
        }
    }

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
        if(this.currentTabIndex == 0)
        {
            blueprintList = getKnownBlueprints();
            var blueprintsInCategory = filterBlueprintsByCategory(blueprintList, this.craftCategory);
            blueprintsInCategory = filterBlueprints(blueprintsInCategory, function (blueprint) {return !blueprint.craftedItem.item.isAtMaxLevel();});

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
        // parentHitbox.render();
        // this.render();
    }

    generateSubcategoryMenuContents(blueprintsInSubcategory, menuHitbox)
    {
        var slotSize = Math.min(85, Math.floor(this.boundingBox.height * 0.16));
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
                blueprint.craftedItem.item.getCurrentLevel() + 2,
                slotX,
                slotY + slotSize,
                slotSize,
                "right"
            );
            fillTextShrinkToFit(
                menuHitbox.context,
                blueprint.craftedItem.item.getCurrentLevel() + 2,
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
                        // var coords = this.getGlobalCoordinates(x, y);
                        // showTooltip(
                        //     _(blueprint.craftedItem.item.getName()),
                        //     _(blueprint.craftedItem.item.getDescription()),
                        //     coords.x * uiScaleX,
                        //     coords.y * uiScaleY,
                        //     200
                        // );
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
            var level = this.selectedBlueprint.craftedItem.item.getCurrentLevel();
           this.discountedIngredients = getBlueprintIngredients(this.craftCategory, this.selectedBlueprint.id, level + 1);
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
                                    this.discountedIngredients = getIngredientListWithDiscounts(blueprint.ingredients);
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
                    height: 38
                },
                {
                    onmousedown: function ()
                    {
                        var level = this.selectedBlueprint.craftedItem.item.getCurrentLevel();
                        if(craftBlueprint(this.selectedBlueprint.category, this.selectedBlueprint.id, level+1, this.discountedIngredients))
                        {
                            newNews(_("You crafted {0}", this.selectedBlueprint.craftedItem.item.getName()), true);
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
                }
            }.bind(craftButton, this);
            craftButton.render = function (parentWindow)
            {
                var context = parentWindow.context;
                context.save();
                var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
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
                context.textBaseline = "middle";
                var buttonText = _("Upgrade");
                var fontSize = Math.min(32, parentWindow.boundingBox.height * 0.080);
                context.font = fontSize + "px KanitB";
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
            if(this.currentTabIndex == 0 || this.currentTabIndex == 1)
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

    initializeEquipList()
    {
        var iconSize = 50;
        var padding = 8;
        var detailsWidth = 135;
        var equipList = new Hitbox(
            {
                x: 28,
                y: iconSize + padding,
                width: this.bodyContainer.boundingBox.width - 60,
                height: this.bodyContainer.boundingBox.height
            },
            {}, "", "equipList"
        );

        for(var i = 0; i < battleInventory.length; ++i)
        {
            if(battleInventory[i].length > 0)
            {
                var xCoordinate = (i % 3) * (iconSize + padding + detailsWidth);
                var yCoordinate = Math.floor(i / 3) * (iconSize + padding);
                var equipHitbox = new Hitbox(
                    {
                        x: xCoordinate,
                        y: yCoordinate,
                        width: iconSize,
                        height: iconSize
                    },
                    {
                        onmouseenter: function (i, x, y)
                        {
                            var item = new WeaponCraftingItem(battleInventory[i][0]);
                            var coords = this.getGlobalCoordinates(x, y);
                            showTooltip(
                                _(item.getName()),
                                _(item.getDescription()),
                                coords.x * uiScaleX,
                                coords.y * uiScaleY
                            );
                        }.bind(equipList, i, xCoordinate + iconSize, yCoordinate),
                        onmouseexit: function ()
                        {
                            hideTooltip();
                        }
                    },
                    "pointer"
                )
                equipHitbox.render = function (parentWindow, i)
                {
                    var item = new WeaponCraftingItem(battleInventory[i][0]);
                    var coords = this.getRelativeCoordinates(0, 0, parentWindow);
                    parentWindow.context.drawImage(darkdot, coords.x - 2, coords.y - 2, this.boundingBox.width + detailsWidth + 2, this.boundingBox.height + 4);
                    parentWindow.context.drawImage(item.getIcon(), coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
                    parentWindow.context.fillStyle = "#FFFFFF";
                    var fontSize = Math.min(16, parentWindow.boundingBox.height * 0.037);
                    parentWindow.context.font = fontSize + "px Verdana";
                    parentWindow.context.textBaseline = "bottom";
                    parentWindow.context.lineWidth = 3;
                    parentWindow.context.strokeStyle = "#000000";
                    strokeTextShrinkToFit(
                        parentWindow.context,
                        item.getCurrentLevel() + 1,
                        coords.x,
                        coords.y + this.boundingBox.width,
                        this.boundingBox.height,
                        "right"
                    );
                    fillTextShrinkToFit(
                        parentWindow.context,
                        item.getCurrentLevel() + 1,
                        coords.x,
                        coords.y + this.boundingBox.width,
                        this.boundingBox.height,
                        "right"
                    );

                    parentWindow.context.textBaseline = "top";
                    var fontSize = Math.min(11, parentWindow.boundingBox.height * 0.026);
                    parentWindow.context.font = fontSize + "px Verdana";
                    //DPS and stats
                    fillTextWrap(
                        parentWindow.context,
                        item.getName() + " Lv." + (item.getCurrentLevel() + 1) + " <br> ATK: " + item.getAttack() + " <br> CD: " + beautifynum(item.getCooldown()) + "ms <br> DPS: " + item.getDps().toFixed(3),
                        coords.x + iconSize + 3,
                        coords.y + 1,
                        detailsWidth,
                        "left",
                        0.2
                    );
                }.bind(equipHitbox, this, i);
                equipList.addHitbox(equipHitbox);
            }
        }

        this.equipList = equipList;
        this.addHitbox(equipList);
        if(this.currentTabIndex != 1)
        {
            this.equipList.isEnabled = () => false;
            this.equipList.isVisible = () => false;
        }
    }
}