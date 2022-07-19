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

export interface IUseAxios {
  url: string;
  method?: string;
  body?: {
    [key: string]: any;
  };
  headers?: any;
  cookie?: string;
}
