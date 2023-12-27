const {Builder, By} = require('selenium-webdriver');
const assert = require('chai').assert;
const formyPageUrl = 'http://formy-project.herokuapp.com/form';
let driver = new Builder().forBrowser('chrome').build();


describe('Filling out the form', function() {
    this.beforeEach(async () => {
        await driver.get(formyPageUrl);
        await driver.manage().setTimeouts({ implicit: 1000 });
    });

    it('Check that after sending the form, the message "The form was successfully submitted!"', async () => {
        await driver.findElement(By.css('#first-name')).sendKeys('Peter');
        await driver.findElement(By.css('#last-name')).sendKeys('Peterson');
        await driver.findElement(By.css('#job-title')).sendKeys('tester');
        await driver.findElement(By.css('#radio-button-1')).click();
        await driver.findElement(By.css('#checkbox-1')).click();
        await driver.findElement(By.css('#select-menu')).click();
        await driver.findElement(By.css('#select-menu > option:nth-child(3)')).click();
        await driver.findElement(By.css('#datepicker')).sendKeys('12/12/2020');
        await driver.findElement(By.xpath('//a[text()="Submit"]')).click(); 
        await driver.findElement(By.xpath('//*[@class="alert alert-success"]')).then(async (notification) => {
            await notification.getText().then(async (message) => {
                assert.equal(message, 'The form was successfully submitted!');
            });
        });
    });

    this.afterAll(async () => await driver.quit());
});
