# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
# Picture Menu V1.0
#
# By: â˜†GDSâ˜†
#
# Site: ***************
# Requires: n/a
# Lag : low
#==============================================================================
# â–¼ Updates
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
# 2012.21.06 - Script start and finish
#
#==============================================================================
# â–¼ Introduction
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
# use pictures, and sound to make your menu better looking
#==============================================================================
#==============================================================================
# Ââ–¼ Licence
# =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
# do whatever you wnat with if, just dont forget to credit me
#
#==============================================================================
#==============================================================================
# ÂÂ¥ Config
#==============================================================================
module GDS_MENU
 #============================================================================#
 # put here the name of the files to be used as background
 # Same file cam be used multiple times
 # put the files on Graphics/System
 #============================================================================#

 BASIC_MENU_NAME  =   "menu"	   #|1Âº menu image
							    #|
 ITEM_MENU_NAME   = "menu_item"    #|Item menu image
							    #|
 SKILL_MENU_NAME  = "menu_skill"   #|skills menu image
							    #|
 EQUIP_MENU_NAME  = "menu_equip"   #|equip window image
							    #|
 STATUS_MENU_NAME = "menu_status"  #|status menu image
							    #|
 FILE_MENU_NAME   = "menu_status"  #|Save/load image
							    #|
 END_MENU_NAME    = "menu_status"  #|shutdoen menu image

 #============================================================================#
 # Music
 #============================================================================#

 MENU_MUSIC = true #<= true changes the music during menu only
				 #   false default ACE method
 MUSIC_NAME = "menu" #<= nmusic name, must be on audio/BGM

 #============================================================================#
 # Opacity for all window
 # recomended not to change
 #============================================================================#
 MENU_OPACITY	    = 0
 MENU_gold_OPACITY   = 0
 MENU_status_OPACITY = 0
 ITEM_OPACITY	    = 0
 SKILL_OPACITY	   = 0
 EQUIP_OPACITY	   = 0
 STATUS_OPACITY	  = 0
 FILE_OPACITY	    = 0
 END_OPACITY		 = 120
end
#==============================================================================
# End of configuration
#==============================================================================
#==============================================================================
# ** Scene_MenuBase
#------------------------------------------------------------------------------
#  This class performs basic processing related to the menu screen.
#==============================================================================
class Scene_MenuBase < Scene_Base
 #--------------------------------------------------------------------------
 # * overwrite method
 # * Free Background
 #--------------------------------------------------------------------------
 def dispose_backgroundsss
   @menubg.dispose
 end
   def dispose_background
   @background_sprite.dispose
 end
end
class Scene_Menu < Scene_MenuBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * rewrite method
 # * Start Processing
 # * return_scene
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   if MENU_MUSIC == true and @marker == nil
  BattleManager::save_bgm_and_bgs
  RPG::BGM.stop
  RPG::BGS.stop
  RPG::SE.stop
  RPG::BGM.new(MUSIC_NAME).play
  @marker = 1
   end
 end
 def return_scene
   @marker = nil
   SceneManager.return
   BattleManager::replay_bgm_and_bgs
 end
 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
 def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",BASIC_MENU_NAME)
   @background_sprite.z = -10
 end
 #--------------------------------------------------------------------------
 # * alias method method
 # * create_command_window
 # * create_gold_window
 #--------------------------------------------------------------------------
 alias create_command_window_GDS create_command_window
 alias create_gold_window_GDS create_gold_window
 alias create_status_window_GDS create_status_window
 def create_command_window
   create_command_window_GDS
   @command_window.opacity = MENU_OPACITY
 end

 def create_gold_window
   create_gold_window_GDS
   @gold_window.opacity = MENU_gold_OPACITY
 end

  def create_status_window
   create_status_window_GDS
   @status_window.opacity = MENU_status_OPACITY
 end


end
#==============================================================================
# ** Scene_Item
#------------------------------------------------------------------------------
#  This class performs the item screen processing.
#==============================================================================
class Scene_Item < Scene_ItemBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * start
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @category_window.opacity = ITEM_OPACITY
   @item_window.opacity = ITEM_OPACITY
   @help_window.opacity = ITEM_OPACITY
 end
 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",ITEM_MENU_NAME)
   @background_sprite.z = -10
 end
end
#==============================================================================
# ** Scene_Skill
#------------------------------------------------------------------------------
#  This class performs skill screen processing. Skills are handled as items for
# the sake of process sharing.
#==============================================================================
class Scene_Skill < Scene_ItemBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * Start Processing
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @help_window.opacity = SKILL_OPACITY
   @command_window.opacity = SKILL_OPACITY
   @status_window.opacity = SKILL_OPACITY
   @item_window.opacity = SKILL_OPACITY
 end

 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",SKILL_MENU_NAME)
   @background_sprite.z = -10
 end
end
#==============================================================================
# ** Scene_Equip
#------------------------------------------------------------------------------
#  This class performs the equipment screen processing.
#==============================================================================

class Scene_Equip < Scene_MenuBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * Start Processing
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @help_window.opacity = EQUIP_OPACITY
   @status_window.opacity = EQUIP_OPACITY
   @command_window.opacity = EQUIP_OPACITY
   @slot_window.opacity = EQUIP_OPACITY
   @item_window.opacity = EQUIP_OPACITY
 end
 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",EQUIP_MENU_NAME)
   @background_sprite.z = -10
 end

end
#==============================================================================
# ** Scene_Status
#------------------------------------------------------------------------------
#  This class performs the status screen processing.
#==============================================================================
class Scene_Status < Scene_MenuBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * Start Processing
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @status_window.opacity = STATUS_OPACITY
 end
 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite= Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",STATUS_MENU_NAME)
   @background_sprite.z = -10
 end
end
#==============================================================================
# ** Scene_End
#------------------------------------------------------------------------------
#  This class performs game over screen processing.
#==============================================================================
class Scene_End < Scene_MenuBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * Start Processing
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @command_window.opacity = END_OPACITY
 end

 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",END_MENU_NAME)
   @background_sprite.z = -10
 end
end
#==============================================================================
# ** Scene_File
#------------------------------------------------------------------------------
#  This class performs common processing for the save screen and load screen.
#==============================================================================
class Scene_File < Scene_MenuBase
 include GDS_MENU
 #--------------------------------------------------------------------------
 # * alias method
 # * Start Processing
 #--------------------------------------------------------------------------
 alias start_GDS start
 def start
   start_GDS
   @help_window.opacity = FILE_OPACITY

 end
 #--------------------------------------------------------------------------
 # * rewrite method
 # * create_background
 #--------------------------------------------------------------------------
  def create_background
   @background_sprite = Sprite.new
   @background_sprite.bitmap = Cache.load_bitmap("Graphics/System/",FILE_MENU_NAME)
   @background_sprite.z = -10
 end
end