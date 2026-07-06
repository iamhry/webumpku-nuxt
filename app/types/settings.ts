export interface SiteSettings {
    site_name: string;
    site_short_name: string;
    logo: string;
    logo_white: string;
    favicon: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    default_locale: string;
}

export interface SettingsResponse {
    data: SiteSettings;
}
