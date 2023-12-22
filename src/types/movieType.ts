export type Movie = {
  id: number;
  genres: {
    id: number;
    name: string;
  }[];
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  credits: {
    cast: {
      id: number;
      name: string;
      profile_path: string;
      character: string;
    }[];
    crew: {
      id: number;
      name: string;
      profile_path: string;
      job: string;
    }[];
  };
};
