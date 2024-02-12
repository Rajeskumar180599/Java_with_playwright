import { Page } from '@playwright/test';
import { CartPageLocators } from '../DominosLocators/Locators';

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout(cartSubtotal: number, beveragePriceTotal: number): Promise<void> {
    const page = this.page;

    await page.click(CartPageLocators.CHECK_OUT);
    console.log('Validating subtotal');

    const subtotalElement = await page.$(CartPageLocators.CART_SUBTOTAL);
    const subTotalText = await subtotalElement?.textContent();
    if (subTotalText) {
      const subTotalPrice = parseFloat(subTotalText.replace('Sub Total: ₹', '').trim());
      const discountBeveragePrice = beveragePriceTotal * 0.0477;
      const actualBeveragePrice = cartSubtotal - discountBeveragePrice;

      if (Math.abs(actualBeveragePrice - subTotalPrice) > 0.1) {
        throw new Error('Subtotal validation failed');
      }
    } else {
      throw new Error('Subtotal element not found');
    }
  }
}
