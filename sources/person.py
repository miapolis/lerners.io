from dataclasses import dataclass, field
from typing import List, Dict

@dataclass
class Person:
    name: str = "Ethan Lerner"
    aliases: List[str] = field(default_factory=lambda: ["miapolis"])
    socials: Dict[str, str] = field(default_factory=lambda: {
        "Email": "ethan@lerners.io",
        "GitHub": "https://github.com/miapolis",
        "Discord": "miapolis#????",
        "Spotify": "https://lerners.io/spotify",
        "Steam": "https://lerners.io/steam",
    })
