package person

type Person struct {
	// ...
	// !include
	name    string
	aliases []string
	socials map[string]string
}

func main() {
	ethan := Person{
		name:    "Ethan Lerner",
		aliases: []string{"miapolis"},
		socials: map[string]string{
			"Email":   "ethan@lerners.io",
			"GitHub":  "https://github.com/miapolis",
			"Discord": "miapolis#????",
			"Spotify": "https://lerners.io/spotify",
			"Steam":   "https://lerners.io/steam",
		},
	}
	// !include

	ethan.name = ""
}
