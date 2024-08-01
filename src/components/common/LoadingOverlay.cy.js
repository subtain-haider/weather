import LoadingOverlay from './LoadingOverlay.vue'

describe('<LoadingOverlay />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoadingOverlay)
  })
})