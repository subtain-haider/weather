import DashboardPage from './DashboardPage.vue'

describe('<DashboardPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DashboardPage)
  })
})