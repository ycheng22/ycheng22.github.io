import { SkillGroup } from './types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'LLM & Agents',
    skills: [
      'OpenAI API', 'LangGraph', 'LangChain', 'CrewAI', 'MCP servers', 'AI agents & skills', 'RAG',
      'Prompt engineering', 'vLLM', 'PyTorch', 'Scikit-learn', 'NLP', 'GRPO', 'LoRA',
    ],
  },
  {
    title: 'Retrieval & Evaluation',
    skills: [
      'Hybrid search (BM25 + vector)', 'Embeddings', 'Cross-encoder reranking', 'Cross-lingual retrieval',
      'NDCG / Recall / MRR', 'LLM & agent evals',
    ],
  },
  {
    title: 'Languages & AI Tools',
    skills: ['Python', 'C#', 'TypeScript', 'SQL', 'Claude Code', 'Cursor'],
  },
  {
    title: 'Backend & Frontend',
    skills: [
      'FastAPI', 'Pydantic', '.NET Core', 'Entity Framework', 'REST', 'GraphQL', 'Node.js', 'Angular',
      'Next.js', 'Micro-frontends',
    ],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL / pgvector', 'MySQL', 'DynamoDB', 'Redshift', 'Redis'],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      'AWS (ECS, Lambda, Step Functions, CloudFormation, CloudWatch)', 'GCP Cloud Run', 'Docker',
      'GitHub Actions', 'OpenTelemetry', 'Playwright',
    ],
  },
  {
    title: 'Domain',
    skills: ['Auto finance & consumer lending', 'Servicing', 'Payments', 'Collections', 'Credit risk', 'Compliance'],
  },
];
