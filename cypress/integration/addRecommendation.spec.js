describe("Add Recommendation", () => {
  it("Should add a new song recommendation", () => {
    const recommendation = {
      name: "First Class by Jack Harlow",
      youtubeLink: "https://www.youtube.com/watch?v=HmP_wGYw1_g",
    };

    cy.visit("http://localhost:3000");

    cy.get("input[placeholder = 'Name']").type(recommendation.name);
    cy.get("input[placeholder ~= 'https://youtu.be/...']").type(
      recommendation.youtubeLink
    );

    cy.intercept("POST", "http://localhost:4000/recommendations").as(
      "newRecommendation"
    );

    cy.get("Button").click();

    cy.wait("@newRecommendation");

    cy.contains(recommendation.name).should("be.visible");
  });
});
