export const fetchStars = async (path: string) => {
  await timeout(1000);
  const data = await fetch(`https://api.github.com/repos/${path}`);
  return data.json();
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
