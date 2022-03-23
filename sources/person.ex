defmodule Person do
  defstruct name: "Ethan Lerner",
            aliases: ["miapolis"],
            socials: %{
              email: "ethan@lerners.io",
              github: "github.com/miapolis",
              # Send me a friend request!
              discord: "miapolis#????",
              spotify: "lerners.io/spotify",
              steam: "lerners.io/steam"
            }
end
