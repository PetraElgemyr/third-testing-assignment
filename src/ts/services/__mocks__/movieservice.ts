import { IMovie } from "../../models/IMovie";
import { IOmdbResponse } from "../../models/IOmdbResponse";

export const mockData: IOmdbResponse = {
  Search: [
    {
      Title: "Star Wars IV",
      imdbID: "31841",
      Type: "text",
      Poster: "poster",
      Year: "1977",
    },
    {
      Title: "The Lord of the Rings",
      imdbID: "94752",
      Type: "text",
      Poster: "poster",
      Year: "2001",
    },
    {
      Title: "Harry Potter III",
      imdbID: "18463",
      Type: "text",
      Poster: "poster",
      Year: "2004",
    },
  ],
};

// export const getData = async (searchText: string): Promise<IMovie[]> => {
//   return new Promise((resolve, reject) => {
//     if (searchText !== "") {
//       resolve(mockData);
//     } else {
//       reject([]); //skickar tom lista vid fel
//     }
//   });
// };
