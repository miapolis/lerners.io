use std::collections::HashMap;
use std::default::Default;

impl Person {
    fn new() -> Self {
        Self {
            name: "Ethan Lerner",
            aliases: vec!["miapolis"],
            socials: HashMap::from([
                ("GitHub", "https://github.com/miapolis"),
                ("Discord", "miapolis#????"),
                ("Spotify", "https://l.lerners.io/spotify"),
                ("Steam", "https://l.lerners.io/steam"),
            ]),
        }
    }
}
