import { IMovie } from "../../src/ts/models/IMovie";
import { mockData } from "../../src/ts/services/__mocks__/movieservice";

import { IOmdbResponse } from "../../src/ts/models/IOmdbResponse";

// const mockData: IOmdbResponse = {
//   Search: [
//     {
//       Title: "Star Wars IV",
//       imdbID: "31841",
//       Type: "text",
//       Poster: "poster",
//       Year: "1977",
//     },
//     {
//       Title: "The Lord of the Rings",
//       imdbID: "94752",
//       Type: "text",
//       Poster: "poster",
//       Year: "2001",
//     },
//     {
//       Title: "Harry Potter III",
//       imdbID: "18463",
//       Type: "text",
//       Poster: "poster",
//       Year: "2004",
//     },
//   ],
// };

beforeEach(() => {
  cy.visit("/");
});

describe("should be able to search movies", () => {
  it("should be able to type in input", () => {
    cy.get("input").type("star").should("have.value", "star");
  });

  it("should have a button", () => {
    cy.get("button").contains("Sök");
  });

  it("should run getData and get 10 movies", () => {
    //riktig datahämtning
    cy.get("input").type("star").should("have.value", "star");
    cy.get("form").submit();
    cy.get("div#movie-container > div.movie").should("have.length", 10);
  });

  it("should have request url containing 'star'", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData).as("getFakeMovies");
    cy.get("input").type("star").should("have.value", "star");

    cy.get("form").submit();

    cy.wait("@getFakeMovies").its("request.url").should("contain", "star");
  });

  it("should get 3 movie divs", () => {
    //mockad data hämtas oavsett input-texten
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("star").should("have.value", "star");

    cy.get("form").submit();

    cy.get("div#movie-container > div.movie").should("have.length", 3);
  });

  it("should have 3 headings and 3 img", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("star").should("have.value", "star");

    cy.get("form").submit();

    cy.get("div.movie > h3").should("have.length", 3);
    cy.get("div.movie > img").should("have.length", 3);
  });

  it("should have Star in first title and Harry in last", () => {
    cy.intercept("GET", "http://omdbapi.com/*", mockData);
    cy.get("input").type("star").should("have.value", "star");

    cy.get("form").submit();

    cy.get("div.movie:first > h3").contains("Star");
    cy.get("div.movie:last > h3").contains("Harry");
  });
});

describe("displayNoResult", () => {
  it("should show error message", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] }); //mockad tom lista

    cy.get("form").submit();

    cy.get("div#movie-container > p").contains("Inga sökresultat att visa");
  });

  it("should get 0 movies from mocked empty list", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] }); //mockad tom lista

    cy.get("form").submit();

    cy.get("div#movie-container > div.movie").should("have.length", 0);
  });

  it("should show error message", () => {
    cy.get("form").submit();

    cy.get("div#movie-container > p").contains("Inga sökresultat att visa");
  });

  it("should get 0 movies", () => {
    cy.get("form").submit();

    cy.get("div#movie-container > div.movie").should("have.length", 0);
  });
});
