
import { Page } from '@playwright/test';
import { HomePageLocators } from '../DominosLocators/Locators';
import { TestData } from './testData';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnlineOrderButton(): Promise<void> {
        const orderOnlineLocator = await this.page.waitForSelector(HomePageLocators.ORDER_ONLINE_BUTTON);
        await orderOnlineLocator.click();
        console.log('Clicked online order button');
    }

    async handleBanner(): Promise<void> {
        try {
            const offerBannerFrame = await this.page.waitForSelector(HomePageLocators.OFFER_BANNER);
            const frame = await offerBannerFrame.contentFrame();

            if (frame) {
                const bannerCloseLocator = HomePageLocators.BANNER_CLOSE;
                const bannerClose = await frame.waitForSelector(bannerCloseLocator);
                if (bannerClose) {
                    await bannerClose.click();
                    console.log('Closing Banner');
                } else {
                    console.log('Banner close button not found.');
                }
            } else {
                console.log('Frame not displayed');
            }
        } catch (error) {
            console.log('Banner not displayed');
        }
    }

    async enterAreaLocality(): Promise<void> {
        try {
            await this.page.click(HomePageLocators.PINCODE);
            await this.page.fill(HomePageLocators.PINCODE, '600063');
            await this.page.click(HomePageLocators.PINCODE_SUGGESTIONS)
            console.log('Entered Area / Locality');
        } catch (error) {
            console.error('Error during input:', error);
        }
    }

    async clickDeliveryAddress(): Promise<void> {
        const deliveryAddressLocator = HomePageLocators.DELIVERY_ADDRESS;

        try {
            if (deliveryAddressLocator) {
                const deliveryAddressElement = await this.page.waitForSelector(deliveryAddressLocator);

                if (deliveryAddressElement) {
                    await deliveryAddressElement.click();
                    console.log('Clicked delivery address element');
                } else {
                    console.error('Delivery address element not found.');
                }
            } else {
                console.error('Delivery address locator not defined.');
            }
        } catch (error) {
            console.error('An error occurred while interacting with the delivery address element:', error);
        }
    }

    async clickSuggestions(): Promise<void> {
        const suggestionsLocator = HomePageLocators.PINCODE_SUGGESTIONS;

        try {
            const suggestions = await this.page.waitForSelector(suggestionsLocator);

            if (suggestions) {
                await suggestions.click();
                console.log('Clicked suggestions element');
            } else {
                console.error('Suggestions element not found.');
            }
        } catch (error) {
            console.error('An error occurred while clicking suggestions:', error);
        }
    }

    async clickDontAllowButton(): Promise<void> {
        const dontAllowButtonLocator = HomePageLocators.DONT_ALLOW;
        try {
            const dontAllowButton = await this.page.waitForSelector(dontAllowButtonLocator, { timeout: 5000 });
            if (dontAllowButton) {
                await dontAllowButton.click();
                console.log("Clicked 'Don't Allow' button");
            } else {
                console.log("Popup 'Don't Allow' button not found or already dismissed.");
            }
        } catch (error) {
            console.error('An error occurred while clicking "Don\'t Allow" button:', error);
        }
    }
}
