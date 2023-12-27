const {Builder, By} = require('selenium-webdriver');
const assert = require('chai').assert;
const hoversPageUrl = 'https://the-internet.herokuapp.com/hovers';
let driver = new Builder().forBrowser('chrome').build();

describe('Hovering the mouse over an element', function() {
    this.beforeEach(async () => {
        await driver.get(hoversPageUrl);
    });

    it('Check the appearance of the text "name: user1" under a picture', async () => {
        const avatars = await driver.findElements(By.xpath('//div[@class="figure"]/img'));
        const actions = driver.actions({async: true});
        await actions.move({origin: avatars[0]}).perform();
        const userText = await driver.findElement(By.css('.figcaption')).getText();
        assert.include(userText, 'name: user1');
    });

    this.afterAll(async () => await driver.quit());
});
