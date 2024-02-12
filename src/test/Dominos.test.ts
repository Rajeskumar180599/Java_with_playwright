import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homepage';
import { MenuPage } from '../pages/menuPage';

test('Dominos Order Test', async ({ page }) => {

  const dominosWebsiteURL = 'https://www.dominos.co.in/';

  console.log('Navigating to the Domino\'s website');
  await page.goto(dominosWebsiteURL);

  const homePage = new HomePage(page);
  const menuPage = new MenuPage(page);

  await test.step('When the user navigates to vegPizza', async () => {
    await homePage.clickOnlineOrderButton();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await homePage.clickDeliveryAddress();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await homePage.enterAreaLocality();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await homePage.clickDontAllowButton();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.addVegPizzaToCart();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.calculateAndValidateSubtotal();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.clickBeverages();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.addBeverageToCart();
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.removeItemFromCart("Margherita", 1);
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.removeItemFromCart("Pepsi 475ml", 6);
  });
  await test.step('When the user navigates to vegPizza', async () => {
    await menuPage.finalAssertion();
  });
  console.log('Test Execution Successful');

});

test('youtube Automation ',   async ({ page }) => {
  await page.goto("https://www.youtube.com/")
  await page.locator("yt-formatted-string[title='Music']").click
  await await page.waitForTimeout(3000);

  Promise.all([
    page.waitForEvent("popup")
  ])

});
