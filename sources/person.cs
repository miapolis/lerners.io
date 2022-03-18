using System.Collections.Generic;

struct Person
{
  public Person()
  {
    this.name = "Ethan Lerner";
    this.aliases = new string[] { "miapolis " };
    this.socials = new Dictionary<string, string>()
    {
      { "Email", "ethan@lerners.io" },
      { "GitHub", "https://github.com/miapolis" },
      { "Discord", "miapolis#????" },
      { "Spotify", "https://lerners.io/spotify" },
      { "Steam", "https://lerners.io/steam "}
    };
  }
}
