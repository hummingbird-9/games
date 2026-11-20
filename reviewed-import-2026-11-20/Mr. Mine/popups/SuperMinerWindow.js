class SuperMinerWindow extends PopupWindow
{
    layerName = "SuperMinerWindow"; // Used as key in activeLayers
    domElementId = "SMSD";
    context = SMS;

    isRendered = true;
    isPopup = true;
    allowBubbling = true;


    constructor(boundingBox, superMiner)
    {
        super(boundingBox); // Need to call base class constructor

        this.superMiner = superMiner;
        this.bg = superMiner.rarity.largeFrame
        this.showingTooltip = false;
        this.buttonAnimation = new SpritesheetAnimation(btnShine, 7, 7);
        this.lastAnimation = 0;

        this.setBoundingBox();
        this.boundingBox.height = superMiner.rarity.largeFrame.height * this.boundingBox.width / superMiner.rarity.largeFrame.width;
        this.initHitboxes();
    }

    initHitboxes()
    {   
        this.closeButton = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.9,
                y: 0,
                width: this.boundingBox.width * 0.1,
                height: this.boundingBox.height * 0.065
            },
            {
                onmousedown: function ()
                {
                    openUi(SuperMinersWindow);
                    hideTooltip();
                }
            },
            'pointer',
            "closeButton",
            true,
            true
        ));

        this.levelUpButton = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.05,
                y: this.boundingBox.height * 0.573,
                width: this.boundingBox.width * 0.90,
                height: this.boundingBox.height * 0.075
            },
            {
                onmousedown: () =>
                {
                    if(this.superMiner.canLevel())
                    {
                        showConfirmationPrompt(
                            _("Level up {0} for {1} Super Miner Souls", this.superMiner.name, this.superMiner.getLevelCost()),
                            _("Yes"),
                            () =>
                            {
                                if(this.superMiner.canLevel())
                                {
                                    this.superMiner.levelUp()
                                }
                            },
                            _("No")
                        )
                    }
                }
            },
            'pointer',
            "levelUpButton",
            true,
            true
        ));

        this.skillButton = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.05,
                y: this.boundingBox.height * 0.74,
                width: this.boundingBox.width * 0.195,
                height: this.boundingBox.height * 0.13
            },
            {
                onmousedown: () =>
                {
                    if(isMobile() && this.superMiner.percentageUntilAction() < 1)
                    {
                        if(!this.showingTooltip && this.superMiner.buttonTooltip)
                        {
                            showUpdatingTooltip(() => this.superMiner.buttonTooltip(),
                                this.boundingBox.width * 0.345,
                                this.boundingBox.height * .56,
                                mainw * 0.1
                            )
                            this.showingTooltip = true;
                        }
                        else
                        {
                            this.showingTooltip = false;
                            hideTooltip();
                        }
                    }

                    
                    if(this.superMiner.onButtonPress) this.superMiner.onButtonPress()
                },
                onmouseenter: () =>
                {
                    if(this.superMiner.percentageUntilAction() < 1 && this.superMiner.buttonTooltip)
                    {
                        showUpdatingTooltip(() => this.superMiner.buttonTooltip(),
                            this.boundingBox.width * 0.345,
                            this.boundingBox.height * .56,
                            mainw * 0.1
                        )
                    }
                },
                onmouseexit: () => hideTooltip(),
            },
            'pointer',
            "skillButton",
            true,
            true
        ));
    }

    render()
    {
        this.context.save();
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);

        drawColoredRect(this.context, 0, 0, this.boundingBox.width, this.boundingBox.height, "#000000", 0.5);
        this.context.font = (this.boundingBox.height * 0.05) + "px KanitB";
        this.context.lineWidth = 6;

        let buttonBg = this.superMiner.hasButton ? this.superMiner.rarity.button : this.superMiner.rarity.flatButton
        let buttonIcon = this.superMiner.buttonIcon;
        let rarity = this.superMiner.rarity.name;
        let portrait = this.superMiner.portrait;

        let popupWidth = this.boundingBox.width;
        let popupHeight = this.boundingBox.height;
        let popupX = 0;
        let popupY = 0;
        let xOffset = popupX + (this.boundingBox.width * 0.01);

        //background
        this.context.drawImage(this.bg, popupX, popupY, popupWidth, popupHeight);

        //**********************
        //Foreground stuff below
        //**********************

        //name
        this.context.lineWidth = 6;
        this.context.fillStyle = "#FFFFFF";
        strokeTextShrinkToFit(this.context, this.superMiner.name, xOffset, popupY + (popupHeight * .055), popupWidth * .6, "left");
        this.context.strokeStyle = "#000000";
        fillTextShrinkToFit(this.context, this.superMiner.name, xOffset, popupY + (popupHeight * .055), popupWidth * .6, "left");

        //level
        this.context.fillStyle = "#000000";
        fillTextShrinkToFit(this.context, _("Lvl. {0}", this.superMiner.level), xOffset, popupY + (popupHeight * .055), popupWidth * .83, "right");
        
        //portrait
        drawImageFitInBox(
            this.context,
            portrait, 
            popupWidth * 0.206, 
            popupHeight * 0.101, 
            popupWidth * 0.585, 
            popupHeight * 0.403,
            "center",
            "bottom"
        );

        //rarity
        this.context.font = (this.boundingBox.height * 0.025) + "px KanitB";
        this.context.strokeStyle = "#FFFFFF";
        this.context.lineWidth = 2;
        strokeTextShrinkToFit(this.context, rarity, popupX, popupY + (popupHeight * .535), popupWidth, "center");
        this.context.fillStyle = "#A25D03";
        fillTextShrinkToFit(this.context, rarity, popupX, popupY + (popupHeight * .535), popupWidth, "center");
        this.context.strokeStyle = "#000000"

        //level up button
        let levelButtonAsset = this.superMiner.canLevel() ? smGreenButton : smGrayButton;
        this.context.fillStyle = "#000000";
        this.context.font = (this.boundingBox.height * 0.03) + "px KanitB";
        let levelUpButton = this.getHitboxById("levelUpButton");
        this.context.drawImage(levelButtonAsset, xOffset + levelUpButton.boundingBox.x, levelUpButton.boundingBox.y, levelUpButton.boundingBox.width, levelUpButton.boundingBox.height);

        if(this.superMiner.isMaxLevel())
        {
            fillTextShrinkToFit(this.context,
                _("MAX LEVEL"),
                xOffset + levelUpButton.boundingBox.x,
                levelUpButton.boundingBox.y + (levelUpButton.boundingBox.height * .7),
                levelUpButton.boundingBox.width,
                "center");

        }
        else
        {
            let textPosition = fillTextShrinkToFit(
                this.context,
                _("Level up: {0}", this.superMiner.getLevelCost()),
                xOffset + levelUpButton.boundingBox.x,
                levelUpButton.boundingBox.y + (levelUpButton.boundingBox.height * .7),
                levelUpButton.boundingBox.width * .9,
                "center"
            );

            let souls = worldResources[SUPER_MINER_SOULS_INDEX];
            let soulSize = levelUpButton.boundingBox.height * .5;
            this.context.drawImage(
                souls.largeIcon,
                0,
                0,
                souls.largeIcon.width,
                souls.largeIcon.height,
                textPosition.x2 + 5,
                levelUpButton.boundingBox.y + (levelUpButton.boundingBox.height * .25),
                soulSize,
                soulSize
            );
        }

        //skill icon/button
        let button = this.getHitboxById("skillButton");
        this.context.drawImage(buttonBg, 0, 0, buttonBg.width, buttonBg.height, button.boundingBox.x, button.boundingBox.y, button.boundingBox.width, button.boundingBox.height);

        if(buttonIcon)
        {
            this.context.drawImage(buttonIcon, 0, 0, buttonIcon.width, buttonIcon.height, button.boundingBox.x + (button.boundingBox.width * .05), button.boundingBox.y + (button.boundingBox.height * .05), button.boundingBox.width * .9, button.boundingBox.height * .9);
        }

        if(this.superMiner.canPressButton())
        {
            if(currentTime() - 4000 > this.lastAnimation)
            {
                this.lastAnimation = currentTime();
                this.buttonAnimation.gotoAndPlay(0);
                this.buttonAnimation.playUntilFinished();
            }

            if(!this.buttonAnimation.isPaused)
            {
                this.buttonAnimation.drawAnimation(
                    this.context, 
                    button.boundingBox.x, 
                    button.boundingBox.y,
                    button.boundingBox.width,
                    button.boundingBox.height);
            }
        }


        //skill progress bar
        if(this.superMiner.needsProgressBar)
        {
            this.context.fillStyle = "#000000";
            renderRoundedRectangle(this.context, xOffset + (button.boundingBox.width * .25), button.boundingBox.y + (button.boundingBox.height * 1.05), (button.boundingBox.width * .9), popupHeight * 0.03, 2, "#000000", "#000000", 2);
            this.context.fillStyle = "#FF8800";
            let fillAmount = Math.max(0.06, this.superMiner.percentageUntilAction()); //rounded rectangles are weird with small percentages
            renderRoundedRectangle(this.context, xOffset + (button.boundingBox.width * .25), button.boundingBox.y + (button.boundingBox.height * 1.05), (button.boundingBox.width * .88) * fillAmount, popupHeight * 0.03, 4, "#000000", "#FF8800", 0);
        }

        //description (handled by the super miner class, did it this way incase we want multiple things shown for certain miners)
        this.context.fillStyle = "#FFFFFF";
        this.context.font = (this.boundingBox.height * 0.03) + "px Verdana";
        this.context.textBaseline = "top"
        if(this.superMiner.renderDescription)
        {
            this.superMiner.renderDescription(
                this.context, 
                this.boundingBox.width * 0.33, 
                this.boundingBox.height * 0.70, 
                this.boundingBox.width * 0.60, 
                this.boundingBox.height * 0.25
            );
        }
        this.context.restore();

        super.render(); // Render any child layers
    }
}