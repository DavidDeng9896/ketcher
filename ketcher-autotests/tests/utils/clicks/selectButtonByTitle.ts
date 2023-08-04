import { Page } from '@playwright/test';
import { ToolbarButton } from '@utils/selectors/buttons';
import { getLeftToolBarWidth, getTopToolBarHeight } from '..';

export async function selectButtonByTitle(title: ToolbarButton, page: Page) {
  await page.locator(`button[title*="${title}"]`).click();
}

export async function getRotationHandleCoordinates(page: Page) {
  const leftBarWidth = await getLeftToolBarWidth(page);
  const topBarHeight = await getTopToolBarHeight(page);
  const handleCenter = await page.evaluate(
    () => window.ketcher.editor.rotateController.handleCenter,
  );
  return {
    x: handleCenter.x + leftBarWidth,
    y: handleCenter.y + topBarHeight,
  };
}
