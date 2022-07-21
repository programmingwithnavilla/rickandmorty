export interface WithLoadingProps {
  loading: boolean;
}

export interface ICharacters {
  id: number;
  image: string;
  name: string;
  location: {
    name: string;
    url: string;
  };
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  created: string;
  gender: string;
  episode: string[];
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
