import Dashboard_layout from './dashboard_layout.vue'

describe('<Dashboard_layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Dashboard_layout)
  })
})