class SuperMinerSelectorWindow extends PopupWindow
{
    layerName = "SuperMinerSelectorWindow"; // Used as key in activeLayers
    domElementId = "SPECIALD";
    context = SPC;

    isRendered = true;
    isPopup = true;
    allowBubbling = false;
    zIndex = 4;


    constructor(boundingBox, superMiner)
    {
        super(boundingBox);
        this.setBoundingBox();

        this.superMiner = superMiner;
        this.bg = superMiner.rarity.mediumFrame
        this.madeAChoice = false;

        this.initializeHitboxes();
    }

    initializeHitboxes()
    {
        this.clearHitboxes();

        var popupHeight = this.boundingBox.height;
        var popupWidth = this.bg.width * popupHeight / this.bg.height; 

        this.popupBody = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width / 2 - popupWidth,
                y: 0,
                width: popupWidth,
                height: popupHeight
            },
            {},
            ""
        ))

        this.popupBody.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent);
            var context = this.parent.context;
            context.save();
            context.lineWidth = 6;

            let rarity = this.parent.superMiner.rarity.name;
            let portrait = this.parent.superMiner.portrait;

            //background
            context.drawImage(
                this.parent.bg,
                coords.x,
                coords.y, 
                this.boundingBox.width, 
                this.boundingBox.height
            );

            context.textBaseline = "top";
            context.font = (this.boundingBox.height * 0.075) + "px KanitB";

            //name
            context.fillStyle = "#000000";
            fillTextShrinkToFit(
                context, 
                this.parent.superMiner.name, 
                coords.x, 
                coords.y, 
                this.boundingBox.width, 
                "center"
            );

            //portrait
            drawImageFitInBox(
                context,
                portrait, 
                coords.x + this.boundingBox.width * 0.206, 
                coords.y + this.boundingBox.height * 0.101, 
                this.boundingBox.width * 0.585, 
                this.boundingBox.height * 0.46,
                "center",
                "bottom"
            );

            //rarity
            context.font = (this.boundingBox.height * 0.04) + "px KanitB";
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 2;
            strokeTextShrinkToFit(
                context, 
                rarity, 
                coords.x, 
                coords.y + (this.boundingBox.height * 0.575), 
                this.boundingBox.width, 
                "center"
            );
            context.fillStyle = "#A25D03";
            fillTextShrinkToFit(
                context, 
                rarity, 
                coords.x, 
                coords.y + (this.boundingBox.height * 0.575), 
                this.boundingBox.width, 
                "center"
            );
            context.strokeStyle = "#000000"

            //description (handled by the super miner class, did it this way incase we want multiple things shown for certain miners)
            context.fillStyle = "#FFFFFF";
            context.font = (this.boundingBox.height * 0.06) + "px Verdana";
            context.textBaseline = "top"
            if(this.parent.superMiner.renderDescription)
            {
                this.parent.superMiner.renderDescription(
                    context, 
                    coords.x + (this.boundingBox.width * 0.3), 
                    coords.y + (this.boundingBox.height * 0.65), 
                    this.boundingBox.width * 0.65, 
                    this.boundingBox.height * 0.29
                );
            }

            context.restore();
            this.renderChildren(); // Render any child layers
        }

        this.skillButton = this.popupBody.addHitbox(new Hitbox(
            {
                x: this.popupBody.boundingBox.width * 0.035,
                y: this.popupBody.boundingBox.height * 0.723,
                width: this.popupBody.boundingBox.width * 0.21,
                height: this.popupBody.boundingBox.height * 0.16
            },
            {},
            'cursor',
            "skillButton"
        ));
        
        this.skillButton.render = function(root)
        {
            var coords = this.getRelativeCoordinates(0, 0, root);
            var buttonIcon = root.superMiner.buttonIcon;
            if(buttonIcon)
            {
                this.parent.parent.context.drawImage(
                    buttonIcon, 
                    coords.x, 
                    coords.y, 
                    this.boundingBox.width, 
                    this.boundingBox.height
                );
            }
        }.bind(this.skillButton, this)

        this.equipButton = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.55,
                y: 0,
                width: this.boundingBox.width * 0.35,
                height: this.boundingBox.height * 0.4
            },
            {
                onmousedown: () =>
                {
                    if(superMinerManager.isFull())
                    {
                        showConfirmationPrompt(
                            _("You have no slots available to equip {0}. Do you want to make room or scrap {0} for {1} Super Miner Souls?", this.superMiner.name, this.superMiner.scrapAmount()),
                            _("Make room"),
                            () =>
                            {
                                if(activeLayers.Super && activeLayers.Super.showScrapButtons == false)
                                {
                                    activeLayers.Super.showScrapButtons = true;
                                    activeLayers.Super.initializeHitboxes();
                                }
                            },
                            _("Scrap"),
                            () =>
                            {
                                this.madeAChoice = true;
                                if(superMinerManager.removePendingSuperMiner())
                                {
                                    this.superMiner.scrap();
                                }
                                closeUi(this);
                                if(activeLayers.Super)
                                {
                                    activeLayers.Super.showScrapButtons = false;
                                    activeLayers.Super.initializeHitboxes();
                                }
                            }
                        )
                    }
                    else
                    {
                        this.madeAChoice = true;
                        if(superMinerManager.removePendingSuperMiner())
                        {
                            superMinerManager.addSuperMiner(this.superMiner);
                        }
                        closeUi(this);
                        if(activeLayers.Super)
                        {
                            activeLayers.Super.showScrapButtons = false;
                            activeLayers.Super.initializeHitboxes();
                        }
                    }
                }
            },
            'pointer',
            "equipButton"
        ));

        this.equipButton.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent);
            var context = this.parent.context;
            context.save();
            context.drawImage(
                startb, 
                coords.x, 
                coords.y, 
                this.boundingBox.width, 
                this.boundingBox.height
            )
            context.lineWidth = 5;
            context.strokeStyle = "#000000";
            context.fillStyle = "#FFFFFF";
            context.textBaseline = "top";
            context.font = this.boundingBox.height * 0.7 + "px KanitB";
            strokeTextWrapWithHeightLimit(
                context, 
                _("Equip"), 
                coords.x + (this.boundingBox.width * 0.1), 
                coords.y + (this.boundingBox.height * 0.23), 
                this.boundingBox.width * 0.8, 
                this.boundingBox.height * .7, 
                "center"
            );
            fillTextWrapWithHeightLimit(
                context, 
                _("Equip"), 
                coords.x + (this.boundingBox.width * 0.1), 
                coords.y + (this.boundingBox.height * 0.23), 
                this.boundingBox.width * 0.8, 
                this.boundingBox.height * .7, 
                "center"
            );
            context.restore();
        }

        this.scrapButton = this.addHitbox(new Hitbox(
            {
                x: this.boundingBox.width * 0.55,
                y: this.boundingBox.height * 0.6,
                width: this.boundingBox.width * 0.35,
                height: this.boundingBox.height * 0.4
            },
            {
                onmousedown: () =>
                {
                    showConfirmationPrompt(
                        _("Are you sure you want to scrap {0} for {1} Super Miner Souls?", this.superMiner.name, this.superMiner.scrapAmount()),
                        _("Yes"),
                        () =>
                        {
                            this.madeAChoice = true;
                            if(superMinerManager.removePendingSuperMiner())
                            {
                                this.superMiner.scrap();
                            }
                            closeUi(this);
                            if(activeLayers.Super)
                            {
                                activeLayers.Super.showScrapButtons = false;
                                activeLayers.Super.initializeHitboxes();
                            }
                        },
                        _("No")
                    )
                }
            },
            'pointer',
            "scrapButton"
        ));

        this.scrapButton.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent);
            var context = this.parent.context;
            context.drawImage(
                stopb, 
                coords.x, 
                coords.y, 
                this.boundingBox.width, 
                this.boundingBox.height
            )
            context.lineWidth = 5;
            context.strokeStyle = "#000000";
            context.fillStyle = "#FFFFFF";
            context.textBaseline = "top";
            context.font = this.boundingBox.height * 0.7 + "px KanitB";
            strokeTextWrapWithHeightLimit(
                context, 
                _("Scrap"), 
                coords.x + (this.boundingBox.width * 0.1), 
                coords.y + (this.boundingBox.height * 0.23), 
                this.boundingBox.width * 0.8, 
                this.boundingBox.height * .7, 
                "center"
            );
            fillTextWrapWithHeightLimit(
                context, 
                _("Scrap"), 
                coords.x + (this.boundingBox.width * 0.1), 
                coords.y + (this.boundingBox.height * 0.23), 
                this.boundingBox.width * 0.8, 
                this.boundingBox.height * .7, 
                "center"
            );
        }
    }

    close()
    {
        if(!this.madeAChoice)
        {
            showConfirmationPrompt(
                _("Are you sure you want to scrap {0} for {1} Super Miner Souls?", this.superMiner.name, this.superMiner.scrapAmount()),
                _("Yes"),
                () =>
                {
                    if(superMinerManager.removePendingSuperMiner())
                    {
                        this.superMiner.scrap();
                    }
                    if(activeLayers.Super)
                    {
                        activeLayers.Super.showScrapButtons = false;
                        activeLayers.Super.initializeHitboxes();
                    }
                },
                _("No"),
                () => 
                {
                    openUiWithoutClosing(SuperMinersWindow, null, 0, true, this.superMiner);
                }
            )
        }
        else
        {
            return super.close();
        }
    }

    render()
    {
        this.context.clearRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        drawColoredRect(this.context, 0, 0, this.boundingBox.width, this.boundingBox.height, "#000000", 0.5);
        this.renderChildren();
    }
}