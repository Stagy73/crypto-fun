describe("Crypto Price Converter", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should load the Crypto Price Converter", () => {
    cy.get("h1").should("contain", "Crypto Prices");
  });

  it("should convert USD to crypto", () => {
    cy.get('input[type="text"]').type("100");
    cy.get("select").select("ETHUSDT");
    cy.get("button").click();
    cy.get("p").should("contain", "ETHUSDT:");
  });

  it("should display the correct crypto prices", () => {
    cy.get("ul").within(() => {
      cy.get("li").should("have.length", 10);
      cy.get("li").should("contain", "BTCUSDT:");
      cy.get("li").should("contain", "ETHUSDT:");
    });
  });
});
