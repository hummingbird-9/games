/*
Title: Video Player
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.2.3
Release: 03.10.2021
First release: 17.02.2021
*/

/*ru
Название: Видео Плеер
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.2.3
Релиз: 03.10.2021
Первый релиз: 17.02.2021
*/

/*:
 * @plugindesc v.1.2.3 [MV|MZ] Adds video to the title screen, credits, the layers on the map and other.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @orderAfter DK_Game_Time
 * @orderAfter Galv_CustomTitle
 * @help

 ### Info about plugin ###
 Title: DK_Video_Player
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.2.3
 Release: 03.10.2021
 First release: 17.02.2021

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Compatibility with other plugins
 ###=========================================================================
 For compatibility to work properly,
 plugins from the following list must be placed ABOVE:
 DK_Game_Time.js
 Galv_CustomTitle.js

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Before calling the PlayVideo plugin command, you must call the LoadVideo
 command to load the video onto the layer!

 ## Using video as map parallax ##
 In the map notes, write <videoParallax: filename>
 filename - Video filename without extension
 Example: <videoParallax: map_parallax_video>

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Load video onto layer: LoadVideo LAYER SRC
 LAYER - Layer. Calculated with Javascript.
 SRC - Video source. Without "movies/" and file extension.
 Example: LoadVideo 1 dialog1
 Example: LoadVideo $gameVariables.value(1) dialog1

 2. Set video volume: SetVideoVolume LAYER VOLUME
 LAYER - Layer. Calculated with Javascript.
 VOLUME - Volume. Calculated with Javascript.
 Example: SetVideoVolume 1 100
 Example: SetVideoVolume $gameVariables.value(1) $gameVariables.value(2)

 3. Set video speed: SetVideoSpeed LAYER SPEED
 LAYER - Layer. Calculated with Javascript.
 SPEED - Video speed. Calculated with Javascript.
 Example: SetVideoSpeed 1 150
 Example: SetVideoSpeed $gameVariables.value(1) $gameVariables.value(2)

 4. Set video blend mode: SetVideoBlendMode LAYER BLEND_MODE
 LAYER - Layer. Calculated with Javascript.
 BLEND_MODE - Blend mode (NORMAL, ADD, MULTIPLY, SCREEN)
 Example: SetVideoBlendMode 1 ADD
 Example: SetVideoBlendMode $gameVariables.value(1) MULTIPLY

 5. Set video pivot: SetVideoPivot LAYER PIVOT
 LAYER - Layer. Calculated with Javascript.
 PIVOT - Pivot (0 - upper left, 0.5 - center)
 Example: SetVideoPivot 1 0.5
 Example: SetVideoPivot $gameVariables.value(1) $gameVariables.value(2)

 6. Move video: MoveVideo LAYER X Y DURATION
 LAYER - Layer. Calculated with Javascript.
 X - X. Calculated with Javascript.
 Y - Y. Calculated with Javascript.
 DURATION - Duration in frames. 0 - Immediately. Calculated with Javascript.
 Example: MoveVideo 1 100 100 0
 Example: MoveVideo $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3) $gameVariables.value(4)

 7. Change video opacity: ChangeVideoOpacity LAYER OPACITY DURATION
 LAYER - Layer. Calculated with Javascript.
 OPACITY - Opacity. Calculated with Javascript.
 DURATION - Duration in frames. 0 - Immediately. Calculated with Javascript.
 Example: ChangeVideoOpacity 1 128 60
 Example: ChangeVideoOpacity $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3)

 8. Change video scale: ChangeVideoScale LAYER X Y DURATION
 LAYER - Layer. Calculated with Javascript.
 X - Scale X. Calculated with Javascript.
 Y - Scale Y. Calculated with Javascript.
 DURATION - Duration in frames. 0 - Immediately. Calculated with Javascript.
 Example: ChangeVideoScale 1 50 50 60
 Example: ChangeVideoScale $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3) $gameVariables.value(4)

 9. Play video (must be pre-loaded on the layer): PlayVideo LAYER LOOP WAIT
 LAYER - Layer. Calculated with Javascript.
 LOOP - Loop video (true, false)
 WAIT - Wait for playing (true, false)
 Example: PlayVideo 1 true false
 Example: PlayVideo $gameVariables.value(1) false true

 10. Pause video: PauseVideo LAYER
 LAYER - Layer. Calculated with Javascript.
 Example: PauseVideo 1
 Example: PauseVideo $gameVariables.value(1)

 11. Stop video: StopVideo LAYER
 LAYER - Layer. Calculated with Javascript.
 Example: StopVideo 1
 Example: StopVideo $gameVariables.value(1)

 12. Stop all video: StopAllVideo

 13. Replace video on the layer*: ReplaceVideo LAYER SRC LOOP WAIT
 *note: The change occurs after a new video is loaded and the previous video ends.
 LAYER - Layer. Calculated with Javascript.
 SRC - Video source. Without "movies/" and file extension.
 LOOP - Loop video (true, false)
 WAIT - Wait for playing (true, false)
 Example: ReplaceVideo 1 dialog1 true false
 Example: ReplaceVideo $gameVariables.value(1) dialog1 true false

 14. Place the video player in front of the images layer: PlaceVideoPlayerBeforePictures

 15. Place video player after images layer: PlaceVideoPlayerAfterPictures

 16. Reset layer (position, opacity, volume, etc.): ResetVideoLayer LAYER
 LAYER - Layer. Calculated with Javascript.
 Example: ResetVideoLayer 1
 Example: ResetVideoLayer $gameVariables.value(1)

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Donate: https://dk-plugins.ru/donate
 Become a patron: https://www.patreon.com/dkplugins

 * @command LoadVideo
 * @desc Loads the video onto the layer
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg src
 * @text Video source
 * @desc Video source. Without "movies/" and file extension.

 * @command SetVideoVolume
 * @desc Sets the video volume
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg volume
 * @text Volume
 * @desc Volume. Default: 100
 * @default 100

 * @command SetVideoSpeed
 * @desc Sets the video speed
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg speed
 * @text Speed
 * @desc Speed. Default: 100
 * @default 100

 * @command SetVideoBlendMode
 * @desc Sets the video blend mode
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg blendMode
 * @text Blend mode
 * @desc Blend mode
 * @type select
 * @option normal
 * @value NORMAL
 * @option add
 * @value ADD
 * @option multiply
 * @value MULTIPLY
 * @option screen
 * @value SCREEN
 * @default NORMAL

 * @command SetVideoPivot
 * @desc Sets the video pivot
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg pivot
 * @text Pivot
 * @desc Pivot
 * @type select
 * @option Upper left
 * @value 0
 * @option Center
 * @value 0.5
 * @default 0

 * @command MoveVideo
 * @desc Moves the video
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg x
 * @text X
 * @desc X. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0
 *
 * @arg y
 * @text Y
 * @desc Y. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0
 *
 * @arg duration
 * @text Duration
 * @desc Duration in frames. 0 - Immediately. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command ChangeVideoOpacity
 * @desc Changes the video opacity
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg opacity
 * @text Opacity
 * @desc Opacity. Calculated with Javascript.
 * @type combo
 * @option 255
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 255
 *
 * @arg duration
 * @text Duration
 * @desc Duration in frames. 0 - Immediately. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command ChangeVideoScale
 * @desc Changes the video scale
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg x
 * @text X
 * @desc X. Calculated with Javascript.
 * @type combo
 * @option 100
 * @option 50
 * @option 150
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg y
 * @text Y
 * @desc Y. Calculated with Javascript.
 * @type combo
 * @option 100
 * @option 50
 * @option 150
 * @option $gameVariables.value(ID)
 * @default 100
 *
 * @arg duration
 * @text Duration
 * @desc Duration in frames. 0 - Immediately. Calculated with Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command PlayVideo
 * @desc Plays the video (needs to be pre-loaded on layer)
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg loop
 * @text Loop
 * @desc Loop video ?
 * @type boolean
 * @default false
 *
 * @arg wait
 * @text Wait
 * @desc Wait for playing
 * @type boolean
 * @default false

 * @command PauseVideo
 * @desc Pauses the video
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command StopVideo
 * @desc Stops the video
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command StopAllVideo
 * @desc Stops all videos

 * @command ReplaceVideo
 * @desc Replaces the video. The video changes at the end of the previous one.
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg src
 * @text Video source
 * @desc Video source. Without "movies/" and file extension.
 *
 * @arg loop
 * @text Loop
 * @desc Loop video ?
 * @type boolean
 * @default false
 *
 * @arg wait
 * @text Wait
 * @desc Wait for playing
 * @type boolean
 * @default false

 * @command PlaceVideoPlayerBeforePictures
 * @desc Place the video player in front of the images layer

 * @command PlaceVideoPlayerAfterPictures
 * @desc Place video player after images layer

 * @command ResetVideoLayer
 * @desc Reset layer (position, opacity, volume, etc.)
 *
 * @arg layer
 * @text Layer
 * @desc Layer. Calculated with Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @param videoExtension
 * @text Video extension
 * @desc Video extension
 * @type combo
 * @option auto
 * @option .webm
 * @option .mp4
 * @default auto




 * @param Title screen
 * @default ---------------------------------

 * @param titleVideos
 * @text Videos before title screen
 * @parent Title screen
 * @desc Videos before title screen
 * @type struct<TitleVideo>
 * @default {"videos":"[]","okBehavior":"","cancelBehavior":"","playbackRate":"150"}

 * @param titleBackground
 * @text Background video
 * @parent Title screen
 * @desc Background video on title screen
 * @type struct<Video>
 * @default {"src":"","volume":"100","playbackRate":"100"}

 * @param creditsVideos
 * @text Credits videos
 * @parent Title screen
 * @desc Credits videos on title screen
 * @type struct<CreditsVideo>
 * @default {"commandName":"","videos":"[]","okBehavior":"","cancelBehavior":"","playbackRate":"150"}

 * @param Map
 * @default ---------------------------------

 * @param mapMaxLayers
 * @text Maximum layers on the map
 * @parent Map
 * @desc Maximum layers on the map
 * @type number
 * @min 1
 * @default 5

 * @param mapOkBehavior
 * @text "ok" behavior
 * @parent Map
 * @desc Behavior for "ok" (enter, mouse left button, etc.). Only works with looped videos.
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @default

 * @param mapCancelBehavior
 * @text "cancel" behavior
 * @parent Map
 * @desc Behavior for "cancel" (escape, mouse right button, etc.). Only works with looped videos.
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @default

 * @param Menu
 * @default ---------------------------------

 * @param menuBackground
 * @text Menu background
 * @parent Menu
 * @desc Video source of the menu background. Without "movies/" and file extension.

 * @param RPG Maker MV
 * @default ---------------------------------

 * @param useMasterVolume
 * @text Use master volume
 * @parent RPG Maker MV
 * @desc Use master volume for videos
 * @type boolean
 * @default false

*/

/*:ru
 * @plugindesc v.1.2.3 [MV|MZ] Добавляет видео перед титульным экраном, титры, слои на карте и другое.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @orderAfter DK_Game_Time
 * @orderAfter Galv_CustomTitle
 * @help

 ### Информация о плагине ###
 Название: DK_Video_Player
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.2.3
 Релиз: 03.10.2021
 Первый релиз: 17.02.2021

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Совместимость с другими плагинами
 ###=========================================================================
 Чтобы совместимость работала правильно,
 плагины из следующего списка необходимо разместить ВЫШЕ:
 DK_Game_Time.js
 Galv_CustomTitle.js

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Прежде чем вызывать команду плагина PlayVideo, необходимо вызвать команду
 LoadVideo, чтобы загрузить видео на слой!

 ## Использование видео в качестве паралакса карты ##
 В заметках карты пропишите <videoParallax: filename>
 filename - Название видеофайла без расширения
 Пример: <videoParallax: map_parallax_video>

 ###=========================================================================
 ## Команды плагина (RPG Maker MV)
 ###=========================================================================
 1. Загрузить видео на слой: LoadVideo LAYER SRC
 LAYER - Слой. Вычисляется с помощью Javascript.
 SRC - Источник видео. Без "movies/" и расширения файла.
 Пример: LoadVideo 1 dialog1
 Пример: LoadVideo $gameVariables.value(1) dialog1

 2. Установить громкость видео: SetVideoVolume LAYER VOLUME
 LAYER - Слой. Вычисляется с помощью Javascript.
 VOLUME - Громкость. Вычисляется с помощью Javascript.
 Пример: SetVideoVolume 1 100
 Пример: SetVideoVolume $gameVariables.value(1) $gameVariables.value(2)

 3. Установить скорость видео: SetVideoSpeed LAYER SPEED
 LAYER - Слой. Вычисляется с помощью Javascript.
 SPEED - Скорость воспроизведения. Вычисляется с помощью Javascript.
 Пример: SetVideoSpeed 1 150
 Пример: SetVideoSpeed $gameVariables.value(1) $gameVariables.value(2)

 4. Установить режим смешивания видео: SetVideoBlendMode LAYER BLEND_MODE
 LAYER - Слой. Вычисляется с помощью Javascript.
 BLEND_MODE - Режим смешивания (NORMAL, ADD, MULTIPLY, SCREEN)
 Пример: SetVideoBlendMode 1 ADD
 Пример: SetVideoBlendMode $gameVariables.value(1) MULTIPLY

 5. Установить точку привязки видео: SetVideoPivot LAYER PIVOT
 LAYER - Слой. Вычисляется с помощью Javascript.
 PIVOT - Точка привязки (0 - Левый верхний угол, 0.5 - центр)
 Пример: SetVideoPivot 1 0.5
 Пример: SetVideoPivot $gameVariables.value(1) $gameVariables.value(2)

 6. Переместить видео: MoveVideo LAYER X Y DURATION
 LAYER - Слой. Вычисляется с помощью Javascript.
 X - X. Вычисляется с помощью Javascript.
 Y - Y. Вычисляется с помощью Javascript.
 DURATION - Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 Пример: MoveVideo 1 100 100 0
 Пример: MoveVideo $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3) $gameVariables.value(4)

 7. Изменить прозрачность видео: ChangeVideoOpacity LAYER OPACITY DURATION
 LAYER - Слой. Вычисляется с помощью Javascript.
 OPACITY - Прозрачность. Вычисляется с помощью Javascript.
 DURATION - Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 Пример: ChangeVideoOpacity 1 128 60
 Пример: ChangeVideoOpacity $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3)

 8. Изменить масштабирование видео: ChangeVideoScale LAYER X Y DURATION
 LAYER - Слой. Вычисляется с помощью Javascript.
 X - Масштабирование по X. Вычисляется с помощью Javascript.
 Y - Масштабирование по Y. Вычисляется с помощью Javascript.
 DURATION - Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 Пример: ChangeVideoScale 1 50 50 60
 Пример: ChangeVideoScale $gameVariables.value(1) $gameVariables.value(2) $gameVariables.value(3) $gameVariables.value(4)

 9. Воспроизвести видео (требуется предварительно загрузить на слой): PlayVideo LAYER LOOP WAIT
 LAYER - Слой. Вычисляется с помощью Javascript.
 LOOP - Зациклить видео (true, false)
 WAIT - Ждать окончания (true, false)
 Пример: PlayVideo 1 true false
 Пример: PlayVideo $gameVariables.value(1) false true

 10. Поставить видео на паузу: PauseVideo LAYER
 LAYER - Слой. Вычисляется с помощью Javascript.
 Пример: PauseVideo 1
 Пример: PauseVideo $gameVariables.value(1)

 11. Остановить видео: StopVideo LAYER
 LAYER - Слой. Вычисляется с помощью Javascript.
 Пример: StopVideo 1
 Пример: StopVideo $gameVariables.value(1)

 12. Остановить все видео: StopAllVideo

 13. Заменить видео на слое*: ReplaceVideo LAYER SRC LOOP WAIT
 *заметка: Изменение происходит после загрузки нового видео и окончания предыдущего видео.
 LAYER - Слой. Вычисляется с помощью Javascript.
 SRC - Источник видео. Без "movies/" и расширения файла.
 LOOP - Зациклить видео (true, false)
 WAIT - Ждать окончания (true, false)
 Пример: ReplaceVideo 1 dialog1 true false
 Пример: ReplaceVideo $gameVariables.value(1) dialog1 true false

 14. Разместить видео плеер перед слоем изображений: PlaceVideoPlayerBeforePictures

 15. Разместить видео плеер после слоя изображений: PlaceVideoPlayerAfterPictures

 16. Сбросить слой (позиция, прозрачность, громкость и т.д.): ResetVideoLayer LAYER
 LAYER - Слой. Вычисляется с помощью Javascript.
 Пример: ResetVideoLayer 1
 Пример: ResetVideoLayer $gameVariables.value(1)

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Поддержать: https://dk-plugins.ru/donate
 Стать патроном: https://www.patreon.com/dkplugins

 * @command LoadVideo
 * @desc Загрузить видео на слой
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg src
 * @text Источник видео
 * @desc Источник видео. Без "movies/" и расширения файла.

 * @command SetVideoVolume
 * @desc Установить громкость видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg volume
 * @text Громкость
 * @desc Громкость. По умолчанию: 100
 * @default 100

 * @command SetVideoSpeed
 * @desc Установить скорость видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg speed
 * @text Скорость
 * @desc Скорость. По умолчанию: 100
 * @default 100

 * @command SetVideoBlendMode
 * @desc Установить режим смешивания видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg blendMode
 * @text Режим смешивания
 * @desc Режим смешивания
 * @type select
 * @option normal
 * @value NORMAL
 * @option add
 * @value ADD
 * @option multiply
 * @value MULTIPLY
 * @option screen
 * @value SCREEN
 * @default NORMAL

 * @command SetVideoPivot
 * @desc Установить точку привязки видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg pivot
 * @text Точка привязки
 * @desc Точка привязки
 * @type select
 * @option Верхний левый угол
 * @value 0
 * @option Центр
 * @value 0.5
 * @default 0

 * @command MoveVideo
 * @desc Переместить видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg x
 * @text X
 * @desc X. Вычисляется с помощью Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0
 *
 * @arg y
 * @text Y
 * @desc Y. Вычисляется с помощью Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0
 *
 * @arg duration
 * @text Длительность
 * @desc Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command ChangeVideoOpacity
 * @desc Изменить прозрачность видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg opacity
 * @text Прозрачность
 * @desc Прозрачность. Вычисляется с помощью Javascript.
 * @type combo
 * @option 255
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 255
 *
 * @arg duration
 * @text Duration
 * @desc Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command ChangeVideoScale
 * @desc Изменить масштабирование видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg x
 * @text X
 * @desc X. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1.0
 * @option 0.5
 * @option 1.5
 * @option $gameVariables.value(ID)
 * @default 1.0
 *
 * @arg y
 * @text Y
 * @desc Y. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1.0
 * @option 0.5
 * @option 1.5
 * @option $gameVariables.value(ID)
 * @default 1.0
 *
 * @arg duration
 * @text Длительность
 * @desc Длительность в кадрах. 0 - Немедленно. Вычисляется с помощью Javascript.
 * @type combo
 * @option 0
 * @option $gameVariables.value(ID)
 * @default 0

 * @command PlayVideo
 * @desc Воспроизвести видео (требуется предварительно загрузить на слой)
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg loop
 * @text Зациклить
 * @desc Зациклить видео ?
 * @type boolean
 * @default false
 *
 * @arg wait
 * @text Ждать
 * @desc Ждать окончания ?
 * @type boolean
 * @default false

 * @command PauseVideo
 * @desc Поставить видео на паузу
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command StopVideo
 * @desc Остановить видео
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1

 * @command StopAllVideo
 * @desc Остановить все видео

 * @command ReplaceVideo
 * @desc Заменить видео. Видео меняется в конце предыдущего.
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1
 *
 * @arg src
 * @text Источник видео
 * @desc Источник видео. Без "movies/" и расширения файла.
 *
 * @arg loop
 * @text Зациклить
 * @desc Зациклить видео ?
 * @type boolean
 * @default false
 *
 * @arg wait
 * @text Ждать
 * @desc Ждать окончания ?
 * @type boolean
 * @default false

 * @command PlaceVideoPlayerBeforePictures
 * @desc Разместить видео плеер перед слоем изображений

 * @command PlaceVideoPlayerAfterPictures
 * @desc Разместить видео плеер после слоя изображений

 * @command ResetVideoLayer
 * @desc Сбросить слой (позиция, прозрачность, громкость и т.д.)
 *
 * @arg layer
 * @text Слой
 * @desc Слой. Вычисляется с помощью Javascript.
 * @type combo
 * @option 1
 * @option $gameVariables.value(ID)
 * @default 1



 * @param videoExtension
 * @text Расширение видео
 * @desc Расширение видео
 * @type combo
 * @option auto
 * @option .webm
 * @option .mp4
 * @default auto

 * @param Title screen
 * @text Титульный экран
 * @default ---------------------------------

 * @param titleVideos
 * @text Видео перед титульным экраном
 * @parent Title screen
 * @desc Видео перед титульным экраном
 * @type struct<TitleVideo>
 * @default {"videos":"[]","okBehavior":"","cancelBehavior":"","playbackRate":"150"}

 * @param titleBackground
 * @text Задний фон титульного экрана
 * @parent Title screen
 * @desc Задний фон титульного экрана
 * @type struct<Video>
 * @default {"src":"","volume":"100","playbackRate":"100"}

 * @param creditsVideos
 * @text Титры на титульном экране
 * @parent Title screen
 * @desc Титры на титульном экране
 * @type struct<CreditsVideo>
 * @default {"commandName":"","videos":"[]","okBehavior":"","cancelBehavior":"","playbackRate":"150"}

 * @param Map
 * @text Карта
 * @default ---------------------------------

 * @param mapMaxLayers
 * @text Максимальное количество слоев на карте
 * @parent Map
 * @desc Максимальное количество слоев на карте
 * @type number
 * @min 1
 * @default 5

 * @param mapOkBehavior
 * @text "ok" поведение
 * @parent Map
 * @desc Поведение для "ok" (enter, левая кнопка мыши и т.д.). Работает только с зацикленными видео.
 * @type select
 * @option None
 * @value
 * @option Пропустить
 * @value skip
 * @default

 * @param mapCancelBehavior
 * @text "cancel" поведение
 * @parent Map
 * @desc Поведение для "cancel" (escape, правая кнопка мыши и т.д.). Работает только с зацикленными видео.
 * @type select
 * @option None
 * @value
 * @option Пропустить
 * @value skip
 * @default

 * @param Menu
 * @text Меню
 * @default ---------------------------------

 * @param menuBackground
 * @text Задний фон меню
 * @parent Menu
 * @desc Источник видео заднего фона меню. Без "movies/" и расширения файла.

 * @param RPG Maker MV
 * @default ---------------------------------

 * @param useMasterVolume
 * @text Использовать общую громкость
 * @parent RPG Maker MV
 * @desc Использовать общую громкость для всех видео
 * @type boolean
 * @default false

*/

/*~struct~TitleVideo:

 * @param videos
 * @text Videos
 * @desc Videos
 * @type struct<Video>[]
 * @default []

 * @param okBehavior
 * @text "ok" behavior
 * @desc Behavior for "ok" (enter, mouse left button, etc.)
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @option Fast forward
 * @value fastForward
 * @default

 * @param cancelBehavior
 * @text "cancel" behavior
 * @desc Behavior for "cancel" (escape, mouse right button, etc.)
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @option Fast forward
 * @value fastForward
 * @default

 * @param playbackRate
 * @text Playback rate
 * @desc Playback rate. ONLY for behavior="Fast forward".
 * @type number
 * @min 1
 * @default 150

*/

/*~struct~TitleVideo:ru

 * @param videos
 * @text Видео
 * @desc Видео
 * @type struct<Video>[]
 * @default []

 * @param okBehavior
 * @text "ok" поведение
 * @desc Поведение для "ok" (enter, левая кнопка мыши и т.д.)
 * @type select
 * @option Нет
 * @value
 * @option Пропустить
 * @value skip
 * @option Перемотка вперед
 * @value fastForward
 * @default

 * @param cancelBehavior
 * @text "cancel" поведение
 * @desc Поведение для "cancel" (escape, правая кнопка мыши и т.д.)
 * @type select
 * @option Нет
 * @value
 * @option Пропустить
 * @value skip
 * @option Перемотка вперед
 * @value fastForward
 * @default

 * @param playbackRate
 * @text Скорость воспроизведения
 * @desc Скорость воспроизведения. ТОЛЬКо для поведения="Перемотка вперед".
 * @type number
 * @min 1
 * @default 150

*/

/*~struct~CreditsVideo:

 * @param commandName
 * @text Command name
 * @desc Command name. Leave blank to not use.

 * @param videos
 * @text Videos
 * @desc Videos
 * @type struct<Video>[]
 * @default []

 * @param okBehavior
 * @text "ok" behavior
 * @desc Behavior for "ok" (enter, mouse left button, etc.)
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @option Fast forward
 * @value fastForward
 * @default

 * @param cancelBehavior
 * @text "cancel" behavior
 * @desc Behavior for "cancel" (escape, mouse right button, etc.)
 * @type select
 * @option None
 * @value
 * @option Skip
 * @value skip
 * @option Fast forward
 * @value fastForward
 * @default

 * @param playbackRate
 * @text Playback rate
 * @desc Playback rate. ONLY for behavior="Fast forward".
 * @type number
 * @min 1
 * @default 150

*/

/*~struct~CreditsVideo:ru

 * @param commandName
 * @text Название команды
 * @desc Название команды. Оставьте пустым, чтобы не использовать.

 * @param videos
 * @text Видео
 * @desc Видео
 * @type struct<Video>[]
 * @default []

 * @param okBehavior
 * @text "ok" поведение
 * @desc Поведение для "ok" (enter, левая кнопка мыши и т.д.)
 * @type select
 * @option Нет
 * @value
 * @option Пропустить
 * @value skip
 * @option Перемотка вперед
 * @value fastForward
 * @default

 * @param cancelBehavior
 * @text "cancel" поведение
 * @desc Поведение для "cancel" (escape, правая кнопка мыши и т.д.)
 * @type select
 * @option Нет
 * @value
 * @option Пропустить
 * @value skip
 * @option Перемотка вперед
 * @value fastForward
 * @default

 * @param playbackRate
 * @text Скорость воспроизведения
 * @desc Скорость воспроизведения. ТОЛЬКо для поведения="Перемотка вперед".
 * @type number
 * @min 1
 * @default 150

*/

/*~struct~Video:

 * @param src
 * @text Source
 * @desc Video source. Without "movies/" and file extension.

 * @param volume
 * @text Volume
 * @desc Video volume in percentage. 0 - muted. Default: 100.
 * @type number
 * @min 0
 * @default 100

 * @param playbackRate
 * @text Playback rate
 * @desc Playback rate in percentage. Default: 100
 * @type number
 * @number
 * @min 1
 * @default 100

*/

/*~struct~Video:ru

 * @param src
 * @text Источник
 * @desc Источник видео. Без "movies/" и расширения файла.

 * @param volume
 * @text Громкость
 * @desc Громкость видео в процентах. 0 - беззвучно. По умолчанию: 100
 * @type number
 * @min 0
 * @default 100

 * @param playbackRate
 * @text Скорость воспроизведения
 * @desc Скорость воспроизведения в процентах. По умолчанию: 100
 * @type number
 * @number
 * @min 1
 * @default 100

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Video_Player'] = '1.2.3';

//===========================================================================
// initialize parameters
//===========================================================================

const VideoPlayerParams = (function() {

    function parse(string) {
        try {
            return JSON.parse(string, function(key, value) {
                if (typeof string === 'number' || typeof string === 'boolean') {
                    return string;
                }

                try {
                    if (Array.isArray(value)) {
                        return value.map(val => parse(val));
                    }

                    return parse(value);
                } catch (e) {
                    return value;
                }
            });
        } catch(e) {
            return string;
        }
    }

    const parameters = PluginManager.parameters('DK_Video_Player');

    return Object.entries(parameters).reduce((acc, [key, value]) => {
        acc[key] = parse(value);

        return acc;
    }, {});

})();

//===========================================================================
// Game_Interpreter
//===========================================================================

const VideoPlayer_Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    VideoPlayer_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch (command) {
        case 'LoadVideo': {
            VideoManager.loadVideo(eval(args[0]), args[1]);
            break;
        }

        case 'SetVideoVolume': {
            VideoManager.setVideoVolume(eval(args[0]), eval(args[1]));
            break;
        }

        case 'SetVideoSpeed': {
            VideoManager.setVideoSpeed(eval(args[0]), eval(args[1]));
            break;
        }

        case 'SetVideoBlendMode': {
            VideoManager.setVideoBlendMode(eval(args[0]), PIXI.BLEND_MODES[args[1].toUpperCase()]);
            break;
        }

        case 'SetVideoPivot': {
            VideoManager.setVideoPivot(eval(args[0]), eval(args[1]));
            break;
        }

        case 'MoveVideo': {
            VideoManager.moveVideo(
                eval(args[0]),
                new Point(eval(args[1]), eval(args[2])),
                eval(args[3]));
            break;
        }

        case 'ChangeVideoOpacity': {
            VideoManager.changeVideoOpacity(eval(args[0]), eval(args[1]), eval(args[2]));
            break;
        }

        case 'ChangeVideoScale': {
            VideoManager.changeVideoScale(
                eval(args[0]),
                new Point(eval(args[1]) / 100, eval(args[2]) / 100),
                eval(args[3]))
            break;
        }

        case 'PlayVideo': {
            const layer = eval(args[0]);
            const options = {
                loop: args.length > 1 && (args[1].toLowerCase() === 'loop' || JSON.parse(args[1].toLowerCase()))
            };

            VideoManager.playVideo(layer, options);

            if (args.length > 2 && (args[2].toLowerCase() === 'wait' || JSON.parse(args[2].toLowerCase()))) {
                this.setWaitMode('videoPlayer-' + layer);
            }

            break;
        }

        case 'PauseVideo': {
            VideoManager.pauseVideo(eval(args[0]));
            break;
        }

        case 'StopVideo': {
            VideoManager.stopVideo(eval(args[0]));
            break;
        }

        case 'StopAllVideo': {
            VideoManager.stopAllVideo();
            break;
        }

        case 'ReplaceVideo': {
            const layer = eval(args[0]);
            const src = args[1];
            const options = {
                loop: args.length > 2 && (args[2].toLowerCase() === 'loop' || JSON.parse(args[2].toLowerCase()))
            };

            VideoManager.replaceVideo(layer, src, options);

            if (args.length > 3 && (args[3].toLowerCase() === 'wait' || JSON.parse(args[3].toLowerCase()))) {
                this.setWaitMode('videoPlayer-' + layer);
            }

            break;
        }

        case 'PlaceVideoPlayerBeforePictures': {
            const scene = SceneManager._scene;

            if (scene instanceof Scene_Map) {
                scene._spriteset && scene._spriteset.placeVideoPlayerBeforePictures();
            }
            break;
        }

        case 'PlaceVideoPlayerAfterPictures': {
            const scene = SceneManager._scene;

            if (scene instanceof Scene_Map) {
                scene._spriteset && scene._spriteset.placeVideoPlayerAfterPictures();
            }
            break;
        }

        case 'ResetVideoLayer': {
            VideoManager.resetLayer(eval(args[0]));
            break;
        }
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Video_Player', 'LoadVideo', (args) => {
        VideoManager.loadVideo(eval(args.layer), args.src);
    });

    PluginManager.registerCommand('DK_Video_Player', 'SetVideoVolume', (args) => {
        VideoManager.setVideoVolume(eval(args.layer), eval(args.volume));
    });

    PluginManager.registerCommand('DK_Video_Player', 'SetVideoSpeed', (args) => {
        VideoManager.setVideoSpeed(eval(args.layer), eval(args.speed));
    });

    PluginManager.registerCommand('DK_Video_Player', 'SetVideoBlendMode', (args) => {
        VideoManager.setVideoBlendMode(eval(args.layer), PIXI.BLEND_MODES[args.blendMode]);
    });

    PluginManager.registerCommand('DK_Video_Player', 'SetVideoPivot', (args) => {
        VideoManager.setVideoPivot(eval(args.layer), eval(args.pivot));
    });

    PluginManager.registerCommand('DK_Video_Player', 'MoveVideo', (args) => {
        VideoManager.moveVideo(
            eval(args.layer),
            new Point(eval(args.x), eval(args.y)),
            eval(args.duration));
    });

    PluginManager.registerCommand('DK_Video_Player', 'ChangeVideoOpacity', (args) => {
        VideoManager.changeVideoOpacity(
            eval(args.layer),
            eval(args.opacity),
            eval(args.duration));
    });

    PluginManager.registerCommand('DK_Video_Player', 'ChangeVideoScale', (args) => {
        VideoManager.changeVideoScale(
            eval(args.layer),
            new Point(eval(args.x) / 100, eval(args.y) / 100),
            eval(args.duration));
    });

    PluginManager.registerCommand('DK_Video_Player', 'PlayVideo', function(args) {
        const layer = eval(args.layer);
        const options = {
            loop: JSON.parse(args.loop)
        };

        VideoManager.playVideo(layer, options);

        if (JSON.parse(args.wait)) {
            this.setWaitMode('videoPlayer-' + layer);
        }
    });

    PluginManager.registerCommand('DK_Video_Player', 'PauseVideo', (args) => {
        VideoManager.pauseVideo(eval(args.layer));
    });

    PluginManager.registerCommand('DK_Video_Player', 'StopVideo', (args) => {
        VideoManager.stopVideo(eval(args.layer));
    });

    PluginManager.registerCommand('DK_Video_Player', 'StopAllVideo', () => {
        VideoManager.stopAllVideo();
    });

    PluginManager.registerCommand('DK_Video_Player', 'ReplaceVideo', function(args) {
        const layer = eval(args.layer);
        const src = args.src;
        const options = {
            loop: JSON.parse(args.loop)
        };

        VideoManager.replaceVideo(layer, src, options);

        if (JSON.parse(args.wait)) {
            this.setWaitMode('videoPlayer-' + layer);
        }
    });

    PluginManager.registerCommand('DK_Video_Player', 'PlaceVideoPlayerBeforePictures', () => {
        const scene = SceneManager._scene;

        if (scene instanceof Scene_Map) {
            scene._spriteset && scene._spriteset.placeVideoPlayerBeforePictures();
        }
    });

    PluginManager.registerCommand('DK_Video_Player', 'PlaceVideoPlayerAfterPictures', () => {
        const scene = SceneManager._scene;

        if (scene instanceof Scene_Map) {
            scene._spriteset && scene._spriteset.placeVideoPlayerAfterPictures();
        }
    });

    PluginManager.registerCommand('DK_Video_Player', 'ResetVideoLayer', (args) => {
        VideoManager.resetLayer(eval(args.layer));
    });

}

const VideoPlayer_Game_Interpreter_updateWaitMode =
    Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode.startsWith('videoPlayer')) {
        const layer = Number(this._waitMode.split('-').pop());
        const waiting = VideoManager.isPlaying(layer);

        if (!waiting) {
            this._waitMode = '';
        }

        return waiting;
    }

    return VideoPlayer_Game_Interpreter_updateWaitMode.apply(this, arguments);
};

//===========================================================================
// Game_Map
//===========================================================================

Game_Map.prototype.videoParallaxName = function() {
    if (!$dataMap.meta || !$dataMap.meta.videoParallax) {
        return null;
    }

    return $dataMap.meta.videoParallax.trim();
};

Game_Map.prototype.isVideoParallax = function() {
    return !!this.videoParallaxName();
};

//===========================================================================
// VideoManager
//===========================================================================

class VideoManager {

    /**
     * @static
     * @param {String} src
     * @return {String}
     */
    static getFullPath(src) {
        return this.folder + src + this.videoExt();
    }

    /**
     * @static
     * @param {String} src
     * @return {VideoElement}
     */
    static load(src) {
        const fullPath = this.getFullPath(src);

        if (Imported['DKTools']) {
            const file = new DKTools.IO.File(fullPath);

            file._extension = this.videoExt();

            if (!file.exists()) {
                throw new Error(`File does not exist: ${fullPath}`);
            }
        }

        const videoElement = VideoElement.load(fullPath);

        this._loadingQueue.push(videoElement);

        return videoElement;
    }

    /**
     * @static
     * @param {String} src
     * @return {Promise}
     */
    static loadAsync(src) {
        return new Promise((resolve) => {
            const videoElement = this.load(src);

            videoElement.addLoadListener(function() {
                resolve(videoElement);
            });
        });
    }

    /**
     * @static
     * @return {String}
     */
    static videoExt() {
        return VideoPlayerParams.videoExtension !== 'auto' ?
            VideoPlayerParams.videoExtension : Game_Interpreter.prototype.videoFileExt();
    }

    /**
     * @static
     * @return {Boolean}
     */
    static isReady() {
        if (this._loadingQueue.length > 0) {
            this._loadingQueue = this._loadingQueue.filter(el => !el.isReady());

            return this._loadingQueue.length === 0;
        }

        return true;
    }

    /**
     * @static
     * @param {Number} [layer]
     * @return {Boolean}
     */
    static isPlaying(layer) {
        return Boolean(this._videoPlayer && this._videoPlayer.isPlaying(layer))
            || this.isReplacing(layer);
    }

    /**
     * @static
     * @param {Number} [layer]
     * @return {Boolean}
     */
    static isReplacing(layer) {
        return Boolean(this._videoPlayer && this._videoPlayer.isReplacing(layer));
    }

    /**
     * @static
     * @return {Boolean}
     */
    static isBusy() {
        return !this.isReady() || this.isPlaying();
    }

    /**
     * @static
     * @param {Sprite_VideoPlayer} videoPlayer
     */
    static setVideoPlayer(videoPlayer) {
        this._videoPlayer = videoPlayer;
    }

    /**
     * @static
     * @param {Number} layer
     * @param {String} src
     */
    static loadVideo(layer, src) {
        this._videoPlayer && this._videoPlayer.load(layer, src);
    }

    /**
     * @static
     * @param {Number} layer
     * @return {Sprite_Video | null}
     */
    static getVideo(layer) {
        return !!this._videoPlayer ?
            this._videoPlayer.getVideo(layer) : null;
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Number} volume
     */
    static setVideoVolume(layer, volume) {
        this._videoPlayer && this._videoPlayer.setVolume(layer, volume);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Number} blendMode
     */
    static setVideoBlendMode(layer, blendMode) {
        this._videoPlayer && this._videoPlayer.setBlendMode(layer, blendMode);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Number} speed
     */
    static setVideoSpeed(layer, speed) {
        this._videoPlayer && this._videoPlayer.setSpeed(layer, speed);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Number} pivot
     */
    static setVideoPivot(layer, pivot) {
        this._videoPlayer && this._videoPlayer.setPivot(layer, pivot);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Point} pos
     * @param {Number} [duration=0]
     */
    static moveVideo(layer, pos, duration = 0) {
        this._videoPlayer && this._videoPlayer.changePos(layer, pos, duration);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Number} opacity
     * @param {Number} [duration=0]
     */
    static changeVideoOpacity(layer, opacity, duration = 0) {
        this._videoPlayer && this._videoPlayer.changeOpacity(layer, opacity, duration);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Point} scale
     * @param {Number} [duration=0]
     */
    static changeVideoScale(layer, scale, duration = 0) {
        this._videoPlayer && this._videoPlayer.changeScale(layer, scale, duration);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {Object} [options={}]
     */
    static playVideo(layer, options = {}) {
        this._videoPlayer && this._videoPlayer.play(layer, options);
    }

    /**
     * @static
     * @param {Number} layer
     */
    static pauseVideo(layer) {
        this._videoPlayer && this._videoPlayer.pause(layer);
    }

    /**
     * @static
     * @param {Number} layer
     * @param {String} src
     * @param {Object} [options={}]
     */
    static replaceVideo(layer, src, options = {}) {
        this._videoPlayer && this._videoPlayer.replace(layer, src, options);
    }

    /**
     * @static
     * @param {Number} layer
     */
    static resetLayer(layer) {
        this._videoPlayer && this._videoPlayer.resetLayer(layer);
    }

    /**
     * @static
     * @param {Number} layer
     */
    static stopVideo(layer) {
        this._videoPlayer && this._videoPlayer.stop(layer);
    }

    /**
     * @static
     */
    static stopAllVideo() {
        this._videoPlayer && this._videoPlayer.stopAll();
    }

    /**
     * @static
     */
    static update() {
        this._videoPlayer && this._videoPlayer.updateBehavior();
    }

    // static properties

    /**
     * @static
     * @return {String}
     */
    static get folder() {
        return 'movies/';
    }

}

VideoManager._loadingQueue = [];

//===========================================================================
// VideoElement
//===========================================================================

class VideoElement {

    constructor() {
        this.initialize.apply(this, arguments);
    }

    initialize(element) {
        this._video = element;
        this._video.onloadeddata = this._onLoad.bind(this);
        this._video.onended = this._onEnd.bind(this);
        this._endListeners = [];
        this._loadListeners = [];
    }

    // methods

    addLoadListener(listener) {
        if (this.isReady()) {
            listener(this);
        } else {
            this._loadListeners.push(listener);
        }
    }

    addEndListener(listener) {
        this._endListeners.push(listener);
    }

    isReady() {
        return !!this._isReady;
    }

    // private methods

    _onEnd() {
        while (this._endListeners.length > 0) {
            this._endListeners.shift()(this);
        }
    }

    _onLoad() {
        this._isReady = true;

        while (this._loadListeners.length > 0) {
            this._loadListeners.shift()(this);
        }
    }

    // properties

    get video() {
        return this._video;
    }

    get width() {
        return this._video.videoWidth;
    }

    get height() {
        return this._video.videoHeight;
    }

    // static methods

    static _createVideo(src) {
        const video = document.createElement('video');

        video.src = src;
        video.preload = 'auto';
        video.load();

        return video;
    }

    static load(src) {
        return new VideoElement(this._createVideo(src));
    }

}

//===========================================================================
// Sprite_Video
//===========================================================================

class Sprite_Video extends Sprite {

    /**
     * @param {VideoElement} videoElement
     * @param {Object} [options={}]
     */
    initialize(videoElement, options = {}) {
        super.initialize();

        this._options = options;
        this._loop = false;
        this._pendingPlaying = false;
        this._isPlaying = false;
        this._endListeners = [];

        this.setVideoElement(videoElement);
    }

    /**
     * @param {Function} listener
     */
    addEndListener(listener) {
        if (this.isEnded() || !this._videoElement) {
            listener(this);
        } else {
            this._endListeners.push(listener);
        }
    }

    applyOptions() {
        if (this._options.loop) {
            this.loop = true;
        }

        if (this._options.muted) {
            this.muted = true;
        }

        if (Number.isFinite(this._options.volume)) {
            this.volume = this._options.volume;
        }

        if (Number.isFinite(this._options.playbackRate)) {
            this.defaultPlaybackRate = this._options.playbackRate;
            this.playbackRate = this._options.playbackRate;
        }

        if (Number.isFinite(this._options.defaultPlaybackRate)) {
            this.defaultPlaybackRate = this._options.defaultPlaybackRate;
        }
    }

    clearEndListeners() {
        this._endListeners = [];
    }

    destroy() {
        this.destroyVideo();
        PIXI.Sprite.prototype.destroy.call(this,
            { children: true, texture: true, baseTexture: true });
    }

    destroyVideo() {
        if (this._videoElement) {
            this.video.src = '';
        }
    }

    end() {
        if (this._videoElement) {
            this.currentTime = this.duration;
            this.pause();
        }
    }

    isEnded() {
        if (!this._videoElement) {
            return false;
        }

        return this.currentTime >= this.duration && this.isReady();
    }

    isPaused() {
        if (!this._videoElement) {
            return false;
        }

        return this.video.paused;
    }

    isPlaying() {
        return this._isPlaying || this._pendingPlaying;
    }

    isReady() {
        return this._videoElement.isReady();
    }

    /**
     * @return {Promise}
     */
    onEnd() {
        return new Promise((resolve) => {
            this.addEndListener(() => {
                resolve(this);
            });
        });
    }

    /**
     * @param {VideoElement} videoElement
     */
    setVideoElement(videoElement) {
        if (videoElement) {
            this._videoElement = videoElement;
            this._videoElement.addLoadListener(this._onLoad.bind(this));
        } else if (this._videoElement) {
            this.stop();
            this.destroy();
            this._videoElement = null;
        } else {
            this._videoElement = null;
        }
    }

    /**
     * @param {Number} [currentTime=0]
     * @return {Promise}
     */
    play(currentTime = 0) {
        if (!this._videoElement) {
            return Promise.reject();
        }

        this._pendingPlaying = true;

        if (Utils.RPGMAKER_NAME === 'MV' && VideoPlayerParams.useMasterVolume) {
            this.volume = AudioManager.masterVolume * 100;
        }

        return new Promise((resolve) => {
            this._videoElement.addLoadListener(() => {
                this._videoElement.video.currentTime = currentTime;
                this._videoElement.video.play();
                this._pendingPlaying = false;
                this._isPlaying = true;
                resolve(this);
            });
        });
    }

    pause() {
        if (this._videoElement) {
            this.video.pause();
        }

        this._isPlaying = false;
    }

    stop() {
        if (this._videoElement) {
            this.pause();
            this.currentTime = 0;
        }

        this._pendingPlaying = false;
        this._isPlaying = false;
    }

    updateEnd() {
        while (this._endListeners.length > 0) {
            this._endListeners.shift()(this);
        }
    }

    update() {
        super.update();

        if (Utils.RPGMAKER_NAME === 'MV' && this.visible && this.isReady()) {
            this.texture.update();
        }
    };

    // private methods

    _onEnd() {
        this.end();
        this.updateEnd();

        if (this.loop) {
            this.play();
        }
    }

    _onLoad() {
        this.texture = PIXI.Texture.from(this.video);
        this.width = this._videoElement.width;
        this.height = this._videoElement.height;
        this.currentTime = 0;

        this.applyOptions();

        if (this._options.autoplay) {
            this.play();
        } else {
            this.stop();
        }

        this.video.onended = this._onEnd.bind(this);
    }

    // properties

    /**
     * @return {Boolean}
     */
    get autoplay() {
        return (this.video ?
            this.video.autoplay : false);
    }

    set autoplay(value) {
        if (this.video) {
            this.video.autoplay = value;
        }
    }

    /**
     * @return {Number}
     */
    get currentTime() {
        return (this.video ?
            this.video.currentTime : 0);
    }

    set currentTime(value) {
        if (this.video) {
            this.video.currentTime = value;
        }
    }

    /**
     * @return {Number}
     */
    get defaultPlaybackRate() {
        return (this.video ?
            this.video.defaultPlaybackRate * 100 : 100);
    }

    set defaultPlaybackRate(value) {
        if (this.video) {
            this.video.defaultPlaybackRate = value / 100;
        }
    }

    /**
     * @return {Number}
     */
    get duration() {
        return (this.video ?
            this.video.duration : 0);
    }

    /**
     * @return {Boolean}
     */
    get loop() {
        return this._loop;
    }

    set loop(value) {
        this._loop = value;
    }

    /**
     * @return {Boolean}
     */
    get muted() {
        return (this.video ?
            this.video.muted : false);
    }

    set muted(value) {
        if (this.video) {
            this.video.muted = value;
        }
    }

    set options(value) {
        this._options = value;
    }

    /**
     * @return {Number}
     */
    get playbackRate() {
        return (this.video ?
            this.video.playbackRate * 100 : 100);
    }

    set playbackRate(value) {
        if (this.video) {
            this.video.playbackRate = value / 100;
        }
    }

    /**
     * @return {Number}
     */
    get volume() {
        return (this.video ?
            this.video.volume * 100 : 100);
    }

    set volume(value) {
        if (this.video) {
            this.video.volume = value / 100;
        }
    }

    /**
     * @return {HTMLVideoElement}
     */
    get video() {
        return (this._videoElement ?
            this._videoElement.video : null);
    }

    /**
     * @return {VideoElement}
     */
    get videoElement() {
        return this._videoElement;
    }

}

if (Utils.RPGMAKER_NAME === 'MV') {

    Sprite_Video.prototype.show = function() {
        this.visible = true;
    };

    Sprite_Video.prototype.hide = function() {
        this.visible = false;
    };

}

//===========================================================================
// Sprite_VideoPlayer
//===========================================================================

class Sprite_VideoPlayer extends Sprite {

    initialize() {
        super.initialize();

        this._videos = [];
        this._animations = [];
        this._replacements = {};

        this.createLayers();
    }

    createLayers() {
        const maxLayers = VideoPlayerParams.mapMaxLayers || 5;

        for (let i = 0; i < maxLayers; i++) {
            const sprite = new Sprite_Video();

            sprite.hide();

            this._videos[i] = sprite;
            this.addChild(sprite);
        }
    }

    clearAnimations(layer) {
        this._animations = this._animations.filter(
            animation => animation.layer !== layer);
    }

    resetLayer(layer) {
        const sprite = this._videos[layer];

        if (sprite) {
            this.setBlendMode(layer, PIXI.BLEND_MODES.NORMAL);
            this.setPivot(layer, 0);
            this.setSpeed(layer, 100);
            this.setVolume(layer, 100);
            this.changeOpacity(layer, 255, 0);
            this.changePos(layer, new Point(0, 0), 0);
            this.changeScale(layer, new Point(1, 1), 0);
        }
    }

    isPlaying(layer) {
        if (layer >= 0) {
            return this._videos[layer] && this._videos[layer].isPlaying();
        }

        return this._videos.some(sprite => sprite && sprite.isPlaying());
    }

    isReplacing(layer) {
        if (layer >= 0) {
            return !!this._replacements[layer];
        }

        return Object.keys(this._replacements).length > 0;
    }

    getVideo(layer) {
        return this._videos[layer] || null;
    }

    setVolume(layer, value) {
        if (this._videos[layer]) {
            this._videos[layer].volume = value;
        }
    }

    setPivot(layer, value) {
        const sprite = this._videos[layer];

        if (Number.isFinite(value)) {
            sprite && sprite.pivot.set(value, value);
        } else {
            if (Utils.RPGMAKER_NAME === 'MV') {
                sprite && sprite.pivot.copy(value);
            } else {
                sprite && sprite.pivot.copyFrom(value);
            }
        }
    }

    setBlendMode(layer, value) {
        if (this._videos[layer]) {
            this._videos[layer].blendMode = value;
        }
    }

    setSpeed(layer, value) {
        if (this._videos[layer]) {
            this._videos[layer].playbackRate = value;
        }
    }

    changePos(layer, pos, duration = 0) {
        const sprite = this._videos[layer];

        if (!sprite) {
            return;
        }

        if (duration > 0) {
            this.addAnimation(layer, 'move', {
                pos,
                offsetX: (pos.x - sprite.x) / duration,
                offsetY: (pos.y - sprite.y) / duration
            }, duration);
        } else {
            if (Utils.RPGMAKER_NAME === 'MV') {
                sprite.position.copy(pos);
            } else {
                sprite.position.copyFrom(pos);
            }
        }
    }

    changeOpacity(layer, opacity, duration = 0) {
        const sprite = this._videos[layer];

        if (!sprite) {
            return;
        }

        if (duration > 0) {
            this.addAnimation(layer, 'opacity', {
                opacity,
                offsetOpacity: (opacity - sprite.opacity) / duration,
            }, duration);
        } else {
            sprite.opacity = opacity;
        }
    }

    changeScale(layer, scale, duration = 0) {
        const sprite = this._videos[layer];

        if (!sprite) {
            return;
        }

        if (duration > 0) {
            this.addAnimation(layer, 'scale', {
                scale,
                offsetX: (scale.x - sprite.scale.x) / duration,
                offsetY: (scale.y - sprite.scale.y) / duration
            }, duration);
        } else {
            if (Utils.RPGMAKER_NAME === 'MV') {
                sprite.scale.copy(scale);
            } else {
                sprite.scale.copyFrom(scale);
            }
        }
    }

    addAnimation(layer, type, data, duration = 1) {
        this._animations.push({ layer, type, data, duration });
    }

    /**
     * @param {Number} layer
     * @param {String} src
     * @param {Object} [options={}]
     * @return {Sprite_Video}
     */
    load(layer, src, options = {}) {
        const sprite = this._videos[layer];

        if (!sprite) {
            throw new Error(`Video on layer ${layer} can not be played!`);
        }

        this.stop(layer);

        sprite.loop = false;
        sprite.options = options;
        sprite.setVideoElement(VideoManager.load(src));

        return sprite;
    }

    /**
     * @param {Number} layer
     * @param {Object} [options={}]
     */
    play(layer, options = {}) {
        const sprite = this._videos[layer];

        if (!sprite) {
            throw new Error(`Video on layer ${layer} is not loaded!`);
        }

        sprite.loop = false;
        sprite.options = options;

        sprite.play().then(() => {
            sprite.show();
        });

        if (options.loop) {
            sprite.loop = true;
        }

        delete this._replacements[layer];
    }

    /**
     * @param {Number} layer
     */
    pause(layer) {
        this._videos[layer] && this._videos[layer].pause();
    }

    /**
     * @param {Number} layer
     * @param {String} src
     * @param {Object} [options={}]
     */
    replace(layer, src, options = {}) {
        const sprite = this._videos[layer];

        if (!sprite) {
            return;
        }

        this._replacements[layer] = true;

        const loadPromise = VideoManager.loadAsync(src);
        const endPromise = sprite.isPlaying() ?
            sprite.onEnd() : Promise.resolve(sprite);

        Promise.all([loadPromise, endPromise]).then(([videoElement]) => {
            const sprite = this._videos[layer];

            this.stop(layer, false);

            sprite.setVideoElement(videoElement);

            this.play(layer, options);
        });
    }

    /**
     * @param {Number} layer
     * @param {Boolean} [resetLayer=true]
     */
    stop(layer, resetLayer = true) {
        const sprite = this._videos[layer];

        if (sprite) {
            if (resetLayer) {
                this.resetLayer(layer);
            }

            sprite.hide();
            sprite.clearEndListeners();
            sprite.stop();
            sprite.destroyVideo();

            this.clearAnimations(layer);
        }

        delete this._replacements[layer];
    }

    stopAll() {
        for (let i = 0; i < this._videos.length; i++) {
            this.stop(i);
        }
    }

    // update methods

    updateBehavior() {
        const okBehavior = VideoPlayerParams.mapOkBehavior;
        const cancelBehavior = VideoPlayerParams.mapCancelBehavior;
        const skipVideo = okBehavior === 'skip' && (Input.isTriggered('ok') || TouchInput.isTriggered())
            || cancelBehavior === 'skip' && (Input.isTriggered('cancel') || TouchInput.isCancelled());

        if (skipVideo) {
            this._videos.forEach((video, layer) => {
                if (!!video && video.loop && video.isPlaying()) {
                    this.stop(layer);
                }
            });
        }
    }

    updateAnimation(animation) {
        const sprite = this._videos[animation.layer];
        const data = animation.data;

        switch (animation.type) {
            case 'move': {
                if (animation.duration > 0) {
                    sprite.x += data.offsetX;
                    sprite.y += data.offsetY;
                } else {
                    if (Utils.RPGMAKER_NAME === 'MV') {
                        sprite.position.copy(data.pos);
                    } else {
                        sprite.position.copyFrom(data.pos);
                    }
                }
                break;
            }
            case 'opacity': {
                if (animation.duration > 0) {
                    sprite.opacity += data.offsetOpacity;
                } else {
                    sprite.opacity = data.opacity;
                }
                break;
            }
            case 'scale': {
                if (animation.duration > 0) {
                    sprite.scale.x += data.offsetX;
                    sprite.scale.y += data.offsetY;
                } else {
                    if (Utils.RPGMAKER_NAME === 'MV') {
                        sprite.scale.copy(data.scale);
                    } else {
                        sprite.scale.copyFrom(data.scale);
                    }
                }
                break;
            }
        }
    }

    updateAnimations() {
        this._animations = this._animations.filter(a => a.duration > 0 && !!this._videos[a.layer]);
        this._animations.forEach((animation) => {
            animation.duration--;
            this.updateAnimation(animation);
        });
    }

    update() {
        this.visible = this.children.length > 0;

        if (this.visible) {
            super.update();
            this.updateAnimations();
        }
    }

}

if (Utils.RPGMAKER_NAME === 'MV') {

    Sprite_VideoPlayer.prototype.show = function() {
        this.visible = true;
    };

    Sprite_VideoPlayer.prototype.hide = function() {
        this.visible = false;
    };

}

//===========================================================================
// SceneManager
//===========================================================================

const VideoPlayer_SceneManager_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
    if (sceneClass === Scene_Title && !Scene_TitleVideo.showed) {
        sceneClass = Scene_TitleVideo;
    }

    VideoPlayer_SceneManager_goto.call(this, sceneClass);
};

//===========================================================================
// Spriteset_Map
//===========================================================================

const VideoPlayer_Spriteset_Map_createUpperLayer =
    Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
    VideoPlayer_Spriteset_Map_createUpperLayer.apply(this, arguments);
    this.createVideoPlayer();
};

Spriteset_Map.prototype.createVideoPlayer = function() {
    this._videoPlayer = new Sprite_VideoPlayer();

    VideoManager.setVideoPlayer(this._videoPlayer);

    this.placeVideoPlayerBeforePictures();
};

Spriteset_Map.prototype.placeVideoPlayerBeforePictures = function() {
    this.addChildAt(this._videoPlayer, this.children.indexOf(this._pictureContainer));
};

Spriteset_Map.prototype.placeVideoPlayerAfterPictures = function() {
    this.addChildAt(this._videoPlayer, this.children.indexOf(this._pictureContainer) + 1);
};

const VideoPlayer_Spriteset_Map_createParallax =
    Spriteset_Map.prototype.createParallax;
Spriteset_Map.prototype.createParallax = function() {
    const videoParallax = $gameMap.videoParallaxName();

    if (videoParallax) {
        this._parallax = new Sprite_Video();
        this._parallax.setVideoElement(VideoManager.load(videoParallax));
        this._parallax.loop = true;
        this._parallax.muted = true;
        this._parallax.play();
        this._baseSprite.addChild(this._parallax);
    } else {
        VideoPlayer_Spriteset_Map_createParallax.apply(this, arguments);
    }
};

const VideoPlayer_Spriteset_Map_updateParallax =
    Spriteset_Map.prototype.updateParallax;
Spriteset_Map.prototype.updateParallax = function() {
    if (!$gameMap.isVideoParallax()) {
        VideoPlayer_Spriteset_Map_updateParallax.apply(this, arguments);
    }
};

//===========================================================================
// Scene_Base
//===========================================================================

const VideoPlayer_Scene_Base_isReady =
    Scene_Base.prototype.isReady;
Scene_Base.prototype.isReady = function() {
    return VideoPlayer_Scene_Base_isReady.apply(this, arguments)
        && VideoManager.isReady();
};

//===========================================================================
// Scene_TitleVideo
//===========================================================================

const VideoPlayer_Scene_Title_createBackground =
    Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
    VideoPlayer_Scene_Title_createBackground.apply(this, arguments);

    const params = VideoPlayerParams.titleBackground;

    if (params && params.src) {
        this._videoSprite = new Sprite_Video(VideoManager.load(params.src), {
            playbackRate: params.playbackRate,
            volume: params.volume,
            loop: true
        });
        this._videoSprite.play();

		if (this._backSprite1 && this._backSprite1.parent) {
			this._backSprite1.parent.removeChild(this._backSprite1);
		}

        if (this._backSprite2 && this._backSprite2.parent) {
			this._backSprite2.parent.removeChild(this._backSprite2);
		}

		if (Imported['Galv_CustomTitle']) {
			this._sLayer.addChildAt(this._videoSprite, 0);
		} else {
			this.addChild(this._videoSprite);
		}
    }
};

//===========================================================================
// Scene_Map
//===========================================================================

const VideoPlayer_Scene_Map_isMenuEnabled =
    Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
    return VideoPlayer_Scene_Map_isMenuEnabled.apply(this, arguments)
        && !VideoManager.isPlaying();
};

const VideoPlayer_Scene_Map_terminate =
    Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    VideoPlayer_Scene_Map_terminate.apply(this, arguments);
    VideoManager.setVideoPlayer(null);
};

const VideoPlayer_Scene_Map_update =
    Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    VideoPlayer_Scene_Map_update.apply(this, arguments);
    VideoManager.update();
};

//===========================================================================
// Scene_Menu
//===========================================================================

const VideoPlayer_Scene_Menu_createBackground =
    Scene_Menu.prototype.createBackground;
Scene_Menu.prototype.createBackground = function() {
    if (VideoPlayerParams.menuBackground) {
        let index = this.children.length;

        if (this._backgroundSprite) {
            index = this.children.indexOf(this._backgroundSprite);

            this.removeChild(this._backgroundSprite);
        }

        this._videoBackgroundSprite = new Sprite_Video(
            VideoManager.load(VideoPlayerParams.menuBackground));
        this._videoBackgroundSprite.loop = true;
        this._videoBackgroundSprite.play();

        this.addChildAt(this._videoBackgroundSprite, index);
    } else {
        VideoPlayer_Scene_Menu_createBackground.apply(this, arguments);
    }
};

//===========================================================================
// Scene_VideoPlayer
//===========================================================================

class Scene_VideoPlayer extends Scene_Base {

    create() {
        this.createVideoSprites();
    }

    createVideoSprites() {
        this._videoSprites = this.videos.map((data) => {
            const videoElement = VideoManager.load(data.src);
            const sprite = new Sprite_Video(videoElement);

            sprite.hide();
            sprite.addEndListener(this.onVideoEnd.bind(this));

            if (data.muted) {
                sprite.muted = true;
            }

            if (data.playbackRate) {
                sprite.defaultPlaybackRate = data.playbackRate;
                sprite.playbackRate = data.playbackRate;
            }

            if (Number.isFinite(data.volume)) {
                sprite.volume = data.volume;
            }

            this.addChild(sprite);

            return sprite;
        });
    }

    onVideoEnd() {
        this.stopVideo();
        this.playNextVideo();

        if (!this._videoSprite) {
            this.popScene();
        }
    }

    stopVideo() {
        if (this._videoSprite) {
            this._videoSprite.stop();
            this._videoSprite.destroy();
        }
    }

    playNextVideo() {
        this._videoSprite = this._videoSprites.shift() || null;

        if (this._videoSprite) {
            this._videoSprite.play();
            this._videoSprite.show();
        }
    }

    start() {
        super.start();
        this.playNextVideo();
    }

    updateBehavior() {
        const okBehavior = this.okBehavior;
        const cancelBehavior = this.cancelBehavior;
        const skipVideo = okBehavior === 'skip' && (Input.isTriggered('ok') || TouchInput.isTriggered())
            || cancelBehavior === 'skip' && (Input.isTriggered('cancel') || TouchInput.isCancelled());

        if (skipVideo) {
            this.onVideoEnd();
            return;
        }

        const fastForward = okBehavior === 'fastForward' && (Input.isPressed('ok') || TouchInput.isPressed())
            || cancelBehavior === 'fastForward' && (Input.isPressed('cancel') || TouchInput.isPressed());

        if (fastForward) {
            this._videoSprite.playbackRate = this.fastForwardPlaybackRate;
        } else {
            this._videoSprite.playbackRate = this._videoSprite.defaultPlaybackRate;
        }
    }

    update() {
        super.update();

        if (this._videoSprite) {
            this.updateBehavior();
        }
    }

    // properties

    get videos() {
        return [];
    }

    get okBehavior() {
        return null;
    }

    get cancelBehavior() {
        return null;
    }

    get fastForwardPlaybackRate() {
        return 100;
    }

}

//===========================================================================
// Scene_TitleVideo
//===========================================================================

class Scene_TitleVideo extends Scene_VideoPlayer {

    popScene() {
        Scene_TitleVideo.showed = true;
        SceneManager.goto(Scene_Title);
    }

    // properties

    get videos() {
        return VideoPlayerParams.titleVideos.videos;
    }

    get okBehavior() {
        return VideoPlayerParams.titleVideos.okBehavior;
    }

    get cancelBehavior() {
        return VideoPlayerParams.titleVideos.cancelBehavior;
    }

    get fastForwardPlaybackRate() {
        return VideoPlayerParams.titleVideos.playbackRate;
    }

}

Scene_TitleVideo.showed = VideoPlayerParams.titleVideos.videos.length === 0;

if (Imported['DKTools'] && DKToolsParam.get('Quick Start', 'Enabled')) {

    Scene_TitleVideo.showed = true;

}

//===========================================================================
// Scene_CreditsVideo
//===========================================================================

class Scene_CreditsVideo extends Scene_VideoPlayer {

    // properties

    get videos() {
        return VideoPlayerParams.creditsVideos.videos;
    }

    get okBehavior() {
        return VideoPlayerParams.creditsVideos.okBehavior;
    }

    get cancelBehavior() {
        return VideoPlayerParams.creditsVideos.cancelBehavior;
    }

    get fastForwardPlaybackRate() {
        return VideoPlayerParams.creditsVideos.playbackRate;
    }

}

//===========================================================================
// Credits command
//===========================================================================

if (VideoPlayerParams.creditsVideos.commandName) {

    //===========================================================================
    // Scene_Title
    //===========================================================================

    const VideoPlayer_Scene_Title_createCommandWindow =
        Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        VideoPlayer_Scene_Title_createCommandWindow.apply(this, arguments);

        if (this._commandWindow) {
            this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
        }
    };

    Scene_Title.prototype.commandCredits = function() {
        this._commandWindow && this._commandWindow.close();
        SceneManager.push(Scene_CreditsVideo);
    };

    //===========================================================================
    // Window_TitleCommand
    //===========================================================================

    const VideoPlayer_Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        VideoPlayer_Window_TitleCommand_makeCommandList.apply(this, arguments);
        this.addCommand(VideoPlayerParams.creditsVideos.commandName, 'credits');
    };

}

//===========================================================================
// Compatibility with other plugins
//===========================================================================

if (Imported['DK_Game_Time']) {

    const VideoPlayer_Game_System_isGameTimeWindowVisible =
        Game_System.prototype.isGameTimeWindowVisible;
    Game_System.prototype.isGameTimeWindowVisible = function() {
        return VideoPlayer_Game_System_isGameTimeWindowVisible.apply(this, arguments)
            && !VideoManager.isBusy();
    };

}
