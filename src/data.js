export const profile = {
  name: 'Shanmugaraj D',
  email: 'shanmugaraj0523@gmail.com',
  phone: '+91 7904206557',
  whatsapp: 'https://wa.me/917904206557?text=Hello%20Shanmugaraj',
  linkedin: 'https://www.linkedin.com/in/shanmugaraj-durairajan',
  github: 'https://github.com/shanmugarajshan',
  instagram: 'https://www.instagram.com/s_h_a_n_n____1/',
};

export const tools = ['AWS EC2','Docker','Jenkins','Terraform','Kubernetes','GitHub Actions','Linux','Nginx','Shell scripting','Git','S3 + IAM','Docker Compose','React.js','TypeScript'];

export const skills = [
  { title: 'Cloud', icon: 'uil-cloud', tags: ['AWS EC2','S3','IAM'] },
  { title: 'CI/CD and releases', icon: 'uil-sync', tags: ['Jenkins','GitHub Actions','Build automation','Deployment automation','Release management'] },
  { title: 'Containers', icon: 'uil-box', tags: ['Docker','Dockerfile','Docker Compose','Kubernetes|project'] },
  { title: 'Infrastructure as code', icon: 'uil-layer-group', tags: ['Terraform|project','Ansible|exposure'] },
  { title: 'Linux and scripting', icon: 'uil-desktop', tags: ['Linux','Bash','Shell scripting','Nginx|project'] },
  { title: 'Troubleshooting', icon: 'uil-bug', tags: ['Log analysis','Deployment troubleshooting','Environment troubleshooting','Application monitoring','SonarQube|exposure'] },
  { title: 'Version control', icon: 'uil-code-branch', tags: ['Git','GitHub','Bitbucket'] },
  { title: 'Frontend', icon: 'uil-brackets-curly', tags: ['React.js','TypeScript','JavaScript','Redux','REST APIs','Tailwind CSS'] },
];

export const jobs = [
  {
    company: 'TELTH Healthcare', role: 'DevOps Engineer / Frontend Developer', period: 'Aug 2025 – Present', place: 'Salem',
    tech: ['AWS EC2','S3','IAM','Docker','CI/CD','Linux','Shell','Git','React.js','TypeScript'],
    points: [
      'Own DevOps, application deployment, release management and CI/CD for healthcare applications across multiple environments.',
      'Designed and maintain CI/CD pipelines that automate build, deployment and release, cutting manual deployment work.',
      'Containerized applications with Docker so they run the same way in every environment.',
      'Deploy and manage apps on AWS EC2, using S3 for storage and IAM for access and permissions.',
      'Write Linux shell scripts that automate repetitive deployment, configuration and operations tasks.',
      'Manage source code with Git and GitHub: branching, integration and deployment workflows.',
      'Troubleshoot deployment failures, environment configuration issues and production release errors.',
      'Coordinate releases with backend developers and stakeholders, and support the TELTH Care platform in production.',
      'Contribute to React.js and TypeScript frontend work when needed: bug fixes, reusable components, enhancements.',
    ],
  },
  {
    company: 'Samruva Technologies', role: 'Frontend Developer, React.js', period: 'Mar 2025 – Jul 2025', place: 'Chennai',
    tech: ['React.js','TypeScript','JavaScript','REST APIs','Bootstrap','Git'],
    points: [
      'Built responsive, reusable web components with React.js, JavaScript and TypeScript.',
      'Integrated RESTful APIs with .NET backend services.',
      'Improved performance with lazy loading, memoization and better state management.',
      'Worked with the team on integration, testing, debugging and bug fixes.',
    ],
  },
  {
    company: 'Rasi Infotech', role: 'Frontend Developer, React.js', period: 'Aug 2023 – Mar 2025', place: 'Salem',
    tech: ['React.js','Redux','Bootstrap','REST APIs','Git','Deployments'],
    points: [
      'Developed CRM, ERP and e-commerce web applications with React.js, Redux and Bootstrap.',
      'Supported releases across Development, UAT and Production on company-managed servers.',
      'Handled manual deployments: build preparation, server updates, config changes and post-deployment checks.',
      'Resolved deployment failures and environment errors together with development teams.',
      'Integrated REST APIs and coordinated release validation with backend developers.',
    ],
  },
];

export const flow = [
  ['GitHub','uil-github-alt','Source'],
  ['Jenkins','uil-sync','Build and deploy'],
  ['Docker','uil-box','Containers'],
  ['Nginx','uil-server-network','Reverse proxy'],
  ['AWS','uil-cloud','Hosting'],
  ['Terraform','uil-layer-group','Infrastructure'],
  ['Kubernetes','uil-apps','Orchestration'],
];

export const mern = [
  'Containerized the frontend and backend with Dockerfiles and Docker Compose for consistent environments.',
  'Configured Nginx as web server and reverse proxy routing requests to containerized services.',
  'Built Jenkins pipelines that automate build and deployment from a GitHub repository.',
  'Deployed to AWS and validated each environment after release.',
  'Provisioned AWS resources with Terraform as infrastructure as code.',
  'Wrote Kubernetes Deployment and Service configs to practice orchestration, plus shell scripts for operations.',
];

export const projects = [
  { name: 'Zinger ERP', kind: 'Jewelry ERP system', tech: ['React.js','REST APIs'], text: 'Web-based ERP for jewelry businesses covering sales, dealers, customers, lots and product management, built from reusable React components and wired to backend APIs.' },
  { name: 'Zinger E-commerce', kind: 'Jewelry e-commerce module', tech: ['React.js','Tailwind CSS','REST APIs'], text: 'Storefront module connected to the Zinger ERP, with responsive interfaces and API integration between frontend and backend services.' },
  { name: 'EN Project', kind: 'Project management tools', tech: ['Dashboards','CRM data'], text: 'Dashboards and automated reports from CRM data, helping product and customer service teams spot user trends and areas to improve.' },
];
