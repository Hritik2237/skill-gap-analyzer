export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  skills: {
    core: string[];
    optional: string[];
    tools: string[];
  };
  avgSalary?: string;
  demandLevel?: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  role: string;
  roleId: string;
  matchPercentage: number;
  matchedSkills: SkillMatch[];
  missingSkills: SkillMatch[];
  partialMatches: SkillMatch[];
  totalRoleSkills: number;
  userSkills: string[];
  skillsByCategory: {
    core: { matched: string[]; missing: string[] };
    optional: { matched: string[]; missing: string[] };
    tools: { matched: string[]; missing: string[] };
  };
}

export interface SkillMatch {
  skill: string;
  similarity: number;
  matchedWith?: string;
  category: 'core' | 'optional' | 'tools';
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  skills: string[];
  resources: RoadmapResource[];
  projects: string[];
  milestones: string[];
}

export interface RoadmapResource {
  type: 'Course' | 'Book' | 'Documentation' | 'Tutorial' | 'Project' | 'Practice';
  title: string;
  platform?: string;
  url?: string;
  free: boolean;
}

export interface LearningRoadmap {
  role: string;
  totalDuration: string;
  phases: RoadmapPhase[];
  keyTechnologies: string[];
  careerOutcome: string;
  tips: string[];
}

export interface AnalysisRequest {
  skills: string[];
  roleId: string;
  roleName: string;
}

export type TabType = 'overview' | 'skills' | 'roadmap';

export interface SkillInputState {
  manualSkills: string;
  uploadedSkills: string[];
  fileName: string | null;
  activeTab: 'manual' | 'upload';
}

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
