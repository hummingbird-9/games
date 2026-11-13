

function gSw(switchId) {
 return $gameSwitches.value(switchId);
};
function gVr(varId) {
 return $gameVariables.value(varId);
};

function sSw(switchId,val) {
 return $gameSwitches.setValue(switchId,val);
};
function sVr(varId,val) {
 return $gameVariables.setValue(varId,val);
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand("save") && gSw(13)) {
        const enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, "save", enabled);
    }
};

Scene_Shop.prototype.sellingPrice = function() {
    return Math.floor(this._item.price *gVr(125));
};


function staunchWoundsCalc(user,target) {
	var healname = ""
	if(target.hp<target.mhp/5){result = 8+target.mhp*0.6;}
	else if(target.hp<target.mhp/5*2){result = 6+target.mhp*0.4;}
	else if(target.hp<target.mhp/5*3){result = 4+target.mhp*0.2;}
	else if(target.hp<target.mhp/5*4){result = 2+target.mhp*0.1;}
	else {result = 1+target.mhp*0.05;}
	console.log(healname+": "+result+ ", hp :" +target.hp/target.mhp*100+"%");
return result;
}

Game_Action.prototype.targetsForEveryone = function() {
	var targetState = $dataSkills[this._item._itemId].meta.targetState;
	if(!targetState){targetState = 0;}else{targetState = parseInt(targetState);}
    
	const opponentMembers = this.opponentsUnit().aliveMembers();
    const friendMembers = this.friendsUnit().aliveMembers();
    return opponentMembers.concat(friendMembers);
};

Game_Action.prototype.targetsForOpponents = function() {
    var targetState = $dataSkills[this._item._itemId].meta.targetState;
	if(!targetState){targetState = 0;}else{targetState = parseInt(targetState);}
	
	const unit = this.opponentsUnit();
    if (this.isForRandom()) {
        return this.randomTargets_state(unit,targetState);
    } else {
        return this.targetsForAlive_state(unit,targetState);
    }
};

Game_Action.prototype.targetsForFriends = function() {
    const unit = this.friendsUnit();
    if (this.isForUser()) {
        return [this.subject()];
    } else if (this.isForDeadFriend()) {
        return this.targetsForDead(unit);
    } else if (this.isForAliveFriend()) {
        return this.targetsForAlive(unit);
    } else {
        return this.targetsForDeadAndAlive(unit);
    }
};

Game_Action.prototype.randomTargets_state = function(unit,chkState) {
    const targets = [];
    for (let i = 0; i < this.numTargets(); i++) {
        targets.push(unit.randomTarget_state(chkState));
    }
    return targets;
};

Game_Unit.prototype.smoothTarget_state = function(index,chkState) {
    const member = this.members()[Math.max(0, index)];
    return member && member.isAlive() ? member : this.aliveMembers_state(chkState)[0];
};

Game_Action.prototype.targetsForDead = function(unit,chkState) {
    if (this.isForOne()) {
        return [unit.smoothDeadTarget(this._targetIndex)];
    } else {
        return unit.deadMembers();
    }
};

Game_Action.prototype.targetsForAlive_state = function(unit,chkState) {
    if (this.isForOne()) {
        if (this._targetIndex < 0) {
            return [unit.randomTarget_state(chkState)];
        } else {
            return [unit.smoothTarget_state(this._targetIndex,chkState)];
        }
    } else {
        return unit.aliveMembers();
    }
};

Game_Action.prototype.targetsForDeadAndAlive = function(unit,chkState) {
    if (this.isForOne()) {
        return [unit.members()[this._targetIndex]];
    } else {
        return unit.members();
    }
};


Game_Unit.prototype.aliveMembers_state = function(chkState=0) {
	var retMembers = this.members().filter(member => member.isAlive());
	if(chkState == 0){return retMembers;}
	else{return retMembers.filter(member => member.isStateAffected(chkState));}
};

Game_Unit.prototype.deadMembers_state = function(chkState=0) {
    var retMembers = this.members().filter(member => member.isDead());
	if(chkState == 0){return retMembers;}
	else{return retMembers.filter(member => member.isStateAffected(chkState));}
};

Game_Unit.prototype.tgrSum_state = function(chkState) {
    return this.aliveMembers_state(chkState).reduce((r, member) => r + member.tgr, 0);
};

Game_Unit.prototype.randomTarget_state = function(chkState=0) {
    let tgrRand = Math.random() * this.tgrSum(chkState);
    let target = null;
    for (const member of this.aliveMembers_state(chkState)) {
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    }
    return target;
};

Game_Unit.prototype.randomDeadTarget_state = function(chkState=0) {
    const members = this.aliveMembers_state(chkState);
    return members.length ? members[Math.randomInt(members.length)] : null;
};


Game_Battler.prototype.regenerateHp = function() {
    const minRecover = -this.maxSlipDamage();
	var regenTotal = this.mhp * this.hrg;
	if(regenTotal<0)
	{
		const dotResist = this.stateRate(27);
		regenTotal = regenTotal*dotResist;
	}
    const value = Math.max(Math.floor(regenTotal), minRecover);
    if (value !== 0) {
        this.gainHp(value);
    }
};

function shuffleArray(unshuffled = [1, 2, 3]){
let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
   
console.log(shuffled)
return shuffled;
}

Game_Character.prototype.moveTowardCoord = function(cX,cY) {
    const sx = this.deltaXFrom(cX);
    const sy = this.deltaYFrom(cY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};

function reloadAmmo()
{
	let subject = BattleManager._lastSubject;
	const skillUsed = $dataSkills[BattleManager._lastSkill];
	sSw(1,false); sSw(2,false);
	if (subject.isActor())
	{
		const subject = BattleManager._lastSubject;
		
		if(skillUsed.id == 306)///refuel chainsaw
		{
			$gameParty.gainItem($dataItems[162], -1); ///use up gasoline
			subject.forceChangeEquip(0, $dataWeapons[103]);
		}
		else if(skillUsed.id == 307)///recharge baton
		{
			$gameParty.gainItem($dataItems[319], -1);///use up a battery
			subject.forceChangeEquip(0, $dataWeapons[100]);
		}
		else
		{
			const equip = BattleManager._lastSubject._equips[1];
			if(equip._itemId != 0)
			{
				const eqData = $dataArmors[equip._itemId];
				
				sVr(1,equip._itemId);
				sVr(3,eqData.meta.wpnIndex);
				
				console.log(equip);
				console.log(eqData);
				console.log(skillUsed);
				const ammoMax = undefRep(eqData.meta.maxAmmo);
				if(ammoMax>0)
				{
					const nbItems = $gameParty.numItems($dataItems[skillUsed.meta.WithItemId])
					console.log("Spare Ammo Left: "+nbItems);
					const varIndx = 301+parseInt(eqData.meta.wpnIndex);
					let curAmmo = gVr(varIndx);
					let ammoRegain = ammoMax - curAmmo;
					if(ammoRegain>nbItems){ammoRegain = nbItems;}
					console.log("Max ammo: "+ammoMax+", curAmmo:"+curAmmo+", spare ammo: "+nbItems+", ammoRegained: "+ammoRegain);
					curAmmo += ammoRegain;
					$gameParty.gainItem($dataItems[skillUsed.meta.WithItemId], -ammoRegain);
					sVr(varIndx,curAmmo);
					console.log("Ammo After: "+gVr(varIndx));
					if(curAmmo >= ammoMax)
					{
						console.log("ammo full, switch to full gun");
						const bbneed = eqData.meta.bigburstNeed;
						const bneed = eqData.meta.burstNeed;  
						let newGunId = parseInt(eqData.meta.emptyOb);
						if(bbneed != undefined){newGunId+=4;}
						else if(bneed != undefined){newGunId+=3;}
						else{newGunId+=2;}
						subject.forceChangeEquip(1, $dataArmors[newGunId]);
					}
					else
					{
						const bbneed = eqData.meta.bigburstNeed;
						const bneed = eqData.meta.burstNeed;
						let newGunId = parseInt(eqData.meta.emptyOb);
						if(bbneed != undefined && curAmmo >= bbneed){newGunId+=3;}
						else if(bneed != undefined && curAmmo >= bneed){newGunId+=2;}
						else{newGunId+=1;}
						subject.forceChangeEquip(1, $dataArmors[newGunId]);
					}
				}
			}
		}
	}
}

Game_Action.prototype.itemEffectRemoveState = function(target, effect) {
    let chance = effect.value1;
    if (Math.random() < chance) {
		var wasApplied = false;
		if(target.isStateAffected(effect.dataId)){wasApplied = true;}
        target.removeState(effect.dataId);
		var healstate = $dataStates[effect.dataId].meta.healState;
		if(wasApplied && healstate)
		{///on heal state, apply state
			console.log("Found healstate for "+$dataStates[effect.dataId].name+", apply - "+ $dataStates[parseInt(healstate)].name);
			target.addState(parseInt(healstate));
		}
        this.makeSuccess(target);
    }
};

Game_Actor.prototype.updateStateSteps = function(state) {
    if (state.removeByWalking) {
        if (this._stateSteps[state.id] > 0) {
            if (--this._stateSteps[state.id] === 0) {
				var wasApplied = false;
				if(this.isStateAffected(state.id)){wasApplied = true;}
                this.removeState(state.id);
				if(wasApplied && $dataStates[state.id].meta.timeOutState)
				{///on state timeout, chain timeout state
					console.log("Found timeout state, apply - "+ $dataStates[parseInt($dataStates[state.id].meta.timeOutState)].name);
					this.addState(parseInt($dataStates[state.id].meta.timeOutState));
				}
			
            }
        }
    }
};

Game_Battler.prototype.removeStatesAuto = function(timing) {
    for (const state of this.states()) {
        if (
            this.isStateExpired(state.id) &&
            state.autoRemovalTiming === timing
        ) {
			var wasApplied = false;
			if(this.isStateAffected(state.id)){wasApplied = true;}
            this.removeState(state.id);
			
			if(wasApplied && $dataStates[state.id].meta.timeOutState)
			{///on state timeout, chain timeout state
				console.log("Found timeout state, apply - "+ $dataStates[parseInt($dataStates[state.id].meta.timeOutState)].name);
				this.addState(parseInt($dataStates[state.id].meta.timeOutState));
			}
        }
    }
};

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
            this.addNewState(stateId);
			if($dataStates[stateId].meta.removeStateOnApply)
			{///on state apply, remove 
				console.log("Found apply state remove - "+ $dataStates[parseInt($dataStates[stateId].meta.removeStateOnApply)].name);
				this.removeState(parseInt($dataStates[stateId].meta.removeStateOnApply));
			}
            this.refresh();
        }
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};

// Show Text
Game_Interpreter.prototype.command101 = function(params) {
    if ($gameMessage.isBusy()) {
        return false;
    }
	var faceSet = params[0];
	///face set swap
	if(faceSet == "Portrait_Hellen")
	{
		faceSet = $gameActors.actor(7)._faceName;
	}
    $gameMessage.setFaceImage(faceSet, params[1]);
    $gameMessage.setBackground(params[2]);
    $gameMessage.setPositionType(params[3]);
    $gameMessage.setSpeakerName(params[4]);
    while (this.nextEventCode() === 401) {
        // Text data
        this._index++;
        $gameMessage.add(this.currentCommand().parameters[0]);
    }
    switch (this.nextEventCode()) {
        case 102: // Show Choices
            this._index++;
            this.setupChoices(this.currentCommand().parameters);
            break;
        case 103: // Input Number
            this._index++;
            this.setupNumInput(this.currentCommand().parameters);
            break;
        case 104: // Select Item
            this._index++;
            this.setupItemChoice(this.currentCommand().parameters);
            break;
    }
    this.setWaitMode("message");
    return true;
};

function repairWeapon(weaponIndex)
{
	var repairTo = parseInt(undefRep($dataWeapons[weaponIndex].meta.repairTo,"0"));
	if(repairTo==0){repairTo = weaponIndex-1; console.log("MISSING REPAIRTO FOR "+weaponIndex+", GOING FOR INDEX-1");}
	console.log("Repaired into: "+$dataWeapons[repairTo].name);
	$gameParty.loseItem($dataWeapons[weaponIndex], 1);
	$gameParty.gainItem($dataWeapons[repairTo], 1);
	sVr(8,$dataWeapons[repairTo].name);
}

function durabilityCheck()
{
	var subject = gVr(148);//BattleManager._lastSubject;
	if(subject == 0){subject = BattleManager._lastSubject;}
	const lastResult = gVr(145);
	var lastSkill = $dataSkills[gVr(146)];
	if(gVr(146)==0){lastSkill = $dataSkills[1];}
	sSw(1,false); sSw(2,false);
	if (subject != undefined && subject.isActor())
	{
		const equip = subject._equips[0];
		if(equip._itemId != 0 && lastResult>=1)
		{
			
			const eqData = $dataWeapons[equip._itemId];
			let fragile = undefRep(eqData.meta.fragile);
			const breakOb = undefRep(eqData.meta.breakOb);
			const breakMsg = eqData.meta.breakMsg;
			const breakSnd = eqData.meta.breakSnd;
			const breakJnk = undefRep(eqData.meta.breakJunk,177);
			const breakJnkAmnt = undefRep(eqData.meta.breakJunkAmnt,0);
			let breakRatio = undefRep(lastSkill.meta.breakRate,1);
			if(lastResult==2){breakRatio = breakRatio*1.5;}
			console.log("|--Melee Durability Check--")
			console.log("| Last Result: "+lastResult+", ");
			console.log(equip);
			//get attack count for item
			var attackCount = 0;
			var atkCntArray = [];
			if(!Array.isArray(gVr(162)))
			{
				for (var i = 1; i <= 141; i++) {
				   atkCntArray.push(0);
				}
				sVr(162,atkCntArray);
			}
			else{atkCntArray = gVr(162);}
			attackCount = atkCntArray[equip._itemId];
			console.log("Number of attacks with "+eqData.name+": "+ attackCount);
			var attackCountRatio = 1;
			
			if(gSw(13) == true)
			{///easy mode: first 5 attacks with a new weapon are less likely to break
				if(attackCount<=0){attackCountRatio /= 5;}
				else if(attackCount==1){attackCountRatio /= 4;}
				else if(attackCount==2){attackCountRatio /= 3;}
				else if(attackCount==3){attackCountRatio /= 2;}
				else if(attackCount==4){attackCountRatio /= 1.5;}
			}
			else if(gSw(8) == false)
			{///first 3 attacks with a new weapon are less likely to break
				if(attackCount<=0){attackCountRatio /= 3;}
				else if(attackCount==1){attackCountRatio /= 2;}
				else if(attackCount==2){attackCountRatio /= 1.5;}
			}
			else
			{///hard mode is less forgiving on new weapons, older weapons become fragile
				if(attackCount<=0){attackCountRatio /= 2;}
				else if(attackCount==1){attackCountRatio /= 1.5;}
				if(attackCount>=20){attackCountRatio /= 0.5;}
				else if(attackCount>=10){attackCountRatio /= 0.75;}
			}
			attackCount+=1;
			
			if(undefRep(eqData.meta.fragile)>0)
			{
				const roll = Math.randomInt(100);
				console.log("Break Roll for "+eqData.name+": "+roll+" < "+fragile*breakRatio*attackCountRatio+"% [fragility:"+fragile+", skill ratio: x"+breakRatio + ", attack count ratio: x"+attackCountRatio+"]");
				if(roll<=fragile*breakRatio*attackCountRatio)
				{
					if(gVr(45)>0){sVr(45,gVr(45)-1); console.log("Break Mulligan Used. Left: "+gVr(45));}///break mulligans
					else
					{
						attackCount = 0;///reset attack count for weapon
						if(gVr(15)==0 && gSw(8) == false)
						{
							sVr(45,1); console.log("Easy/Normal difficulty - Weapon broke on first day, gained break mulligan.")
						}
						sSw(2,true); ///prime weapon break tutorial in user event
						console.log("Item broke.");
						if(breakOb != 0){subject.forceChangeEquip(0, $dataWeapons[breakOb]);}
						else
						{
							subject.forceChangeEquip(0, null);
						}
						if(breakJnkAmnt>0)
						{
							$gameParty.gainItem($dataItems[breakJnk], breakJnkAmnt);
						}
						breakMessage(eqData,breakJnk,breakJnkAmnt);
					}
				}
			}
			atkCntArray[equip._itemId] = attackCount;
			sVr(162,atkCntArray);
		}
	}
}

function breakMessage(objData,breakJnk,breakJnkAmnt)
{
	
	const breakOb = undefRep(objData.meta.breakOb);
	const breakMsg = objData.meta.breakMsg;
	const breakSnd = objData.meta.breakSnd;
		
	if(breakSnd == undefined)
	{
		if(breakOb != 0){AudioManager.playSe({name:"ObjectCreak",volume:90,pitch:100,pan:0});}
		else{AudioManager.playSe({name:"ObjectBreak",volume:90,pitch:100,pan:0});}
	}
	else{AudioManager.playSe({name:breakSnd,volume:90,pitch:100,pan:0});}
	if(breakMsg == undefined)
	{
		var tx = "";
		if(breakOb != 0)
		{
			tx="The "+objData.name+ " was damaged.";
		}
		else
		{
			tx="The "+objData.name+ " broke!";
		}
		if(breakJnkAmnt>0)
		{
			var jnkName = $dataItems[breakJnk].name;
			tx+="\nGot x"+String(breakJnkAmnt)+" \C[06]{"+ jnkName +"}\C[00]";
		}
		quickMsg(tx);
		
	}
	else
	{
		quickMsg(breakMsg);
	}
}

function quickMsg(message) {
    if ($gameMessage.isBusy()) {
        return false;
    }
	$gameMessage.newPage();
    $gameMessage.setFaceImage('', 0);
	$gameMessage.setBackground(0);
	$gameMessage.setPositionType(1);
	$gameMessage.setSpeakerName('');
	$gameMessage.add(message);
    return true;
};

Game_System.prototype.addItemStock = function(mapId,eventId,item,amount)
{
	const stock = [];
	stock.push({ type: 0, id: item, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Game_System.prototype.addWeaponStock = function(mapId,eventId,weapon,amount)
{
	const stock = [];
	stock.push({ type: 1, id: weapon, quantity: amount, priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Game_System.prototype.addEquipStock = function(mapId,eventId,equip,amount)
{
	const stock = [];
	stock.push({ type: 2, id: equip, quantity: Number(amount), priceType: 0, price: 0, restockTimer: 0, restockQuantity: 0});
	$gameSystem.addShopStock(mapId, eventId, stock);
}

Window_Message.prototype.startMessage = function() {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this._nameBoxWindow.start();
	console.log("Initialized message box")
	sSw(300,true);
};

Window_Message.prototype.terminateMessage = function() {
	this.close();
    this._goldWindow.close();
    $gameMessage.clear();
	sSw(300,false);
};

Game_Event.prototype.updateSelfMovement = function() {
    if (
        !this._locked &&
        this.isNearTheScreen() &&
		!gSw(300)&&
        this.checkStop(this.stopCountThreshold())
    ) {
        switch (this._moveType) {
            case 1:
                this.moveTypeRandom();
                break;
            case 2:
                this.moveTypeTowardPlayer();
                break;
            case 3:
                this.moveTypeCustom();
                break;
        }
    }
};

Window.prototype._refreshFrame = function() {
    var w = this._width;
	var h = this._height;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this._frameSprite.bitmap = bitmap;
	this._frameSprite.setFrame(0, 0, w, h);
	
	if (w > 00 && h >0 && this._windowskin)
	{
		var skin = this._windowskin;
		var p = 96;
		var q = 96;

		//Creates easy references for original/new width and height
		var oWid = p-m*2;
		var nWid = w-m*2;
		var oHei = p-m*2;
		var nHei = h-m*2;

		//Divides to find how many complete repeats for horizontal and vertical
		var hRep = Math.floor(nWid / oWid);
		var vRep = Math.floor(nHei / oHei);

		//Finds remainders for the "fraction" remaining
		var hRem = nWid % oWid;
		var vRem = nHei % oHei;

		//Top Side
		for(var i = 0; i < hRep; i++) {
			bitmap.blt(skin, p+m, 0, oWid, m, m + (i*oWid), 0, oWid, m);
		}
		bitmap.blt(skin, p+m, 0, hRem, m, m + (oWid*hRep), 0, hRem, m);
		//Bottom Side
		for(var i = 0; i < hRep; i++) {
			bitmap.blt(skin, p+m, q-m, oWid, m, m + (i*oWid), h-m, oWid, m);
		}
		bitmap.blt(skin, p+m, q-m, hRem, m, m + (oWid*hRep), h-m, hRem, m);
		//Left Side
		for(var i = 0; i < vRep; i++) {
			bitmap.blt(skin, p, m, m, oHei, 0, m + (i*oHei), m, oHei);
		}
		bitmap.blt(skin, p, m, m, vRem, 0, m + (vRep*oHei), m, vRem);
		//Right Side
		for(var i = 0; i < vRep; i++) {
			bitmap.blt(skin, p+q-m, m, m, oHei, w-m, m + (i*oHei), m, oHei);
		}
		bitmap.blt(skin, p+q-m, m, m, vRem, w-m, m + (vRep*oHei), m, vRem);
		
		//Top-Left Corner
		bitmap.blt(skin, p+0, 0+0, m, m, 0, 0, m, m);
		//Top-Right Corner
		bitmap.blt(skin, p+q-m, 0+0, m, m, w-m, 0, m, m);
		//Bottom-Left Corner
		bitmap.blt(skin, p+0, 0+q-m, m, m, 0, h-m, m, m);
		//Bottom-Right Corner
		bitmap.blt(skin, p+q-m, 0+q-m, m, m, w-m, h-m, m, m);
	}
};

Window_NameBox.prototype._refreshFrame = function() {
    var w = this._width;
	var h = this._height;
	var m = 24;
	var bitmap = new Bitmap(w, h);

	this._frameSprite.bitmap = bitmap;
	this._frameSprite.setFrame(0, 0, w, h);
	
	for (const child of this._frameSprite.children) {
		child.visible = w > 0 && h > 0;
	}

	const drect = { x: 0, y: 0, width: this._width, height: this._height };
	const srect = { x: 96, y: 0, width: 96, height: 96 };
	for (const child of this._frameSprite.children) {
		child.bitmap = this._windowskin;
	}
	this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
	
};

BattleManager.initMembers = function() {
    this._phase = "";
    this._inputting = false;
    this._canEscape = false;
    this._canLose = false;
    this._battleTest = false;
    this._eventCallback = null;
    this._preemptive = false;
    this._surprise = false;
    this._currentActor = null;
    this._actionForcedBattler = null;
    this._mapBgm = null;
    this._mapBgs = null;
    this._actionBattlers = [];
    this._subject = null;
    this._action = null;
    this._targets = [];
    this._logWindow = null;
    this._spriteset = null;
    this._escapeRatio = 0;
    this._escaped = false;
    this._rewards = {};
    this._tpbNeedsPartyCommand = true;
	
	this._lastSkill = null;
	this._lastSubject = null;
	this._lastResult = 0;
};

Scene_Skill.prototype.onItemOk = function() {
    BattleManager._lastSubject = this.user();
	this.actor().setLastMenuSkill(this.item());
    this.determineItem();
};

Scene_Item.prototype.onItemOk = function() {
	BattleManager._lastSubject = this.user();
    $gameParty.setLastItem(this.item());
    this.determineItem();
};

Window_Base.prototype.lineHeight = function() {
    return 34;
};

Window_Base.prototype.itemPadding = function() {
    return 6;
};

BattleManager.updateTurn = function(timeActive) {
    $gameParty.requestMotionRefresh();
    if (this.isTpb() && timeActive) {
        this.updateTpb();
    }
    if (!this._subject) {
        this._subject = this.getNextSubject();
		this._lastSubject = this._subject;
    }
    if (this._subject) {
        this.processTurn();
    } else if (!this.isTpb()) {
        this.endTurn();
    }
};

BattleManager.startBattle = function() {
    this._phase = "start";
    $gameSystem.onBattleStart();
    $gameParty.onBattleStart(this._preemptive);
    $gameTroop.onBattleStart(this._surprise);
    if($gameSwitches.value(11) == false)
	{
		//this.displayStartMessages();
	}
};

Game_Temp.prototype.setLastUsedSkillId = function(skillID) {
    this.setLastActionData(0, skillID);
	BattleManager._lastSkill = skillID;
};

Game_ActionResult.prototype.clear = function() {
    this.used = false;
    this.missed = false;
    this.evaded = false;
    this.physical = false;
    this.drain = false;
    this.critical = false;
    this.success = false;
    this.hpAffected = false;
    this.hpDamage = 0;
    this.mpDamage = 0;
    this.tpDamage = 0;
    this.addedStates = [];
    this.removedStates = [];
    this.addedBuffs = [];
    this.addedDebuffs = [];
    this.removedBuffs = [];
	
	this.longReach = false;
};

Game_Action.prototype.apply = function(target) {
    const result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
	let reachType = 1;
	let acc = this.itemHit(target);
	const subjectActor = this.subject().isActor();
	if(target.isStateAffected(40) && this.isMelee() && subjectActor)
	{
		result.longReach = true;
		reachType = this.getReach(this.subject());
		if(reachType == 2){acc = acc*0.75; console.log("too far, acc*75%");}
		if(reachType == 1){acc = acc*0.5; console.log("too far, acc*50%");}
		if(reachType == 0){acc = acc*0.25; console.log("too far, acc*25%");}
	}
	
	sVr(146,this._item._itemId); ///save last skill
	sVr(147,target); ///save last target
	sVr(148,this.subject()); ///save last user
	
	if(subjectActor && this._item._dataClass == "skill" && this.isFragile())
	{
		if(gSw(14)==true){console.log("????? uh oh, durability roll overlap ???????");}
		sSw(14,true);///prime for a durability roll
		console.log("DURABILITY ROLL PRIMED!");
	}
    var hitroll = Math.random();
	if(result.used)
	{
		if(hitroll<acc){console.log("Hit roll: "+hitroll*100+" < acc("+acc*100+"%) - HIT!");}
		else{console.log("Hit roll: "+hitroll*100+" < acc("+acc*100+"%) - MISSED!");}
	}
	result.missed = result.used && Math.random() >= acc;
	
	let evadeRoll = Math.random();
	let evadeRate = this.itemEva(target);
	if(this.isMagical){console.log("Magic Evade Roll: "+evadeRoll+", vs mEvade: "+ evadeRate);}
    result.evaded = !result.missed && evadeRoll < evadeRate;
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
	
	if(this._item.object().meta.antifail)
	{
		console.log("Antifail applied");
		this.makeSuccess(target);
	}
	
    if (result.isHit()) {
		BattleManager._lastResult = 1;
		sVr(145,1);
		if(target.isActor())
		{
			if(target.actorId()==1)
			{
				console.log("Target is Main Guy");
				var metaSt = this.item().meta;
				if(metaSt.food){sVr(24,gVr(24)+parseInt(metaSt.food)); sSw(16,true);}
				if(metaSt.morale){sVr(26,gVr(26)+parseInt(metaSt.morale)); sSw(16,true);}
				if(metaSt.vigor){sVr(23,gVr(23)+parseInt(metaSt.vigor)); sSw(16,true);}
				if(metaSt.teeth){sVr(44,gVr(44)+parseInt(metaSt.teeth)); sSw(16,true);}
			}
        }
        if (this.item().damage.type > 0) {
            result.critical = Math.random() < this.itemCri(target);
            const value = this.makeDamageValue(target, result.critical);
            this.executeDamage(target, value);
        }
        for (const effect of this.item().effects) {
            this.applyItemEffect(target, effect);
        }
		if(result.critical){BattleManager._lastResult = 2; sVr(145,2);}
        this.applyItemUserEffect(target);
    }
	else
	{
		BattleManager._lastResult = 0;
		sVr(145,0);
	}
    this.updateLastTarget(target);
};


Window_BattleLog.prototype.displayMiss = function(target) {
    let fmt;
	if(target.result().longReach){this.push("addText","Target was too far to hit!");}
    if (target.result().physical) {
        const isActor = target.isActor();
        fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit;
        this.push("performMiss", target);
    } else {
        fmt = TextManager.actionFailure;
    }
    this.push("addText", fmt.format(target.name()));
};

Game_Action.prototype.isMelee = function() {
	if(this._item.object().meta.melee==undefined){return false;}
	else{return true;}
};

Game_Action.prototype.isFragile = function() {
	if(this._item.object().meta.breakRate==undefined){return false;}
	else
	{
		if(parseInt(this._item.object().meta.breakRate) == 0){return false;}
		else{return true;}
	}
};

Game_Action.prototype.getReach = function(user)
{
	var reach = 1;
	const subject = BattleManager._lastSubject;
	const equip = user._equips[0];
	const eqData = $dataWeapons[equip._itemId];
	if(equip._itemId==0){return 0;}
	else
	{
		if(eqData.meta.reach ==undefined){return 1;}
		else{return parseInt(eqData.meta.reach);}
	}
}

Game_BattlerBase.prototype.equippedGun = function()
{
	if(this.isActor())
	{
	const equips = this.equips();
	return equips[1];
	}
	else{return null;}
};

Sprite_Gauge.prototype.isValid = function() {
    //if (this._battler) {
    //    if (this._statusType === "tp" && !this._battler.isPreserveTp()) {
    //        return $gameParty.inBattle();
    //    } else {
    //        return true;
    //    }
    //}
    return true;
};
//// b.life < a.atk * 4 ? (a.gainHp(b.life) a.gainMp(b.life/2)) : (a.gainHp(1); a.gainMp(1)); b.life < a.atk * 4 ? * (a.atk * 4) : a.atk * 2 - b.def
//// b.life < b.isStateAffected(13) ? 2 * (a.atk * 4) : a.atk * 2 - b.def; b.isStateAffected(13) ? 2 * (a.atk * 4) : a.atk * 2 - b.def

Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler) {
        switch (this._statusType) {
            case "hp":
                return this._battler.hp;
            case "mp":
                return this._battler.mp;
            case "tp":
				const eqGun = this._battler.equippedGun();
				if(eqGun == null)
				{ return 0;}
				else
				{
					return $gameVariables.value(301+ parseInt(undefRep(eqGun.meta.wpnIndex)));
				}
                //return this._battler.tp;
            case "time":
                return this._battler.tpbChargeTime();
        }
    }
    return NaN;
};

Game_BattlerBase.prototype.maxTp = function()
{
	const eqGun = this.equippedGun();
	if(eqGun == null){return 0;}
	else
	{
		return parseInt(undefRep(eqGun.meta.maxAmmo));
	}
};

Game_Battler.prototype.addState = function(stateId) {
    if (this.isStateAddable(stateId)) {
        if (!this.isStateAffected(stateId)) {
            this.addNewState(stateId);
            this.refresh();
        }
		this.onAddState(stateId);
        this.resetStateCounts(stateId);
        this._result.pushAddedState(stateId);
    }
};


Game_Battler.prototype.removeState = function(stateId) {
    if (this.isStateAffected(stateId)) {
        if (stateId === this.deathStateId()) {
            this.revive();
        }
		this.onRemoveState(stateId);
        this.eraseState(stateId);
        this.refresh();
        this._result.pushRemovedState(stateId);
    }
};

Game_Battler.prototype.onAddState = function(stateId) {
	console.log("ON ADD FUNC FOR STATE ID "+stateId + ", "+$dataStates[stateId].name);
	switch(stateId)
	{
		case 70:
			this.setFaceImage('Portrait_Recruits', 3);
			$gamePlayer.refresh();
			break;
	}
	
}

Game_Battler.prototype.onRemoveState = function(stateId) {
	console.log("ON REMOVE FUNC FOR STATE ID "+stateId + ", "+$dataStates[stateId].name);
	switch(stateId)
	{
		case 70:
			this.setFaceImage('Portrait_Recruits', 2);
			$gamePlayer.refresh();
			break;
	}
}

function undefRep(val,ifZeroVal = 0)
{
	if (val == undefined){return ifZeroVal;}
	else{return val;}
};

function checkSkill(actor,skill)
{
	return $gameActors.actor(actor).skills().contains($dataSkills[skill]);
};



Game_CharacterBase.prototype.initMembers = function() {
    this._x = 0;
    this._y = 0;
    this._realX = 0;
    this._realY = 0;
    this._moveSpeed = 4;
    this._moveFrequency = 6;
    this._opacity = 255;
    this._blendMode = 0;
    this._direction = 2;
    this._pattern = 1;
    this._priorityType = 1;
    this._tileId = 0;
    this._characterName = "";
    this._characterIndex = 0;
    this._isObjectCharacter = false;
    this._walkAnime = true;
    this._stepAnime = false;
    this._directionFix = false;
    this._through = false;
    this._transparent = false;
    this._bushDepth = 0;
    this._animationId = 0;
    this._balloonId = 0;
    this._animationPlaying = false;
    this._balloonPlaying = false;
    this._animationCount = 0;
    this._stopCount = 0;
    this._jumpCount = 0;
    this._jumpPeak = 0;
    this._movementSuccess = true;
	
	this._xprev = 0;
	this._yprev = 0;
};

Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.round(x);
    this._y = Math.round(y);
    this._realX = x;
    this._realY = y;
	this._xprev = x;
	this._yprev = y;
};

Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setMovementSuccess(this.canPass(this._x, this._y, d));
    if (this.isMovementSucceeded()) {
		this._xprev = this._x;
		this._yprev = this._y;
        this.setDirection(d);
        this._x = $gameMap.roundXWithDirection(this._x, d);
        this._y = $gameMap.roundYWithDirection(this._y, d);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
        this.increaseSteps();
    } else {
        this.setDirection(d);
        this.checkEventTriggerTouchFront(d);
    }
};

Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setMovementSuccess(
        this.canPassDiagonally(this._x, this._y, horz, vert)
    );
    if (this.isMovementSucceeded()) {
		this._xprev = this._x;
		this._yprev = this._y;
		
	   this._x = $gameMap.roundXWithDirection(this._x, horz);
        this._y = $gameMap.roundYWithDirection(this._y, vert);
        this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(horz));
        this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(vert));
        this.increaseSteps();
    }
    if (this._direction === this.reverseDir(horz)) {
        this.setDirection(horz);
    }
    if (this._direction === this.reverseDir(vert)) {
        this.setDirection(vert);
    }
};

Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
        case "C":
            this.processColorChange(this.obtainEscapeParam(textState));
            break;
        case "I":
            this.processDrawIcon(this.obtainEscapeParam(textState), textState);
            break;
        case "PX":
            textState.x = this.obtainEscapeParam(textState);
            break;
        case "PY":
            textState.y = this.obtainEscapeParam(textState);
            break;
        case "FS":
            this.contents.fontSize = this.obtainEscapeParam(textState);
            break;
		case "F":
			this.drawMessageFaceSwitch(this.obtainEscapeParam(textState));
            break;
        case "{":
            this.makeFontBigger();
            break;
        case "}":
            this.makeFontSmaller();
            break;
		case "F":
			break;
    }
};

Window_Message.prototype.drawMessageFaceSwitch = function(newIndex) {
	const faceName = $gameMessage.faceName();
    const rtl = $gameMessage.isRTL();
    const width = ImageManager.faceWidth;
    const height = this.innerHeight;
    const x = rtl ? this.innerWidth - width - 4 : 4;
	this.contents.clearRect(0,0,width+1,height+1);
    this.drawFace(faceName, newIndex, x, 0, width, height);
};

Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    this._xprev = this._x;
	this._yprev = this._y;
		
	if (Math.abs(xPlus) > Math.abs(yPlus)) {
        if (xPlus !== 0) {
            this.setDirection(xPlus < 0 ? 4 : 6);
        }
    } else {
        if (yPlus !== 0) {
            this.setDirection(yPlus < 0 ? 8 : 2);
        }
    }
    this._x += xPlus;
    this._y += yPlus;
    const distance = Math.round(Math.sqrt(xPlus * xPlus + yPlus * yPlus));
    this._jumpPeak = 10 + distance - this._moveSpeed;
    this._jumpCount = this._jumpPeak * 2;
    this.resetStopCount();
    this.straighten();
};



function parallaxPos(newX,newY)
{
	$gameMap._parallaxAddX = newX;
	$gameMap._parallaxAddY = newY;
};

Sprite_Battler.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._battler = null;
    this._damages = [];
    this._homeX = 0;
    this._homeY = 0;
    this._offsetX = 0;
    this._offsetY = 0;
    this._targetOffsetX = NaN;
    this._targetOffsetY = NaN;
    this._movementDuration = 0;
    this._selectionEffectCount = 0;
	this._shiftX = 0;
	this._shiftY = 0;
};

Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
	this._shiftX = parseInt(undefRep(battler.enemy().meta.shiftX));
	this._shiftY = parseInt(undefRep(battler.enemy().meta.shiftY));
    this.setHome(battler.screenX(), battler.screenY());
    this._stateIconSprite.setup(battler);
};

Sprite_Battler.prototype.updatePosition = function() {
    this.x = this._homeX + this._offsetX + this._shiftX;
    this.y = this._homeY + this._offsetY + this._shiftY;
};

Sprite_Battler.prototype.damageOffsetX = function() {
    return 0-this._shiftX;
};

Sprite_Battler.prototype.damageOffsetY = function() {
    return 0-this._shiftY;
};

function monster_Transform(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	console.log("before it, last fighter: id-"+battlerId+", "+_battler)
	if(_battler != undefined)
	{
		const _enemy = _battler.enemy();
		if(_enemy.meta.transformOb)
		{
			_battler.transform(_enemy.meta.transformOb);
			$gameTroop.makeUniqueNames();
		}
	}
};

function monster_MoveClose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	if(_enemy.meta.moveCloseOb)
	{
		_battler.transform(_enemy.meta.moveCloseOb);
		$gameTroop.makeUniqueNames();
	}
	else
	{
		let baseName = _enemy.meta.baseSprite;
		if(baseName == undefined){baseName = "MissingBasename";}
		else
		{
			_battler.enemy().battlerName = baseName+"_Close";
		}
	}
	_battler.removeState(40);
	_battler.clearResult();
};

function monster_MoveFar(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	if(_enemy.meta.moveFarOb)
	{
		_battler.transform(_enemy.meta.moveFarOb);
		$gameTroop.makeUniqueNames();
	}
	else
	{
		let baseName = _enemy.meta.baseSprite;
		if(baseName == undefined){baseName = "MissingBasename";}
		else
		{
			_battler.enemy().battlerName = baseName+"_Far";
		}
	}
	_battler.addState(40);
	_battler.clearResult();
};


function monster_AltPose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		_battler.enemy().battlerName = baseName+"_Alt";
	}
	_battler.addState(41);
	_battler.clearResult();
};


function monster_NormPose(battlerId = 0)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		_battler.enemy().battlerName = baseName+"_Close";
	}
	_battler.removeState(41);
	_battler.clearResult();
};

function monster_disappear(battlerId)
{
	var target = $gameTroop.members()[battlerId-1];
	target.hide();
}

function monster_ChangeSpr(battlerId = 0,poseName)
{
	const _battler = $gameTroop.members()[battlerId];
	const _enemy = _battler.enemy();
	let baseName = _enemy.meta.baseSprite;
	if(baseName == undefined){baseName = "MissingBasename";}
	else
	{
		_battler.enemy().battlerName = baseName+"_"+poseName;
	}
};

function getDiscVal(disc)
{
	switch(disc)
	{
		case 0: return -999;
		case 1: return 13;
		case 2: return 0;
		case 3: return 0;
		case 4: return 1;
		case 5: return 2;
		case 6: return 95;
		case 7: return 146;
		case 8: return 28
		case 9: return 16;
		case 10: return 5;
		case 11: return -1;
		case 12: return -10;
	}
	return -999;
}

function switchBattleBack1(backgrndFile)
{
	SceneManager._scene._spriteset._back1Sprite.bitmap = ImageManager.loadBattleback1(backgrndFile);
	//SceneManager._scene._spriteset._back1Sprite.adjustPosition();
}

function switchBattleBack2(backgrndFile)
{
	SceneManager._scene._spriteset._back2Sprite.bitmap = ImageManager.loadBattleback2(backgrndFile);
	//SceneManager._scene._spriteset._back2Sprite.adjustPosition();
}

BattleManager.invokeNormalAction = function(subject, target) {
	var realTarget = target;
	if(target.isStateAffected(43)==false)
	{
		realTarget = this.applySubstitute(target);
    }
	this._action.apply(realTarget);
    this._logWindow.displayActionResults(subject, realTarget);
};

BattleManager.checkSubstitute = function(target) {
    return (target.isDying()||target.isStateAffected(44)) && !this._action.isCertainHit();
};


Game_Battler.prototype.forceItem = function(itemId, targetIndex) {
    this.clearActions();
    const action = new Game_Action(this, true);
    action.setItem(itemId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    if (action.item()) {
        this._actions.push(action);
    }
};



Game_Action.prototype.updateLastUsed = function() {
    const item = this.item();
	if(this.subject().isStateAffected(38))
	{
		sVr(220,item.id);
		
		if (DataManager.isSkill(item)) {
        sVr(221,0);
		} else if (DataManager.isItem(item)) {
        sVr(221,1);
		}
	}
    if (DataManager.isSkill(item)) {
        $gameTemp.setLastUsedSkillId(item.id);
    } else if (DataManager.isItem(item)) {
        $gameTemp.setLastUsedItemId(item.id);
    }
};

Game_Action.prototype.updateLastSubject = function() {
    const subject = this.subject();
    if (subject.isActor()) {
        $gameTemp.setLastSubjectActorId(subject.actorId());
    } else {
        $gameTemp.setLastSubjectEnemyIndex(subject.index() + 1);
    }
};

function lastSkill()
{
	return $gameTemp.lastActionData(0)
};
function lastUser()
{
	return $gameTemp.lastActionData(2)
}

function lastUserObj()
{
	return $gameTroop.members()[$gameTemp.lastActionData(3)-1];
}

function lastEnemyType()
{
	return $gameTroop.members()[$gameTemp.lastActionData(3)-1].enemyId();
}

function lastTarget()
{
	return $gameTemp.lastActionData(4)
}


Game_Event.prototype.checkPlayerProx = function(prox = 4,yShift=0) {
	dstFound = $gameMap.distance($gamePlayer.x,$gamePlayer.y,this.x,this.y+yShift);
	return dstFound <= prox;
};

Game_Event.prototype.specialCheckProx = function(prox=4, diff=1, type="secret")
{
	if(this.checkPlayerProx(prox))
	{
		switch(type)
		{
			case "secret":
				chanceRoll = 1 + gVr(20)-diff;
				roll = random()*10;
				if(chanceRoll>roll)
				{
					console.log("Secret Roll "+roll+"/10 < searchskill"+chanceRoll+"? SUCCESS!");
					return true;
				}
				else
				{
					console.log("Secret Roll "+roll+"/10 < searchskill"+chanceRoll+"? FAILURE!");
					return false;
				}
				break;
		}
	}
	return false;
};

Game_Event.prototype.sOn= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],true);
};

Game_Event.prototype.sOff= function(switchName = 'A'){
	$gameSelfSwitches.setValue([$gameMap.mapId(),this._eventId, switchName],false);
};

Game_Event.prototype.qkSpatialSnd = function(se,rad=20,str=100,mVol=90,pan=20) {
	AudioManager.playSpatialSe({name:se,pitch:100,volume:90},{eventId:this._eventId,radius:rad,strength:str,maxVolume:mVol,panType:"Origin Expand",pitchVar:"On",volumeVar:"On",panSt:2,panLd:pan});
};

