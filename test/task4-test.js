const {Builder, By} = require('selenium-webdriver');
const assert = require('chai').assert;
const tablesPageUrl = 'http://the-internet.herokuapp.com/tables';
let driver = new Builder().forBrowser('chrome').build();


describe('Sorting the table', function() {
    this.beforeEach(async () => {
        await driver.get(tablesPageUrl);
        await driver.manage().setTimeouts({ implicit: 1000 });
    });

    it('Check that the values of the cells of the "Due" column are sorted in ascending order', async () => {
        let secondTable = await driver.findElement(By.xpath('//*[@id="table2"]'));
        await driver.executeScript('arguments[0].scrollIntoView(true);', secondTable);
        await driver.findElement(By.xpath('//*[@id="table2"]//span[@class="dues"]')).click();
        const dues =  await driver.findElements(By.xpath('//*[@id="table2"]//tr/td[@class="dues"]'));
     
        async function getActualDues(dues) {
            let numbers = [];
            for (let due of dues) { 
                let dueText = await due.getText(); 
                numbers.push(dueText.slice(1)); 
            };
            return numbers;
        }   

        let actual = await getActualDues(dues);
        let expected = [...actual];
        expected.sort(function(a, b){return a - b});
        console.log(`actual: ${actual}, expected: ${expected}`);
        assert.sameDeepOrderedMembers(actual, expected);        
    });

    this.afterAll(async () => await driver.quit());
});
