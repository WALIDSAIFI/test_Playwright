import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/v1/';
const PASSWORD = 'secret_sauce';


test('Login avec un utilisateur standard', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  await expect(page.locator('.product_label')).toHaveText('Products');
});

test('Login échoué avec locked_out_user', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.fill('#user-name', 'locked_out_user');
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');


  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out.');
});


test('Login avec problem_user', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');


  await expect(page.locator('.product_label')).toHaveText('Products');

 
  const firstImageSrc = await page.locator('.inventory_item_img img').first().getAttribute('src');
  console.log('Image source:', firstImageSrc);
});


test('Login avec performance_glitch_user', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.fill('#user-name', 'performance_glitch_user');
  await page.fill('#password', PASSWORD);
  await page.click('#login-button');

  await expect(page.locator('.product_label')).toHaveText('Products', { timeout: 15000 });
});

