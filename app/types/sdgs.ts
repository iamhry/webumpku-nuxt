export interface SdgGoal {
    id: number;
    title: string;
    slug: string;
    description: string;
    banner_image: string;
    icon_image: string;
    statistics: Record<string, any>;
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
    related_news?: any[]; // Avoiding circular dependency with NewsArticle for now
}

export interface SdgsResponse {
    data: SdgGoal[];
    meta: {
        current_page: number;
        last_page: number;
        total: number;
    };
}

export interface SdgDetailResponse {
    data: SdgGoal;
}
