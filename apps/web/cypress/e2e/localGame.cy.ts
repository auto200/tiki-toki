import { common, home } from "../support/selectors";

const selectPiece = (type: "ally" | "enemy", index: number) =>
    cy.get(`[data-cy="piece-${type}-${index}"]`).click();
const placePiece = (cellIndex: number) => cy.get(`[data-cy="cell-${cellIndex}"]`).click();

describe("Local Game (1v1)", () => {
    it("Should navigate to local game route", () => {
        cy.visit("/");
        cy.get(home.LOCAL1V1).should("be.visible").click();
        cy.url().should("include", "/local1v1");
    });

    it("should be able to play a local game", () => {
        cy.visit("/local1v1?startingPlayer=one");
        // have to wait, probably because react mounting/unmounting components
        // behavior in dev
        cy.wait(1000);
        //1st turn
        selectPiece("ally", 0);
        placePiece(0);
        //2nd turn
        selectPiece("enemy", 0);
        placePiece(1);
        //3rd turn
        selectPiece("ally", 1);
        placePiece(3);
        //4th turn
        selectPiece("enemy", 1);
        placePiece(4);
        //5th turn
        selectPiece("ally", 2);
        placePiece(6);
    });

    it("should show end game modal", () => {
        cy.get(common.endGameModal.MODAL).should("be.visible");
        cy.get(common.endGameModal.RESTART_BUTTON).should("be.visible");
    });
});
