export const HomePageLocators = {
  ORDER_ONLINE_BUTTON: "//button[text()='ORDER ONLINE NOW']",
  DONT_ALLOW: "button[onclick='moeRemoveBanner()']",
  IFRAME: "//iframe[contains(@id,\"moe-onsite-campaign\")]",
  DELIVERY_ADDRESS: "//input[@class='srch-cnt-srch-inpt']",
  PINCODE: "//input[@placeholder='Enter Area / Locality']",
  BANNER_CLOSE: "//*[@id=\"close-icon\"]",
  OFFER_BANNER: "//iframe[contains(@id,'moe-onsite-campaign')]",
  PINCODE_SUGGESTIONS : "//ul//li//span[@class='lst-desc-main ellipsis']",
  };
  export const MenuPageLocators = {
  NEW_LAUNCHES_TEXT: "//div[contains(text(),'NEW LAUNCHES')]",
  VEG_PIZZA: "//div[@data-label='Veg Pizza']//child::span[text()='VEG PIZZA']",
  VEG_PIZZA_TEXT:"//span[contains(text(),'VEG PIZZA')][1]",
  ALLOW :"//button[contains(text(),'Allow')][2]",
  //ADD_PRODUCT : "(//div[contains(@data-label,'Peppy Paneer')]//button)[2]/span",
  VEG_MENU_ADD_PRODUCT: "//div[@data-label='Veg Pizza']//descendant::div[@data-label='{}']//descendant::button[@data-label='addTocart']",
  NO_THANKS: "//span[text()='NO THANKS']",
  // PRICES: "//span[.='{}']//ancestor::div[@class='crt-cnt']//following-sibling::div[@class='crt-cnt-qty-prc']//descendant::span[@class='rupee']",
  VEG_PRODUCT_PRICES: "//div[@data-label='Veg Pizza']//descendant::div[@data-label='{}']//span[@class='rupee']",
  PROD_INCREASE: "(//span[.='{}']//ancestor::div[@class='crt-cnt']//following-sibling::div[@class='crt-cnt-qty-prc']//child::div//descendant::div)[4]",
  QUANTITY: "//span[.='{}']//ancestor::div[@class='crt-cnt']//following-sibling::div[@class='crt-cnt-qty-prc']//child::div//descendant::div[1]//span",
  SUBTOTAL: "//span[@data-label='total-minicart']",
  BEVERAGES_PRODUCT_PRICES: "//div[@data-label='Beverages']//descendant::div[@data-label='{}']//span[@class='rupee']",
  MENU_BEVERAGES: "//span[.='BEVERAGES']",
  BEVERAGE_MENU_ADD_PRODUCT: "//div[@data-label='Beverages']//descendant::div[@data-label='{}']//descendant::button[@data-label='addTocart']",
  // BEVERAGE_PRODUCTS: "(//div[@data-label='Beverages'])[2]//div[@data-label='{}']//button/span",
  PROD_DECREASE: "(//span[.='{}']//ancestor::div[@class='crt-cnt']//following-sibling::div[@class='crt-cnt-qty-prc']//child::div//descendant::div)[2]"
  };
  export const CartPageLocators = {
  CHECK_OUT: "//button[@data-label=\"miniCartCheckout\"]",
  CART_SUBTOTAL: "//span[.='Sub Total']/../span/span"
  };
  