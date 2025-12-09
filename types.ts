export interface KnowledgeItem {
  id: string;
  categorie: string;
  onderwerp: string;
  inhoud: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isError?: boolean;
}
