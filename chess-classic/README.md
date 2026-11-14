<div align="center">
  <br>
  <img src="https://github.com/nightrider99/webrtc-chess/blob/main/assets/Cover.png?raw=true" alt="webrtc-chess Banner" width="600">
  <br>

# ♔ webrtc-chess – The Royal Game

**Complete chess experience in your browser – no installation, no server, no internet required after connection.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)
[![Made with Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WebRTC](https://img.shields.io/badge/WebRTC-P2P-blue.svg)](https://webrtc.org/)
[![GitHub release](https://img.shields.io/github/v/release/nightrider99/webrtc-chess)](https://github.com/nightrider99/webrtc-chess/releases)
[![GitHub stars](https://img.shields.io/github/stars/nightrider99/webrtc-chess)](https://github.com/nightrider99/webrtc-chess/stargazers)

[🚀 Live Demo](https://nightrider99.github.io/webrtc-chess/) •
[📖 Documentation](docs/) •
[🐛 Report Bug](https://github.com/nightrider99/webrtc-chess/issues) •
[✨ Request Feature](https://github.com/nightrider99/webrtc-chess/issues)

</div>

---

## ✨ Features at a Glance

| Category | Features |
|----------|----------|
| **🎮 Gameplay** | Full FIDE rules, castling, en passant, pawn promotion, check/checkmate detection |
| **🌐 Multiplayer** | LAN play over WiFi (WebRTC P2P), no server needed, compact connection codes |
| **⏱️ Time Controls** | 3min, 5min, 10min, 15min, 30min, or untimed |
| **📱 Experience** | Responsive design, mobile-friendly, touch-optimized, beautiful gold/cream theme |
| **📊 Analysis** | Move history, FEN/PGN export, position review, material balance |
| **🔧 Tech** | Vanilla JS, WebRTC, Web Audio, localStorage, zero dependencies |

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td><img src="assets/screenshots/home-screen.png" alt="Home Screen" width="250"><br><strong>🏠 Home Screen</strong> <em>(example)</em></td>
      <td><img src="assets/screenshots/game-screen.png" alt="Game Screen" width="250"><br><strong>♔ Game Screen</strong> <em>(example)</em></td>
      <td><img src="assets/screenshots/lan-modal.png" alt="LAN Setup" width="250"><br><strong>🌐 LAN Multiplayer</strong> <em>(example)</em></td>
    </tr>
    <tr>
      <td><img src="assets/screenshots/mobile-view.png" alt="Mobile View" width="250"><br><strong>📱 Mobile Optimized</strong> <em>(example)</em></td>
      <td><img src="assets/screenshots/move-history.png" alt="Move History" width="250"><br><strong>📜 Move History</strong> <em>(example)</em></td>
      <td><img src="assets/screenshots/promotion.png" alt="Pawn Promotion" width="250"><br><strong>⬆️ Pawn Promotion</strong> <em>(example)</em></td>
    </tr>
  </table>
  <p><i>🖼️ Replace the example image paths with your actual screenshots in the <code>assets/screenshots/</code> folder.</i></p>
</div>

---

## 🚀 Quick Start

### 🎯 Play Now (No Installation)
Simply open the [live demo](https://nightrider99.github.io/webrtc-chess/) in any modern browser!

### 📥 Run Locally
```bash
# Download the single HTML file
curl -O https://raw.githubusercontent.com/nightrider99/webrtc-chess/main/index.html

# Open in browser
open index.html  # macOS
# or
xdg-open index.html  # Linux
# or just double-click the file!
```

🐳 Docker (Optional)

```bash
docker run -p 8080:80 -v $(pwd):/usr/share/nginx/html nginx:alpine
# Then open http://localhost:8080
```

---

🎮 How to Play

Local Game (One Device)

1. From main menu, click "Local Match"
2. Configure time control and player names in Settings (optional)
3. White moves first – click a piece, then click destination
4. Use sidebar to view moves, undo, or export game

LAN Multiplayer (Two Devices, Same WiFi)

<div align="center">
  <img src="assets/screenshots/lan-diagram.png" alt="LAN Connection Diagram" width="600">
  <p><i>📡 LAN connection diagram (example image)</i></p>
</div>

📡 Host (White Player)

```
1. Main Menu → LAN Multiplayer → Host Game
2. Enter your name → Start Hosting
3. Copy the generated code and send to friend
4. Paste friend's answer code → Connect
5. Game starts automatically!
```

📱 Guest (Black Player)

```
1. Main Menu → LAN Multiplayer → Join Game
2. Enter your name
3. Paste host's code → Connect
4. Copy your answer code and send to host
5. Wait for host to accept – game begins!
```

⚠️ Important: Both devices must be on the same WiFi network. No internet required after connection! For more details, see the LAN Play Guide on the live site.

---

⌨️ Controls

Action Desktop Mobile
Select piece Click Tap
Move piece Click destination Tap destination
Undo move Sidebar button Sidebar button
Offer draw Navbar "Draw" Sidebar "Draw"
Resign Navbar "Resign" Sidebar "Resign"
Flip board Sidebar "Flip" Sidebar "Flip"
View moves Sidebar panel Bottom sheet (tap ≡)
Export PGN/FEN Sidebar buttons Sidebar buttons
New game Navbar "New" Sidebar "New Game"

---

⏱️ Time Controls

webrtc-chess supports multiple time formats:

Mode Initial Time Visual Indicator
Bullet 3 min Red at 10s remaining
Blitz 5 min Red at 10s remaining
Rapid 10 min Red at 10s remaining
Rapid+ 15 min Red at 10s remaining
Classical 30 min Red at 10s remaining
Untimed ∞ No clock

Features:

· Active player's clock highlighted
· Low time warning (red + blinking)
· Sound alert at timeout
· Automatic loss on time expiration

---

🎨 UI Features

Visual Indicators

Indicator Meaning
🔵 Blue highlight Selected piece
⚪ Dot Legal move (empty square)
⭕ Ring Legal capture
🟡 Yellow glow Active player's pieces
🔴 Red background King in check
🟢 Green highlight Last move (from/to)

Board Coordinates

· Chess.com style coordinates on edges
· Files (a-h) at bottom, ranks (1-8) at left
· Adapts when board is flipped

Material Balance

· Visual bar showing advantage
· Numerical difference displayed
· Captured pieces shown for each player

---

🌐 LAN Multiplayer Technical Overview

How It Works

webrtc-chess uses WebRTC to create a direct peer-to-peer connection:

```
┌─────────┐    Share compact codes    ┌─────────┐
│ Player 1 │  ←────────────────────→  │ Player 2 │
│  (Host)  │    (WhatsApp/SMS/AirDrop)  │  (Join)  │
└────┬────┘                            └────┬────┘
     │                                       │
     │─── Direct WebRTC DataChannel ────────→│
     │←───    (encrypted, P2P)         ─────│
     ↓                                       ↓
  Game Sync                               Game Sync
```

Compact SDP Encoding

Raw WebRTC SDP is ~1500 characters – too long to share manually. webrtc-chess compresses it to ~200 characters:

```javascript
// Raw SDP (excerpt - 1500+ chars)
v=0\r\no=- 4611744152874083702 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n...

// Compact format
["o","kv5qj3n7","p4m2x8r9","A1B2C3D4E5F6...",["192.168.1.5:50789"]]
```

---

📦 Project Structure

```
webrtc-chess/
├── index.html                 # Complete application (single file!)
├── README.md                  # You are here
├── LICENSE                     # MIT license
├── .gitignore                  # Git ignore rules
├── assets/
│   └── screenshots/           # Images for documentation
│       ├── home-screen.png     (example)
│       ├── game-screen.png     (example)
│       ├── lan-modal.png       (example)
│       ├── mobile-view.png     (example)
│       ├── move-history.png    (example)
│       ├── promotion.png       (example)
│       ├── lan-diagram.png     (example)
│       └── Cover.png           # Main banner
└── docs/                       # Detailed documentation (optional)
    ├── chess-rules.md
    └── webrtc-setup.md
```

---

🧠 Chess Engine

webrtc-chess implements a full-featured chess engine with:

✅ Implemented Rules

· Standard piece movement (all pieces)
· Castling (kingside & queenside)
· En passant captures
· Pawn promotion (Q, R, B, N)
· Check and checkmate detection
· Stalemate detection
· 50-move rule
· Threefold repetition
· Insufficient material detection
· Algebraic notation generation

🔄 Move Validation

· Legal move generation for all pieces
· Pin detection (cannot move if exposes king)
· Check validation (must get out of check)
· Castling through check prevention

📊 Position Evaluation

· Material counting
· Balance visualization
· Captured pieces tracking

---

🛠️ Technology Stack

Technology Usage
HTML5 Structure, semantic markup
CSS3 Styling, Grid, Flexbox, animations, variables
Vanilla JavaScript Core logic, DOM manipulation, event handling
WebRTC Peer-to-peer data channels for LAN multiplayer
Web Audio API Sound effects without external files
localStorage Persistent settings storage

Zero Dependencies: No frameworks, no libraries, no build steps. Just pure, vanilla web technologies.

---

📝 Chess Notation

Algebraic Notation Examples

Notation Meaning
e4 Pawn moves to e4
Nf3 Knight to f3
Bxe5 Bishop captures on e5
O-O Kingside castling
O-O-O Queenside castling
exd6 Pawn on e-file captures to d6
Qh4# Queen to h4 delivers checkmate
Nxf7+ Knight captures on f7 with check

FEN Export Example

```
rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
```

PGN Export Example

```
[Event "webrtc-chess Game"]
[White "Player 1"]
[Black "Player 2"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 36. Ra6+ Kc5 37. Ke1 Nf4 38. g3 Nxh3 39. Kd2 Kb5 40. Rd6 Kc5 41. Ra6 Nf2 42. g4 Bd3 43. Re6 1-0
```

---

🧪 Testing

Browser Compatibility

Browser Version Status
Chrome 80+ ✅ Full support
Firefox 75+ ✅ Full support
Safari 14+ ✅ Full support
Edge 90+ ✅ Full support
Opera 70+ ⚠️ Limited testing
iOS Safari 14+ ✅ Full support
Android Chrome 90+ ✅ Full support

---

🤝 Contributing

Contributions are welcome! Here's how you can help:

🐛 Report Bugs

1. Check if the bug already exists in Issues
2. If not, create a new issue with browser version, steps to reproduce, and screenshots

💡 Suggest Features

1. Open an issue with tag "enhancement"
2. Describe the feature and why it would be valuable

🔧 Pull Requests

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit changes (git commit -m 'Add amazing feature')
4. Push to branch (git push origin feature/amazing-feature)
5. Open a Pull Request

Development Setup

```bash
# Clone repository
git clone https://github.com/nightrider99/webrtc-chess.git
cd webrtc-chess

# Edit index.html with your favorite editor
code index.html  # or vim, nano, etc.

# Test locally by opening in browser
open index.html
```

Coding Standards

· Use 2 spaces for indentation
· Semicolons required
· Meaningful variable names
· Comment complex logic
· Keep functions focused and small

---

📚 Documentation

Document Description
Chess Rules Complete guide to chess rules
WebRTC Setup Technical details of LAN multiplayer
API Reference (Coming soon)
Changelog Version history

---

🏗️ Roadmap

v2.1 (Planned)

· Keyboard navigation
· Drag-and-drop support
· Accessibility improvements (ARIA labels)
· Move animations

v2.2 (Future)

· Engine analysis (Stockfish WASM)
· PGN import
· Game database (localStorage)
· Dark/light theme toggle

v3.0 (Long-term)

· Internet multiplayer (TURN server)
· User accounts
· Rating system
· Tournament mode

---

❓ FAQ

General

Q: Is webrtc-chess free?
A: Yes! Completely free and open-source under MIT license.

Q: Do I need to install anything?
A: No installation needed – just open the HTML file in any modern browser.

Q: Does it work offline?
A: Yes! Once loaded, it works completely offline. Even LAN multiplayer works without internet after connection.

Gameplay

Q: How do I castle?
A: Move the king two squares toward the rook. The move must be legal (no pieces between, not in/through check).

Q: What is en passant?
A: A special pawn capture when opponent moves two squares past your pawn. You must capture immediately on the next move.

Q: Can I have multiple queens?
A: Yes! Promote pawns to any piece, including additional queens.

LAN Multiplayer

Q: Why use codes instead of automatic discovery?
A: Automatic LAN discovery is unreliable across platforms. Codes are 100% reliable.

Q: The code has my IP address – is that safe?
A: Yes – it's your local IP (192.168.x.x), only visible to your friend on the same network.

Q: Can I play on mobile data?
A: Both devices must be on the same network. Using the same mobile hotspot works!

Q: Connection failed – what now?
A: Check troubleshooting guide in LAN Play Guide.

Technical

Q: How is this different from other chess apps?
A: webrtc-chess is unique because:

· Zero dependencies (pure vanilla JS)
· LAN multiplayer with compact codes
· Beautiful thematic design
· Complete rules implementation

---

📄 License

Distributed under the MIT License. See LICENSE for more information.

```
MIT License

Copyright (c) 2025 Md Sohave Bapari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

🙏 Acknowledgments

Inspiration

· chess.com – UI inspiration
· lichess.org – Open-source chess community
· FIDE – Official chess rules

Technology

· Google STUN – STUN servers
· WebRTC – P2P communication
· Google Fonts – Cinzel, Lora fonts

Contributors

· Md Sohave Bapari – Creator
· Your name here? – See Contributing

Special Thanks

· Chess players everywhere who keep the royal game alive
· Open-source community for inspiration and tools
· Beta testers who provided valuable feedback

---

📞 Contact & Support

Channel Where to find us
GitHub Issues github.com/nightrider99/webrtc-chess/issues
Live Demo nightrider99.github.io/webrtc-chess/

---

📊 GitHub Stats

<div align="center">

https://img.shields.io/github/stars/nightrider99/webrtc-chess?style=social
https://img.shields.io/github/forks/nightrider99/webrtc-chess?style=social
https://img.shields.io/github/watchers/nightrider99/webrtc-chess?style=social
https://img.shields.io/github/downloads/nightrider99/webrtc-chess/total

</div>

---

<div align="center">
  <br>
  <img src="https://github.com/nightrider99/webrtc-chess/blob/main/assets/Cover.png?raw=true" alt="webrtc-chess Footer" width="400">
  <br>
  <br>
  <strong>Made with ♟️ and ☕ by Md Sohave Bapari</strong>
  <br>
  <br>
  <a href="#">Back to top</a>
</div>