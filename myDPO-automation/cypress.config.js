const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  projectId: "myDPO",
  trashAssetsBeforeRuns: true,

  e2e: {
    baseUrl: 'http://174.138.41.162:3000',
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
