export interface Show {
    image: ShowImage;
    name: string;
    type: string;
    network: Network;
    officialSite: string;
    genres: string[];
}

interface ShowImage {
    medium: string;
    original: string;
}

interface Country {
    name: string;
    code: string;
    timezone: string;
}

interface Network {
    id: number;
    name: string;
    officialSite: string | null;
    country: Country;
}

export interface State {
    shows: Show[];
}