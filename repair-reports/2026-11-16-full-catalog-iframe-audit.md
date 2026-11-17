# Full-catalog iframe/load diagnostic — 2026-11-16

Scanned 199 game folders in a top-level tab and in iframe.srcdoc, reproducing the production Games page injected jsDelivr base URL.
This is a load/embedding smoke test, not a gameplay certification. No game folders were modified or removed.
The diagnostic server reproduces the production Games page iframe.srcdoc/base URL behavior and stubs its missing /game-capture.js helper. Cached jsDelivr game-folder files and each game _ext cache are served from the checked-out repository.
## Summary

| Result | Games |
|---|---:|
| offline-game-assets-missing | 165 |
| runtime-visible-in-iframe | 13 |
| no-runtime-element-detected | 8 |
| uncached-external-dependency | 7 |
| harness-error | 3 |
| user-confirmed-working | 1 |
| possible-iframe-block-or-content-collapse | 1 |
| remote-websocket-service | 1 |

## Per-game results

| Game | Result | Tab runtime | Iframe runtime | Missing offline dependencies | Local request errors | WebSockets |
|---|---|---:|---:|---:|---:|---:|
| 3D Bowling | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| 8 Ball Pool | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| A Small World Cup | offline-game-assets-missing | 1 | 2 | 14 | 0 | 0 |
| Among Us | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Angry Birds | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Angry Birds Chrome | offline-game-assets-missing | 0 | 0 | 8 | 0 | 0 |
| Awesome Tanks | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Backrooms | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Bacon May Die | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Bad Ice Cream | offline-game-assets-missing | 0 | 0 | 6 | 0 | 0 |
| Bad Ice Cream 2 | offline-game-assets-missing | 0 | 0 | 7 | 0 | 0 |
| Baldi's Basics | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Ball Blast | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Basket Random | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Big NEON Tower Tiny Square | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Bit Planes | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| bit-planes | offline-game-assets-missing | 5 | 5 | 3 | 0 | 0 |
| BitLife | user-confirmed-working | 2 | 2 | 6 | 0 | 0 |
| Blocky Snakes | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Bloons TD 2 | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Bloons TD 4 | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Bloxorz | uncached-external-dependency | 2 | 2 | 1 | 0 | 0 |
| Boom Slingers | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| boom-slingers | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Bouncemasters | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Boxing Random | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Brawl Guys.io | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Brotato | offline-game-assets-missing | 1 | 1 | 4 | 0 | 0 |
| Buckshot Roulette | offline-game-assets-missing | 1 | 1 | 4 | 0 | 0 |
| Build Now GG | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| build-now-gg | offline-game-assets-missing | 0 | 0 | 6 | 0 | 0 |
| bust-a-loop | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Bust-a-Loop | possible-iframe-block-or-content-collapse | 1 | — | 2 | 0 | 0 |
| Cacao Language Translator | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Camouflage and Sniper | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Candy Crush | offline-game-assets-missing | 1 | 1 | 67 | 0 | 0 |
| Cannon Balls 3D | offline-game-assets-missing | 0 | 0 | 4 | 0 | 0 |
| Cat Gunner_ Super Zombie Shoot | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Cheese Chompers | offline-game-assets-missing | 2 | 2 | 1 | 0 | 0 |
| cheese-chompers | offline-game-assets-missing | 2 | 2 | 2 | 0 | 0 |
| Chess Classic | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Clash Of Vikings | offline-game-assets-missing | 1 | 1 | 5 | 0 | 0 |
| Clover Pit | offline-game-assets-missing | 2 | 2 | 6 | 0 | 0 |
| CloverPit | offline-game-assets-missing | 2 | 2 | 7 | 0 | 0 |
| Cluster Rush | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Cookie Clicker | offline-game-assets-missing | 2 | 2 | 8 | 0 | 0 |
| Cool Cars Run 3D | offline-game-assets-missing | 2 | 2 | 4 | 0 | 0 |
| Coreball | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Crazy Cars | offline-game-assets-missing | 0 | 0 | 7 | 0 | 0 |
| Crazy Cattle 3D | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Crazy Chicken 3D | offline-game-assets-missing | 2 | 2 | 8 | 0 | 0 |
| Crazy Grand Prix | offline-game-assets-missing | 2 | 2 | 1 | 0 | 0 |
| Crazy Kitty 3D | offline-game-assets-missing | 1 | 1 | 4 | 0 | 0 |
| Crossy Road | offline-game-assets-missing | 1 | 1 | 6 | 0 | 0 |
| Crush Cars 3D | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Cuphead | offline-game-assets-missing | 1 | 1 | 110 | 0 | 0 |
| Cut the Rope | uncached-external-dependency | 3 | 3 | 165 | 0 | 0 |
| Dadish | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Dadish 2 | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Dadish 3 | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Dadish 3D | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Dalgona Candy Honeycomb Cookie | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Death Run 3D | offline-game-assets-missing | 1 | 1 | 7 | 0 | 0 |
| Demolotion Derby 3 | offline-game-assets-missing | 2 | 2 | 1 | 0 | 0 |
| Destroy The Car 3D | runtime-visible-in-iframe | 2 | 2 | 0 | 0 | 0 |
| Doodle Jump | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Draw Climber | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Draw Joust | runtime-visible-in-iframe | 2 | 2 | 0 | 0 | 0 |
| Draw the Hill | offline-game-assets-missing | 0 | 0 | 5 | 0 | 0 |
| Draw the Line | offline-game-assets-missing | 2 | 2 | 4 | 0 | 0 |
| Drift Boss | offline-game-assets-missing | 2 | 2 | 36 | 1 | 0 |
| Drift Hunters | offline-game-assets-missing | 2 | 2 | 7 | 0 | 0 |
| Duck Life | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Duck Life 2 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Elastic Man | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Escape Road | offline-game-assets-missing | 2 | 2 | 7 | 0 | 0 |
| Escape Road 2 | offline-game-assets-missing | 2 | 2 | 2 | 0 | 0 |
| Escape Road 3 | offline-game-assets-missing | 0 | 0 | 16 | 0 | 0 |
| Fallout | offline-game-assets-missing | 0 | 0 | 4 | 0 | 0 |
| FC 25 | uncached-external-dependency | 0 | 0 | 1 | 0 | 0 |
| fc-25 | uncached-external-dependency | 0 | 0 | 1 | 0 | 0 |
| Fears To Fathom | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Fire and Frost Master | runtime-visible-in-iframe | 2 | 2 | 0 | 0 | 0 |
| Five Nights at Freddy's | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Five Nights at Freddy's 2 | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Five Nights at Freddy's 3 | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Five Nights at Freddy's 4 | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Five Nights at Freddys Ultimate Custom Night | offline-game-assets-missing | 1 | 1 | 4 | 0 | 0 |
| Five Nights at FrickBears 3 | offline-game-assets-missing | 0 | 0 | 15 | 0 | 0 |
| Flappy Bird | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Flappy Dunk | offline-game-assets-missing | 1 | 1 | 23 | 0 | 1 |
| Flip Master | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| FNaF_ Ultimate Custom Night | offline-game-assets-missing | 1 | 1 | 18 | 0 | 0 |
| FNF seeks cool deltarune | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF Supermario Bros Funk Mix all-stars | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF vs Henry Stickmin | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF vs Henry Stickmin v3.0 | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF vs Imposter V4 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| FNF vs Packman | harness-error | — | — | 0 | 0 | 0 |
| FNF vs Pibby Corrupted | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| FNF vs Super Mario Bros | harness-error | — | — | 0 | 0 | 0 |
| FNF vs Super Mario Bros Funkers | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF_ Lobotomy Dash Funkin' | offline-game-assets-missing | 1 | 1 | 150 | 0 | 0 |
| FNF_ Mario Funk Mix | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| FNF_ Seeks Cool Deltarune | harness-error | — | — | 0 | 0 | 0 |
| Fork n Sausage | offline-game-assets-missing | 2 | 2 | 4 | 0 | 0 |
| Friday Night Flashing | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Friday Night Funkin | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Friday Night Funkin vs Packman | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Friday Night Funkin'_ FIRE IN THE HOLE_ Lobotomy Dash Funkin' | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Fruit Merge | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Fruit Ninja | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Getaway Shootout | offline-game-assets-missing | 2 | 2 | 4 | 0 | 0 |
| Getting Over It with Bennett Foddy | offline-game-assets-missing | 2 | 2 | 36 | 0 | 0 |
| Gobble | offline-game-assets-missing | 1 | 1 | 6 | 0 | 0 |
| Google Baseball | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Google Feud | offline-game-assets-missing | 0 | 0 | 4 | 0 | 0 |
| Google Snake | offline-game-assets-missing | 2 | 2 | 7 | 0 | 0 |
| Gorilla Tag | offline-game-assets-missing | 0 | 0 | 10 | 0 | 0 |
| Growden.io | offline-game-assets-missing | 2 | 2 | 10 | 0 | 0 |
| Ice Age Baby | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Idle Mining Empire | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Jelly Drift | offline-game-assets-missing | 0 | 0 | 4 | 0 | 0 |
| Jelly Mario | offline-game-assets-missing | 0 | 0 | 5 | 0 | 0 |
| JustFall.lol | offline-game-assets-missing | 0 | 0 | 7 | 0 | 0 |
| Kindergarten | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Kindergarten 2 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Kindergarten 3 | runtime-visible-in-iframe | 1 | 1 | 0 | 0 | 0 |
| Learn to Fly | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Learn to Fly 2 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Learn to Fly 3 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Mahjong | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Make a SuperBoat | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Makeover Run | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Melon Playground | offline-game-assets-missing | 2 | 2 | 1 | 0 | 0 |
| Minecraft 1.8.8 | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Minesweeper Mania | offline-game-assets-missing | 1 | 1 | 9 | 0 | 0 |
| Monkey Mart | offline-game-assets-missing | 1 | 1 | 3 | 1 | 0 |
| Monster Tracks | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Moto X3M | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Moto X3M 2 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Moto X3M 3 | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Ninja vs EvilCorp | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Paper.io 2 | uncached-external-dependency | 1 | 1 | 3 | 0 | 0 |
| Papery Planes | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| People Playground | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Pizza Tower | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Plants vs Zombies | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Pokemon Emerald | offline-game-assets-missing | 0 | 0 | 13 | 0 | 0 |
| Poly Track | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Raft | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Raft Wars | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Raft Wars 2 | offline-game-assets-missing | 1 | 0 | 2 | 0 | 0 |
| Ragdoll Archers | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Ragdoll Hit | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Recoil | offline-game-assets-missing | 1 | 1 | 5 | 0 | 0 |
| Red Ball | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Retro Bowl | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Rooftop Snipers | offline-game-assets-missing | 1 | 0 | 5 | 0 | 0 |
| Rooftop Snipers 2 | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Run 1 | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Schoolboy Runaway | offline-game-assets-missing | 2 | 2 | 18 | 0 | 0 |
| Slither.io | offline-game-assets-missing | 0 | 0 | 7 | 0 | 0 |
| Slope | offline-game-assets-missing | 1 | 1 | 5 | 0 | 0 |
| Slope 2 | offline-game-assets-missing | 2 | 2 | 3 | 0 | 0 |
| Smash Karts | offline-game-assets-missing | 0 | 0 | 9 | 0 | 0 |
| Snow Rider 3D | offline-game-assets-missing | 2 | 2 | 3 | 0 | 0 |
| Snowbattle.io | offline-game-assets-missing | 1 | 1 | 9 | 0 | 0 |
| Solar Smash | offline-game-assets-missing | 2 | 2 | 3 | 0 | 0 |
| Sonic 1 | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Sonic-1-WASM-main | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Soundboard | offline-game-assets-missing | 0 | 0 | 4 | 0 | 0 |
| Stack | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Stacky Dash | offline-game-assets-missing | 2 | 2 | 4 | 0 | 0 |
| State.io | offline-game-assets-missing | 1 | 1 | 3 | 0 | 0 |
| Steal A Brainrot | offline-game-assets-missing | 2 | 2 | 6 | 0 | 0 |
| Stick With It | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Stickman and Guns | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Stickman Climb | offline-game-assets-missing | 0 | 0 | 8 | 0 | 0 |
| Stickman Fight Ragdoll | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Stickman Golf | offline-game-assets-missing | 1 | 1 | 7 | 0 | 0 |
| Stickman Hook | offline-game-assets-missing | 0 | 0 | 3 | 0 | 0 |
| Subway Surfers | offline-game-assets-missing | 0 | 0 | 6 | 0 | 0 |
| Super Mario 63 | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| Super Mario 64 | offline-game-assets-missing | 1 | 1 | 1 | 0 | 0 |
| Super Mario Bros | uncached-external-dependency | 0 | 0 | 2 | 0 | 0 |
| Superhot | uncached-external-dependency | 1 | 1 | 4 | 0 | 0 |
| Supermarket 3D | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Temple Run 2 | offline-game-assets-missing | 1 | 1 | 2 | 0 | 0 |
| Territorial.io | remote-websocket-service | 2 | 2 | 0 | 0 | 1 |
| The World's Hardest Game | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| This Is The Only Level | offline-game-assets-missing | 0 | 0 | 1 | 0 | 0 |
| Time Shooter | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Time Shooter 2 | offline-game-assets-missing | 2 | 2 | 5 | 0 | 0 |
| Time Shooter 3 | offline-game-assets-missing | 2 | 2 | 3 | 0 | 0 |
| ULTRAKILL | offline-game-assets-missing | 0 | 0 | 2 | 0 | 0 |
| War The Knights | offline-game-assets-missing | 2 | 2 | 2 | 0 | 0 |
| Winding Road | no-runtime-element-detected | 0 | 0 | 0 | 0 | 0 |
| Wounded Summer Baby | offline-game-assets-missing | 2 | 2 | 1 | 0 | 0 |

## Interpretation

- possible-iframe-block-or-content-collapse: a runtime-like element appeared as a tab but not in iframe.srcdoc; inspect the source and live page before changing it.
- user-confirmed-working: the user has confirmed this game works on the live site; it is not counted as broken by this offline audit.
- iframe-caused-parent-navigation: likely frame-busting or redirect behavior.
- offline-game-assets-missing: key scripts, loaders, JSON/data, WASM, SWF or equivalent assets are absent from the folder and its cached _ext files.
- uncached-external-dependency: a non-optional remote dependency is not present in the local _ext cache.
- optional analytics/ad requests are blocked and are reported separately rather than counted as game dependencies.
- runtime-visible-in-iframe: a canvas/player-like element exists in the frame, but gameplay still needs manual input testing.
- no-runtime-element-detected: may be a loader, DOM-only game, or incomplete build; review manually.
