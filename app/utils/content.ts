export const directories: { [k: string]: string[] } = {
  "~": ["about/", "exp/", "secret.txt"],
  about: ["intro.txt", "name.txt"],
  exp: ["research.txt", "industry.txt"],
};

export const files: { [k: string]: string } = {
  "secret.txt": "this is a secret",
  "intro.txt": "this is an intro",
  "name.txt": "this is my name",
  "research.txt": "this is research",
  "industry.txt": "this is industry",
};
