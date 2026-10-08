import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    await page.click('._UCHI_COOKIE__button');

    // Ждём загрузку виджета
    await page.waitForTimeout(3000);
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();

    await widgetPage.openAllArticles();

    await widgetPage.openTechnicalRecommendations();

    const articles = await widgetPage.getArticles();
    await articles[0].click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });
  
  test('returns to knowledge base from article', async () => {
  await widgetPage.openWidget();

  await widgetPage.openAllArticles();

  await widgetPage.openTechnicalRecommendations();

  const articles = await widgetPage.getArticles();
  await articles[0].click();

  await widgetPage.goBack();

  await expect(widgetPage.getTitle()).toHaveText('База знаний Учи.ру');
  });
});
