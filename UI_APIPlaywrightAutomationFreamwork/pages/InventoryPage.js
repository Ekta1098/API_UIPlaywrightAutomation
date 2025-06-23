class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    getAllItems() {
        return this.page.locator('.inventory_item');
    }

    itemName(item) {
        return item.locator('.inventory_item_name');
    }

    itemImage(item) {
        return item.locator('img.inventory_item_img');
    }


    itemPrice(item) {
        return item.locator('.inventory_item_price');
    }

    addToCartButton(item) {
        return item.locator('button');
    }

    cartIcon() {
        return this.page.locator('.shopping_cart_link');
    }

    logout() {
        return this.page.locator('#logout_sidebar_link');
    }

    async openMenuAndLogout() {
        await this.page.locator('#react-burger-menu-btn').click();
        await this.page.locator('#logout_sidebar_link').click();
    }
}
module.exports = InventoryPage;
