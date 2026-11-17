# Full-catalog iframe/load diagnostic — 2026-11-16

Scanned 204 game folders in a top-level tab and a same-origin full-size iframe.
This is a load/embedding smoke test, not a gameplay certification. No game folders were modified or removed.
The diagnostic server stubs /game-capture.js because that helper is provided by the live site, not stored with each game.

## Summary

| Result | Games |
|---|---:|
| iframe-resource-errors | 178 |
| no-runtime-element-detected | 14 |
| runtime-visible-in-iframe | 10 |
| possible-iframe-block-or-content-collapse | 2 |

## Per-game results

| Game | Result | Tab runtime | Iframe runtime | Iframe HTTP/failures | Iframe external requests |
|---|---|---:|---:|---:|---:|
| 3D Bowling | runtime-visible-in-iframe | 1 | 1 | 0 | 0 |
| 8 Ball Pool | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| A Small World Cup | iframe-resource-errors | 2 | 2 | 2 | 0 |
| Among Us | iframe-resource-errors | 0 | 0 | 27 | 0 |
| Angry Birds | runtime-visible-in-iframe | 1 | 1 | 0 | 3 |
| Angry Birds Chrome | iframe-resource-errors | 2 | 2 | 70 | 121 |
| Awesome Tanks | iframe-resource-errors | 1 | 1 | 4 | 0 |
| Backrooms | runtime-visible-in-iframe | 1 | 1 | 0 | 0 |
| Bacon May Die | iframe-resource-errors | 2 | 1 | 6 | 43 |
| Bad Ice Cream | iframe-resource-errors | 0 | 0 | 15 | 35 |
| Bad Ice Cream 2 | iframe-resource-errors | 0 | 0 | 12 | 34 |
| Baldi's Basics | runtime-visible-in-iframe | 1 | 1 | 0 | 0 |
| Ball Blast | iframe-resource-errors | 1 | 1 | 12 | 15 |
| Basket Random | iframe-resource-errors | 0 | 1 | 35 | 16 |
| Big NEON Tower Tiny Square | iframe-resource-errors | 0 | 1 | 1 | 121 |
| Bit Planes | iframe-resource-errors | 1 | 1 | 1 | 4 |
| bit-planes | iframe-resource-errors | 5 | 5 | 5 | 3 |
| BitLife | iframe-resource-errors | 2 | 2 | 3 | 7 |
| Block Blast | iframe-resource-errors | 2 | 2 | 4 | 1 |
| BlockPost | iframe-resource-errors | 0 | 0 | 2 | 26 |
| Blocky Snakes | runtime-visible-in-iframe | 1 | 1 | 0 | 0 |
| Bloons TD 2 | no-runtime-element-detected | 0 | 0 | 0 | 4 |
| Bloons TD 4 | no-runtime-element-detected | 0 | 0 | 0 | 4 |
| Bloxorz | no-runtime-element-detected | 0 | 0 | 0 | 1 |
| Boom Slingers | iframe-resource-errors | 1 | 1 | 7 | 0 |
| boom-slingers | iframe-resource-errors | 1 | 1 | 6 | 0 |
| Bouncemasters | iframe-resource-errors | 1 | 1 | 11 | 8 |
| Boxing Random | iframe-resource-errors | 0 | 1 | 46 | 11 |
| Brawl Guys.io | iframe-resource-errors | 1 | 1 | 19 | 11 |
| Brotato | iframe-resource-errors | 1 | 1 | 2 | 18 |
| Buckshot Roulette | iframe-resource-errors | 1 | 1 | 4 | 4 |
| Build Now GG | iframe-resource-errors | 1 | 1 | 3 | 0 |
| build-now-gg | iframe-resource-errors | 0 | 0 | 12 | 0 |
| bust-a-loop | possible-iframe-block-or-content-collapse | 1 | — | 2 | 29 |
| Bust-a-Loop | possible-iframe-block-or-content-collapse | 1 | — | 1 | 7 |
| Cacao Language Translator | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Camouflage and Sniper | iframe-resource-errors | 2 | 2 | 1 | 13 |
| Candy Crush | iframe-resource-errors | 1 | 1 | 6 | 38 |
| Cannon Balls 3D | iframe-resource-errors | 0 | 0 | 3 | 11 |
| Cat Gunner_ Super Zombie Shoot | iframe-resource-errors | 0 | 1 | 4 | 2 |
| Cheese Chompers | iframe-resource-errors | 2 | 2 | 2 | 0 |
| cheese-chompers | iframe-resource-errors | 2 | 2 | 4 | 0 |
| Chess Classic | iframe-resource-errors | 0 | 0 | 2 | 8 |
| Clash Of Vikings | iframe-resource-errors | 1 | 1 | 2 | 140 |
| Clover Pit | iframe-resource-errors | 2 | 2 | 8 | 0 |
| CloverPit | iframe-resource-errors | 2 | 2 | 4 | 11 |
| Cluster Rush | iframe-resource-errors | 1 | 1 | 3 | 10 |
| Cookie Clicker | iframe-resource-errors | 2 | 2 | 8 | 63 |
| Cool Cars Run 3D | iframe-resource-errors | 2 | 2 | 1 | 4 |
| Coreball | iframe-resource-errors | 0 | 0 | 2 | 19 |
| Crazy Cars | iframe-resource-errors | 1 | 1 | 2 | 133 |
| Crazy Cattle 3D | iframe-resource-errors | 1 | 1 | 2 | 17 |
| Crazy Chicken 3D | iframe-resource-errors | 2 | 2 | 8 | 8 |
| Crazy Grand Prix | iframe-resource-errors | 0 | — | 3 | 4 |
| Crazy Kitty 3D | iframe-resource-errors | 1 | 1 | 4 | 4 |
| Crossy Road | iframe-resource-errors | 2 | 2 | 2 | 39 |
| Crush Cars 3D | iframe-resource-errors | 2 | 2 | 1 | 13 |
| Cuphead | iframe-resource-errors | 1 | 1 | 110 | 119 |
| Cut the Rope | iframe-resource-errors | 3 | 3 | 51 | 226 |
| Dadish | iframe-resource-errors | 1 | 1 | 59 | 196 |
| Dadish 2 | iframe-resource-errors | 1 | 1 | 33 | 166 |
| Dadish 3 | iframe-resource-errors | 2 | 1 | 2 | 174 |
| Dadish 3D | iframe-resource-errors | 0 | 0 | 12 | 38 |
| Dalgona Candy Honeycomb Cookie | iframe-resource-errors | 1 | 1 | 2 | 1 |
| Death Run 3D | iframe-resource-errors | 2 | 2 | 2 | 24 |
| Demolotion Derby 3 | iframe-resource-errors | 0 | — | 4 | 4 |
| Destroy The Car 3D | iframe-resource-errors | 2 | 2 | 4 | 0 |
| Doodle Jump | iframe-resource-errors | 1 | 1 | 4 | 26 |
| Draw Climber | iframe-resource-errors | 1 | 1 | 3 | 74 |
| Draw Joust | iframe-resource-errors | 2 | 2 | 2 | 0 |
| Draw the Hill | iframe-resource-errors | 0 | 0 | 5 | 5 |
| Draw the Line | iframe-resource-errors | 2 | 2 | 1 | 13 |
| Drift Boss | iframe-resource-errors | 2 | 2 | 26 | 7 |
| Drift Hunters | iframe-resource-errors | 2 | 2 | 4 | 25 |
| Drive Mad | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Duck Life | iframe-resource-errors | 0 | 0 | 1 | 5 |
| Duck Life 2 | iframe-resource-errors | 0 | 0 | 1 | 4 |
| Elastic Man | no-runtime-element-detected | 0 | 0 | 0 | 3 |
| Escape Road | iframe-resource-errors | 3 | 3 | 4 | 20 |
| Escape Road 2 | iframe-resource-errors | 2 | 2 | 3 | 13 |
| Escape Road 3 | iframe-resource-errors | 0 | 0 | 10 | 31 |
| Fallout | iframe-resource-errors | 0 | 0 | 2 | 6 |
| FC 25 | iframe-resource-errors | 0 | 0 | 2 | 12 |
| fc-25 | iframe-resource-errors | 0 | 0 | 4 | 13 |
| Fears To Fathom | iframe-resource-errors | 0 | 0 | 41 | 50 |
| Fire and Frost Master | iframe-resource-errors | 2 | 2 | 2 | 0 |
| Five Nights at Freddy's | iframe-resource-errors | 1 | 1 | 11 | 23 |
| Five Nights at Freddy's 2 | iframe-resource-errors | 1 | 1 | 13 | 28 |
| Five Nights at Freddy's 3 | iframe-resource-errors | 1 | 1 | 13 | 35 |
| Five Nights at Freddy's 4 | iframe-resource-errors | 1 | 1 | 22 | 37 |
| Five Nights at Freddys Ultimate Custom Night | iframe-resource-errors | 1 | 1 | 20 | 35 |
| Five Nights at FrickBears 3 | iframe-resource-errors | 0 | 0 | 11 | 16 |
| Flappy Bird | runtime-visible-in-iframe | 1 | 1 | 0 | 0 |
| Flappy Dunk | iframe-resource-errors | 1 | 1 | 9 | 7 |
| Flip Master | iframe-resource-errors | 2 | 2 | 2 | 10 |
| FNaF_ Ultimate Custom Night | iframe-resource-errors | 1 | 1 | 36 | 12 |
| FNF seeks cool deltarune | iframe-resource-errors | 0 | 0 | 8 | 0 |
| FNF Supermario Bros Funk Mix all-stars | iframe-resource-errors | 0 | 0 | 6 | 0 |
| FNF vs Henry Stickmin | iframe-resource-errors | 0 | 0 | 6 | 0 |
| FNF vs Henry Stickmin v3.0 | iframe-resource-errors | 0 | 0 | 6 | 0 |
| FNF vs Imposter V4 | iframe-resource-errors | 1 | 1 | 18 | 69 |
| FNF vs Packman | iframe-resource-errors | 0 | 0 | 7 | 1 |
| FNF vs Pibby Corrupted | iframe-resource-errors | 1 | 1 | 24 | 247 |
| FNF vs Super Mario Bros | iframe-resource-errors | 0 | 0 | 7 | 1 |
| FNF vs Super Mario Bros Funkers | iframe-resource-errors | 0 | 0 | 6 | 0 |
| FNF_ Lobotomy Dash Funkin' | iframe-resource-errors | 1 | 1 | 84 | 8 |
| FNF_ Mario Funk Mix | iframe-resource-errors | 0 | 0 | 6 | 0 |
| FNF_ Seeks Cool Deltarune | iframe-resource-errors | 0 | — | 6 | 1 |
| Fork n Sausage | iframe-resource-errors | 2 | 2 | 3 | 11 |
| Friday Night Flashing | iframe-resource-errors | 0 | 0 | 6 | 0 |
| Friday Night Funkin | iframe-resource-errors | 1 | 1 | 22 | 139 |
| Friday Night Funkin vs Packman | iframe-resource-errors | 0 | 0 | 8 | 0 |
| Friday Night Funkin'_ FIRE IN THE HOLE_ Lobotomy Dash Funkin' | iframe-resource-errors | 1 | 1 | 19 | 269 |
| Fruit Merge | iframe-resource-errors | 0 | 1 | 2 | 1 |
| Fruit Ninja | iframe-resource-errors | 1 | 1 | 9 | 33 |
| Geometry Dash | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Getaway Shootout | iframe-resource-errors | 2 | 2 | 1 | 8 |
| Getting Over It with Bennett Foddy | iframe-resource-errors | 2 | 2 | 37 | 49 |
| Gobble | iframe-resource-errors | 1 | 1 | 5 | 22 |
| Google Baseball | iframe-resource-errors | 1 | 1 | 7 | 24 |
| Google Feud | iframe-resource-errors | 0 | 0 | 1 | 4 |
| Google Snake | iframe-resource-errors | 2 | 2 | 14 | 12 |
| Gorilla Tag | iframe-resource-errors | 0 | 0 | 11 | 24 |
| Growden.io | iframe-resource-errors | 2 | 2 | 5 | 29 |
| Ice Age Baby | iframe-resource-errors | 1 | 1 | 3 | 0 |
| Idle Mining Empire | iframe-resource-errors | 1 | 1 | 5 | 34 |
| Jelly Drift | iframe-resource-errors | 0 | 0 | 3 | 15 |
| Jelly Mario | iframe-resource-errors | 0 | 0 | 2 | 106 |
| JustFall.lol | iframe-resource-errors | 2 | 2 | 2 | 15 |
| Kindergarten | iframe-resource-errors | 2 | 2 | 5 | 0 |
| Kindergarten 2 | iframe-resource-errors | 2 | 2 | 7 | 0 |
| Kindergarten 3 | iframe-resource-errors | 1 | 1 | 3 | 1 |
| Learn to Fly | iframe-resource-errors | 0 | 0 | 1 | 5 |
| Learn to Fly 2 | iframe-resource-errors | 0 | 0 | 1 | 5 |
| Learn to Fly 3 | iframe-resource-errors | 0 | 0 | 2 | 5 |
| Mahjong | iframe-resource-errors | 0 | 0 | 4 | 0 |
| Make a SuperBoat | iframe-resource-errors | 2 | 2 | 2 | 14 |
| Makeover Run | iframe-resource-errors | 2 | 2 | 3 | 11 |
| Melon Playground | iframe-resource-errors | 2 | 2 | 4 | 1 |
| Minecraft 1.8.8 | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Minesweeper Mania | iframe-resource-errors | 1 | 1 | 3 | 47 |
| Monkey Mart | iframe-resource-errors | 1 | 1 | 1 | 0 |
| Monster Tracks | iframe-resource-errors | 1 | 1 | 2 | 0 |
| Moto X3M | iframe-resource-errors | 1 | 1 | 4 | 2 |
| Moto X3M 2 | iframe-resource-errors | 1 | 1 | 2 | 20 |
| Moto X3M 3 | iframe-resource-errors | 1 | 1 | 7 | 25 |
| Ninja vs EvilCorp | iframe-resource-errors | 1 | 1 | 2 | 0 |
| Paper.io 2 | iframe-resource-errors | 1 | 1 | 6 | 8 |
| Papery Planes | iframe-resource-errors | 0 | 0 | 12 | 34 |
| People Playground | iframe-resource-errors | 2 | 2 | 9 | 29 |
| Pizza Tower | iframe-resource-errors | 0 | 0 | 7 | 17 |
| Plague Inc | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Plants vs Zombies | iframe-resource-errors | 0 | 0 | 4 | 20 |
| Pokemon Emerald | iframe-resource-errors | 0 | 0 | 1 | 24 |
| Poly Track | iframe-resource-errors | 1 | 1 | 55 | 1 |
| Raft | iframe-resource-errors | 0 | 0 | 7 | 16 |
| Raft Wars | iframe-resource-errors | 0 | 0 | 1 | 4 |
| Raft Wars 2 | iframe-resource-errors | 1 | 1 | 1 | 4 |
| Ragdoll Archers | iframe-resource-errors | 2 | 2 | 7 | 28 |
| Ragdoll Hit | iframe-resource-errors | 0 | 0 | 14 | 37 |
| Recoil | iframe-resource-errors | 1 | 1 | 6 | 17 |
| Red Ball | iframe-resource-errors | 0 | 0 | 2 | 4 |
| Retro Bowl | iframe-resource-errors | 2 | 1 | 28 | 82 |
| Rooftop Snipers | iframe-resource-errors | 2 | 2 | 4 | 25 |
| Rooftop Snipers 2 | iframe-resource-errors | 0 | 0 | 9 | 27 |
| Run 1 | iframe-resource-errors | 0 | 0 | 4 | 18 |
| Schoolboy Runaway | iframe-resource-errors | 2 | 2 | 18 | 29 |
| Slither.io | iframe-resource-errors | 0 | 0 | 23 | 42 |
| Slope | iframe-resource-errors | 1 | 2 | 3 | 26 |
| Slope 2 | runtime-visible-in-iframe | 2 | 2 | 0 | 12 |
| Smash Karts | iframe-resource-errors | 0 | 0 | 9 | 45 |
| Snow Rider 3D | runtime-visible-in-iframe | 2 | 2 | 0 | 10 |
| Snowbattle.io | iframe-resource-errors | 2 | 2 | 8 | 29 |
| Solar Smash | iframe-resource-errors | 2 | 2 | 1 | 11 |
| Sonic 1 | iframe-resource-errors | 1 | 1 | 5 | 3 |
| Sonic-1-WASM-main | iframe-resource-errors | 1 | 1 | 4 | 0 |
| Soundboard | iframe-resource-errors | 0 | 0 | 1 | 16 |
| Stack | iframe-resource-errors | 1 | 1 | 2 | 2 |
| Stacky Dash | iframe-resource-errors | 2 | 2 | 2 | 13 |
| State.io | iframe-resource-errors | 1 | 1 | 1 | 75 |
| Steal A Brainrot | iframe-resource-errors | 2 | 2 | 3 | 10 |
| Stick With It | iframe-resource-errors | 1 | 1 | 1 | 6 |
| Stickman and Guns | iframe-resource-errors | 1 | 1 | 3 | 2 |
| Stickman Climb | iframe-resource-errors | 1 | 1 | 6 | 43 |
| Stickman Fight Ragdoll | iframe-resource-errors | 0 | 0 | 31 | 0 |
| Stickman Golf | iframe-resource-errors | 1 | 1 | 1 | 139 |
| Stickman Hook | iframe-resource-errors | 1 | 1 | 8 | 58 |
| Subway Surfers | iframe-resource-errors | 0 | 0 | 3 | 1 |
| Super Mario 63 | iframe-resource-errors | 0 | 0 | 2 | 5 |
| Super Mario 64 | runtime-visible-in-iframe | 1 | 1 | 0 | 3 |
| Super Mario Bros | no-runtime-element-detected | 0 | 0 | 0 | 3 |
| Superhot | iframe-resource-errors | 1 | 1 | 1 | 7 |
| Supermarket 3D | iframe-resource-errors | 2 | 2 | 6 | 16 |
| Temple Run 2 | iframe-resource-errors | 1 | 1 | 2 | 22 |
| Territorial.io | runtime-visible-in-iframe | 2 | 2 | 0 | 0 |
| The World's Hardest Game | no-runtime-element-detected | 0 | 0 | 0 | 3 |
| This Is The Only Level | no-runtime-element-detected | 0 | 0 | 0 | 4 |
| Time Shooter | iframe-resource-errors | 2 | 2 | 2 | 19 |
| Time Shooter 2 | iframe-resource-errors | 2 | 2 | 2 | 19 |
| Time Shooter 3 | iframe-resource-errors | 2 | 2 | 2 | 19 |
| ULTRAKILL | iframe-resource-errors | 1 | 1 | 7 | 3 |
| War The Knights | iframe-resource-errors | 2 | 2 | 5 | 32 |
| Winding Road | no-runtime-element-detected | 0 | 0 | 0 | 0 |
| Wounded Summer Baby | iframe-resource-errors | 2 | 2 | 2 | 1 |

## Interpretation

- possible-iframe-block-or-content-collapse: a runtime-like element appeared in a tab but not in the iframe; inspect the source and live page before changing it.
- iframe-caused-parent-navigation: likely frame-busting or redirect behavior.
- iframe-resource-errors: missing files or failed requests while embedded.
- runtime-visible-in-iframe: a canvas/player-like element exists in the frame, but gameplay still needs manual input testing.
- no-runtime-element-detected: may be a loader, DOM-only game, or incomplete build; review manually.
