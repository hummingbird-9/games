/*
taken from https://www.myinstants.com/en/trending/us/

(() => {
  return Array.from(document.querySelectorAll("#instants_container .instant")).map(el => ({
    name: el.querySelector(".instant-link")?.textContent.trim(),
    color: el.querySelector(".circle")?.style.backgroundColor,
    mp3: el.querySelector("button[onclick^='play']")?.getAttribute("onclick")?.match(/'([^']+\.mp3)'/)?.[1]
  }));
})()
*/
export const sounds =
    // SPLITTER ---------------
[
  {
    "name": "FAHHHHHHHHHHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fahhhhhhhhhhhhhh.mp3"
  },
  {
    "name": "VINE BOOM SOUND",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-boom.mp3"
  },
  {
    "name": "FAAAH",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/faaah.mp3"
  },
  {
    "name": "Fart",
    "color": "rgb(102, 51, 0)",
    "mp3": "/media/sounds/dry-fart.mp3"
  },
  {
    "name": "rizz sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rizz-sound-effect.mp3"
  },
  {
    "name": "Du bist gut genug",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/du-bist-gut-genug.mp3"
  },
  {
    "name": "Anime Wow",
    "color": "rgb(255, 51, 102)",
    "mp3": "/media/sounds/anime-wow-sound-effect.mp3"
  },
  {
    "name": "Among Us role reveal sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/among-us-role-reveal-sound.mp3"
  },
  {
    "name": "Apple Pay",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/applepay.mp3"
  },
  {
    "name": "Chicken on tree screaming",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chicken-on-tree-screaming.mp3"
  },
  {
    "name": "Bone Crack",
    "color": "rgb(255, 255, 160)",
    "mp3": "/media/sounds/bone-crack.mp3"
  },
  {
    "name": "SpongeBob Fail",
    "color": "rgb(202, 195, 26)",
    "mp3": "/media/sounds/spongebob-fail.mp3"
  },
  {
    "name": "Fahhh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fahhh_KcgAXfs.mp3"
  },
  {
    "name": "Fart Button",
    "color": "rgb(51, 153, 0)",
    "mp3": "/media/sounds/perfect-fart.mp3"
  },
  {
    "name": "Dexter meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dexter-meme.mp3"
  },
  {
    "name": "spiderman meme song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spiderman-meme-song.mp3"
  },
  {
    "name": "bark&fart",
    "color": "rgb(131, 108, 56)",
    "mp3": "/media/sounds/bark-fart_XRsy1HE.mp3"
  },
  {
    "name": "BRUH",
    "color": "rgb(255, 255, 51)",
    "mp3": "/media/sounds/movie_1.mp3"
  },
  {
    "name": "( ͠° ͟ʖ ͡°) sussy?",
    "color": "rgb(24, 12, 255)",
    "mp3": "/media/sounds/deg-deg-sussy.mp3"
  },
  {
    "name": "What a good boy",
    "color": "rgb(245, 110, 255)",
    "mp3": "/media/sounds/what-a-good-boy.mp3"
  },
  {
    "name": "Error SOUNDSS",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/error_CDOxCYm.mp3"
  },
  {
    "name": "romanceeeeeeeeeeeeee",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/romanceeeeeeeeeeeeee.mp3"
  },
  {
    "name": "Metal pipe clang",
    "color": "rgb(92, 92, 92)",
    "mp3": "/media/sounds/metal-pipe-clang.mp3"
  },
  {
    "name": "anime ahh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/anime-ahh.mp3"
  },
  {
    "name": "I've Got This FAAAAAAAAAHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ive-got-this-faaaaaaaaahhhhh.mp3"
  },
  {
    "name": "Michael Jackson Hee Hee",
    "color": "rgb(160, 0, 0)",
    "mp3": "/media/sounds/michael-jackson-hee-hee.mp3"
  },
  {
    "name": "Sad Violin (the meme one)",
    "color": "rgb(0, 255, 51)",
    "mp3": "/media/sounds/tf_nemesis.mp3"
  },
  {
    "name": "dun dun dunnnnnnnn",
    "color": "rgb(255, 44, 44)",
    "mp3": "/media/sounds/dun-dun-dun-sound-effect-brass_8nFBccR.mp3"
  },
  {
    "name": "The Undertaker Bell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/undertakers-bell_2UwFCIe.mp3"
  },
  {
    "name": "ding sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ding-sound-effect_2.mp3"
  },
  {
    "name": "Weird route jingle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/weird-route-jingle.mp3"
  },
  {
    "name": "Hub Intro Sound",
    "color": "rgb(255, 150, 30)",
    "mp3": "/media/sounds/hub-intro-sound.mp3"
  },
  {
    "name": "rip my granny loud asf",
    "color": "rgb(195, 233, 255)",
    "mp3": "/media/sounds/rip-my-granny-loud-asf.mp3"
  },
  {
    "name": "Tuco: GET OUT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tuco-get-out.mp3"
  },
  {
    "name": "M e o w ~",
    "color": "rgb(120, 85, 120)",
    "mp3": "/media/sounds/m-e-o-w.mp3"
  },
  {
    "name": "Discord Notification",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discord-notification.mp3"
  },
  {
    "name": "Punch Sound",
    "color": "rgb(42, 141, 255)",
    "mp3": "/media/sounds/punch-gaming-sound-effect-hd_RzlG1GE.mp3"
  },
  {
    "name": "Taco Bell Bong",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/taco-bell-bong-sfx.mp3"
  },
  {
    "name": "baby laughing meme",
    "color": "rgb(0, 233, 255)",
    "mp3": "/media/sounds/baby-laughing-meme.mp3"
  },
  {
    "name": "Tiki tiki boosted",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/tiki-tiki-boosted.mp3"
  },
  {
    "name": "ENRIQUE!",
    "color": "rgb(45, 129, 255)",
    "mp3": "/media/sounds/enrique.mp3"
  },
  {
    "name": "Death sound (Fortnite)",
    "color": "rgb(255, 0, 142)",
    "mp3": "/media/sounds/tmp_7901-951678082.mp3"
  },
  {
    "name": "Shocked sound",
    "color": "rgb(255, 238, 135)",
    "mp3": "/media/sounds/shocked-sound-effect.mp3"
  },
  {
    "name": "oh my god bro oh hell nah man",
    "color": "rgb(7, 255, 6)",
    "mp3": "/media/sounds/oh-my-god-bro-oh-hell-nah-man.mp3"
  },
  {
    "name": "Prowler Sound Effect",
    "color": "rgb(101, 32, 124)",
    "mp3": "/media/sounds/prowler-sound-effect_6bXErot.mp3"
  },
  {
    "name": "Buzzer",
    "color": "rgb(204, 0, 153)",
    "mp3": "/media/sounds/wrong-answer-sound-effect.mp3"
  },
  {
    "name": "Galaxy meme",
    "color": "rgb(25, 75, 255)",
    "mp3": "/media/sounds/galaxy-meme.mp3"
  },
  {
    "name": "indian song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/indian-song.mp3"
  },
  {
    "name": "Deltarune - JARONA",
    "color": "rgb(224, 203, 124)",
    "mp3": "/media/sounds/deltarune-jarona.mp3"
  },
  {
    "name": "cat laugh meme 1",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cat-laugh-meme-1.mp3"
  },
  {
    "name": "Long brain fart",
    "color": "rgb(0, 127, 255)",
    "mp3": "/media/sounds/long-brain-fart.mp3"
  },
  {
    "name": "Звук фотоаппарата",
    "color": "rgb(225, 163, 255)",
    "mp3": "/media/sounds/zvuk-fotoapparata.mp3"
  },
  {
    "name": "daddys home",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/daddys-home.mp3"
  },
  {
    "name": "YIPPEEEEEEEEEEEEEE",
    "color": "rgb(40, 137, 255)",
    "mp3": "/media/sounds/yippeeeeeeeeeeeeee.mp3"
  },
  {
    "name": "ACK",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/ack.mp3"
  },
  {
    "name": "fart with reverb",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fart-with-reverb.mp3"
  },
  {
    "name": "MLG AIR HORN!!!!!!!!!!!",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/mlg-airhorn.mp3"
  },
  {
    "name": "GunShottttt",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gunshotjbudden.mp3"
  },
  {
    "name": "Fears to Fathom Notification Sound",
    "color": "rgb(10, 59, 51)",
    "mp3": "/media/sounds/fears-to-fathom-notification-sound.mp3"
  },
  {
    "name": "Smoke Detector Beep",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/smoke-detector-beep.mp3"
  },
  {
    "name": "YAAAAAAAAY",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/kids-saying-yay-sound-effect_3.mp3"
  },
  {
    "name": "a few moments later sponge bob sfx fun",
    "color": "rgb(6, 255, 39)",
    "mp3": "/media/sounds/a-few-moments-later-sponge-bob-sfx-fun.mp3"
  },
  {
    "name": "Censor Beep 1",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/censor-beep-1.mp3"
  },
  {
    "name": "nuclear diarrhea",
    "color": "rgb(109, 58, 10)",
    "mp3": "/media/sounds/nuclear-diarrhea.mp3"
  },
  {
    "name": "heavenly musiic",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/heavenly-music-gaming-sound-effect-hd-mp3cut.mp3"
  },
  {
    "name": "yes!(lara voice)",
    "color": "rgb(41, 255, 16)",
    "mp3": "/media/sounds/yes-lara-voice.mp3"
  },
  {
    "name": "Verity Edit",
    "color": "rgb(250, 255, 0)",
    "mp3": "/media/sounds/verity-edit.mp3"
  },
  {
    "name": "instagram thud",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-boom-sound-effect_KT89XIq.mp3"
  },
  {
    "name": "-999 Social Credit Siren",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/999-social-credit-siren.mp3"
  },
  {
    "name": "shut up mom",
    "color": "rgb(213, 181, 255)",
    "mp3": "/media/sounds/shut-up-mom.mp3"
  },
  {
    "name": "sad meow song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sad-meow-song.mp3"
  },
  {
    "name": "Fart Meme Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fart-meme-sound.mp3"
  },
  {
    "name": "HAha funny laugh",
    "color": "rgb(70, 255, 24)",
    "mp3": "/media/sounds/ny-video-online-audio-converter.mp3"
  },
  {
    "name": "Awkward cricket",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/awkward-cricket-sound-effect.mp3"
  },
  {
    "name": "Correct Answer GameShow",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/correct.mp3"
  },
  {
    "name": "Oh My God Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-my-god-meme.mp3"
  },
  {
    "name": "outro song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/outro-song_oqu8zAg.mp3"
  },
  {
    "name": "Emotional Damage Meme",
    "color": "rgb(229, 0, 0)",
    "mp3": "/media/sounds/emotional-damage-meme.mp3"
  },
  {
    "name": "We are Charlie Kirk phone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/we-are-charlie-kirk-phone.mp3"
  },
  {
    "name": "Homer let's the Barts out",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/homer-lets-the-barts-out.mp3"
  },
  {
    "name": "67",
    "color": "rgb(199, 255, 30)",
    "mp3": "/media/sounds/67_SQlv2Xv.mp3"
  },
  {
    "name": "ROBLOX oof",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-death-sound_1.mp3"
  },
  {
    "name": "lack of a father figure?",
    "color": "rgb(211, 16, 255)",
    "mp3": "/media/sounds/lack-of-a-father-figure.mp3"
  },
  {
    "name": "Door Knocking SOUND EFFECT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/crazy-realistic-knocking-sound-troll-twitch-streamers_small.mp3"
  },
  {
    "name": "Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/are-you-out-of-your-mind-greenscreen-change-quality-and-end-wont-cut-off_2.mp3"
  },
  {
    "name": "goku drip",
    "color": "rgb(182, 255, 56)",
    "mp3": "/media/sounds/drip-goku-meme-song-original-dragon-ball-super-music-clash-of-gods-in-description.mp3"
  },
  {
    "name": "Verity greeting",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/verity-greeting.mp3"
  },
  {
    "name": "*Snore* mimimimimimi",
    "color": "rgb(173, 255, 255)",
    "mp3": "/media/sounds/snore-mimimimimimi.mp3"
  },
  {
    "name": "Dog Clicker",
    "color": "rgb(53, 7, 255)",
    "mp3": "/media/sounds/dog-clicker_IygBqAk.mp3"
  },
  {
    "name": "GopGopGop",
    "color": "rgb(255, 250, 206)",
    "mp3": "/media/sounds/gopgopgop.mp3"
  },
  {
    "name": "The Saxophones Getting Louder",
    "color": "rgb(62, 0, 0)",
    "mp3": "/media/sounds/the-saxophones-getting-louder.mp3"
  },
  {
    "name": "Aww",
    "color": "rgb(255, 0, 153)",
    "mp3": "/media/sounds/studio-audience-awwww-sound-fx.mp3"
  },
  {
    "name": "AAAAAAAAAAAAAAAAAAAA é lutador",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-e-lutador.mp3"
  },
  {
    "name": "Mario Jump",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/maro-jump-sound-effect_1.mp3"
  },
  {
    "name": "FAHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fahhhhh.mp3"
  },
  {
    "name": "RUN vine",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/run-vine-sound-effect.mp3"
  },
  {
    "name": "Huh? Ceeday",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ceeday-huh-sound-effect.mp3"
  },
  {
    "name": "Metal Gear Solid Alert",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tindeck_1.mp3"
  },
  {
    "name": "Core Sound Effect",
    "color": "rgb(105, 0, 0)",
    "mp3": "/media/sounds/core-sound-effect.mp3"
  },
  {
    "name": "running sound",
    "color": "rgb(93, 255, 202)",
    "mp3": "/media/sounds/1-108.mp3"
  },
  {
    "name": "yeah boiii i i i",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yeah-boiii-i-i-i.mp3"
  },
  {
    "name": "Pop SFX",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pop_7e9Is8L.mp3"
  },
  {
    "name": "Pluh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pluh.mp3"
  },
  {
    "name": "my mommy said no more skibidi toilet",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/my-mommy-said-no-more-skibidi-toilet.mp3"
  },
  {
    "name": "Whip",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/crack_the_whip.mp3"
  },
  {
    "name": "BRUH sound effect!",
    "color": "rgb(49, 255, 6)",
    "mp3": "/media/sounds/bruh-sound-effect_WstdzdM.mp3"
  },
  {
    "name": "Camera Flash Sound Effect",
    "color": "rgb(255, 132, 224)",
    "mp3": "/media/sounds/camera-flash-sound-effect.mp3"
  },
  {
    "name": "Jogo do botão",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/psycho-scream-soundbible.mp3"
  },
  {
    "name": "Womp Womp Womp",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/downer_noise.mp3"
  },
  {
    "name": "discord call",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discord-call-sound.mp3"
  },
  {
    "name": "asian meme huh?",
    "color": "rgb(186, 255, 255)",
    "mp3": "/media/sounds/huh_37bAoRo.mp3"
  },
  {
    "name": "gah dayum",
    "color": "rgb(6, 0, 107)",
    "mp3": "/media/sounds/gah-dayum.mp3"
  },
  {
    "name": "slap hard",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/slap-soundmaster13-49669815_4L20wGP.mp3"
  },
  {
    "name": "PUMP SHOTGUN FORTNITE LOUD",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pump-shotgun-fortnite-loud.mp3"
  },
  {
    "name": "danger alarm sound effect meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/danger-alarm-sound-effect-meme.mp3"
  },
  {
    "name": "Lagging/loading",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/loading-lost-connection-green-screen-with-sound-effect-2_K8HORkT.mp3"
  },
  {
    "name": "Mouse Click Sound",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/mouse-click-sound.mp3"
  },
  {
    "name": "Elevator Music Background",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/musica-elevador-short.mp3"
  },
  {
    "name": "Discord Leave Noise",
    "color": "rgb(102, 0, 255)",
    "mp3": "/media/sounds/discord-leave-noise.mp3"
  },
  {
    "name": "Mac Quack",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mac-quack.mp3"
  },
  {
    "name": "'What' Bottom Text Meme (Sanctuary Guardian) - S",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-bottom-text-meme-sanctuary-guardian-sound-effect-hd.mp3"
  },
  {
    "name": "Explosion meme",
    "color": "rgb(255, 201, 52)",
    "mp3": "/media/sounds/explosion-meme_dTCfAHs.mp3"
  },
  {
    "name": "Daddyy Chill",
    "color": "rgb(255, 138, 239)",
    "mp3": "/media/sounds/daddyy-chill.mp3"
  },
  {
    "name": "LIZARD BUTTON",
    "color": "rgb(127, 168, 255)",
    "mp3": "/media/sounds/lizard-button.mp3"
  },
  {
    "name": "jixaw metal pipe falling sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jixaw-metal-pipe-falling-sound.mp3"
  },
  {
    "name": "iPhone Notification",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/notification_o14egLP.mp3"
  },
  {
    "name": "lego breaking",
    "color": "rgb(255, 245, 0)",
    "mp3": "/media/sounds/lego-breaking.mp3"
  },
  {
    "name": "Rehehehe",
    "color": "rgb(108, 255, 150)",
    "mp3": "/media/sounds/rehehehe.mp3"
  },
  {
    "name": "You are an idiot!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/you-are-an-idiot.mp3"
  },
  {
    "name": "na na na",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/funny-sound-that-will-make-you-to-laugh_1.mp3"
  },
  {
    "name": "Fart Meme Sound (Better and louder)",
    "color": "rgb(146, 93, 52)",
    "mp3": "/media/sounds/fartmeme.mp3"
  },
  {
    "name": "Popular Riser metallic sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/popular-riser-metallic-sound-effect.mp3"
  },
  {
    "name": "what da dog doin",
    "color": "rgb(113, 105, 255)",
    "mp3": "/media/sounds/yt1s_wU4BGgD.mp3"
  },
  {
    "name": "Lobotomy Sound Effect",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/lobotomy-sound-effect.mp3"
  },
  {
    "name": "Spiderman Polyester Edit",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spiderman-polyester-edit.mp3"
  },
  {
    "name": "Wrong Answer Buzzer",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wrong-answer-buzzer.mp3"
  },
  {
    "name": "Oh Brother, This Guy Stinks!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-brother-this-guy-stinks.mp3"
  },
  {
    "name": "Meme final",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/meme-de-creditos-finales.mp3"
  },
  {
    "name": "Amongus Sus",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/53b1bab6-a8c3-4a1a-82db-7110ce1c29ef_6KNDGWD.mp3"
  },
  {
    "name": "the weeknd rizzz",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-weeknd-rizzz.mp3"
  },
  {
    "name": "aww so cute ishowspeed",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aww-so-cute-ishowspeed.mp3"
  },
  {
    "name": "Duck toy sound",
    "color": "rgb(255, 222, 9)",
    "mp3": "/media/sounds/duck-toy-sound.mp3"
  },
  {
    "name": "Money SoundFX",
    "color": "rgb(255, 253, 0)",
    "mp3": "/media/sounds/money-soundfx.mp3"
  },
  {
    "name": "Anderdingus",
    "color": "rgb(54, 150, 30)",
    "mp3": "/media/sounds/anderdingus.mp3"
  },
  {
    "name": "NFL Draft Chime",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nfl-draft-chime.mp3"
  },
  {
    "name": "Rizzbot laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rizzbot-laugh.mp3"
  },
  {
    "name": "Pookie Bear",
    "color": "rgb(255, 0, 200)",
    "mp3": "/media/sounds/pookie-bear.mp3"
  },
  {
    "name": "Bad to the Bone Meme",
    "color": "rgb(204, 255, 239)",
    "mp3": "/media/sounds/bad-to-the-bone-meme.mp3"
  },
  {
    "name": "I've got this",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ive-got-this.mp3"
  },
  {
    "name": "MAN SNORING MEME",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/man-snoring-meme_ctrllNn.mp3"
  },
  {
    "name": "Meow 1",
    "color": "rgb(202, 155, 0)",
    "mp3": "/media/sounds/meow-1.mp3"
  },
  {
    "name": "Awkward Moment",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/awkward-moment.mp3"
  },
  {
    "name": "Re:Zero Return by Death",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/re-zero-return-by-death.mp3"
  },
  {
    "name": "Wow Anime meme",
    "color": "rgb(255, 60, 0)",
    "mp3": "/media/sounds/anime-wow-sound-effect-mp3cut.mp3"
  },
  {
    "name": "SUBWAY SURFERS BASS BOOSTED",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/subway-surfers-bass-boosted.mp3"
  },
  {
    "name": "Windows XP Error",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/erro.mp3"
  },
  {
    "name": "minecraft eating sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nom-nom-nom_gPJiWn4.mp3"
  },
  {
    "name": "Jeopardy Theme Song!",
    "color": "rgb(0, 51, 255)",
    "mp3": "/media/sounds/jeopardy-themelq.mp3"
  },
  {
    "name": "yo phone ringing -chino",
    "color": "rgb(255, 218, 83)",
    "mp3": "/media/sounds/yo-phone-ringing-chino.mp3"
  },
  {
    "name": "FNAF Jumpscare Scream",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/five-nights-at-freddys-full-scream-sound_2.mp3"
  },
  {
    "name": "No no Wait Wait!",
    "color": "rgb(0, 255, 11)",
    "mp3": "/media/sounds/no-no-wait-wait.mp3"
  },
  {
    "name": "WE ARE THE CHAMPIONS",
    "color": "rgb(51, 0, 51)",
    "mp3": "/media/sounds/we-are-the-champions-copia.mp3"
  },
  {
    "name": "SYFM LOUD",
    "color": "rgb(255, 223, 223)",
    "mp3": "/media/sounds/syfm-loud_xRTiPcw.mp3"
  },
  {
    "name": "Low honor RDR 2",
    "color": "rgb(128, 0, 0)",
    "mp3": "/media/sounds/low-honor-rdr-2.mp3"
  },
  {
    "name": "wet fart",
    "color": "rgb(204, 102, 0)",
    "mp3": "/media/sounds/wet-fart_1.mp3"
  },
  {
    "name": "moving stone",
    "color": "rgb(65, 77, 76)",
    "mp3": "/media/sounds/moving-stone.mp3"
  },
  {
    "name": "Here I come San Francisco",
    "color": "rgb(255, 246, 16)",
    "mp3": "/media/sounds/here-i-come-san-francisco.mp3"
  },
  {
    "name": "fahhh pump sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fahhh-pump-sound.mp3"
  },
  {
    "name": "Slap *oh*",
    "color": "rgb(114, 88, 255)",
    "mp3": "/media/sounds/slap-oh_LGvkhyt.mp3"
  },
  {
    "name": "Cartoon Slip",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoonslip.mp3"
  },
  {
    "name": "Bark Fart Sound",
    "color": "rgb(111, 111, 111)",
    "mp3": "/media/sounds/bark-fart-sound.mp3"
  },
  {
    "name": "metal gear alert sound effect",
    "color": "rgb(127, 185, 255)",
    "mp3": "/media/sounds/metal-gear-alert-sound-effect_XKoHReZ.mp3"
  },
  {
    "name": "brain fart slowed",
    "color": "rgb(141, 85, 60)",
    "mp3": "/media/sounds/brain-fart-slowed.mp3"
  },
  {
    "name": "Apple Pay Sound",
    "color": "rgb(33, 77, 255)",
    "mp3": "/media/sounds/apple-pay-sound.mp3"
  },
  {
    "name": "spiderman meme song 2.0",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spiderman-meme-song-2-0.mp3"
  },
  {
    "name": "Du bist gut genug - RINGTONE",
    "color": "rgb(0, 255, 1)",
    "mp3": "/media/sounds/du-bist-gut-genug-ringtone_uaLN2Cm.mp3"
  },
  {
    "name": "Gta v notification",
    "color": "rgb(69, 255, 0)",
    "mp3": "/media/sounds/gta-v-notification.mp3"
  },
  {
    "name": "Звук литвина",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zvuk-litvina.mp3"
  },
  {
    "name": "spongebob boowomp",
    "color": "rgb(255, 249, 26)",
    "mp3": "/media/sounds/spongebob-boowomp.mp3"
  },
  {
    "name": "Another One DJ Khaled",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/another-one_dPvHt2Z.mp3"
  },
  {
    "name": "oh no no no laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-no-no-no-no-laugh.mp3"
  },
  {
    "name": "Huh Cat",
    "color": "rgb(0, 72, 255)",
    "mp3": "/media/sounds/huh-cat.mp3"
  },
  {
    "name": "auraa",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/auraa.mp3"
  },
  {
    "name": "fart with extra reverb",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fart-with-extra-reverb.mp3"
  },
  {
    "name": "Yara Yara Phonk",
    "color": "rgb(178, 178, 178)",
    "mp3": "/media/sounds/yara-yara-phonk.mp3"
  },
  {
    "name": "Hello there- obi Wan",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/obi-wan-hello-there.mp3"
  },
  {
    "name": "Are baap re yaad aya",
    "color": "rgb(180, 255, 78)",
    "mp3": "/media/sounds/are-baap-re-yaad-aya.mp3"
  },
  {
    "name": "YES! - Lara Raj",
    "color": "rgb(255, 162, 81)",
    "mp3": "/media/sounds/yes-lara-raj.mp3"
  },
  {
    "name": "GTA V - Wasted",
    "color": "rgb(255, 51, 0)",
    "mp3": "/media/sounds/gta-v-death-sound-effect-102.mp3"
  },
  {
    "name": "I JUST HIT THE JACKPOT!",
    "color": "rgb(22, 255, 30)",
    "mp3": "/media/sounds/i-just-hit-the-jackpot.mp3"
  },
  {
    "name": "Chipmunk Laugh",
    "color": "rgb(241, 255, 0)",
    "mp3": "/media/sounds/funny_82hiegE.mp3"
  },
  {
    "name": "nelly ahh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ahh_gLSTOu4.mp3"
  },
  {
    "name": "We are Charlie Kirk (song)",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/we-are-charlie-kirk-song.mp3"
  },
  {
    "name": "Extremely loud incorrect buzzer",
    "color": "rgb(173, 255, 96)",
    "mp3": "/media/sounds/extremely-loud-incorrect-buzzer_0cDaG20.mp3"
  },
  {
    "name": "italian brainrot ringtone",
    "color": "rgb(120, 38, 38)",
    "mp3": "/media/sounds/italian-brainrot-ringtone.mp3"
  },
  {
    "name": "Heyy daddyyyyy⁓ omg",
    "color": "rgb(255, 163, 186)",
    "mp3": "/media/sounds/heyy-daddyyyyy-omg.mp3"
  },
  {
    "name": "bonk doge",
    "color": "rgb(255, 201, 121)",
    "mp3": "/media/sounds/bonk_7zPAD7C.mp3"
  },
  {
    "name": "funky ehh",
    "color": "rgb(43, 142, 255)",
    "mp3": "/media/sounds/funky-ehh.mp3"
  },
  {
    "name": "Chalo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chalo.mp3"
  },
  {
    "name": "Kwebbelkop laughing or smth",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/kwebbelkop-laughing-or-smth.mp3"
  },
  {
    "name": "CINEMATIC SUSPENSE RISER",
    "color": "rgb(132, 66, 255)",
    "mp3": "/media/sounds/cinematic-suspense-riser.mp3"
  },
  {
    "name": "It was at this moment he knew",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/heknew.mp3"
  },
  {
    "name": "Man screaming aaaah",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/man-screaming-aaaah.mp3"
  },
  {
    "name": "Asian Gong & Music",
    "color": "rgb(233, 255, 0)",
    "mp3": "/media/sounds/asian-gong-music.mp3"
  },
  {
    "name": "Minecraft Damage",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/minecraft_hit_soundmp3converter.mp3"
  },
  {
    "name": "Minecraft Click",
    "color": "rgb(255, 102, 153)",
    "mp3": "/media/sounds/minecraft_click.mp3"
  },
  {
    "name": "Load and Gunshot Fire",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gunshot-one.mp3"
  },
  {
    "name": "French meme song",
    "color": "rgb(60, 37, 255)",
    "mp3": "/media/sounds/french-meme-song.mp3"
  },
  {
    "name": "FAHHHHHHHH EARRAPE",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/fahhhhhhhh-earrape.mp3"
  },
  {
    "name": "Deltarune Explosion",
    "color": "rgb(52, 106, 255)",
    "mp3": "/media/sounds/deltarune-explosion.mp3"
  },
  {
    "name": "Keyboard Typing Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/keyboard-typing-sound-effect.mp3"
  },
  {
    "name": "MI BOMBO",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mi-bombo.mp3"
  },
  {
    "name": "Backrooms",
    "color": "rgb(221, 255, 68)",
    "mp3": "/media/sounds/backrooms.mp3"
  },
  {
    "name": "Meccha Chameleon Whistle",
    "color": "rgb(2, 255, 2)",
    "mp3": "/media/sounds/meccha-chameleon-whistle.mp3"
  },
  {
    "name": "Ankle breaker",
    "color": "rgb(255, 136, 0)",
    "mp3": "/media/sounds/ankle-breaker_j3Df0TU.mp3"
  },
  {
    "name": "запустил семя в арбуз",
    "color": "rgb(255, 219, 99)",
    "mp3": "/media/sounds/zapustil-semia-v-arbuz.mp3"
  },
  {
    "name": "German ringtone (call)",
    "color": "rgb(255, 119, 58)",
    "mp3": "/media/sounds/german-ringtone-call.mp3"
  },
  {
    "name": "Punch Effect",
    "color": "rgb(59, 255, 0)",
    "mp3": "/media/sounds/punch_u4LmMsr.mp3"
  },
  {
    "name": "Discipline.",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discipline_eqjphn0.mp3"
  },
  {
    "name": "AUUGHHH",
    "color": "rgb(0, 33, 255)",
    "mp3": "/media/sounds/auughhh.mp3"
  },
  {
    "name": "where are you goingg",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/where-are-you-goingg.mp3"
  },
  {
    "name": "Хомяк тролль ксивик",
    "color": "rgb(129, 3, 255)",
    "mp3": "/media/sounds/khomiak-troll-ksivik.mp3"
  },
  {
    "name": "app",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aplausos_3.mp3"
  },
  {
    "name": "omg bruh oh hell nah",
    "color": "rgb(164, 0, 255)",
    "mp3": "/media/sounds/omg-bruh-oh-hell-nah.mp3"
  },
  {
    "name": "Fnaf 1 music box",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fnaf-1-music-box.mp3"
  },
  {
    "name": "flashbang cs",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/flashbang-cs_qoRhxLn.mp3"
  },
  {
    "name": "Faaaa",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/faaaa.mp3"
  },
  {
    "name": "What The Hell Meme Sound Effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-the-hell-meme-sound-effect.mp3"
  },
  {
    "name": "DJ Airhorn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dj-airhorn-sound-effect-kingbeatz_1.mp3"
  },
  {
    "name": "Franklin ringtone",
    "color": "rgb(0, 131, 163)",
    "mp3": "/media/sounds/franklin-ringtone.mp3"
  },
  {
    "name": "Your phone ringing",
    "color": "rgb(231, 48, 255)",
    "mp3": "/media/sounds/your-phone-ringing_KIGWJCK.mp3"
  },
  {
    "name": "Loud Explosion",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/loud-explosion.mp3"
  },
  {
    "name": "Hey let her go!",
    "color": "rgb(42, 255, 0)",
    "mp3": "/media/sounds/let-her-go.mp3"
  },
  {
    "name": "We do not care (TikTok Sound)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/we-do-not-care_phB0mEB.mp3"
  },
  {
    "name": "anime girl voice",
    "color": "rgb(255, 119, 167)",
    "mp3": "/media/sounds/anime-girl-voice.mp3"
  },
  {
    "name": "Sad Trombone",
    "color": "rgb(255, 204, 51)",
    "mp3": "/media/sounds/sadtrombone.swf.mp3"
  },
  {
    "name": "oi oi oe oi a eye eye",
    "color": "rgb(0, 255, 18)",
    "mp3": "/media/sounds/oi-oi-oe-oi-a-eye-eye.mp3"
  },
  {
    "name": "German song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/german-song_bthHEHd.mp3"
  },
  {
    "name": "Roblox Explosion Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-explosion-sound.mp3"
  },
  {
    "name": "discord join call",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yt1s_nYWSz5R.mp3"
  },
  {
    "name": "Сова на скакалке",
    "color": "rgb(40, 14, 50)",
    "mp3": "/media/sounds/sova-na-skakalke.mp3"
  },
  {
    "name": "Sponge Stank Noise",
    "color": "rgb(255, 11, 156)",
    "mp3": "/media/sounds/sponge-stank-noise.mp3"
  },
  {
    "name": "500 CIGARETTES (TikTok Version)",
    "color": "rgb(57, 83, 113)",
    "mp3": "/media/sounds/500-cigarettes-tiktok-version.mp3"
  },
  {
    "name": "WIDE PUTIN MEME",
    "color": "rgb(33, 255, 100)",
    "mp3": "/media/sounds/my-movie-6_0RlWMvM.mp3"
  },
  {
    "name": "Shut up!",
    "color": "rgb(204, 102, 153)",
    "mp3": "/media/sounds/shutup.swf.mp3"
  },
  {
    "name": "Pistol-shot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pistol-shot.mp3"
  },
  {
    "name": "i farted and a poopy almost slipped out",
    "color": "rgb(152, 120, 60)",
    "mp3": "/media/sounds/i-farted-and-a-poopy-almost-slipped-out.mp3"
  },
  {
    "name": "discordjoin",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discord-sounds.mp3"
  },
  {
    "name": "correct (ding)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ding-sound-effect_1.mp3"
  },
  {
    "name": "The Price is Right Losing Horn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-price-is-right-losing-horn.mp3"
  },
  {
    "name": "Green Giant",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ho-ho-ho-green-giant-audio-clip.mp3"
  },
  {
    "name": "Tiki_tiki",
    "color": "rgb(247, 255, 18)",
    "mp3": "/media/sounds/tiki-tiki.mp3"
  },
  {
    "name": "Flapjack Scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/flap-jack-scream.mp3"
  },
  {
    "name": "The Price is Right Losing Horn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-price-is-right-losing-horn.mp3"
  },
  {
    "name": "Green Giant",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ho-ho-ho-green-giant-audio-clip.mp3"
  },
  {
    "name": "roaring knight swoon deltarune",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/roaring-knight-swoon-deltarune.mp3"
  },
  {
    "name": "Minecraft XP Sound",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/orb.mp3"
  },
  {
    "name": "FNAF Yay Children",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/crowd_small_chil_ec049202_9klCwI6.mp3"
  },
  {
    "name": "They ask you how you are meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/they-ask-you-how-you-are-and-you-just-have-to-say-that-youre-fine-sound-effect_IgYM1CV.mp3"
  },
  {
    "name": "FBI OPEN UP (with explosion)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fbi-open-up_dwLhIFf.mp3"
  },
  {
    "name": "Burp & Fart",
    "color": "rgb(255, 114, 114)",
    "mp3": "/media/sounds/burp-fart.mp3"
  },
  {
    "name": "sudden suspense",
    "color": "rgb(255, 251, 0)",
    "mp3": "/media/sounds/sudden-suspense-sound-effect.mp3"
  },
  {
    "name": "I got this fahhhhhh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-got-this-fahhhhhh.mp3"
  },
  {
    "name": "cha-ching money",
    "color": "rgb(47, 138, 79)",
    "mp3": "/media/sounds/cha-ching-money.mp3"
  },
  {
    "name": "Clown Circus music",
    "color": "rgb(17, 231, 255)",
    "mp3": "/media/sounds/clown-circus-music.mp3"
  },
  {
    "name": "HL2 Stalker Scream",
    "color": "rgb(255, 199, 228)",
    "mp3": "/media/sounds/hl2-stalker-scream.mp3"
  },
  {
    "name": "Иди нах*й",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/idi-nakh-i.mp3"
  },
  {
    "name": "Anime ahhhh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/anime-ahhhh.mp3"
  },
  {
    "name": "raaar",
    "color": "rgb(204, 225, 255)",
    "mp3": "/media/sounds/raaar_FerSY7o.mp3"
  },
  {
    "name": "Swoosh Sound Effects",
    "color": "rgb(64, 51, 255)",
    "mp3": "/media/sounds/swoosh-sound-effects.mp3"
  },
  {
    "name": "cat iphone ringtone",
    "color": "rgb(224, 252, 255)",
    "mp3": "/media/sounds/cat-iphone-ringtone.mp3"
  },
  {
    "name": "eh?eh?ehhhh?",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/eh-eh-ehhhh.mp3"
  },
  {
    "name": "angry roblox",
    "color": "rgb(129, 26, 26)",
    "mp3": "/media/sounds/angry-roblox.mp3"
  },
  {
    "name": "The Ting Goes Bark Fart",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/the-ting-goes-bark-fart.mp3"
  },
  {
    "name": "MICHAEL DONT LEAVE ME HERE",
    "color": "rgb(131, 0, 0)",
    "mp3": "/media/sounds/michael-dont-leave-me-here.mp3"
  },
  {
    "name": "undertaker bell repeat",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/undertaker-bell-repeat.mp3"
  },
  {
    "name": "Le fart de Simon",
    "color": "rgb(75, 255, 0)",
    "mp3": "/media/sounds/le-fart-de-simon.mp3"
  },
  {
    "name": "Wait wait wait what the hell legend sound",
    "color": "rgb(185, 63, 255)",
    "mp3": "/media/sounds/wait-wait-wait-what-the-hell-legend-sound.mp3"
  },
  {
    "name": "windows xp shutdown",
    "color": "rgb(102, 102, 255)",
    "mp3": "/media/sounds/preview_4.mp3"
  },
  {
    "name": "Tom scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/toms-screams.mp3"
  },
  {
    "name": "Фото",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/foto_btYFRHF.mp3"
  },
  {
    "name": "FAHHHHHHHHHHHHHHH",
    "color": "rgb(112, 84, 255)",
    "mp3": "/media/sounds/fahhhhhhhhhhhhhhh.mp3"
  },
  {
    "name": "Flashbang + Gah dayum",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/flashbang-gah-dayum.mp3"
  },
  {
    "name": "Odyssey Trial Bow SOUND",
    "color": "rgb(22, 22, 31)",
    "mp3": "/media/sounds/odyssey-trial-bow-sound.mp3"
  },
  {
    "name": "Service Bell (2)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/stupid-f__king-bird.mp3"
  },
  {
    "name": "Oh No No No Tik Tok Song Sound Effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-no-no-no-tik-tok-song-sound-effect.mp3"
  },
  {
    "name": "Clapping",
    "color": "rgb(255, 0, 51)",
    "mp3": "/media/sounds/aplausos_2.mp3"
  },
  {
    "name": "plankton augh",
    "color": "rgb(49, 108, 87)",
    "mp3": "/media/sounds/plankton-augh.mp3"
  },
  {
    "name": "plankton augh",
    "color": "rgb(49, 108, 87)",
    "mp3": "/media/sounds/plankton-augh.mp3"
  },
  {
    "name": "wut",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/record-scratch-2.mp3"
  },
  {
    "name": "Dolphin Censor",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/spongebob-dolphin-censor.mp3"
  },
  {
    "name": "WEAVE",
    "color": "rgb(132, 0, 255)",
    "mp3": "/media/sounds/weave.mp3"
  },
  {
    "name": "Smoke alarm beep",
    "color": "rgb(0, 26, 255)",
    "mp3": "/media/sounds/smoke-alarm-beep.mp3"
  },
  {
    "name": "Tung tung sahur",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/tung-tung-sahur.mp3"
  },
  {
    "name": "ЪЭХ",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ekh.mp3"
  },
  {
    "name": "Bruh meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/movie_1_C2K5NH0.mp3"
  },
  {
    "name": "Reload Gun",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gunreload.mp3"
  },
  {
    "name": "hold up tiktok",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/hold-up-tiktok.mp3"
  },
  {
    "name": "Glue (Flowery)",
    "color": "rgb(255, 218, 10)",
    "mp3": "/media/sounds/glue-flowery.mp3"
  },
  {
    "name": "squidward walking sound",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/squidward-walking-sound.mp3"
  },
  {
    "name": "ACTUALLY GOOD FAHHHH sfx",
    "color": "rgb(255, 0, 247)",
    "mp3": "/media/sounds/actually-good-fahhhh-sfx.mp3"
  },
  {
    "name": "Error glitch",
    "color": "rgb(10, 255, 38)",
    "mp3": "/media/sounds/error-glitch.mp3"
  },
  {
    "name": "whoosh sfx",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/whoosh-sfx.mp3"
  },
  {
    "name": "vine boom sound effect full",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-boom-sound-effect-full.mp3"
  },
  {
    "name": "Салют ебланы. Батя дома Billy Butcher I The Boys",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/saliut-eblany-batia-doma-billy-butcher-i-the-boys.mp3"
  },
  {
    "name": "nya cat girl sound",
    "color": "rgb(90, 65, 255)",
    "mp3": "/media/sounds/nya_2xyALFL.mp3"
  },
  {
    "name": "let me know",
    "color": "rgb(255, 22, 208)",
    "mp3": "/media/sounds/let-me-know.mp3"
  },
  {
    "name": "FLASH BANG SFX",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/flash-bang-sfx.mp3"
  },
  {
    "name": "Sparkleeeeeee",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fairy-dust-sound-effect.mp3"
  },
  {
    "name": "Violin screech meme",
    "color": "rgb(71, 255, 83)",
    "mp3": "/media/sounds/violin-screech-meme.mp3"
  },
  {
    "name": "Minecraft drinking sound",
    "color": "rgb(0, 255, 13)",
    "mp3": "/media/sounds/minecraft-drinking-sound-effect.mp3"
  },
  {
    "name": "MM2 Hit Shooting",
    "color": "rgb(255, 232, 20)",
    "mp3": "/media/sounds/mm2-hit-shooting.mp3"
  },
  {
    "name": "LEBRON",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lebron.mp3"
  },
  {
    "name": "Gaster Vanish",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/gaster-vanish.mp3"
  },
  {
    "name": "Deltarune Dark Fountain Open",
    "color": "rgb(29, 14, 65)",
    "mp3": "/media/sounds/deltarune-dark-fountain-open.mp3"
  },
  {
    "name": "Fnaf 2 Hallway",
    "color": "rgb(94, 94, 94)",
    "mp3": "/media/sounds/hallway-ambiance-extended-five-nights-at-freddys-2-music.mp3"
  },
  {
    "name": "Family Feud YES Ding",
    "color": "rgb(0, 163, 2)",
    "mp3": "/media/sounds/family-feud-good-answer.mp3"
  },
  {
    "name": "brain fart",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/brain-fart.mp3"
  },
  {
    "name": "Aayein Meme",
    "color": "rgb(255, 183, 50)",
    "mp3": "/media/sounds/aayein-meme.mp3"
  },
  {
    "name": "POU ESTOURADO",
    "color": "rgb(255, 210, 73)",
    "mp3": "/media/sounds/pou-estourado_zIWCpMy.mp3"
  },
  {
    "name": "Muhehehe",
    "color": "rgb(105, 20, 88)",
    "mp3": "/media/sounds/muhehehe.mp3"
  },
  {
    "name": "Mambo曼波 诗歌剧Matikanetannhauser",
    "color": "rgb(255, 211, 172)",
    "mp3": "/media/sounds/mamboman-bo-shi-ge-ju-matikanetannhauser.mp3"
  },
  {
    "name": "You What?",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/you-what-spongebob.mp3"
  },
  {
    "name": "they're eating my flesh",
    "color": "rgb(255, 247, 28)",
    "mp3": "/media/sounds/theyre-eating-my-flesh.mp3"
  },
  {
    "name": "Angry Indian Scammer",
    "color": "rgb(0, 255, 227)",
    "mp3": "/media/sounds/getfromytcom-the-angriest-scamme-1.mp3"
  },
  {
    "name": "Wilhelm Scream",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/wilhelmscream.mp3"
  },
  {
    "name": "Minecraft Hurt",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/classic_hurt.mp3"
  },
  {
    "name": "Super Mario Death",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/super-mario-death-sound-sound-effect.mp3"
  },
  {
    "name": "confetti pop sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/confetti-pop-sound.mp3"
  },
  {
    "name": "Cave Ambience 1",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cave11_0QWMESM.mp3"
  },
  {
    "name": "vine boom bass boost sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-boom-bass-boost-sound-effect.mp3"
  },
  {
    "name": "BYE BYE! ~ Lumi Athena SFX",
    "color": "rgb(29, 29, 29)",
    "mp3": "/media/sounds/bye-bye-lumi-athena-sfx.mp3"
  },
  {
    "name": "GREEN GIANT (no HO HO HO)",
    "color": "rgb(72, 255, 35)",
    "mp3": "/media/sounds/green-giant-no-ho-ho-ho.mp3"
  },
  {
    "name": "check mark",
    "color": "rgb(255, 129, 33)",
    "mp3": "/media/sounds/check-mark_oPG7Xo5.mp3"
  },
  {
    "name": "DAMN!!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/friday-damn.mp3"
  },
  {
    "name": "spongebob sad song",
    "color": "rgb(255, 228, 58)",
    "mp3": "/media/sounds/spongebob-sad-song.mp3"
  },
  {
    "name": "nope",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/engineer_no01_1.mp3"
  },
  {
    "name": "Ayo Chill (GroxMc)",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/ayo-chill-groxmc.mp3"
  },
  {
    "name": "Red Larva Scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/red-larva-scream.mp3"
  },
  {
    "name": "Bad to the Bone Riff",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bad-to-the-bone.mp3"
  },
  {
    "name": "Censor Beep 3",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/censor-beep-3.mp3"
  },
  {
    "name": "I'm Gonna Come Trump",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-gonna-come_6HehWm4.mp3"
  },
  {
    "name": "BASS BOOST discord call",
    "color": "rgb(93, 0, 255)",
    "mp3": "/media/sounds/bass-boost-discord-call.mp3"
  },
  {
    "name": "Cartoon run take off",
    "color": "rgb(51, 255, 59)",
    "mp3": "/media/sounds/take-off_2YqCEjc.mp3"
  },
  {
    "name": "Michael Jackson Billie Jean",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/michael-jackson-billie-jean.mp3"
  },
  {
    "name": "helicopter helicopter parakofer parakofer",
    "color": "rgb(0, 255, 84)",
    "mp3": "/media/sounds/helicopter-helicopter-parakofer-parakofer.mp3"
  },
  {
    "name": "roblox horror",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/do-not-open.mp3"
  },
  {
    "name": "Гудок поезда",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/gudok-poezda.mp3"
  },
  {
    "name": "Thunder",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/thunder-sound-effect.mp3"
  },
  {
    "name": "FNAF Balloon Boy Hello",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/echo3b.mp3"
  },
  {
    "name": "Minecraft Enderman Teleport Sound",
    "color": "rgb(189, 19, 231)",
    "mp3": "/media/sounds/teleport1_Cw1ot9l.mp3"
  },
  {
    "name": "Boxing Bell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/boxing-bell.mp3"
  },
  {
    "name": "охаешечки даттебаешечки",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/okhaeshechki-dattebaeshechki.mp3"
  },
  {
    "name": "discord troll",
    "color": "rgb(0, 255, 17)",
    "mp3": "/media/sounds/mikejebait-3.mp3"
  },
  {
    "name": "GET OVER HERE Scorpion",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/scorpion-get_over_here.mp3"
  },
  {
    "name": "Твоё мнение мне нененене",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tvoio-mnenie-mne-nenenene.mp3"
  },
  {
    "name": "Ralsei Splat",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/ralsei-splat.mp3"
  },
  {
    "name": "FAHHHHH 3",
    "color": "rgb(122, 0, 0)",
    "mp3": "/media/sounds/fahhhhh-3.mp3"
  },
  {
    "name": "Mogged",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mogged.mp3"
  },
  {
    "name": "RICK ROLLED!!!! BWHAHAHAHAHAHA",
    "color": "rgb(255, 255, 102)",
    "mp3": "/media/sounds/epic.mp3"
  },
  {
    "name": "RICK ROLLED!!!! BWHAHAHAHAHAHA",
    "color": "rgb(255, 255, 102)",
    "mp3": "/media/sounds/epic.mp3"
  },
  {
    "name": "oh my god, wow!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/omgwow.mp3"
  },
  {
    "name": "Rat dance Music",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/rat-dance-music.mp3"
  },
  {
    "name": "TF2 Critical hit",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/critical-hit-sounds-effect.mp3"
  },
  {
    "name": "scubbaaa",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/scubbaaa.mp3"
  },
  {
    "name": "Prowler",
    "color": "rgb(118, 49, 154)",
    "mp3": "/media/sounds/prowler.mp3"
  },
  {
    "name": "Lego Yoda Death Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lego-yoda-death-sound-effect.mp3"
  },
  {
    "name": "Mr. Tenna says IT'S TV TIME",
    "color": "rgb(255, 171, 171)",
    "mp3": "/media/sounds/mr-tenna-says-its-tv-time.mp3"
  },
  {
    "name": "Doge bonk",
    "color": "rgb(67, 179, 180)",
    "mp3": "/media/sounds/bonk_BEtiM8g.mp3"
  },
  {
    "name": "Buenas tardes grupo",
    "color": "rgb(163, 255, 184)",
    "mp3": "/media/sounds/buenas-tardes-grupo.mp3"
  },
  {
    "name": "pop",
    "color": "rgb(102, 51, 204)",
    "mp3": "/media/sounds/comedy_pop_finger_in_mouth_001.mp3"
  },
  {
    "name": "shut the fu up",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/shut-the-fu-up.mp3"
  },
  {
    "name": "sonic ring",
    "color": "rgb(0, 51, 255)",
    "mp3": "/media/sounds/26f8b9_sonic_ring_sound_effect.mp3"
  },
  {
    "name": "Bo-womp",
    "color": "rgb(255, 239, 82)",
    "mp3": "/media/sounds/bo-womp.mp3"
  },
  {
    "name": "Deltarune ringtone",
    "color": "rgb(96, 116, 255)",
    "mp3": "/media/sounds/deltarune-ringtone_SnkHGfF.mp3"
  },
  {
    "name": "Laughing dog meme",
    "color": "rgb(139, 0, 0)",
    "mp3": "/media/sounds/laughing-dog-meme.mp3"
  },
  {
    "name": "Nuclear Fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nuclear-fart-1.mp3"
  },
  {
    "name": "Brother Ewwwwwww",
    "color": "rgb(255, 15, 123)",
    "mp3": "/media/sounds/brother-ewwwwwww.mp3"
  },
  {
    "name": "mommy asmr",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mommy-asmr.mp3"
  },
  {
    "name": "punch sound effect meme",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/punch-sound-effect-meme.mp3"
  },
  {
    "name": "Mario screaming 1",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpcoj3v_01.mp3"
  },
  {
    "name": "roblox bye",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-bye.mp3"
  },
  {
    "name": "Доброе утро моя девочка",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/dobroe-utro-moia-devochka.mp3"
  },
  {
    "name": "Lancer splat",
    "color": "rgb(29, 46, 255)",
    "mp3": "/media/sounds/lancer-splat.mp3"
  },
  {
    "name": "Kids Cheering",
    "color": "rgb(0, 204, 0)",
    "mp3": "/media/sounds/kids_cheering.mp3"
  },
  {
    "name": "Death Splat",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/death-splat.mp3"
  },
  {
    "name": "Matlab wo alag hi level ka banda tha",
    "color": "rgb(139, 255, 248)",
    "mp3": "/media/sounds/matlab-wo-alag-hi-level-ka-banda-tha.mp3"
  },
  {
    "name": "Pew",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/pew-pew-lame-sound-effect.mp3"
  },
  {
    "name": "Original fah",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/original-fah.mp3"
  },
  {
    "name": "Sponge Bob Disgusting",
    "color": "rgb(211, 199, 0)",
    "mp3": "/media/sounds/sponge-bob-disgusting.mp3"
  },
  {
    "name": "American Anthem (Gun and Eagle)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/american-anthem-gun-and-eagle.mp3"
  },
  {
    "name": "Cartoon boing sfx",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon-boing_7vRWDlc.mp3"
  },
  {
    "name": "Happy happy happy song",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/happy-happy-happy-song.mp3"
  },
  {
    "name": "Crowd cheering",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/cheering.mp3"
  },
  {
    "name": "Grindr Sound",
    "color": "rgb(204, 204, 0)",
    "mp3": "/media/sounds/grindr-notification-sound.mp3"
  },
  {
    "name": "BLYYAAAAAAAAAAAAT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/blyyaaaaaaaaaaaat.mp3"
  },
  {
    "name": "Micheal Jackson rizz",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/micheal-jackson-rizz.mp3"
  },
  {
    "name": "you've got mail",
    "color": "rgb(102, 0, 255)",
    "mp3": "/media/sounds/yougotmail.mp3"
  },
  {
    "name": "bass drop sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bass-drop-edit_mixdown.mp3"
  },
  {
    "name": "MMM (Rap)",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/mmm-6.mp3"
  },
  {
    "name": "Car Crash SFX",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/car-crash_OwBDipR.mp3"
  },
  {
    "name": "Somebody Get These Beggars Outta Here",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/somebody-get-these-beggars-outta-here.mp3"
  },
  {
    "name": "Verity beatbox",
    "color": "rgb(174, 213, 255)",
    "mp3": "/media/sounds/verity-beatbox.mp3"
  },
  {
    "name": "goofy ahh runnin",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goofy-ahh-runnin.mp3"
  },
  {
    "name": "Keyboard meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/keyboard-meme.mp3"
  },
  {
    "name": "Screaming Goat (best)",
    "color": "rgb(0, 204, 204)",
    "mp3": "/media/sounds/screaming-goat.mp3"
  },
  {
    "name": "Parry ultrakill",
    "color": "rgb(35, 50, 148)",
    "mp3": "/media/sounds/parry-ultrakill.mp3"
  },
  {
    "name": "The Rock Shut Up",
    "color": "rgb(0, 255, 94)",
    "mp3": "/media/sounds/the-rock-shut-up.mp3"
  },
  {
    "name": "Piccolo aura",
    "color": "rgb(95, 255, 36)",
    "mp3": "/media/sounds/piccolo-aura.mp3"
  },
  {
    "name": "I AM AN ARCHITECT!",
    "color": "rgb(153, 0, 255)",
    "mp3": "/media/sounds/i-am-an-architect.mp3"
  },
  {
    "name": "Windows XP - Startup Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/windows-xp-startup.mp3"
  },
  {
    "name": "класс прям как во втором team fortress",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/klass-priam-kak-vo-vtorom-team-fortress.mp3"
  },
  {
    "name": "hitmarker.mp3",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hitmarker_2.mp3"
  },
  {
    "name": "Визг свиньи",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vizg-svini.mp3"
  },
  {
    "name": "Abandon weird route",
    "color": "rgb(155, 78, 194)",
    "mp3": "/media/sounds/abandon-weird-route.mp3"
  },
  {
    "name": "Mbappe dictador",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/mbappe-dictador_bAAKC8q.mp3"
  },
  {
    "name": "Gemidоs 250",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gemidos-250.mp3"
  },
  {
    "name": "Defy Gravity x God Is Kanye",
    "color": "rgb(0, 222, 7)",
    "mp3": "/media/sounds/defy-gravity-x-god-is-kanye.mp3"
  },
  {
    "name": "Weird route chapter 4 jingle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/weird-route-chapter-4-jingle.mp3"
  },
  {
    "name": "Get Out Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/get-out-meme.mp3"
  },
  {
    "name": "NFL Bass Boosted",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nfl.mp3"
  },
  {
    "name": "Disney Applause",
    "color": "rgb(23, 170, 255)",
    "mp3": "/media/sounds/disney-applause.mp3"
  },
  {
    "name": "uwu discord gorl",
    "color": "rgb(252, 204, 255)",
    "mp3": "/media/sounds/uwu-discord-gorl.mp3"
  },
  {
    "name": "Wet fart meme",
    "color": "rgb(109, 73, 20)",
    "mp3": "/media/sounds/wet-fart-meme.mp3"
  },
  {
    "name": "Minecraft Villager Sound",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/minecraft-villager-sound-effect.mp3"
  },
  {
    "name": "nyon",
    "color": "rgb(56, 132, 255)",
    "mp3": "/media/sounds/nyon.mp3"
  },
  {
    "name": "Ja-Orange 1",
    "color": "rgb(255, 153, 0)",
    "mp3": "/media/sounds/ja-orange-1.mp3"
  },
  {
    "name": "Loud Fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fart_2.mp3"
  },
  {
    "name": "Pikmin!",
    "color": "rgb(93, 84, 84)",
    "mp3": "/media/sounds/pikmin-gcn.mp3"
  },
  {
    "name": "Tarkov grenade",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/grenade-plonk-sound-effect-tarkov-louder.mp3"
  },
  {
    "name": "jokowi saya akan lawan",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jokowi-saya-akan-lawan.mp3"
  },
  {
    "name": "nope.avi",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/engineer_no01.mp3"
  },
  {
    "name": "Goofy Yell",
    "color": "rgb(51, 102, 255)",
    "mp3": "/media/sounds/goofy-yell.mp3"
  },
  {
    "name": "oof minecraft",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/steve-old-hurt-sound_XKZxUk4.mp3"
  },
  {
    "name": "folk valley",
    "color": "rgb(0, 255, 247)",
    "mp3": "/media/sounds/folk-valley.mp3"
  },
  {
    "name": "Fart Effect",
    "color": "rgb(50, 255, 112)",
    "mp3": "/media/sounds/09037.mp3"
  },
  {
    "name": "Oh, pwincess where are you",
    "color": "rgb(255, 124, 253)",
    "mp3": "/media/sounds/oh-pwincess-where-are-you.mp3"
  },
  {
    "name": "My Name Is Jeff",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/ringtone_20.mp3"
  },
  {
    "name": "Fortnite default dance bass boost",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite-default-dance-bass-boosted.mp3"
  },
  {
    "name": "obsession no dont do that",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/obsession-no-dont-do-that.mp3"
  },
  {
    "name": "Glass breaking sound effect",
    "color": "rgb(91, 225, 255)",
    "mp3": "/media/sounds/glass-breaking-sound-effect_wLZSIYn.mp3"
  },
  {
    "name": "flowery_sorryaboutthatlittleguy",
    "color": "rgb(255, 248, 58)",
    "mp3": "/media/sounds/flowery-sorryaboutthatlittleguy.mp3"
  },
  {
    "name": "Camera shutter",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/camera_zLdd1zp.mp3"
  },
  {
    "name": "Crickets Chirping",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/crickets-chirping.mp3"
  },
  {
    "name": "frog laughing meme",
    "color": "rgb(255, 71, 224)",
    "mp3": "/media/sounds/frog-laughing-meme.mp3"
  },
  {
    "name": "Cartoon Bite",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon_bite_sound_effect.mp3"
  },
  {
    "name": "Crying Baby",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/asdasd_xyorzJ8.mp3"
  },
  {
    "name": "Nuclear Alarm Siren",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nuclear-alarm-siren.mp3"
  },
  {
    "name": "Electric Zoo",
    "color": "rgb(248, 255, 58)",
    "mp3": "/media/sounds/spongebob-squarepants-the-yellow-album-21-electric-zoo-audiotrimmer.mp3"
  },
  {
    "name": "RDR2 low honour sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rdr2-low-honour-sound.mp3"
  },
  {
    "name": "yoooooooooooo",
    "color": "rgb(26, 30, 255)",
    "mp3": "/media/sounds/yooooooooooooooooooooooooo_4_objp8XX.mp3"
  },
  {
    "name": "Spider-Man thwip",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spider-man-customized-web-thwip-sound-effect-1_ybmate.mp3"
  },
  {
    "name": "Lomando",
    "color": "rgb(111, 0, 0)",
    "mp3": "/media/sounds/lomando_0QYwhgb.mp3"
  },
  {
    "name": "AMOGUS SCREAMING",
    "color": "rgb(255, 214, 49)",
    "mp3": "/media/sounds/guy-yelling-among-us-sound-effect.mp3"
  },
  {
    "name": "Law and Order DUN DUN",
    "color": "rgb(204, 153, 102)",
    "mp3": "/media/sounds/dun_dun_1.mp3"
  },
  {
    "name": "Slendytubbies Tinky Winky",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/slendy1.mp3"
  },
  {
    "name": "I'm Very Angry goku",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-very-angry-goku.mp3"
  },
  {
    "name": "Scary Tiktok Music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/scary-tiktok-music.mp3"
  },
  {
    "name": "Uwu hannah",
    "color": "rgb(222, 74, 255)",
    "mp3": "/media/sounds/uwu-hannah.mp3"
  },
  {
    "name": "Roblox old winning sound effect",
    "color": "rgb(255, 246, 8)",
    "mp3": "/media/sounds/roblox-old-winning-sound-effect.mp3"
  },
  {
    "name": "Minecraft Train Whistle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/minecraft-train-whistle-cave-sound.mp3"
  },
  {
    "name": "we do not care",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mike-tomlin-we-do-not-care-trim.mp3"
  },
  {
    "name": "[FNAF] 6 AM",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/five-nights-at-freddys-6-am.mp3"
  },
  {
    "name": "WHAT DID HE SAY",
    "color": "rgb(68, 247, 255)",
    "mp3": "/media/sounds/5s_to_7s_what_did_he_say_tik_tok.mp3"
  },
  {
    "name": "Maldito Traidor",
    "color": "rgb(54, 248, 255)",
    "mp3": "/media/sounds/maldito-traidor.mp3"
  },
  {
    "name": "discord kitten",
    "color": "rgb(255, 66, 206)",
    "mp3": "/media/sounds/discord-kitten.mp3"
  },
  {
    "name": "Один хамамм ам ам ам",
    "color": "rgb(56, 255, 49)",
    "mp3": "/media/sounds/odin-khamamm-am-am-am.mp3"
  },
  {
    "name": "fnaf 2 scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/five-nights-at-freddys-2-full-scream-sound.mp3"
  },
  {
    "name": "bing chilling",
    "color": "rgb(41, 56, 134)",
    "mp3": "/media/sounds/bing-chilling_fcdGgUc.mp3"
  },
  {
    "name": "Ayo-",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ayo_ngawHKc.mp3"
  },
  {
    "name": "Kaching Sound FX",
    "color": "rgb(255, 245, 49)",
    "mp3": "/media/sounds/kaching-sound-fx.mp3"
  },
  {
    "name": "fnaf 2 scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/five-nights-at-freddys-2-full-scream-sound.mp3"
  },
  {
    "name": "WHAT DID HE SAY",
    "color": "rgb(68, 247, 255)",
    "mp3": "/media/sounds/5s_to_7s_what_did_he_say_tik_tok.mp3"
  },
  {
    "name": "Anime punch",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/strongpunch.mp3"
  },
  {
    "name": "пердеж",
    "color": "rgb(0, 255, 72)",
    "mp3": "/media/sounds/perdezh_YQ5l54B.mp3"
  },
  {
    "name": "CSGO AWP",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/awp_02.mp3"
  },
  {
    "name": "Meme mp3",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/meme-de-creditos-finales_qHtIjyQ.mp3"
  },
  {
    "name": "Vine Boom (Longer)",
    "color": "rgb(255, 195, 217)",
    "mp3": "/media/sounds/vine_boom_sound_effect_longer_verison_for_real_read_description_pleaseyoutubetomp4.mp3"
  },
  {
    "name": "Mii Channel Music",
    "color": "rgb(213, 226, 255)",
    "mp3": "/media/sounds/mii-channel-music.mp3"
  },
  {
    "name": "quack.mp3",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/quack_5.mp3"
  },
  {
    "name": "Gaster's Theme",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/gasters-theme_PgFVfMX.mp3"
  },
  {
    "name": "mr krabs walking",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/mr-krabs-walking.mp3"
  },
  {
    "name": "FBI open UP",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fbi-open-up-sfx.mp3"
  },
  {
    "name": "Wrong Answer GameShow",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wrong_5.mp3"
  },
  {
    "name": "Pokemon-Level Up!",
    "color": "rgb(0, 255, 204)",
    "mp3": "/media/sounds/12_3.mp3"
  },
  {
    "name": "Record scratch sound effect",
    "color": "rgb(255, 51, 0)",
    "mp3": "/media/sounds/record-scratch_1.mp3"
  },
  {
    "name": "Ngakak laugh annoying",
    "color": "rgb(214, 255, 142)",
    "mp3": "/media/sounds/ngakak-laugh-annoying.mp3"
  },
  {
    "name": "My Jarona",
    "color": "rgb(217, 187, 17)",
    "mp3": "/media/sounds/my-jarona.mp3"
  },
  {
    "name": "The Nut Button",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nut_ZKo5FA9.mp3"
  },
  {
    "name": "Pink Mew Laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pink-mew-laugh.mp3"
  },
  {
    "name": "\"My leg!\" Fish",
    "color": "rgb(255, 204, 0)",
    "mp3": "/media/sounds/my-leg_2.mp3"
  },
  {
    "name": "“Hello There” Obi Wan",
    "color": "rgb(90, 197, 255)",
    "mp3": "/media/sounds/obi-wan_says_hello_thereyoutubetomp4.mp3"
  },
  {
    "name": "Tuturu",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tuturu_1.mp3"
  },
  {
    "name": "Minecraft Level Up Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/levelup.mp3"
  },
  {
    "name": "magic fairy",
    "color": "rgb(136, 224, 255)",
    "mp3": "/media/sounds/magic-fairy.mp3"
  },
  {
    "name": "Indian under the water",
    "color": "rgb(107, 169, 220)",
    "mp3": "/media/sounds/y2mate_HOnnyD0.mp3"
  },
  {
    "name": "Talking ben saying ben",
    "color": "rgb(255, 231, 133)",
    "mp3": "/media/sounds/talking-ben-saying-ben.mp3"
  },
  {
    "name": "Homelander going crazy angry violin theme song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/homelander-going-crazy-angry-violin-theme-song.mp3"
  },
  {
    "name": "Naruto Sad Song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/naruto-sad-music-instant.mp3"
  },
  {
    "name": "Zelda - Item Get",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/139-item-catch.mp3"
  },
  {
    "name": "SUKUNA GUGU GAGA LOUDEST",
    "color": "rgb(255, 18, 20)",
    "mp3": "/media/sounds/sukuna-gugu-gaga-loudest.mp3"
  },
  {
    "name": "BOING . MP3",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/boing_lmke36X.mp3"
  },
  {
    "name": "Штурвал удовольствия фул",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/shturval-udovolstviia-ful.mp3"
  },
  {
    "name": "Careless Whisper",
    "color": "rgb(153, 255, 204)",
    "mp3": "/media/sounds/careless_whispers.mp3"
  },
  {
    "name": "Штурвал удовольствия фул",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/shturval-udovolstviia-ful.mp3"
  },
  {
    "name": "Careless Whisper",
    "color": "rgb(153, 255, 204)",
    "mp3": "/media/sounds/careless_whispers.mp3"
  },
  {
    "name": "OH SHIT! (echo)",
    "color": "rgb(255, 0, 255)",
    "mp3": "/media/sounds/oh-shit_4.mp3"
  },
  {
    "name": "flowery i'm falling",
    "color": "rgb(226, 255, 3)",
    "mp3": "/media/sounds/flowery-im-falling.mp3"
  },
  {
    "name": "Snoop Dogg meme",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpbxydyrz3.mp3"
  },
  {
    "name": "Cyberpunk 2077 phone call",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cyberpunk-2077-phone-call.mp3"
  },
  {
    "name": "Here Comes The Money",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/money_2.mp3"
  },
  {
    "name": "Mario coin sound",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/mario_coin_sound.mp3"
  },
  {
    "name": "Cartoon running",
    "color": "rgb(255, 193, 0)",
    "mp3": "/media/sounds/cartoon-running-sound-effect-online-audio-converter.mp3"
  },
  {
    "name": "meowrgh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/meowrgh.mp3"
  },
  {
    "name": "Freddy beatbox",
    "color": "rgb(56, 30, 18)",
    "mp3": "/media/sounds/freddy-beatbox.mp3"
  },
  {
    "name": "VA A JUGAR O QUE",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/va-jugar-o-que.mp3"
  },
  {
    "name": "soundpad",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/soundpad.mp3"
  },
  {
    "name": "Transformers (transforming)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/transforming-sound-from-the-transformers.mp3"
  },
  {
    "name": "Cinematic Boom",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cinematicboom.mp3"
  },
  {
    "name": "Hyper-Reallistic Knocking",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/crazy-realistic-knocking-sound-trim.mp3"
  },
  {
    "name": "Popular Riser",
    "color": "rgb(0, 213, 255)",
    "mp3": "/media/sounds/popular-riser.mp3"
  },
  {
    "name": "yippee tbh",
    "color": "rgb(30, 125, 36)",
    "mp3": "/media/sounds/yippee-tbh.mp3"
  },
  {
    "name": "\"Fish!\" you, me, gas station clip",
    "color": "rgb(92, 129, 213)",
    "mp3": "/media/sounds/fish-you-me-gas-station-clip.mp3"
  },
  {
    "name": "two hours later",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spongebob-two-hours-later-2019-download-link.mp3"
  },
  {
    "name": "English or Spanish Song",
    "color": "rgb(144, 212, 255)",
    "mp3": "/media/sounds/english-or-spanish-song.mp3"
  },
  {
    "name": "WhatsApp Bass Boosted",
    "color": "rgb(40, 39, 39)",
    "mp3": "/media/sounds/whatsapp-bass-boosted.mp3"
  },
  {
    "name": "STAY IN CHARACTER",
    "color": "rgb(36, 201, 255)",
    "mp3": "/media/sounds/stay-in-character.mp3"
  },
  {
    "name": "Subway Surfers",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/subway-surfers.mp3"
  },
  {
    "name": "Franklin Notification - GTA V",
    "color": "rgb(70, 255, 45)",
    "mp3": "/media/sounds/franklin-notification-gta-v.mp3"
  },
  {
    "name": "YAAAYY CHILDREN!!!!",
    "color": "rgb(159, 242, 255)",
    "mp3": "/media/sounds/children-yaysound-effect.mp3"
  },
  {
    "name": "Metal Pipe Falling Sound Effect",
    "color": "rgb(87, 69, 96)",
    "mp3": "/media/sounds/metal-pipe-falling-sound-effect.mp3"
  },
  {
    "name": "sitcom laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sitcom-laughing-1.mp3"
  },
  {
    "name": "Directed by Robert B Weide",
    "color": "rgb(126, 255, 165)",
    "mp3": "/media/sounds/directed-by-robert-b_voI2Z4T.mp3"
  },
  {
    "name": "Scary Maze Game Scream Sound",
    "color": "rgb(0, 255, 247)",
    "mp3": "/media/sounds/final_60108db6919bc200b087a3a2_239343.mp3"
  },
  {
    "name": "wee weee weee",
    "color": "rgb(49, 255, 221)",
    "mp3": "/media/sounds/weeeee_original_1193597514938524841.mp3"
  },
  {
    "name": "Gun",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/t-t.mp3"
  },
  {
    "name": "Annihilation the alien",
    "color": "rgb(10, 27, 255)",
    "mp3": "/media/sounds/annihilation-the-alien.mp3"
  },
  {
    "name": "flowery stingus",
    "color": "rgb(245, 255, 56)",
    "mp3": "/media/sounds/flowery-stingus.mp3"
  },
  {
    "name": "Brick hitting metal",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/brick-on-metal-sound-effect12.mp3"
  },
  {
    "name": "Johnny Test Whip Crack",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/johnny-test-whip-crack.mp3"
  },
  {
    "name": "Johnny Test Whip Crack",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/johnny-test-whip-crack.mp3"
  },
  {
    "name": "Thank You For Your Patronage",
    "color": "rgb(255, 217, 63)",
    "mp3": "/media/sounds/thank-you-for-your-patronage.mp3"
  },
  {
    "name": "Gruesome Sound",
    "color": "rgb(162, 0, 0)",
    "mp3": "/media/sounds/gruesome-sound.mp3"
  },
  {
    "name": "Doug Walker fast clapping",
    "color": "rgb(0, 71, 255)",
    "mp3": "/media/sounds/doug-walker-fast-clapping.mp3"
  },
  {
    "name": "Surprise mother f'er",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/surprise-mother-fer.mp3"
  },
  {
    "name": "Final Jeopardy Thinking Music",
    "color": "rgb(246, 255, 3)",
    "mp3": "/media/sounds/jeopardy-final-jeopardy-thinking-music.mp3"
  },
  {
    "name": "DAMN SON, WHERE'D YA FIND THIS",
    "color": "rgb(0, 0, 204)",
    "mp3": "/media/sounds/damn-son-whered-you-find-this.mp3"
  },
  {
    "name": "банкомат мелстрой",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bankomat-melstroi_uUdPD2C.mp3"
  },
  {
    "name": "Verity (hello)",
    "color": "rgb(250, 255, 0)",
    "mp3": "/media/sounds/verity-hello.mp3"
  },
  {
    "name": "Brick hitting metal",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/brick-on-metal-sound-effect12.mp3"
  },
  {
    "name": "aw Shit here we go again",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gta-san-andreas-ah-shit-here-we-go-again.mp3"
  },
  {
    "name": "John pork is calling moooort",
    "color": "rgb(255, 93, 214)",
    "mp3": "/media/sounds/john-pork-is-calling-moooort.mp3"
  },
  {
    "name": "Water Droplet Drip",
    "color": "rgb(37, 113, 255)",
    "mp3": "/media/sounds/water-droplet-drip.mp3"
  },
  {
    "name": "Fuuuuh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fuuuuh.mp3"
  },
  {
    "name": "Munch (eating / biting)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/munch-sound-effect.mp3"
  },
  {
    "name": "EAGLE RAHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/eagle-rahhh.mp3"
  },
  {
    "name": "Cow Moo",
    "color": "rgb(204, 102, 255)",
    "mp3": "/media/sounds/cow-moo.mp3"
  },
  {
    "name": "за горами где е",
    "color": "rgb(17, 171, 27)",
    "mp3": "/media/sounds/za-gorami-gde-e.mp3"
  },
  {
    "name": "Why are you running?",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/why-are.mp3"
  },
  {
    "name": "ahh fresh meat pursuer",
    "color": "rgb(29, 255, 150)",
    "mp3": "/media/sounds/ahh-fresh-meat-pursuer.mp3"
  },
  {
    "name": "Бусик ТЦК",
    "color": "rgb(143, 0, 255)",
    "mp3": "/media/sounds/busik-ttsk.mp3"
  },
  {
    "name": "Drum Roll Sound Effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/drum-roll-gaming-sound-effect-hd.mp3"
  },
  {
    "name": "Ghostly sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ghostly-sound.mp3"
  },
  {
    "name": "what the hell (speed up)",
    "color": "rgb(108, 28, 132)",
    "mp3": "/media/sounds/what-the-hell-speed-up.mp3"
  },
  {
    "name": "help me!",
    "color": "rgb(173, 0, 0)",
    "mp3": "/media/sounds/2020-10-29-21-41-22.mp3"
  },
  {
    "name": "Minecraft Explosions",
    "color": "rgb(162, 92, 0)",
    "mp3": "/media/sounds/minecraft-explosion-green-screen.mp3"
  },
  {
    "name": "Animatronic in door",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/animatronic-in-door.mp3"
  },
  {
    "name": "Danger Siren Alarm",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/danger-siren-alarm_BfknMds.mp3"
  },
  {
    "name": "Snapchat message",
    "color": "rgb(255, 242, 1)",
    "mp3": "/media/sounds/snapchat-message.mp3"
  },
  {
    "name": "talking benn yes",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/talking-benn-yes.mp3"
  },
  {
    "name": "Discord Leaving",
    "color": "rgb(255, 51, 0)",
    "mp3": "/media/sounds/discord_leave_sound_effect_download.mp3"
  },
  {
    "name": "drive a funky ehhhh",
    "color": "rgb(70, 98, 204)",
    "mp3": "/media/sounds/drive-a-funky-ehhhh.mp3"
  },
  {
    "name": "Speedrun music",
    "color": "rgb(56, 255, 34)",
    "mp3": "/media/sounds/dreamrunning_trim-1.mp3"
  },
  {
    "name": "Come here boy",
    "color": "rgb(131, 79, 168)",
    "mp3": "/media/sounds/daequan-come-here-boy-sound-effect.mp3"
  },
  {
    "name": "DJ Stop",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dj-stop.mp3"
  },
  {
    "name": "2017 youtube background music LOW QUALITY",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/2017-youtube-background-music-low-quality.mp3"
  },
  {
    "name": "Dial Up Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dial_up.mp3"
  },
  {
    "name": "DJ Stop",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dj-stop.mp3"
  },
  {
    "name": "Sonic.EXE laugh",
    "color": "rgb(17, 45, 255)",
    "mp3": "/media/sounds/sonic-exe-laugh.mp3"
  },
  {
    "name": "VERY LOUD AIRHORN",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/veryloudairhorn.mp3"
  },
  {
    "name": "Kissing Sound",
    "color": "rgb(255, 0, 204)",
    "mp3": "/media/sounds/smoochykiss.mp3"
  },
  {
    "name": "You Need to Leave!",
    "color": "rgb(111, 59, 255)",
    "mp3": "/media/sounds/you-need-to-leave_wDmQeme.mp3"
  },
  {
    "name": "L theme death note",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/00000000000000000.mp3"
  },
  {
    "name": "crowd gasp",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gasp_SJHmiqB.mp3"
  },
  {
    "name": "Tom AAAAAAAAA scream",
    "color": "rgb(133, 133, 133)",
    "mp3": "/media/sounds/tom-scream.mp3"
  },
  {
    "name": "spongebob walk",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/spongebob-walk.mp3"
  },
  {
    "name": "Train horn meme",
    "color": "rgb(18, 164, 255)",
    "mp3": "/media/sounds/train-horn-meme_v6N3591.mp3"
  },
  {
    "name": "Ryan gosling burp",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ryan-gosling-burp.mp3"
  },
  {
    "name": "Deltarune Weapons Pull",
    "color": "rgb(0, 0, 255)",
    "mp3": "/media/sounds/deltarune-weapons-pull.mp3"
  },
  {
    "name": "FEIN FEIN FEIN FEIN",
    "color": "rgb(255, 154, 220)",
    "mp3": "/media/sounds/fein-fein-fein-fein.mp3"
  },
  {
    "name": "question mark",
    "color": "rgb(12, 89, 255)",
    "mp3": "/media/sounds/question-mark.mp3"
  },
  {
    "name": "Please Speed I Need This",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/please-speed-i-need-this.mp3"
  },
  {
    "name": "Roaring Knight Roar",
    "color": "rgb(46, 0, 0)",
    "mp3": "/media/sounds/roaring-knight-roar.mp3"
  },
  {
    "name": "Miau triste",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/miau-triste.mp3"
  },
  {
    "name": "gato riendo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gato-riendo_6bOc2ur.mp3"
  },
  {
    "name": "AAAAAAAA bird",
    "color": "rgb(33, 66, 255)",
    "mp3": "/media/sounds/aaaaaaaa-bird.mp3"
  },
  {
    "name": "aura of letter t",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aura-of-letter-t.mp3"
  },
  {
    "name": "Michael jackson WOOOW",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/wow_8.mp3"
  },
  {
    "name": "sonic rings falling",
    "color": "rgb(0, 51, 255)",
    "mp3": "/media/sounds/sonic-rings-drop.mp3"
  },
  {
    "name": "Adele- This is the end",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/ad.mp3"
  },
  {
    "name": "White tee RIZZ",
    "color": "rgb(227, 224, 255)",
    "mp3": "/media/sounds/white-tee-rizz_Pw3bPh4.mp3"
  },
  {
    "name": "ENNNNRIIIIQQQQUEEEEEEEE",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ennnnriiiiqqqqueeeeeeee.mp3"
  },
  {
    "name": "Lightskin Rizz (Sin City)",
    "color": "rgb(156, 153, 207)",
    "mp3": "/media/sounds/lightskin-rizz-sin-city.mp3"
  },
  {
    "name": "imagefriend",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/imagefriend.mp3"
  },
  {
    "name": "Perfect Street Fighter",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/perfect-street-fighter-sound-effect.mp3"
  },
  {
    "name": "TF2 Scout Metal Bat",
    "color": "rgb(0, 221, 255)",
    "mp3": "/media/sounds/bat_hit.mp3"
  },
  {
    "name": "Angry Birds Laugh",
    "color": "rgb(169, 0, 0)",
    "mp3": "/media/sounds/angry-birds-laugh.mp3"
  },
  {
    "name": "the rock sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-rock-sound-effect.mp3"
  },
  {
    "name": "meme violin (sad violin)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/meme-violin-sad-violin.mp3"
  },
  {
    "name": "Matrix song (verity)",
    "color": "rgb(251, 255, 122)",
    "mp3": "/media/sounds/matrix-song-verity.mp3"
  },
  {
    "name": "piuw",
    "color": "rgb(247, 255, 20)",
    "mp3": "/media/sounds/piuw.mp3"
  },
  {
    "name": "Welcome Home from Jarvis",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/welcome-home-from-jarvis.mp3"
  },
  {
    "name": "what a predictable creature flowery",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-a-predictable-creature-flowery.mp3"
  },
  {
    "name": "piuw",
    "color": "rgb(247, 255, 20)",
    "mp3": "/media/sounds/piuw.mp3"
  },
  {
    "name": "fart echo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fart-with-reverb_NcgStsA.mp3"
  },
  {
    "name": "Blood Splatter 2",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/blood-splatter-2.mp3"
  },
  {
    "name": "Nani FULL",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nani-meme-sound-effect.mp3"
  },
  {
    "name": "voce nao tem aura",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/voce-nao-tem-aura.mp3"
  },
  {
    "name": "Excuse me sir (Charlie's Inferno)",
    "color": "rgb(225, 157, 0)",
    "mp3": "/media/sounds/excuse-me-sir-charlies-inferno.mp3"
  },
  {
    "name": "yoshi tongue",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/yoshi-tongue.mp3"
  },
  {
    "name": "Lightsaber ON",
    "color": "rgb(0, 153, 255)",
    "mp3": "/media/sounds/lightsaber_02.mp3"
  },
  {
    "name": "Hey listen !",
    "color": "rgb(51, 153, 255)",
    "mp3": "/media/sounds/hey_listen.mp3"
  },
  {
    "name": "goofy slip",
    "color": "rgb(255, 100, 12)",
    "mp3": "/media/sounds/goofy-slip.mp3"
  },
  {
    "name": "FAAHHHHHH",
    "color": "rgb(0, 255, 251)",
    "mp3": "/media/sounds/faahhhhhh.mp3"
  },
  {
    "name": "Super Mario Beedoo",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/super-mario-beedoo_F3cwLoe.mp3"
  },
  {
    "name": "привет здоровяяяк",
    "color": "rgb(193, 255, 178)",
    "mp3": "/media/sounds/privet-zdoroviaiaiak_CiTiUIp.mp3"
  },
  {
    "name": "Apple pay original",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/apple-pay-original.mp3"
  },
  {
    "name": "Tik Tok India",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/panjabi-mc-mundian-tu-bach-ke-0s-16s-kfmq4pgaove_tjS6M4I.mp3"
  },
  {
    "name": "охаешечки даттебаешечки поанимешимся",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/okhaeshechki-dattebaeshechki-poanimeshimsia.mp3"
  },
  {
    "name": "Cash registere sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cash-register-sound-fx.mp3"
  },
  {
    "name": "Spongebob fog horn",
    "color": "rgb(69, 47, 9)",
    "mp3": "/media/sounds/spongebob-fog-horn.mp3"
  },
  {
    "name": "Nokia Kick Ringtone",
    "color": "rgb(148, 193, 60)",
    "mp3": "/media/sounds/nokia-kick-ringtone.mp3"
  },
  {
    "name": "B SWORD WOOSH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/woosh_s21KzKN.mp3"
  },
  {
    "name": "Pistol sound effect",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/pistol-sound-effect_zejYI9w.mp3"
  },
  {
    "name": "Roblox Death Sound Effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-death-sound-effect.mp3"
  },
  {
    "name": "PUM IMPACTO",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/pum-impacto.mp3"
  },
  {
    "name": "Du bist gut genug ringtone",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/du-bist-gut-genug-ringtone_UpW6m0q.mp3"
  },
  {
    "name": "Imposter Kill (Among Us)",
    "color": "rgb(219, 64, 64)",
    "mp3": "/media/sounds/stationary-kill_gDwMUvN.mp3"
  },
  {
    "name": "Raja gujjar",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/raja-gujjar.mp3"
  },
  {
    "name": "Old Minecraft Zombie Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/old-sound-of-zombie-in-minecraft.mp3"
  },
  {
    "name": "Clown Horn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/clown-horn-sound-effect_1.mp3"
  },
  {
    "name": "McDonalds Beeping Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mcdonalds-beeping-sound.mp3"
  },
  {
    "name": "Creeper Hiss",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/creeper.mp3"
  },
  {
    "name": "talking bennnn noo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/talking-bennnn-noo.mp3"
  },
  {
    "name": "nonono (Flowery)",
    "color": "rgb(251, 255, 14)",
    "mp3": "/media/sounds/nonono-flowery.mp3"
  },
  {
    "name": "N¡ğğa",
    "color": "rgb(203, 82, 255)",
    "mp3": "/media/sounds/n-gga_wVlfJQi.mp3"
  },
  {
    "name": "To be Continued (jojo)",
    "color": "rgb(204, 153, 51)",
    "mp3": "/media/sounds/untitled_1071.mp3"
  },
  {
    "name": "а да ну нафиг",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/a-da-nu-nafig.mp3"
  },
  {
    "name": "DEJA VU MEME",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/deja-vu.mp3"
  },
  {
    "name": "WTF BOOM!",
    "color": "rgb(255, 153, 204)",
    "mp3": "/media/sounds/wtf_boom.mp3"
  },
  {
    "name": "Тёмная ночь",
    "color": "rgb(7, 0, 0)",
    "mp3": "/media/sounds/tiomnaia-noch.mp3"
  },
  {
    "name": "SPONGEBOB A FEW MOMENTS LATER",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/a-few-moments-later-hd.mp3"
  },
  {
    "name": "HUH? Cat meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/huh-cat-meme.mp3"
  },
  {
    "name": "verity minecraft",
    "color": "rgb(255, 239, 0)",
    "mp3": "/media/sounds/verity-minecraft.mp3"
  },
  {
    "name": "scout scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/screaming-scout.mp3"
  },
  {
    "name": "combo sound 1",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/combo-sound-1.mp3"
  },
  {
    "name": "You Not Worthy Of My Nut",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/you-not-worthy-of-my-nut.mp3"
  },
  {
    "name": "Ki kore",
    "color": "rgb(255, 42, 42)",
    "mp3": "/media/sounds/ki-kore.mp3"
  },
  {
    "name": "You're taking too long",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/youre-taking-too-long.mp3"
  },
  {
    "name": "пх",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pkh.mp3"
  },
  {
    "name": "Hot damn young sheldon",
    "color": "rgb(207, 181, 124)",
    "mp3": "/media/sounds/hot-damn-young-sheldon.mp3"
  },
  {
    "name": "Censor Beep",
    "color": "rgb(153, 204, 0)",
    "mp3": "/media/sounds/censor-beep-7.mp3"
  },
  {
    "name": "Arkh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/arkh.mp3"
  },
  {
    "name": "horror scream high quality",
    "color": "rgb(15, 147, 255)",
    "mp3": "/media/sounds/horror-scream-high-quality.mp3"
  },
  {
    "name": "Rela no jacaré",
    "color": "rgb(22, 80, 255)",
    "mp3": "/media/sounds/rela-no-jacare.mp3"
  },
  {
    "name": "tenna talking",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tenna-talking.mp3"
  },
  {
    "name": "CID LE MDC",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cid-le-mdc.mp3"
  },
  {
    "name": "Eww brother eww",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/eww-brother-eww.mp3"
  },
  {
    "name": "Cute UwU",
    "color": "rgb(113, 32, 255)",
    "mp3": "/media/sounds/cute-uwu.mp3"
  },
  {
    "name": "oiia oiia Sound",
    "color": "rgb(136, 126, 36)",
    "mp3": "/media/sounds/oiia-oiia-sound.mp3"
  },
  {
    "name": "Miss!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/miss_2G4oN9I.mp3"
  },
  {
    "name": "Ayyy ayyy ayyy scream",
    "color": "rgb(79, 39, 39)",
    "mp3": "/media/sounds/ayyy-ayyy-ayyy-scream.mp3"
  },
  {
    "name": "FNaF Golden Freddy Scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/full-golden-freddy-scream.mp3"
  },
  {
    "name": "\"Jackpot\" -Hakari",
    "color": "rgb(69, 255, 113)",
    "mp3": "/media/sounds/jackpot-hakari.mp3"
  },
  {
    "name": "Tape Rewind",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/y2mate_S1LPbpU.mp3"
  },
  {
    "name": "shocking!",
    "color": "rgb(146, 239, 255)",
    "mp3": "/media/sounds/shocking_0NL2w3I.mp3"
  },
  {
    "name": "FINISH HIM!",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/finish-him.mp3"
  },
  {
    "name": "spongebob laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spongebob-laughing-sound-effect.mp3"
  },
  {
    "name": "LOUD ALARM",
    "color": "rgb(255, 11, 11)",
    "mp3": "/media/sounds/video0_k03U0Iy.mp3"
  },
  {
    "name": "Minecraft Drop Item/Block Sound Effect",
    "color": "rgb(8, 255, 25)",
    "mp3": "/media/sounds/minecraft-drop-block-sound-effect.mp3"
  },
  {
    "name": "Disconnect discord",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/y2mate_VKI8qDn.mp3"
  },
  {
    "name": "Звук удара по металу",
    "color": "rgb(26, 255, 0)",
    "mp3": "/media/sounds/zvuk-udara-po-metalu.mp3"
  },
  {
    "name": "Transition (whoosh)",
    "color": "rgb(48, 227, 255)",
    "mp3": "/media/sounds/transition-whoosh.mp3"
  },
  {
    "name": "He Needs Some Milk",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/he-needs-some-milk-vine.mp3"
  },
  {
    "name": "\"Jackpot\" -Hakari",
    "color": "rgb(69, 255, 113)",
    "mp3": "/media/sounds/jackpot-hakari.mp3"
  },
  {
    "name": "random.mp3",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/random-mp3.mp3"
  },
  {
    "name": "Windows 10 Error Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/windows-10-error-sound.mp3"
  },
  {
    "name": "Nahi nahi saluke yaha kuchh to gadbad hai",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nahi-nahi-saluke-yaha-kuchh-to-gadbad-hai.mp3"
  },
  {
    "name": "Susie Laugh",
    "color": "rgb(167, 0, 255)",
    "mp3": "/media/sounds/susie-laugh.mp3"
  },
  {
    "name": "Deltarune Battle Start Jingle",
    "color": "rgb(21, 21, 21)",
    "mp3": "/media/sounds/deltarune-battle-start-jingle.mp3"
  },
  {
    "name": "FIRE IN THE HOLE Geometry Dash",
    "color": "rgb(18, 255, 0)",
    "mp3": "/media/sounds/fire-in-the-hole-geometry-dash.mp3"
  },
  {
    "name": "Your dad's best friend - Deltarune Flowery",
    "color": "rgb(183, 255, 0)",
    "mp3": "/media/sounds/your-dads-best-friend-deltarune-flowery.mp3"
  },
  {
    "name": "от чекушки станет всем теплей фулл",
    "color": "rgb(215, 215, 215)",
    "mp3": "/media/sounds/ot-chekushki-stanet-vsem-teplei-full.mp3"
  },
  {
    "name": "Страные хлопки",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/stranye-khlopki.mp3"
  },
  {
    "name": "Verity (something)",
    "color": "rgb(255, 226, 0)",
    "mp3": "/media/sounds/verity-something.mp3"
  },
  {
    "name": "1738 song",
    "color": "rgb(223, 255, 219)",
    "mp3": "/media/sounds/1738-song.mp3"
  },
  {
    "name": "Kai Cenat Suspense",
    "color": "rgb(76, 61, 77)",
    "mp3": "/media/sounds/kai-cenat-suspense.mp3"
  },
  {
    "name": "Rahhh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rahhh.mp3"
  },
  {
    "name": "Slumber That Brother Gone",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/slumber-that-brother-gone-meme_pXziXJ1.mp3"
  },
  {
    "name": "Gta 5 Michael Ringtone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gta-5-michael-ringtone.mp3"
  },
  {
    "name": "3.2.1. Go",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/3-2-1-go-green-screen-footage-2xoehcl8evq.mp3"
  },
  {
    "name": "Oui - Rizzler",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oui-rizzler.mp3"
  },
  {
    "name": "Gerson Laugh",
    "color": "rgb(19, 143, 23)",
    "mp3": "/media/sounds/gerson-laugh.mp3"
  },
  {
    "name": "Spongebob disappointed",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/spongebob-disappointed-sound-effect.mp3"
  },
  {
    "name": "Jay you gotta move",
    "color": "rgb(255, 0, 28)",
    "mp3": "/media/sounds/jay-you-gotta-move.mp3"
  },
  {
    "name": "rip my granny she got hit by a bazooka",
    "color": "rgb(147, 255, 233)",
    "mp3": "/media/sounds/rip-my-granny-she-got-hit-by-a-bazooka.mp3"
  },
  {
    "name": "Bone crack meme",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/bone-crack-meme.mp3"
  },
  {
    "name": "ak47 loud",
    "color": "rgb(45, 58, 255)",
    "mp3": "/media/sounds/ak47-loud.mp3"
  },
  {
    "name": "Beatbox Verity",
    "color": "rgb(80, 147, 255)",
    "mp3": "/media/sounds/beatbox-verity.mp3"
  },
  {
    "name": "I always come back - ScrapTrap/William Afton",
    "color": "rgb(75, 159, 73)",
    "mp3": "/media/sounds/ialwayscomeback.mp3"
  },
  {
    "name": "Mouse Click",
    "color": "rgb(123, 57, 205)",
    "mp3": "/media/sounds/clicksoundeffect.mp3"
  },
  {
    "name": "Wrong lie incorrect buzzer",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wrong-lie-incorrect-buzzer.mp3"
  },
  {
    "name": "black suit spider man",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/black-suit-spider-man.mp3"
  },
  {
    "name": "MM2 Killing (stab)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mm2-killing-stab.mp3"
  },
  {
    "name": "Nintendo Game Boy Startup",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nintendo-game-boy-startup.mp3"
  },
  {
    "name": "HUNTER L4D",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/l4d-scream.mp3"
  },
  {
    "name": "GunShot FAHHHH",
    "color": "rgb(0, 255, 234)",
    "mp3": "/media/sounds/gunshot-fahhhh.mp3"
  },
  {
    "name": "tactical nuke incoming!!!",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/tactical-nuke.mp3"
  },
  {
    "name": "I will touch you verity",
    "color": "rgb(255, 204, 0)",
    "mp3": "/media/sounds/i-will-touch-you-verity.mp3"
  },
  {
    "name": "im spongebob",
    "color": "rgb(255, 221, 0)",
    "mp3": "/media/sounds/im-spongebob.mp3"
  },
  {
    "name": "Fart Sound Effect (From 21st Century Memes)",
    "color": "rgb(151, 42, 2)",
    "mp3": "/media/sounds/fart-meme-sound_qo90QRs.mp3"
  },
  {
    "name": "Mouse Click",
    "color": "rgb(123, 57, 205)",
    "mp3": "/media/sounds/clicksoundeffect.mp3"
  },
  {
    "name": "Sonic drown",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sonic-1-music-drownings.mp3"
  },
  {
    "name": "Angry Cat Meow",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/angry4.mp3"
  },
  {
    "name": "GunShot FAHHHH",
    "color": "rgb(0, 255, 234)",
    "mp3": "/media/sounds/gunshot-fahhhh.mp3"
  },
  {
    "name": "Depression indian !",
    "color": "rgb(64, 255, 254)",
    "mp3": "/media/sounds/depression-indian.mp3"
  },
  {
    "name": "FAIL SOUND MEME",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fail-sound-effect.mp3"
  },
  {
    "name": "песик песик ав ав ав",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pesik-pesik-av-av-av.mp3"
  },
  {
    "name": "Fahhhh",
    "color": "rgb(255, 105, 125)",
    "mp3": "/media/sounds/fahhhh.mp3"
  },
  {
    "name": "Som do Zap Zap estourado",
    "color": "rgb(3, 250, 63)",
    "mp3": "/media/sounds/som-do-zap-zap-estourado.mp3"
  },
  {
    "name": "Why do I hear boss music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/why-do-i-hear-boss-music.mp3"
  },
  {
    "name": "والخدمة الخدمة",
    "color": "rgb(227, 63, 255)",
    "mp3": "/media/sounds/wlkhdm-lkhdm.mp3"
  },
  {
    "name": "RAAAAH",
    "color": "rgb(255, 84, 84)",
    "mp3": "/media/sounds/raaaah.mp3"
  },
  {
    "name": "Ja-st kidding (Flowery)",
    "color": "rgb(145, 255, 0)",
    "mp3": "/media/sounds/ja-st-kidding-flowery.mp3"
  },
  {
    "name": "Fire Whoosh",
    "color": "rgb(238, 228, 23)",
    "mp3": "/media/sounds/fire-whoosh.mp3"
  },
  {
    "name": "YEET",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yeet-sound-effect.mp3"
  },
  {
    "name": "Glass Breaking",
    "color": "rgb(0, 51, 153)",
    "mp3": "/media/sounds/broken-glass-sound-effect-high-quality.mp3"
  },
  {
    "name": "Chaloo",
    "color": "rgb(100, 234, 46)",
    "mp3": "/media/sounds/chaloo.mp3"
  },
  {
    "name": "Coin Mario",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/super-mario-coin-sound.mp3"
  },
  {
    "name": "NO GOD! PLEASE NO!!! NOOOOOOOO",
    "color": "rgb(0, 0, 153)",
    "mp3": "/media/sounds/no-god-please-no-noooooooooo.mp3"
  },
  {
    "name": "cod zombie scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/img_6228.mp3"
  },
  {
    "name": "Rust Headshot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/eaolwpzhgsba.mp3"
  },
  {
    "name": "La peace",
    "color": "rgb(227, 110, 255)",
    "mp3": "/media/sounds/la-peace.mp3"
  },
  {
    "name": "Flowery SorryToKeepYouWaiting!",
    "color": "rgb(255, 254, 36)",
    "mp3": "/media/sounds/flowery-sorrytokeepyouwaiting.mp3"
  },
  {
    "name": "iCarly Cheers",
    "color": "rgb(39, 248, 255)",
    "mp3": "/media/sounds/icarly-cheers.mp3"
  },
  {
    "name": "Enemy Spotted",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/counter-strike-jingle-cs-radio-enemy-spotted.mp3"
  },
  {
    "name": "Rock sliding",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rock-sliding.mp3"
  },
  {
    "name": "Сендвич со Спущенкой",
    "color": "rgb(255, 251, 214)",
    "mp3": "/media/sounds/sendvich-so-spushchenkoi.mp3"
  },
  {
    "name": "Coffin Dance Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/y2mate-mp3cut_sRzY6rh.mp3"
  },
  {
    "name": "Your phone ringing.",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/your-phone-ringing_7GRrjzM.mp3"
  },
  {
    "name": "WOW! (Happy - Fairy Tail)",
    "color": "rgb(0, 102, 204)",
    "mp3": "/media/sounds/wow_2.mp3"
  },
  {
    "name": "Kirby falling",
    "color": "rgb(255, 40, 215)",
    "mp3": "/media/sounds/kirby-falling.mp3"
  },
  {
    "name": "om nom nom roblox",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-eating-sound-effect-nom-nom-nom.mp3"
  },
  {
    "name": "Cash Register",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/audiojoiner120623175716.mp3"
  },
  {
    "name": "Cartoon Hammer",
    "color": "rgb(235, 255, 71)",
    "mp3": "/media/sounds/cartoon-hammer.mp3"
  },
  {
    "name": "'What'meme",
    "color": "rgb(112, 237, 205)",
    "mp3": "/media/sounds/what_JOcN7Y8.mp3"
  },
  {
    "name": "'What'meme",
    "color": "rgb(112, 237, 205)",
    "mp3": "/media/sounds/what_JOcN7Y8.mp3"
  },
  {
    "name": "1,000,000,000 IQ",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/1-000-000-000-iq.mp3"
  },
  {
    "name": "E o pix? Nada ainda?",
    "color": "rgb(243, 255, 79)",
    "mp3": "/media/sounds/e-o-pix-nada-ainda.mp3"
  },
  {
    "name": "Big fart",
    "color": "rgb(153, 51, 0)",
    "mp3": "/media/sounds/faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaart.mp3"
  },
  {
    "name": "Android Notification Bass Boosted",
    "color": "rgb(0, 255, 9)",
    "mp3": "/media/sounds/android-sound-effect-meme_tcbuori.mp3"
  },
  {
    "name": "You stupid n",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/you-stupid-n_Pa8zoCL.mp3"
  },
  {
    "name": "Are you serious right neow bro",
    "color": "rgb(138, 61, 61)",
    "mp3": "/media/sounds/are-you-serious-right-neow-bro.mp3"
  },
  {
    "name": "Crickets",
    "color": "rgb(51, 153, 0)",
    "mp3": "/media/sounds/crickets.swf.mp3"
  },
  {
    "name": "Oh brother this guy STINKS spongebob",
    "color": "rgb(44, 149, 255)",
    "mp3": "/media/sounds/oh-brother-this-guy-stinks_FFdigtm.mp3"
  },
  {
    "name": "cod zombies scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/call-of-duty-zombie-yell-meme-sound-effect.mp3"
  },
  {
    "name": "Clicker Training Button",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/clicker-training-button.mp3"
  },
  {
    "name": "La peace",
    "color": "rgb(227, 110, 255)",
    "mp3": "/media/sounds/la-peace.mp3"
  },
  {
    "name": "Wet Slow Fart",
    "color": "rgb(129, 105, 64)",
    "mp3": "/media/sounds/fartmemereloaded.mp3"
  },
  {
    "name": "Correct Ping",
    "color": "rgb(54, 255, 32)",
    "mp3": "/media/sounds/ding-sound-effect_1_CVUaI0C.mp3"
  },
  {
    "name": "Alexis Texas",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/alexis-texas.mp3"
  },
  {
    "name": "Old Church Bell Meme",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/old-church-bell-meme.mp3"
  },
  {
    "name": "Pizza Tower Taunt",
    "color": "rgb(255, 38, 0)",
    "mp3": "/media/sounds/sfx_taunt.mp3"
  },
  {
    "name": "Nintendo Switch Click",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/switch-sound.mp3"
  },
  {
    "name": "ILARI ILARI ILARIÊ TROLL",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/ilari-ilari-ilarie-troll.mp3"
  },
  {
    "name": "Нет иди на...",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/net-idi-na.mp3"
  },
  {
    "name": "TF2 - Frying Pan",
    "color": "rgb(51, 51, 51)",
    "mp3": "/media/sounds/melee_frying_pan_01.mp3"
  },
  {
    "name": "Avengers MCU Melody",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/avengers_.mp3"
  },
  {
    "name": "bfdi scream",
    "color": "rgb(103, 255, 141)",
    "mp3": "/media/sounds/the_bfdi_scream.mp3"
  },
  {
    "name": "Gojo domain expansion",
    "color": "rgb(217, 202, 255)",
    "mp3": "/media/sounds/rpreplay_final1623689697_mov.mp3"
  },
  {
    "name": "Hey guys, I think I found a glue!",
    "color": "rgb(255, 228, 16)",
    "mp3": "/media/sounds/hey-guys-i-think-i-found-a-glue.mp3"
  },
  {
    "name": "TV Static",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/tv-static-01.mp3"
  },
  {
    "name": "Ultra Instinct",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ultra-instinct-theme-official-version.mp3"
  },
  {
    "name": "Love Island Text",
    "color": "rgb(184, 255, 42)",
    "mp3": "/media/sounds/yt1s_cizemWX.mp3"
  },
  {
    "name": "Deltarune Queen Laugh",
    "color": "rgb(10, 255, 231)",
    "mp3": "/media/sounds/deltarune-queen-laugh.mp3"
  },
  {
    "name": "1500 es hora y media",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/1500-es-hora-y-media.mp3"
  },
  {
    "name": "R2D2 SCREAM",
    "color": "rgb(0, 0, 204)",
    "mp3": "/media/sounds/r2d2_scream_converted.mp3"
  },
  {
    "name": "Fortnite Default Dance Music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite-dance-moves-emote-music-tv9iv8cxmo0-1.mp3"
  },
  {
    "name": "angry birds theme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/angry-birds-theme-song-audiotrimmer.mp3"
  },
  {
    "name": "Cartoon Mr. Krab Walking",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon-mr-krab-walking.mp3"
  },
  {
    "name": "Zelda Secret S",
    "color": "rgb(0, 164, 74)",
    "mp3": "/media/sounds/ringtones-zelda-1.mp3"
  },
  {
    "name": "Bad joke (drums)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bad-joke-drums.mp3"
  },
  {
    "name": "1500 es hora y media",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/1500-es-hora-y-media.mp3"
  },
  {
    "name": "Call me a good boy",
    "color": "rgb(255, 145, 180)",
    "mp3": "/media/sounds/call-me-a-good-boy.mp3"
  },
  {
    "name": "Love Island Text",
    "color": "rgb(184, 255, 42)",
    "mp3": "/media/sounds/yt1s_cizemWX.mp3"
  },
  {
    "name": "RONALDO SIUUUU",
    "color": "rgb(46, 138, 255)",
    "mp3": "/media/sounds/ronaldo-siuuuu.mp3"
  },
  {
    "name": "bmw check ошибка",
    "color": "rgb(255, 120, 0)",
    "mp3": "/media/sounds/bmw-check-oshibka.mp3"
  },
  {
    "name": "La peace",
    "color": "rgb(227, 110, 255)",
    "mp3": "/media/sounds/la-peace.mp3"
  },
  {
    "name": "*Click* Nice",
    "color": "rgb(102, 102, 102)",
    "mp3": "/media/sounds/nioce.mp3"
  },
  {
    "name": "TV Static",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/tv-static-01.mp3"
  },
  {
    "name": "Noooo!",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/nooo.swf.mp3"
  },
  {
    "name": "JAWS THEME",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jaws-theme_TDORPKA.mp3"
  },
  {
    "name": "Steam Achievement",
    "color": "rgb(48, 215, 255)",
    "mp3": "/media/sounds/steam-achievement.mp3"
  },
  {
    "name": "Cartoon Mr. Krab Walking",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon-mr-krab-walking.mp3"
  },
  {
    "name": "AW HELL NAH MAN",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aw-hell-nah-man.mp3"
  },
  {
    "name": "noelle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/noelle.mp3"
  },
  {
    "name": "miguel o'harris (spider-man 2099)",
    "color": "rgb(21, 32, 157)",
    "mp3": "/media/sounds/miguel-oharris-spider-man-2099.mp3"
  },
  {
    "name": "Netflix intro",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nouveau-jingle-netflix.mp3"
  },
  {
    "name": "Slap! AHH!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/slap-ahh.mp3"
  },
  {
    "name": "Godzilla Atomic Breath - Fast Charge",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dragon-breath.mp3"
  },
  {
    "name": "sans voice",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/voice_sans.mp3"
  },
  {
    "name": "Classic Batman Transition",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/batman-transition-download-sound-link.mp3"
  },
  {
    "name": "oh my pc meme",
    "color": "rgb(114, 53, 255)",
    "mp3": "/media/sounds/oh-my-pc-meme.mp3"
  },
  {
    "name": "Respect +++",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gta-san-andreas-abertura-oficial.mp3"
  },
  {
    "name": "GMod ragdoll impact sounds",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpl0bxqky_.mp3"
  },
  {
    "name": "Cartoon Slip and Fall",
    "color": "rgb(204, 255, 51)",
    "mp3": "/media/sounds/slipandfall.mp3"
  },
  {
    "name": "Final Fantasy Victory Fanfare",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/final-fantasy-vii-victory-fanfare-1.mp3"
  },
  {
    "name": "I'm fast as f boi",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-fast-as-f-boi.mp3"
  },
  {
    "name": "discord cat scream",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/discord-cat-scream.mp3"
  },
  {
    "name": "Youtube subscribe and like bell sound",
    "color": "rgb(68, 162, 255)",
    "mp3": "/media/sounds/youtube-subscribe-and-like-bell-sound.mp3"
  },
  {
    "name": "instant transmission",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/dragon_ball_z_tele.mp3"
  },
  {
    "name": "Fortnite Default Dance Music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite-dance-moves-emote-music-tv9iv8cxmo0-1.mp3"
  },
  {
    "name": "Vine Boom HQ (Longer)",
    "color": "rgb(101, 0, 0)",
    "mp3": "/media/sounds/vine-boom-hq-longer.mp3"
  },
  {
    "name": "skibidi toilet",
    "color": "rgb(226, 247, 255)",
    "mp3": "/media/sounds/skibidi-toilet.mp3"
  },
  {
    "name": "Chick Fila HELP ME HELLLLP (just help)",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/chick-fila-help-me-hellllp-just-help.mp3"
  },
  {
    "name": "3 layer dip stack",
    "color": "rgb(255, 102, 102)",
    "mp3": "/media/sounds/3-layer-dip-stack.mp3"
  },
  {
    "name": "OMG IM COMING",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/omg-im-coming.mp3"
  },
  {
    "name": "Kid Slap *oh*",
    "color": "rgb(255, 15, 27)",
    "mp3": "/media/sounds/kid-slap-oh.mp3"
  },
  {
    "name": "GTA V Wasted (Death Sound)",
    "color": "rgb(219, 0, 0)",
    "mp3": "/media/sounds/gta-v-wasted-death-sound.mp3"
  },
  {
    "name": "Yesss king",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yesss-king.mp3"
  },
  {
    "name": "fighting sound effect",
    "color": "rgb(40, 83, 255)",
    "mp3": "/media/sounds/fighting-sound-effect.mp3"
  },
  {
    "name": "creeper explosion minecraft",
    "color": "rgb(93, 255, 75)",
    "mp3": "/media/sounds/creeper-explosion.mp3"
  },
  {
    "name": "carlos gritando",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/carlos-gritando_Yg2jdyF.mp3"
  },
  {
    "name": "Shotgun Pump Reload",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/12g-pumpfull.mp3"
  },
  {
    "name": "flowery one more for the fans",
    "color": "rgb(242, 255, 0)",
    "mp3": "/media/sounds/flowery-one-more-for-the-fans.mp3"
  },
  {
    "name": "undertale - sans talking",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/just-sans-talking.mp3"
  },
  {
    "name": "Knocked Player Fortnite",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ui-negative-alert.mp3"
  },
  {
    "name": "The Rake Scream",
    "color": "rgb(217, 215, 158)",
    "mp3": "/media/sounds/the-rake-scream.mp3"
  },
  {
    "name": "jet set radio spray 1",
    "color": "rgb(246, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-spray-1_4CFwPkb.mp3"
  },
  {
    "name": "OHHHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rap.mp3"
  },
  {
    "name": "vine boom sound meme",
    "color": "rgb(167, 140, 255)",
    "mp3": "/media/sounds/vine-boom-sound-meme.mp3"
  },
  {
    "name": "TU TU TU DU MAX VERSTAPPEN",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tu-tu-tu-du-max-verstappen.mp3"
  },
  {
    "name": "Gotcha Bit** by Dave Chapelle",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/gotcha-bit-by-dave-chapelle.mp3"
  },
  {
    "name": "Reverse sound effect",
    "color": "rgb(26, 109, 255)",
    "mp3": "/media/sounds/reverse-sound-effect.mp3"
  },
  {
    "name": "Verity (shut up)",
    "color": "rgb(255, 63, 49)",
    "mp3": "/media/sounds/verity-shut-up.mp3"
  },
  {
    "name": "NFL theme song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nfl-theme-song-hq-mp3cut_yjEDUm1.mp3"
  },
  {
    "name": "Teleport sound",
    "color": "rgb(102, 204, 255)",
    "mp3": "/media/sounds/dbz-teleport.mp3"
  },
  {
    "name": "Knuckles-Oh No",
    "color": "rgb(204, 51, 0)",
    "mp3": "/media/sounds/oh_no_1.mp3"
  },
  {
    "name": "Censor Beep 2",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/censor-beep-2.mp3"
  },
  {
    "name": "Meme Click",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/meme-click.mp3"
  },
  {
    "name": "Spiderman 2099 theme",
    "color": "rgb(255, 9, 9)",
    "mp3": "/media/sounds/spiderman-2099-theme.mp3"
  },
  {
    "name": "ay ay ay im ur little butterfly",
    "color": "rgb(255, 57, 156)",
    "mp3": "/media/sounds/9convert_9f6OCue.mp3"
  },
  {
    "name": "Sharingan",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/collen-eyes-efect.mp3"
  },
  {
    "name": "romantic",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/45_0HW2p0x.mp3"
  },
  {
    "name": "sus clapping4",
    "color": "rgb(252, 255, 102)",
    "mp3": "/media/sounds/sus-clapping4.mp3"
  },
  {
    "name": "Смешарики Погоня",
    "color": "rgb(0, 81, 255)",
    "mp3": "/media/sounds/smeshariki-pogonia.mp3"
  },
  {
    "name": "Omni man are you sure",
    "color": "rgb(48, 186, 255)",
    "mp3": "/media/sounds/omni-man-are-you-sure.mp3"
  },
  {
    "name": "Okay let’s go",
    "color": "rgb(14, 174, 255)",
    "mp3": "/media/sounds/meme-okay-lets-go.mp3"
  },
  {
    "name": "Last Jarona!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/last-jarona_SkKPLSf.mp3"
  },
  {
    "name": "Fart Beat by ItsJerryAndHarry",
    "color": "rgb(204, 51, 0)",
    "mp3": "/media/sounds/jerry-farts-united-clean-loop-original-3_48-hd-by-jtf-entertainment.mp3"
  },
  {
    "name": "dear basketball",
    "color": "rgb(255, 157, 0)",
    "mp3": "/media/sounds/dear-basketball.mp3"
  },
  {
    "name": "Stop the Cap",
    "color": "rgb(79, 255, 211)",
    "mp3": "/media/sounds/zias-stop-the-cap_RjHQpxU.mp3"
  },
  {
    "name": "blink",
    "color": "rgb(220, 255, 219)",
    "mp3": "/media/sounds/blink_FNZ3zVv.mp3"
  },
  {
    "name": "Keemstar Screaming",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/keemstar-screaming.mp3"
  },
  {
    "name": "Смешарики Погоня",
    "color": "rgb(0, 81, 255)",
    "mp3": "/media/sounds/smeshariki-pogonia.mp3"
  },
  {
    "name": "Enrique (slowed)",
    "color": "rgb(244, 11, 11)",
    "mp3": "/media/sounds/enrique-slowed.mp3"
  },
  {
    "name": "Stop the Cap",
    "color": "rgb(79, 255, 211)",
    "mp3": "/media/sounds/zias-stop-the-cap_RjHQpxU.mp3"
  },
  {
    "name": "Mario Star Power",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/super-mario-bros-nes-music-star-theme-cut-mp3.mp3"
  },
  {
    "name": "blink",
    "color": "rgb(220, 255, 219)",
    "mp3": "/media/sounds/blink_FNZ3zVv.mp3"
  },
  {
    "name": "THE LOUDEST NOISE EVER!",
    "color": "rgb(255, 247, 246)",
    "mp3": "/media/sounds/the-loudest-noise-ever.mp3"
  },
  {
    "name": "Jew Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jew-meme_xllftoz.mp3"
  },
  {
    "name": "Pufferfish",
    "color": "rgb(255, 229, 170)",
    "mp3": "/media/sounds/aaughmp3.mp3"
  },
  {
    "name": "ROBLOX bass sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bass_vCrw3wU.mp3"
  },
  {
    "name": "Neegy",
    "color": "rgb(113, 205, 255)",
    "mp3": "/media/sounds/neegy_ggMKjze.mp3"
  },
  {
    "name": "yay roblox",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yay-roblox.mp3"
  },
  {
    "name": "Party Horn thing",
    "color": "rgb(255, 51, 51)",
    "mp3": "/media/sounds/partyblower.mp3"
  },
  {
    "name": "Alarma de Auron play",
    "color": "rgb(46, 255, 133)",
    "mp3": "/media/sounds/alarma-de-auron-play.mp3"
  },
  {
    "name": "I’m bout to cuh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-bout-to-cuh.mp3"
  },
  {
    "name": "MUSICA DE SIGMA ESTOURADO",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/musica-de-sigma-estourado.mp3"
  },
  {
    "name": "fortnite pump shotgun",
    "color": "rgb(81, 255, 41)",
    "mp3": "/media/sounds/fortnite-pump-shotgun.mp3"
  },
  {
    "name": "OOOH MY GOD",
    "color": "rgb(12, 255, 44)",
    "mp3": "/media/sounds/oooh-my-god-vine-mp3cut.mp3"
  },
  {
    "name": "cyberpunk message",
    "color": "rgb(7, 15, 255)",
    "mp3": "/media/sounds/cyberpunk-message.mp3"
  },
  {
    "name": "Its me, Flowery",
    "color": "rgb(255, 251, 4)",
    "mp3": "/media/sounds/its-me-flowery.mp3"
  },
  {
    "name": "woosh sound effect",
    "color": "rgb(159, 152, 149)",
    "mp3": "/media/sounds/woosh-sound-effect.mp3"
  },
  {
    "name": "Cartoon elephant sound",
    "color": "rgb(118, 110, 92)",
    "mp3": "/media/sounds/cartoon-elephant-sound.mp3"
  },
  {
    "name": "Nuke Bomb!",
    "color": "rgb(255, 119, 8)",
    "mp3": "/media/sounds/nuke-bomb.mp3"
  },
  {
    "name": "Discord_Ping",
    "color": "rgb(68, 102, 255)",
    "mp3": "/media/sounds/y2mate_rQlfs1Y.mp3"
  },
  {
    "name": "Godzilla Roar 2",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/godzilla_2.mp3"
  },
  {
    "name": "Twitch Alert",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/for-inspiration-twitch_hitbox-alert-sound-normal-donation-sound-youtube.mp3"
  },
  {
    "name": "Say wallahi bro",
    "color": "rgb(88, 70, 40)",
    "mp3": "/media/sounds/say-wallahi-bro_egHVr2Y.mp3"
  },
  {
    "name": "bye bye mewing",
    "color": "rgb(35, 26, 255)",
    "mp3": "/media/sounds/bye-bye-mewing_fMVssQz.mp3"
  },
  {
    "name": "Fnaf Freddy’s laugh",
    "color": "rgb(105, 37, 37)",
    "mp3": "/media/sounds/fnaf-freddys-laugh.mp3"
  },
  {
    "name": "Singing Angels",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/angels-singing.mp3"
  },
  {
    "name": "Mario - Power Up",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/01-power-up-mario.mp3"
  },
  {
    "name": "A-Train zoom",
    "color": "rgb(0, 14, 214)",
    "mp3": "/media/sounds/a-train-zoom.mp3"
  },
  {
    "name": "And his name is John Cena",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/and-his-name-is-john-cena.mp3"
  },
  {
    "name": "(mafioso) scream",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/mafioso-scream.mp3"
  },
  {
    "name": "Hell nah (dog)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hell-nah-dog_lU72pEf.mp3"
  },
  {
    "name": "Wega Jumpscare",
    "color": "rgb(103, 1, 161)",
    "mp3": "/media/sounds/wega-jumpscare.mp3"
  },
  {
    "name": "Hell Naw Dog",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hell-naw-dog.mp3"
  },
  {
    "name": "AIIII AIII AIIII",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aiiii-aiii-aiiii.mp3"
  },
  {
    "name": "EXPLODED",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/exploded_zfp5Xgm.mp3"
  },
  {
    "name": "I think I just busted",
    "color": "rgb(178, 249, 255)",
    "mp3": "/media/sounds/i-think-i-just-busted.mp3"
  },
  {
    "name": "Рингтон Франклина ГТА 5",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rington-franklina-gta-5.mp3"
  },
  {
    "name": "Record Scratch",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/record-scratch.mp3"
  },
  {
    "name": "Nokia Arabic Ringstone",
    "color": "rgb(144, 251, 255)",
    "mp3": "/media/sounds/nokia-ringtone-arabic.mp3"
  },
  {
    "name": "Pirates Of The Carribean!!!",
    "color": "rgb(220, 222, 0)",
    "mp3": "/media/sounds/pirates-mp3cut_xxOvJfH.mp3"
  },
  {
    "name": "screaming emoji meme",
    "color": "rgb(255, 179, 44)",
    "mp3": "/media/sounds/screaming-emoji-meme.mp3"
  },
  {
    "name": "I feel like you dont love me as much as I do :(",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-feel-like-you-dont-love-me-as-much-as-i-do.mp3"
  },
  {
    "name": "toilet sounds",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/video0_czt1xZo.mp3"
  },
  {
    "name": "cooked dog meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cooked-dog-meme.mp3"
  },
  {
    "name": "Koun hai re",
    "color": "rgb(79, 184, 255)",
    "mp3": "/media/sounds/koun-hai-re_8ep4nAR.mp3"
  },
  {
    "name": "You Stupid",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ustoopid.mp3"
  },
  {
    "name": "YOU NEED TO LEAVE",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/you-need-to-leave.mp3"
  },
  {
    "name": "FAHHHH 2",
    "color": "rgb(100, 38, 255)",
    "mp3": "/media/sounds/fahhhh-2.mp3"
  },
  {
    "name": "Dinosaur rawr!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dinosaur-rawr.mp3"
  },
  {
    "name": "Round One Fight",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mortal-kombat-9-sound-drop-round-1-fight.mp3"
  },
  {
    "name": "Лучший рингтон на телефон.",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/luchshii-rington-na-telefon.mp3"
  },
  {
    "name": "Seatbelts Everyone!",
    "color": "rgb(255, 225, 33)",
    "mp3": "/media/sounds/seatbelts-everyone.mp3"
  },
  {
    "name": "BMW Chime",
    "color": "rgb(30, 117, 255)",
    "mp3": "/media/sounds/bmw-bong.mp3"
  },
  {
    "name": "Пердуляция",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/perduliatsiia.mp3"
  },
  {
    "name": "Screaming Sheep",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/01-the-screaming-sheep.mp3"
  },
  {
    "name": "luigis mansion ringtone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/luigis-mansion-ringtone.mp3"
  },
  {
    "name": "Chomp",
    "color": "rgb(255, 241, 49)",
    "mp3": "/media/sounds/chomp-1.mp3"
  },
  {
    "name": "Cid ACP MC",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cid-acp-mc.mp3"
  },
  {
    "name": "discord nofications",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discord-nofications.mp3"
  },
  {
    "name": "LEGO DIE",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lego-die.mp3"
  },
  {
    "name": "Gong Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/asian-gong.mp3"
  },
  {
    "name": "Undertale - Omega Flowey Laugh",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/00002a5b.mp3"
  },
  {
    "name": "slap sound effect funny memes",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/slap-sound-effect-funny-memes.mp3"
  },
  {
    "name": "man screaming",
    "color": "rgb(217, 255, 57)",
    "mp3": "/media/sounds/man-screaming.mp3"
  },
  {
    "name": "Gémissements 250",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gemissements-250.mp3"
  },
  {
    "name": "fnaf2 ambience",
    "color": "rgb(54, 54, 54)",
    "mp3": "/media/sounds/fnaf2-ambience.mp3"
  },
  {
    "name": "Zelda chest opening",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zelda-chest-opening-and-item-catch.mp3"
  },
  {
    "name": "Movie Fart!",
    "color": "rgb(15, 59, 3)",
    "mp3": "/media/sounds/fart-sound-effect_C1IXpeL.mp3"
  },
  {
    "name": "jet set radio spray full",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-spray-full_DP2X9GC.mp3"
  },
  {
    "name": "jet set radio spray full",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-spray-full_DP2X9GC.mp3"
  },
  {
    "name": "Enrique + Fart + Super Slowed",
    "color": "rgb(255, 102, 214)",
    "mp3": "/media/sounds/enrique-fart-super-slowed.mp3"
  },
  {
    "name": "We Got Him Meme Song Loud",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ladies-and-gentlemen-we-got-him-song.mp3"
  },
  {
    "name": "COD Zombies Evil Laugh",
    "color": "rgb(0, 108, 13)",
    "mp3": "/media/sounds/cod-zombies-evil-laugh.mp3"
  },
  {
    "name": "Why are you gay?",
    "color": "rgb(163, 51, 255)",
    "mp3": "/media/sounds/why-are-you-gay_NrNcI9N.mp3"
  },
  {
    "name": "Flashback",
    "color": "rgb(20, 255, 0)",
    "mp3": "/media/sounds/flashback-sound-effect_3McGd4q.mp3"
  },
  {
    "name": "musica triste meme",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpq7mpzzl9.mp3"
  },
  {
    "name": "PS2 Startup",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ps2_start_up.mp3"
  },
  {
    "name": "AUGHHHHH... AUGHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aughhhhh-aughhhhh.mp3"
  },
  {
    "name": "luigis mansion ringtone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/luigis-mansion-ringtone.mp3"
  },
  {
    "name": "Nice shot! Wii Sports",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nice-shot-wii-sports_DJJ0VOz.mp3"
  },
  {
    "name": "Twitch Default Alert",
    "color": "rgb(0, 255, 170)",
    "mp3": "/media/sounds/default_eKkIk7O.mp3"
  },
  {
    "name": "Zeep Glorp (green alien cat meme)",
    "color": "rgb(121, 255, 38)",
    "mp3": "/media/sounds/zeep-glorp-green-alien-cat-meme.mp3"
  },
  {
    "name": "В камине в 6 утра",
    "color": "rgb(255, 156, 39)",
    "mp3": "/media/sounds/v-kamine-v-6-utra.mp3"
  },
  {
    "name": "FAAAAAAAAAAAAAAAAAAh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/faaaaaaaaaaaaaaaaaah.mp3"
  },
  {
    "name": "NOW'S YOUR CHANCE TO BE A BIG SHOT",
    "color": "rgb(246, 255, 0)",
    "mp3": "/media/sounds/nows-your-chance-to-be-a-big-shot.mp3"
  },
  {
    "name": "Du bist gut genug!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/du-bist-gut-genug_5d9IXZw.mp3"
  },
  {
    "name": "Gary Meow",
    "color": "rgb(8, 214, 163)",
    "mp3": "/media/sounds/gary_meow.mp3"
  },
  {
    "name": "Hi my name is Tom Pearl",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hi-my-name-is-tom-pearl.mp3"
  },
  {
    "name": "daisy bell creepy version",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/daisy-bell-creepy-version.mp3"
  },
  {
    "name": "Ruko jara",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmp_z5b93np.mp3"
  },
  {
    "name": "Tienes un mensajeee!!!",
    "color": "rgb(66, 233, 255)",
    "mp3": "/media/sounds/tienes-un-mensajeee.mp3"
  },
  {
    "name": "LEGO DIE",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lego-die.mp3"
  },
  {
    "name": "Undertale - Omega Flowey Laugh",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/00002a5b.mp3"
  },
  {
    "name": "Mario kart start race",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mariostart.mp3"
  },
  {
    "name": "Zelda chest opening",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zelda-chest-opening-and-item-catch.mp3"
  },
  {
    "name": "Lightning strike cool",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lightning-strike-cool.mp3"
  },
  {
    "name": "teto.wav",
    "color": "rgb(255, 41, 84)",
    "mp3": "/media/sounds/teto-wav.mp3"
  },
  {
    "name": "Low Health / Critical Health Pokémon",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/low-health-critical-health-pokemon.mp3"
  },
  {
    "name": "SEGA! (HD)",
    "color": "rgb(0, 19, 255)",
    "mp3": "/media/sounds/sega-hd.mp3"
  },
  {
    "name": "HELLO MOTO ESTOURADO",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/hello-moto-estourado.mp3"
  },
  {
    "name": "Tom and jerry scream",
    "color": "rgb(145, 255, 126)",
    "mp3": "/media/sounds/ow2-online-audio-converter.mp3"
  },
  {
    "name": "ам ам ам",
    "color": "rgb(38, 255, 45)",
    "mp3": "/media/sounds/am-am-am.mp3"
  },
  {
    "name": "Enrique (sped up)",
    "color": "rgb(0, 255, 42)",
    "mp3": "/media/sounds/enrique-sped-up.mp3"
  },
  {
    "name": "daisy bell",
    "color": "rgb(116, 253, 223)",
    "mp3": "/media/sounds/daisy-bell.mp3"
  },
  {
    "name": "Animal Crossing Isabelle Voice",
    "color": "rgb(243, 255, 75)",
    "mp3": "/media/sounds/animal-crossing-isabelle-voice-clips-no-background-music-youtubemp3free.mp3"
  },
  {
    "name": "Du bist gut genug!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/du-bist-gut-genug_5d9IXZw.mp3"
  },
  {
    "name": "teto.wav",
    "color": "rgb(255, 41, 84)",
    "mp3": "/media/sounds/teto-wav.mp3"
  },
  {
    "name": "Enrique (sped up)",
    "color": "rgb(0, 255, 42)",
    "mp3": "/media/sounds/enrique-sped-up.mp3"
  },
  {
    "name": "Animal hospital talk",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/animal-hospital-talk.mp3"
  },
  {
    "name": "rust c4",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rust-c4.mp3"
  },
  {
    "name": "Undertale - Damage Taken",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/undertale-damage-taken.mp3"
  },
  {
    "name": "SEGA! (HD)",
    "color": "rgb(0, 19, 255)",
    "mp3": "/media/sounds/sega-hd.mp3"
  },
  {
    "name": "vsauce",
    "color": "rgb(57, 255, 136)",
    "mp3": "/media/sounds/jake-chudnow-edited_y1t8j5q.mp3"
  },
  {
    "name": "ам ам ам",
    "color": "rgb(38, 255, 45)",
    "mp3": "/media/sounds/am-am-am.mp3"
  },
  {
    "name": "Lend me your power! (Flowery)",
    "color": "rgb(255, 230, 0)",
    "mp3": "/media/sounds/lend-me-your-power-flowery.mp3"
  },
  {
    "name": "Windows XP ERROR Song",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/windows-xp-error-song-edited-by-dj-cobaltsteel-77.mp3"
  },
  {
    "name": "OH MA GAUD VINE",
    "color": "rgb(181, 239, 255)",
    "mp3": "/media/sounds/oh-ma-gaud-vine.mp3"
  },
  {
    "name": "Ding Dong Eat it up.",
    "color": "rgb(61, 223, 255)",
    "mp3": "/media/sounds/ding-dong-eat-it-up_ZhlIYUe.mp3"
  },
  {
    "name": "Evil Cat Laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/evil-cat-laugh.mp3"
  },
  {
    "name": "Enemy encounter (Undertale)",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/enemy-encounter-undertale.mp3"
  },
  {
    "name": "SCARY INTENSE KNOCKING",
    "color": "rgb(175, 0, 0)",
    "mp3": "/media/sounds/konkonse.mp3"
  },
  {
    "name": "adrian explain our friend group",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/adrian-explain-our-friend-group.mp3"
  },
  {
    "name": "пошла на, грязная шл..а",
    "color": "rgb(187, 255, 0)",
    "mp3": "/media/sounds/poshla-na-griaznaia-shl-a.mp3"
  },
  {
    "name": "daisy bell",
    "color": "rgb(116, 253, 223)",
    "mp3": "/media/sounds/daisy-bell.mp3"
  },
  {
    "name": "зайка давай",
    "color": "rgb(240, 41, 255)",
    "mp3": "/media/sounds/zaika-davai.mp3"
  },
  {
    "name": "Squidward Walking",
    "color": "rgb(184, 223, 211)",
    "mp3": "/media/sounds/squidward-walking.mp3"
  },
  {
    "name": "fnaf phone ringing sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fnaf-phone-ringing-sound.mp3"
  },
  {
    "name": "1994 Nokia Ringtone",
    "color": "rgb(25, 187, 0)",
    "mp3": "/media/sounds/1994-nokia-ringtone.mp3"
  },
  {
    "name": "Sad Musicccccc",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sad-music.mp3"
  },
  {
    "name": "concrete scraping",
    "color": "rgb(66, 116, 255)",
    "mp3": "/media/sounds/concrete-scraping.mp3"
  },
  {
    "name": "AHHHHHHHHHHHHHHHHHHH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ahhhhhhhhhhhhhhhh_8axRFzx.mp3"
  },
  {
    "name": "FNAF 2 Hallway Ambience",
    "color": "rgb(93, 255, 240)",
    "mp3": "/media/sounds/fnaf-2-hallway-ambience.mp3"
  },
  {
    "name": "fahh but louder",
    "color": "rgb(0, 255, 98)",
    "mp3": "/media/sounds/fahh-but-louder.mp3"
  },
  {
    "name": "Among us Roundstart",
    "color": "rgb(220, 10, 255)",
    "mp3": "/media/sounds/among-us-roundstart.mp3"
  },
  {
    "name": "shine sound",
    "color": "rgb(104, 245, 255)",
    "mp3": "/media/sounds/anime-shine-sound-effect_QP4mAaX.mp3"
  },
  {
    "name": "Luigi Burning",
    "color": "rgb(52, 140, 70)",
    "mp3": "/media/sounds/luigi-burning.mp3"
  },
  {
    "name": "Cleveland - No",
    "color": "rgb(51, 0, 204)",
    "mp3": "/media/sounds/cleveland-no.mp3"
  },
  {
    "name": "GUNSHOT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gunshot1-connor_p-8650_hifi.mp3"
  },
  {
    "name": "Applause",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/applause-4.mp3"
  },
  {
    "name": "peter griffin laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/laugh-3_9wVKqU7.mp3"
  },
  {
    "name": "MAHORAGA, HELP ME!",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/mahoraga-help-me.mp3"
  },
  {
    "name": "dry fart",
    "color": "rgb(204, 102, 51)",
    "mp3": "/media/sounds/dry-fart_3.mp3"
  },
  {
    "name": "Бурмалда Фон",
    "color": "rgb(86, 80, 80)",
    "mp3": "/media/sounds/burmalda-fon.mp3"
  },
  {
    "name": "botao do whatsapp",
    "color": "rgb(28, 255, 0)",
    "mp3": "/media/sounds/botao-do-whatsapp.mp3"
  },
  {
    "name": "aye bruh you got a phone call",
    "color": "rgb(113, 73, 3)",
    "mp3": "/media/sounds/aye-bruh-you-got-a-phone-call.mp3"
  },
  {
    "name": "sorry to keep you waiting",
    "color": "rgb(255, 241, 38)",
    "mp3": "/media/sounds/sorry-to-keep-you-waiting.mp3"
  },
  {
    "name": "You Are My Sunshine Lebron James",
    "color": "rgb(241, 255, 180)",
    "mp3": "/media/sounds/you-are-my-sunshine-lebron-james.mp3"
  },
  {
    "name": "Windows 7 Startup",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/windows-7-startup.mp3"
  },
  {
    "name": "Ohh Shittings",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ohh-shittings.mp3"
  },
  {
    "name": "Leeroy Jenkins",
    "color": "rgb(0, 102, 204)",
    "mp3": "/media/sounds/leroy.swf.mp3"
  },
  {
    "name": "iPhone Screenshot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/iphone-screenshot.mp3"
  },
  {
    "name": "Ear Ringing",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ear-ringing.mp3"
  },
  {
    "name": "bowser fart",
    "color": "rgb(255, 212, 112)",
    "mp3": "/media/sounds/bowser-fart.mp3"
  },
  {
    "name": "Devine wheel adapting",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/devine-wheel-adapting.mp3"
  },
  {
    "name": "Polyester edit (1)",
    "color": "rgb(255, 232, 21)",
    "mp3": "/media/sounds/polyester-edit-1.mp3"
  },
  {
    "name": "Thanks for the follow!",
    "color": "rgb(255, 65, 198)",
    "mp3": "/media/sounds/follow_vrIWkAR.mp3"
  },
  {
    "name": "anvil drop",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/anvil-drop.mp3"
  },
  {
    "name": "pokemon battle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pokemon-battle.mp3"
  },
  {
    "name": "Eagle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sounds_eng-00381.mp3"
  },
  {
    "name": "Wait, What!?",
    "color": "rgb(0, 153, 255)",
    "mp3": "/media/sounds/wait-what.mp3"
  },
  {
    "name": "Мармок Soundpad BASS",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/marmok-soundpad-bass.mp3"
  },
  {
    "name": "Man shut your- *FLASHBANG*",
    "color": "rgb(65, 255, 197)",
    "mp3": "/media/sounds/man-shut-your-flashbang.mp3"
  },
  {
    "name": "FNAF Balloon Boy Hi",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/echo1.mp3"
  },
  {
    "name": "\"Wow!\" (anime voice accent)",
    "color": "rgb(216, 114, 255)",
    "mp3": "/media/sounds/wow-anime-voice-accent.mp3"
  },
  {
    "name": "Super Mario Pipe",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/super-mario-bros.mp3"
  },
  {
    "name": "Social credit music",
    "color": "rgb(255, 245, 0)",
    "mp3": "/media/sounds/social-credit-music.mp3"
  },
  {
    "name": "skedaddle",
    "color": "rgb(7, 62, 78)",
    "mp3": "/media/sounds/skedaddle.mp3"
  },
  {
    "name": "samsung spaceline notification",
    "color": "rgb(17, 0, 255)",
    "mp3": "/media/sounds/samsung-spaceline-notification.mp3"
  },
  {
    "name": "aura farming",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aura-farming.mp3"
  },
  {
    "name": "CHEDDAR AND BBQ WAVY",
    "color": "rgb(255, 146, 93)",
    "mp3": "/media/sounds/cheddar-and-bbq-wavy.mp3"
  },
  {
    "name": "Skeleton with shield",
    "color": "rgb(255, 251, 135)",
    "mp3": "/media/sounds/skeleton-with-shield.mp3"
  },
  {
    "name": "Fortnite drinking",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite-shield-potion-fortnite-battle-royale-gaming-sound-effect-hd-sound-effect_rnYyvja.mp3"
  },
  {
    "name": "Jackpot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/slot-machine-jackpot-sound-effect.mp3"
  },
  {
    "name": "mysterious wind flowery",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mysterious-wind-flowery.mp3"
  },
  {
    "name": "Bongo Feet",
    "color": "rgb(51, 0, 153)",
    "mp3": "/media/sounds/bongo-feet.mp3"
  },
  {
    "name": "дядя саша",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/diadia-sasha_2a6g2tE.mp3"
  },
  {
    "name": "WHAT ARE YOU AIMING AT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/steel_tv-what-are-you-aiming-at.mp3"
  },
  {
    "name": "WHAT ARE YOU AIMING AT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/steel_tv-what-are-you-aiming-at.mp3"
  },
  {
    "name": "Slash undertale",
    "color": "rgb(100, 0, 0)",
    "mp3": "/media/sounds/undertale-attack-slash-green-screen.mp3"
  },
  {
    "name": "Sicko Mode Meme SFX",
    "color": "rgb(255, 170, 0)",
    "mp3": "/media/sounds/the-beginning-of-sicko-mode-sound-effect-for-memes_xAcUeuI.mp3"
  },
  {
    "name": "Eagle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sounds_eng-00381.mp3"
  },
  {
    "name": "Bom dia a todos e todes *Meme*",
    "color": "rgb(255, 21, 228)",
    "mp3": "/media/sounds/bom-dia-a-todos-e-todes-meme.mp3"
  },
  {
    "name": "Get yo fat ass back here",
    "color": "rgb(45, 235, 240)",
    "mp3": "/media/sounds/get-yo-fat-ass-back-here.mp3"
  },
  {
    "name": "Horse Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/horse-sound.mp3"
  },
  {
    "name": "Weezer Riff",
    "color": "rgb(28, 149, 255)",
    "mp3": "/media/sounds/weezer-riff.mp3"
  },
  {
    "name": "Имбо отрыжка",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/imbo-otryzhka.mp3"
  },
  {
    "name": "YEETT",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yeet.mp3"
  },
  {
    "name": "Удар от взгляда Скалы",
    "color": "rgb(95, 0, 0)",
    "mp3": "/media/sounds/udar-ot-vzgliada-skaly.mp3"
  },
  {
    "name": "Cartoon Chase",
    "color": "rgb(24, 255, 32)",
    "mp3": "/media/sounds/chase_QnUxJTk.mp3"
  },
  {
    "name": "Pokémon plink",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpq91k5v_6.mp3"
  },
  {
    "name": "CID",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cid.mp3"
  },
  {
    "name": "lego build",
    "color": "rgb(255, 116, 38)",
    "mp3": "/media/sounds/lego-build.mp3"
  },
  {
    "name": "Baldi Ruler Slap",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ruler-slap.mp3"
  },
  {
    "name": "aye bruh you got a phone call",
    "color": "rgb(113, 73, 3)",
    "mp3": "/media/sounds/aye-bruh-you-got-a-phone-call.mp3"
  },
  {
    "name": "I am Steve",
    "color": "rgb(48, 169, 255)",
    "mp3": "/media/sounds/i-am-steve.mp3"
  },
  {
    "name": "Windows 7 Startup",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/windows-7-startup.mp3"
  },
  {
    "name": "Maldito traidor (Spain versión 1.0)",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/maldito-traidor-spain-version-1-0.mp3"
  },
  {
    "name": "Super Mario Pipe",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/super-mario-bros.mp3"
  },
  {
    "name": "mi bombo duolingo",
    "color": "rgb(22, 135, 255)",
    "mp3": "/media/sounds/mi-bombo-duolingo.mp3"
  },
  {
    "name": "Minecraft cave1.ogg",
    "color": "rgb(1, 255, 243)",
    "mp3": "/media/sounds/cave1_gqB8CwT.mp3"
  },
  {
    "name": "Lizard",
    "color": "rgb(11, 192, 53)",
    "mp3": "/media/sounds/lizard.mp3"
  },
  {
    "name": "FNAF Balloon Boy Laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/echo4b.mp3"
  },
  {
    "name": "Meowww",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-end-meow-by-nekocat-just-3-second-1.mp3"
  },
  {
    "name": "Prowler Sound Effect HD",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/prowler-sound-effect-hd.mp3"
  },
  {
    "name": "Death Bong",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/death-bong.mp3"
  },
  {
    "name": "Doom Eternal",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/doom-eternal.mp3"
  },
  {
    "name": "Siren head",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/siren-head-sounds-new.mp3"
  },
  {
    "name": "Good morning vietnam!",
    "color": "rgb(0, 51, 255)",
    "mp3": "/media/sounds/goodmorn1.mp3"
  },
  {
    "name": "Freddy's Honk Nose",
    "color": "rgb(102, 51, 0)",
    "mp3": "/media/sounds/fnaf-12-3-freddys-nose-sound.mp3"
  },
  {
    "name": "Wait a minute who are you",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wait-a-minute-who-are-you.mp3"
  },
  {
    "name": "Minecraft Dog Bark",
    "color": "rgb(210, 210, 210)",
    "mp3": "/media/sounds/minecraft-dog-bark.mp3"
  },
  {
    "name": "INDIAN SONG LONG",
    "color": "rgb(255, 166, 0)",
    "mp3": "/media/sounds/indian-song-long.mp3"
  },
  {
    "name": "oohh chinese man",
    "color": "rgb(31, 188, 255)",
    "mp3": "/media/sounds/oohh_chinese_man_sound_.mp3"
  },
  {
    "name": "jojo - ayayay",
    "color": "rgb(255, 197, 60)",
    "mp3": "/media/sounds/jojos-bizarre-adventure-ay-ay-ay-ay-_-sound-effect.mp3"
  },
  {
    "name": "Lizard",
    "color": "rgb(11, 192, 53)",
    "mp3": "/media/sounds/lizard.mp3"
  },
  {
    "name": "INDIAN SONG LONG",
    "color": "rgb(255, 166, 0)",
    "mp3": "/media/sounds/indian-song-long.mp3"
  },
  {
    "name": "Siren head",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/siren-head-sounds-new.mp3"
  },
  {
    "name": "Death Bong",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/death-bong.mp3"
  },
  {
    "name": "Run Meme",
    "color": "rgb(102, 0, 255)",
    "mp3": "/media/sounds/awolnation-run-audio-mp3cut_TdXTLux.mp3"
  },
  {
    "name": "Good morning vietnam!",
    "color": "rgb(0, 51, 255)",
    "mp3": "/media/sounds/goodmorn1.mp3"
  },
  {
    "name": "Sonic spindash",
    "color": "rgb(19, 113, 255)",
    "mp3": "/media/sounds/sonic-spindash.mp3"
  },
  {
    "name": "GTA SA Mission Passed",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gta-san-andreas-mission-complete-sound-hq.mp3"
  },
  {
    "name": "UGH EWW",
    "color": "rgb(151, 82, 255)",
    "mp3": "/media/sounds/ew-dude-wtf.mp3"
  },
  {
    "name": "WHAT ARE YOU DOING IN MY SWAMP",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/what-are-you-doing-in-my-swamp-.mp3"
  },
  {
    "name": "Wait a minute who are you",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wait-a-minute-who-are-you.mp3"
  },
  {
    "name": "Something In My Ass!",
    "color": "rgb(17, 38, 55)",
    "mp3": "/media/sounds/something-in-my-ass_gCDhPgd.mp3"
  },
  {
    "name": "clock tick",
    "color": "rgb(255, 242, 0)",
    "mp3": "/media/sounds/clock-tick.mp3"
  },
  {
    "name": "alarma saturada",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/alarma-saturada.mp3"
  },
  {
    "name": "formula 1 radio notification",
    "color": "rgb(126, 255, 107)",
    "mp3": "/media/sounds/formula-1-radio-notification.mp3"
  },
  {
    "name": "typing-noises",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/typing-noises.mp3"
  },
  {
    "name": "TikTok Core",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/tiktok-core.mp3"
  },
  {
    "name": "T-Rex Roar",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/t-rex-roar.mp3"
  },
  {
    "name": "Dota - rampage",
    "color": "rgb(102, 0, 102)",
    "mp3": "/media/sounds/announcer_kill_rampage_01.mp3"
  },
  {
    "name": "20th Century Fox Fanfare",
    "color": "rgb(255, 211, 0)",
    "mp3": "/media/sounds/20th-century-fox-fanfare.mp3"
  },
  {
    "name": "Prowler Siren",
    "color": "rgb(124, 0, 204)",
    "mp3": "/media/sounds/prowler_sound.mp3"
  },
  {
    "name": "La bebecita Saturado",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/la-bebecita-saturado.mp3"
  },
  {
    "name": "BOMBASTIC SIDE EYE",
    "color": "rgb(156, 0, 0)",
    "mp3": "/media/sounds/bombastic-side-eye.mp3"
  },
  {
    "name": "LOUD Taco Bell Bong",
    "color": "rgb(255, 245, 176)",
    "mp3": "/media/sounds/taco-bell.mp3"
  },
  {
    "name": "Mentality",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mentality.mp3"
  },
  {
    "name": "Bark fart yara yara phonk",
    "color": "rgb(58, 255, 32)",
    "mp3": "/media/sounds/bark-fart-yara-yara-phonk.mp3"
  },
  {
    "name": "Uncle Ruckus",
    "color": "rgb(142, 235, 255)",
    "mp3": "/media/sounds/uncle-ruckus.mp3"
  },
  {
    "name": "I can do anything Jevil",
    "color": "rgb(255, 238, 0)",
    "mp3": "/media/sounds/jevil-i-can-do-anything.mp3"
  },
  {
    "name": "verity NO",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/verity-no.mp3"
  },
  {
    "name": "World's Smallest Violin",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/worlds-smallest-violin.mp3"
  },
  {
    "name": "Charlie Brown Teacher",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wha-wha1.mp3"
  },
  {
    "name": "Domain Expansion - Sukuna",
    "color": "rgb(95, 0, 0)",
    "mp3": "/media/sounds/domain-expansion-sukuna.mp3"
  },
  {
    "name": "Boing sound",
    "color": "rgb(77, 0, 255)",
    "mp3": "/media/sounds/boing-sound.mp3"
  },
  {
    "name": "suspense build up",
    "color": "rgb(62, 62, 62)",
    "mp3": "/media/sounds/suspense-build-up.mp3"
  },
  {
    "name": "PINGAS",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pingas-richard-89282878.mp3"
  },
  {
    "name": "he he he ha clash royale (DEEP FRIED)",
    "color": "rgb(88, 85, 255)",
    "mp3": "/media/sounds/he-he-he-ha-clash-royale-deep-fried.mp3"
  },
  {
    "name": "Prowler Siren",
    "color": "rgb(124, 0, 204)",
    "mp3": "/media/sounds/prowler_sound.mp3"
  },
  {
    "name": "Incorrect sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/answer-wrong.mp3"
  },
  {
    "name": "Download",
    "color": "rgb(251, 255, 110)",
    "mp3": "/media/sounds/download_CTlTO3X.mp3"
  },
  {
    "name": "suspense build up",
    "color": "rgb(62, 62, 62)",
    "mp3": "/media/sounds/suspense-build-up.mp3"
  },
  {
    "name": "HEY ANTEK ANTEK ASING - Prabowo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hey-antek-antek-asing-prabowo.mp3"
  },
  {
    "name": "Bleep2",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/195116__mattskydoodle__censor-beep.mp3"
  },
  {
    "name": "Charlie Brown Teacher",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wha-wha1.mp3"
  },
  {
    "name": "Man Screaming Meme",
    "color": "rgb(111, 214, 255)",
    "mp3": "/media/sounds/man-screaming-memes-sound-effect-2020-for-pro-content-creators_HU6teNC.mp3"
  },
  {
    "name": "I like your cut, \"G\"! (revisited)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-like-your-cut-g-revisited.mp3"
  },
  {
    "name": "Among us",
    "color": "rgb(138, 255, 29)",
    "mp3": "/media/sounds/among.mp3"
  },
  {
    "name": "Donny Thornberry",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/media_va1VnYo.mp3"
  },
  {
    "name": "frieza says hello",
    "color": "rgb(247, 26, 255)",
    "mp3": "/media/sounds/frieza-says-hello.mp3"
  },
  {
    "name": "FAREX PULL MY PEARL",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/farex-pull-my-pearl.mp3"
  },
  {
    "name": "Giorno's Theme normal",
    "color": "rgb(255, 250, 114)",
    "mp3": "/media/sounds/giornos-theme-but-only-the-best-part-is-in_vwd15lya_lyb0-online-audio-converter.mp3"
  },
  {
    "name": "Spongebob - Grass Skirt Chase",
    "color": "rgb(255, 244, 43)",
    "mp3": "/media/sounds/spongebob-music_-grass-skirt-chase-1.mp3"
  },
  {
    "name": "Elite Waagh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/waagh.mp3"
  },
  {
    "name": "syfm!",
    "color": "rgb(36, 30, 255)",
    "mp3": "/media/sounds/syfm_Uw1QK7v.mp3"
  },
  {
    "name": "Who's That Pokemon!?",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/whos-that-pokemon_.mp3"
  },
  {
    "name": "Boing sound",
    "color": "rgb(77, 0, 255)",
    "mp3": "/media/sounds/boing-sound.mp3"
  },
  {
    "name": "flowery good-bye",
    "color": "rgb(242, 255, 0)",
    "mp3": "/media/sounds/flowery-good-bye.mp3"
  },
  {
    "name": "verity",
    "color": "rgb(255, 242, 0)",
    "mp3": "/media/sounds/verity.mp3"
  },
  {
    "name": "Explosion",
    "color": "rgb(255, 51, 0)",
    "mp3": "/media/sounds/barrel-exploding-soundbible.mp3"
  },
  {
    "name": "Windows 3.1 startup (tada)",
    "color": "rgb(51, 255, 0)",
    "mp3": "/media/sounds/win31.mp3"
  },
  {
    "name": "WHAT ARE YOU DOING IN MY SWAMP",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/what-are-you-doing-in-my-swamp-.mp3"
  },
  {
    "name": "musica romantica",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/musica-romantica.mp3"
  },
  {
    "name": "Telefonum çalcaksa böyle çalsın",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/telefonum-calcaksa-boyle-calsin.mp3"
  },
  {
    "name": "Minecraft Totem Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/minecraft-totem-sound.mp3"
  },
  {
    "name": "Maltigi",
    "color": "rgb(77, 234, 31)",
    "mp3": "/media/sounds/maltigi.mp3"
  },
  {
    "name": "My name is andrew dingus",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/my-name-is-andrew-dingus.mp3"
  },
  {
    "name": "kyrie death note",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/kyrie-death-note.mp3"
  },
  {
    "name": "Backrooms ambience",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/backrooms-ambience.mp3"
  },
  {
    "name": "груз 200",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gruz-200.mp3"
  },
  {
    "name": "Такси",
    "color": "rgb(255, 231, 51)",
    "mp3": "/media/sounds/taksi.mp3"
  },
  {
    "name": "let him cook now",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/let-him-cook-now.mp3"
  },
  {
    "name": "Spongebob Bubble Transition",
    "color": "rgb(2, 91, 255)",
    "mp3": "/media/sounds/spongebob-bubble-transition.mp3"
  },
  {
    "name": "The Simpsons - Nelson's HA-HA!",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/the-simpsons-nelsons-haha.mp3"
  },
  {
    "name": "YEAHOO",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yeahoo.mp3"
  },
  {
    "name": "FAHHHHHH",
    "color": "rgb(255, 63, 201)",
    "mp3": "/media/sounds/fahhhhhh.mp3"
  },
  {
    "name": "груз 200",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gruz-200.mp3"
  },
  {
    "name": "syfm!",
    "color": "rgb(36, 30, 255)",
    "mp3": "/media/sounds/syfm_Uw1QK7v.mp3"
  },
  {
    "name": "verity is coming to touch you in 3 days",
    "color": "rgb(255, 252, 75)",
    "mp3": "/media/sounds/verity-is-coming-to-touch-you-in-3-days.mp3"
  },
  {
    "name": "Elite Waagh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/waagh.mp3"
  },
  {
    "name": "Disappear",
    "color": "rgb(161, 160, 255)",
    "mp3": "/media/sounds/disappear.mp3"
  },
  {
    "name": "My name is andrew dingus",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/my-name-is-andrew-dingus.mp3"
  },
  {
    "name": "trollface smile",
    "color": "rgb(94, 94, 94)",
    "mp3": "/media/sounds/trollface-smile.mp3"
  },
  {
    "name": "Такси",
    "color": "rgb(255, 231, 51)",
    "mp3": "/media/sounds/taksi.mp3"
  },
  {
    "name": "kyrie death note",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/kyrie-death-note.mp3"
  },
  {
    "name": "Bear 5 scream",
    "color": "rgb(20, 13, 119)",
    "mp3": "/media/sounds/bear-5-scream.mp3"
  },
  {
    "name": "Rimshot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/badumtss.swf.mp3"
  },
  {
    "name": "let him cook now",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/let-him-cook-now.mp3"
  },
  {
    "name": "Talking Ben No",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/talking-ben-no.mp3"
  },
  {
    "name": "TF2 Notification Sound",
    "color": "rgb(157, 157, 157)",
    "mp3": "/media/sounds/tf2-notification-sound.mp3"
  },
  {
    "name": "Kim Possible Sitch",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/kim-possible-ringtone.mp3"
  },
  {
    "name": "camera shutterrrr",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/camera-shutterrrr.mp3"
  },
  {
    "name": "Yara yara tuff phonk",
    "color": "rgb(73, 109, 255)",
    "mp3": "/media/sounds/yara-yara-tuff-phonk.mp3"
  },
  {
    "name": "Darth Vader NOOOOOOOOO!",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/nooo.mp3"
  },
  {
    "name": "dramatic cue A",
    "color": "rgb(255, 254, 0)",
    "mp3": "/media/sounds/dramatic-cue-a.mp3"
  },
  {
    "name": "Goku teleport sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goku-teleport-sound.mp3"
  },
  {
    "name": "Thriller End Laugh, Jackson",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/thriller-end-laugh_UmpZxje.mp3"
  },
  {
    "name": "Spongebob Bubble Transition",
    "color": "rgb(2, 91, 255)",
    "mp3": "/media/sounds/spongebob-bubble-transition.mp3"
  },
  {
    "name": "Phone Ringing",
    "color": "rgb(0, 51, 51)",
    "mp3": "/media/sounds/ringing_phone-mike_koenig-1503628110.mp3"
  },
  {
    "name": "Minecraft - Glass Break",
    "color": "rgb(94, 248, 255)",
    "mp3": "/media/sounds/minecraft-glass-break.mp3"
  },
  {
    "name": "Finger Snap",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/finger-snap.mp3"
  },
  {
    "name": "Re.Zero: Whoaaayeeeaaayaaai~",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/ahhyooaaawhoaaa.mp3"
  },
  {
    "name": "FNAF 4 Jumpscare",
    "color": "rgb(0, 153, 204)",
    "mp3": "/media/sounds/jumpscare-sound-fnaf-4.mp3"
  },
  {
    "name": "Cashh Money",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/para-sesi-efekti_PaUswM1.mp3"
  },
  {
    "name": "Do you hear the whistle?",
    "color": "rgb(89, 2, 2)",
    "mp3": "/media/sounds/do-you-hear-the-whistle.mp3"
  },
  {
    "name": "Max Verstappen loud",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/max-verstappen-loud_Z43My98.mp3"
  },
  {
    "name": "Plug",
    "color": "rgb(24, 255, 44)",
    "mp3": "/media/sounds/plug.mp3"
  },
  {
    "name": "Bye have a great time!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bye-have-a-great-time.mp3"
  },
  {
    "name": "Sad Hamster",
    "color": "rgb(15, 80, 206)",
    "mp3": "/media/sounds/sad-hamster.mp3"
  },
  {
    "name": "Whatsapp",
    "color": "rgb(51, 255, 0)",
    "mp3": "/media/sounds/quem-e-whatsapp.mp3"
  },
  {
    "name": "Roblox Sword",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/roblox-sword.mp3"
  },
  {
    "name": "That was easy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/that_was_easy.mp3"
  },
  {
    "name": "killpop",
    "color": "rgb(254, 255, 229)",
    "mp3": "/media/sounds/killpop.mp3"
  },
  {
    "name": "Пора вставать хозяин(аниме девочка)",
    "color": "rgb(179, 39, 104)",
    "mp3": "/media/sounds/pora-vstavat-khoziain-anime-devochka.mp3"
  },
  {
    "name": "Censor Bleep",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/censored_beep-mastercard-569981218_3.mp3"
  },
  {
    "name": "HO HO GREEN GIANT",
    "color": "rgb(38, 255, 49)",
    "mp3": "/media/sounds/ho-ho-ho-green-giant-audio-clip_yJDcgA1.mp3"
  },
  {
    "name": "Thriller End Laugh, Jackson",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/thriller-end-laugh_UmpZxje.mp3"
  },
  {
    "name": "Horse Neigh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/horse-neighing-sound-effect.mp3"
  },
  {
    "name": "NDRRMC alert 1",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ndrrmc-alert-1.mp3"
  },
  {
    "name": "THINK FAST CHUCKLENUTS",
    "color": "rgb(255, 11, 11)",
    "mp3": "/media/sounds/think-fast-chucklenuts_3ATncZo.mp3"
  },
  {
    "name": "Scary girl",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/scary-girl.mp3"
  },
  {
    "name": "extremely loud correct buzzer",
    "color": "rgb(33, 255, 29)",
    "mp3": "/media/sounds/extremely-loud-correct-buzzer.mp3"
  },
  {
    "name": "Poop sound effect",
    "color": "rgb(84, 255, 223)",
    "mp3": "/media/sounds/poop-sound-effect.mp3"
  },
  {
    "name": "DBD Skill Check",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dbd_check_start.mp3"
  },
  {
    "name": "Que dificil me la pusiste diablo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/que-dificil-me-la-pusiste-diablo.mp3"
  },
  {
    "name": "Sad Hamster",
    "color": "rgb(15, 80, 206)",
    "mp3": "/media/sounds/sad-hamster.mp3"
  },
  {
    "name": "invincible title car sound",
    "color": "rgb(255, 254, 50)",
    "mp3": "/media/sounds/invincible-title-car-sound.mp3"
  },
  {
    "name": "Illuminati Confirmed Meme",
    "color": "rgb(128, 0, 255)",
    "mp3": "/media/sounds/x-files-theme-song-copy_dLYAyUk.mp3"
  },
  {
    "name": "DRIVING IN MY CAR (asgore",
    "color": "rgb(146, 145, 32)",
    "mp3": "/media/sounds/driving-in-my-car-asgore_RhVxJjP.mp3"
  },
  {
    "name": "goofy scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goofy-yell_LvAybRd.mp3"
  },
  {
    "name": "Bro what are you talking about",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-are-you-talking-about-man.mp3"
  },
  {
    "name": "ГОЙДА!!!!",
    "color": "rgb(255, 106, 0)",
    "mp3": "/media/sounds/goida_hRZ6vDr.mp3"
  },
  {
    "name": "Man's not hot Bark fart remix",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mans-not-hot-bark-fart-remix.mp3"
  },
  {
    "name": "JOJO SONG",
    "color": "rgb(255, 252, 90)",
    "mp3": "/media/sounds/jojos-golden-wind_kL2WElB.mp3"
  },
  {
    "name": "Larry's piano (hobbikats)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/larrys-piano-hobbikats.mp3"
  },
  {
    "name": "Weiii - Daitaku Helios",
    "color": "rgb(38, 96, 255)",
    "mp3": "/media/sounds/weiii-daitaku-helios.mp3"
  },
  {
    "name": "iPhone Sent Message",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sentmessage_1.mp3"
  },
  {
    "name": "Mexican Hat Dance",
    "color": "rgb(102, 255, 0)",
    "mp3": "/media/sounds/mexican_hat_dance.mp3"
  },
  {
    "name": "discord mute",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discordmute_IZNcLx2.mp3"
  },
  {
    "name": "Goofy Ahh Car Horn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goofy-ahh-car-horn.mp3"
  },
  {
    "name": "fire alarm chirp",
    "color": "rgb(164, 147, 255)",
    "mp3": "/media/sounds/fire-alarm-chirp.mp3"
  },
  {
    "name": "Imperial march (star wars)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/imperial_march.mp3"
  },
  {
    "name": "Weeeeeee haha",
    "color": "rgb(34, 105, 255)",
    "mp3": "/media/sounds/weee-hahaha-oh_USrcQ9x.mp3"
  },
  {
    "name": "Suuuuuuuuuuuuu",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/suuuuuuuuuuuuu.mp3"
  },
  {
    "name": "cry (roblox)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cry-roblox.mp3"
  },
  {
    "name": "Illuminati Confirmed Meme",
    "color": "rgb(128, 0, 255)",
    "mp3": "/media/sounds/x-files-theme-song-copy_dLYAyUk.mp3"
  },
  {
    "name": "discord mute",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discordmute_IZNcLx2.mp3"
  },
  {
    "name": "Larry's piano (hobbikats)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/larrys-piano-hobbikats.mp3"
  },
  {
    "name": "goofy scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goofy-yell_LvAybRd.mp3"
  },
  {
    "name": "Weeeeeee haha",
    "color": "rgb(34, 105, 255)",
    "mp3": "/media/sounds/weee-hahaha-oh_USrcQ9x.mp3"
  },
  {
    "name": "Bro what are you talking about",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-are-you-talking-about-man.mp3"
  },
  {
    "name": "oh hell naw man wtf man",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/oh-hell-naw-man-wtf-man.mp3"
  },
  {
    "name": "Minecraft firework",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/minecraft-firework.mp3"
  },
  {
    "name": "I’m Alive! Aegon",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-alive-aegon.mp3"
  },
  {
    "name": "man shut yo gah damn meme",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/man-shut-yo-gah-damn-meme.mp3"
  },
  {
    "name": "Goofy Ahh Car Horn",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/goofy-ahh-car-horn.mp3"
  },
  {
    "name": "Perfect dap up :)",
    "color": "rgb(0, 225, 255)",
    "mp3": "/media/sounds/perfect-dap-up.mp3"
  },
  {
    "name": "Mexican Hat Dance",
    "color": "rgb(102, 255, 0)",
    "mp3": "/media/sounds/mexican_hat_dance.mp3"
  },
  {
    "name": "Home Improvement Huh",
    "color": "rgb(67, 112, 255)",
    "mp3": "/media/sounds/home-improvement-huh.mp3"
  },
  {
    "name": "Jurassic Park III Satellite Phone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jurassic-park-iii-satellite-phone.mp3"
  },
  {
    "name": "Super Saiyan Aura",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/saiyan.mp3"
  },
  {
    "name": "doggy bark",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/deepbark.mp3"
  },
  {
    "name": "Ab tu Gaya beta ab dekh tu (puneet",
    "color": "rgb(255, 69, 151)",
    "mp3": "/media/sounds/ab-tu-gaya-beta-ab-dekh-tu-puneet.mp3"
  },
  {
    "name": "LET ME TELL YOU SOMETHING",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/let-me-tell-you-something.mp3"
  },
  {
    "name": "gogogogogo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gogogogogo.mp3"
  },
  {
    "name": "tiki tiki bark fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tiki-tiki-bark-fart.mp3"
  },
  {
    "name": "Awkward Pause (Anime Sounds)",
    "color": "rgb(79, 255, 123)",
    "mp3": "/media/sounds/awkward-pause-anime-sounds.mp3"
  },
  {
    "name": "Yamate Kudesai",
    "color": "rgb(206, 254, 255)",
    "mp3": "/media/sounds/yamate-kudesai.mp3"
  },
  {
    "name": "Harikitte Ikou Kitasan Black",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/harikitte-ikou-kitasan-black.mp3"
  },
  {
    "name": "whoosh clean",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/whoosh-clean.mp3"
  },
  {
    "name": "Goose HONK!",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/honk-sound.mp3"
  },
  {
    "name": "bubble poping",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bubble-pop.mp3"
  },
  {
    "name": "Выстрел! Выстрел!",
    "color": "rgb(34, 0, 255)",
    "mp3": "/media/sounds/vystrel-vystrel_HtHCfaH.mp3"
  },
  {
    "name": "Xue Hua piao piao bei feng Xiao xiao",
    "color": "rgb(255, 44, 44)",
    "mp3": "/media/sounds/xue-hua-piao-piao.mp3"
  },
  {
    "name": "Minecraft Villager Death",
    "color": "rgb(0, 4, 255)",
    "mp3": "/media/sounds/villager.mp3"
  },
  {
    "name": "Body Fall",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/body-fall-sound-effect.mp3"
  },
  {
    "name": "SHADOW WIZARD MONEY GANG WE LOVE CASTING SPELLS",
    "color": "rgb(6, 6, 72)",
    "mp3": "/media/sounds/shadow-wizard-money-gang-we-love-casting-spells_3h95aGA.mp3"
  },
  {
    "name": "i believe i can fly",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled2.mp3"
  },
  {
    "name": "Hello It's John Cena",
    "color": "rgb(0, 204, 0)",
    "mp3": "/media/sounds/hello-its-john-cena.mp3"
  },
  {
    "name": "WHAT THE HELLLLLLLLLLLL",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-the-hellllllllllll.mp3"
  },
  {
    "name": "fire alarm chirp",
    "color": "rgb(164, 147, 255)",
    "mp3": "/media/sounds/fire-alarm-chirp.mp3"
  },
  {
    "name": "yes king teach me",
    "color": "rgb(251, 255, 52)",
    "mp3": "/media/sounds/yes-king-teach-me.mp3"
  },
  {
    "name": "gogogogogo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gogogogogo.mp3"
  },
  {
    "name": "Hello It's John Cena",
    "color": "rgb(0, 204, 0)",
    "mp3": "/media/sounds/hello-its-john-cena.mp3"
  },
  {
    "name": "Harikitte Ikou Kitasan Black",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/harikitte-ikou-kitasan-black.mp3"
  },
  {
    "name": "whoosh clean",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/whoosh-clean.mp3"
  },
  {
    "name": "Miku alarm",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/miku-alarm.mp3"
  },
  {
    "name": "Goose HONK!",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/honk-sound.mp3"
  },
  {
    "name": "SHADOW WIZARD MONEY GANG WE LOVE CASTING SPELLS",
    "color": "rgb(6, 6, 72)",
    "mp3": "/media/sounds/shadow-wizard-money-gang-we-love-casting-spells_3h95aGA.mp3"
  },
  {
    "name": "fart 2",
    "color": "rgb(102, 51, 0)",
    "mp3": "/media/sounds/fart_1.mp3"
  },
  {
    "name": "Minecraft Villager Death",
    "color": "rgb(0, 4, 255)",
    "mp3": "/media/sounds/villager.mp3"
  },
  {
    "name": "Im not a dere tsun tsundere",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-not-a-dere-tsun-tsundere.mp3"
  },
  {
    "name": "Fnaf Ambient Noise",
    "color": "rgb(157, 20, 134)",
    "mp3": "/media/sounds/fnaf-ambience-extended_trim.mp3"
  },
  {
    "name": "Vine - Dramatic Boom Sound Eff",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-dramatic-boom-sound-effect.mp3"
  },
  {
    "name": "abhi maza ayagga",
    "color": "rgb(255, 155, 70)",
    "mp3": "/media/sounds/abhi-maza-ayagga.mp3"
  },
  {
    "name": "WHAT THE HELLLLLLLLLLLL",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-the-hellllllllllll.mp3"
  },
  {
    "name": "Xue Hua piao piao bei feng Xiao xiao",
    "color": "rgb(255, 44, 44)",
    "mp3": "/media/sounds/xue-hua-piao-piao.mp3"
  },
  {
    "name": "snowgrave deltarune",
    "color": "rgb(24, 20, 255)",
    "mp3": "/media/sounds/snowgrave-deltarune.mp3"
  },
  {
    "name": "зеленский",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zelenskii.mp3"
  },
  {
    "name": "Old Spice Whistle = MattHQ",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/old-spice-whistle-hq.mp3"
  },
  {
    "name": "i believe i can fly",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled2.mp3"
  },
  {
    "name": "autotune baby crying",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmptj_6rrcb.mp3"
  },
  {
    "name": "sonic spring",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/sonic-spring.mp3"
  },
  {
    "name": "Cannon explosion",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cannon.mp3"
  },
  {
    "name": "ROJÃO SUPER ESTOURADO!!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rojao-super-estourado.mp3"
  },
  {
    "name": "Shield Fortnite",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite-shield-potion-fortnite-battle-royale-gaming-sound-effect-hd-sound-effects.mp3"
  },
  {
    "name": "fnaf foxy scream sfx",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/fnaf-foxy-scream-sfx.mp3"
  },
  {
    "name": "lizzard-1",
    "color": "rgb(28, 255, 28)",
    "mp3": "/media/sounds/lizzard-1.mp3"
  },
  {
    "name": "67 brain fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/67-brain-fart.mp3"
  },
  {
    "name": "Big bomb fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rec_10s_neLGvAd.mp3"
  },
  {
    "name": "\"Heartbeat | Stress\" Phasmophobia",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/phasmophobia-sound-board-effects-07-sound-effects-heartbeat-stress_ohtStgP.mp3"
  },
  {
    "name": "Cartoon Jump",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon-jump.mp3"
  },
  {
    "name": "ring doorbell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ring-doorbell-sound.mp3"
  },
  {
    "name": "Lil Jon - whaaat",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lil-jon-what.mp3"
  },
  {
    "name": "Z Z Z Z Z Z",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/z-z-z-z-z-z.mp3"
  },
  {
    "name": "Minecraft Hit Sound",
    "color": "rgb(236, 255, 154)",
    "mp3": "/media/sounds/y2mate_XL9ozUG.mp3"
  },
  {
    "name": "Mr Beast Phonk Meme",
    "color": "rgb(53, 12, 255)",
    "mp3": "/media/sounds/mr-beast-phonk-meme.mp3"
  },
  {
    "name": "Tyler1 Help",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ayhelp.mp3"
  },
  {
    "name": "camera",
    "color": "rgb(13, 5, 255)",
    "mp3": "/media/sounds/camera_RoEAelf.mp3"
  },
  {
    "name": "Ultra diarrhea",
    "color": "rgb(91, 0, 0)",
    "mp3": "/media/sounds/ultra-diarrhea_l7WLiOV.mp3"
  },
  {
    "name": "ring doorbell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ring-doorbell-sound.mp3"
  },
  {
    "name": "Minecraft Critical Hit",
    "color": "rgb(13, 110, 15)",
    "mp3": "/media/sounds/minecraft-critical-hit.mp3"
  },
  {
    "name": "VHS noise",
    "color": "rgb(64, 129, 146)",
    "mp3": "/media/sounds/vhs-noise.mp3"
  },
  {
    "name": "Веселая песенка (Mellstroy x Benny Hill Mashup)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/veselaia-pesenka-mellstroy-x-benny-hill-mashup.mp3"
  },
  {
    "name": "School Bell",
    "color": "rgb(0, 204, 0)",
    "mp3": "/media/sounds/school-bell-ringing-sound-effect.mp3"
  },
  {
    "name": "Cat rap",
    "color": "rgb(210, 190, 148)",
    "mp3": "/media/sounds/cat-rap.mp3"
  },
  {
    "name": "Big bomb fart",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rec_10s_neLGvAd.mp3"
  },
  {
    "name": "Ah Shit, Here We Go Again.",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gta-san-andreas-ah-shit-here-we-go-again_PHjnAqj.mp3"
  },
  {
    "name": "Sombra: Boop",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/overwatch-boop-sombra.mp3"
  },
  {
    "name": "Oh shittings (normal)",
    "color": "rgb(82, 77, 61)",
    "mp3": "/media/sounds/oh-shittings-normal.mp3"
  },
  {
    "name": "fnaf running",
    "color": "rgb(218, 187, 255)",
    "mp3": "/media/sounds/fnaf-running.mp3"
  },
  {
    "name": "Kitchen Nightmare Dramatic Sound Effect",
    "color": "rgb(106, 0, 0)",
    "mp3": "/media/sounds/kitchen-nightmare-dramatic-sound-effect.mp3"
  },
  {
    "name": "\"Ah\" Cute Anime Voice Sound Effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ah-cute-anime-voice-sound-effect.mp3"
  },
  {
    "name": "6 77",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/6-77.mp3"
  },
  {
    "name": "Verity and Freakity Bouncing",
    "color": "rgb(251, 255, 0)",
    "mp3": "/media/sounds/verity-and-freakity-bouncing.mp3"
  },
  {
    "name": "Mr Beast Phonk Meme",
    "color": "rgb(53, 12, 255)",
    "mp3": "/media/sounds/mr-beast-phonk-meme.mp3"
  },
  {
    "name": "Pablo MEME",
    "color": "rgb(90, 255, 8)",
    "mp3": "/media/sounds/yt1s_NSjFWNC.mp3"
  },
  {
    "name": "JOHN CENAAAA Instant",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/john-cenaaaa.mp3"
  },
  {
    "name": "HOLD UP WAIT A MINUTE SOMETHIN",
    "color": "rgb(37, 255, 30)",
    "mp3": "/media/sounds/untitled_OTuNHvt.mp3"
  },
  {
    "name": "Gun shots",
    "color": "rgb(149, 204, 220)",
    "mp3": "/media/sounds/gun-shots.mp3"
  },
  {
    "name": "Пицца 4 сына",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pitstsa-4-syna.mp3"
  },
  {
    "name": "Sakın açma!!!!",
    "color": "rgb(255, 211, 12)",
    "mp3": "/media/sounds/sakin-acma_y6m1NfF.mp3"
  },
  {
    "name": "minecraft Door meme",
    "color": "rgb(188, 255, 46)",
    "mp3": "/media/sounds/minecraft-door-sound-effect.mp3"
  },
  {
    "name": "EK jhaat bhar ka aadmi ...",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ek-jhaat-bhar-ka-aadmi.mp3"
  },
  {
    "name": "Hollow Purple",
    "color": "rgb(150, 17, 142)",
    "mp3": "/media/sounds/hollow-purple.mp3"
  },
  {
    "name": "Değirmenci Dayı BASS",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/degirmenci-dayi-bass.mp3"
  },
  {
    "name": "Dictator Mbappe",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dictator-mbappe.mp3"
  },
  {
    "name": "Ooooo That brotha floating",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ooooo-that-brotha-floating.mp3"
  },
  {
    "name": "Screech Car Crash",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/237375__squareal__car-crash.mp3"
  },
  {
    "name": "Morning Music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/morning.mp3"
  },
  {
    "name": "Tum Dum Tedau",
    "color": "rgb(118, 0, 0)",
    "mp3": "/media/sounds/tum-dum-tedau.mp3"
  },
  {
    "name": "Путин виноват",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/putin-vinovat.mp3"
  },
  {
    "name": "Homer Simpson - D'OH",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/doh_r4RZcVw.mp3"
  },
  {
    "name": "dramatic tiktok",
    "color": "rgb(6, 0, 122)",
    "mp3": "/media/sounds/bgc-dramatic-music-tiktok-drama-effect-audio-tiktok-new-trend_LYggtlV.mp3"
  },
  {
    "name": "Malupiton ARAY KO!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/malupiton-aray-ko.mp3"
  },
  {
    "name": "Windows 10 USB disconnect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/disconnect.mp3"
  },
  {
    "name": "Подлая музыка",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/podlaia-muzyka.mp3"
  },
  {
    "name": "CHACHAA",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chachaa.mp3"
  },
  {
    "name": "Crowd cheering and clapping",
    "color": "rgb(234, 255, 95)",
    "mp3": "/media/sounds/99634_tomlija_small-crowd-cheering-and-clapping.mp3"
  },
  {
    "name": "My King (Flowery)",
    "color": "rgb(215, 255, 52)",
    "mp3": "/media/sounds/my-king-flowery.mp3"
  },
  {
    "name": "okayyy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/okay-guy.mp3"
  },
  {
    "name": "Woody Woodpecker Laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/woody-woodpecker-laugh.mp3"
  },
  {
    "name": "Swoosh simple",
    "color": "rgb(93, 222, 255)",
    "mp3": "/media/sounds/transition-sound-effects-presented-by-mrsnooze-unknown-album-00-005-simple-swoosh.mp3"
  },
  {
    "name": "мои яйца убицы",
    "color": "rgb(255, 154, 38)",
    "mp3": "/media/sounds/moi-iaitsa-ubitsy.mp3"
  },
  {
    "name": "TRASH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/trash-sound-effect.mp3"
  },
  {
    "name": "Look at this dude HQ",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bruh_look_at_this_dude1.mp3"
  },
  {
    "name": "Crow Sound Caw",
    "color": "rgb(33, 41, 159)",
    "mp3": "/media/sounds/raven-caw-caw.mp3"
  },
  {
    "name": "Здравствуйте ничтожные нищие смертные",
    "color": "rgb(114, 79, 255)",
    "mp3": "/media/sounds/zdravstvuite-nichtozhnye-nishchie-smertnye.mp3"
  },
  {
    "name": "Ultra instinct Goku",
    "color": "rgb(12, 206, 255)",
    "mp3": "/media/sounds/ultra-instinct-theme-official-version-audiotrimmer.mp3"
  },
  {
    "name": "Metal Gear Solid - Codec",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/codec.mp3"
  },
  {
    "name": "jet set radio spray 2",
    "color": "rgb(221, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-spray-2_pITyzB4.mp3"
  },
  {
    "name": "levántenseeeee",
    "color": "rgb(255, 17, 227)",
    "mp3": "/media/sounds/levantenseeeee.mp3"
  },
  {
    "name": "Lebron James Kid",
    "color": "rgb(0, 255, 153)",
    "mp3": "/media/sounds/lebron-james.mp3"
  },
  {
    "name": "Sike short",
    "color": "rgb(77, 255, 255)",
    "mp3": "/media/sounds/sike-1.mp3"
  },
  {
    "name": "neegyy",
    "color": "rgb(255, 238, 0)",
    "mp3": "/media/sounds/neegyy.mp3"
  },
  {
    "name": "Steal a Brainrot - Dragon Cannelloni",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/steal-a-brainrot-dragon-cannelloni.mp3"
  },
  {
    "name": "Киси Киси Мяу Мяу Василиса",
    "color": "rgb(255, 0, 216)",
    "mp3": "/media/sounds/kisi-kisi-miau-miau-vasilisa.mp3"
  },
  {
    "name": "Mortal Kombat - Raiden 2",
    "color": "rgb(255, 252, 248)",
    "mp3": "/media/sounds/mk2-00800.mp3"
  },
  {
    "name": "AKH",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/akh.mp3"
  },
  {
    "name": "Hey Listen Zelda",
    "color": "rgb(26, 174, 0)",
    "mp3": "/media/sounds/zelda-navi-listen.mp3"
  },
  {
    "name": "Death Note Light Yagami Is Sus",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/death-note-light-yagami-is-sus.mp3"
  },
  {
    "name": "Build up",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/build-up.mp3"
  },
  {
    "name": "Sexy back ZRT4",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/sexy-back-zrt4.mp3"
  },
  {
    "name": "Bamboo hit",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bamboo-hit-sound-effect.mp3"
  },
  {
    "name": "YA MI AMOR",
    "color": "rgb(5, 255, 0)",
    "mp3": "/media/sounds/ya-mi-amor.mp3"
  },
  {
    "name": "Real gunshot",
    "color": "rgb(153, 255, 255)",
    "mp3": "/media/sounds/m4a1_single-kibblesbob-8540445.mp3"
  },
  {
    "name": "the boys - Flowery",
    "color": "rgb(255, 248, 30)",
    "mp3": "/media/sounds/the-boys-flowery.mp3"
  },
  {
    "name": "Verity melody",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/verity-melody.mp3"
  },
  {
    "name": "Goku Yelling",
    "color": "rgb(255, 102, 0)",
    "mp3": "/media/sounds/gokuyelling.mp3"
  },
  {
    "name": "Goku Yelling",
    "color": "rgb(255, 102, 0)",
    "mp3": "/media/sounds/gokuyelling.mp3"
  },
  {
    "name": "Cute squeaky toy noise",
    "color": "rgb(251, 221, 255)",
    "mp3": "/media/sounds/cute-squeaky-toy-noise.mp3"
  },
  {
    "name": "My King (Flowery)",
    "color": "rgb(215, 255, 52)",
    "mp3": "/media/sounds/my-king-flowery.mp3"
  },
  {
    "name": "CHACHAA",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chachaa.mp3"
  },
  {
    "name": "MLP Squee",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mlp-squee.mp3"
  },
  {
    "name": "Киси Киси Мяу Мяу Василиса",
    "color": "rgb(255, 0, 216)",
    "mp3": "/media/sounds/kisi-kisi-miau-miau-vasilisa.mp3"
  },
  {
    "name": "Verity melody",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/verity-melody.mp3"
  },
  {
    "name": "Sike short",
    "color": "rgb(77, 255, 255)",
    "mp3": "/media/sounds/sike-1.mp3"
  },
  {
    "name": "Acha ji aisa hai kya",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/acha-ji-aisa-hai-kya.mp3"
  },
  {
    "name": "السلام عليكم بعدا هي لولة",
    "color": "rgb(119, 29, 255)",
    "mp3": "/media/sounds/lslm-lykm-b-d-hy-lwl.mp3"
  },
  {
    "name": "Real gunshot",
    "color": "rgb(153, 255, 255)",
    "mp3": "/media/sounds/m4a1_single-kibblesbob-8540445.mp3"
  },
  {
    "name": "Sad Violin",
    "color": "rgb(255, 204, 0)",
    "mp3": "/media/sounds/sad-violin.mp3"
  },
  {
    "name": "OH HELLO THERE. ( Shrek )",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/shrek-oh-hello-there_nhnoZHY.mp3"
  },
  {
    "name": "Ultrakill Explosion",
    "color": "rgb(0, 61, 255)",
    "mp3": "/media/sounds/ultrakill-explosion.mp3"
  },
  {
    "name": "the boys - Flowery",
    "color": "rgb(255, 248, 30)",
    "mp3": "/media/sounds/the-boys-flowery.mp3"
  },
  {
    "name": "Bamboo hit",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bamboo-hit-sound-effect.mp3"
  },
  {
    "name": "pain theme naruto",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/pain-2.mp3"
  },
  {
    "name": "load gun",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/gun-load_abJphmJ.mp3"
  },
  {
    "name": "Build up",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/build-up.mp3"
  },
  {
    "name": "Ваш сын смотрит пор",
    "color": "rgb(94, 255, 153)",
    "mp3": "/media/sounds/vash-syn-smotrit-por.mp3"
  },
  {
    "name": "Duolingo Correct",
    "color": "rgb(26, 255, 13)",
    "mp3": "/media/sounds/duolingo-correct.mp3"
  },
  {
    "name": "Doors Elevator music",
    "color": "rgb(40, 9, 71)",
    "mp3": "/media/sounds/doors-elevator-music.mp3"
  },
  {
    "name": "knuckles i dont know",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/knuckles-i-dont-know.mp3"
  },
  {
    "name": "\"Hey\" Female Voice Sound Effect",
    "color": "rgb(20, 156, 255)",
    "mp3": "/media/sounds/hey-female-voice-sound-effect.mp3"
  },
  {
    "name": "Cala boca e escuta o som do meu corsa",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cala-boca-e-escuta-o-som-do-meu-corsa.mp3"
  },
  {
    "name": "Family Feud NO Buzzer",
    "color": "rgb(0, 163, 3)",
    "mp3": "/media/sounds/neg-portal2buzzer_2DIuFda.mp3"
  },
  {
    "name": "ahh! rblx scared",
    "color": "rgb(0, 255, 183)",
    "mp3": "/media/sounds/ahh-rblx-scared.mp3"
  },
  {
    "name": "Galaxy brain meme",
    "color": "rgb(168, 245, 255)",
    "mp3": "/media/sounds/galaxy-brain-meme.mp3"
  },
  {
    "name": "Snake death scream",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/metal-gear-solid-snake-death-scream-sound-effect_fR1Ryqk.mp3"
  },
  {
    "name": "WWE Ringbell",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/wwe-bell.mp3"
  },
  {
    "name": "booing",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/booing.mp3"
  },
  {
    "name": "Keyboard rage",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/rage2.mp3"
  },
  {
    "name": "holy moly emoji",
    "color": "rgb(255, 238, 128)",
    "mp3": "/media/sounds/holy-moly-emoji.mp3"
  },
  {
    "name": "lets go gambling",
    "color": "rgb(30, 0, 255)",
    "mp3": "/media/sounds/lets-go-gambling.mp3"
  },
  {
    "name": "what the hell is even that",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/whatthehell_qrePvEr.mp3"
  },
  {
    "name": "Slot machine",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/slotmachine.mp3"
  },
  {
    "name": "Ha Got EEM",
    "color": "rgb(255, 255, 51)",
    "mp3": "/media/sounds/ha-got-eeem.mp3"
  },
  {
    "name": "goofy ahh laugh meme",
    "color": "rgb(240, 255, 0)",
    "mp3": "/media/sounds/goofy-ahh-laugh-meme.mp3"
  },
  {
    "name": "Family Feud NO Buzzer",
    "color": "rgb(0, 163, 3)",
    "mp3": "/media/sounds/neg-portal2buzzer_2DIuFda.mp3"
  },
  {
    "name": "I'm tired of this grandpa... That's too damn bad",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-tired-of-this-grandpa-thats-too-damn-bad.mp3"
  },
  {
    "name": "knuckles i dont know",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/knuckles-i-dont-know.mp3"
  },
  {
    "name": "SETEMBRO VAI ENTRAR O GROSSO ( LULA )",
    "color": "rgb(255, 238, 4)",
    "mp3": "/media/sounds/setembro-vai-entrar-o-grosso-lula.mp3"
  },
  {
    "name": "Nya Button",
    "color": "rgb(255, 98, 171)",
    "mp3": "/media/sounds/nya_ZtXOXLx.mp3"
  },
  {
    "name": "Hotel service desk bell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zapsplat_bell_service_disk_ring_slightly_broken_resonate_18042.mp3"
  },
  {
    "name": "Cute squeaky toy noise",
    "color": "rgb(251, 221, 255)",
    "mp3": "/media/sounds/cute-squeaky-toy-noise.mp3"
  },
  {
    "name": "Michael Jackson vocal",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/michael-jackson-vocal.mp3"
  },
  {
    "name": "Nothing beats a jet2 holiday",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nothing-beats-a-jet2-holiday_IeBO1Mr.mp3"
  },
  {
    "name": "hehe boi ainsley harriott",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ainsley_harriott_and_his_spicy_meatconverttoaudio.mp3"
  },
  {
    "name": "in the arms of an angel",
    "color": "rgb(0, 0, 102)",
    "mp3": "/media/sounds/in-the-arms-of-an-angel-sarah-mcla.mp3"
  },
  {
    "name": "Cartoon slide whistle",
    "color": "rgb(73, 38, 255)",
    "mp3": "/media/sounds/cartoon-slide.mp3"
  },
  {
    "name": "OUTRO SONG (Xenogenesis)",
    "color": "rgb(0, 255, 204)",
    "mp3": "/media/sounds/outro-song-xenogenesis.mp3"
  },
  {
    "name": "Suspense strike",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sound-effect-suspense-strike.mp3"
  },
  {
    "name": "WWE Ringbell",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/wwe-bell.mp3"
  },
  {
    "name": "Rosa De Guadalupe Suspense",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled-4319-10.mp3"
  },
  {
    "name": "Target Acquired Meme",
    "color": "rgb(58, 19, 255)",
    "mp3": "/media/sounds/target-acquired-meme.mp3"
  },
  {
    "name": "birds chirping",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bird-chirping-sound-effect.mp3"
  },
  {
    "name": "Loud Keyboard Spamming Sound (SpeedRun)",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/loud-keyboard-spamming-sound-speedrun.mp3"
  },
  {
    "name": "hamburger",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hamburger-sound-effect.mp3"
  },
  {
    "name": "I Want To Be Ninja",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-want-to-be-ninja.mp3"
  },
  {
    "name": "Awkward Crickets",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/awkward-cricket-sound-effect_YK6dDJG.mp3"
  },
  {
    "name": "Dry Bones (death)",
    "color": "rgb(189, 189, 189)",
    "mp3": "/media/sounds/dry-bones-death.mp3"
  },
  {
    "name": "Stretching Rubber",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/stretching-rubber.mp3"
  },
  {
    "name": "Fuhhhh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fuhhhh.mp3"
  },
  {
    "name": "tung tung tung tung sahur",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tung-tung-tung-tung-sahur.mp3"
  },
  {
    "name": "Дай дай дай",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dai-dai-dai.mp3"
  },
  {
    "name": "смех ребенка",
    "color": "rgb(255, 213, 0)",
    "mp3": "/media/sounds/smekh-rebenka.mp3"
  },
  {
    "name": "sad music indian",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpauxfo4ff.mp3"
  },
  {
    "name": "Undertale Savepoint",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/savepoint.mp3"
  },
  {
    "name": "Audience Clapping (Theater)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/theater-applause-128kbps.mp3"
  },
  {
    "name": "Minecraft door open",
    "color": "rgb(220, 173, 97)",
    "mp3": "/media/sounds/minecraft-door-open.mp3"
  },
  {
    "name": "Grox villager",
    "color": "rgb(120, 95, 93)",
    "mp3": "/media/sounds/grox-villager.mp3"
  },
  {
    "name": "I am a architect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-am-a-architect.mp3"
  },
  {
    "name": "Grox villager",
    "color": "rgb(120, 95, 93)",
    "mp3": "/media/sounds/grox-villager.mp3"
  },
  {
    "name": "I am a architect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-am-a-architect.mp3"
  },
  {
    "name": "Ouch!",
    "color": "rgb(255, 12, 12)",
    "mp3": "/media/sounds/ouch_AKigkiF.mp3"
  },
  {
    "name": "Audience Clapping (Theater)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/theater-applause-128kbps.mp3"
  },
  {
    "name": "Minecraft door open",
    "color": "rgb(220, 173, 97)",
    "mp3": "/media/sounds/minecraft-door-open.mp3"
  },
  {
    "name": "Бобуляция",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/bobuliatsiia.mp3"
  },
  {
    "name": "perfect victory ( yagami light )",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/perfect-victory-yagami-light.mp3"
  },
  {
    "name": "Tono Celular chino",
    "color": "rgb(247, 140, 255)",
    "mp3": "/media/sounds/tono-celular-chino.mp3"
  },
  {
    "name": "Amogus Full",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/2021-04-07-213841761.mp3"
  },
  {
    "name": "Homer Simpson Scream",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmp90lreogl.mp3"
  },
  {
    "name": "Howl",
    "color": "rgb(82, 14, 149)",
    "mp3": "/media/sounds/wolf-howling.mp3"
  },
  {
    "name": "Victory Screech - Spongebob",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/victoryscreech.mp3"
  },
  {
    "name": "Rap Battle OOOHHHH!",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/the-rap-battle-parody-oh.mp3"
  },
  {
    "name": "Scooby doo laugh meme",
    "color": "rgb(234, 255, 0)",
    "mp3": "/media/sounds/scooby-doo-laugh-meme.mp3"
  },
  {
    "name": "Homero tono de llamada",
    "color": "rgb(255, 248, 0)",
    "mp3": "/media/sounds/homero-tono-de-llamada.mp3"
  },
  {
    "name": "clown horn short",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/clown-horn-short.mp3"
  },
  {
    "name": "TOBOL",
    "color": "rgb(248, 218, 255)",
    "mp3": "/media/sounds/tobol.mp3"
  },
  {
    "name": "Omega Flowery",
    "color": "rgb(255, 226, 9)",
    "mp3": "/media/sounds/omega-flowery.mp3"
  },
  {
    "name": "Windows 10 USB connect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/connect.mp3"
  },
  {
    "name": "Anime Girl \"Senpai!\"",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/anime-girl-senpai.mp3"
  },
  {
    "name": "Neck crack",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/neck-crack-sound-effect-free-download.mp3"
  },
  {
    "name": "HIS NAME IS JOHN CENA",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/and-his-name-is-john-cena-1_3.mp3"
  },
  {
    "name": "Baby laugh phonk jersey",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/baby-laugh-phonk-jersey.mp3"
  },
  {
    "name": "Splat Sound",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/splat-sound-effect-free-download.mp3"
  },
  {
    "name": "Da Baby Lets Goooo",
    "color": "rgb(25, 255, 0)",
    "mp3": "/media/sounds/dababy-lets-go-sound-effect_EWZTfTT.mp3"
  },
  {
    "name": "suspense rising",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/suspense-sound-effect-imovie.mp3"
  },
  {
    "name": "Brr Brr Patapim Alarm Clock",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/brr-brr-patapim-alarm-clock.mp3"
  },
  {
    "name": "Among Us Drip Theme Song",
    "color": "rgb(178, 255, 44)",
    "mp3": "/media/sounds/record-online-voice-recorder_kIwejRI.mp3"
  },
  {
    "name": "ayo wtf",
    "color": "rgb(138, 171, 255)",
    "mp3": "/media/sounds/ayo-wtf-meme.mp3"
  },
  {
    "name": "Geyyyy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/geyyyy.mp3"
  },
  {
    "name": "HELP HELP ME tiktok meme",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/help-help-me-tiktok-meme.mp3"
  },
  {
    "name": "Roger Roger (Star Wars Droid)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/star-wars-b1-battle-droid_kampfdroide-roger-roger-sound.mp3"
  },
  {
    "name": "ROBLOX Button SFX",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-button-sfx.mp3"
  },
  {
    "name": "oh my god bro ah hell nah",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-my-god-bro-ah-hell-nah.mp3"
  },
  {
    "name": "Arkham Asylum",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/arkham-asylum-chime.mp3"
  },
  {
    "name": "Mi zapatico bien bonito",
    "color": "rgb(112, 57, 46)",
    "mp3": "/media/sounds/mi-zapatico-bien-bonito.mp3"
  },
  {
    "name": "Scooby doo laugh meme",
    "color": "rgb(234, 255, 0)",
    "mp3": "/media/sounds/scooby-doo-laugh-meme.mp3"
  },
  {
    "name": "Hidup jokowi !!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hidup-jokowi.mp3"
  },
  {
    "name": "Baby laugh phonk jersey",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/baby-laugh-phonk-jersey.mp3"
  },
  {
    "name": "B2Q - MLG Sniper",
    "color": "rgb(87, 255, 143)",
    "mp3": "/media/sounds/mlg-sniper.mp3"
  },
  {
    "name": "Бобуляция",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/bobuliatsiia.mp3"
  },
  {
    "name": "iphone camera shutter fast",
    "color": "rgb(216, 98, 255)",
    "mp3": "/media/sounds/iphone-camera-shutter-fast.mp3"
  },
  {
    "name": "The long and winded road fart",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/the-long-and-winded-road-fart-sounds-for-ringtones1.mp3"
  },
  {
    "name": "idea (ding sound effect)",
    "color": "rgb(157, 0, 0)",
    "mp3": "/media/sounds/ding-sound-effect_2_bICB0mr.mp3"
  },
  {
    "name": "Homero tono de llamada",
    "color": "rgb(255, 248, 0)",
    "mp3": "/media/sounds/homero-tono-de-llamada.mp3"
  },
  {
    "name": "suspense rising",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/suspense-sound-effect-imovie.mp3"
  },
  {
    "name": "osu hit sound",
    "color": "rgb(72, 255, 127)",
    "mp3": "/media/sounds/osu-hit-sound.mp3"
  },
  {
    "name": "Undertale - Soul Shatter",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/undertale-soul-shatter.mp3"
  },
  {
    "name": "Its A Me, Mario",
    "color": "rgb(204, 51, 0)",
    "mp3": "/media/sounds/its-me-mario.mp3"
  },
  {
    "name": "Among Us Drip Theme Song",
    "color": "rgb(178, 255, 44)",
    "mp3": "/media/sounds/record-online-voice-recorder_kIwejRI.mp3"
  },
  {
    "name": "ayo wtf",
    "color": "rgb(138, 171, 255)",
    "mp3": "/media/sounds/ayo-wtf-meme.mp3"
  },
  {
    "name": "Price Is Right Theme",
    "color": "rgb(255, 102, 204)",
    "mp3": "/media/sounds/the-price-is-right-theme-song-lq.mp3"
  },
  {
    "name": "ICQ - Uh Oh",
    "color": "rgb(213, 0, 0)",
    "mp3": "/media/sounds/icq-uh-oh.mp3"
  },
  {
    "name": "Freedom motif",
    "color": "rgb(28, 54, 255)",
    "mp3": "/media/sounds/freedom-motif.mp3"
  },
  {
    "name": "Stop it Get Some Help",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled3_13.mp3"
  },
  {
    "name": "Ahh BullShet",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ahh-bullshet.mp3"
  },
  {
    "name": "Asgore dess truck",
    "color": "rgb(255, 234, 5)",
    "mp3": "/media/sounds/asgore-dess-truck_xGFE4qX.mp3"
  },
  {
    "name": "Eram Laughter Deltarune",
    "color": "rgb(50, 45, 38)",
    "mp3": "/media/sounds/eram-laughter-deltarune.mp3"
  },
  {
    "name": "TOBOL",
    "color": "rgb(248, 218, 255)",
    "mp3": "/media/sounds/tobol.mp3"
  },
  {
    "name": "Anime Girl \"Senpai!\"",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/anime-girl-senpai.mp3"
  },
  {
    "name": "freddy countdown",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/freddy-countdown.mp3"
  },
  {
    "name": "Geyyyy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/geyyyy.mp3"
  },
  {
    "name": "Africa crying laugh commercial",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/africa-crying-laugh-commercial.mp3"
  },
  {
    "name": "WHAT ARE YOU DOING STEP BRO",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/what-are-you-doing-step-bro-tik-tok-meme.mp3"
  },
  {
    "name": "Roblox Gravity Coil",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/roblox-gravity-coil.mp3"
  },
  {
    "name": "ZEHAHAHA (Edward Teach laugh)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zehahaha_laugh.mp3"
  },
  {
    "name": "oh my god bro ah hell nah",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-my-god-bro-ah-hell-nah.mp3"
  },
  {
    "name": "It's Pikachu (short)",
    "color": "rgb(255, 231, 82)",
    "mp3": "/media/sounds/its-pikachu-short.mp3"
  },
  {
    "name": "Shah Rukh Khan",
    "color": "rgb(255, 180, 5)",
    "mp3": "/media/sounds/shah-rukh-khan.mp3"
  },
  {
    "name": "contesta puñetas",
    "color": "rgb(30, 154, 255)",
    "mp3": "/media/sounds/contesta-punetas.mp3"
  },
  {
    "name": "Bratz Ew",
    "color": "rgb(230, 20, 255)",
    "mp3": "/media/sounds/bratz-ew.mp3"
  },
  {
    "name": "baby crying phonk",
    "color": "rgb(39, 115, 255)",
    "mp3": "/media/sounds/baby-crying-phonk.mp3"
  },
  {
    "name": "osu hit sound",
    "color": "rgb(72, 255, 127)",
    "mp3": "/media/sounds/osu-hit-sound.mp3"
  },
  {
    "name": "ААААААА ЖЕНЩИНА",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aaaaaaa-zhenshchina.mp3"
  },
  {
    "name": "Chappelle Ah!",
    "color": "rgb(227, 255, 71)",
    "mp3": "/media/sounds/chappelle-ah.mp3"
  },
  {
    "name": "undertale - megalovania",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/megalovania.mp3"
  },
  {
    "name": "Sonic - You're Too Slow",
    "color": "rgb(255, 102, 0)",
    "mp3": "/media/sounds/sonic-youre-too-slow.mp3"
  },
  {
    "name": "Risadinha de ladrão",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sabe-porque-as-meninas-dao-maior-valor-na-risada-de-ladrao-mp3cut.mp3"
  },
  {
    "name": "Apple Mac Startup sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mac-startup_7xOaB3X.mp3"
  },
  {
    "name": "Long brain fart earrape",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/long-brain-fart-earrape.mp3"
  },
  {
    "name": "Dodgeball Hit",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dodgeball.mp3"
  },
  {
    "name": "Teleport DBZ",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpubima4i9.mp3"
  },
  {
    "name": "crowd booing",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/crowd-boo-sound-effect.mp3"
  },
  {
    "name": "Whoooooo yeleeee laudeeee",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/whoooooo-yeleeee-laudeeee_Nk6JpCP.mp3"
  },
  {
    "name": "OK - Même",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/okay-meme.mp3"
  },
  {
    "name": "Bratz Ew",
    "color": "rgb(230, 20, 255)",
    "mp3": "/media/sounds/bratz-ew.mp3"
  },
  {
    "name": "itadori yuji modulo scream",
    "color": "rgb(30, 145, 255)",
    "mp3": "/media/sounds/itadori-yuji-modulo-scream.mp3"
  },
  {
    "name": "Nice Date",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/nice-date.mp3"
  },
  {
    "name": "The long and winded road fart",
    "color": "rgb(0, 153, 0)",
    "mp3": "/media/sounds/the-long-and-winded-road-fart-sounds-for-ringtones1.mp3"
  },
  {
    "name": "“Mwahahaha”",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mwahahaha.mp3"
  },
  {
    "name": "Baby Crying Tears",
    "color": "rgb(255, 178, 252)",
    "mp3": "/media/sounds/baby-crying-tears.mp3"
  },
  {
    "name": "ДИМОН",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pro-metei-dimon-www.mp3"
  },
  {
    "name": "yuji's black flash",
    "color": "rgb(0, 191, 255)",
    "mp3": "/media/sounds/yujis-black-flash.mp3"
  },
  {
    "name": "contesta puñetas",
    "color": "rgb(30, 154, 255)",
    "mp3": "/media/sounds/contesta-punetas.mp3"
  },
  {
    "name": "MUSTARDDDDDDDD",
    "color": "rgb(236, 211, 52)",
    "mp3": "/media/sounds/mustardddddddd.mp3"
  },
  {
    "name": "roblox footsteps",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/action_footsteps_plastic.mp3"
  },
  {
    "name": "AURA фонк",
    "color": "rgb(38, 38, 38)",
    "mp3": "/media/sounds/aura-fonk.mp3"
  },
  {
    "name": "Grunt Birthday Party",
    "color": "rgb(255, 153, 0)",
    "mp3": "/media/sounds/grunt-birthday-party.mp3"
  },
  {
    "name": "NARUTO BATTLE",
    "color": "rgb(255, 156, 53)",
    "mp3": "/media/sounds/naruto-the-raising-fighting-spirit-extended-audiotrimmer_7wvXRts.mp3"
  },
  {
    "name": "COD zombies round change",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmpq7xew6z6.mp3"
  },
  {
    "name": "burping",
    "color": "rgb(255, 0, 234)",
    "mp3": "/media/sounds/burp_Nv7Vfso.mp3"
  },
  {
    "name": "Sukuna's ryoiki tenkai",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sukunas-ryoiki-tenkai.mp3"
  },
  {
    "name": "Old Church Bells - Death",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/old-church-bells-death.mp3"
  },
  {
    "name": "Cod Zombies Bye Bye",
    "color": "rgb(185, 131, 82)",
    "mp3": "/media/sounds/bye-bye_Ua5VOTV.mp3"
  },
  {
    "name": "Modi Ji Bhojyam",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/modi-ji-bhojyam.mp3"
  },
  {
    "name": "chinese ringtone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chinese-ringtone_ekpdPc7.mp3"
  },
  {
    "name": "Yes yes no no",
    "color": "rgb(126, 196, 255)",
    "mp3": "/media/sounds/ksi-yes-yes-yes-yes-no-no-no-no.mp3"
  },
  {
    "name": "LASER PEW PEW",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/064-laser-thum_hYpSdXS.mp3"
  },
  {
    "name": "chinese ringtone",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/chinese-ringtone_ekpdPc7.mp3"
  },
  {
    "name": "LASER PEW PEW",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/064-laser-thum_hYpSdXS.mp3"
  },
  {
    "name": "FAHH SLOWED_",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fahh-slowed.mp3"
  },
  {
    "name": "MLG PWNAGE",
    "color": "rgb(51, 255, 0)",
    "mp3": "/media/sounds/swaggityswagger.mp3"
  },
  {
    "name": "Emergency meeting - Among Us",
    "color": "rgb(248, 255, 0)",
    "mp3": "/media/sounds/emergency-meeting.mp3"
  },
  {
    "name": "mission failed, we get em next time",
    "color": "rgb(179, 215, 255)",
    "mp3": "/media/sounds/mission-failed-well-get-em-next-time-sound-effect-zxhixnbk.mp3"
  },
  {
    "name": "America kya kehta tha",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/america-kya-kehta-tha.mp3"
  },
  {
    "name": "Drake embarrassing",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/drake-embarrassing_Ts9wkE9.mp3"
  },
  {
    "name": "RIGHT FOOT CREEP",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/right-foot-creep.mp3"
  },
  {
    "name": "Funny snoring",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/funny-snoring.mp3"
  },
  {
    "name": "wata sir tkawd",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/wata-sir-tkawd.mp3"
  },
  {
    "name": "Gnome woo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/im-a-gnome-meme-sound-effect-woo.mp3"
  },
  {
    "name": "bomb has been planted",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/bomb-has-been-planted-sound-effect-cs-go.mp3"
  },
  {
    "name": "machine gun gunshot",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/y2mate_aRsvz4g.mp3"
  },
  {
    "name": "Undertale Gaster blaster",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/gaster_blaster_sound_effect_1.mp3"
  },
  {
    "name": "Dark Souls - Pain",
    "color": "rgb(204, 0, 204)",
    "mp3": "/media/sounds/voice-mx-damage-m-1.mp3"
  },
  {
    "name": "she was a fairy",
    "color": "rgb(104, 150, 255)",
    "mp3": "/media/sounds/she-was-a-fairy.mp3"
  },
  {
    "name": "Lie detector meme",
    "color": "rgb(151, 0, 0)",
    "mp3": "/media/sounds/lie-detector-meme.mp3"
  },
  {
    "name": "SCP 096",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/096_4.mp3"
  },
  {
    "name": "CELEBRATION",
    "color": "rgb(153, 0, 0)",
    "mp3": "/media/sounds/celebration.mp3"
  },
  {
    "name": "Minecraft Grass Walking Sound Effect",
    "color": "rgb(0, 139, 23)",
    "mp3": "/media/sounds/minecraft-grass-walking-sound-effect.mp3"
  },
  {
    "name": "News Intro Breaking News",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/news_intro-maximilien_-1801238420_2.mp3"
  },
  {
    "name": "cartoon poke",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cartoon-poke.mp3"
  },
  {
    "name": "SYFMM",
    "color": "rgb(255, 22, 22)",
    "mp3": "/media/sounds/syfmm.mp3"
  },
  {
    "name": "THE record scratch",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/record-scratch_u0nwDyU.mp3"
  },
  {
    "name": "i see you",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/i-see-u.mp3"
  },
  {
    "name": "TheBurntPeanut Hooray",
    "color": "rgb(207, 117, 14)",
    "mp3": "/media/sounds/theburntpeanut-hooray.mp3"
  },
  {
    "name": "indian guy laughing",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/indian-guy-laughing.mp3"
  },
  {
    "name": "Wubba Lubba Dub Dub 2",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/woo_vu_luvub_dub_dub.mp3"
  },
  {
    "name": "see you",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sound-effects-eerie-ghost-voice_kemCjJn.mp3"
  },
  {
    "name": "Plankton - Oooooh",
    "color": "rgb(40, 112, 79)",
    "mp3": "/media/sounds/plankton-oooooh.mp3"
  },
  {
    "name": "Jet Set Radio - Success",
    "color": "rgb(50, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-success.mp3"
  },
  {
    "name": "W.D. Gaster",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/withhands.mp3"
  },
  {
    "name": "Deez Nuts Got EM AHAHAHAHA",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/deez-nuts-got-eem-original-vine-mp3cut.mp3"
  },
  {
    "name": "Fortnite Chest",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fortnite.mp3"
  },
  {
    "name": "Undertale - Mettaton OH YES",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ohyes.mp3"
  },
  {
    "name": "Jet Set Radio - Success",
    "color": "rgb(50, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-success.mp3"
  },
  {
    "name": "W.D. Gaster",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/withhands.mp3"
  },
  {
    "name": "Deez Nuts Got EM AHAHAHAHA",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/deez-nuts-got-eem-original-vine-mp3cut.mp3"
  },
  {
    "name": "Fnaf 6 Jumpscare Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/fnaf-6-jumpscare-sound-effect.mp3"
  },
  {
    "name": "Plankton - Oooooh",
    "color": "rgb(40, 112, 79)",
    "mp3": "/media/sounds/plankton-oooooh.mp3"
  },
  {
    "name": "Oh my god anime",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-my-god-anime.mp3"
  },
  {
    "name": "Kanye West Look At You",
    "color": "rgb(0, 136, 255)",
    "mp3": "/media/sounds/lookatyoukanye.mp3"
  },
  {
    "name": "One Eternity Later",
    "color": "rgb(51, 0, 204)",
    "mp3": "/media/sounds/one-eternity-later.mp3"
  },
  {
    "name": "I almost died",
    "color": "rgb(69, 246, 255)",
    "mp3": "/media/sounds/i-almost-died.mp3"
  },
  {
    "name": "Animal Hospital gameplay soundtracks",
    "color": "rgb(255, 201, 135)",
    "mp3": "/media/sounds/animal-hospital-gameplay-soundtracks.mp3"
  },
  {
    "name": "Fire Burning",
    "color": "rgb(255, 192, 31)",
    "mp3": "/media/sounds/fire-burning.mp3"
  },
  {
    "name": "cs go headshot sound",
    "color": "rgb(202, 48, 48)",
    "mp3": "/media/sounds/cs-go-headshot-sound.mp3"
  },
  {
    "name": "Comedy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/comedy_sms_tonewapspell.mp3"
  },
  {
    "name": "Portal Gun Soun",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/portal-gun-sound-effect.mp3"
  },
  {
    "name": "erm what the sigma",
    "color": "rgb(117, 187, 255)",
    "mp3": "/media/sounds/erm-what-the-sigma_su7GnzC.mp3"
  },
  {
    "name": "Talkingg Benn Laughh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/talkingg-benn-laughh.mp3"
  },
  {
    "name": "Jutsu Activation",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/katon.mp3"
  },
  {
    "name": "Finishing Hit - Super Smash Bros Ultimate",
    "color": "rgb(87, 87, 87)",
    "mp3": "/media/sounds/finishing-hit-super-smash-bros-ultimate.mp3"
  },
  {
    "name": "Por fin apareciste Malnacido -Picoro-",
    "color": "rgb(45, 127, 35)",
    "mp3": "/media/sounds/por-fin-apareciste-malnacido-picoro.mp3"
  },
  {
    "name": "Hello, i'm Verity!",
    "color": "rgb(255, 244, 38)",
    "mp3": "/media/sounds/hello-im-verity_ffzJhJK.mp3"
  },
  {
    "name": "Hello! Mine Turtle",
    "color": "rgb(0, 153, 255)",
    "mp3": "/media/sounds/hello-trailer_01.mp3"
  },
  {
    "name": "Doorbell",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/door-bell-sound-effect.mp3"
  },
  {
    "name": "BOING CENSOR Digital Circus",
    "color": "rgb(255, 2, 2)",
    "mp3": "/media/sounds/boing-censor-digital-circus.mp3"
  },
  {
    "name": "que es el aura",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/que-es-el-aura.mp3"
  },
  {
    "name": "Windows 95 Startup Sound (Again)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yt1s_WCC0ZQQ.mp3"
  },
  {
    "name": "Maybach Music",
    "color": "rgb(102, 255, 0)",
    "mp3": "/media/sounds/maybach-music-sound-effect.mp3"
  },
  {
    "name": "Oh no! Our table..It's broken :(",
    "color": "rgb(159, 194, 255)",
    "mp3": "/media/sounds/oh-no-our-table-its-broken_LWGeSdX.mp3"
  },
  {
    "name": "The Boiled One Message",
    "color": "rgb(105, 0, 0)",
    "mp3": "/media/sounds/the-boiled-one-message.mp3"
  },
  {
    "name": "Normal Spamton's laugh",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/normal-spamtons-laugh.mp3"
  },
  {
    "name": "Biden SODA!",
    "color": "rgb(52, 21, 255)",
    "mp3": "/media/sounds/yt1s_qwrCPVf.mp3"
  },
  {
    "name": "slapped",
    "color": "rgb(255, 0, 51)",
    "mp3": "/media/sounds/slap_n1PUGaN.mp3"
  },
  {
    "name": "*CupcaKKe gulp*",
    "color": "rgb(255, 197, 255)",
    "mp3": "/media/sounds/cupcakke-gulp.mp3"
  },
  {
    "name": "The ting goes bark fart extended",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-ting-goes-bark-fart-extended.mp3"
  },
  {
    "name": "Open the noor!",
    "color": "rgb(109, 255, 37)",
    "mp3": "/media/sounds/open-the-noor.mp3"
  },
  {
    "name": "Sqeeling Pig",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sqeeling-pig.mp3"
  },
  {
    "name": "It was at this moment that he knew he f_cked up",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/it-was-at-this-moment-that-he-knew-he-f-cked-up.mp3"
  },
  {
    "name": "Toasty mortal kombat",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/toasty_tfCWsU6.mp3"
  },
  {
    "name": "Maybach Music",
    "color": "rgb(102, 255, 0)",
    "mp3": "/media/sounds/maybach-music-sound-effect.mp3"
  },
  {
    "name": "Jump(boing)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/jump-boing.mp3"
  },
  {
    "name": "Запикивание матов",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zapikivanie-matov.mp3"
  },
  {
    "name": "dokkaebi hack",
    "color": "rgb(55, 55, 55)",
    "mp3": "/media/sounds/dokkaebi-hacking-sound-effect.mp3"
  },
  {
    "name": "Ам ням грустит",
    "color": "rgb(33, 128, 30)",
    "mp3": "/media/sounds/am-niam-grustit.mp3"
  },
  {
    "name": "Homer let the barts out",
    "color": "rgb(255, 250, 13)",
    "mp3": "/media/sounds/homer-let-the-barts-out.mp3"
  },
  {
    "name": "Fortunate Son Vietnam Song",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/creedence-clearwater-revival-fortunate-sonmp3.mp3"
  },
  {
    "name": "PDA sound stalker",
    "color": "rgb(112, 120, 255)",
    "mp3": "/media/sounds/pda_4LbLWWH.mp3"
  },
  {
    "name": "Ben: Yes?",
    "color": "rgb(255, 0, 218)",
    "mp3": "/media/sounds/ben-yes.mp3"
  },
  {
    "name": "Hello!!! Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hello-meme.mp3"
  },
  {
    "name": "Michael TikTok meme sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/michael-tiktok-meme-sound.mp3"
  },
  {
    "name": "Finishing Hit - Super Smash Bros Ultimate",
    "color": "rgb(87, 87, 87)",
    "mp3": "/media/sounds/finishing-hit-super-smash-bros-ultimate.mp3"
  },
  {
    "name": "Sukuna domain theme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sukuna-domain-theme.mp3"
  },
  {
    "name": "windows xp21",
    "color": "rgb(255, 102, 0)",
    "mp3": "/media/sounds/windows-xp-startup_1ph012N.mp3"
  },
  {
    "name": "money money money money",
    "color": "rgb(51, 255, 0)",
    "mp3": "/media/sounds/money-button.mp3"
  },
  {
    "name": "Among us Imposter Reveal SE",
    "color": "rgb(221, 0, 0)",
    "mp3": "/media/sounds/among-us-imposter-reveal-se.mp3"
  },
  {
    "name": "FNAF 3 Death Scream",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/five-nights-at-freddys-3-springtraps-jumpscare-brightened.mp3"
  },
  {
    "name": "EAGLE EARRAPE",
    "color": "rgb(0, 110, 255)",
    "mp3": "/media/sounds/eagle-earrape.mp3"
  },
  {
    "name": "Flowery HereIComeSanFranDisco",
    "color": "rgb(242, 255, 42)",
    "mp3": "/media/sounds/flowery-hereicomesanfrandisco.mp3"
  },
  {
    "name": "Objection!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/phoenix-objection.mp3"
  },
  {
    "name": "Holy Sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/2019-03-30_18-13-20.mp3"
  },
  {
    "name": "JAY. YOU GOTTA MOVE",
    "color": "rgb(110, 42, 120)",
    "mp3": "/media/sounds/jay-you-gotta-move_yhj6mX1.mp3"
  },
  {
    "name": "Sword Cut",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/espada-som.mp3"
  },
  {
    "name": "Noob music",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/scheming-weasel-faster-1-mp3cutn-mp3cut.mp3"
  },
  {
    "name": "Coryxkenshin \"Yeager\" slap sound effect",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/coryxkenshin-yeager-slap-sound-effect.mp3"
  },
  {
    "name": "I'm gonna put some dirt in your eye",
    "color": "rgb(162, 0, 0)",
    "mp3": "/media/sounds/im-gonna-put-some-dirt-in-your-eye.mp3"
  },
  {
    "name": "You ain’t no Toji!",
    "color": "rgb(131, 156, 112)",
    "mp3": "/media/sounds/you-aint-no-toji.mp3"
  },
  {
    "name": "Inception Button",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/inceptionbutton.mp3"
  },
  {
    "name": "Star Wars Siren",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/imperial-alert.mp3"
  },
  {
    "name": "mouse click by ek6",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mouse-click-by-ek6_VR0O6PL.mp3"
  },
  {
    "name": "Meme End",
    "color": "rgb(11, 43, 255)",
    "mp3": "/media/sounds/meme-end.mp3"
  },
  {
    "name": "AMONGUS",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/among_us_trap_remix_bass_boosted_leonz_8455886905626474145-mp3cut.mp3"
  },
  {
    "name": "Hello your computer has virus",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hello-your-computer-has-virus-sound-effect.mp3"
  },
  {
    "name": "transponder snail",
    "color": "rgb(42, 84, 255)",
    "mp3": "/media/sounds/transponder_snail.mp3"
  },
  {
    "name": "Pizza nizar",
    "color": "rgb(255, 153, 27)",
    "mp3": "/media/sounds/pizza-nizar.mp3"
  },
  {
    "name": "can i pet that dog",
    "color": "rgb(73, 255, 79)",
    "mp3": "/media/sounds/can-i-pet-dat-dog-mp3.mp3"
  },
  {
    "name": "is ka karan narendar modi",
    "color": "rgb(255, 75, 20)",
    "mp3": "/media/sounds/is-ka-karan-narendar-modi.mp3"
  },
  {
    "name": "Finishing Hit - Super Smash Bros Ultimate",
    "color": "rgb(87, 87, 87)",
    "mp3": "/media/sounds/finishing-hit-super-smash-bros-ultimate.mp3"
  },
  {
    "name": "Dr. Livesey",
    "color": "rgb(11, 57, 3)",
    "mp3": "/media/sounds/dr-livesey.mp3"
  },
  {
    "name": "WOW (MLG)",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/wow-mlg-sound-effect.mp3"
  },
  {
    "name": "Animals - AUUUUUUUUUU",
    "color": "rgb(87, 57, 14)",
    "mp3": "/media/sounds/animals-auuuuuuuuuu.mp3"
  },
  {
    "name": "Sad spongebob",
    "color": "rgb(161, 168, 255)",
    "mp3": "/media/sounds/spongebob-disappointed-sound-effect_isePyIO.mp3"
  },
  {
    "name": "PAPP(bark fart remix)",
    "color": "rgb(107, 56, 1)",
    "mp3": "/media/sounds/papp-bark-fart-remix.mp3"
  },
  {
    "name": "Tokyo Drift Alert",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled_zd2ts4l-audiotrimmer.mp3"
  },
  {
    "name": "Low Cortisol song",
    "color": "rgb(117, 239, 61)",
    "mp3": "/media/sounds/low-cortisol-song.mp3"
  },
  {
    "name": "EAGLE EARRAPE",
    "color": "rgb(0, 110, 255)",
    "mp3": "/media/sounds/eagle-earrape.mp3"
  },
  {
    "name": "Bomb",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/explosion_1.mp3"
  },
  {
    "name": "Hello everybody my name is Markiplier",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hello-everybody-my-name-is-markiplier_4nI0X3d.mp3"
  },
  {
    "name": "Yes King Now I Understand",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yes-king-now-i-understand.mp3"
  },
  {
    "name": "ford chime",
    "color": "rgb(206, 71, 255)",
    "mp3": "/media/sounds/ford-chime.mp3"
  },
  {
    "name": "Симпл матерится (s1mple)",
    "color": "rgb(117, 255, 117)",
    "mp3": "/media/sounds/simpl-materitsia-s1mple.mp3"
  },
  {
    "name": "A risada do kiko",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/a-risada-do-kiko.mp3"
  },
  {
    "name": "Halo",
    "color": "rgb(0, 102, 204)",
    "mp3": "/media/sounds/Halo.mp3"
  },
  {
    "name": "Lightning",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lightning-storm-sound-effect.mp3"
  },
  {
    "name": "samsung washing machine song FULL",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/samsung-washing-machine-song-full.mp3"
  },
  {
    "name": "Flowery_yes",
    "color": "rgb(255, 203, 77)",
    "mp3": "/media/sounds/flowery-yes.mp3"
  },
  {
    "name": "Cartoon bonk",
    "color": "rgb(82, 255, 110)",
    "mp3": "/media/sounds/cartoon-bonk.mp3"
  },
  {
    "name": "You crying? (Gojo)",
    "color": "rgb(22, 0, 55)",
    "mp3": "/media/sounds/you-crying-gojo.mp3"
  },
  {
    "name": "Burnt Peanut - Desk slam",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/burnt-peanut-desk-slam.mp3"
  },
  {
    "name": "Sus clapping…",
    "color": "rgb(255, 251, 5)",
    "mp3": "/media/sounds/sus-clapping_vww6zEH.mp3"
  },
  {
    "name": "robot naughty word",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/robot-naughty-word.mp3"
  },
  {
    "name": "Cat laugh",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/cat-laugh.mp3"
  },
  {
    "name": "Rahul Gandhi khatam",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmp8ljn9e7h.mp3"
  },
  {
    "name": "1_dog sniff",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/outro_2.mp3"
  },
  {
    "name": "yeah boyyy",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/yeah-boymp4.mp3"
  },
  {
    "name": "Ichigo Bankai",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ichigo-bankai_91wUa6g.mp3"
  },
  {
    "name": "Flashbang jumpscare (LOUD)",
    "color": "rgb(222, 222, 17)",
    "mp3": "/media/sounds/flashbang-jumpscare-loud.mp3"
  },
  {
    "name": "I'm Going to Kill You, And then Kill you again.",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/final_5f99b14b144d4b004b4e5eac_638028.mp3"
  },
  {
    "name": "8-bit Happy Birthday",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hb128.mp3"
  },
  {
    "name": "Silly pinoy laugh",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/silly-laugh_x4pBItl.mp3"
  },
  {
    "name": "Sniper Lourd + HeadShot (Fortnite)",
    "color": "rgb(255, 211, 15)",
    "mp3": "/media/sounds/sniper-lourd-headshot-fortnite.mp3"
  },
  {
    "name": "8-bit Happy Birthday",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hb128.mp3"
  },
  {
    "name": "Silly pinoy laugh",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/silly-laugh_x4pBItl.mp3"
  },
  {
    "name": "Sniper Lourd + HeadShot (Fortnite)",
    "color": "rgb(255, 211, 15)",
    "mp3": "/media/sounds/sniper-lourd-headshot-fortnite.mp3"
  },
  {
    "name": "dialtone deltarune",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/dialtone-deltarune.mp3"
  },
  {
    "name": "dog clicker pleasure",
    "color": "rgb(255, 201, 249)",
    "mp3": "/media/sounds/dog-clicker-pleasure.mp3"
  },
  {
    "name": "Jarona1",
    "color": "rgb(255, 251, 6)",
    "mp3": "/media/sounds/jarona1.mp3"
  },
  {
    "name": "bass boost",
    "color": "rgb(102, 0, 51)",
    "mp3": "/media/sounds/bass-boost.mp3"
  },
  {
    "name": "Za Warudo - Anime's Time Stop",
    "color": "rgb(255, 255, 0)",
    "mp3": "/media/sounds/za-warudo-stop-time-sound.mp3"
  },
  {
    "name": "Noot Noot - Pingu",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/noot_p0CPOIz.mp3"
  },
  {
    "name": "La vida es un carrusel",
    "color": "rgb(85, 0, 255)",
    "mp3": "/media/sounds/la-vida-es-un-carrusel.mp3"
  },
  {
    "name": "deltarune egg sound",
    "color": "rgb(7, 236, 255)",
    "mp3": "/media/sounds/deltarune-egg-sound.mp3"
  },
  {
    "name": "Valorant spike plant",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/valorant-spike-plant.mp3"
  },
  {
    "name": "Clash Royale Startup",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/clash-royale-start-up-sound.mp3"
  },
  {
    "name": "Confused cross eyed kitten meme",
    "color": "rgb(47, 22, 255)",
    "mp3": "/media/sounds/confused-cross-eyed-kitten-meme.mp3"
  },
  {
    "name": "Metal pipe sound",
    "color": "rgb(96, 255, 231)",
    "mp3": "/media/sounds/metal-pipe-sound.mp3"
  },
  {
    "name": "Can We Get Much Higher-One Piece Meme",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/can-we-get-much-higher-one-piece-meme.mp3"
  },
  {
    "name": "Hee Hee!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hee-hee_tTMj1yC.mp3"
  },
  {
    "name": "Minecraft water splash sound effect",
    "color": "rgb(32, 118, 255)",
    "mp3": "/media/sounds/minecraft-water-splash-sound-effect.mp3"
  },
  {
    "name": "Blood Splatter",
    "color": "rgb(53, 70, 255)",
    "mp3": "/media/sounds/blood-splatter.mp3"
  },
  {
    "name": "Dragon Ball Z grabbing sound",
    "color": "rgb(255, 129, 27)",
    "mp3": "/media/sounds/dragon-ball-z-grabbing-sound.mp3"
  },
  {
    "name": "Lego Batman Laugh",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lego-batman-laugh.mp3"
  },
  {
    "name": "Titanic flute fail",
    "color": "rgb(4, 0, 255)",
    "mp3": "/media/sounds/titanic-flute-fail.mp3"
  },
  {
    "name": "Western",
    "color": "rgb(255, 153, 0)",
    "mp3": "/media/sounds/o-bom-o-mal-e-o-feio-velho-oeste-desafio-dont-talk-duelo-desafio-armas.mp3"
  },
  {
    "name": "General Lee HORN",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/general-lee-horn.mp3"
  },
  {
    "name": "ОХ ЗРЯ Я ТУДА ПОЛЕЗ",
    "color": "rgb(184, 255, 170)",
    "mp3": "/media/sounds/okh-zria-ia-tuda-polez.mp3"
  },
  {
    "name": "Modi ji bkl",
    "color": "rgb(255, 159, 16)",
    "mp3": "/media/sounds/modi-ji-bkl.mp3"
  },
  {
    "name": "Buddy Holly Weezer Guitar Lick",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/buddy-holly-weezer-guitar-lick.mp3"
  },
  {
    "name": "Real punch",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/punch-notification_sound-493565.mp3"
  },
  {
    "name": "Desk slam",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/desk-slam_YabSxhJ.mp3"
  },
  {
    "name": "Cinemaitc Suspense Riser",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cinemaitc-suspense-riser.mp3"
  },
  {
    "name": "Lula: VAI TODO MINDO SE FDR!!",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lula-vai-todo-mindo-se-fdr.mp3"
  },
  {
    "name": "What meme song",
    "color": "rgb(71, 0, 0)",
    "mp3": "/media/sounds/what-bottom-text-meme-sanctuary-guardian-sound-effect-hd_tdDIUTg.mp3"
  },
  {
    "name": "Nyanyanyanyanyanyanya",
    "color": "rgb(255, 57, 149)",
    "mp3": "/media/sounds/nyan_cat_compressed.mp3"
  },
  {
    "name": "Evolution Mega Knight",
    "color": "rgb(206, 47, 255)",
    "mp3": "/media/sounds/evolution-mega-knight.mp3"
  },
  {
    "name": "Hell's Kitchen",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hells-kitchen-sfx.mp3"
  },
  {
    "name": "Yes King yo somebody get the door",
    "color": "rgb(224, 255, 249)",
    "mp3": "/media/sounds/yes-king-yo-somebody-get-the-door.mp3"
  },
  {
    "name": "cr7 bom dia",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cr7-bom-dia.mp3"
  },
  {
    "name": "GET OUT SLOWED",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/get-out-slowed.mp3"
  },
  {
    "name": "No creoooo!",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/tmp_5mlk5wd.mp3"
  },
  {
    "name": "Мелстрой возмущается",
    "color": "rgb(238, 84, 255)",
    "mp3": "/media/sounds/melstroi-vozmushchaetsia.mp3"
  },
  {
    "name": "Verity yes",
    "color": "rgb(255, 242, 0)",
    "mp3": "/media/sounds/verity-yes.mp3"
  },
  {
    "name": "SWOON deltarune roaring knight larp",
    "color": "rgb(0, 0, 0)",
    "mp3": "/media/sounds/swoon-deltarune-roaring-knight-larp.mp3"
  },
  {
    "name": "İki kaşık kaymak",
    "color": "rgb(208, 211, 255)",
    "mp3": "/media/sounds/iki-kasik-kaymak.mp3"
  },
  {
    "name": "Sneaky Snitch",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/untitled_897.mp3"
  },
  {
    "name": "Police radio beep",
    "color": "rgb(91, 0, 0)",
    "mp3": "/media/sounds/police-beep.mp3"
  },
  {
    "name": "Gah Damn!",
    "color": "rgb(50, 255, 143)",
    "mp3": "/media/sounds/gah-damn_ytLqP1s.mp3"
  },
  {
    "name": "Donald Trump: \"Obamna\"",
    "color": "rgb(42, 173, 112)",
    "mp3": "/media/sounds/obamna.mp3"
  },
  {
    "name": "Door Open AIM",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/open-aim.mp3"
  },
  {
    "name": "pick up the phone baby (freakbob)",
    "color": "rgb(0, 255, 34)",
    "mp3": "/media/sounds/pick-up-the-phone-baby-freakbob.mp3"
  },
  {
    "name": "cupcakke goof",
    "color": "rgb(255, 176, 212)",
    "mp3": "/media/sounds/cupcakke-goof.mp3"
  },
  {
    "name": "AAHHKK (ahhk with echo)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aahhkk-ahhk-with-echo.mp3"
  },
  {
    "name": "Pokemon Item Found",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/pokemon-red_blue_yellow-item-found-sound-effect.mp3"
  },
  {
    "name": "Hold up wait a minute",
    "color": "rgb(174, 0, 0)",
    "mp3": "/media/sounds/hold-up-wait-a-minute-sound-effect.mp3"
  },
  {
    "name": "one piece luffy's song",
    "color": "rgb(255, 156, 197)",
    "mp3": "/media/sounds/one_piece_ringtone_free_ringtones_for_cell_phones.mp3"
  },
  {
    "name": "Discord Jumpscare",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/discord-jumpscare.mp3"
  },
  {
    "name": "Clutterfunk bark fart remix",
    "color": "rgb(255, 50, 169)",
    "mp3": "/media/sounds/clutterfunk-bark-fart-remix.mp3"
  },
  {
    "name": "dog whistle",
    "color": "rgb(255, 247, 250)",
    "mp3": "/media/sounds/dog-whistle.mp3"
  },
  {
    "name": "SWORD SLASH!",
    "color": "rgb(230, 230, 230)",
    "mp3": "/media/sounds/sword_slash-ab22fe02-3826-345a-80ad-dc22261a9127.mp3"
  },
  {
    "name": "They're Eating My Flesh!",
    "color": "rgb(255, 251, 0)",
    "mp3": "/media/sounds/theyre-eating-my-flesh_TZo3t0w.mp3"
  },
  {
    "name": "Black ops - Fetch me theirsoul",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/black_ops_hell_hounds_fetch_me_their_souls.mp3"
  },
  {
    "name": "TF2 Soldier Screaming",
    "color": "rgb(152, 52, 52)",
    "mp3": "/media/sounds/screaming-soldier-tf2.mp3"
  },
  {
    "name": "The Ting Goes (fart)",
    "color": "rgb(51, 93, 1)",
    "mp3": "/media/sounds/the-ting-goes-fart.mp3"
  },
  {
    "name": "omg what is that",
    "color": "rgb(171, 255, 142)",
    "mp3": "/media/sounds/cardi-b-omg-what-is-thatmp3_160k_1.mp3"
  },
  {
    "name": "Knock 3D",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/knock-3d.mp3"
  },
  {
    "name": "Yowai Mo (Gojo)",
    "color": "rgb(0, 28, 255)",
    "mp3": "/media/sounds/yowai-mo-gojo_EIhp35V.mp3"
  },
  {
    "name": "Hachimi Chimici Mambo",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hachimi-chimici-mambo.mp3"
  },
  {
    "name": "Meme omgs",
    "color": "rgb(255, 217, 27)",
    "mp3": "/media/sounds/meme_lgkJmX6.mp3"
  },
  {
    "name": "Mouse Click 1",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/mouse-click_gt1reD8.mp3"
  },
  {
    "name": "Ka-Ching!",
    "color": "rgb(0, 51, 204)",
    "mp3": "/media/sounds/ka-ching.mp3"
  },
  {
    "name": "White tees rizz",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/white-tees-rizz.mp3"
  },
  {
    "name": "VINE BOOM BASS BOOSTED MAN",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/vine-boom-bass-boosted-man.mp3"
  },
  {
    "name": "Cat Call whistle",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/cat-call.mp3"
  },
  {
    "name": "miku miku beam",
    "color": "rgb(7, 255, 240)",
    "mp3": "/media/sounds/miku-miku-beam.mp3"
  },
  {
    "name": "undertale meow",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/undertale-meow.mp3"
  },
  {
    "name": "GunShoting",
    "color": "rgb(0, 0, 102)",
    "mp3": "/media/sounds/gunshot.mp3"
  },
  {
    "name": "Deltarune - Grab",
    "color": "rgb(205, 31, 27)",
    "mp3": "/media/sounds/deltarune-grab.mp3"
  },
  {
    "name": "Classic Pokemon Heal",
    "color": "rgb(0, 255, 255)",
    "mp3": "/media/sounds/111-pokemon-recovery.mp3"
  },
  {
    "name": "Stand Ready For My Arrival Worm",
    "color": "rgb(255, 255, 255)",
    "mp3": "/media/sounds/stand-ready-for-my-arrival-worm.mp3"
  },
  {
    "name": "Oh No Meme (2020)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-no-meme-2020_hX2n56J.mp3"
  },
  {
    "name": "What the hell are you talking about",
    "color": "rgb(168, 255, 249)",
    "mp3": "/media/sounds/what-the-hell-are-you-talking-about.mp3"
  },
  {
    "name": "bomboclat",
    "color": "rgb(88, 255, 14)",
    "mp3": "/media/sounds/bomboclat.mp3"
  },
  {
    "name": "Minecraft Bow",
    "color": "rgb(251, 255, 0)",
    "mp3": "/media/sounds/bow_shoot.mp3"
  },
  {
    "name": "Звук взрыва громко",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/zvuk-vzryva-gromko.mp3"
  },
  {
    "name": "Mario 1 up",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/mario-1-up.mp3"
  },
  {
    "name": "Camera Shutter (VoiceMod)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/camera-shutter.mp3"
  },
  {
    "name": "Puppet music box",
    "color": "rgb(183, 129, 192)",
    "mp3": "/media/sounds/puppet-music-box.mp3"
  },
  {
    "name": "Hornet SHAW",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hollow-knight-hornet-voice-11.mp3"
  },
  {
    "name": "The Bluetooth Device its connected Succesfull",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/the-bluetooth-device-its-connected-succesfull.mp3"
  },
  {
    "name": "Spongebob Bleep",
    "color": "rgb(25, 75, 255)",
    "mp3": "/media/sounds/spongebob-bleep.mp3"
  },
  {
    "name": "Hola tururururururururururu",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hola-tururururururururururu.mp3"
  },
  {
    "name": "Lula e Neymar #47",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/lula-e-neymar-47.mp3"
  },
  {
    "name": "Sybau",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/sybau.mp3"
  },
  {
    "name": "Rick Roll lolololol",
    "color": "rgb(12, 255, 191)",
    "mp3": "/media/sounds/rick-rolled-meme-aetrim1602054550919.mp3"
  },
  {
    "name": "exclamation",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/metal-gear-solid.mp3"
  },
  {
    "name": "Bloodbath 98% death scream",
    "color": "rgb(39, 0, 0)",
    "mp3": "/media/sounds/bloodbath-98-death-scream.mp3"
  },
  {
    "name": "followers sound",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/twitchhitbox-followdonation-sound_AQQtmhI.mp3"
  },
  {
    "name": "ZA WARUDO, TIME STOP !",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/hd-stardust-crusaders-za-warudo_1.mp3"
  },
  {
    "name": "Oh Hell No (Vine)",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/oh-hell-no-sound-effect-free-download.mp3"
  },
  {
    "name": "Roblox Yummy",
    "color": "rgb(5, 182, 146)",
    "mp3": "/media/sounds/roblox-yummy.mp3"
  },
  {
    "name": "Real Foghorn",
    "color": "rgb(0, 255, 0)",
    "mp3": "/media/sounds/real-foghorn.mp3"
  },
  {
    "name": "aughhhh tiktok",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/aughhhh-tiktok.mp3"
  },
  {
    "name": "Oh Hell No",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/ringtone_7.mp3"
  },
  {
    "name": "DBZ Powerup",
    "color": "rgb(235, 255, 59)",
    "mp3": "/media/sounds/dbz-powerup.mp3"
  },
  {
    "name": "Яндекс такси",
    "color": "rgb(255, 242, 55)",
    "mp3": "/media/sounds/iandeks-taksi.mp3"
  },
  {
    "name": "Tony hawk special trick",
    "color": "rgb(255, 0, 0)",
    "mp3": "/media/sounds/tony-hawk-special-trick-sound-effect.mp3"
  },
  {
    "name": "jet set radio spray 3",
    "color": "rgb(246, 255, 0)",
    "mp3": "/media/sounds/jet-set-radio-spray-3_c3UntD1.mp3"
  },
  {
    "name": "Watch out randy orton",
    "color": "rgb(102, 255, 255)",
    "mp3": "/media/sounds/randyortonrko-soundeffect.mp3"
  },
  {
    "name": "Terrain Pull up airplane alarm",
    "color": "rgb(255, 25, 25)",
    "mp3": "/media/sounds/terrain-pull-up-airplane-alarm.mp3"
  }
]