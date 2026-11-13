const GAME_NAME = "Buster_Jam_Demo";
const GAME_VERSION = "0.0.0.0";

const CACHE_NAME = JSON.stringify({"name": GAME_NAME, "version": GAME_VERSION});
const CACHE_FILES = ["runner.data",
"runner.js",
"runner.wasm",
"audio-worklet.js",
"audiogroup1.dat",
"audiogroup2.dat",
"audiogroup3.dat",
"audiogroup4.dat",
"audiogroup5.dat",
"game.unx",
"micro_apedino_0.yytex",
"micro_ape_0.yytex",
"micro_ape_1.yytex",
"micro_ape_2.yytex",
"micro_ape_3.yytex",
"micro_avoid_0.yytex",
"micro_avoid_1.yytex",
"micro_baby_0.yytex",
"micro_baby_1.yytex",
"micro_ballbattle_0.yytex",
"micro_ballbattle_1.yytex",
"micro_bec_0.yytex",
"micro_bunnyfollow_0.yytex",
"micro_button_0.yytex",
"micro_coin_0.yytex",
"micro_cratememory_0.yytex",
"micro_cratememory_1.yytex",
"micro_defuse_0.yytex",
"micro_defuse_1.yytex",
"micro_defuse_2.yytex",
"micro_defuse_3.yytex",
"micro_defuse_4.yytex",
"micro_demoswing_0.yytex",
"micro_demoswing_1.yytex",
"micro_demoswing_2.yytex",
"micro_dinorun_0.yytex",
"micro_dodge_0.yytex",
"micro_firework_0.yytex",
"micro_foodcatch_0.yytex",
"micro_gartjump_0.yytex",
"micro_hammer_0.yytex",
"micro_hammer_1.yytex",
"micro_jetpack_0.yytex",
"micro_jetpack_1.yytex",
"micro_jetpack_2.yytex",
"micro_jetpack_3.yytex",
"micro_karatedodge_0.yytex",
"micro_karatedodge_1.yytex",
"micro_kiss_0.yytex",
"micro_kiss_1.yytex",
"micro_kittymeow_0.yytex",
"micro_kittymeow_1.yytex",
"micro_monstertruck_0.yytex",
"micro_mugshot_0.yytex",
"micro_mugshot_1.yytex",
"micro_mugshot_2.yytex",
"micro_mugshot_3.yytex",
"micro_nudematch_0.yytex",
"micro_nudematch_1.yytex",
"micro_nudematch_2.yytex",
"micro_onionring_0.yytex",
"micro_onionring_1.yytex",
"micro_onionring_2.yytex",
"micro_onionring_3.yytex",
"micro_pistol_0.yytex",
"micro_pistol_1.yytex",
"micro_pistol_2.yytex",
"micro_pistol_3.yytex",
"micro_pistol_4.yytex",
"micro_skate_0.yytex",
"micro_skate_1.yytex",
"micro_skate_2.yytex",
"micro_sketch_collect_0.yytex",
"micro_smash_0.yytex",
"micro_smash_1.yytex",
"micro_smash_2.yytex",
"micro_superhero_0.yytex",
"micro_washdog_0.yytex",
"micro_wizardstab_0.yytex",
"micro_wizardstab_1.yytex",
"micro_wizardstab_2.yytex",
"micro_wizardstab_3.yytex",
"micro_wizardstab_4.yytex",
"micro_wizardstab_5.yytex",
"micro_wizardstab_6.yytex",
"micro_wizardstab_7.yytex",
"micro_wizardstab_8.yytex",
"micro_wizardstab_9.yytex",
"tg_macro_knives_0.yytex",
"tg_macro_knives_1.yytex",
"tg_macro_knives_10.yytex",
"tg_macro_knives_11.yytex",
"tg_macro_knives_12.yytex",
"tg_macro_knives_13.yytex",
"tg_macro_knives_14.yytex",
"tg_macro_knives_15.yytex",
"tg_macro_knives_2.yytex",
"tg_macro_knives_3.yytex",
"tg_macro_knives_4.yytex",
"tg_macro_knives_5.yytex",
"tg_macro_knives_6.yytex",
"tg_macro_knives_7.yytex",
"tg_macro_knives_8.yytex",
"tg_macro_knives_9.yytex",
"videos/explosion.mp4"
];

self.addEventListener("fetch", (event) => {
  const should_cache = CACHE_FILES.some((f) => {
      return event.request.url.endsWith(f);
  });
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (should_cache) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.allSettled(
      keys.map((key) => {
        try {
          const data = JSON.parse(key);
          if (data && data["name"] && data.name == GAME_NAME &&
              data.version && data.version != GAME_VERSION) {
            return caches.delete(key);
          }
        } catch {
          return;
        }
      })
    )).then(() => {
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
