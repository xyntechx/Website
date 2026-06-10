const secretTxt =
  "You know... you can log in as root. All you need to do is to run `su root <pwd>` with the right password. If only we could inspect the source code...";

const toggleTxt =
  "Pro tip: The command `toggle` toggles from CLI view to normal website view.";

const introTxt = `Hey! I'm Nyx. I'm currently leading world generation research at Ramen VR / Aura as the first member of Ramen Labs. I'm also a fellow at V11.

I recently graduated from UC Berkeley EECS, spending a grand total of 2.5 years in school -- don't worry, I did a bunch of research, took a bunch of grad classes, and made a bunch of unforgettable memories with the kindest and smartest people I've ever met.`;

const nameTxt =
  "My parents named me after the Greek goddess of the night, Nyx. In case you're wondering, the name's pronounced like New York **Knicks** (let's go Knicks!!!).";

const researchTxt = `My research is focused on generating consistent and physically accurate 3D worlds for game devs, world model researchers, robotics enthusiasts... everyone. My interest in ML became an obsession at Berkeley, where I was advised by Dr. Ritwik Gupta and Dr. Cam Allen at BAIR and CHAI, working on projects in AI planning, language models, and their intersection. During my last semester in school, I completed a 6-month research fellowship with OpenAI for which I led a project on inverse RL.

You can find my publications on my Google Scholar.`;

const motivationTxt = `I love working on hard puzzles no one has ever tried working on before, or in a way that no one has ever tried before. I get restless easy. I move fast. I get excited when I get to share my work and whatever I've learned with others. I'm curious. These qualities draw me towards research, and given today's climate, research in industry. My insistence on working on the most technical or "hardcore" or "deep tech" ML problems is just a preference I can't really explain; I'm most proud of my works that are of this particular flavor. Spending a lot of time at Machine Learning at Berkeley (as VP no less) had some influence, I'm sure.`;

const industryTxt = `Today, I'm a research engineer at Ramen VR / Aura. My previous industry experiences include Founding Engineer at Foam, [Research Fellow at OpenAI], and Research Intern at GovTech Singapore and A*STAR Singapore.`;

export const directories: { [k: string]: string[] } = {
  "~": ["about", "exp", "secret.txt", "toggle.txt"],
  about: ["intro.txt", "name.txt", "motivation.txt"],
  exp: ["research.txt", "industry.txt"],
};

export const files: { [k: string]: string } = {
  "secret.txt": secretTxt,
  "toggle.txt": toggleTxt,
  "intro.txt": introTxt,
  "name.txt": nameTxt,
  "motivation.txt": motivationTxt,
  "research.txt": researchTxt,
  "industry.txt": industryTxt,
};
