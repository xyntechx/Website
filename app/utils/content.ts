const secretTxt =
  "You know... you can log in as root. All you need to do is to run `su root <pwd>` with the right password. Time to get meta...";

export const directories: { [k: string]: string[] } = {
  "~": ["about/", "exp/", "secret.txt"],
  about: ["intro.txt", "name.txt"],
  exp: ["research.txt", "industry.txt"],
};

export const files: { [k: string]: string } = {
  "secret.txt": secretTxt,
  "intro.txt": "this is an intro",
  "name.txt": "this is my name",
  "research.txt": "this is research",
  "industry.txt": "this is industry",
};
