# Full-catalog iframe/load diagnostic — 2026-11-16

Scanned 199 game folders as top-level CDN URLs and in a full-size iframe whose src points to the same CDN URL, matching the updated production Games page.
This is a load/embedding smoke test, not a gameplay certification. No game folders were modified or removed.
The diagnostic server reproduces direct CDN iframe navigation and stubs the missing game-capture helper. Cached game-folder files and each games _ext cache are served from the checked-out repository.
## Summary

| Result | Games |
|---|---:|
| offline-game-assets-missing | 172 |
| uncached-external-dependency | 12 |
| runtime-visible-in-iframe | 7 |
| no-runtime-element-detected | 4 |
| iframe-only-block-or-collapse | 2 |
| user-confirmed-working | 1 |
| remote-websocket-service | 1 |

## Per-game results

| Game | Result | Tab runtime | Iframe runtime | Missing offline dependencies | Local request errors | WebSockets |
|---|---|---:|---:|---:|---:|---:|
| 3D Bowling | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| 8 Ball Pool | no-runtime-element-detected | 0 | — | 0 | 1 | 0 |
| A Small World Cup | offline-game-assets-missing | 1 | — | 15 | 1 | 0 |
| Among Us | iframe-only-block-or-collapse | 1 | — | 27 | 1 | 0 |
| Angry Birds | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| Angry Birds Chrome | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Awesome Tanks | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| Backrooms | runtime-visible-in-iframe | 1 | — | 0 | 2 | 0 |
| Bacon May Die | offline-game-assets-missing | 1 | — | 31 | 1 | 0 |
| Bad Ice Cream | offline-game-assets-missing | 0 | — | 9 | 2 | 0 |
| Bad Ice Cream 2 | offline-game-assets-missing | 0 | — | 10 | 1 | 0 |
| Baldi's Basics | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| Ball Blast | offline-game-assets-missing | 1 | — | 1 | 2 | 0 |
| Basket Random | offline-game-assets-missing | 0 | — | 17 | 1 | 0 |
| Big NEON Tower Tiny Square | offline-game-assets-missing | 1 | — | 58 | 1 | 0 |
| Bit Planes | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| bit-planes | offline-game-assets-missing | 5 | — | 3 | 1 | 0 |
| BitLife | user-confirmed-working | 2 | — | 6 | 1 | 0 |
| Blocky Snakes | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| Bloons TD 2 | offline-game-assets-missing | 0 | — | 1 | 2 | 0 |
| Bloons TD 4 | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Bloxorz | uncached-external-dependency | 2 | — | 1 | 2 | 0 |
| Boom Slingers | offline-game-assets-missing | 1 | — | 5 | 1 | 0 |
| boom-slingers | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Bouncemasters | offline-game-assets-missing | 0 | — | 4 | 1 | 0 |
| Boxing Random | offline-game-assets-missing | 1 | — | 5 | 1 | 0 |
| Brawl Guys.io | offline-game-assets-missing | 1 | — | 4 | 1 | 0 |
| Brotato | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Buckshot Roulette | offline-game-assets-missing | 1 | — | 4 | 1 | 0 |
| Build Now GG | uncached-external-dependency | 1 | — | 3 | 1 | 0 |
| build-now-gg | offline-game-assets-missing | 0 | — | 6 | 1 | 0 |
| bust-a-loop | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Bust-a-Loop | iframe-only-block-or-collapse | 1 | — | 2 | 1 | 0 |
| Cacao Language Translator | no-runtime-element-detected | 0 | — | 0 | 1 | 0 |
| Camouflage and Sniper | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Candy Crush | offline-game-assets-missing | 1 | — | 67 | 1 | 0 |
| Cannon Balls 3D | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Cat Gunner_ Super Zombie Shoot | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Cheese Chompers | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| cheese-chompers | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Chess Classic | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Clash Of Vikings | offline-game-assets-missing | 1 | — | 150 | 1 | 0 |
| Clover Pit | offline-game-assets-missing | 2 | — | 6 | 1 | 0 |
| CloverPit | offline-game-assets-missing | 2 | — | 7 | 2 | 0 |
| Cluster Rush | uncached-external-dependency | 1 | — | 6 | 2 | 0 |
| Cookie Clicker | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| Cool Cars Run 3D | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Coreball | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Crazy Cars | offline-game-assets-missing | 1 | — | 4 | 2 | 0 |
| Crazy Cattle 3D | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Crazy Chicken 3D | offline-game-assets-missing | 2 | — | 8 | 2 | 0 |
| Crazy Grand Prix | offline-game-assets-missing | 2 | — | 1 | 2 | 0 |
| Crazy Kitty 3D | offline-game-assets-missing | 1 | — | 4 | 1 | 0 |
| Crossy Road | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Crush Cars 3D | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Cuphead | offline-game-assets-missing | 1 | — | 109 | 1 | 0 |
| Cut the Rope | uncached-external-dependency | 3 | — | 164 | 2 | 0 |
| Dadish | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Dadish 2 | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Dadish 3 | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Dadish 3D | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Dalgona Candy Honeycomb Cookie | uncached-external-dependency | 1 | — | 2 | 1 | 0 |
| Death Run 3D | offline-game-assets-missing | 2 | — | 4 | 1 | 0 |
| Demolotion Derby 3 | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Destroy The Car 3D | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Doodle Jump | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Draw Climber | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Draw Joust | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Draw the Hill | offline-game-assets-missing | 0 | — | 5 | 1 | 0 |
| Draw the Line | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Drift Boss | offline-game-assets-missing | 2 | — | 39 | 2 | 0 |
| Drift Hunters | offline-game-assets-missing | 2 | — | 6 | 1 | 0 |
| Duck Life | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Duck Life 2 | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Elastic Man | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Escape Road | offline-game-assets-missing | 3 | — | 3 | 1 | 0 |
| Escape Road 2 | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Escape Road 3 | offline-game-assets-missing | 0 | — | 12 | 2 | 0 |
| Fallout | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| FC 25 | uncached-external-dependency | 0 | — | 1 | 1 | 0 |
| fc-25 | uncached-external-dependency | 0 | — | 1 | 1 | 0 |
| Fears To Fathom | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Fire and Frost Master | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Five Nights at Freddy's | offline-game-assets-missing | 1 | — | 10 | 1 | 0 |
| Five Nights at Freddy's 2 | offline-game-assets-missing | 1 | — | 11 | 2 | 0 |
| Five Nights at Freddy's 3 | offline-game-assets-missing | 1 | — | 12 | 2 | 0 |
| Five Nights at Freddy's 4 | offline-game-assets-missing | 1 | — | 20 | 1 | 0 |
| Five Nights at Freddys Ultimate Custom Night | offline-game-assets-missing | 1 | — | 4 | 1 | 0 |
| Five Nights at FrickBears 3 | offline-game-assets-missing | 0 | — | 15 | 1 | 0 |
| Flappy Bird | runtime-visible-in-iframe | 1 | — | 0 | 1 | 0 |
| Flappy Dunk | uncached-external-dependency | 1 | — | 15 | 1 | 0 |
| Flip Master | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| FNaF_ Ultimate Custom Night | offline-game-assets-missing | 1 | — | 18 | 1 | 0 |
| FNF seeks cool deltarune | offline-game-assets-missing | 0 | — | 3 | 2 | 0 |
| FNF Supermario Bros Funk Mix all-stars | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF vs Henry Stickmin | offline-game-assets-missing | 0 | — | 3 | 2 | 0 |
| FNF vs Henry Stickmin v3.0 | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF vs Imposter V4 | offline-game-assets-missing | 1 | — | 50 | 2 | 0 |
| FNF vs Packman | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF vs Pibby Corrupted | offline-game-assets-missing | 1 | — | 108 | 1 | 0 |
| FNF vs Super Mario Bros | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF vs Super Mario Bros Funkers | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF_ Lobotomy Dash Funkin' | offline-game-assets-missing | 1 | — | 150 | 2 | 0 |
| FNF_ Mario Funk Mix | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| FNF_ Seeks Cool Deltarune | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Fork n Sausage | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Friday Night Flashing | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Friday Night Funkin | offline-game-assets-missing | 1 | — | 144 | 1 | 0 |
| Friday Night Funkin vs Packman | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Friday Night Funkin'_ FIRE IN THE HOLE_ Lobotomy Dash Funkin' | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Fruit Merge | uncached-external-dependency | 1 | — | 2 | 1 | 0 |
| Fruit Ninja | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Getaway Shootout | offline-game-assets-missing | 2 | — | 4 | 1 | 0 |
| Getting Over It with Bennett Foddy | offline-game-assets-missing | 2 | — | 35 | 1 | 0 |
| Gobble | offline-game-assets-missing | 1 | — | 4 | 1 | 0 |
| Google Baseball | offline-game-assets-missing | 1 | — | 9 | 1 | 0 |
| Google Feud | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Google Snake | offline-game-assets-missing | 2 | — | 10 | 1 | 0 |
| Gorilla Tag | offline-game-assets-missing | 0 | — | 9 | 1 | 0 |
| Growden.io | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Ice Age Baby | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Idle Mining Empire | offline-game-assets-missing | 1 | — | 37 | 1 | 0 |
| Jelly Drift | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Jelly Mario | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| JustFall.lol | offline-game-assets-missing | 2 | — | 7 | 1 | 0 |
| Kindergarten | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Kindergarten 2 | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Kindergarten 3 | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Learn to Fly | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Learn to Fly 2 | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Learn to Fly 3 | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Mahjong | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Make a SuperBoat | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Makeover Run | offline-game-assets-missing | 2 | — | 2 | 2 | 0 |
| Melon Playground | offline-game-assets-missing | 2 | — | 1 | 2 | 0 |
| Minecraft 1.8.8 | no-runtime-element-detected | 0 | — | 0 | 1 | 0 |
| Minesweeper Mania | offline-game-assets-missing | 1 | — | 8 | 1 | 0 |
| Monkey Mart | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Monster Tracks | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Moto X3M | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Moto X3M 2 | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Moto X3M 3 | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Ninja vs EvilCorp | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Paper.io 2 | uncached-external-dependency | 1 | — | 2 | 1 | 0 |
| Papery Planes | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| People Playground | offline-game-assets-missing | 2 | — | 4 | 1 | 0 |
| Pizza Tower | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Plants vs Zombies | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Pokemon Emerald | offline-game-assets-missing | 0 | — | 15 | 1 | 0 |
| Poly Track | offline-game-assets-missing | 1 | — | 50 | 1 | 0 |
| Raft | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Raft Wars | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Raft Wars 2 | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Ragdoll Archers | offline-game-assets-missing | 2 | — | 2 | 1 | 0 |
| Ragdoll Hit | offline-game-assets-missing | 0 | — | 1 | 2 | 0 |
| Recoil | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Red Ball | offline-game-assets-missing | 0 | — | 2 | 2 | 0 |
| Retro Bowl | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Rooftop Snipers | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| Rooftop Snipers 2 | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Run 1 | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Schoolboy Runaway | offline-game-assets-missing | 2 | — | 17 | 1 | 0 |
| Slither.io | offline-game-assets-missing | 0 | — | 7 | 1 | 0 |
| Slope | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Slope 2 | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |
| Smash Karts | offline-game-assets-missing | 0 | — | 4 | 1 | 0 |
| Snow Rider 3D | offline-game-assets-missing | 2 | — | 3 | 2 | 0 |
| Snowbattle.io | offline-game-assets-missing | 2 | — | 6 | 1 | 0 |
| Solar Smash | offline-game-assets-missing | 2 | — | 2 | 2 | 0 |
| Sonic 1 | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Sonic-1-WASM-main | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Soundboard | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Stack | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Stacky Dash | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| State.io | offline-game-assets-missing | 1 | — | 71 | 1 | 0 |
| Steal A Brainrot | offline-game-assets-missing | 2 | — | 4 | 1 | 0 |
| Stick With It | offline-game-assets-missing | 1 | — | 1 | 1 | 0 |
| Stickman and Guns | offline-game-assets-missing | 1 | — | 2 | 1 | 0 |
| Stickman Climb | offline-game-assets-missing | 1 | — | 5 | 1 | 0 |
| Stickman Fight Ragdoll | offline-game-assets-missing | 1 | — | 17 | 1 | 0 |
| Stickman Golf | offline-game-assets-missing | 1 | — | 140 | 1 | 0 |
| Stickman Hook | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Subway Surfers | offline-game-assets-missing | 0 | — | 3 | 1 | 0 |
| Super Mario 63 | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| Super Mario 64 | offline-game-assets-missing | 1 | — | 1 | 2 | 0 |
| Super Mario Bros | uncached-external-dependency | 0 | — | 2 | 1 | 0 |
| Superhot | uncached-external-dependency | 1 | — | 4 | 2 | 0 |
| Supermarket 3D | offline-game-assets-missing | 2 | — | 5 | 2 | 0 |
| Temple Run 2 | offline-game-assets-missing | 1 | — | 3 | 1 | 0 |
| Territorial.io | remote-websocket-service | 2 | — | 0 | 1 | 1 |
| The World's Hardest Game | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| This Is The Only Level | offline-game-assets-missing | 0 | — | 1 | 1 | 0 |
| Time Shooter | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| Time Shooter 2 | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| Time Shooter 3 | offline-game-assets-missing | 2 | — | 3 | 1 | 0 |
| ULTRAKILL | offline-game-assets-missing | 0 | — | 2 | 1 | 0 |
| War The Knights | offline-game-assets-missing | 2 | — | 6 | 1 | 0 |
| Winding Road | no-runtime-element-detected | 0 | — | 0 | 1 | 0 |
| Wounded Summer Baby | offline-game-assets-missing | 2 | — | 1 | 1 | 0 |

## Interpretation

- iframe-only-block-or-collapse: a runtime-like element appeared in a tab but not in the direct-URL iframe; inspect the source and live page before changing it.
- user-confirmed-working: the user has confirmed this game works on the live site; it is not counted as broken by this offline audit.
- iframe-caused-parent-navigation: likely frame-busting or redirect behavior.
- offline-game-assets-missing: key scripts, loaders, JSON/data, WASM, SWF or equivalent assets are absent from the folder and its cached _ext files.
- uncached-external-dependency: a non-optional remote dependency is not present in the local _ext cache.
- optional analytics/ad requests are blocked and are reported separately rather than counted as game dependencies.
- runtime-visible-in-iframe: a canvas/player-like element exists in the frame, but gameplay still needs manual input testing.
- no-runtime-element-detected: may be a loader, DOM-only game, or incomplete build; review manually.
