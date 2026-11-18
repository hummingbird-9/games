class OfflineProgress extends BottomTabbedPopup
{
    layerName = "offlineProgress"; // Used as key in activeLayers
    domElementId = "OFFLINEPROGRESSD"; // ID of dom element that gets shown or hidden
    context = OFFLINEPROGRESS;         // Canvas rendering context for popup
    offlineProgressResults = {};
    openTime = 0;

    constructor(boundingBox)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        this.initializeTabs(Object.values({}));

        var fontSize = Math.min(32, this.boundingBox.height * 0.080);
        this.craftButton = this.bodyContainer.addHitbox(
            new Button(
                startb, _("Craft"), fontSize + "px KanitB", "#000000",
                {
                    x: this.bodyContainer.boundingBox.width * 0.05,
                    y: this.bodyContainer.boundingBox.height * 0.83,
                    width: this.bodyContainer.boundingBox.width * 0.9,
                    height: this.bodyContainer.boundingBox.height * 0.15
                }, 
                {
                    onmousedown: function()
                    {
                        var craftingWindow = openUi(CraftingWindow, null, 1);
                        if(craftingWindow)
                        {
                            craftingWindow.openTab(1);
                            craftingWindow.selectedBlueprint = getBlueprintById(3, 2);
                            craftingWindow.initializeCraftingPane();
                        }
                    }
                }
            )
        )
        this.craftButton.useNineSliceRendering = true;
        this.craftButton.isEnabled = () => managerStructure.level < 3;
        this.craftButton.isVisible = () => managerStructure.level < 3;

        this.openTime = currentTime();
    }

    timeSinceOpened()
    {
        return currentTime() - this.openTime;
    }

    setOfflineProgressValues(offlineProgressResults)
    {
        this.offlineProgressResults = offlineProgressResults;
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        super.render();

        this.context.fillStyle = "#FFFFFF";
        this.context.textBaseline = "top";
        if(managerStructure.level > 0 && this.offlineProgressResults.hasOwnProperty("secondsOffline"))
        {
            this.craftButton.text = _("Upgrade");
            var managerImage;
            if(managerStructure.level == 1)
            {
                managerImage = manager1;
            }
            else if(managerStructure.level == 2)
            {
                managerImage = manager2;
            }
            else
            {
                managerImage = manager3;
            }

            this.context.font = "24px KanitM";

            var progressText = _("+ {0} Km in Depth", this.offlineProgressResults.depth.toFixed(2)) + " <br> " + 
                _("+ ${0} in minerals", beautifynum(this.offlineProgressResults.mineralValue));

            var textBox1 = fillTextWrap(
                this.context,
                _("While Offline Your Manager Gained You:") ,
                10,
                this.bodyContainer.boundingBox.y + 10,
                offlineprogressdw - 20,
                "center"
            );

            this.context.font = "18px KanitM";
            var textBox2 = fillTextWrap(
                this.context,
                progressText,
                10,
                textBox1.y2 + 10,
                offlineprogressdw - 20,
                "center"
            );
            
            this.context.font = "14px KanitM";
            var textBox3 = fillTextWrapWithHeightLimit(
                this.context, 
                _("Level up your manager to improve offline efficiency and max offline duration."), 
                10, 
                this.bodyContainer.boundingBox.height * 0.85,
                offlineprogressdw-20, 
                this.bodyContainer.boundingBox.height * 0.2,
                "center"
            );

            var managerWidth = Math.floor(offlineprogressdw * .3);
            drawImageFitInBox(
                this.context, 
                managerImage, 
                Math.ceil(offlineprogressdw * 0.5 - managerWidth / 2), 
                textBox2.y2 + 10,
                managerWidth, 
                textBox3.y1 - textBox2.y2 - 20
            );
        }
        else if (managerStructure.level == 0)
        {
            this.craftButton.text = _("Craft");
            this.context.textBaseline = "top";
            this.context.font = "24px KanitM";
            var textBox1 = fillTextWrap(
                this.context,
                _("While Offline... Nothing Happened!"),
                10,
                this.bodyContainer.boundingBox.y + 10,
                offlineprogressdw - 20,
                "center"
            );

            this.context.font = "18px KanitM";
            var textBox2 = fillTextWrapWithHeightLimit(
                this.context, 
                _("Craft a manager to gain progress while offline"), 
                10, 
                this.bodyContainer.boundingBox.height * 0.75,
                offlineprogressdw-20, 
                this.bodyContainer.boundingBox.height * 0.2,
                "center"
            );
            var managerWidth = Math.floor(offlineprogressdw * .3);
            drawImageFitInBox(
                this.context, 
                manager1, 
                Math.ceil(offlineprogressdw * 0.5 - managerWidth / 2), 
                textBox1.y2 + 10,
                managerWidth, 
                textBox2.y1 - textBox1.y2 - 20
            );
        }
        this.context.restore();
    }

    close()
    {
        if(isPlayerReadyForPromo())
        {
            setTimeout(function () {openUi(PromoPopup);}, 100);
        }

        return super.close();
    }
}