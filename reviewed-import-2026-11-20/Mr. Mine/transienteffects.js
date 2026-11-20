function drawEffects()
{
    if(isSimulating) return;
    TransientEffectsC.clearRect(0, 0, transientEffectContainerW, transientEffectContainerH);

    // Draw and prune TextEffect objects
    for(var i = textEffects.length - 1; i >= 0; i--)
    {
        if(textEffects[i].isComplete())
        {
            textEffects.splice(i, 1);
        }
        else
        {
            textEffects[i].draw();
        }
    }

    // TransientEffectsC.fillStyle = "#FF0000";
    // TransientEffectsC.beginPath();
    // TransientEffectsC.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
    // TransientEffectsC.fill();

    // News
    renderFadingNews();

    if(!isTimelapseOn)
    {
        renderMinerQuotes();
    }
}

//###########################################################
//####################### TEXT EFFECTS ######################
//###########################################################

var textEffects = [];

class TextEffect
{
    constructor(text, font, color, startScreenX, startScreenY, durationMsec, isHorizontallyCentered, fadeFunction, movementFunction)
    {
        this.text = text;
        this.font = font;
        this.color = color;
        this.startScreenX = startScreenX;
        this.startScreenY = startScreenY;
        this.durationMsec = durationMsec;
        this.isHorizontallyCentered = isHorizontallyCentered;
        this.fadeFunction = fadeFunction;
        this.movementFunction = movementFunction;
        this.startTime = currentTime();
    }

    draw()
    {
        if(!this.isComplete())
        {
            saveCanvasState(TransientEffectsC);

            var rgbColors = hexToRgb(this.color);
            var alpha = this.fadeFunction(this.percentComplete());

            TransientEffectsC.fillStyle = "rgba(" + rgbColors.r + ", " + rgbColors.g + ", " + rgbColors.b + ", " + alpha + ")";
            TransientEffectsC.font = this.font;

            var movementOffsets = this.movementFunction(this.percentComplete());
            var renderX = this.startScreenX + movementOffsets.x;
            var renderY = this.startScreenY + movementOffsets.y;
            if(this.isHorizontallyCentered)
            {
                renderX -= TransientEffectsC.measureText(this.text).width / 2;
            }

            TransientEffectsC.fillText(this.text, renderX, renderY);

            restoreCanvasState(TransientEffectsC);
        }
    }

    percentComplete()
    {
        return Math.min(1, (currentTime() - this.startTime) / this.durationMsec);
    }

    isComplete()
    {
        return this.percentComplete() == 1;
    }
}

function showFloatingText(text, font, color, screenX, screenY, durationMsec, isHorizontallyCentered, fadeFunction, movementFunction)
{
    var newEffect = new TextEffect(text, font, color, screenX, screenY, durationMsec, isHorizontallyCentered, fadeFunction, movementFunction);
    textEffects.push(newEffect);
}

function noFade(percentComplete)
{
    return 1;
}

function noMovement(percentComplete)
{
    return {"x": 0, "y": 0}
}

function getFunctionYMovementOnly(functionToApply, maxPixelMovement)
{
    return function (percentComplete)
    {
        return {"x": 0, "y": functionToApply(percentComplete) * maxPixelMovement};
    }
}

function getFunctionXMovementOnly(functionToApply, maxPixelMovement)
{
    return function (percentComplete)
    {
        return {"x": functionToApply(percentComplete) * maxPixelMovement, "y": 0};
    }
}

function easeInOutBack(percentComplete)
{
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    var result = percentComplete < 0.5
        ? (Math.pow(2 * percentComplete, 2) * ((c2 + 1) * 2 * percentComplete - c2)) / 2
        : (Math.pow(2 * percentComplete - 2, 2) * ((c2 + 1) * (percentComplete * 2 - 2) + c2) + 2) / 2;

    result = (result + .1) / 1.2;

    return result;
}

function easeInOutSine(percentComplete)
{
    return -(Math.cos(Math.PI * percentComplete) - 1) / 2;
}

function sin(percentComplete)
{
    return Math.sin(Math.PI * percentComplete);
}

function sinSquared(percentComplete)
{
    return Math.pow(sin(percentComplete), 2);
}

function rootSin(percentComplete)
{
    return Math.pow(sin(percentComplete), 0.5);
}

function easeInCubic(percentComplete)
{
    return Math.pow(percentComplete, 3);
}

function easeInPowerFunction(power)
{
    return function (percentComplete)
    {
        return Math.pow(percentComplete, power);
    }
}


// ##################################################
// ###################### NEWS ######################
// ##################################################

function renderFadingNews()
{
    if(news.length > 0)
    {
        var newsY = activeLayers.MainUILayer.header.boundingBox.height + 3;
        for(var i = 0; i < news.length; i++)
        {
            var newsDeltaTime = currentTime() - news[i][1];
            if(newsDeltaTime >= NEWS_FADE_OUT_DURATION_MSECS)
            {
                news.splice(i, 1);
            }
            else
            {
                TransientEffectsC.save();
                var alpha = 1 - Math.pow((newsDeltaTime / NEWS_FADE_OUT_DURATION_MSECS), 10);

                TransientEffectsC.font = "15px KanitM";
                TransientEffectsC.fillStyle = "#FFFFFF";
                TransientEffectsC.strokeStyle = "#000000";
                TransientEffectsC.globalAlpha = alpha / 2;
                TransientEffectsC.lineWidth = 3;
                TransientEffectsC.textBaseline = 'top';

                strokeTextWrap(TransientEffectsC, news[i][0], transientEffectContainerW * .1, newsY, worldConfig.rightBound - worldConfig.leftBound, "center", 0.1);

                TransientEffectsC.globalAlpha = alpha;
                TransientEffectsC.lineWidth = 2;
                strokeTextWrap(TransientEffectsC, news[i][0], transientEffectContainerW * .1, newsY, worldConfig.rightBound - worldConfig.leftBound, "center", 0.1);
                var textBoundingBox = fillTextWrap(TransientEffectsC, news[i][0], transientEffectContainerW * .1, newsY, worldConfig.rightBound - worldConfig.leftBound, "center", 0.1);
                newsY += textBoundingBox.height;
                if(news[i][2])
                {
                    TransientEffectsC.drawImage(
                        flair, 
                        getAnimationFrameIndex(3) * 200, 
                        0, 
                        200, 
                        200, 
                        transientEffectContainerW * 0.5 - transientEffectContainerW * 0.08, 
                        newsY - transientEffectContainerW * 0.04, 
                        transientEffectContainerW * 0.16, 
                        transientEffectContainerW * 0.16
                    );
                    TransientEffectsC.drawImage(
                        worldResources[news[i][2]].largeIcon, 
                        transientEffectContainerW * 0.5 - transientEffectContainerW * 0.04, 
                        newsY, 
                        transientEffectContainerW * 0.08, 
                        transientEffectContainerW * 0.08
                    );
                    newsY += transientEffectContainerW * 0.08;
                }
                TransientEffectsC.restore();
            }
        }
        TransientEffectsC.globalAlpha = 1.0;
    }
}

// ##########################################################
// ###################### MINER FLAVOR ######################
// ##########################################################


// ########################### QUOTES ###########################

var activeMinerTexts = [];
var speechBubbleBoundingBoxCache = {};
var bubblePadding = 3;
function renderSpeechBubble(context, text, x, y)
{
    context.save();
    var boundingBox;
    var textMaxWidth = 200;
    var tailSize = 8;

    context.textBaseline = "top";
    context.font = "11px Verdana";
    context.fillStyle = "#000000";

    if(speechBubbleBoundingBoxCache.hasOwnProperty(text))
    {
        boundingBox = speechBubbleBoundingBoxCache[text];
    }
    else
    {
        boundingBox = fillTextWrap(context, text, 0, 0, textMaxWidth, "left", 0.5, true);
        if (x + boundingBox.width + bubblePadding * 2 > worldConfig.rightBound)
        {
            boundingBox.x1 = worldConfig.rightBound - x - (boundingBox.width + bubblePadding * 2);
        }
        speechBubbleBoundingBoxCache[text] = boundingBox;
    }
    var textOffsetX = boundingBox.x1;
    var textOffsetY = boundingBox.y1;
    var textWidth = boundingBox.width;
    var textHeight = boundingBox.height;
    if(y + textOffsetY - tailSize - textHeight - bubblePadding * 2 <= activeLayers.MainUILayer.header.boundingBox.height)
    {
        context.restore();
        return;
    }
    renderRoundedRectangle(
        context, 
        x + textOffsetX - bubblePadding, 
        y + textOffsetY - tailSize - textHeight - bubblePadding * 2, 
        textWidth + 2 * bubblePadding, 
        textHeight + 2 * bubblePadding, 
        5, 
        "#000000", 
        "#FFFFFF", 
        1
    );
    fillTextWrap(
        context, 
        text, 
        x + textOffsetX,
        y + textOffsetY - tailSize - textHeight - bubblePadding, 
        textMaxWidth
    );
    context.drawImage(
        speechBubbleTail, 
        x, 
        y - tailSize - 1, 
        tailSize,
        tailSize
    );
    context.restore();
}

function renderMinerQuotes()
{
    for(var i = 0; i < activeMinerTexts.length; i++)
    {
        var quoteElapsedTime = currentTime() - activeMinerTexts[i].clickTime;
        if(quoteElapsedTime >= QUOTE_FADE_OUT_DURATION_MSECS)
        {
            activeMinerTexts.splice(i, 1);
            i--;
        }
        else if(activeMinerTexts[i].workerHitbox)
        {
            var alpha = 1 - Math.pow((quoteElapsedTime / QUOTE_FADE_OUT_DURATION_MSECS), 10);
            MAIN.globalAlpha = alpha;

            var coords = activeMinerTexts[i].workerHitbox.getGlobalCoordinates(0, 0);
            renderSpeechBubble(
                MAIN, 
                activeMinerTexts[i].text, 
                coords.x + worldConfig.levelClickableWidth * 0.6, 
                coords.y + activeMinerTexts[i].workerHitbox.renderYOffset
            );
            MAIN.globalAlpha = 1;
        }
    }
}