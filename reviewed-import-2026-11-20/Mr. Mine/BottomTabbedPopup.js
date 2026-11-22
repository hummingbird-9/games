class BottomTabbedPopup extends TabbedPopupWindow
{
    activeTabImage   = mobileTab;
    inactiveTabImage = mobileTabInactive;
    closeButtonImage = mobileCloseButton;
    topFrameImage    = mobilePopupFrame;

    renderedFrameHeightCoefficient = 1;

    tabWidth = mainw / 4.6;
    tabHeight = mainh * 0.04;
    tabSpacing = 5;
    // tabYOffset = -mainh * 0.005;

    onTabChange()
    {
        super.onTabChange();
        activeLayers["MainUILayer"].initializeScrollbar(-1, this.boundingBox.y);
    }

    open()
    {
        super.open();
        activeLayers["MainUILayer"].initializeScrollbar(-1, this.boundingBox.y);
    }

    close()
    {
        activeLayers["MainUILayer"].initializeScrollbar();
        return super.close();
    }

    initializeTabs(tabNames)
    {
        super.initializeTabs(tabNames);
        var frameHeight = mainh * 0.025;
        this.closeButton.boundingBox.height = this.tabHeight * 0.9;
        this.closeButton.boundingBox.width = this.closeButton.boundingBox.height * this.closeButtonImage.width / this.closeButtonImage.height;
        this.closeButton.boundingBox.x = this.boundingBox.width - 1.1 * this.closeButton.boundingBox.width;
        this.closeButton.boundingBox.y = this.tabHeight * 0.1;
        this.bodyContainer.boundingBox.y = this.tabsContainer.boundingBox.height + frameHeight;
        this.bodyContainer.boundingBox.x = 0;
        this.bodyContainer.boundingBox.width = this.boundingBox.width;
        this.bodyContainer.boundingBox.height = this.boundingBox.height - this.bodyContainer.boundingBox.y;
        this.tabsContainer.render = function ()
        {
            this.renderChildren();
            var coords = this.getRelativeCoordinates(0, this.parent.tabHeight, this.parent);
            var context = this.parent.context;
            context.drawImage(
                this.parent.backgroundImage, 
                coords.x, 
                coords.y, 
                this.boundingBox.width, 
                this.parent.boundingBox.height
            );
            context.drawImage(
                this.parent.topFrameImage, 
                coords.x, 
                coords.y, 
                this.boundingBox.width, 
                frameHeight * this.parent.renderedFrameHeightCoefficient
            );

            if(this.parent.tabs.length > 0)
            {
                this.parent.tabs[this.parent.currentTabIndex].render();
            }
        }
    }

    createTabRenderFunction(parentElement, tabIndex, tabName)
    {
        var frameOverlap = 0.023 * this.boundingBox.height;
        var frameXScale = popupFrame.width / this.boundingBox.width;
        var frameYScale = popupFrame.height / (this.boundingBox.height - this.tabsContainer.boundingBox.y);
        var frameWidth = 0.038 * this.boundingBox.width / uiScaleX;
        var frameHeight = 0.056 * this.boundingBox.height / uiScaleY;
        var frameRightShadowWidth = 0.017 * this.boundingBox.width / uiScaleX;
        var frameBottomShadowWidth = 0.049 * this.boundingBox.height / uiScaleY;
        return function ()
        {
            var context = parentElement.context;
            var relativeCoords = this.getRelativeCoordinates(0, 0, parentElement);
            var tabImageXScale = 1.06; // Tab images have a drop shadow; need to adjust size so the body fills the bounding box
            var tabImageYScale = 1;
            context.save();
            if(parentElement.currentTabIndex == tabIndex)
            {
                context.drawImage(parentElement.activeTabImage, relativeCoords.x, relativeCoords.y, this.boundingBox.width * tabImageXScale, this.boundingBox.height * tabImageYScale);
                context.fillStyle = "#F2F2F2";
            }
            else
            {
                context.drawImage(parentElement.inactiveTabImage, relativeCoords.x, relativeCoords.y, this.boundingBox.width * tabImageXScale, this.boundingBox.height * tabImageYScale);
                context.fillStyle = "#999999";
            }
            context.textBaseline = "middle";
            context.font = "16px KanitM";
            context.strokeStyle = "#000";
            context.lineWidth = 1;
            strokeTextShrinkToFit(context, tabName, relativeCoords.x, relativeCoords.y + parentElement.tabHeight * 0.6, this.boundingBox.width, "center");
            fillTextShrinkToFit(context, tabName, relativeCoords.x, relativeCoords.y + parentElement.tabHeight * 0.6, this.boundingBox.width, "center");
            if(this.flickerStart)
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
        }
    }
}