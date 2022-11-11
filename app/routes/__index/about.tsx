import React from "react";
import { Theme } from "~/components/theme-provider";
import { useTheme } from "~/hooks/use-theme";

import { Bitwarden } from "~/icons/simpleicons/bitwarden";
import { DigitalOcean } from "~/icons/simpleicons/digitalocean";
import { DockerIcon } from "~/icons/simpleicons/docker";
import { ElixirIcon } from "~/icons/simpleicons/elixir";
import { FlyDotIo } from "~/icons/simpleicons/fly.io";
import { GitHub } from "~/icons/simpleicons/github";
import { GoogleCloud } from "~/icons/simpleicons/google-cloud";
import { Kde } from "~/icons/simpleicons/kde";
import { MongoIcon } from "~/icons/simpleicons/mongo";
import { Obsidian } from "~/icons/simpleicons/obsidian";
import { PlanetScale } from "~/icons/simpleicons/planetscale";
import { ReactIcon } from "~/icons/simpleicons/react";
import { RustIcon } from "~/icons/simpleicons/rust";
import { Sentry } from "~/icons/simpleicons/sentry";
import { Spotify } from "~/icons/simpleicons/spotify";
import { TailwindIcon } from "~/icons/simpleicons/tailwind";
import { Trello } from "~/icons/simpleicons/trello";
import { TypeScriptIcon } from "~/icons/simpleicons/typescript";
import { VercelIcon } from "~/icons/simpleicons/vercel";
import { Vivaldi } from "~/icons/simpleicons/vivaldi";
import { VSCodeIcon } from "~/icons/simpleicons/vscode";

export default function About() {
  const [theme] = useTheme();

  return (
    <div className="mt-16">
      <h1 className="font-extrabold text-5xl">Hi, I'm Ethan</h1>
      <div className="mt-6 text-lg text-zinc-800 dark:text-zinc-200">
        I'm a student and full-stack software developer interested in frontend
        design, distributed systems, and game engines. I've found myself more
        drawn towards the whole domain of web development recently, but I'm
        always learning new things. Over the past few years, I've worked on all
        sorts of projects utilizing a wide array of technologies.
      </div>
      <section className="mt-12 mb-20">
        <GroupContainer title="Most Loved Technologies">
          <Technology
            name="TypeScript"
            accentColor="#3b82f6"
            description="My go-to language for most new projects, you need static typing whether you believe it or not."
            icon={<TypeScriptIcon color="" className="fill-blue-500" />}
          />
          <Technology
            name="Rust"
            accentColor="#F74B00"
            description="Super blazingly fast and blazing in how super fast it is. Did I mention it's fast?"
            icon={<RustIcon className="fill-black dark:fill-white" />}
          />
          <Technology
            name="Elixir"
            accentColor="#6366f1"
            description="Great for distributed systems, but syntax is a bit convoluted and dynamic types get icky."
            icon={<ElixirIcon className="fill-indigo-500" color="" />}
          />
          <Technology
            name="React"
            accentColor="#06b6d4"
            description="Popular, well-supported, and a great ecosystem. That's what I need the most."
            icon={<ReactIcon className="fill-cyan-500" color="" />}
          />
          <Technology
            name="Tailwind CSS"
            accentColor="#14b8a6"
            description="Makes CSS actually enjoyable and leads me iteratively to better results, faster."
            icon={<TailwindIcon className="fill-teal-500" color="" />}
          />
          <Technology
            name="MongoDB"
            accentColor="#22c55e"
            description="Great for rapidly prototyping, terrible for just about everything else."
            icon={<MongoIcon className="fill-green-500" color="" />}
          />
          <Technology
            name="Docker"
            accentColor="#0ea5e9"
            description="Docker is great because it works excellently on my machine!"
            icon={<DockerIcon className="fill-sky-500" color="" />}
          />
          <Technology
            name="VSCode"
            accentColor="#0ea5e9"
            description="Out of all of the other memory hoggers I've used, this one is the least bad."
            icon={<VSCodeIcon className="fill-blue-500" color="" />}
          />
        </GroupContainer>
        <GroupContainer title="Cloud Providers">
          <Technology
            name="Vercel"
            accentColor={theme == Theme.DARK ? "#ffffff" : "#000000"}
            description="My go-to for quick deployments and static sites, especially with Next.js."
            icon={
              <VercelIcon color="" className="fill-black dark:fill-white" />
            }
          />
          <Technology
            name="DigitalOcean"
            accentColor="#3b82f6"
            description="I run a $10/mo. VPS that I use for hosting small projects and services."
            icon={<DigitalOcean className="fill-blue-500" />}
          />
          <Technology
            name="Fly.io"
            accentColor="#a855f7"
            description="I have become increasingly fond of fly.io's performance and reliability."
            icon={<FlyDotIo className="fill-purple-500" color="" />}
          />
          <Technology
            name="Google Cloud"
            accentColor="#3b82f6"
            description="Lots of great services here, Kubernetes is especially powerful, just a matter of cost."
            icon={<GoogleCloud className="fill-blue-500" color="" />}
          />
          <Technology
            name="Sentry"
            accentColor="#6366f1"
            description="A bit clunky to set up, but provides pretty reasonable applicaton insights."
            icon={<Sentry className="fill-indigo-500" color="" />}
          />
          <Technology
            name="GitHub"
            accentColor={theme == Theme.DARK ? "#ffffff" : "#000000"}
            description="A wonderful platform, the student developer pack came in especially handy!"
            icon={<GitHub color="" className="fill-black dark:fill-white" />}
          />
          <Technology
            name="PlanetScale"
            accentColor={theme == Theme.DARK ? "#ffffff" : "#000000"}
            description="Unparalleled performance and reliability for database scaling."
            icon={
              <PlanetScale color="" className="fill-black dark:fill-white" />
            }
          />
        </GroupContainer>
        <GroupContainer title="Other">
          <Technology
            name="Vivaldi"
            accentColor="#ef4444"
            description="An extremely powerful and customizable browser. They're all Chrome anyway."
            icon={<Vivaldi className="fill-red-500" color="" />}
          />
          <Technology
            name="Bitwarden"
            accentColor="#3b82f6"
            description="An open-source password manager with a mediocre interface."
            icon={<Bitwarden className="fill-blue-500" color="" />}
          />
          <Technology
            name="Spotify"
            accentColor="#22c55e"
            description="Yes, Spotify is better, mainly for their discovery and recommendation services."
            icon={<Spotify className="fill-green-500" color="" />}
          />
          <Technology
            name="Obsidian"
            accentColor="#6366f1"
            description="A wonderful markdown editor that works almost like a second brain!"
            icon={<Obsidian className="fill-indigo-500" color="" />}
          />
          <Technology
            name="Manjaro KDE"
            accentColor="#0ea5e9"
            description="I've found KDE to be much more customizable, and I need fractional scaling."
            icon={<Kde className="fill-sky-500" color="" />}
          />
          <Technology
            name="Trello"
            accentColor="#06b6d4"
            description="Useful for keeping track of tasks and projects, and pretending like I know how to be organized."
            icon={<Trello className="fill-cyan-500" color="" />}
          />
        </GroupContainer>
      </section>
    </div>
  );
}

const GroupContainer = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  return (
    <div className="mb-8">
      <h3 className="font-semibold">{title}</h3>
      <div
        className="grid gap-4 mt-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface TechnologyProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
}

const Technology: React.FC<TechnologyProps> = ({
  name,
  description,
  icon,
  accentColor,
}) => {
  const [theme] = useTheme();

  return (
    <div
      className="rounded-lg p-[2px] shadow-md"
      style={{
        background: `linear-gradient(to right, ${
          theme == Theme.DARK ? "rgb(63 63 70)" : "rgb(212 212 216)"
        }, ${accentColor})`,
      }}
    >
      <div className="flex bg-zinc-50 dark:bg-zinc-900 flex-col rounded-md py-3 px-4 h-full">
        <div className="flex justify-between">
          <div className="inline-flex font-semibold">{name}</div>
          {icon}
        </div>
        <div className="text-zinc-700 text-sm dark:text-zinc-300 mt-2">
          {description}
        </div>
      </div>
    </div>
  );
};
