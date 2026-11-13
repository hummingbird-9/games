//=============================================================================
// Item Requirement for Skill (v1.0)
//   by LeonMillan
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Item Requirement for Skill
 * @author LeonMillan
 *
 * @help LM_ItemForSkill.js
 *
 * Add to the skill Note:
 *      <WithItemId:123>        Item required for skill
 *      <RemoveWithItem>        Remove required item when skill is used
 */

/*:ja
 * @target MZ
 * @plugindesc スキルの必須アイテム
 * @author LeonMillan
 *
 * @help LM_ItemForSkill.js
 *
 * スキルのメモに加えます:
 *      <WithItemId:123>        スキルの必須アイテム
 *      <RemoveWithItem>        スキル使用後に必須アイテムを費やす
 */

(function() {
    const PLUGIN_NAME = "LM_ItemForSkill";

    const _Game_Actor__skills = Game_Actor.prototype.skills;
    Game_Actor.prototype.skills = function () {
        const list = _Game_Actor__skills.call(this);
    
        const filteredList = list.filter(function(skill) {
            if (!skill.meta["WithItemId"]) return true;
            const itemId = Number(skill.meta["WithItemId"]);
            if (Number.isNaN(itemId) || !$dataItems[itemId]) return true;
            return $gameParty.hasItem($dataItems[itemId], true);
        });
        
        return filteredList;
    };

    const _Game_Actor__paySkillCost = Game_Actor.prototype.paySkillCost;
    Game_Actor.prototype.paySkillCost = function (skill) {
        _Game_Actor__paySkillCost.call(this, skill);
        if (skill.meta["RemoveWithItem"]) {
            const itemId = Number(skill.meta["WithItemId"]);
            if (Number.isNaN(itemId) || !$dataItems[itemId]) return;
            $gameParty.loseItem($dataItems[itemId], 1);
        }
    };
})();
