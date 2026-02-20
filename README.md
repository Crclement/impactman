# Impactman Arcade

Raspberry Pi 5 conversion for Arcade1Up cabinet running Impactman.

## Project Structure

```
impactman/
├── web/          # Dashboard and web assets
│   └── index.html
├── raspi/        # Raspberry Pi setup files
│   ├── setup.sh
│   ├── arcade-gpio.py
│   └── kiosk.sh
└── README.md
```

## Quick Start

### On Raspberry Pi

1. Copy the `raspi/` folder to your Pi
2. Run the setup script:

```bash
cd raspi
chmod +x setup.sh
./setup.sh
```

3. Wire GPIO and reboot

## Wiring

| Function | GPIO | Pin |
|----------|------|-----|
| UP | GPIO 17 | Pin 11 |
| DOWN | GPIO 27 | Pin 13 |
| LEFT | GPIO 22 | Pin 15 |
| RIGHT | GPIO 23 | Pin 16 |
| Button | GPIO 24 | Pin 18 |
| Ground | GND | Pin 6/9/14/20 |

## Game URL

https://dev.impactarcade.com/games/impactman
