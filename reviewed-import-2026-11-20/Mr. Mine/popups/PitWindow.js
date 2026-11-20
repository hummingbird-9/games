class PitWindow extends BottomTabbedPopup 
{
    layerName = "pit"; // Used as key in activeLayers
    domElementId = "PITD"; // ID of dom element that gets shown or hidden
    context = PIT;         // Canvas rendering context for popup

    paymentPane;
    paymentPaneDefaultWidth;
    paymentItemListHitboxes;

    sacrificePane;
    isSacrificePaneInitialized = false;
    sacrificeType;
    selectedPaymentIndex;
    paymentFraction;
    paymentAmount;

    constructor(boundingBox)
    {
        super(boundingBox);
        if(!boundingBox)
        {
            this.setBoundingBox();
        }
        this.sacrificeType = PitConfig.sacrificeTypes.ore;
        // this.context.imageSmoothingEnabled = false;
        this.initializeTabs([_("Ore"), _("Relics"), _("Scientists")]);
        this.paymentPaneDefaultWidth = this.bodyContainer.boundingBox.width * 0.4;
        this.paymentPane = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width - 15,
            this.bodyContainer.boundingBox.height,
            this.context,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            15
        );
        this.paymentPane.isVisible = () => (!this.selectedPaymentIndex && this.selectedPaymentIndex !== 0);
        this.paymentPane.isEnabled = () => (!this.selectedPaymentIndex && this.selectedPaymentIndex !== 0);
        this.addHitbox(this.paymentPane);
        this.sacrificePane = new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.bodyContainer.boundingBox.width,
                height: this.bodyContainer.boundingBox.height
            },
            {},
            "",
            "sacrificePane"
        )
        this.sacrificePane.render = function (parent)
        {
            var root = this.getRootLayer();
            var coords = this.getRelativeCoordinates(0, 0, root);
            var context = root.getContext();
            var sacrificeName;
            if(typeof (root.selectedPaymentIndex) !== 'undefined' && root.selectedPaymentIndex !== null)
            {
                if(root.currentTabIndex == 0)
                {
                    sacrificeName = worldResources[root.selectedPaymentIndex + 1].name
                }
                else if(root.currentTabIndex == 1)
                {
                    sacrificeName = excavationRewards[equippedRelics[root.selectedPaymentIndex]].name;
                }
                else if(root.currentTabIndex == 2)
                {
                    if(aliveScientists()[root.selectedPaymentIndex])
                    {
                        sacrificeName = scientists[aliveScientists()[root.selectedPaymentIndex][0]].name;
                    }
                    else
                    {
                        root.initializePaymentItemList();
                    }
                }
            }
            if(parent.selectedPaymentIndex || parent.selectedPaymentIndex === 0)
            {
                hideTooltip();
                context.save();
                context.fillStyle = "#444444";
                context.fillRect(coords.x, coords.y, 3, this.boundingBox.height);
                context.fillStyle = "#FFFFFF";
                context.textBaseline = "top";
                context.font = "24px Verdana";
                fillTextShrinkToFit(
                    context,
                    _("Sacrifice {0}", sacrificeName),
                    coords.x + 15,
                    coords.y + 15,
                    this.boundingBox.width * 0.9
                );
                if(parent.currentTabIndex == 0)
                {
                    context.font = "14px Verdana";
                    fillTextWrap(
                        context,
                        _("How much {0} would you like to sacrifice to The Core?", sacrificeName),
                        coords.x + 15,
                        coords.y + 50,
                        this.boundingBox.width * 0.9
                    );
                    context.font = "18px Verdana";
                    fillTextWrap(
                        context,
                        beautifynum(parent.paymentAmount) + ' x ' + sacrificeName,
                        coords.x + 15,
                        coords.y + 140,
                        this.boundingBox.width * 0.9
                    );
                }
                else if(parent.currentTabIndex == 1 || parent.currentTabIndex == 2)
                {
                    context.font = "14px Verdana";
                    fillTextWrap(
                        context,
                        _("Would you like to sacrifice {0} to The Core?", sacrificeName),
                        coords.x + 15,
                        coords.y + 50,
                        this.boundingBox.width * 0.9
                    );
                }
                context.restore();
                this.renderChildren();
            }
        }.bind(this.sacrificePane, this);
        this.sacrificePane.allowBubbling = true;
        this.sacrificePane.isVisible = () => (this.selectedPaymentIndex || this.selectedPaymentIndex === 0);
        this.sacrificePane.isEnabled = () => (this.selectedPaymentIndex || this.selectedPaymentIndex === 0);
        this.bodyContainer.addHitbox(this.sacrificePane);
        this.initializePaymentItemList();
        this.initializeSacrificePane();
        this.slider = this.sacrificePane.addHitbox(new Slider(
            this.context,
            this.sacrificePane.boundingBox.width * 0.05,
            100,
            this.sacrificePane.boundingBox.width * 0.9,
            25
        ));
        this.slider.onchange = function (slider)
        {
            this.paymentFraction = slider.value;
        }.bind(this, this.slider);
        this.slider.setPosition(0.5);
        var sacrificeButton = new Hitbox(
            {
                x: this.sacrificePane.boundingBox.width * 0.1,
                y: this.sacrificePane.boundingBox.height * 0.75,
                width: this.sacrificePane.boundingBox.width * 0.8,
                height: this.sacrificePane.boundingBox.height * 0.2
            },
            {
                onmousedown: function ()
                {
                    if(this.selectedPaymentIndex == null)
                    {
                        return;
                    }
                    if(this.sacrificeType == PitConfig.sacrificeTypes.ore)
                    {
                        pit.makeSacrifice(this.sacrificeType, this.selectedPaymentIndex + 1, this.paymentAmount);
                    }
                    else if(this.sacrificeType == PitConfig.sacrificeTypes.relic)
                    {
                        pit.makeSacrifice(this.sacrificeType, this.selectedPaymentIndex, this.paymentAmount);
                        this.selectedPaymentIndex = null;
                    }
                    else if(this.sacrificeType == PitConfig.sacrificeTypes.scientist)
                    {
                        pit.makeSacrifice(this.sacrificeType, this.selectedPaymentIndex, this.paymentAmount);
                        this.selectedPaymentIndex = null;
                    }
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    this.initializePaymentItemList();
                }.bind(this)
            },
            "pointer",
            "sacrificeButton"
        )
        sacrificeButton.render = function (parentWindow)
        {
            var context = parentWindow.context;
            context.save();
            var relativeCoords = this.getRelativeCoordinates(0, 0, parentWindow);
            context.drawImage(upgradeb, relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
            context.fillStyle = "#000000";
            context.textBaseline = "middle";
            var buttonText;
            buttonText = _("Sacrifice");
            context.font = "32px KanitB";
            fillTextShrinkToFit(context, buttonText, relativeCoords.x + 10, relativeCoords.y + this.boundingBox.height / 2 + 2, this.boundingBox.width - 20, "center");
            context.restore();
        }.bind(sacrificeButton, this)
        this.sacrificePane.addHitbox(sacrificeButton);
        this.sacrificePane.isEnabled = () => false;
    }

    onTabChange()
    {
        this.selectedPaymentIndex = null;
        switch(this.currentTabIndex)
        {
            case 0:
                this.sacrificeType = PitConfig.sacrificeTypes.ore;
                this.slider.setVisible(true);
                this.slider.setEnabled(true);
                break;
            case 1:
                this.sacrificeType = PitConfig.sacrificeTypes.relic;
                this.slider.setVisible(false);
                this.slider.setEnabled(false);
                this.paymentAmount = new BigNumber(1);
                break;
            case 2:
                this.sacrificeType = PitConfig.sacrificeTypes.scientist;
                this.slider.setVisible(false);
                this.slider.setEnabled(false);
                this.paymentAmount = new BigNumber(1);
                break;
        }
        this.initializePaymentItemList();
    }

    render()
    {
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        if(this.selectedPaymentIndex || this.selectedPaymentIndex === 0)
        {
            this.paymentAmount = Math.round(worldResources[this.selectedPaymentIndex + 1].numOwned * this.slider.value);
        }
        super.render();
    }

    initializePaymentItemList()
    {
        var parentHitbox = this.paymentPane;
        parentHitbox.clearHitboxes();
        this.paymentItemListHitboxes = [];
        this.generateMenuContents(this.currentTabIndex, this.paymentPane);
        parentHitbox.isDirty = true;
        // parentHitbox.render();
        // this.render();
    }

    generateMenuContents(tabIndex, scrollbox)
    {
        var slotSize;
        var textBlockHeight = this.bodyContainer.boundingBox.height * 0.2;
        if(tabIndex == 2)
        {
            slotSize = Math.min(100, scrollbox.contentWidth / 2);
        }
        else
        {
            slotSize = Math.min(60, scrollbox.contentWidth / 2);;
        }
        var padding = 3;
        scrollbox.context.save();
        scrollbox.context.clearRect(0, 0, scrollbox.canvas.width, scrollbox.canvas.height);
        if(tabIndex >= 0)
        {
            var itemsInCategory;
            if(this.currentTabIndex == 0)
            {
                itemsInCategory = 12;
            }
            else if(this.currentTabIndex == 1)
            {
                itemsInCategory = numRelicsEquipped();
            }
            else if(this.currentTabIndex == 2)
            {
                itemsInCategory = aliveScientists().length;
            }
            var slotsPerRow = Math.floor((scrollbox.boundingBox.width - padding * 2 - 15) / slotSize);
            var totalRows = Math.ceil(itemsInCategory / slotsPerRow);
            var slotSpacing = ((scrollbox.boundingBox.width - padding * 2 - 15) - (slotSize * slotsPerRow)) / (slotsPerRow - 1);
            scrollbox.contentHeight = textBlockHeight + totalRows * (slotSize + slotSpacing) + 2 * padding;
            scrollbox.initializeScrollbar();
            scrollbox.currentScrollY = 0;
            for(var i = 0; i < itemsInCategory; ++i)
            {
                var indexInRow = i % slotsPerRow;
                var slotX = padding + indexInRow * (slotSize + slotSpacing);
                var slotY = textBlockHeight + padding + Math.floor(i / slotsPerRow) * (slotSize + slotSpacing);
                var sacrificeName, sacrificeDescription, icon;
                if(this.currentTabIndex == 0)
                {
                    sacrificeName = worldResources[i + 1].name;
                    sacrificeDescription = "";
                    icon = worldResources[i + 1].largeIcon;
                    drawImageFitInBox(
                        scrollbox.context,
                        icon,
                        slotX,
                        slotY,
                        slotSize,
                        slotSize
                    );
                }
                else if(this.currentTabIndex == 1)
                {
                    sacrificeName = excavationRewards[equippedRelics[i]].name;
                    sacrificeDescription = getRewardDescription(equippedRelics[i]);
                    icon = excavationRewards[equippedRelics[i]].image;
                    var relicRenderFunction = excavationRewards[equippedRelics[i]].renderFunction;
                    relicRenderFunction(
                        scrollbox.context,
                        equippedRelics[i], slotX,
                        slotY,
                        slotSize,
                        slotSize
                    );
                }
                else if(this.currentTabIndex == 2)
                {
                    sacrificeName = scientists[aliveScientists()[i][0]].name;
                    sacrificeDescription = "";
                    icon = scientists[aliveScientists()[i][0]].image;
                    drawImageFitInBox(
                        scrollbox.context,
                        icon,
                        slotX,
                        slotY,
                        slotSize,
                        slotSize
                    );
                }
                drawFrame(
                    scrollbox.context,
                    itemFrame,
                    slotX,
                    slotY,
                    slotSize,
                    slotSize,
                    4,
                    4,
                    0,
                    0
                );

                if(this.selectedPaymentIndex == i)
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
                var itemHitbox = new Hitbox(
                    {
                        x: slotX,
                        y: slotY,
                        width: slotSize,
                        height: slotSize
                    },
                    {
                        onmousedown: function (i)
                        {
                            this.selectedPaymentIndex = i;
                            this.initializeSacrificePane();
                            this.sacrificePane.isEnabled = () => true;
                            this.sacrificePane.isVisible = () => true;
                            this.generateMenuContents(this.currentTabIndex, this.paymentPane);
                        }.bind(this, i),
                        onmouseenter: function (name, description, x, y)
                        {
                            var coords = this.getGlobalCoordinates(x, y);
                            showTooltip(
                                name,
                                description,
                                coords.x * uiScaleX,
                                coords.y * uiScaleY
                            );
                        }.bind(scrollbox, sacrificeName, sacrificeDescription, slotX, slotY + slotSize),
                        onmouseexit: function ()
                        {
                            hideTooltip();
                        }
                    },
                    "pointer"
                );
                scrollbox.addHitbox(itemHitbox, true);
            }

            scrollbox.context.font = "16px KanitM";
            scrollbox.context.fillStyle = "#FFFFFF";
            scrollbox.context.textBaseline = "top";
            fillTextWrapWithHeightLimit(
                scrollbox.context,
                _("Tap an item to sacrifice it and potentially receive a reward"),
                this.boundingBox.x + (this.boundingBox.width * 0.05),
                this.boundingBox.height * 0.03,
                this.boundingBox.width * 0.9,
                textBlockHeight,
                "center"
            );

        }

        scrollbox.context.restore();
    }

    initializeSacrificePane()
    {

    }

    initializeEquipList()
    {
        var iconSize = 55;
        var padding = 10;
        var equipList = new Hitbox(
            {
                x: 30,
                y: this.bodyContainer.boundingBox.height / 2 - iconSize / 2,
                width: this.bodyContainer.boundingBox.width,
                height: iconSize
            },
            {}, "", "equipList"
        );
        for(var i = 0; i < 4; ++i)
        {
            var equipHitbox = new Hitbox(
                {
                    x: i * (iconSize + padding),
                    y: 0,
                    width: iconSize,
                    height: iconSize
                },
                {
                    onmouseenter: function (i, x, y)
                    {
                        var item = new DrillCraftingItem(drillState.equippedDrillEquips[i]);
                        var coords = this.getGlobalCoordinates(x, y);
                        showTooltip(
                            _(item.getName()),
                            _(item.getDescription()),
                            coords.x * uiScaleX,
                            coords.y * uiScaleY
                        );
                    }.bind(equipList, i, i * (iconSize + padding), iconSize),
                    onmouseexit: function ()
                    {
                        hideTooltip();
                    }
                },
                "pointer"
            )
            equipHitbox.render = function (parentWindow, i)
            {
                var item = new DrillCraftingItem(drillState.equippedDrillEquips[i]);
                var coords = this.getRelativeCoordinates(0, 0, parentWindow);
                parentWindow.context.drawImage(item.getIcon(), coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }.bind(equipHitbox, this, i);
            equipList.addHitbox(equipHitbox);
        }
        this.equipList = equipList;
        this.addHitbox(equipList);
        if(this.currentTabIndex != 2)
        {
            this.equipList.isEnabled = () => false;
            this.equipList.isVisible = () => false;
        }
    }

    tutorialFlicker()
    {
        if(getBlueprintCount() == 0)
        {
            this.flickerTab(0, 500);
            return true;
        }
        else if(!hasCraftedABlueprint && canCraftAnyBlueprint())
        {
            this.flickerTab(1, 500);
            return true;
        }
        return false;
    }
}