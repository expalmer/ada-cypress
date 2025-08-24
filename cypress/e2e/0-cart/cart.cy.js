/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Deve possuir os títulos principais", () => {
    cy.get("h1").should("have.text", "Adesivos Rick and Morty");
    cy.get("h2").first().should("have.text", "Produtos");
    cy.get("h2").last().should("have.text", "Carrinho de Compras");
  });

  it("Deve mostrar os 3 produtos para incluir no carrinho com quantidades zeradas", () => {
    cy.get("#products .item").should("have.length", 3);
  });

  it("Deve permitir incrementar, decrementar e remover produtos ao carrinho", () => {
    // Garante que o carrinho começa vazio
    cy.get("#cart_total .quantity-value").should("have.text", "0");

    // Clica no botão "+" do primeiro produto
    cy.get('[data-id="1"] > :nth-child(2) > .quantity-control > .increase')
      .first()
      .click();

    // Verifica se a quantidade do carrinho aumentou
    cy.get("#cart_total .quantity-value").should("have.text", "1");

    // Verifica se o produto aparece no carrinho
    cy.get("#cart_products .item").should("have.length", 1);

    cy.get("#cart_total > :nth-child(2) > .quantity-value").should(
      "have.text",
      "1"
    );

    cy.get("#cart_checkout").should("not.be.disabled");

    // Diminui a quantidade do produto no carrinho
    cy.get('[data-id="1"] > :nth-child(2) > .quantity-control > .decrease')
      .first()
      .click();

    // Verifica se a quantidade do carrinho diminuiu
    cy.get("#cart_total .quantity-value").should("have.text", "0");

    // Verifica se o produto foi removido do carrinho
    cy.get("#cart_products .item").should("have.length", 0);

    cy.get("#cart_total > :nth-child(2) > .quantity-value").should(
      "have.text",
      "0"
    );

    cy.get("#cart_checkout").should("be.disabled");

    // Clica no botão "+" do primeiro produto
    cy.get('[data-id="1"] > :nth-child(2) > .quantity-control > .increase')
      .first()
      .click();

    // Verifica se a quantidade do carrinho aumentou
    cy.get("#cart_total .quantity-value").should("have.text", "1");

    // Verifica se o produto aparece no carrinho
    cy.get("#cart_products .item").should("have.length", 1);

    cy.get("#cart_total > :nth-child(2) > .quantity-value").should(
      "have.text",
      "1"
    );

    // Clica no botão de deletar
    cy.get('[data-id="1"] > :nth-child(2) > #add-to-cart').first().click();

    // Verifica se a quantidade do carrinho diminuiu
    cy.get("#cart_total .quantity-value").should("have.text", "0");

    // Verifica se o produto foi removido do carrinho
    cy.get("#cart_products .item").should("have.length", 0);

    cy.get("#cart_total > :nth-child(2) > .quantity-value").should(
      "have.text",
      "0"
    );

    cy.get("#cart_checkout").should("be.disabled");
  });
});
