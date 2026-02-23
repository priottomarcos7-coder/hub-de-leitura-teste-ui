///<reference types="cypress"/>
import catalogo from "../fixtures/livros.json"
describe('Funcionalidade: Busca no catalogo', () => {
   
    beforeEach(() => {
        cy.visit('catalog.html')
    });

    it('Deve fazer a busca do livro 1984 com sucesso', () => {
        cy.get('#search-input').type('1984')
        cy.get('.card-title').should('contain', '1984')
    });

    it.only('Deve fazer a busca de um livro do arquivo de massa de dados', () => {
        cy.get('#search-input').type(catalogo[2].livro)
        cy.get('.card-title').should('contain', catalogo[2].livro)
    });

});