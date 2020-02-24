describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Seppo aho',
        username: 'sepe',
        password: 'salainen'
      }
      
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('login')
    })

    it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('sepe')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    
        cy.contains('Seppo aho logged in')
      })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#username').type('sepe')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.get('.error')
          .should('contain', 'wrong credentials')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Seppo aho logged in')
})
})
describe('when logged in', function() {
  beforeEach(function() {
     cy.login({ username: 'sepe', password: 'salainen' })
    })
  
      it('a new blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('a notess')
        cy.get('#url').type('a note ')
        cy.contains('create').click()
  
        cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({          
          title: 'another note cypress', 
          author: 'chicken el maco',
          url: 'mckarrikoira.fi'        
        })      
      })

      it('blog can be liked', function(){
        cy.contains('another note cypress').contains('#more').click
        cy.contains('tykkää').click
      })


})
})