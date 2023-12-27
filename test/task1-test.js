const {Builder, By} = require('selenium-webdriver');
const assert = require('chai').assert;
const dropdownPageUrl = 'https://the-internet.herokuapp.com/dropdown';
let driver = new Builder().forBrowser('chrome').build();

describe('Test Dropdown page', function() {
    this.beforeEach(async () => {
        await driver.get(dropdownPageUrl);
        await driver.findElement(By.css('#dropdown')).click();
    });

    it('Check that the 1st element of the list is inactive', async () => {
        const optionsList = await driver.findElements(By.xpath('//select/option'));
        const firstOption = await optionsList[0];
        let firstOptionStatus = await firstOption.isEnabled();
        assert.isFalse(firstOptionStatus);
    });

    it('Check that the 2nd element of the list is active', async () => {
        const optionsList = await driver.findElements(By.xpath('//select/option'));
        const secondOption = await optionsList[1];
        let secondOptionStatus = await secondOption.isEnabled();
        assert.isTrue(secondOptionStatus);
    });

    this.afterAll(async () => await driver.quit());
});
