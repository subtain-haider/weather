import WeatherCard from './WeatherCard.vue'

describe('<WeatherCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(WeatherCard)
  })
})