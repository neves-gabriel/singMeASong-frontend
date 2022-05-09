describe("Downvote", () => {
  let recommendation = {};

  before(() => {
    cy.request("GET", "http://localhost:4000/recommendations").then(
      (response) => {
        recommendation = {
          id: response.body[0].id,
          name: response.body[0].name,
          score: response.body[0].score,
        };
      }
    );
  });

  it("Should be able to Downvote", () => {
    cy.visit("http://localhost:3000");

    cy.intercept(
      "POST",
      `http://localhost:4000/recommendations/${recommendation.id}/downvote`
    ).as("downvote");
    cy.contains(recommendation.name).parent().get("#goArrowDown").click();
    cy.wait("@downvote").its("response.statusCode").should("eq", 200);
    cy.contains(recommendation.name)
      .parent()
      .contains(recommendation.score - 1);
  });
});
