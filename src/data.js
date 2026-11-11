// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Nyi Lin Naing',
  kicker: 'AI engineer. MSc Artificial Intelligence, University of Plymouth, January 2027.',
  headline: 'I build AI across the stack: models, the software around them, and the networks they run on.',
  intro:
    'Every point in the 3D space is a piece of my work, grouped by what it does. Drag to look around; click a point to open the project.',
  status: 'Looking for graduate roles in AI, machine learning and cyber security from 2027',
  email: 'nln18nyi@gmail.com',
  github: 'https://github.com/Tznyi',
  linkedin: 'https://www.linkedin.com/in/nyi-lin-naing-1b15a3254',
}

export const results = [
  { value: '+0.06', label: 'AUC over six standard models with one labelled patient per group' },
  { value: '92.5%', label: 'macro-F1 after fine-tuning DistilBERT, up from 88.0%' },
  { value: '10,000+', label: 'users on a live college site I helped build and protect' },
]

// Three clusters in the 3D hero. Colours are shared with the few-shot lab.
export const clusters = {
  ml: { name: 'Machine learning', color: '#3CCBDD' },
  sec: { name: 'Security and systems', color: '#F472B6' },
  sw: { name: 'Software and hardware', color: '#9AA5FF' },
}

export const filters = ['All', 'Machine learning', 'NLP', 'Computer vision', 'Security', 'Web', 'Hardware']

export const projects = [
  {
    id: 'few-shot',
    label: 'Few-shot learning',
    cluster: 'ml',
    pos: [-2.4, 1.7, 0.4],
    featured: true,
    area: 'Machine learning',
    tags: ['Machine learning'],
    title: "Few-shot learning for Alzheimer's blood biomarkers",
    short: 'MSc dissertation. One labelled patient per group beat six standard models.',
    role: 'Sole researcher, MSc dissertation',
    stack: 'PyTorch, scikit-learn, university HPC cluster',
    context: '1,593 patients and 7 blood markers from the ADNI research cohort. Labels are scarce and expensive.',
    outcome: 'With 1 labelled patient per group, beat six baselines (AUC +0.06, p < 0.0001, 20 seeds). With full data it matched them (AUC 0.90 vs 0.91).',
    points: [
      'Built a Prototypical Network that identifies patient groups from blood tests when only a handful of labelled examples exist.',
      'Benchmarked it against six standard machine learning models across 20 random seeds, with significance testing.',
      'Found where the method does not help: on tasks where the blood carries little signal, it could not beat the baselines.',
    ],
  },
  {
    id: 'neural-search',
    label: 'Neural search',
    cluster: 'ml',
    pos: [-0.8, 2.6, -0.8],
    area: 'Computer vision',
    tags: ['Machine learning', 'Computer vision'],
    title: 'Fashion-MNIST neural search',
    short: "Uses a trained model's image embeddings to find visually similar clothing.",
    role: 'Personal project',
    stack: 'PyTorch',
    context: 'Fashion-MNIST clothing images.',
    outcome: 'Search that returns visually similar items from learned embeddings.',
    points: [
      'Trained a PyTorch model to classify clothing images from Fashion-MNIST.',
      "Extracted the model's learned image embeddings and used them to find visually similar items.",
    ],
    link: { href: 'https://github.com/Tznyi/fashion-mnist-neural-search', label: 'Code on GitHub' },
  },
  {
    id: 'lang-vision',
    label: 'DistilBERT and CNN',
    cluster: 'ml',
    pos: [-3.7, 0.1, -0.4],
    area: 'NLP and computer vision',
    tags: ['Machine learning', 'NLP', 'Computer vision'],
    title: 'Language and vision models',
    short: 'Fine-tuned DistilBERT to 92.5% macro-F1; a PyTorch CNN at 92.6% on Fashion-MNIST.',
    role: 'MSc coursework',
    stack: 'Hugging Face Transformers, DistilBERT, PyTorch, OpenCV',
    context: 'Film-review sentiment, Fashion-MNIST images and droplet images.',
    outcome: 'Macro-F1 raised from 88.0% to 92.5%; CNN at 92.6% accuracy.',
    points: [
      'Fine-tuned DistilBERT for sentiment classification of film reviews.',
      'Built a PyTorch CNN for Fashion-MNIST, using ablation studies to test design choices.',
      'Built a classical OpenCV droplet-recognition system.',
    ],
  },
  {
    id: 'kmd-security',
    label: 'KMD network security',
    cluster: 'sec',
    pos: [2.6, 1.0, -0.4],
    area: 'Security',
    tags: ['Security', 'Web'],
    title: 'KMD College network and website',
    short: 'FortiGate, FortiClient VPN and AWS DNS; login limits, patching and honeypots for a site with 10,000+ users.',
    role: 'Full-Stack Developer (paid internship), Sofcomm Technology, Jul 2024 – Jul 2025',
    stack: 'FortiGate, Windows Firewall, FortiClient VPN, AWS DNS; Vue.js, React, Bootstrap',
    context: 'Sofcomm Technology runs IT for KMD College in Yangon.',
    outcome: 'A live college website with 10,000+ users and at least 1,000 views a day at term opening.',
    points: [
      'Worked with FortiGate and Windows Firewall, connected users to the FortiClient VPN, and managed DNS on AWS.',
      'Helped protect the website by limiting login attempts, keeping software up to date and setting up honeypots.',
      'Wrote 5 pages of the website in an intern team, in Agile sprints with code reviews and Git.',
    ],
  },
  {
    id: 'arch-linux',
    label: 'Arch Linux',
    cluster: 'sec',
    pos: [3.5, -0.2, 0.7],
    area: 'Security and systems',
    tags: ['Security'],
    title: 'Self-administered Arch Linux',
    short: 'Fingerprint and face login through PAM, Bash scripts, and safe removal of a slow login module.',
    role: 'Personal system',
    stack: 'Arch Linux, PAM, Bash, systemctl',
    context: 'My own machine, configured from scratch.',
    outcome: 'A system I control end to end, including its authentication stack.',
    points: [
      'Set up fingerprint and face-recognition login through PAM, plus Bash scripts and systemd services.',
      'When a face-login module slowed logins, removed it safely: disabled its PAM entries first and tested sudo from a separate TTY.',
    ],
  },
  {
    id: 'mseis',
    label: 'MSeis sensor',
    cluster: 'sw',
    pos: [0.6, -1.9, 1.4],
    area: 'Hardware',
    tags: ['Hardware'],
    title: 'MSeis depth-sensor integration',
    short: 'Read a MEMS sensor in C/C++ and traced garbled data to a lost ground connection.',
    role: 'Remote intern, MSeis Ltd, May – Jun 2026',
    stack: 'Arduino (C/C++), Python, I²C, MEMS sensor, PAMGuard',
    context: 'PAMGuard is software for passive acoustic monitoring of marine life.',
    outcome: 'Stable sensor readings over a long cable at 50 kHz.',
    points: [
      'Integrated a MEMS pressure and temperature sensor with PAMGuard.',
      'Extended the I²C link over a long Cat8 cable using differential extender boards, from a regulated 12 V to 3.3 V supply.',
      'Tested one change at a time to trace garbled readings to a lost ground connection between the boards.',
    ],
  },
  {
    id: 'pronto',
    label: 'Pronto Realtor',
    cluster: 'sw',
    pos: [-0.9, -1.6, 2.0],
    area: 'Web',
    tags: ['Web'],
    title: 'Pronto Realtor website',
    short: 'Turned a static property site into a dynamic one with React, a PHP API and PostgreSQL.',
    role: 'Developer, student client project',
    stack: 'React, PHP API, PostgreSQL',
    context: 'A property business with a static brochure site.',
    outcome: 'A dynamic, data-driven website delivered to the client; awaiting launch.',
    points: ['Built the React frontend, a PHP API layer and the PostgreSQL database.'],
  },
]

export const experience = [
  {
    when: 'Nov 2026 – present',
    title: 'AI and Digital Marketing Researcher (part-time)',
    org: 'E3 Consulting',
    points: [
      'Advise a small professional-services firm on AI compliance and governance.',
      "Research how AI tools can be applied to the firm's digital marketing, and report recommendations to the business.",
    ],
  },
  {
    when: 'Jul – Aug 2026',
    title: 'AI, Automation and Marketing Research Micro-Intern',
    org: 'E3 Consulting',
    points: [
      'Researched AI governance requirements, including the RICS AI standard and PCRT.',
      "Compared 32 SEO and AI-search tools, and showed a three-person team would pay roughly 64% more than one vendor's advertised price.",
      'Presented a final report; the firm then offered me a paid part-time role.',
    ],
  },
  {
    when: 'May – Jun 2026',
    title: 'Remote Intern, Hardware and Sensor Integration',
    org: 'MSeis Ltd',
    points: ['Integrated a MEMS depth sensor with PAMGuard marine acoustic monitoring; see the project above.'],
  },
  {
    when: 'Jul 2024 – Jul 2025',
    title: 'Full-Stack Developer (paid internship)',
    org: 'Sofcomm Technology, Yangon',
    points: [
      'Network security and website work for KMD College; see the project above.',
      'Handled front-line support for college staff and students, including during a server outage before an assignment deadline.',
    ],
  },
]

export const education = [
  {
    when: 'Jan 2026 – Jan 2027',
    title: 'MSc Artificial Intelligence',
    org: "University of Plymouth. Predicted Distinction. Vice-Chancellor's Scholarship.",
    points: [
      'Natural Language Processing and LLMs; Computer Vision and Deep Learning; Advanced Machine Learning; Computational Intelligence; Big Data Visualisation and Analytics; Machine Learning and AI for Healthcare.',
    ],
  },
  {
    when: 'Jul 2022 – Jul 2025',
    title: 'BSc (Hons) Computing, First Class',
    org: 'University of Greenwich, taught at KMD, Myanmar. High Achiever Scholarships.',
    points: [
      'NCC Education Level 4 and 5 Diplomas in Computing, including a networking and cyber security module, then the Greenwich final-year top-up (2024–2025).',
      'Led an 11-person team in Enterprise Web Software Development (85%), winning the class award for most collaborative team.',
    ],
  },
]

export const skills = [
  { area: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'DistilBERT', 'Prototypical Networks', 'CNNs', 'Embedding search'] },
  { area: 'Evaluation and data', items: ['AUC', 'Macro-F1', 'Ablation studies', 'Significance testing', 'Pandas', 'NumPy', 'OpenCV', 'HPC'] },
  { area: 'Network and security', items: ['FortiGate', 'Windows Firewall', 'FortiClient VPN', 'AWS DNS', 'Honeypots', 'Wireshark (labs)', 'PAM'] },
  { area: 'Languages', items: ['Python', 'C', 'SQL', 'PHP', 'JavaScript', 'TypeScript', 'Kotlin', 'Bash'] },
  { area: 'Web and backend', items: ['React', 'Vue.js', 'FastAPI', 'Flask', 'Laravel', 'Node.js', 'PostgreSQL', 'MySQL'] },
  { area: 'Tools and hardware', items: ['Git', 'Docker', 'CI/CD', 'Jira', 'Arch Linux', 'Arduino', 'I²C', 'MEMS sensors'] },
]
