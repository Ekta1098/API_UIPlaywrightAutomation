const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const users = require('../../fixtures/users');

test.describe(' SauceDemo E2E Test Scenarios', () => {

  test(' Scenario 1 : Invalid Login → Show error message', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.invalidUser.username, users.invalidUser.password);
    await expect(login.errorMsg).toBeVisible();
    await expect(login.errorMsg).toContainText('Username and password do not match');
  });

  test('Scenario 2 :  Valid Login → Show dashboard, records visible -> logout', async ({ page }) => {
    const login = new LoginPage(page);
    const inv = new InventoryPage(page);

    await login.goto();
    await login.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/.*inventory.html/);

    const count = await inv.getAllItems().count();
    expect(count).toBeGreaterThan(0);

    await inv.openMenuAndLogout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test.describe(' Logged-In Scenarios (3-5)', () => {
    let login, inv, checkout;

    test.beforeEach(async ({ page }) => {
      login = new LoginPage(page);
      inv = new InventoryPage(page);
      checkout = new CheckoutPage(page);

      await login.goto();
      await login.login(users.validUser.username, users.validUser.password);
      await expect(page).toHaveURL(/.*inventory.html/);
    });


    test(' Product validation +  Single item checkout +  Multiple item checkout ', async ({ page }) => {
      const login = new LoginPage(page);
      const inv = new InventoryPage(page);
      const checkout = new CheckoutPage(page);

      await test.step('Login once for all upcoming steps', async () => {
        await login.goto();
        await login.login(users.validUser.username, users.validUser.password);
        await expect(page).toHaveURL(/.*inventory.html/);
      });

      await test.step(' Scenario 3: Validate images  -> price ->  add-to-cart button for all items', async () => {
        const items = inv.getAllItems();
        const count = await items.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
          const item = items.nth(i);
          await expect(inv.itemName(item)).toBeVisible();
          await expect(inv.itemImage(item)).toBeVisible();
          await expect(inv.itemPrice(item)).toBeVisible();
          await expect(inv.addToCartButton(item)).toBeVisible();
        }
      });

      await test.step(' Scenario 4: Add 1 item → checkout → validate pricing → complete order', async () => {
        const items = inv.getAllItems();
        const count = await items.count();
        const randomIndex = Math.floor(Math.random() * count);
        const item = items.nth(randomIndex);

        const itemPriceText = await inv.itemPrice(item).textContent();
        const itemPrice = parseFloat(itemPriceText.replace('$', ''));
        console.log(itemPrice);

        await inv.addToCartButton(item).click();
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillUserInfo('John', 'Doe', '12345');

        const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
        const taxText = await page.locator('.summary_tax_label').textContent();
        const totalText = await page.locator('.summary_total_label').textContent();

        const tax = parseFloat(taxText.replace(/[^\d.]/g, ''));
        console.log(tax);
        const total = parseFloat(totalText.replace(/[^\d.]/g, ''));
        console.log(total);

        expect(itemTotalText).toContain(`$${itemPrice.toFixed(2)}`);

        expect(total).toBeCloseTo(itemPrice + tax, 2);


        await checkout.finishCheckout();
        await expect(checkout.getThankYouHeader()).toHaveText('Thank you for your order!');
        await expect(checkout.getThankYouMsg()).toContainText('Your order has been dispatched');
      });

      await test.step('Scenario 5: Add 2-3 items → checkout → validate combined price → complete order', async () => {
          // back to inventory page
          await page.goto('https://www.saucedemo.com/inventory.html');

          const items = inv.getAllItems();
          const count = await items.count();
          const selectedIndexes = [0, 1, 2].slice(0, count);

          let totalItemPrice = 0;
          for (let idx of selectedIndexes) {
            const item = items.nth(idx);
            const priceText = await inv.itemPrice(item).textContent();
            const price = parseFloat(priceText.replace('$', ''));
            console.log("Validating other test");
            console.log(price);
            totalItemPrice += price;
            await inv.addToCartButton(item).click();
          }

          await checkout.goToCart();
          await checkout.startCheckout();
          await checkout.fillUserInfo('Alice', 'Smith', '98765');

          const itemTotalText = await page.locator('.summary_subtotal_label').textContent();
          const taxText = await page.locator('.summary_tax_label').textContent();
          const totalText = await page.locator('.summary_total_label').textContent();

          const tax = parseFloat(taxText.replace(/[^\d.]/g, ''));
          const total = parseFloat(totalText.replace(/[^\d.]/g, ''));

          expect(itemTotalText).toContain(`$${totalItemPrice.toFixed(2)}`);
          expect(total).toBeCloseTo(totalItemPrice + tax, 2);

          await checkout.finishCheckout();
          await expect(checkout.getThankYouHeader()).toHaveText('Thank you for your order!');
          await expect(checkout.getThankYouMsg()).toContainText('Your order has been dispatched');
      });

    });


  });


});
