import type { SdgGoal } from './sdgs'

export interface NewsArticle {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    published_at: string;
    created_at?: string;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
    sdgs?: SdgGoal[];
    related_news?: NewsArticle[];
    author?: string;
    category?: string;
    tags?: string[];
    views?: number;
}

export interface NewsResponse {
    data: NewsArticle[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export interface NewsDetailResponse {
    news: NewsArticle;
    related_news?: NewsArticle[];
}
