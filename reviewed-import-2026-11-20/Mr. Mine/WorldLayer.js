var isLaunching = false;

class WorldLayer extends UiLayer
{
    layerName = "WorldLayer";
    zIndex = 3;
    isRendered = true;
    isPopup = false;
    allowBubbling = true;
    context = MAIN;
    previouslyViewedDepth = 0;

    minerImageWidth = 32;
    minerImageHeight = 48;

    leftBound = Math.floor(mainw * 0.09);
    rightBound = Math.ceil(mainw * 0.91);
    topBound = Math.floor(mainh * 0.05);

    levelScale;
    levelHeight;
    levelWidth;
    levelClickableSpacing;
    numberOfDepthsVisible;
    minVisibleDepth;

    levelHitboxContainer;
    levels = [];
    levelGroupSize = 10;

    scrollCoefficient = 0.5;
    scrollMomentum = 0;
    scrollMomentumCoefficient = 2;
    scrollMomentumDecayFactor = 1.05;
    minScrollMomentum = 0.2;

    update(deltaTime)
    {
        if (Math.abs(this.scrollMomentum) > this.minScrollMomentum && !isMouseDown)
        {
            this.scrollMomentum /= this.scrollMomentumDecayFactor;
            changeViewedDepth(this.scrollMomentum / worldConfig.levelHeight);
        }
        else
        {
            this.scrollMomentum = 0;
        }
    }

    onmousemove()
    {
        if (prevMouseY >= 0)
        {
            changeViewedDepth(-this.scrollCoefficient * (mouseY - prevMouseY) / worldConfig.levelHeight);
        }
    }

    onmouseup()
    {
        // Set momentum as the average of the last several movements
        var averageMouseDeltaY = 0;
        for (var i in mouseDeltaBuffer)
        {
            averageMouseDeltaY += mouseDeltaBuffer[i].y;
        }
        averageMouseDeltaY /= mouseDeltaBuffer.length;
        this.scrollMomentum = averageMouseDeltaY * this.scrollMomentumCoefficient;
    }

    isMouseInLayer() { return true; }

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
        // showHitboxDebug();
        this.minVisibleDepth = Math.floor(worldConfig.numberOfDepthsVisible - worldConfig.specialLevels.topCity.height);
        currentlyViewedDepth = this.minVisibleDepth;
        // partialDepthOffset = this.minVisibleDepth - currentlyViewedDepth;
        for (var i in worldConfig.specialLevels)
        {
            if (worldConfig.specialLevels[i].hitbox)
            {
                this.addHitbox(worldConfig.specialLevels[i].hitbox);
            }
        }
        this.initDrillLevel();

        initFoundArray(worldConfig.numberOfDepthsVisible);

        this.levelHitboxContainer = this.addHitbox(new Hitbox(
            {
                x: worldConfig.leftBound,
                y: worldConfig.topBound,
                width: worldConfig.levelWidth,
                height: 0
            },
            {},
            "",
            "levelContainer"
        ));
        this.initializeLevels();
    }

    setBoundingBox()
    {
        this.boundingBox = this.context.canvas.getBoundingClientRect();
        this.boundingBox.x /= uiScaleX;
        this.boundingBox.y /= uiScaleY;
        this.boundingBox.width /= uiScaleX;
        this.boundingBox.height /= uiScaleY;
    }

    initDrillLevel()
    {   
        this.drillLevel = this.addHitbox(new NewWorldEntityHitbox(
            depth + 1,
            {
                x: worldConfig.leftBound,
                y: 0,
                height: worldConfig.levelHeight,
                width: worldConfig.levelWidth
            },
            {}
        ));
        this.drillLevel.render = function(root)
        {
            if (this.kmDepth != depth + 1)
            {
                this.updateDepth(root.getDrillLocation());
            }
            var coords = this.getGlobalCoordinates(0, 0);
            var drillHeight = worldConfig.levelHeight * 0.9;
            var drillWidth = (drillState.drill().worldAsset.width / 4) * drillHeight / drillState.drill().worldAsset.height;
            var drillX = coords.x + this.boundingBox.width / 2 - drillWidth / 2;
            var drillY = coords.y + worldConfig.levelHeight / 2 - drillHeight / 2;
            
            var levelImageMinDepths = Object.keys(worldConfig.levelImages);
            var drillHoleImage = earthDrillHole1;
            var drillHoleBackground = levelBackground;
            for (var i = 0; i < levelImageMinDepths.length; ++i)
            {
                if (i == levelImageMinDepths.length - 1 || levelImageMinDepths[i + 1] > depth)
                {
                    drillHoleImage = worldConfig.levelImages[levelImageMinDepths[i]].hole; 
                    drillHoleBackground = worldConfig.levelImages[levelImageMinDepths[i]].background;
                    break;
                }
            }
            
            if (!root.isSpace(depth + 1))
            {
                MAIN.drawImage(
                    drillHoleBackground, 
                    coords.x,
                    coords.y, 
                    this.boundingBox.width,
                    this.boundingBox.height
                );
                MAIN.drawImage(
                    drillHoleImage, 
                    coords.x,
                    coords.y, 
                    this.boundingBox.width,
                    this.boundingBox.height
                );
            }

            MAIN.strokeStyle = "#000000";
            MAIN.fillStyle = "#999999";
            MAIN.fillRect(drillX - drillWidth, coords.y + drillHeight / 2, drillWidth, worldConfig.levelHeight * 0.05);
            MAIN.fillStyle = "#333333";
            MAIN.fillRect(drillX - drillWidth, coords.y + drillHeight / 2, drillWidth * Math.min(1, (divideBigNumberToDecimalNumber(progressTowardsNextDepth, depthDifficultyTable[depth]))), worldConfig.levelHeight * 0.05);
            MAIN.strokeRect(drillX - drillWidth, coords.y + drillHeight / 2, drillWidth, worldConfig.levelHeight * 0.05);
            MAIN.textBaseline = 'bottom';
            MAIN.fillStyle = "#FFFFFF";
            MAIN.strokeStyle = "#000000";
            MAIN.font = "14px Verdana";
            MAIN.lineWidth = 3;
            if (BattleManager.isStalledDueToBoss())
            {
                outlineTextWrap(
                    MAIN,
                    _("STALLED"),
                    drillX - drillWidth, 
                    coords.y + drillHeight / 2, 
                    drillWidth,
                    "center"
                )
            }
            else if (!isWaitingForLiftoff())
            {
                outlineTextWrap(
                    MAIN,
                    formattedCountDown(estimatedTimeUntilNextDepth()),
                    drillX - drillWidth, 
                    coords.y + drillHeight / 2, 
                    drillWidth,
                    "center"
                )
            }
            var drillFrame;
            if(!BattleManager.isStalledDueToBoss() && !isWaitingForLiftoff())
            {
                drillFrame = getAnimationFrameIndex(4, 10);
            }
            else
            {
                drillFrame = 0;
            }
            if(((depth > 1000 && depth < 1032) || (depth > 1783 && depth < 1813)) && !BattleManager.isStalledDueToBoss() && !isWaitingForLiftoff())
            {
                var drillYOffset = subTickDistancePercent() * worldConfig.levelHeight;
                drillY += drillYOffset;
                if (depth == 1001)
                {
                    drillY -= worldConfig.levelHeight;
                    drillY += drillYOffset;
                }
                var flameWidth = drillWidth * 1.1;
                var flameHeight = drillHeight * 2;
                var flameX = drillWidth * 0.05 + coords.x + this.boundingBox.width / 2 - flameWidth / 2;
                var flameY = drillY - drillHeight * 0.63;
                MAIN.drawImage(rocketDrillFlames, 168 * drillFrame, 0, 168, 158, flameX, flameY, flameWidth, flameHeight);
            }
            MAIN.drawImage(drillState.drill().worldAsset, 168 * drillFrame, 0, 168, 158, drillX, drillY, drillWidth, drillHeight);
            MAIN.drawImage(drillState.engine().worldAsset, 168 * drillFrame, 0, 168, 158, drillX, drillY, drillWidth, drillHeight);
        }.bind(this.drillLevel, this);
    }



    // ##################################################################
    // ########################## RENDER WORLD ##########################
    // ##################################################################

    isTradingPost(depth)
    {
        for(var i = 0; i < tradeConfig.tradingPosts.length; ++i)
        {
            if(depth == tradeConfig.tradingPosts[i].depth) return true;
        }
        return false
    }

    isCore(depth)
    {
        return depth == 501;
    }

    renderDrill()
    {
        var visibleDepths = getVisibleDepthRange();
        var drillDepth = this.getDrillLocation() - visibleDepths.min;
        var topBound = worldConfig.topBound;
        var levelHeight = worldConfig.levelHeight;
        
    
    }

    renderBackgroundForDepth(levelHitbox, xCoordinateOfLevel, yCoordinateOfLevelTop)
    {
        if(levelHitbox.kmDepth >= 1032)
        {
            MAIN.drawImage(lunarbackground, 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
        }
    }

    renderBackgroundEffectsForDepth(kmDepth, xCoordinateOfLevel, yCoordinateOfLevelTop)
    {
        var effectMinAlpha = 0.2;
        var effectMaxAlpha = 0.5;
        var effectPeriod = 18; // frames
        var pulseColor;
        if(battleWaiting[1] == kmDepth)
        {
            pulseColor = "#900000";
        }
        if(chestService.chestExistsAtDepth(kmDepth))
        {
            pulseColor = "#D2D918";
        }
        if (pulseColor)
        {
            MAIN.save();
            MAIN.globalAlpha = effectMinAlpha + oscillate(numFramesRendered, effectPeriod) * (effectMaxAlpha - effectMinAlpha);
            MAIN.fillStyle = pulseColor;
            MAIN.fillRect(xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
            MAIN.restore();
        }
    }

    renderLevelImageForDepth(levelHitbox, xCoordinateOfLevel, yCoordinateOfLevelTop)
    {
        if (BattleManager.isActiveBossLevel(levelHitbox.kmDepth))
        {
            MAIN.drawImage(BattleManager.getBossLevelAsset(levelHitbox.kmDepth), xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
        }
        else if (levelHitbox.kmDepth <= 3000)
        {
            if (!levelHitbox.levelImages)
            {
                var levelImageMinDepths = Object.keys(worldConfig.levelImages);
                for (var i = 0; i < levelImageMinDepths.length; ++i)
                {
                    if (i == levelImageMinDepths.length - 1 || levelImageMinDepths[i + 1] > levelHitbox.kmDepth)
                    {
                        levelHitbox.levelImages = worldConfig.levelImages[levelImageMinDepths[i]]; 
                        break;
                    }
                }
            }
            if (levelHitbox.levelImages)
            {
                // Draw the image if one was found
                if(levelHitbox.levelImages.background)
                {
                    MAIN.drawImage(levelHitbox.levelImages.background, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
                    this.renderBackgroundForDepth(levelHitbox, xCoordinateOfLevel, yCoordinateOfLevelTop)
                    this.renderBackgroundEffectsForDepth(levelHitbox.kmDepth, xCoordinateOfLevel, yCoordinateOfLevelTop);
                    MAIN.drawImage(levelHitbox.levelImages.base, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
                    MAIN.drawImage(levelHitbox.levelImages.foreground, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
                    MAIN.drawImage(levelHitbox.levelImages.lights, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
                }
                else if(levelHitbox.levelImages.full)
                {
                    MAIN.drawImage(levelHitbox.levelImages.full, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
                }
            }
        }
        else if (levelHitbox.kmDepth < 1782)
        {
            if(levelHitbox.kmDepth == 1032)
            {
                // MAIN.drawImage(lunarlevel1, 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop - 1, worldConfig.levelWidth, Math.ceil(mainh * .18));
            } else if(!BattleManager.isActiveBossLevel(levelHitbox.kmDepth))
            {
                MAIN.drawImage(lunarlevel1, 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
            } else
            {
                MAIN.drawImage(BattleManager.getBossLevelAsset(levelHitbox.kmDepth), 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
            }
        }
        else if (levelHitbox.kmDepth < 1914)
        {
            MAIN.drawImage(titanlevel4, 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
        }
        else
        {
            MAIN.drawImage(titanlevel1, 0, 0, 926, 120, xCoordinateOfLevel, yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
        }
    }

    renderLightsForDepth(depthToRender, yCoordinateOfLevelTop)
    {
        if(depthToRender < 1000)
        {
            if(limitedTimeEventManager.isHalloween())
            {
                MAIN.drawImage(halloweenlight, 0, 0, 926, 120, Math.ceil(mainw * (.072 + (((depthToRender) % 7 % 3) * .003))), yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
            } else
            {
                MAIN.drawImage(light, 0, 0, 926, 120, Math.ceil(mainw * (.072 + (((depthToRender) % 7 % 3) * .003))), yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
            }
        } else if(depthToRender >= 1032)
        {
            MAIN.drawImage(lunarlight, 0, 0, 926, 120, Math.ceil(mainw * (.072 + (((depthToRender) % 7 % 3) * .003))), yCoordinateOfLevelTop, worldConfig.levelWidth, worldConfig.levelHeight);
        }
    }

    renderKmTextForDepth(depthToRender, xCoordinateOfLevel, yCoordinateOfLevelTop)
    {
        MAIN.save();
        MAIN.font = "16px CFont";
        MAIN.fillStyle = "#FFFFFF";
        if(depthToRender < 1032)
        {
            MAIN.fillText(depthToRender + "Km", xCoordinateOfLevel + Math.ceil(mainw * .01), yCoordinateOfLevelTop + Math.ceil(mainh * .022));
        } 
        else if(depthToRender < 1813)
        {
            MAIN.fillText((depthToRender - 1032) + "Km", xCoordinateOfLevel + Math.ceil(mainw * .01), yCoordinateOfLevelTop + Math.ceil(mainh * .022));
        }
        else
        {
            MAIN.fillText((depthToRender - 1813) + "Km", xCoordinateOfLevel + Math.ceil(mainw * .01), yCoordinateOfLevelTop + Math.ceil(mainh * .022));
        }
        MAIN.restore();
    }

    renderForegroundLightingForDepth(depthToRender)
    {
        var xCoordinateOfLevel = this.leftBound;
        var yCoordinateOfLevelTop = mainh * .111 + ((worldConfig.numberOfDepthsVisible - 1 - (currentlyViewedDepth - depthToRender)) * .178 * mainh);
        MAIN.drawImage(shade, depthToRender * 2, 0, 1, 1, xCoordinateOfLevel, yCoordinateOfLevelTop, Math.floor(mainw * .855), (worldConfig.levelHeight));
    }

    renderBackground()
    {
        if(currentlyViewedDepth < 1005)
        {
            MAIN.drawImage(drilldiv2, 0, 0, 167, 600, this.leftBound, this.topBound, Math.ceil(mainw * 0.723), mainh); //level bg (maybe add gradient later)

            if(currentlyViewedDepth == depth)
            {
                MAIN.drawImage(drilldiv, 0, 0, 167, 600, Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
            } else
            {
                MAIN.clearRect(Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
                MAIN.drawImage(drilldiv2, 0, 0, 167, 600, Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
            }
        } else
        {
            MAIN.drawImage(lunardrilldiv2, 0, 0, 167, 600, this.leftBound, this.topBound, Math.ceil(mainw * 0.723), mainh); //level bg (maybe add gradient later)

            if(currentlyViewedDepth == depth)
            {
                MAIN.drawImage(lunardrilldiv, 0, 0, 167, 600, Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
            } else
            {
                MAIN.clearRect(Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
                MAIN.drawImage(lunardrilldiv2, 0, 0, 167, 600, Math.ceil(mainw * .805), this.topBound, Math.ceil(mainw * .131), Math.floor(mainh * .89));
            }
        }
    }

    render()
    {
        this.renderBackground();
        for(var i = currentlyViewedDepth - worldConfig.numberOfDepthsVisible - 1; i <= currentlyViewedDepth; i++)
        {
            this.renderForegroundLightingForDepth(i);
        }

        this.updateNewWorldEntityHitboxLocations();
        super.render();
        this.drillLevel.render();
        superMinerManager.render();
    }

    updateNewWorldEntityHitboxLocations()
    {
        if(this.previouslyViewedDepth != currentlyViewedDepth + partialDepthOffset)
        {
            this.previouslyViewedDepth = currentlyViewedDepth + partialDepthOffset;

            this.hitboxYOffset = (-1 * ((currentlyViewedDepth + partialDepthOffset) * worldConfig.levelHeight));
        }
    }

    initializeLevels()
    {
        this.levelHitboxContainer.clearHitboxes();
        this.updateLevels();
    }

    updateLevels()
    {
        for (var i = this.levels.length - 1; i <= 1 + Math.max(this.minVisibleDepth, depth); ++i)
        {
            this.addLevel(i + 1);
            this.drillLevel.updateDepth(this.getDrillLocation());
        }
    }

    addLevel(levelDepth)
    {
        for (var i in worldConfig.specialLevels)
        {
            if (levelDepth >= worldConfig.specialLevels[i].depth && levelDepth <= worldConfig.specialLevels[i].depth + worldConfig.specialLevels[i].height - 1) 
            {
                return;
            }
        }
        var newLevelHitbox = new NewWorldEntityHitbox(
            levelDepth,
            {
                x: this.leftBound,
                y: -1,
                width: worldConfig.levelWidth,
                height: worldConfig.levelHeight + 2
            },
            {
                onmousedown: function()
                {
                    if (BattleManager.isActiveBossLevel(this.kmDepth))
                    {
                        BattleManager.startBossBattle(bossesDefeated);
                    }
                }
            },
            "",
            "level_" + levelDepth,
            this
        );
        newLevelHitbox.specialLevel = getSpecialLevelForDepth(levelDepth);
        newLevelHitbox.specialLevelImage = getSpecialLevelImageSegment(newLevelHitbox.specialLevel, levelDepth);
        newLevelHitbox.render = function ()
        {
            var root = this.getRootLayer();
            if (this.kmDepth > currentlyViewedDepth  + 1 || this.kmDepth < currentlyViewedDepth - worldConfig.numberOfDepthsVisible - 1)
            {
                return;
            }
            var context = root.context;
            var coords = this.getRelativeCoordinates(0, 0, root);
            // root.renderBackgroundForDepth(this, coords);
            if (this.kmDepth > depth)
            {
                if (this.kmDepth == depth + 1)
                {
                    // context.drawImage(
                    //     mobileDrillHole, 
                    //     coords.x, 
                    //     coords.y, 
                    //     this.boundingBox.width, 
                    //     this.boundingBox.height
                    // );
                }
                else 
                {
                    context.drawImage(
                        mobileLevelFilled, 
                        coords.x, 
                        coords.y, 
                        this.boundingBox.width, 
                        this.boundingBox.height
                    );
                }
                if (this.kmDepth == depth + 1)
                {
                    }
            }
            else if(!isDepthWithoutWorkers(this.kmDepth))
            {
                root.renderBackgroundForDepth(this, coords);
                root.renderLightsForDepth(this.kmDepth, coords.y);
                root.renderLevelImageForDepth(this, coords.x, coords.y);
                root.renderKmTextForDepth(this.kmDepth, coords.x, coords.y);
                if (!BattleManager.isActiveBossLevel(this.kmDepth))
                {
                    var chests = chestService.getChestsAtDepth(this.kmDepth);
                    // Used to render the golem and mime behind the miners
                    if (this.renderedBehindHitbox)
                    {
                        this.renderedBehindHitbox.render();
                    }
                    this.isolatedMinerIndexes = [];
                    for (var i in chests)
                    {
                        if (chests[i].depth == this.kmDepth)
                        {
                            this.isolatedMinerIndexes.push(chests[i].worker - 1);
                        }
                    }
                    if (minerImageCache.isActive())
                    {
                        minerImageCache.renderMinerImage(this.kmDepth, coords, this.isolatedMinerIndexes);
                    }
                    this.renderChildren();
                    if (this.renderedBehindHitbox)
                    {
                        this.renderedBehindHitbox.renderChildren();
                    }
                }
            }
        }

        if (!isDepthWithoutWorkers(levelDepth))
        {
            for (var i = 0; i < 10; ++i)
            {
                newLevelHitbox.addHitbox(new MinerHitbox(levelDepth, i));
            }
        }
        newLevelHitbox.allowBubbling = true;
        this.addHitbox(newLevelHitbox);
        this.levels[levelDepth] = newLevelHitbox;
        this.levelHitboxContainer.boundingBox.height = newLevelHitbox.y + newLevelHitbox.height;
        
        if (levelDepth == 50)
        {
            var golemHitbox = newLevelHitbox.addHitbox(new Hitbox(
                {
                    x: worldConfig.levelClickableWidth * 0.5,
                    y: 0,
                    height: newLevelHitbox.boundingBox.height,
                    width: worldConfig.levelClickableWidth
                },
                {
                    onmousedown: function ()
                    {
                        if(hasFoundGolem == 0)
                        {
                            // Make golem blueprints available in the shop
                            hasFoundGolem = 1;
                            learnRangeOfBlueprints(1, 16, 31);
                            startFoundGolemDialogue();
                        }
                        else
                        {
                            //Later have more dialogue
                            openUi(CraftingWindow);
                        }
                    }
                },
                ""
            ))
            golemHitbox.render = function ()
            {
                var coords = this.getGlobalCoordinates(0, 0);
                MAIN.drawImage(
                    crack, 
                    40 - (40 * (Math.ceil(getAnimationFrameIndex(16, 10) / 15))),
                    0, 
                    40, 
                    120, 
                    coords.x + this.boundingBox.width * 0.2,
                    coords.y,
                    this.boundingBox.width,
                    this.boundingBox.height
                );
                this.renderChildren();
            }.bind(golemHitbox);

            golemHitbox.addHitbox(new EasyHintArrow(
                "left",
                () => hasFoundGolem == 0
            ))
            
            golemHitbox.isVisible = () => false;
            newLevelHitbox.renderedBehindHitbox = golemHitbox;
        }
        else if (levelDepth == 100)
        {
            var collectorHitbox = newLevelHitbox.addHitbox(new Hitbox(
                {
                    x: worldConfig.levelClickableWidth * 6,
                    y: 0,
                    height: newLevelHitbox.boundingBox.height,
                    width: 4 * worldConfig.levelClickableWidth
                },
                {
                    onmousedown: function ()
                    {
                        if(chestCollectorChanceStructure.level == 0 && chestCollectorStorageStructure.level == 0)
                        {
                            chestCollectorChanceStructure.level = 1;
                            chestCollectorStorageStructure.level = 1;
                            learnRangeOfBlueprints(3, 8, 9);
                            newNews(_("Discovered the Chest Collector!"));
                        }
                    }
                },
                ""
            ))
            collectorHitbox.render = function ()
            {
                if (chestCollectorChanceStructure.level == 0 || chestCollectorStorageStructure.level == 0)
                {
                    var coords = this.getGlobalCoordinates(0, 0);
                    drawImageFitInBox(
                        MAIN,
                        collector1, 
                        coords.x,
                        coords.y,
                        this.boundingBox.width,
                        this.boundingBox.height
                    );
                }
            }.bind(collectorHitbox);
        }
        else if (levelDepth == 112)
        {
            var mimeHitbox = newLevelHitbox.addHitbox(new Hitbox(
                {
                    x: worldConfig.levelClickableWidth * 0.5,
                    y: 0,
                    height: newLevelHitbox.boundingBox.height,
                    width: 1.5 * worldConfig.levelClickableWidth
                },
                {
                    onmousedown: function ()
                    {
                        questManager.getQuest(94).markComplete();
                    }
                },
                ""
            ))
            mimeHitbox.render = function ()
            {
                var coords = this.getGlobalCoordinates(0, 0);
                drawImageFitInBox(
                    MAIN,
                    mime, 
                    coords.x,
                    coords.y,
                    this.boundingBox.width,
                    this.boundingBox.height
                );
            }.bind(mimeHitbox);
            mimeHitbox.isVisible = () => false;
            newLevelHitbox.renderedBehindHitbox = mimeHitbox;
        }
        else if (levelDepth == 225)
        {
            var robotHitbox = newLevelHitbox.addHitbox(new Hitbox(
                {
                    x: worldConfig.levelClickableWidth * 0.5,
                    y: 0,
                    height: newLevelHitbox.boundingBox.height,
                    width: worldConfig.levelClickableWidth
                },
                {
                    onmousedown: function ()
                    {
                        if(hasFoundGidget == 0)
                        {
                            hasFoundGidget = 1;
                            learnRangeOfBlueprints(1, 32, 47);
                            startFoundGidgetDialogue();
                        }
                        else
                        {
                            //Later have more dialogue
                            openUi(CraftingWindow);
                        }
                    }
                },
                ""
            ))
            robotHitbox.render = function ()
            {
                var coords = this.getGlobalCoordinates(0, 0);
                MAIN.drawImage(robot, 30 * getAnimationFrameIndex(4, 3), 0, 30, 120,
                    coords.x,
                    coords.y + this.boundingBox.height / 2,
                    this.boundingBox.width,
                    this.boundingBox.height * 1.1
                );
                this.renderChildren();
            }.bind(robotHitbox);

            robotHitbox.addHitbox(new EasyHintArrow(
                "left",
                () => hasFoundGidget == 0
            ))
        }
        else if (levelDepth == 1257)
        {
            var robotHitbox = newLevelHitbox.addHitbox(new Hitbox(
                {
                    x: worldConfig.levelClickableWidth * 0.5,
                    y: 0,
                    height: newLevelHitbox.boundingBox.height,
                    width: worldConfig.levelClickableWidth
                },
                {
                    onmousedown: function ()
                    {
                        learnRangeOfBlueprints(1, 79, 87);
                        openUi(CraftingWindow);
                    }
                },
                ""
            ))
            robotHitbox.render = function ()
            {
                var coords = this.getGlobalCoordinates(0, 0);
                MAIN.drawImage(Lunar_Robot, 40 * (Math.floor(numFramesRendered / 3) % 4), 0, 40, 160, 
                    coords.x,
                    coords.y + this.boundingBox.height / 2,
                    this.boundingBox.width,
                    this.boundingBox.height
                );
            }.bind(robotHitbox);
        }
    }

    getLevelHitbox(kmDepth)
    {
        return this.getHitboxById("level_" + kmDepth);
    }

    getMinerAtLevel(level, workerIndex)
    {
        return this.getHitboxById("level_" + level).getHitboxById("miner_" + level + "_" + workerIndex);
    }

    getClickableAtLevel(level, clickableIndex)
    {
        return this.getHitboxById("clickableIndex_" + level + "_" + clickableIndex);
    }

    getGlobalCoordinatesOfLevel(level)
    {
        var xCoord = this.leftBound;
        var yCoord = this.topBound - (currentlyViewedDepth - this.minVisibleDepth - level) * worldConfig.levelHeight
        return {x: xCoord, y: yCoord}
    }

    getDrillLocation()
    {
        var isWaitingForLiftOff1 = decimalDepth() >= 1000 && depth < 1100 && hasLaunched == 0;
        var isWaitingForLiftOff2 = decimalDepth() >= 1783 && depth < 1800 && hasLaunched == 1;
        if (isWaitingForLiftOff1) return 1000;
        if (isWaitingForLiftOff2) return 1783;
        return depth + 1;
    }

    isSpace(kmDepth)
    {
        return (kmDepth >= 1000 && kmDepth <= 1031) || (kmDepth >= 1782 && kmDepth <= 1813);
    }
}