import { common, home } from "../support/selectors";

const selectPiece = (type: "green" | "red", index: number) =>
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
        selectPiece("green", 0);
        placePiece(0);
        //2nd turn
        selectPiece("red", 0);
        placePiece(1);
        //3rd turn
        selectPiece("green", 1);
        placePiece(3);
        //4th turn
        selectPiece("red", 1);
        placePiece(4);
        //5th turn
        selectPiece("green", 2);
        placePiece(6);
    });

    it("should show end game modal", () => {
        cy.get(common.endGameModal.MODAL).should("be.visible");
        cy.get(common.endGameModal.RESTART_BUTTON).should("be.visible");
    });
});

export {};
