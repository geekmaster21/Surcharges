export interface IMaintainer {
  id: string;
  name: string;
  username: string;
}

export interface IMaintainerWithSocial extends IMaintainer {
  telegram: {
    id: number;
    url: string;
    username: string;
  };
  gitlab: {
    id: number;
  };
}
