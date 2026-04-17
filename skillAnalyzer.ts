import type { JobRole, AnalysisResult, SkillMatch, LearningRoadmap, RoadmapPhase } from '../types';

// ─── SKILL NORMALIZATION MAP ─────────────────────────────────────────────────
const SKILL_ALIASES: Record<string, string> = {
  // Programming Languages
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'py': 'Python',
  'python3': 'Python',
  'rb': 'Ruby',
  'golang': 'Go',
  'c++': 'C++',
  'cpp': 'C++',
  'c#': 'C#',
  'csharp': 'C#',
  'cs': 'C#',
  'rs': 'Rust',
  'kt': 'Kotlin',

  // Frontend
  'reactjs': 'React',
  'react.js': 'React',
  'react js': 'React',
  'vuejs': 'Vue.js',
  'vue': 'Vue.js',
  'vue.js': 'Vue.js',
  'angular': 'Angular',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'nuxtjs': 'Nuxt.js',
  'nuxt': 'Nuxt.js',
  'svelte': 'Svelte',
  'html5': 'HTML',
  'css3': 'CSS',
  'scss': 'CSS',
  'sass': 'CSS',
  'tailwind': 'Tailwind CSS',
  'bootstrap': 'Bootstrap',
  'redux': 'Redux',
  'graphql': 'GraphQL',

  // AI/ML
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'ai': 'Artificial Intelligence',
  'dl': 'Deep Learning',
  'deep learning': 'Deep Learning',
  'nlp': 'Natural Language Processing',
  'cv': 'Computer Vision',
  'llm': 'Large Language Models',
  'llms': 'Large Language Models',
  'gpt': 'Large Language Models',
  'generative ai': 'Large Language Models',
  'gen ai': 'Large Language Models',
  'rag': 'RAG Systems',
  'tensorflow': 'TensorFlow',
  'pytorch': 'PyTorch',
  'sklearn': 'Scikit-learn',
  'scikit learn': 'Scikit-learn',
  'huggingface': 'Hugging Face',
  'hugging face': 'Hugging Face',
  'langchain': 'LangChain',
  'openai': 'OpenAI API',
  'azure openai': 'OpenAI API',
  'chatgpt': 'Large Language Models',
  'bert': 'BERT',
  'transformers': 'Transformers',

  // Backend
  'nodejs': 'Node.js',
  'node': 'Node.js',
  'node.js': 'Node.js',
  'expressjs': 'Express.js',
  'express': 'Express.js',
  'django': 'Django',
  'flask': 'Flask',
  'fastapi': 'FastAPI',
  'spring': 'Spring Boot',
  'springboot': 'Spring Boot',
  'spring boot': 'Spring Boot',
  'rails': 'Ruby on Rails',
  'ruby on rails': 'Ruby on Rails',

  // Databases
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'mysql': 'MySQL',
  'sqlite': 'SQL',
  'mssql': 'SQL Server',
  'sql server': 'SQL Server',
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'nosql': 'NoSQL',
  'elasticsearch': 'Elasticsearch',
  'elastic search': 'Elasticsearch',
  'redis': 'Redis',
  'cassandra': 'Cassandra',
  'dynamodb': 'DynamoDB',
  'firebase': 'Firebase',

  // Cloud & DevOps
  'aws': 'AWS',
  'amazon web services': 'AWS',
  'azure': 'Azure',
  'microsoft azure': 'Azure',
  'gcp': 'GCP',
  'google cloud': 'GCP',
  'google cloud platform': 'GCP',
  'kubernetes': 'Kubernetes',
  'k8s': 'Kubernetes',
  'docker': 'Docker',
  'ci/cd': 'CI/CD',
  'cicd': 'CI/CD',
  'devops': 'DevOps',
  'terraform': 'Terraform',
  'ansible': 'Ansible',
  'jenkins': 'Jenkins',
  'github actions': 'GitHub Actions',
  'gitlab ci': 'GitLab CI',
  'helm': 'Helm',

  // Data
  'pandas': 'Pandas',
  'numpy': 'NumPy',
  'scipy': 'NumPy',
  'matplotlib': 'Matplotlib',
  'seaborn': 'Seaborn',
  'plotly': 'Plotly',
  'tableau': 'Tableau',
  'power bi': 'Power BI',
  'powerbi': 'Power BI',
  'looker': 'Looker',
  'apache spark': 'Apache Spark',
  'spark': 'Apache Spark',
  'kafka': 'Apache Kafka',
  'apache kafka': 'Apache Kafka',
  'airflow': 'Airflow',
  'apache airflow': 'Airflow',
  'dbt': 'dbt',
  'snowflake': 'Snowflake',
  'bigquery': 'BigQuery',
  'redshift': 'Redshift',

  // Version Control
  'git': 'Git',
  'github': 'Git',
  'gitlab': 'Git',
  'bitbucket': 'Git',

  // Mobile
  'react native': 'React Native',
  'reactnative': 'React Native',
  'flutter': 'Flutter',
  'swift': 'Swift',
  'swiftui': 'SwiftUI',
  'objective-c': 'Objective-C',
  'kotlin': 'Kotlin',
  'android': 'Android SDK',
  'ios': 'iOS Development',
  'xcode': 'Xcode',

  // Security
  'oauth': 'OAuth',
  'oauth2': 'OAuth',
  'jwt': 'Authentication',
  'ssl': 'Security',
  'tls': 'Security',
  'penetration testing': 'Penetration Testing',
  'pentest': 'Penetration Testing',

  // General
  'api': 'REST APIs',
  'rest api': 'REST APIs',
  'restful': 'REST APIs',
  'rest': 'REST APIs',
  'microservices': 'Microservices',
  'agile': 'Agile/Scrum',
  'scrum': 'Agile/Scrum',
  'jira': 'JIRA',
  'figma': 'Figma',
  'linux': 'Linux',
  'unix': 'Linux',
  'bash': 'Shell Scripting',
  'shell': 'Shell Scripting',
  'shell scripting': 'Shell Scripting',
  'solidity': 'Solidity',
  'unity': 'Unity',
  'unreal': 'Unreal Engine',
  'unreal engine': 'Unreal Engine',
  'selenium': 'Selenium',
  'cypress': 'Cypress',
  'playwright': 'Playwright',
  'jest': 'Jest',
  'webpack': 'Webpack',
  'vite': 'Vite',
};

export function normalizeSkill(skill: string): string {
  const lower = skill.toLowerCase().trim();
  if (SKILL_ALIASES[lower]) return SKILL_ALIASES[lower];
  
  // Title case
  return skill.trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function parseSkillsFromText(text: string): string[] {
  // Split by commas, newlines, semicolons, bullet points
  const raw = text
    .replace(/[•\-\*]/g, ',')
    .replace(/\n/g, ',')
    .replace(/;/g, ',')
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 1 && s.length < 50);

  const normalized = raw.map(normalizeSkill);
  return [...new Set(normalized)];
}

// ─── SEMANTIC SIMILARITY ─────────────────────────────────────────────────────
// Client-side similarity using enhanced token overlap + linguistic heuristics

function tokenize(text: string): Set<string> {
  return new Set(
    text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 1)
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter(x => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

// Semantic expansion map for related concepts
const SEMANTIC_GROUPS: string[][] = [
  ['machine learning', 'ml', 'deep learning', 'neural networks', 'ai', 'artificial intelligence'],
  ['javascript', 'typescript', 'js', 'ts', 'ecmascript'],
  ['react', 'reactjs', 'react.js', 'react native', 'next.js', 'nextjs'],
  ['python', 'python3', 'py'],
  ['sql', 'database', 'postgresql', 'mysql', 'sqlite', 'query'],
  ['aws', 'cloud', 'azure', 'gcp', 'cloud platform'],
  ['docker', 'container', 'containerization', 'kubernetes', 'k8s', 'orchestration'],
  ['ci/cd', 'continuous integration', 'continuous deployment', 'pipeline', 'github actions', 'jenkins'],
  ['api', 'rest', 'restful', 'rest api', 'web services', 'http', 'graphql'],
  ['git', 'version control', 'github', 'gitlab'],
  ['testing', 'unit test', 'integration test', 'jest', 'cypress', 'selenium', 'qa'],
  ['linux', 'unix', 'bash', 'shell', 'command line'],
  ['nlp', 'natural language processing', 'text processing', 'language model', 'llm'],
  ['data analysis', 'data analytics', 'analytics', 'statistics', 'statistical analysis'],
  ['data visualization', 'visualization', 'charts', 'dashboards', 'tableau', 'power bi'],
  ['microservices', 'distributed systems', 'service-oriented', 'architecture'],
  ['agile', 'scrum', 'kanban', 'sprint', 'iterative'],
  ['authentication', 'authorization', 'oauth', 'security', 'jwt'],
  ['node.js', 'nodejs', 'node', 'express', 'backend javascript'],
  ['react native', 'flutter', 'mobile development', 'ios', 'android', 'cross-platform'],
];

function getSemanticExpansion(term: string): string[] {
  const lower = term.toLowerCase();
  const expansions: string[] = [lower];
  
  for (const group of SEMANTIC_GROUPS) {
    if (group.some(g => lower.includes(g) || g.includes(lower))) {
      expansions.push(...group);
    }
  }
  return expansions;
}

export function computeSemanticSimilarity(userSkill: string, roleSkill: string): number {
  const userNorm = normalizeSkill(userSkill).toLowerCase();
  const roleNorm = normalizeSkill(roleSkill).toLowerCase();
  
  // Exact match
  if (userNorm === roleNorm) return 1.0;
  
  // Contains check
  if (userNorm.includes(roleNorm) || roleNorm.includes(userNorm)) {
    const shorter = Math.min(userNorm.length, roleNorm.length);
    const longer = Math.max(userNorm.length, roleNorm.length);
    return 0.85 + (0.15 * shorter / longer);
  }
  
  // Semantic group check
  const userExpansion = getSemanticExpansion(userNorm);
  const roleExpansion = getSemanticExpansion(roleNorm);
  
  let maxGroupSim = 0;
  for (const ue of userExpansion) {
    for (const re of roleExpansion) {
      if (ue === re) {
        maxGroupSim = Math.max(maxGroupSim, 0.82);
      }
      const sim = jaccardSimilarity(tokenize(ue), tokenize(re));
      maxGroupSim = Math.max(maxGroupSim, sim * 0.8);
    }
  }
  
  // Token overlap
  const userTokens = tokenize(userNorm);
  const roleTokens = tokenize(roleNorm);
  const tokenSim = jaccardSimilarity(userTokens, roleTokens);
  
  return Math.max(maxGroupSim, tokenSim * 0.75);
}

// ─── MAIN ANALYSIS ENGINE ────────────────────────────────────────────────────

const MATCH_THRESHOLD = 0.55;
const PARTIAL_THRESHOLD = 0.35;

export function analyzeSkillGap(userSkills: string[], role: JobRole): AnalysisResult {
  const normalizedUserSkills = userSkills.map(normalizeSkill);
  const allRoleSkills = [
    ...role.skills.core.map(s => ({ skill: s, category: 'core' as const })),
    ...role.skills.optional.map(s => ({ skill: s, category: 'optional' as const })),
    ...role.skills.tools.map(s => ({ skill: s, category: 'tools' as const })),
  ];

  const matched: SkillMatch[] = [];
  const missing: SkillMatch[] = [];
  const partial: SkillMatch[] = [];

  for (const { skill: roleSkill, category } of allRoleSkills) {
    let bestMatch = { score: 0, userSkill: '' };

    for (const userSkill of normalizedUserSkills) {
      const score = computeSemanticSimilarity(userSkill, roleSkill);
      if (score > bestMatch.score) {
        bestMatch = { score, userSkill };
      }
    }

    if (bestMatch.score >= MATCH_THRESHOLD) {
      matched.push({
        skill: roleSkill,
        similarity: bestMatch.score,
        matchedWith: bestMatch.userSkill,
        category,
      });
    } else if (bestMatch.score >= PARTIAL_THRESHOLD) {
      partial.push({
        skill: roleSkill,
        similarity: bestMatch.score,
        matchedWith: bestMatch.userSkill,
        category,
      });
    } else {
      missing.push({
        skill: roleSkill,
        similarity: bestMatch.score,
        category,
      });
    }
  }

  // Sort by similarity
  matched.sort((a, b) => b.similarity - a.similarity);
  missing.sort((a, b) => b.similarity - a.similarity);

  const totalSkills = allRoleSkills.length;
  const matchScore = matched.length + (partial.length * 0.5);
  const matchPercentage = Math.round((matchScore / totalSkills) * 100);

  // Skills by category
  const skillsByCategory = {
    core: {
      matched: matched.filter(s => s.category === 'core').map(s => s.skill),
      missing: missing.filter(s => s.category === 'core').map(s => s.skill),
    },
    optional: {
      matched: matched.filter(s => s.category === 'optional').map(s => s.skill),
      missing: missing.filter(s => s.category === 'optional').map(s => s.skill),
    },
    tools: {
      matched: matched.filter(s => s.category === 'tools').map(s => s.skill),
      missing: missing.filter(s => s.category === 'tools').map(s => s.skill),
    },
  };

  return {
    role: role.title,
    roleId: role.id,
    matchPercentage,
    matchedSkills: matched,
    missingSkills: missing,
    partialMatches: partial,
    totalRoleSkills: totalSkills,
    userSkills: normalizedUserSkills,
    skillsByCategory,
  };
}

// ─── ROADMAP GENERATOR ───────────────────────────────────────────────────────

export function generateLearningRoadmap(result: AnalysisResult, role: JobRole): LearningRoadmap {
  const missingCore = result.skillsByCategory.core.missing;
  const missingOptional = result.skillsByCategory.optional.missing;
  const missingTools = result.skillsByCategory.tools.missing;

  const phases: RoadmapPhase[] = [];

  // Phase 1: Foundation (core missing skills - first half)
  if (missingCore.length > 0) {
    const phase1Skills = missingCore.slice(0, Math.ceil(missingCore.length / 2));
    phases.push({
      phase: 1,
      title: 'Foundation & Core Skills',
      duration: `${Math.max(4, phase1Skills.length * 2)}–${Math.max(8, phase1Skills.length * 3)} weeks`,
      level: 'Beginner',
      description: `Build the essential foundation for ${role.title}. Focus on the most critical core skills that every professional in this role must master.`,
      skills: phase1Skills,
      resources: generateResources(phase1Skills, 'beginner', role.title),
      projects: generateProjects(phase1Skills, 'beginner', role.title),
      milestones: [
        `Complete all foundational ${phase1Skills[0] || 'core'} tutorials`,
        'Build your first practice project',
        'Pass a knowledge checkpoint quiz',
        'Join a relevant online community',
      ],
    });
  }

  // Phase 2: Intermediate (core missing - second half + partial)
  const phase2Skills = [
    ...missingCore.slice(Math.ceil(missingCore.length / 2)),
    ...result.partialMatches.filter(p => p.category === 'core').map(p => p.skill).slice(0, 3),
  ];
  if (phase2Skills.length > 0) {
    phases.push({
      phase: phases.length + 1,
      title: 'Intermediate Development',
      duration: `${Math.max(6, phase2Skills.length * 2)}–${Math.max(10, phase2Skills.length * 3)} weeks`,
      level: 'Intermediate',
      description: `Deepen your expertise with intermediate-level skills. Start working on real projects to solidify understanding.`,
      skills: phase2Skills,
      resources: generateResources(phase2Skills, 'intermediate', role.title),
      projects: generateProjects(phase2Skills, 'intermediate', role.title),
      milestones: [
        'Complete a real-world mini project',
        'Contribute to an open-source project',
        'Build a portfolio piece',
        'Connect with industry mentors',
      ],
    });
  }

  // Phase 3: Tools & Ecosystem
  if (missingTools.length > 0) {
    phases.push({
      phase: phases.length + 1,
      title: 'Tools & Ecosystem Mastery',
      duration: `${Math.max(4, missingTools.length)}–${Math.max(8, missingTools.length * 2)} weeks`,
      level: 'Intermediate',
      description: `Master the industry-standard tools and technologies used daily by ${role.title} professionals.`,
      skills: missingTools.slice(0, 8),
      resources: generateResources(missingTools.slice(0, 8), 'tools', role.title),
      projects: generateProjects(missingTools.slice(0, 8), 'tools', role.title),
      milestones: [
        'Set up professional development environment',
        'Automate a workflow using learned tools',
        'Integrate multiple tools in a project',
        'Document your tool usage in a blog post',
      ],
    });
  }

  // Phase 4: Advanced & Optional
  if (missingOptional.length > 0) {
    phases.push({
      phase: phases.length + 1,
      title: 'Advanced & Specialization',
      duration: `${Math.max(8, missingOptional.length * 2)}–${Math.max(16, missingOptional.length * 3)} weeks`,
      level: 'Advanced',
      description: `Master advanced concepts and optional specializations to differentiate yourself and become a top ${role.title}.`,
      skills: missingOptional.slice(0, 6),
      resources: generateResources(missingOptional.slice(0, 6), 'advanced', role.title),
      projects: generateProjects(missingOptional.slice(0, 6), 'advanced', role.title),
      milestones: [
        'Complete an advanced capstone project',
        'Publish technical content or case study',
        'Get certified in a key technology',
        'Apply for target positions',
      ],
    });
  }

  // If no gaps, still show an enhancement roadmap
  if (phases.length === 0) {
    phases.push({
      phase: 1,
      title: 'Skill Refinement & Excellence',
      duration: '4–8 weeks',
      level: 'Advanced',
      description: `Excellent! You have strong coverage of ${role.title} skills. Focus on deepening expertise and staying current.`,
      skills: role.skills.optional.slice(0, 5),
      resources: generateResources(role.skills.optional.slice(0, 5), 'advanced', role.title),
      projects: generateProjects(role.skills.optional.slice(0, 5), 'advanced', role.title),
      milestones: [
        'Master edge cases and advanced patterns',
        'Mentor others and teach concepts',
        'Contribute to industry thought leadership',
        'Get senior-level certification',
      ],
    });
  }

  const totalWeeks = phases.reduce((acc, p) => {
    const match = p.duration.match(/(\d+)–(\d+)/);
    return acc + (match ? parseInt(match[2]) : 8);
  }, 0);

  const months = Math.round(totalWeeks / 4);

  return {
    role: role.title,
    totalDuration: `${months}–${months + 3} months`,
    phases,
    keyTechnologies: [
      ...role.skills.core.slice(0, 5),
      ...role.skills.tools.slice(0, 3),
    ],
    careerOutcome: getCareerOutcome(role, result.matchPercentage),
    tips: generateTips(role, result.matchPercentage),
  };
}

function generateResources(skills: string[], level: string, roleTitle: string) {
  const platforms = ['Coursera', 'Udemy', 'Pluralsight', 'LinkedIn Learning', 'freeCodeCamp', 'MIT OpenCourseWare', 'YouTube'];
  const resources = [];

  if (skills.length === 0) return [];

  resources.push({
    type: 'Course' as const,
    title: `${skills[0]} — Complete ${level === 'beginner' ? 'Beginner' : 'Masterclass'} Course`,
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    free: level === 'beginner',
  });

  resources.push({
    type: 'Documentation' as const,
    title: `Official ${skills[0]} Documentation & Guides`,
    platform: 'Official Docs',
    free: true,
  });

  if (skills.length > 1) {
    resources.push({
      type: 'Tutorial' as const,
      title: `Build Real Projects with ${skills.slice(0, 2).join(' + ')}`,
      platform: 'YouTube / Dev.to',
      free: true,
    });
  }

  resources.push({
    type: 'Practice' as const,
    title: `${roleTitle} Coding Challenges & Exercises`,
    platform: 'LeetCode / HackerRank / Exercism',
    free: true,
  });

  resources.push({
    type: 'Book' as const,
    title: `Mastering ${skills[0]}: From ${level === 'beginner' ? 'Zero to Hero' : 'Intermediate to Expert'}`,
    platform: 'O\'Reilly / Packt',
    free: false,
  });

  return resources;
}

function generateProjects(skills: string[], level: string, roleTitle: string): string[] {
  const projectsByLevel: Record<string, string[]> = {
    beginner: [
      `Build a ${skills[0] || 'core'} learning app with guided examples`,
      'Create a portfolio project demonstrating foundational skills',
      'Replicate a simple version of a popular tool',
      'Build a CRUD application with authentication',
    ],
    intermediate: [
      `Build a full-featured ${roleTitle.toLowerCase()} portfolio project`,
      'Create a real API with documentation and testing',
      `Develop an ${skills[0] || 'advanced'}-powered microservice`,
      'Build an open-source CLI tool',
    ],
    advanced: [
      `Architect and deploy a production-grade ${roleTitle} system`,
      'Contribute a significant feature to a major open source project',
      `Build a scalable ${skills[0] || 'advanced'} platform from scratch`,
      'Create an end-to-end automated pipeline',
    ],
    tools: [
      `Configure a complete ${skills.slice(0, 2).join(' + ')} development environment`,
      'Automate a complex workflow using the tool ecosystem',
      'Build a monitoring dashboard with multiple tool integrations',
      'Create a CI/CD pipeline using the learned tools',
    ],
  };

  return (projectsByLevel[level] || projectsByLevel.intermediate).slice(0, 3);
}

function getCareerOutcome(role: JobRole, matchPercent: number): string {
  if (matchPercent >= 80) {
    return `You're ${role.title}-ready! With ${matchPercent}% skill coverage, you qualify for junior-to-mid roles. Focus on applying and refining niche skills to command ${role.avgSalary || 'top'} salaries.`;
  } else if (matchPercent >= 60) {
    return `Strong foundation! At ${matchPercent}% match, you need 3–6 months of focused learning to be fully job-ready as a ${role.title}. Target internships or freelance projects meanwhile.`;
  } else if (matchPercent >= 40) {
    return `Good starting point! Your ${matchPercent}% match shows relevant background. A 6–12 month intensive learning plan will make you competitive for ${role.title} positions.`;
  } else {
    return `Career pivot in progress! Your ${matchPercent}% baseline gives you something to build on. Expect a 12–18 month journey to become a qualified ${role.title}, but it's absolutely achievable.`;
  }
}

function generateTips(role: JobRole, matchPercent: number): string[] {
  return [
    `Focus on the core skills first — they account for 70% of ${role.title} interview questions.`,
    'Build 2–3 high-quality portfolio projects rather than many small ones.',
    `Network with ${role.title} professionals on LinkedIn — 60% of jobs are filled through referrals.`,
    'Contribute to open-source projects in your stack to build public credibility.',
    `Follow industry blogs, podcasts, and newsletters specific to ${role.category} to stay current.`,
    `Set weekly learning goals and track progress — consistency beats intensity for skill building.`,
    matchPercent < 50
      ? 'Consider a structured bootcamp or online certification to accelerate learning.'
      : 'Start applying to roles even before 100% ready — learning on the job is powerful.',
  ];
}

// ─── RESUME PARSER ───────────────────────────────────────────────────────────

export function extractSkillsFromResumeText(text: string): string[] {
  const skillKeywords = [
    // Languages
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'PHP', 'Dart', 'Elixir', 'Haskell',
    
    // Frontend
    'React', 'Angular', 'Vue', 'Next.js', 'Svelte', 'HTML', 'CSS', 'Tailwind', 'Bootstrap', 'Redux', 'GraphQL', 'WebGL',
    
    // Backend
    'Node.js', 'FastAPI', 'Django', 'Flask', 'Express', 'Spring Boot', 'Rails', 'Laravel', 'ASP.NET',
    
    // AI/ML
    'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'LangChain', 'Hugging Face', 'OpenAI', 'BERT', 'Transformers', 'MLflow', 'Kubeflow',
    
    // Data
    'Pandas', 'NumPy', 'Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'BigQuery', 'Redshift', 'Databricks', 'Tableau', 'Power BI', 'Looker',
    
    // Databases
    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Cassandra', 'Firebase',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Helm', 'Prometheus', 'Grafana',
    
    // Mobile
    'React Native', 'Flutter', 'iOS', 'Android', 'SwiftUI', 'Jetpack Compose',
    
    // Security
    'OAuth', 'Penetration Testing', 'Cryptography', 'SIEM', 'Cybersecurity',
    
    // General
    'Microservices', 'Agile', 'Scrum', 'Git', 'Linux', 'REST API', 'System Design', 'Data Structures', 'Algorithms',
    
    // Tools
    'Figma', 'JIRA', 'Postman', 'VS Code', 'IntelliJ',
  ];

  const foundSkills = new Set<string>();
  const textLower = text.toLowerCase();

  for (const skill of skillKeywords) {
    if (textLower.includes(skill.toLowerCase())) {
      foundSkills.add(normalizeSkill(skill));
    }
  }

  // Also parse skills from "Skills:" sections
  const skillsSectionMatch = text.match(/skills?[:\s]+([^]{0,500}?)(?:\n\n|\n[A-Z]|$)/i);
  if (skillsSectionMatch) {
    const sectionSkills = parseSkillsFromText(skillsSectionMatch[1]);
    sectionSkills.forEach(s => foundSkills.add(s));
  }

  return [...foundSkills];
}
