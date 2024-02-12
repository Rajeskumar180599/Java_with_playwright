import { Page, expect } from '@playwright/test';
import { CartPageLocators, HomePageLocators, MenuPageLocators } from '../DominosLocators/Locators';
import { TestData } from './testData';

export class MenuPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  async addVegPizzaToCart(): Promise<void> {
    console.log('Navigating to Veg Pizza');
    // await this.page.waitForTimeout(3000);
    const element = await this.page.waitForSelector(MenuPageLocators.VEG_PIZZA);
    if (element) {
      await this.page.click(MenuPageLocators.VEG_PIZZA);
    }
    await this.page.waitForLoadState('domcontentloaded');

    for (const product of TestData.product_values) {
      const quantity = 2; // Set the quantity to 2 for all pizzas
      console.log(`Adding ${quantity} ${product} Pizzas to Cart`);
      let addCartLocator = MenuPageLocators.VEG_MENU_ADD_PRODUCT.replace('{}', product);
      const addCartElement = await this.page.waitForSelector(addCartLocator);


      if (addCartElement) {
        await addCartElement.click();
      } else {
        console.error('Element not found.');
      }


      try {
        // await this.page.waitForTimeout(3000);
        const noThanksElement = await this.page.waitForSelector(MenuPageLocators.NO_THANKS, { timeout: 5000 });


        if (noThanksElement) {
          console.log('Extra Cheese popup is displayed and Clicked No thanks Options');
          await noThanksElement.click();
        }
      } catch (error) {
        console.log('Extra Cheese popup not displayed');
      }


      // Wait for the quantity element to become visible
      const quantityLocator = MenuPageLocators.QUANTITY.replace('{}', product);
      const quantityElement = await this.page.waitForSelector(quantityLocator, { timeout: 10000 });


      if (quantityElement) {
        const increaseButtonLocator = MenuPageLocators.PROD_INCREASE.replace('{}', product);
        const increaseButtonElement = await this.page.waitForSelector(increaseButtonLocator, { timeout: 10000 });


        if (increaseButtonElement) {
          await increaseButtonElement.click();
        } else {
          console.error(`Increase button not found for ${product}`);
          break;
        }
      }
    }
  }

  async calculateAndValidateSubtotal(): Promise<number[]> {
    let expectedSubtotal = 0;
    for (const product of TestData.product_values) {
      const quantity = 2;
      const priceLocator = MenuPageLocators.VEG_PRODUCT_PRICES.replace('{}', product);
      const priceElement = await this.page.waitForSelector(priceLocator, { timeout: 10000 });

      if (priceElement) {
        const priceText = await priceElement.textContent();
        // Replace both currency symbols and trim any extra whitespace
        const parsedPrice = priceText ? parseFloat(priceText.replace(/[$₹]/g, '').trim()) : 0;
        expectedSubtotal += parsedPrice * quantity; // Update the expected subtotal based on quantity and price
      }
    }
    const cartSubtotalElement = await this.page.waitForSelector(MenuPageLocators.SUBTOTAL, { timeout: 10000 });
    const cartSubtotalText = await cartSubtotalElement.textContent();

    if (cartSubtotalText !== null) {
      const cartSubtotal = parseFloat(cartSubtotalText.replace('$', '').trim());
      console.log(`Expected subtotal: ${expectedSubtotal}, Actual subtotal: ${cartSubtotal}`);

      if (expectedSubtotal === cartSubtotal) {
        console.log('Subtotal validation passed.');
        return [expectedSubtotal];
      }
    }

    console.error('Subtotal validation failed. Expected:', expectedSubtotal, 'Actual:', cartSubtotalText);
    return [-1];
  }

  async clickBeverages(): Promise<void> {
    const orderBeverages = await this.page.waitForSelector(MenuPageLocators.MENU_BEVERAGES);
    await orderBeverages.click();
    console.log('Clicked Beverages Menu');
  }

  async addBeverageToCart(): Promise<void> {
    try {
      const productName = TestData.beverage_product;
      const quantity = parseInt(TestData.beverage_quantity);
      const beverageLocator = MenuPageLocators.BEVERAGE_MENU_ADD_PRODUCT.replace('{}', productName);
      const beverageButton = await this.page.waitForSelector(beverageLocator, { timeout: 10000 });
      await beverageButton.click();
      const qtyButton = await this.page.waitForSelector(MenuPageLocators.PROD_INCREASE.replace('{}', productName));
      if (qtyButton) {
        console.log(`Adding ${quantity} ${productName} to Cart`);
        for (let i = 0; i < quantity - 1; i++) {
          await qtyButton.click();
        }
        console.log(`${productName} added to Cart successfully.`);
      } else {
        console.error(`${productName} button not found.`);
      }
    } catch (error) {
      console.error(`Error adding ${TestData.beverage_product} to Cart: ${error}`);
    }
  }

  async removeItemFromCart(productName: string, quantity: number): Promise<void> {
    try {
      const decreaseQty = MenuPageLocators.PROD_DECREASE.replace('{}', productName);
      for (let i = 0; i < quantity; i++) {
        const decreaseButton = await this.page.waitForSelector(decreaseQty, { timeout: 10000 });

        if (decreaseButton) {
          console.log(`Removing ${productName} from Cart`);
          await decreaseButton.click();
          // Add a 2-second wait between clicks
        } else {
          console.error(`Decrease button not found for ${productName}`);
          break;
        }
      }
    } catch (error) {
      console.error(`Error removing ${productName} from Cart: ${error}`);
    }
  }

  async calculateSubtotalForRemainingItems(): Promise<number[]> {
    let expectedSubtotal = 0;
    let vegPizzaSubtotal = 0;
    let individualTotal = 0;
    let beverageSubtotal = 0;

    for (const product of TestData.product_values) {
      let quantity = 2;
      if (product == 'Margherita') {
        quantity = 1;
      }
      const priceLocator = MenuPageLocators.VEG_PRODUCT_PRICES.replace('{}', product);
      const priceElement = await this.page.waitForSelector(priceLocator, { timeout: 10000 });
      if (priceElement) {
        const priceText = await priceElement.textContent();//@ts-ignore
        const parsedPrice = parseFloat(priceText.replace('₹', '').trim());
        individualTotal = parsedPrice * quantity;
        console.log(`Product: ${product}, Price Text: ${priceText}, Parsed Price: ${parsedPrice}`);
      }
      vegPizzaSubtotal = vegPizzaSubtotal + individualTotal;
    }
    const beverages = MenuPageLocators.BEVERAGES_PRODUCT_PRICES.replace('{}', TestData.beverage_product);
    const beveragesPriceElement = await this.page.waitForSelector(beverages, { timeout: 10000 });

    if (beveragesPriceElement) {
      const priceText = await beveragesPriceElement.textContent();//@ts-ignore
      const parsedPrice = parseFloat(priceText.replace('₹', '').trim());
      beverageSubtotal = parsedPrice * 6;
      console.log(`Product: "Beverage", Price Text: ${priceText}, Parsed Price: ${parsedPrice}`);
    }
    expectedSubtotal = (vegPizzaSubtotal + beverageSubtotal)
    return [expectedSubtotal, beverageSubtotal];
  }

  async assertCartSubtotal(expectedSubtotal: number): Promise<number> {
    const cartSubtotalElement = await this.page.waitForSelector(MenuPageLocators.SUBTOTAL, { timeout: 10000 });
    const cartSubtotalText = await cartSubtotalElement.textContent();
    let cartSubtotal = 0
    if (cartSubtotalText !== null) {
      cartSubtotal = parseFloat(cartSubtotalText.replace('₹', '').trim());
      console.log(`Expected subtotal: ${expectedSubtotal}, Actual subtotal: ${cartSubtotal}, Cart Subtotal Text: ${cartSubtotalText}`);
      expect(expectedSubtotal).toBe(cartSubtotal);
      if (expectedSubtotal === cartSubtotal) {
        console.log('Subtotal validation passed.');
      } else {
        console.error('Subtotal validation failed. Expected:', expectedSubtotal, 'Actual:', cartSubtotalText);
      }
    }
    return cartSubtotal;
  }

  async clickCheckout(): Promise<void> {
    const checkoutButton = await this.page.waitForSelector(CartPageLocators.CHECK_OUT);
    await checkoutButton.click();
    console.log('Clicked checkout button');
  }

  async finalAssertion(): Promise<void> {
    let values = await this.calculateSubtotalForRemainingItems();
    let cartSubtotal = await this.assertCartSubtotal(values[0]);
    await this.clickCheckout();
    try {
      console.log('Validating subtotal');
      const subtotalElement = await this.page.waitForSelector(CartPageLocators.CART_SUBTOTAL);
      const subTotalText = await subtotalElement?.textContent();
      if (subTotalText) {
        const subTotalPrice = parseFloat(subTotalText.replace('₹', '').trim());
        // Calculate the actual beverage price
        const discountBeveragePrice = values[1] * 0.0476666666666;
        const actualBeveragePrice = cartSubtotal - discountBeveragePrice;
        expect(actualBeveragePrice).toBeCloseTo(subTotalPrice);
      }
    }
    catch (error) {
      console.error('Error during final assertion:', error);
      throw error;
    }
  }
}
