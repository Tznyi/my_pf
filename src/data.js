// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Nyi Lin Naing',
  headline: 'I build machine learning that learns from a handful of examples.',
  intro:
    "MSc Artificial Intelligence student at the University of Plymouth, finishing in January 2027. Before that: a First Class BSc in Computing and a year as a paid developer at Sofcomm Technology, where I also worked on the college network's firewalls, VPN and website security.",
  status: 'Looking for graduate roles in AI, machine learning and cyber security from 2027',
  email: 'nln18nyi@gmail.com',
  github: 'https://github.com/Tznyi',
  linkedin: 'https://www.linkedin.com/in/nyi-lin-naing-1b15a3254',
}

export const experience = [
  {
    when: 'Nov 2026 – present',
    role: 'AI and Digital Marketing Researcher (part-time)',
    org: 'E3 Consulting',
    points: [
      'Advise a small professional-services firm on AI compliance and governance.',
      "Research how AI tools can be applied to the firm's digital marketing, and report recommendations to the business.",
    ],
  },
  {
    when: 'Jul – Aug 2026',
    role: 'AI, Automation and Marketing Research Micro-Intern',
    org: 'E3 Consulting',
    points: [
      'Researched AI governance requirements, including the RICS AI standard and PCRT.',
      "Compared 32 SEO and AI-search tools, and showed a three-person team would pay roughly 64% more than one vendor's advertised price.",
      'Found three pricing errors in my own first draft and listed every correction openly.',
      'Presented a final report; the firm then offered me a paid part-time role.',
    ],
  },
  {
    when: 'May – Jun 2026',
    role: 'Remote Intern, Hardware and Sensor Integration',
    org: 'MSeis Ltd',
    points: [
      'Integrated a MEMS pressure and temperature sensor with PAMGuard, software for passive acoustic monitoring of marine life.',
      'Wrote Arduino (C/C++) code to read the sensor over I²C at 50 kHz, and Python for the test device.',
      'Traced garbled readings to a lost ground connection by testing one change at a time; once fixed, readings were stable.',
    ],
  },
  {
    when: 'Jul 2024 – Jul 2025',
    role: 'Full-Stack Developer (paid internship)',
    org: 'Sofcomm Technology, Yangon',
    points: [
      'Worked with FortiGate and Windows Firewall, connected users to the FortiClient VPN, and managed DNS on AWS.',
      'Helped protect the live KMD College website by limiting login attempts, keeping software up to date and setting up honeypots.',
      'Built 5 pages of the KMD College website in Vue.js, React and Bootstrap, in Agile sprints with code reviews and Git.',
      'Handled front-line support for college staff and students, including during a server outage before an assignment deadline.',
    ],
  },
]

export const projects = [
  {
    title: "Few-shot learning for Alzheimer's blood biomarkers",
    kind: 'MSc dissertation, University of Plymouth',
    featured: true,
    points: [
      'Built a Prototypical Network in PyTorch that identifies patient groups from blood tests when only a handful of labelled examples exist.',
      "Used 1,593 patients and 7 blood markers from the ADNI research cohort, running experiments on the university's HPC cluster.",
      'Benchmarked against six standard machine learning models across 20 random seeds, with significance testing.',
    ],
    result:
      "With one labelled patient per group, it beat the best standard model at separating healthy people from Alzheimer's patients (AUC +0.06, p < 0.0001). With full data it matched them (AUC 0.90 vs 0.91).",
    tags: ['PyTorch', 'Prototypical Networks', 'scikit-learn', 'HPC'],
  },
  {
    title: 'Fashion-MNIST neural search',
    kind: 'Personal project',
    link: { href: 'https://github.com/Tznyi/fashion-mnist-neural-search', label: 'Code on GitHub' },
    points: [
      'Trained a PyTorch model to classify clothing images from Fashion-MNIST.',
      "Extracted the model's learned embeddings and used them to find visually similar items.",
    ],
    tags: ['PyTorch', 'Embeddings', 'Similarity search'],
  },
  {
    title: 'Language and vision models',
    kind: 'MSc coursework',
    points: [
      'Fine-tuned DistilBERT for film-review sentiment, raising macro F1 from 88.0% to 92.5%.',
      'Built a PyTorch CNN reaching 92.6% on Fashion-MNIST, with ablation studies.',
      'Built a classical OpenCV droplet-recognition system.',
    ],
    tags: ['Transformers', 'DistilBERT', 'CNNs', 'OpenCV'],
  },
  {
    title: 'KMD College website',
    kind: 'Intern team, Sofcomm Technology',
    points: [
      'Wrote 5 pages of a live site with 10,000+ users and at least 1,000 views a day at term opening.',
      'Helped protect it with login-attempt limits, software updates and honeypots.',
    ],
    tags: ['Vue.js', 'React', 'Bootstrap'],
  },
  {
    title: 'Pronto Realtor website',
    kind: 'Client website, student project',
    points: [
      "Turned a property business's static site into a dynamic, data-driven website.",
      'Delivered to the client; awaiting launch.',
    ],
    tags: ['React', 'PHP API', 'PostgreSQL'],
  },
  {
    title: 'Self-administered Arch Linux',
    kind: 'Personal system',
    points: [
      'Configure fingerprint and face-recognition login through PAM, plus Bash scripts and systemd services.',
      'Removed a slow face-login module safely: disabled its PAM entries first and tested sudo from a separate TTY.',
    ],
    tags: ['Linux', 'PAM', 'Bash', 'systemctl'],
  },
]

export const skills = [
  { area: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'DistilBERT fine-tuning', 'Prototypical Networks', 'CNNs', 'Embedding search'] },
  { area: 'Evaluation and data', items: ['AUC', 'Macro-F1', 'Ablation studies', 'Significance testing', 'Pandas', 'NumPy', 'OpenCV', 'HPC'] },
  { area: 'Network and security', items: ['FortiGate', 'Windows Firewall', 'FortiClient VPN', 'AWS DNS', 'Login-attempt limiting', 'Patching', 'Honeypots', 'Wireshark (labs)'] },
  { area: 'Languages', items: ['Python', 'C', 'SQL', 'PHP', 'JavaScript', 'TypeScript', 'Kotlin', 'Bash'] },
  { area: 'Web and backend', items: ['React', 'Vue.js', 'FastAPI', 'Flask', 'Laravel', 'Node.js', 'REST APIs', 'PostgreSQL', 'MySQL'] },
  { area: 'Tools and hardware', items: ['Git', 'Docker', 'CI/CD', 'Jira', 'Arch Linux', 'Arduino', 'I²C', 'MEMS sensors'] },
]

export const education = [
  {
    when: 'Jan 2026 – Jan 2027',
    title: 'MSc Artificial Intelligence',
    org: "University of Plymouth. Predicted Distinction. Vice-Chancellor's Scholarship.",
    detail:
      'Natural Language Processing and LLMs; Computer Vision and Deep Learning; Advanced Machine Learning; Computational Intelligence; Big Data Visualisation and Analytics; Machine Learning and AI for Healthcare.',
  },
  {
    when: 'Jul 2022 – Jul 2025',
    title: 'BSc (Hons) Computing, First Class',
    org: 'University of Greenwich, taught at KMD, Myanmar. High Achiever Scholarships.',
    detail:
      'NCC Education Level 4 and 5 Diplomas in Computing, including a networking and cyber security module, then the Greenwich final-year top-up (2024–2025). Led an 11-person team in Enterprise Web Software Development (85%), winning the class award for most collaborative team.',
  },
]
