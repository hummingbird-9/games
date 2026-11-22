class FooterUILayer extends UiLayer
{
    layerName = "FooterUILayer";
    zIndex = 10;
    isRendered = true;
    isPopup = false;
    allowBubbling = false;
    context = MOBILEFOOTER;

    menuBar;

    constructor(boundingBox)
    {
        super(boundingBox);
        if(this.context)
        {
            this.context.canvas.style.x = boundingBox.x;
            this.context.canvas.style.y = boundingBox.y;
            this.context.canvas.style.width = boundingBox.width;
            this.context.canvas.style.height = boundingBox.height;
        }
        var menubarHeight = this.boundingBox.height;

        //############# INTERACTIVE ELEMENTS ###########


        //############# CONTAINERS ###########

        var menuBarTabs = [
            { 
                name: "SELL", 
                icon: footer_sell, 
                ui: SellWindow, 
                params: [null, -1], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.isCapacityFull] 
            },
            { 
                name: "CRAFT", 
                icon: footer_crafting,
                ui: CraftingWindow, 
                params: [null, 0], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.canCraftDrill, notificationManager.NOTIFICATION_IDS.canCraftStructure]
            },
            { 
                name: "SCIENTISTS", 
                icon: footer_scientist, 
                ui: ScientistsWindow, 
                params: [null, 0], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.isScientist1Ready, notificationManager.NOTIFICATION_IDS.isScientist1Dead, notificationManager.NOTIFICATION_IDS.isScientist2Ready, notificationManager.NOTIFICATION_IDS.isScientist2Dead, notificationManager.NOTIFICATION_IDS.isScientist3Ready, notificationManager.NOTIFICATION_IDS.isScientist3Dead],
                isEnabledFunction: () => hasUnlockedScientists
            },
            { 
                name: "SUPER_MINERS", 
                icon: footer_superminers, 
                ui: SuperMinersWindow,
                params: [null, 0], 
                notificationIds: [],
                isEnabledFunction: () => superMinerManager.numSuperMiners() > 0 || chestService.totalBlackChestsOpened > 0
            },
            { 
                name: "CAVES", 
                icon: footer_caves, 
                ui: CaveManagementWindow,
                params: [null, 0], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.canSendDrone, notificationManager.NOTIFICATION_IDS.isCaveTreasureAvailable, notificationManager.NOTIFICATION_IDS.canUpgradeDrone],
                isEnabledFunction: () => depth >= CAVE_BUILDING_DEPTH,
            },
            { 
                name: "GEM FORGE", 
                icon: footer_gem_forge, 
                ui: GemForgeWindow, 
                params: [null, 0], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.canCraftGem],
                isEnabledFunction: () => depth >= 300
            },
            { 
                name: "REACTOR", 
                icon: footer_reactor, 
                ui: ReactorWindow, 
                params: [null, 0], 
                notificationIds: [notificationManager.NOTIFICATION_IDS.hasReactorStopped, notificationManager.NOTIFICATION_IDS.canCraftReactorComponent],
                isEnabledFunction: () => depth >= 1333
            }
        ];
        if (showShopButtonOnBottom)
        {
            menuBarTabs.push(
                { 
                    name: "STORE", 
                    icon: footer_tickets, 
                    ui: PurchaseWindow,
                    justify: "right", 
                    params: [null, 0] 
                }
            );
        }
        
        this.menuBar = new MenuBar({
            x: 0,
            y: 0,
            width: this.boundingBox.width,
            height: this.boundingBox.height
        },
        menuBarTabs
        );
        this.addHitbox(this.menuBar);
    }
    
    setBoundingBox()
    {
        this.boundingBox = this.context.canvas.getBoundingClientRect();
        this.boundingBox.x /= uiScaleX;
        this.boundingBox.y /= uiScaleY;
        this.boundingBox.width /= uiScaleX;
        this.boundingBox.height /= uiScaleY;
    }

    render()
    {
        this.renderChildren();
    }
}