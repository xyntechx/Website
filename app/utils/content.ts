const secretTxt =
  "Psst... you can log in as root. All you need to do is run `su root <pwd>` with the right password. If only we could inspect the source code...";

const toggleTxt =
  "Pro tip: The command `toggle` toggles from CLI view to normal website view.";

const linksTxt = `# In the wild
- GitHub: https://github.com/xyntechx
- LinkedIn: https://www.linkedin.com/in/nyx-iskandar/
- ORCID: https://orcid.org/0009-0008-4361-3364
- Google Scholar: https://scholar.google.com/citations?user=6CbTfzIAAAAJ

# Current affiliations
- Ramen VR: https://ramenvr.com/
- V11: https://velocity11.us/`;

const introTxt = `Hey! I'm Nyx. I'm currently leading world generation research at Ramen VR / Aura as the first member of Ramen Labs. I'm also a fellow at V11.

I recently graduated from UC Berkeley EECS, spending a grand total of 2.5 years in school -- don't worry, I did a bunch of research, took a bunch of grad classes, and made a bunch of unforgettable memories with the kindest and smartest people I've ever met.`;

const nameTxt =
  "My parents named me after the Greek goddess of the night, Nyx. In case you're wondering, the name's pronounced like New York **Knicks**.";

const researchTxt = `My research is focused on understanding, generating, and populating consistent and physically accurate 3D environments. Prior to my current research role at Ramen, I was an undergrad ML researcher advised by Dr. Ritwik Gupta and Dr. Cam Allen at BAIR and CHAI, working on projects in AI planning, language models, and their intersection. During my last semester in school, I completed a 6-month research fellowship with OpenAI for which I led a project on inverse RL.

I've published workshop papers at NeurIPS and ICML, and contributed to a chapter in a technical book. I plan to continue publishing. You can find my publications on my Google Scholar.`;

const motivationTxt = `I love working on hard puzzles no one has ever tried working on before, or in a way that no one has ever tried before. I move fast. I take risks and seek new challenges. I gravitate towards collaborating and competing with the smartest and most driven of them all. I get excited when I get to share my work and whatever I've learned with others. I'm curious. These qualities draw me towards research and the startup life.

I realize that I most enjoy learning about and am most proud of my works in deep tech ML, including both theory and engineering. Spending a lot of time at Machine Learning at Berkeley (as VP no less) had some influence, I'm sure.`;

const industryTxt = `Today, I'm a research engineer at Ramen VR / Aura (researcher #1 of Ramen Labs). My previous industry experiences include Founding Engineer at Foam, [Research Fellow at OpenAI], Research Intern at GovTech Singapore, and AI Engineer Intern at Ramen VR.`;

export const directories: {
  [k: string]: { parent: string | null; children: string[] };
} = {
  "~": {
    parent: null,
    children: ["about", "exp", "secret.txt", "toggle.txt", "links.txt"],
  },
  about: {
    parent: "~",
    children: ["intro.txt", "name.txt", "motivation.txt"],
  },
  exp: {
    parent: "~",
    children: ["research.txt", "industry.txt"],
  },
};

export const files: { [k: string]: string } = {
  "secret.txt": secretTxt,
  "toggle.txt": toggleTxt,
  "links.txt": linksTxt,
  "intro.txt": introTxt,
  "name.txt": nameTxt,
  "motivation.txt": motivationTxt,
  "research.txt": researchTxt,
  "industry.txt": industryTxt,
};
