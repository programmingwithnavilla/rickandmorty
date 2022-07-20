export interface WithLoadingProps {
  loading: boolean;
}

export interface Characters {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: any;
  image: string;
  episode: any;
  created: string;
}

export interface Ilocations {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface IUseAxios {
  url: string;
  method?: string;
  body?: {
    [key: string]: any;
  };
  headers?: any;
  cookie?: string;
}

export interface IEpisodes {
  id: number;
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  name: string;
  url: string;
}
