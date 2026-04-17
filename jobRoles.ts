import type { JobRole } from '../types';

export const JOB_ROLES: JobRole[] = [
  // ─── AI / ML ROLES ───────────────────────────────────────────────────────
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'AI & Data',
    description: 'Extract insights from complex datasets using statistical analysis and machine learning.',
    icon: '🧪',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$120k–$180k',
    skills: {
      core: ['Python', 'Machine Learning', 'Statistics', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-learn', 'Data Visualization', 'SQL', 'Feature Engineering'],
      optional: ['Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Time Series Analysis', 'Bayesian Statistics', 'A/B Testing', 'Causal Inference'],
      tools: ['Jupyter', 'TensorFlow', 'PyTorch', 'Matplotlib', 'Seaborn', 'Plotly', 'Tableau', 'Power BI', 'Git', 'Docker']
    }
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Data',
    description: 'Design, build, and deploy ML models at scale in production environments.',
    icon: '🤖',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$130k–$200k',
    skills: {
      core: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'MLOps', 'Model Deployment', 'Feature Engineering', 'Data Pipelines', 'Statistics'],
      optional: ['Reinforcement Learning', 'Distributed Training', 'Model Compression', 'AutoML', 'Federated Learning', 'Edge Deployment'],
      tools: ['MLflow', 'Kubeflow', 'Docker', 'Kubernetes', 'AWS SageMaker', 'Weights & Biases', 'FastAPI', 'Git', 'Airflow', 'Spark']
    }
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'AI & Data',
    description: 'Build AI-powered applications using foundation models, LLMs, and AI APIs.',
    icon: '✨',
    color: '#ffa657',
    demandLevel: 'High',
    avgSalary: '$140k–$220k',
    skills: {
      core: ['Python', 'Large Language Models', 'Prompt Engineering', 'API Integration', 'LangChain', 'Vector Databases', 'RAG Systems', 'Fine-tuning', 'AI Application Development'],
      optional: ['Embeddings', 'Semantic Search', 'Multi-modal AI', 'Agent Frameworks', 'RLHF', 'Evaluation Frameworks'],
      tools: ['OpenAI API', 'LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'FastAPI', 'Docker', 'Hugging Face', 'Git', 'Redis']
    }
  },
  {
    id: 'nlp-engineer',
    title: 'NLP Engineer',
    category: 'AI & Data',
    description: 'Build systems that understand, process, and generate human language.',
    icon: '💬',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$125k–$190k',
    skills: {
      core: ['Python', 'Natural Language Processing', 'Transformers', 'BERT', 'Text Classification', 'Named Entity Recognition', 'Sentiment Analysis', 'Tokenization', 'Word Embeddings'],
      optional: ['Machine Translation', 'Question Answering', 'Text Summarization', 'Coreference Resolution', 'Discourse Analysis'],
      tools: ['Hugging Face', 'spaCy', 'NLTK', 'Gensim', 'PyTorch', 'TensorFlow', 'FastAPI', 'Elasticsearch', 'Docker']
    }
  },
  {
    id: 'computer-vision-engineer',
    title: 'Computer Vision Engineer',
    category: 'AI & Data',
    description: 'Develop systems that extract information from images and video.',
    icon: '👁️',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$130k–$195k',
    skills: {
      core: ['Python', 'Deep Learning', 'Convolutional Neural Networks', 'Object Detection', 'Image Segmentation', 'OpenCV', 'PyTorch', 'TensorFlow', 'Image Processing'],
      optional: ['3D Vision', 'Video Analysis', 'GANs', 'Pose Estimation', 'OCR', 'Medical Imaging', 'Autonomous Systems'],
      tools: ['OpenCV', 'YOLO', 'Detectron2', 'PyTorch', 'TensorFlow', 'CUDA', 'Docker', 'Git', 'Label Studio', 'Roboflow']
    }
  },

  // ─── BACKEND ROLES ───────────────────────────────────────────────────────
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    category: 'Engineering',
    description: 'Build robust server-side applications, APIs, and database systems.',
    icon: '⚙️',
    color: '#d29922',
    demandLevel: 'High',
    avgSalary: '$100k–$160k',
    skills: {
      core: ['Python', 'REST APIs', 'SQL', 'Node.js', 'Database Design', 'Authentication', 'Authorization', 'Caching', 'Message Queues', 'Microservices'],
      optional: ['GraphQL', 'gRPC', 'WebSockets', 'Event-Driven Architecture', 'CQRS', 'Domain-Driven Design', 'API Rate Limiting'],
      tools: ['FastAPI', 'Django', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker', 'Nginx', 'Git', 'Postman', 'Kafka']
    }
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    category: 'Engineering',
    description: 'Create stunning user interfaces and exceptional web experiences.',
    icon: '🎨',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$90k–$150k',
    skills: {
      core: ['JavaScript', 'React', 'HTML', 'CSS', 'TypeScript', 'Responsive Design', 'State Management', 'REST API Integration', 'Performance Optimization', 'Accessibility'],
      optional: ['Next.js', 'Vue.js', 'GraphQL', 'Web Animations', 'Progressive Web Apps', 'Micro-frontends', 'Testing'],
      tools: ['Webpack', 'Vite', 'Tailwind CSS', 'Redux', 'Git', 'Figma', 'Chrome DevTools', 'Jest', 'Storybook', 'Vercel']
    }
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer',
    category: 'Engineering',
    description: 'Build complete web applications from database to user interface.',
    icon: '🔥',
    color: '#ffa657',
    demandLevel: 'High',
    avgSalary: '$110k–$175k',
    skills: {
      core: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'REST APIs', 'HTML', 'CSS', 'Database Design', 'Authentication'],
      optional: ['GraphQL', 'Next.js', 'Docker', 'Cloud Services', 'CI/CD', 'WebSockets', 'Microservices', 'Testing'],
      tools: ['Git', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Vercel', 'Tailwind CSS', 'Prisma', 'tRPC']
    }
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Engineering',
    description: 'Design, develop, and maintain software systems across the stack.',
    icon: '💻',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$105k–$170k',
    skills: {
      core: ['Data Structures', 'Algorithms', 'Object-Oriented Programming', 'System Design', 'Git', 'Testing', 'Code Review', 'Problem Solving', 'SQL', 'APIs'],
      optional: ['Distributed Systems', 'Concurrency', 'Design Patterns', 'Clean Code', 'Agile', 'Performance Tuning'],
      tools: ['Git', 'Docker', 'CI/CD', 'JIRA', 'VS Code', 'Linux', 'Postman', 'Kubernetes']
    }
  },
  {
    id: 'mobile-developer',
    title: 'Mobile App Developer',
    category: 'Engineering',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    icon: '📱',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$105k–$165k',
    skills: {
      core: ['React Native', 'Mobile UI Design', 'State Management', 'REST API Integration', 'Push Notifications', 'App Store Deployment', 'Performance Optimization', 'Offline Storage'],
      optional: ['Swift', 'Kotlin', 'Flutter', 'Dart', 'Native Modules', 'In-App Purchases', 'Analytics', 'Deep Linking'],
      tools: ['Expo', 'Xcode', 'Android Studio', 'Firebase', 'Fastlane', 'TestFlight', 'Git', 'Redux', 'React Navigation']
    }
  },
  {
    id: 'ios-developer',
    title: 'iOS Developer',
    category: 'Engineering',
    description: 'Build premium native applications for iPhone and iPad.',
    icon: '🍎',
    color: '#58a6ff',
    demandLevel: 'Medium',
    avgSalary: '$110k–$175k',
    skills: {
      core: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Core Data', 'REST API Integration', 'Auto Layout', 'App Store Connect', 'Grand Central Dispatch'],
      optional: ['Objective-C', 'Core ML', 'ARKit', 'WidgetKit', 'CloudKit', 'StoreKit', 'WatchKit'],
      tools: ['Xcode', 'Instruments', 'TestFlight', 'CocoaPods', 'SPM', 'Firebase', 'Fastlane', 'Git']
    }
  },
  {
    id: 'android-developer',
    title: 'Android Developer',
    category: 'Engineering',
    description: 'Build powerful native applications for the Android ecosystem.',
    icon: '🤖',
    color: '#3fb950',
    demandLevel: 'Medium',
    avgSalary: '$105k–$165k',
    skills: {
      core: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'MVVM', 'Coroutines', 'Room Database', 'REST API Integration', 'Android Manifest', 'Gradle'],
      optional: ['Java', 'RxJava', 'Hilt', 'Navigation Component', 'WorkManager', 'ML Kit', 'In-App Billing'],
      tools: ['Android Studio', 'Firebase', 'Retrofit', 'OkHttp', 'Git', 'Play Console', 'Fastlane', 'ProGuard']
    }
  },

  // ─── DEVOPS / CLOUD ROLES ─────────────────────────────────────────────────
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    category: 'Infrastructure',
    description: 'Bridge development and operations with automation, CI/CD, and cloud infrastructure.',
    icon: '🔄',
    color: '#f85149',
    demandLevel: 'High',
    avgSalary: '$115k–$185k',
    skills: {
      core: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Infrastructure as Code', 'Cloud Platforms', 'Monitoring', 'Shell Scripting', 'Git', 'Networking'],
      optional: ['Service Mesh', 'GitOps', 'Chaos Engineering', 'Cost Optimization', 'Multi-cloud Strategy', 'Observability'],
      tools: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack', 'Helm', 'ArgoCD']
    }
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Infrastructure',
    description: 'Design and manage scalable cloud infrastructure and services.',
    icon: '☁️',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$120k–$190k',
    skills: {
      core: ['AWS', 'Cloud Architecture', 'Infrastructure as Code', 'Networking', 'Security', 'Cost Management', 'High Availability', 'Disaster Recovery', 'Storage', 'Compute'],
      optional: ['Azure', 'GCP', 'Multi-cloud', 'Serverless', 'Edge Computing', 'Cloud Native Design'],
      tools: ['Terraform', 'AWS CDK', 'CloudFormation', 'Ansible', 'Docker', 'Kubernetes', 'Git', 'Datadog', 'CloudWatch']
    }
  },
  {
    id: 'sre',
    title: 'Site Reliability Engineer',
    category: 'Infrastructure',
    description: 'Ensure platform reliability, performance, and availability at scale.',
    icon: '🛡️',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$125k–$200k',
    skills: {
      core: ['Linux', 'Kubernetes', 'Monitoring', 'Incident Management', 'SLOs/SLAs', 'Performance Engineering', 'Distributed Systems', 'On-Call', 'Automation', 'Postmortems'],
      optional: ['Chaos Engineering', 'Capacity Planning', 'Cost Optimization', 'Tracing', 'Service Mesh'],
      tools: ['Prometheus', 'Grafana', 'PagerDuty', 'Datadog', 'Jaeger', 'Kubernetes', 'Terraform', 'Helm', 'Git', 'ELK Stack']
    }
  },
  {
    id: 'platform-engineer',
    title: 'Platform Engineer',
    category: 'Infrastructure',
    description: 'Build internal developer platforms and tooling to accelerate engineering teams.',
    icon: '🏗️',
    color: '#d29922',
    demandLevel: 'High',
    avgSalary: '$120k–$195k',
    skills: {
      core: ['Kubernetes', 'Internal Developer Platform', 'CI/CD', 'Developer Experience', 'API Design', 'Documentation', 'Infrastructure as Code', 'Service Catalog', 'GitOps'],
      optional: ['Backstage', 'Crossplane', 'Cluster API', 'OPA/Gatekeeper', 'Policy as Code'],
      tools: ['Backstage', 'ArgoCD', 'Flux', 'Terraform', 'Helm', 'GitHub Actions', 'Vault', 'Prometheus', 'Docker']
    }
  },

  // ─── SECURITY ROLES ─────────────────────────────────────────────────────
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    description: 'Protect organizations from cyber threats through monitoring and analysis.',
    icon: '🔐',
    color: '#f85149',
    demandLevel: 'High',
    avgSalary: '$90k–$150k',
    skills: {
      core: ['Network Security', 'Threat Analysis', 'SIEM', 'Incident Response', 'Vulnerability Assessment', 'Firewalls', 'IDS/IPS', 'Security Frameworks', 'Risk Assessment', 'Compliance'],
      optional: ['Penetration Testing', 'Malware Analysis', 'Digital Forensics', 'Cloud Security', 'Zero Trust'],
      tools: ['Splunk', 'Wireshark', 'Nessus', 'Metasploit', 'OSSEC', 'CrowdStrike', 'Nmap', 'Burp Suite', 'ELK Stack']
    }
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    category: 'Security',
    description: 'Design and implement security systems and secure software development practices.',
    icon: '🔒',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$115k–$185k',
    skills: {
      core: ['Application Security', 'Cryptography', 'Secure SDLC', 'OAuth', 'PKI', 'Threat Modeling', 'Code Review', 'API Security', 'Cloud Security', 'Authentication'],
      optional: ['Bug Bounty', 'Red Teaming', 'Hardware Security', 'Blockchain Security', 'AI Security'],
      tools: ['OWASP ZAP', 'Burp Suite', 'HashiCorp Vault', 'SonarQube', 'Snyk', 'Checkov', 'AWS Security Hub', 'Git']
    }
  },
  {
    id: 'penetration-tester',
    title: 'Penetration Tester',
    category: 'Security',
    description: 'Ethically hack systems to find vulnerabilities before malicious actors do.',
    icon: '🎯',
    color: '#f85149',
    demandLevel: 'Medium',
    avgSalary: '$95k–$165k',
    skills: {
      core: ['Penetration Testing', 'Network Security', 'Web Application Security', 'Exploitation Techniques', 'Social Engineering', 'Report Writing', 'Vulnerability Research', 'Linux'],
      optional: ['Mobile Pentesting', 'Cloud Pentesting', 'IoT Security', 'Binary Exploitation', 'Reverse Engineering'],
      tools: ['Metasploit', 'Burp Suite', 'Nmap', 'Kali Linux', 'Cobalt Strike', 'BloodHound', 'Aircrack-ng', 'John the Ripper']
    }
  },

  // ─── DATA ROLES ──────────────────────────────────────────────────────────
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'AI & Data',
    description: 'Transform raw data into actionable business insights through analysis.',
    icon: '📊',
    color: '#d29922',
    demandLevel: 'High',
    avgSalary: '$70k–$120k',
    skills: {
      core: ['SQL', 'Data Analysis', 'Excel', 'Data Visualization', 'Statistics', 'Python', 'Business Intelligence', 'Reporting', 'Data Cleaning', 'Dashboard Design'],
      optional: ['R', 'Machine Learning', 'ETL', 'Data Storytelling', 'Statistical Testing', 'Predictive Analytics'],
      tools: ['Tableau', 'Power BI', 'Looker', 'Google Analytics', 'PostgreSQL', 'Pandas', 'Matplotlib', 'Jupyter', 'dbt', 'Metabase']
    }
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    category: 'AI & Data',
    description: 'Build and maintain data infrastructure, pipelines, and warehouses.',
    icon: '🏭',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$115k–$180k',
    skills: {
      core: ['Python', 'SQL', 'Data Pipelines', 'ETL', 'Data Warehousing', 'Distributed Computing', 'Data Modeling', 'Batch Processing', 'Stream Processing', 'Cloud Data Services'],
      optional: ['Data Quality', 'Data Governance', 'DataOps', 'Real-time Analytics', 'Data Mesh'],
      tools: ['Apache Spark', 'Apache Kafka', 'Airflow', 'dbt', 'Snowflake', 'BigQuery', 'Redshift', 'Databricks', 'Docker', 'Terraform']
    }
  },
  {
    id: 'analytics-engineer',
    title: 'Analytics Engineer',
    category: 'AI & Data',
    description: 'Bridge the gap between data engineering and analysis with clean data models.',
    icon: '📐',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$105k–$160k',
    skills: {
      core: ['SQL', 'dbt', 'Data Modeling', 'ETL', 'Data Warehousing', 'Analytics', 'Data Quality', 'Documentation', 'Testing', 'Python'],
      optional: ['Data Governance', 'Semantic Layer', 'Metrics Layer', 'DataOps', 'Machine Learning'],
      tools: ['dbt', 'Snowflake', 'BigQuery', 'Redshift', 'Looker', 'Tableau', 'Airflow', 'Git', 'Dagster', 'Monte Carlo']
    }
  },
  {
    id: 'bi-analyst',
    title: 'Business Intelligence Analyst',
    category: 'AI & Data',
    description: 'Build BI solutions that help organizations make data-driven decisions.',
    icon: '📈',
    color: '#ffa657',
    demandLevel: 'Medium',
    avgSalary: '$80k–$130k',
    skills: {
      core: ['SQL', 'Business Intelligence', 'Data Visualization', 'Dashboard Design', 'Data Analysis', 'ETL', 'KPI Development', 'Data Modeling', 'Reporting', 'Stakeholder Communication'],
      optional: ['Python', 'R', 'Predictive Analytics', 'Machine Learning', 'Data Strategy'],
      tools: ['Tableau', 'Power BI', 'Looker', 'Qlik', 'SQL Server', 'PostgreSQL', 'Excel', 'Google Analytics', 'Alteryx']
    }
  },

  // ─── PRODUCT ROLES ────────────────────────────────────────────────────────
  {
    id: 'product-manager',
    title: 'Product Manager',
    category: 'Product',
    description: 'Define product strategy and lead cross-functional teams to build great products.',
    icon: '🗺️',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$110k–$180k',
    skills: {
      core: ['Product Strategy', 'Roadmap Planning', 'User Research', 'Agile/Scrum', 'Stakeholder Management', 'Market Analysis', 'Prioritization', 'PRD Writing', 'OKRs', 'Data Analysis'],
      optional: ['A/B Testing', 'SQL', 'Product Analytics', 'Growth Hacking', 'Competitive Analysis', 'Pricing Strategy'],
      tools: ['JIRA', 'Notion', 'Figma', 'Amplitude', 'Mixpanel', 'Productboard', 'Aha!', 'Miro', 'Confluence', 'Linear']
    }
  },
  {
    id: 'technical-pm',
    title: 'Technical Product Manager',
    category: 'Product',
    description: 'Lead technical product teams with deep engineering and product expertise.',
    icon: '⚡',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$130k–$210k',
    skills: {
      core: ['Product Strategy', 'Technical Architecture', 'API Design', 'System Design', 'Agile/Scrum', 'Data Analysis', 'SQL', 'Engineering Collaboration', 'Technical Documentation'],
      optional: ['Machine Learning', 'Cloud Architecture', 'Security', 'Performance Engineering', 'Developer Experience'],
      tools: ['JIRA', 'GitHub', 'Postman', 'Figma', 'Amplitude', 'Notion', 'Linear', 'DataDog', 'AWS Console', 'Miro']
    }
  },

  // ─── DESIGN ROLES ─────────────────────────────────────────────────────────
  {
    id: 'ui-designer',
    title: 'UI Designer',
    category: 'Design',
    description: 'Create visually stunning, pixel-perfect user interfaces.',
    icon: '🎭',
    color: '#ffa657',
    demandLevel: 'Medium',
    avgSalary: '$75k–$130k',
    skills: {
      core: ['UI Design', 'Visual Design', 'Typography', 'Color Theory', 'Layout Design', 'Design Systems', 'Component Libraries', 'Prototyping', 'Iconography', 'Responsive Design'],
      optional: ['Motion Design', 'Brand Identity', '3D Design', 'Illustration', 'Dark Mode Design'],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'Adobe Illustrator', 'Photoshop', 'Principle', 'Zeplin', 'InVision', 'Lottie']
    }
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    category: 'Design',
    description: 'Design intuitive user experiences through research, testing, and iteration.',
    icon: '🔬',
    color: '#3fb950',
    demandLevel: 'Medium',
    avgSalary: '$80k–$140k',
    skills: {
      core: ['UX Research', 'User Interviews', 'Wireframing', 'Prototyping', 'Usability Testing', 'Information Architecture', 'User Journey Mapping', 'Personas', 'Accessibility'],
      optional: ['Quantitative Research', 'Eye Tracking', 'Card Sorting', 'Heuristic Evaluation', 'Service Design'],
      tools: ['Figma', 'Miro', 'UserTesting', 'Maze', 'Hotjar', 'Optimal Workshop', 'Notion', 'Dovetail', 'Lookback']
    }
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    category: 'Design',
    description: 'Own the full design process from research to pixel-perfect implementation.',
    icon: '✏️',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$100k–$170k',
    skills: {
      core: ['Product Design', 'UX Research', 'UI Design', 'Prototyping', 'Design Systems', 'User Testing', 'Figma', 'Interaction Design', 'Information Architecture', 'Accessibility'],
      optional: ['Front-end Development', 'Motion Design', 'Design Strategy', 'Brand Design', 'Growth Design'],
      tools: ['Figma', 'Principle', 'Framer', 'Miro', 'UserTesting', 'Notion', 'Zeplin', 'Storybook', 'Maze', 'Hotjar']
    }
  },

  // ─── SPECIALIZED ENGINEERING ──────────────────────────────────────────────
  {
    id: 'blockchain-developer',
    title: 'Blockchain Developer',
    category: 'Engineering',
    description: 'Build decentralized applications and smart contracts on blockchain platforms.',
    icon: '⛓️',
    color: '#ffa657',
    demandLevel: 'Medium',
    avgSalary: '$120k–$200k',
    skills: {
      core: ['Solidity', 'Smart Contracts', 'Ethereum', 'Web3.js', 'Cryptography', 'Decentralized Applications', 'Token Standards', 'Blockchain Architecture', 'Security Auditing'],
      optional: ['Rust', 'Solana', 'Layer 2 Solutions', 'DeFi', 'NFTs', 'Zero-Knowledge Proofs', 'Cross-chain Bridges'],
      tools: ['Hardhat', 'Truffle', 'Foundry', 'MetaMask', 'IPFS', 'The Graph', 'OpenZeppelin', 'Etherscan', 'Alchemy']
    }
  },
  {
    id: 'embedded-systems',
    title: 'Embedded Systems Engineer',
    category: 'Engineering',
    description: 'Program microcontrollers and embedded hardware systems.',
    icon: '🔧',
    color: '#d29922',
    demandLevel: 'Medium',
    avgSalary: '$95k–$155k',
    skills: {
      core: ['C', 'C++', 'Embedded Linux', 'RTOS', 'Microcontrollers', 'Hardware Interfaces', 'Debugging', 'Firmware Development', 'Digital Electronics', 'Communication Protocols'],
      optional: ['FPGA', 'Assembly', 'ARM Architecture', 'Power Management', 'Wireless Protocols', 'IoT'],
      tools: ['GDB', 'JTAG', 'Oscilloscope', 'Logic Analyzer', 'STM32', 'Arduino', 'Raspberry Pi', 'Keil', 'IAR Embedded Workbench']
    }
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    category: 'Engineering',
    description: 'Design and build engaging games across platforms using game engines.',
    icon: '🎮',
    color: '#a371f7',
    demandLevel: 'Medium',
    avgSalary: '$80k–$145k',
    skills: {
      core: ['Unity', 'C#', 'Game Design', 'Physics Simulation', '3D Mathematics', 'Game Optimization', 'Shader Programming', 'Game Architecture', 'Multiplayer Networking'],
      optional: ['Unreal Engine', 'C++', 'VR/AR Development', 'Procedural Generation', 'AI for Games', 'Animation'],
      tools: ['Unity', 'Unreal Engine', 'Blender', 'Photoshop', 'Visual Studio', 'Perforce', 'Git', 'Rider', 'Steamworks']
    }
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    category: 'Engineering',
    description: 'Ensure software quality through comprehensive testing strategies.',
    icon: '✅',
    color: '#3fb950',
    demandLevel: 'Medium',
    avgSalary: '$75k–$130k',
    skills: {
      core: ['Test Planning', 'Manual Testing', 'Automation Testing', 'Bug Reporting', 'Test Cases', 'API Testing', 'Regression Testing', 'Performance Testing', 'Selenium', 'Agile Testing'],
      optional: ['Load Testing', 'Security Testing', 'Mobile Testing', 'AI Testing', 'Accessibility Testing'],
      tools: ['Selenium', 'Playwright', 'Cypress', 'Postman', 'JIRA', 'TestRail', 'JMeter', 'Appium', 'Charles Proxy', 'k6']
    }
  },
  {
    id: 'database-admin',
    title: 'Database Administrator',
    category: 'Data & Infrastructure',
    description: 'Manage, optimize, and secure database systems at scale.',
    icon: '🗄️',
    color: '#58a6ff',
    demandLevel: 'Medium',
    avgSalary: '$85k–$145k',
    skills: {
      core: ['SQL', 'Database Design', 'Performance Tuning', 'Backup & Recovery', 'Database Security', 'Replication', 'High Availability', 'PostgreSQL', 'MySQL', 'Query Optimization'],
      optional: ['NoSQL', 'Cloud Databases', 'Sharding', 'Data Migration', 'Database DevOps'],
      tools: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL Server', 'MongoDB', 'Redis', 'pgAdmin', 'DBeaver', 'Percona', 'AWS RDS']
    }
  },
  {
    id: 'systems-engineer',
    title: 'Systems Engineer',
    category: 'Engineering',
    description: 'Design and manage complex distributed systems and infrastructure.',
    icon: '🖥️',
    color: '#d29922',
    demandLevel: 'Medium',
    avgSalary: '$100k–$165k',
    skills: {
      core: ['Linux', 'Networking', 'Distributed Systems', 'System Architecture', 'Performance Engineering', 'Operating Systems', 'Storage Systems', 'Virtualization', 'Scripting', 'Monitoring'],
      optional: ['HPC', 'Cluster Management', 'Bare Metal', 'Mainframe', 'Edge Computing'],
      tools: ['Linux', 'VMware', 'Ansible', 'Nagios', 'Prometheus', 'Grafana', 'Terraform', 'Docker', 'Python', 'Bash']
    }
  },
  {
    id: 'it-support',
    title: 'IT Support Engineer',
    category: 'IT',
    description: 'Provide technical support and maintain IT infrastructure for organizations.',
    icon: '🛠️',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$45k–$85k',
    skills: {
      core: ['Troubleshooting', 'Windows Administration', 'Network Support', 'Active Directory', 'Help Desk', 'Hardware Maintenance', 'Ticketing Systems', 'Customer Service', 'Linux Basics'],
      optional: ['Cloud Services', 'Cybersecurity', 'Scripting', 'Mobile Device Management', 'VoIP'],
      tools: ['ServiceNow', 'Jira', 'Active Directory', 'Office 365', 'Cisco', 'TeamViewer', 'Zendesk', 'SCCM', 'Intune']
    }
  },

  // ─── ADDITIONAL ROLES ─────────────────────────────────────────────────────
  {
    id: 'api-developer',
    title: 'API Developer',
    category: 'Engineering',
    description: 'Design and build robust, scalable APIs and integration systems.',
    icon: '🔗',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$100k–$160k',
    skills: {
      core: ['REST API Design', 'GraphQL', 'API Security', 'Authentication', 'Rate Limiting', 'Documentation', 'Versioning', 'JSON', 'HTTP/HTTPS', 'API Testing'],
      optional: ['gRPC', 'WebSockets', 'AsyncAPI', 'OpenAPI', 'API Gateways', 'SDK Development'],
      tools: ['FastAPI', 'Express.js', 'Postman', 'Swagger', 'Kong', 'AWS API Gateway', 'Docker', 'Git', 'Redis', 'PostgreSQL']
    }
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    category: 'Infrastructure',
    description: 'Design enterprise-scale cloud architectures and migration strategies.',
    icon: '🏛️',
    color: '#a371f7',
    demandLevel: 'High',
    avgSalary: '$150k–$240k',
    skills: {
      core: ['Cloud Architecture', 'AWS', 'Azure', 'GCP', 'Enterprise Architecture', 'Security Architecture', 'Cost Optimization', 'High Availability', 'Disaster Recovery', 'Migration Strategy'],
      optional: ['Multi-cloud', 'Hybrid Cloud', 'Edge Computing', 'FinOps', 'Cloud Native Design Patterns'],
      tools: ['AWS Well-Architected', 'Terraform', 'CloudFormation', 'Azure Resource Manager', 'Kubernetes', 'Istio', 'Helm', 'Vault']
    }
  },
  {
    id: 'tech-lead',
    title: 'Tech Lead / Engineering Manager',
    category: 'Leadership',
    description: 'Lead engineering teams with technical excellence and people management.',
    icon: '👑',
    color: '#ffa657',
    demandLevel: 'High',
    avgSalary: '$150k–$250k',
    skills: {
      core: ['Technical Leadership', 'System Design', 'Code Review', 'Team Management', 'Agile/Scrum', 'Engineering Strategy', 'Performance Management', 'Architecture Decision', 'Mentoring', 'Cross-team Collaboration'],
      optional: ['Hiring', 'OKRs', 'Budget Management', 'Vendor Management', 'Technical Roadmap'],
      tools: ['JIRA', 'GitHub', 'Confluence', 'Linear', 'Notion', 'Miro', 'Lattice', '1-on-1 Frameworks']
    }
  },
  {
    id: 'solutions-architect',
    title: 'Solutions Architect',
    category: 'Architecture',
    description: 'Design end-to-end technical solutions aligned to business requirements.',
    icon: '🔷',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$140k–$220k',
    skills: {
      core: ['Solution Design', 'System Architecture', 'Cloud Services', 'Technical Consulting', 'Stakeholder Communication', 'Enterprise Patterns', 'Integration Architecture', 'Security', 'Performance'],
      optional: ['AI/ML Integration', 'Blockchain', 'IoT', 'Edge Computing', 'Industry-specific Compliance'],
      tools: ['AWS', 'Azure', 'GCP', 'Terraform', 'Draw.io', 'Lucidchart', 'Postman', 'Docker', 'Kubernetes']
    }
  },
  {
    id: 'data-platform-engineer',
    title: 'Data Platform Engineer',
    category: 'AI & Data',
    description: 'Build the infrastructure and platforms that power data and ML teams.',
    icon: '⚙️',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$130k–$200k',
    skills: {
      core: ['Python', 'Distributed Computing', 'Data Warehousing', 'Stream Processing', 'Platform Engineering', 'Kubernetes', 'Data Governance', 'Metadata Management', 'Data Catalog'],
      optional: ['ML Platform', 'Feature Store', 'Data Mesh', 'DataOps', 'Observability'],
      tools: ['Databricks', 'Spark', 'Kafka', 'Airflow', 'Kubernetes', 'Terraform', 'dbt', 'Apache Iceberg', 'Delta Lake', 'Great Expectations']
    }
  },
  {
    id: 'rust-developer',
    title: 'Rust Systems Developer',
    category: 'Engineering',
    description: 'Build high-performance, memory-safe systems software with Rust.',
    icon: '🦀',
    color: '#ffa657',
    demandLevel: 'Medium',
    avgSalary: '$130k–$200k',
    skills: {
      core: ['Rust', 'Systems Programming', 'Memory Management', 'Concurrency', 'Performance Optimization', 'Unsafe Rust', 'Async Programming', 'Trait System', 'Cargo', 'Testing'],
      optional: ['WebAssembly', 'Embedded Rust', 'Cryptography', 'Networking', 'Compiler Development'],
      tools: ['Cargo', 'Clippy', 'Rustfmt', 'Criterion', 'Tokio', 'Actix', 'Serde', 'sqlx', 'Git', 'LLDB']
    }
  },
  {
    id: 'golang-developer',
    title: 'Go / Golang Developer',
    category: 'Engineering',
    description: 'Build scalable microservices and backend systems with Go.',
    icon: '🐹',
    color: '#58a6ff',
    demandLevel: 'High',
    avgSalary: '$115k–$185k',
    skills: {
      core: ['Go', 'Microservices', 'Concurrency', 'REST APIs', 'gRPC', 'SQL', 'Goroutines', 'Channels', 'Testing', 'Performance'],
      optional: ['Distributed Systems', 'Message Queues', 'Cloud Native', 'CLI Tools', 'WebAssembly'],
      tools: ['Go toolchain', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Kafka', 'Prometheus', 'Helm', 'Git', 'GitHub Actions']
    }
  },
  {
    id: 'ar-vr-developer',
    title: 'AR/VR Developer',
    category: 'Engineering',
    description: 'Build immersive augmented and virtual reality experiences.',
    icon: '🥽',
    color: '#a371f7',
    demandLevel: 'Medium',
    avgSalary: '$95k–$165k',
    skills: {
      core: ['Unity', 'C#', 'AR Development', 'VR Development', '3D Mathematics', 'Spatial Computing', 'XR Design', 'Performance Optimization', 'Shader Programming'],
      optional: ['Unreal Engine', 'WebXR', 'Spatial Audio', 'Hand Tracking', 'Eye Tracking', 'Avatar Systems'],
      tools: ['Unity', 'Unreal Engine', 'ARKit', 'ARCore', 'Meta SDK', 'Apple Vision Pro SDK', 'Blender', 'Substance Painter']
    }
  },
  {
    id: 'iot-engineer',
    title: 'IoT Engineer',
    category: 'Engineering',
    description: 'Build connected device systems and IoT platforms.',
    icon: '📡',
    color: '#3fb950',
    demandLevel: 'Medium',
    avgSalary: '$90k–$150k',
    skills: {
      core: ['Embedded Systems', 'MQTT', 'IoT Protocols', 'Cloud IoT Platforms', 'Edge Computing', 'Python', 'C/C++', 'Data Streaming', 'Device Management', 'Security'],
      optional: ['LoRa', 'Zigbee', 'Bluetooth LE', 'Time Series Databases', '5G', 'Digital Twin'],
      tools: ['AWS IoT', 'Azure IoT Hub', 'MQTT Broker', 'Node-RED', 'InfluxDB', 'Grafana', 'Raspberry Pi', 'Arduino', 'Docker']
    }
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master / Agile Coach',
    category: 'Leadership',
    description: 'Facilitate agile processes and coach teams to high performance.',
    icon: '🏃',
    color: '#d29922',
    demandLevel: 'Medium',
    avgSalary: '$85k–$140k',
    skills: {
      core: ['Scrum Framework', 'Agile Methodology', 'Facilitation', 'Coaching', 'Conflict Resolution', 'Sprint Planning', 'Retrospectives', 'Team Building', 'Stakeholder Management', 'Metrics'],
      optional: ['SAFe', 'Kanban', 'LeSS', 'OKRs', 'Change Management', 'DevOps Culture'],
      tools: ['JIRA', 'Confluence', 'Miro', 'Trello', 'Linear', 'Slack', 'Notion', 'Retro tools', 'Figma']
    }
  },
  {
    id: 'developer-advocate',
    title: 'Developer Advocate',
    category: 'Product',
    description: 'Champion developer experience, build community, and create technical content.',
    icon: '📣',
    color: '#58a6ff',
    demandLevel: 'Medium',
    avgSalary: '$100k–$170k',
    skills: {
      core: ['Developer Relations', 'Technical Writing', 'Public Speaking', 'Community Building', 'API Documentation', 'Demo Building', 'Feedback Collection', 'Content Creation', 'Social Media'],
      optional: ['Video Production', 'Open Source Contribution', 'SDK Development', 'Developer Marketing', 'Localization'],
      tools: ['GitHub', 'Notion', 'Figma', 'Loom', 'Postman', 'Hashnode', 'Dev.to', 'Twitter/X', 'Discord', 'Slack']
    }
  },
  {
    id: 'data-governance',
    title: 'Data Governance Lead',
    category: 'AI & Data',
    description: 'Establish and enforce data quality, security, and compliance standards.',
    icon: '⚖️',
    color: '#a371f7',
    demandLevel: 'Medium',
    avgSalary: '$100k–$165k',
    skills: {
      core: ['Data Governance', 'Data Quality', 'Compliance', 'GDPR', 'Data Catalog', 'Metadata Management', 'Data Lineage', 'Policy Development', 'Stakeholder Communication'],
      optional: ['CCPA', 'SOC 2', 'ISO 27001', 'Master Data Management', 'Data Mesh'],
      tools: ['Collibra', 'Alation', 'Apache Atlas', 'DataHub', 'Great Expectations', 'Monte Carlo', 'Informatica', 'Talend']
    }
  },
  {
    id: 'ml-ops-engineer',
    title: 'MLOps Engineer',
    category: 'AI & Data',
    description: 'Build infrastructure and tooling for reliable ML model deployment and monitoring.',
    icon: '🔁',
    color: '#ffa657',
    demandLevel: 'High',
    avgSalary: '$125k–$195k',
    skills: {
      core: ['MLOps', 'CI/CD for ML', 'Model Monitoring', 'Feature Stores', 'Model Registry', 'Experiment Tracking', 'Data Versioning', 'Kubernetes', 'Python', 'Cloud Platforms'],
      optional: ['Distributed Training', 'Model Compression', 'A/B Testing for Models', 'Shadow Deployment'],
      tools: ['MLflow', 'Kubeflow', 'Weights & Biases', 'DVC', 'Feast', 'Seldon', 'BentoML', 'Airflow', 'Docker', 'Terraform']
    }
  },
  {
    id: 'growth-engineer',
    title: 'Growth Engineer',
    category: 'Engineering',
    description: 'Drive user acquisition, retention, and revenue through technical experimentation.',
    icon: '📈',
    color: '#3fb950',
    demandLevel: 'High',
    avgSalary: '$110k–$180k',
    skills: {
      core: ['A/B Testing', 'Growth Hacking', 'Analytics', 'SQL', 'Python', 'Funnel Optimization', 'Experimentation Platform', 'Product Analytics', 'JavaScript', 'Conversion Optimization'],
      optional: ['SEO Engineering', 'Marketing Automation', 'Viral Loops', 'Referral Systems', 'Personalization'],
      tools: ['Amplitude', 'Mixpanel', 'Segment', 'Optimizely', 'LaunchDarkly', 'Braze', 'Iterable', 'Tableau', 'dbt', 'PostHog']
    }
  }
];

export const ROLE_CATEGORIES = [...new Set(JOB_ROLES.map(r => r.category))];

export const getRoleById = (id: string): JobRole | undefined => 
  JOB_ROLES.find(r => r.id === id);

export const getRolesByCategory = (category: string): JobRole[] =>
  JOB_ROLES.filter(r => r.category === category);
