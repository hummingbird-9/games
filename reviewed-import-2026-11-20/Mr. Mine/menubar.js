class MenuBar extends Hitbox
{
    tabs = []; // {name, icon, ui, isVisibleFunction}
    leftEnabledTabCount = 0;
    rightEnabledTabCount = 0;
    currentTabIndex = -1;
    activeUi;

    isCollapsed = true;
    collapsedYPosition;

    tabHeight = mobileFooterH;
    tabWidth = mobileFooterW / 7.1;

    onExpand = new EventHook();
    onCollapse = new EventHook();

    constructor(boundingBox, tabs)
    {
        super(boundingBox, {}, "");
        this.collapsedYPosition = this.boundingBox.y;
        this.tabs = tabs;
        this.tabWidth = Math.min(this.tabWidth, this.boundingBox.width / this.tabs.length);
        this.initializeTabs();
    }

    render()
    {
        var newEnabledTabCount = 0;
        for (var i in this.tabs)
        {
            if (typeof(this.tabs[i].isEnabledFunction) == 'undefined' || this.tabs[i].isEnabledFunction())
            {
                ++newEnabledTabCount;
            }
        }
        if (newEnabledTabCount != this.leftEnabledTabCount + this.rightEnabledTabCount)
        {
            this.updateTabPositions();
        }
        var root = this.getRootLayer();
        var context = root.context;
        var relativeCoords = this.getRelativeCoordinates(0, 0, this.getRootLayer());
        context.save();
        context.drawImage(footer_bg, relativeCoords.x, relativeCoords.y + (this.tabHeight * .1), this.boundingBox.width, this.tabHeight * .9);
        super.render();
        context.restore();
    }

    collapse()
    {
        this.boundingBox.y = this.collapsedYPosition;
        this.currentTabIndex = -1;
        this.onCollapse.fire(this.boundingBox.y);
    }

    expand()
    {
        //this.boundingBox.y = this.activeUi.boundingBox.y - this.boundingBox.height;
        this.onExpand.fire(this.boundingBox.y);
    }

    openTab(i)
    {
        if(isConfirmationPromptOpen()) return;
        this.activeUi = openUi(this.tabs[i].ui, ...this.tabs[i].params);
        if (this.activeUi)
        {
            this.currentTabIndex = i;
            this.activeUi.onClose.addCallback(this.collapse.bind(this));
            this.expand();
        }
    }

    openUi(uiClass)
    {
        for (var i in this.tabs)
        {
            if (this.tabs[i].ui == uiClass)
            {
                this.openTab(i);
                return true;
            }
        }
        return false;
    }

    initializeTabs()
    {
        this.leftEnabledTabCount = 0;
        this.rightEnabledTabCount = 0;
        for (var i in this.tabs)
        {
            var xPos;
            if (this.tabs[i].justify == "right")
            {
                xPos = this.boundingBox.width - this.tabWidth * (1 + this.rightEnabledTabCount);
                ++this.rightEnabledTabCount;
            }
            else
            {
                xPos = this.tabWidth * this.leftEnabledTabCount;
                ++this.leftEnabledTabCount;
            }
            var tab = new Hitbox(
                {
                    x: xPos,
                    y: 0,
                    width: this.tabWidth,
                    height: this.boundingBox.height
                },
                {
                    onmousedown: function(i) {
                        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                        this.openTab(i)
                    }.bind(this, i)
                }
            );
            tab.render = function (parentElement, tabIndex)
            {
                var root = this.getRootLayer();
                var context = root.context;
                var relativeCoords = this.getRelativeCoordinates(0, 0, this.getRootLayer());
                var tabImageXScale = 1.06; // Tab images have a drop shadow; need to adjust size so the body fills the bounding box
                var tabImageYScale = 1.3;
                context.save();
                if(parentElement.currentTabIndex == tabIndex)
                {
                    context.filter = 'brightness(120%)';
                }
                drawImageFitInBox(context, parentElement.tabs[tabIndex].icon, relativeCoords.x, relativeCoords.y + this.boundingBox.height - parentElement.tabHeight, this.boundingBox.width * tabImageXScale, parentElement.tabHeight);
                context.filter = '';
                if (this.flickerStart)
                {
                    if(parentElement.currentTabIndex == tabIndex || (this.flickerEnd > 0 && Math.floor(new Date().getTime()) > this.flickerEnd))
                    {
                        this.flickerStart = 0;
                    }
                    else
                    {
                        var flickerMaxOpacity = 0.35;
                        var flickerT = ((Math.floor(new Date().getTime()) - this.flickerStart) % this.flickerPeriod) / (this.flickerPeriod / 2);
                        if(flickerT > 1)
                        {
                            flickerT = 2 - flickerT;
                        }
                        context.save();
                        context.globalCompositeOperation = "source-atop";
                        context.globalAlpha = flickerMaxOpacity * flickerT;
                        context.fillStyle = "#FFFFFF";
                        context.fillRect(relativeCoords.x, relativeCoords.y, this.boundingBox.width, this.boundingBox.height);
                        context.restore();
                    }
                }
                context.restore();
                this.renderChildren();
            }.bind(tab, this, i);
            if (this.tabs[i].notificationIds)
            {
                var markerSize = this.boundingBox.width * 0.04;
                var icon = new NotificationIcon(
                    tab.boundingBox.width - markerSize * 0.85,
                    markerSize * 0.85,
                    this.tabs[i].notificationIds
                );
                icon.renderOnStage = true;
                icon.phaseShift = rand(0, 25);
                tab.addHitbox(icon);
            }
            if (this.tabs[i].isEnabledFunction)
            {
                tab.isVisible = this.tabs[i].isEnabledFunction;
                tab.isEnabled = this.tabs[i].isEnabledFunction;
            }
            this.addHitbox(tab);
            this.tabs[i].hitbox = tab;
        }
    }

    updateTabPositions()
    {
        this.rightEnabledTabCount = 0;
        this.leftEnabledTabCount = 0;
        for (var i in this.tabs)
        {
            if (typeof (this.tabs[i].isEnabledFunction) != 'undefined' && !this.tabs[i].isEnabledFunction())
            {
                continue;
            }
            var xPos;
            if (this.tabs[i].justify == "right")
            {
                xPos = this.boundingBox.width - this.tabWidth * (1 + this.rightEnabledTabCount);
                ++this.rightEnabledTabCount;
            }
            else
            {
                xPos = this.tabWidth * this.leftEnabledTabCount;
                ++this.leftEnabledTabCount;
            }
            this.tabs[i].hitbox.boundingBox.x = xPos;
        }
    }
}