# Sonic 2 Communty's Cut Web Port

![image](https://github.com/burnedpopcorn/Sonic2-Community-Cut-WebPort/blob/main/sonic2.png)

Demo Site of This Project: https://burnedpopcorn.github.io/Sonic2-Community-Cut-WebPort/

### About Repository
I did not compile this myself, instead I stole it from HeyJoeWay's website, but I did modify it a bit
> (This was after the site shutdown, so I had to use the Wayback Machine to get it)

Currently, this port has a similar situation to my Sonic 3 A.I.R. re-upload, so you will have to do the same work-around as that project

### Thanks To
- HeyJoeWay, for the original Sonic 2 Community's Cut [Project](https://github.com/heyjoeway/s2cx) and now somewhat defunct [Website](https://jojudge.com/s2cx/)
- bitdruid, for the [Wayback Machine Downloader](https://github.com/bitdruid/python-wayback-machine-downloader)

### To Run this yourself
- Get the files from this repo (Code -> Download ZIP)
- Put the files in a web server (Because this was made with Emscripten, it CANNOT be run locally with the file:// protocol, as that results in CORS issues because of Emscripten Limitations)
- Open index.html from within your website (https:// (your domain) /index.html)

> Or you could place all the files into the root of your github.io repo and host it through github.io pages

### To run this Locally
If you want to run this locally, use something like python to run a temporary web server on your machine

To do this using Python, you do by
- Again, Get the files from this repo (Code -> Download ZIP)
- Entering the directory containing index.html and other files and typing the command python3 -m http.server in the linux terminal or py -m http.server for windows powershell given you installed python
- At which point you can enter http://localhost:8000/index.html to play the game locally
