///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPage from '../support/pages/cadastro-page';

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {

    beforeEach(() => {
        cadastroPage.visitarPaginaCadastro()
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer cadastro com sucesso, usando Função JS', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Marcos Vinicios')
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso, usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('11987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName({sex: 'male'})
        cy.preencherCadastro(
            nome,
            email,
            '11987654321',
            'Teste@123',
            'Teste@123',
        )
        cy.url().should('include', 'dashboard')
    });
    
    it('Deve fazer cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        let nome = faker.person.fullName({sex: 'male'})
        cadastroPage.preencherCadastro(nome, email, '11987654321', 'Teste@123', 'Teste@123')
        cy.url().should('include', 'dashboard')
    });

    it.only('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'vini@teste.com','11987654321', 'Teste@123', 'Teste@123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });

});