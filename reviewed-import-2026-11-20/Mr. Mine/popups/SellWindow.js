class SellWindow extends BottomTabbedPopup {
    layerName = "SELL"; // Used as key in activeLayers
    domElementId = "SELLD"; // ID of dom element that gets shown or hidden
    context = SL;         // Canvas rendering context for popup

    worldIndex;
    resourcePane;

    box;
    resourceIndexesViewed;

    //Slot vars
    slotSpacingY = 5;
    sellPriceMultiplier = STAT.sellPriceMultiplier();
    sellAllProfit = 0;

    constructor(boundingBox, worldIndex) {
        super(boundingBox);
        if (!boundingBox) {
            this.setBoundingBox();
        }

        if (worldIndex < 0)
        {
            worldIndex = worldAtDepth(currentlyViewedDepth).index;
        }
        this.worldIndex = worldIndex;
         
        //Sizes
        this.slotSizeX = this.boundingBox.width * .98;
        this.slotSizeY = this.boundingBox.height * .33;

        var sellCategories = {
            0: "Ore",
            1: "Isotopes"
        }
        this.initializeTabs(Object.values(sellCategories));

        //Scrollbox area/position
        this.sellScrollbox = new DraggableScrollbox(
            this.bodyContainer.boundingBox.width,
            1,
            this.context,
            0,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width * .98,
            this.bodyContainer.boundingBox.height,
            15
        );
        this.addHitbox(this.sellScrollbox);

        this.box = this.sellScrollbox;
        this.onTabChange();
    }

    onTabChange() {
        this.resourceIndexesViewed = this.getTabResources()
        var totalRows = this.resourceIndexesViewed.length+1;

        this.box.clearHitboxes();
        this.box.context.save();
        this.box.context.clearRect(0, 0, this.box.contentWidth, this.box.contentWidth);
        this.box.contentHeight = totalRows * this.slotSizeY + (totalRows - 1) * this.slotSpacingY + 1;
        this.box.context.fillRect(0, this.slotY, this.slotSizeX, this.slotSizeY);
        this.initScrollboxHitboxes();
        this.box.initializeScrollbar();
        this.box.currentScrollY = 0;
        this.box.hitboxYOffset = 0;
    }

    getWorld() {
        return worlds[this.worldIndex];
    }

    getTabResources() {
        if (this.currentTabIndex == 0) {
            return this.getWorld().mineralIdsToSell;
        }
        else if (this.currentTabIndex == 1) {
            return this.getWorld().isotopeIdsToSell;
        }
    }

    initScrollboxHitboxes() {

        this.box.addHitbox(new Hitbox(
            {
                x: this.slotSizeX * .64,
                y: 0 + (this.slotSizeY * .15),
                width: this.slotSizeX * 0.333,
                height: this.slotSizeY * 0.35,
                
            },
            {
                onmousedown: function () {
                    this.sellAllButtonClick();
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                }.bind(this),
            },
            "pointer"
        )
        );

        for (var i in this.resourceIndexesViewed) {
            var resourceId = this.resourceIndexesViewed[i];
            var worldResource = worldResources[resourceId];
            var slotY = Math.floor(i * (this.slotSizeY + this.slotSpacingY) + (this.slotSizeY * .66) + 5);

            if ((!worldResource.isIsotope && highestOreUnlocked >= resourceId) || (worldResource.isIsotope && (highestIsotopeUnlocked + 2) >= resourceId)) {
                //Sell button hitbox
                this.box.addHitbox(new Hitbox( //sell button hitbox
                    {
                        x: this.slotSizeX - (this.slotSizeX * 0.37),
                        y: slotY + 5,
                        width: this.slotSizeX * 0.33,
                        height: this.slotSizeY * 0.75,
                    },
                    {
                        onmousedown: function (resourceId) {
                            this.sellButtonClick(resourceId);
                            if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        }.bind(this, resourceId),
                    },
                    "pointer"
                )
                );

                //Lock button
                var newLockButton = this.box.addHitbox(new Hitbox(
                    {
                        x: this.slotSizeX * 0.51,
                        y: slotY + (this.slotSizeY * .35),
                        width: this.slotSizeX * 0.1,
                        height: this.slotSizeY * 0.3
                    },
                    {
                        onmousedown: this.lockButtonClick(i)
                    },
                    'pointer',
                    "lockButton_" + i
                ))
                newLockButton.isEnabled = function (i) {
                    return i < this.getTabResources().length;
                }.bind(this, i);
                newLockButton.isVisible = newLockButton.isEnabled;
            }
        }
    }

    getLockIconForMineral(mineralNumber)
    {
        if(managerStructure.level < 1)
        {
            return greylock;
        }
        if(lockedMineralAmtsToSave[mineralNumber] == 0)
        {
            return unlock;
        }
        else
        {
            return lock;
        }
    }

    generateScrollboxContents() {
        this.sellAllProfit = new BigNumber(0);
        this.box.clearCanvas();

        for (var i in this.resourceIndexesViewed) {
            var resourceId = this.resourceIndexesViewed[i];
            var worldResource = worldResources[resourceId];
            var slotY = Math.floor(i * (this.slotSizeY + this.slotSpacingY)) + (this.slotSizeY * .66) + 5;
            this.sellAllProfit.addInPlace(getMineralSaleStats(resourceId).profit);
            var fontSize = Math.max(22, Math.ceil(this.slotSizeY * .2));

            this.box.context.fillStyle = "#402611A6";
            this.box.context.strokeStyle = "#a15e28";
            roundRect(this.box.context, 0, slotY, this.slotSizeX, this.slotSizeY, 5, true, true)

            this.box.context.fillStyle = "#2e1b0c";
            this.box.context.strokeStyle = "#522f14";
            roundRect(this.box.context, this.boundingBox.width * .01,  slotY + (this.slotSizeY * .75), this.slotSizeX * .45, this.slotSizeY * .23, 5, true, true)

            if ((!worldResource.isIsotope && highestOreUnlocked >= resourceId) || (worldResource.isIsotope && (highestIsotopeUnlocked + 2) >= resourceId)) 
            {
    
                //Sell button
                this.box.context.fillStyle = "#000000";
                this.box.context.font = fontSize + "px KanitB"
                var sellPriceMultiplier = STAT.sellPriceMultiplier();
                var sellButtonToUse = worldResource.numOwned > 0 ? sellbutton : sellbuttonGray;

                this.box.context.drawImage(
                    sellButtonToUse, 
                    0, 
                    0, 
                    sellbutton.width, 
                    sellbutton.height, 
                    this.slotSizeX * 0.64, 
                    slotY + (this.slotSizeY * .1), 
                    this.slotSizeX * 0.33,
                    this.slotSizeY * 0.75
                    );

                this.box.context.fillText(_("SELL"), (this.slotSizeX * 0.8) - this.box.context.measureText(_("SELL")).width / 2,  slotY + (this.slotSizeY * .37));
                this.box.context.font = fontSize + "px KanitM"
                this.box.context.fillStyle = "#FFFFFF";

                
                //Item icon
                this.box.context.drawImage(
                    worldResource.largeIcon, 
                    0, 
                    0, 
                    worldResource.largeIcon.width, 
                    worldResource.largeIcon.height, 
                    Math.ceil(this.slotSizeX * .24) - ((this.slotSizeX * .099)/2), 
                    (slotY + (this.slotSizeY + this.slotSpacingY)) - (this.slotSizeY), 
                    this.slotSizeX * .12, 
                    this.slotSizeY * .414
                    );

                //Item Name
                this.box.context.fillText(
                    worldResource.name, 
                    Math.ceil(this.slotSizeX * .24 - this.box.context.measureText(worldResource.name).width / 2), 
                    Math.ceil(slotY + (this.slotSizeY * .6))
                );

                //Item Amt
                this.box.context.fillText("x" + beautifynum(worldResource.numOwned), 8,  slotY + (this.slotSizeY * .93));

                //Item sell value
                this.box.context.font = (fontSize * .75) + "px KanitM"
                var mineralSellValue = worldResource.sellValue.multiply(Math.max(0, worldResource.numOwned - lockedMineralAmtsToSave[resourceId]));
                fillTextShrinkToFit(this.box.context, "+$" + beautifynum(mineralSellValue.multiply(sellPriceMultiplier)), this.slotSizeX * 0.68,  slotY + (this.slotSizeY * .54), this.slotSizeX * 0.265);

                //Item amt to sell
                this.box.context.fillStyle = "#000000";
                fillTextShrinkToFit(this.box.context, "x" + beautifynum(Math.max(0, worldResource.numOwned - lockedMineralAmtsToSave[resourceId])), this.slotSizeX * 0.68,  slotY + (this.slotSizeY * .685), this.slotSizeX * 0.265);
                this.box.context.font = (fontSize * .65) + "px KanitM"

                //Lock button
                this.box.context.drawImage(this.getLockIconForMineral(resourceId), 0, 0, lock.width, lock.height, this.slotSizeX * .50, slotY + (this.slotSizeY * .35), this.slotSizeX * .1, this.slotSizeY * .3);
            }
            else {
                //We havent unlocked the item yet
                this.box.context.font = "18px KanitM"

                this.box.context.fillText(_("????"), (this.slotSizeX * 0.8) - this.box.context.measureText(_("????")).width / 2, slotY + 22);
                this.box.context.drawImage(
                    worldResource.largeIconHidden, 
                    0, 
                    0, 
                    worldResource.largeIconHidden.width, 
                    worldResource.largeIconHidden.height, 
                    this.slotSizeX * .17, 
                    slotY, 
                    this.slotSizeX * ((worldResource.largeIcon.width/this.slotSizeX) * .8) , 
                    this.slotSizeY * ((worldResource.largeIcon.height/this.slotSizeY) * .8)
                    );
                this.box.context.font = "12px KanitM"
            }

        }

        
        this.box.context.fillStyle = "#402611A6";
        this.box.context.strokeStyle = "#a15e28";
        roundRect(this.box.context, 0, 0, this.slotSizeX, this.slotSizeY * .66, 5, true, true)
        this.box.context.fillStyle = "#FFFFFF";
        
        this.box.context.font = "18px KanitM"
        renderButton(this.box.context, startButton, _("SELL ALL"), this.slotSizeX * 0.64, 0 + (this.slotSizeY * .15), this.slotSizeX * 0.33, this.slotSizeY * 0.35, "18px Verdana", "#000000");
        fillTextShrinkToFit(this.box.context, "+$" + beautifynum(this.sellAllProfit), (this.slotSizeX * 0.3) - this.box.context.measureText("+$" + beautifynum(this.sellAllProfit)).width/2, 0 + (this.slotSizeY * .35), this.slotSizeX );
        this.box.context.font = "12px KanitM"
    }

    render() {
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.generateScrollboxContents();
        super.render(); // Render any child layers
    }

    sellAllButtonClick() {
        var previousMoney = money;
        for (var i in this.resourceIndexesViewed) {
            var resourceIndex = this.resourceIndexesViewed[i];
            sellMineral(resourceIndex);
        }
    }

    sellButtonClick(resourceId) {
        var previousMoney = money;
        sellMineral(resourceId);
    }

    lockButtonClick(buttonIndex) {
        return function () {
            if (managerStructure.level >= 1) {
                if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                var resourceIndexesViewed = this.parent.parent.getTabResources();
                var mineralIndex = resourceIndexesViewed[buttonIndex];
                showSimpleInput(_("Enter the amount of {0} you want to prevent from being sold.", getLockedMineralName(mineralIndex)), _("Update Minimum Amount"), "", getMineralUpdateLockFunction(mineralIndex), _("Cancel"));
            }
        };
    }
}