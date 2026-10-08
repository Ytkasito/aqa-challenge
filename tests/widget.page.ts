import { Page } from '@playwright/test';

enum WidgetPageSelectors {
  WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
  HEADER_TEXT = 'header h5',

  BUTTON_OPEN = '[data-test="openWidget"]',
  BUTTON_ALL_ARTICLES = '[data-test="button_all_articles"]',
  BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]',

  ARTICLE = '[data-testid="article-list-item"]',
}

export class WidgetPage {
  constructor(protected page: Page) {}

  async openWidget() {
    await this.page
      .locator(WidgetPageSelectors.BUTTON_OPEN)
      .click();
  }

  getWidgetBody() {
    return this.page.locator(WidgetPageSelectors.WIDGET_BODY);
  }

  async openAllArticles() {
    await this.getWidgetBody()
      .locator(WidgetPageSelectors.BUTTON_ALL_ARTICLES)
      .click();

    await this.page.waitForTimeout(5000);
  }

  async openTechnicalRecommendations() {
    await this.getWidgetBody()
      .getByText('Технические рекомендации', { exact: true })
      .click();
  }

  async getArticles() {
    return this.getWidgetBody()
      .locator(WidgetPageSelectors.ARTICLE)
      .all();
  }

  async clickWriteToUs() {
    await this.getWidgetBody()
      .locator(WidgetPageSelectors.BUTTON_WRITE_TO_US)
      .click();
  }

  async goBack() {
    await this.getWidgetBody()
      .locator('[data-test="button_back"]')
      .click();
  }

  getTitle() {
    return this.getWidgetBody()
      .locator(WidgetPageSelectors.HEADER_TEXT);
  }
}

