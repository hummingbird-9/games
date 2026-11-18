class ChestWindow extends BottomTabbedPopup
{
    layerName = "Chest"; // Used as key in activeLayers
    domElementId = "CHESTD"; // ID of dom element that gets shown or hidden
    context = CH;         // Canvas rendering context for popup
    chestIsOpen = false;
    animationStartFrame = -1;
    animationLength = 8;

    zIndex = 4;

    constructor(boundingBox, chest)
    {
        super(boundingBox); // Need to call base class constructor
        if(!boundingBox)
        {
            this.setBoundingBox();
        }

        this.initializeTabs(Object.values({}));

        this.chest = chest;
        if(chest.type == ChestType.gold)
        {
            this.spritesheet = goldChestSpritesheet;
        }
        else if(chest.type == ChestType.black)
        {
            this.spritesheet = blackChestSpritesheet;
        }
        else
        {
            this.spritesheet = basicChestSpritesheet;
        }

        this.chestIconWidth = this.boundingBox.width * .4;
        this.chestIconHeight = this.boundingBox.height * .4;
        
        this.bodyContainer.addHitbox(new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.bodyContainer.boundingBox.width,
                height: this.bodyContainer.boundingBox.height
            },
            {
                onmousedown: function ()
                {
                    this.parent.parent.onChestClicked();
                }
            },
            'pointer',
            "chestButton"
        ));
        this.render();

        var fontSize = Math.min(32, this.boundingBox.height * 0.080);
        this.nextChestButton = this.bodyContainer.addHitbox(
            new Button(
                startb, _("Next Chest"), fontSize + "px KanitB", "#000000",
                {
                    x: this.bodyContainer.boundingBox.width * 0.05,
                    y: this.bodyContainer.boundingBox.height * 0.83,
                    width: this.bodyContainer.boundingBox.width * 0.9,
                    height: this.bodyContainer.boundingBox.height * 0.15
                }, 
                {
                    onmousedown: function()
                    {
                        let sortedChests = chestService.chests.sort((a, b) => a.depth - b.depth);
                        for(var i = 0; i < sortedChests.length; i++)
                        {
                            if(chestService.chests[i])
                            {
                                panToViewDepth(sortedChests[i].depth);
                                this.parent.parent.onChestClicked();
                                return;
                            }
                        }
                    }
                }
            )
        )
        this.nextChestButton.useNineSliceRendering = true;
        this.nextChestButton.isEnabled = () => metalDetectorStructure.level >= 4 && this.chestIsOpen && chestService.chests.length > 0;
        this.nextChestButton.isVisible = this.nextChestButton.isEnabled;
    }

    onChestClicked()
    {
        if(this.chestIsOpen)
        {
            closeUi(this);
        }
        else
        {
            this.animationStartFrame = numFramesRendered;
            this.chestIsOpen = true;
            chestService.giveChestReward(this.chest);
            newNews(_("You got {0} from a Chest!", chestService.getChestRewardText()), true);

            if(this.chest.isGolden)
            {
                if(!mutebuttons) chestGoldOpenAudio.play();
            }
            else
            {
                if(!mutebuttons) chestOpenAudio.play();
            }
        }
    }

    render()
    {
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        super.render();
        this.context.save();
        //this.context.drawImage(popupBackground, 0, 0, popupBackground.width, popupBackground.height, 0, 0, this.boundingBox.width, this.boundingBox.height);
        //this.context.drawImage(popupFrame, 0, 0, popupFrame.width, popupFrame.height, 0, 0, this.boundingBox.width, this.boundingBox.height);

        if(this.chestIsOpen)
        {
            this.renderOpenChest();
        }
        else
        {
            this.renderClosedChest();
        }
        this.context.restore();
    }

    close()
    {
        if(worlds[0].workersHired == 0 && !this.chestIsOpen)
        {
            this.onChestClicked()
        }
        else
        {
            delete activeLayers[this.layerName];
            return super.close();
        }
    }

    renderChest()
    {
        var frame = this.getAnimationFrame();
        var frameWidth = this.spritesheet.width / this.animationLength;
        this.context.drawImage(
            this.spritesheet,
            frame * frameWidth,
            0,
            frameWidth,
            this.spritesheet.height,
            this.boundingBox.width / 2 - this.chestIconWidth / 2,
            this.boundingBox.height / 2 - this.chestIconHeight / 2,
            this.chestIconWidth,
            this.chestIconHeight
        )
    }

    renderOpenChest()
    {
        this.renderChest();
        this.context.font = "18px Verdana";
        this.context.fillStyle = "#FFFFFF";
        this.context.strokeStyle = "#000000";
        this.context.lineWidth = 2;
        this.context.strokeText(_("You got {0}!", chestService.getChestRewardText()), (this.boundingBox.width * .5) - (this.context.measureText(_("You got {0}!", chestService.getChestRewardText())).width * .5), 200);
        this.context.fillText(_("You got {0}!", chestService.getChestRewardText()), (this.boundingBox.width * .5) - (this.context.measureText(_("You got {0}!", chestService.getChestRewardText())).width * .5), 200);
        this.context.fillStyle = "#FFFFFF";
    }

    renderClosedChest()
    {
        this.renderChest();
        this.context.fillStyle = "#FFFFFF";
        let chestText = isMobile() ? _("TAP CHEST TO OPEN") : _("CLICK CHEST TO OPEN")
        this.context.fillText(chestText, (this.boundingBox.width * .5) - (this.context.measureText(chestText).width * .5), chestch * .9);
    }

    getAnimationFrame()
    {
        if(this.animationStartFrame < 0)
        {
            return 0;
        }
        else if(numFramesRendered - this.animationStartFrame >= this.animationLength)
        {
            return this.animationLength - 1;
        }
        return (numFramesRendered - this.animationStartFrame) % this.animationLength;
    }
}