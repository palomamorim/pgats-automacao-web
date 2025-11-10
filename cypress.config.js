const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl:'https://automationexercise.com',
    setupNodeEvents(on, config) {      
      // implement node event listeners here
    },
  },
});
