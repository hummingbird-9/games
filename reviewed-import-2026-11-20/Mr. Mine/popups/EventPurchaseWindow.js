class EventPurchaseWindow extends BottomTabbedPopup
{
    layerName = "Purchase"; // Used as key in activeLayers
    domElementId = "PURCHASED"; // ID of dom element that gets shown or hidden
    context = PU;         // Canvas rendering context for popup

    buyButtons = [];
    useButtons = [];

    constructor(boundingBox, worldIndex = 0)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        this.topFrameImage = xmasFrame;
        this.backgroundImage = snowBG;
        
        this.initializeTabs();
        
        var chestWidth = this.bodyContainer.boundingBox.width * 0.5;
        var chestHeight = this.bodyContainer.boundingBox.height * 0.45;
        var chestVerticalPadding = this.bodyContainer.boundingBox.height * 0.03

        this.createChestButton(
            ChestType.basic, 
            1, 
            0,
            chestVerticalPadding, 
            chestWidth, 
            chestHeight
        );

        this.createChestButton(
            ChestType.gold, 
            10, 
            chestWidth,
            chestVerticalPadding, 
            chestWidth, 
            chestHeight
        );

        this.createChestButton(
            ChestType.black, 
            30, 
            chestWidth / 2,
            chestHeight + 2 * chestVerticalPadding, 
            chestWidth, 
            chestHeight
        );
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
            if(worldResources[HOLIDAY_RESOURCE_INDEX].numOwned >= cost)
            {
                if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
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
                worldResources[HOLIDAY_RESOURCE_INDEX].numOwned -= cost;
            } else
            {
                if (cost == 1)
                {
                    newNews(_("Not enough candy canes. You need {0} candy cane.", cost));
                }
                else
                {
                    newNews(_("Not enough candy canes. You need {0} candy canes.", cost));
                }
            }
        }.bind(button);

        container.render = function()
        {
            var context = this.parent.parent.context;
            var coords = this.getRelativeCoordinates(0, 0, this.parent.parent);
            var chestImage;
            var frameImage;
            switch (this.chestType)
            {
                case ChestType.basic:
                    chestImage = basicChestIconClosed;
                    frameImage = xmasPurchase1;
                    break;
                case ChestType.gold:
                    chestImage = goldChestIconClosed;
                    frameImage = xmasPurchase3;
                    break;
                case ChestType.black:
                    chestImage = blackChestIconClosed;
                    frameImage = xmasPurchase2;
                    break;
                default:
                    chestImage = chest1;
                    frameImage = xmasPurchase1;
            }
            drawImageFitInBox(
                context,
                frameImage, 
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            );
            drawImageFitInBox(
                context,
                chestImage, 
                coords.x + this.boundingBox.width * 0.15,
                coords.y,
                this.boundingBox.width * 0.7,
                this.boundingBox.height * 0.75,
                "center",
                "top"
            );
            context.font = "26px KanitM";
            context.fillStyle = "#FFFFFF";
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
    }

    render()
    {
        super.render();
        this.context.save();
        this.context.fillStyle = "#000000";
        this.context.font = "24px KanitM";
        this.context.textBaseline = "middle";
        var box = drawImageFitInBox(
            this.context,
            holidayCurrencyIconHD, 
            purchasedw * 0.025, 
            purchasedh * 0.93, 
            purchasedw * .09, 
            purchasedh * .05
        );
        this.context.fillText(
            "x" + worldResources[HOLIDAY_RESOURCE_INDEX].numOwned, 
            box.x + box.width + purchasedw * 0.0125, 
            box.y + box.height / 2
        );
        drawImageFitInBox(
            this.context,
            xmasPopupLights,
            this.bodyContainer.boundingBox.x,
            this.bodyContainer.boundingBox.y,
            this.bodyContainer.boundingBox.width,
            this.bodyContainer.boundingBox.height,
            "center",
            "top"
        )
        this.context.restore();
    }
}