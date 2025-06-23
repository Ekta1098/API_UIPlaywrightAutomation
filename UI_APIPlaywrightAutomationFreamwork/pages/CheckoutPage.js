class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async startCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async fillUserInfo(firstName, lastName, zip) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(zip);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  getSummarySection() {
    return this.page.locator('.summary_info');
  }

  getThankYouHeader() {
    return this.page.locator('.complete-header');
  }

  getThankYouMsg() {
    return this.page.locator('.complete-text');
  }
}
module.exports = CheckoutPage;
