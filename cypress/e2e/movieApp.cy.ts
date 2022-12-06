import { IMovie } from "./../../src/ts/models/IMovie";
import { mockData } from "./../../src/ts/services/__mocks__/movieservice";

describe("should  getData", () => {
  it("should get 3 movie divs", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();

    cy.get("div#movie-container > div.movie").should("have.length", 3);
  });

  it("should get 3 headings", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();

    cy.get("div.movie > h3").should("have.length", 3);
  });

  it("should get 3 img", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();

    cy.get("div.movie > img").should("have.length", 3);
  });

  it("should have Harry in title", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();

    cy.get("div.movie:last > h3").contains("Harry");
  });

  it("should have Star in title", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", mockData);

    cy.get("form").submit();

    cy.get("div.movie:first > h3").contains("Star");
  });

  it("should type in input", () => {
    cy.visit("http://localhost:1234");

    cy.get("input").type("star").should("have.value", "star");
  });

  it("should have button", () => {
    cy.visit("http://localhost:1234");

    cy.get("button").should("contain", "Sök");
  });
});

describe("displayNoResult", () => {
  it("should show error message", () => {
    cy.visit("http://localhost:1234");
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > p").contains("Inga sökresultat att visa");
  });

  it("should get 0 movies", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fakeSearch: [] });

    cy.get("form").submit();

    cy.get("div#movie-container > div.movie").should("have.length", 0);
  });
});
