import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    name: 'ShopRank',
    subtitle: 'Multilingual Hybrid Search & Reranking',
    summary:
      'Hybrid BM25 + dense retrieval with cross-encoder reranking on the Amazon ESCI benchmark, including cross-lingual search.',
    metrics: ['NDCG@10 0.417 → 0.581 (+39%)', 'MRR@10 0.662 → 0.794', 'Cross-lingual NDCG@10 ≈0 → 0.38–0.40'],
    stack: ['BM25', 'BGE-M3', 'pgvector HNSW', 'RRF', 'Cross-encoder', 'PostgreSQL'],
    details: [
      "Built a hybrid retrieval pipeline on the Amazon ESCI benchmark (30k products): BM25 + BGE-M3 dense retrieval (pgvector HNSW), RRF fusion, and cross-encoder reranking, lifting NDCG@10 from 0.417 to 0.581 (+39%) and MRR@10 from 0.662 to 0.794, with each stage's gain proven in a 5-stage ablation.",
      'Enabled cross-lingual search for Chinese and French queries on an English catalog, raising NDCG@10 from near-zero BM25 (0.016 / 0.098) to 0.382 / 0.398; Matryoshka truncation to 768 dims matched 1024-dim quality (0.518 vs. 0.517) within the free-tier storage quota.',
    ],
    link: { label: 'Live demo', url: 'https://shoprank.vectorlab.me' },
  },
  {
    name: 'TripAgent',
    subtitle: 'Verified LLM Planning Agent',
    summary:
      'LangGraph travel planner whose itineraries are checked by deterministic validators, revised, or honestly reported as infeasible.',
    metrics: ['0% transit hallucination', '11/11 prompt injections blocked', '$0.0027 / task'],
    stack: ['LangGraph', 'Python', 'GTFS', 'Human-in-the-loop', 'Circuit breakers'],
    details: [
      'Built a LangGraph travel-planning agent that keeps LLM itineraries feasible: every draft is checked by 4 deterministic, LLM-free validators (GTFS transit connectivity, Haversine reachability, opening hours, budget), revised with validator feedback up to 3 times, or reported as infeasible instead of fabricated.',
      'Gated every side effect with human-in-the-loop approval, idempotency keys, and circuit breakers; evaluated on 41 trajectory and adversarial scenarios: 0% transit hallucination, 11/11 prompt injections blocked, and 10/10 constraint violations caught at $0.0027 average cost per task.',
    ],
    link: { label: 'Live demo', url: 'https://tripagent.vectorlab.me' },
  },
  {
    name: 'Small-Model RL for Code',
    subtitle: 'GRPO with Unit-Test Rewards',
    summary: 'GRPO post-training of Qwen3.5-2B with sandboxed unit-test rewards, with controlled ablations.',
    metrics: ['MBPP Pass@1 40.6% → 55.4% (+14.8 pt)', '3 seeds', '~2.5 T4 GPU-hours / run'],
    stack: ['PyTorch', 'TRL', 'LoRA', 'GRPO', 'Qwen'],
    details: [
      'Post-trained Qwen3.5-2B with GRPO (TRL + LoRA) using sandboxed unit-test execution as the reward, raising held-out MBPP Pass@1 from 40.6% to 55.4% (+14.8 pt, 3 seeds) at ~2.5 T4 GPU-hours per run; an SFT baseline gave no gain, and the gain did not significantly transfer to HumanEval.',
      'Ran controlled ablations with paired-bootstrap CIs on a SHA-256-frozen, leakage-audited test set: one GRPO sample matched ~4 base samples, hard-task mining tied random selection, and ReAct tool use helped at 4B (+23 pt) but not 2B; found and corrected a 90% output-truncation confound that had reversed the 4B-vs-2B conclusion.',
    ],
    link: { label: 'GitHub', url: 'https://github.com/ycheng22/local-llm-lab' },
  },
];
