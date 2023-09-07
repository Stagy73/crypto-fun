// cypress/integration/cryptoPriceConverter.spec.js

describe("Crypto Price Converter", () => {
  it("should load the Crypto Price Converter", () => {
    cy.visit("http://localhost:5173/"); // Replace with the URL of your app
    cy.get("h1").should("contain", "Crypto Prices");
  });

  it("should convert USD to crypto", () => {
    cy.visit("http://localhost:5173/"); // Replace with the URL of your app
    cy.get('input[type="text"]').type("100"); // Enter an amount
    cy.get("select").select("ETHUSDT"); // Select a crypto
    cy.get("button").click(); // Click the Convert button
    cy.get("p").should("contain", "ETHUSDT:");
  });

  // Add more test cases as needed
});
it("should display the correct crypto prices", () => {
  cy.get("ul").within(() => {
    cy.get("li").should("have.length", 10); // Assuming you have 10 symbols
    cy.get("li").should("contain", "BTCUSDT:");
    cy.get("li").should("contain", "ETHUSDT:");
    // Add assertions for other symbols as needed
  });
});
