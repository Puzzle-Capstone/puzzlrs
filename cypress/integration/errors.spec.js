describe('error handling', () => {
  it('handles invalid URLs, directs user to homepage', () => {
    cy.visit('http://localhost:3000/banana')
      .get('h2').contains("Oops! You\'ve made your way to an invalid URL.")
      .get('button').contains('Go Home!').click()
      .get('h2').contains('Tired of your puzzles? Trade with people like you!')
  })

  it('handles puzzle data fetch errors', () => {
    cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
      statusCode: 404,
      body: 'Failed to fetch.'
    })
      .visit('http://localhost:3000/')
      .get('button').click()
      .get('h2').contains('We\'re having issues loading, try again later!')
  })

  it('handles user data fetch errors', () => {
    cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
      statusCode: 404,
      body: 'Failed to fetch.'
    })
      .visit('http://localhost:3000/')
      .get('.MuiInput-root').click()
      .get('[data-value="Micha"]').click()
      .get('.homepage > a > button').click()
      .get('h2').contains('We\'re having issues loading, try again later!')

      .get(':nth-child(1) > button').click()
      .get('h2').contains('We\'re having issues loading, try again later!')

      .get(':nth-child(2) > button').click()
      .get('h2').contains('We\'re having issues loading, try again later!')

      .get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').click()
      .get('h2').contains('We\'re having issues loading, try again later!')
  })

  it('handles user being logged out on user profile page refresh', () => {
    cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
        statusCode: 200,
        body: user
      })
      .visit('http://localhost:3000/');
    })
    .get('.MuiInput-root').click()
    .get('[data-value="Micha"]').click()
    .get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').click()

    .reload()
    .get('h2').contains('You are not logged in! Click above or return home.')
    .get('.MuiInput-root').click()
    .get('[data-value="Micha"]').click()
    .get('.user-profile').contains('h2', 'Hi, Micha!')
  })

  it('handles user being logged out on form page refresh', () => {
    cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
        statusCode: 200,
        body: user
      })
      .visit('http://localhost:3000/');
    })
    .get('.MuiInput-root').click()
    .get('[data-value="Micha"]').click()
    .get(':nth-child(2) > button').click()

    .reload()
    .get('h2').contains('You are not logged in! Click above or return home.')
    .get('.MuiInput-root').click()
    .get('[data-value="Micha"]').click()
    .get('.form-title').contains('Submit your puzzle')
  })

  it.only('handles logged out puzzle request', () => {
    cy.fixture('./puzzles.json').then((allPuzzles) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
        statusCode: 200,
        body: allPuzzles
      })
      cy.visit('http://localhost:3000/');
    })
    .visit('http://localhost:3000/')
    .get('.homepage > a > button').click()
    .get(':nth-child(1) > .individual-puzzle > img').click()
    .get('.request-button').click()
    .get('.request-error-message').contains('You are not logged in! Request failed')
  })
})