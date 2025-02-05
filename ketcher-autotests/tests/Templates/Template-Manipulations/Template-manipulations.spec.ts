/* eslint-disable prettier/prettier */
import { test } from '@playwright/test';
import {
  takeEditorScreenshot,
  selectAtomInToolbar,
  AtomButton,
  clickInTheMiddleOfTheScreen,
  selectRing,
  RingButton,
  selectTopPanelButton,
  TopPanelButton,
  dragMouseTo,
  pressButton,
  drawBenzeneRing,
  clickOnAtom,
  moveOnAtom,
  waitForPageInit,
  resetCurrentTool,
  openFileAndAddToCanvas,
  drawCyclopentadieneRing,
  drawCyclohexaneRing,
  selectLeftPanelButton,
  LeftPanelButton,
  addCyclopentadieneRingWithTwoAtoms,
  TemplateLibrary,
  openEditDialogForTemplate,
  clickOnBond,
  BondType,
  takePageScreenshot,
  selectAction,
  moveOnBond,
  moveMouseToTheMiddleOfTheScreen,
  getRightAtomByAttributes,
  clickOnTheCanvas,
  STRUCTURE_LIBRARY_BUTTON_NAME,
  selectUserTemplate,
  FunctionalGroups,
  selectFunctionalGroups,
  selectAtom,
  pasteFromClipboard,
  waitForLoad,
  openDropdown,
  selectDropdownTool,
  getCoordinatesOfTheMiddleOfTheScreen,
  cutToClipboardByKeyboard,
  pasteFromClipboardByKeyboard,
  copyToClipboardByKeyboard,
  selectRingButton,
  selectAllStructuresOnCanvas,
  clickOnCanvas,
  selectUndoByKeyboard,
  selectZoomOutTool,
  waitForElementInCanvas,
} from '@utils';

import { getRotationHandleCoordinates } from '@utils/clicks/selectButtonByTitle';
import {
  FileType,
  verifyFileExport,
} from '@utils/files/receiveFileComparisonData';
import {
  pressRedoButton,
  pressUndoButton,
} from '@utils/macromolecules/topToolBar';

test.describe('Template Manupulations', () => {
  test.beforeEach(async ({ page }) => {
    await waitForPageInit(page);
  });

  test('Template palette', async ({ page }) => {
    /*
    Test case: 1666
    Description: Look at the bottom of the application.
    Choose any template.
    */
    await openEditDialogForTemplate(page, TemplateLibrary.Naphtalene);
    await takeEditorScreenshot(page);
  });
});

test.describe('Template Manupulations', () => {
  test.beforeEach(async ({ page }) => {
    await waitForPageInit(page);
  });

  test('1-2) Fuse atom-to-atom', async ({ page }) => {
    /*
    Test case: EPMLSOPKET-1674
    Description: Create a structure from the template. 
    Choose any element from the left panel or Periodic Table and click on any atom of the created structure.
    */
    const anyAtom = 0;
    await drawBenzeneRing(page);
    await selectAtomInToolbar(AtomButton.Oxygen, page);
    await clickOnAtom(page, 'C', anyAtom);
    await takeEditorScreenshot(page);
  });

  test('3) Fuse atom-to-atom: drag atom slightly', async ({ page }) => {
    /*
    Test case: EPMLSOPKET-1674
    Description: Create a structure from the template. 
    Put the cursor on any other structure atom, click, and drag slightly.
    */
    const anyAtom = 0;
    const x = 200;
    const y = 200;
    await drawBenzeneRing(page);
    await moveOnAtom(page, 'C', anyAtom);
    await dragMouseTo(x, y, page);
    await resetCurrentTool(page);
    await takeEditorScreenshot(page);
  });

  test('5) Fuse atom-to-atom: click and drag atom to fuse atom-to-atom', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-1674
    Description: Put the cursor on any other structure atom, press, and drag. 
    Release the cursor when the distance from the cursor to the selected atom is more than the bond length. 
    */
    const anyAtom = 0;
    await drawBenzeneRing(page);
    await clickOnAtom(page, 'C', anyAtom);
    await resetCurrentTool(page);
    await takeEditorScreenshot(page);
  });

  test('Fuse atom-to-atom: click and drag atom to extend bonds', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-1674
    Description: Create a structure from the template. 
    */
    const anyAtom = 0;
    const x = 300;
    const y = 300;
    await drawBenzeneRing(page);
    await moveOnAtom(page, 'C', anyAtom);
    await dragMouseTo(x, y, page);
    await resetCurrentTool(page);
    await takeEditorScreenshot(page);
  });

  test('Fuse bond-to-bond', async ({ page }) => {
    /*
    Test case: 1676
    Description:
    Choose any template and click any bond of the created structure.
    With the template select any bond of the created structure, hold and drag "left-right".
    */
    const shift = 10;
    await selectLeftPanelButton(LeftPanelButton.SingleBond, page);
    await clickInTheMiddleOfTheScreen(page);
    await takeEditorScreenshot(page);
    await selectAllStructuresOnCanvas(page);
    const { x: rotationHandleX, y: rotationHandleY } =
      await getRotationHandleCoordinates(page);
    await dragMouseTo(rotationHandleX, rotationHandleY, page);
    await dragMouseTo(rotationHandleX, rotationHandleY - shift, page);
    await takeEditorScreenshot(page);
  });

  test('Place template on the Canvas', async ({ page }) => {
    /*
    Test case: 1678
    Description: Choose any template and click on the canvas.
    */
    await selectRing(RingButton.Cyclopentadiene, page);
    await clickInTheMiddleOfTheScreen(page);
    await resetCurrentTool(page);
    await takeEditorScreenshot(page);
  });

  test(
    'Templates - Manipulations with Selection Tool',
    {
      tag: ['@FlakyTest'],
    },
    async ({ page }) => {
      /*
    Test case: 1733
    Description:
    With Select Tool (Lasso or Rectangle) select any atom/bond/part of structure/whole structure, press and drag on the canvas.
    With Fragment select tool select whole template structure and move it.
    Select any part of the structure (or whole structure) and click the 'Delete' keyboard button.
    with Ctrl+A hot key select all ojects on canvas and click the 'Delete' keyboard button.
    */
      await selectAtomInToolbar(AtomButton.Fluorine, page);
      await clickInTheMiddleOfTheScreen(page);
      await selectLeftPanelButton(LeftPanelButton.RectangleSelection, page);
      await selectDropdownTool(page, 'select-rectangle', 'select-fragment');
      await page.getByTestId('canvas').getByText('F').first().click();
      await takeEditorScreenshot(page);
      await selectAllStructuresOnCanvas(page);
      await selectAllStructuresOnCanvas(page);
      await cutToClipboardByKeyboard(page);
      await selectUndoByKeyboard(page);
      await takeEditorScreenshot(page);
    },
  );

  test('Templates - Manipulations with Bond Tool', async ({ page }) => {
    /*
    Test case: 1734
    Description:
    With Bond Tool change the template bonds and add new ones.
    With Chain Tool click any template atom and sprout the chain from the selected atom.
    Load the smile-string CCCCC ("Open..." -> "Paste from clipboard").
    With the benzene template click the third atom of the created chain.
    */
    const x = 300;
    const y = 300;
    const anyAtom = 0;

    await selectLeftPanelButton(LeftPanelButton.SingleBond, page);
    await clickInTheMiddleOfTheScreen(page);
    await moveOnAtom(page, 'C', anyAtom);
    await dragMouseTo(x, y, page);
    await selectLeftPanelButton(LeftPanelButton.Chain, page);
    await selectAtomInToolbar(AtomButton.Iodine, page);
    await clickOnAtom(page, 'C', anyAtom);

    await selectTopPanelButton(TopPanelButton.Open, page);
    await page.getByText('Paste from clipboard').click();
    await pasteFromClipboard(page, 'CCCCC/CC/C:CC.C(C)CCCCCCCCCC');
    await waitForLoad(page, async () => {
      await pressButton(page, 'Add to Canvas');
    });
    await clickInTheMiddleOfTheScreen(page);
    await selectRing(RingButton.Benzene, page);
    await moveOnAtom(page, 'C', anyAtom);
    await dragMouseTo(x, y, page);
    await takeEditorScreenshot(page);
  });

  test('Templates - Manipulations with Erase Tool', async ({ page }) => {
    /*
    Test case: 1735
    Description:
    With the 'Erase' tool press, hold and drag around (or click) any atom/bond/part of structure/whole structure.
    Select the 'Fragment Selection' tool, click the structure, and then select 'Erase' tool and click the template structure.
    */
    await selectAtom(AtomButton.Sulfur, page);
    await clickInTheMiddleOfTheScreen(page);
    await takeEditorScreenshot(page);
    await page.getByTestId('erase').click();
    await page.getByTestId('canvas').getByText('S').first().click();
    await page.getByTestId('select-rectangle').click();
    await selectAtom(AtomButton.Sulfur, page);
    await clickInTheMiddleOfTheScreen(page);
    await page.getByTestId('erase').click();
    await page.getByTestId('canvas').getByText('S').first().click();
    await selectAction(TopPanelButton.Clear, page);
    await pressButton(page, STRUCTURE_LIBRARY_BUTTON_NAME);
    await page.getByRole('tab', { name: 'Template Library' }).click();
    await takeEditorScreenshot(page);
  });

  test('Templates - Atom symbol editing', async ({ page }) => {
    /*
    Test case: 1736
    Description:
    With Selection Tool (Rectangle) click any atom of the template structure and type any correct atom symbol.
    */
    await selectAtom(AtomButton.Sulfur, page);
    await clickInTheMiddleOfTheScreen(page);
    await selectDropdownTool(page, 'rgroup-label', 'rgroup-attpoints');
    await page.getByText('S').first().click();
    await page.getByLabel('Primary attachment point').check();
    await takeEditorScreenshot(page);
    await page.getByTestId('OK').click();
    await page.getByTestId('select-rectangle').click();
    await page.getByText('S').first().click({
      button: 'right',
    });
    await takeEditorScreenshot(page);
    await page.getByText('Edit...').click();
    await page.getByLabel('Label').click();
    await page.getByLabel('Label').fill('Br');
    await page.getByTestId('OK').click();
    await takeEditorScreenshot(page);
  });

  test('Undo/Redo action', async ({ page }) => {
    /*
    Test case: 1737
    Description: Edit the structures in any way.
    Click Undo multiple times.
    Click Redo multiple times.
    */
    const anyAtom = 0;
    const anyAnotherAtom = 4;
    await drawBenzeneRing(page);
    await selectAtomInToolbar(AtomButton.Fluorine, page);
    await clickOnAtom(page, 'C', anyAtom);
    await clickOnAtom(page, 'C', anyAnotherAtom);
    const numberOfPressingUndo = 2;
    for (let i = 0; i < numberOfPressingUndo; i++) {
      await pressUndoButton(page);
    }
    await takeEditorScreenshot(page);
    const numberOfPressingRedo = 2;
    for (let i = 0; i < numberOfPressingRedo; i++) {
      await pressRedoButton(page);
    }
    await takeEditorScreenshot(page);
  });

  test('Rotate/Flip the template structure', async ({ page }) => {
    /*
    Test case: 1745
    Description: Choose the 'Rotate Tool', select the structure and rotate it.
    Select the structure and flip it horizontally with the 'Horizontal Flip' tool.
    Select the structure and flip it vertically with the 'Vertical Flip' tool.
    */
    const anyAtom = 0;
    await drawBenzeneRing(page);
    await selectAtomInToolbar(AtomButton.Fluorine, page);
    await clickOnAtom(page, 'C', anyAtom);
    await selectAllStructuresOnCanvas(page);
    await pressButton(page, 'Vertical Flip (Alt+V)');
    await takeEditorScreenshot(page);
    await pressButton(page, 'Horizontal Flip (Alt+H)');
    await takeEditorScreenshot(page);
  });

  test('Templates - Zoom action for the template structure', async ({
    page,
  }) => {
    /*
    Test case: 1746
    Description:
    Open the percentage dropdown in the top right corner.
    Click the Zoom In button several times.
    Click the Zoom Out button several times.
    Create the reaction.
    Click the Zoom In button several times.
    Click the Zoom Out button several times.
    */
    await selectZoomOutTool(page);
    await clickInTheMiddleOfTheScreen(page);
    await drawBenzeneRing(page);
    await page.getByTestId('reaction-plus').click();
    await clickOnTheCanvas(page, 1, 1);
    await selectRing(RingButton.Cyclooctane, page);
    // eslint-disable-next-line no-magic-numbers
    await clickOnTheCanvas(page, 1, -4);
    await takePageScreenshot(page);
    await openDropdown(page, 'reaction-arrow-open-angle');
    await clickOnTheCanvas(page, 1, 0);
    await takePageScreenshot(page);
    await page.getByTestId('zoom-input').click();
    await takeEditorScreenshot(page);
  });

  test('Save as *.mol file', async ({ page }) => {
    /*
    Test case: 1747
    Description: Click the 'Save As' button, and click the 'Save' button.
    Open the saved *.mol file and edit it in any way.
    */
    await openFileAndAddToCanvas('Molfiles-V2000/three-templates.mol', page);
    await verifyFileExport(
      page,
      'Molfiles-V2000/three-templates-expected.mol',
      FileType.MOL,
      'v2000',
    );
    await takeEditorScreenshot(page);
  });

  test('Save as *.rxn file', async ({ page }) => {
    /*
    Test case: 1748
    Description: Click the 'Save As' button and click the 'Save' button.
    Open the saved *.rxn file and edit it in any way.
    */
    await openFileAndAddToCanvas('Rxn-V2000/templates-reaction.rxn', page);
    await verifyFileExport(
      page,
      'Rxn-V2000/templates-reaction-expected.rxn',
      FileType.RXN,
      'v2000',
    );
    await takeEditorScreenshot(page);
  });

  test('If connect to a single bond with two atoms then replace double bond by single bond for the fusion', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-15504
    Add cyclopentadiene ring on canvas
    Add another cyclopentadiene ring to a single bond with two atoms, where each atom is connected to any atom with a double bond
    */
    await drawCyclopentadieneRing(page);
    await addCyclopentadieneRingWithTwoAtoms(page);
    await selectRing(RingButton.Cyclopentadiene, page);
    await takeEditorScreenshot(page);
  });

  test('Double cyclopentadiene ring - If connect to a double bond with two atom then cyclopentadiene rotate rand use double bond for the fusion', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-15505
    Add Benzene ring on canvas
    Add cyclopentadiene ring to to a double bond with two atom, where each atom is connected to any atom with a single bond
    */
    await drawBenzeneRing(page);
    await addCyclopentadieneRingWithTwoAtoms(page);
    await selectRing(RingButton.Cyclopentadiene, page);
    await takeEditorScreenshot(page);
  });

  test('Double cyclopentadiene ring-if connect to a single bond with two atoms-but one atom is connected with a single bond and another with a double bond', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-15506
    Add Cyclohexane ring on canvas and add double bond on it and atom
    Add cyclopentadiene ring to a single bond with two atoms, but one atom is connected with a single bond and another with a double bond
    */
    await drawCyclohexaneRing(page);
    await selectAtomInToolbar(AtomButton.Nitrogen, page);
    await clickOnAtom(page, 'C', 0);
    const anyAtom = 4;
    await clickOnAtom(page, 'C', anyAtom);
    await selectRing(RingButton.Cyclopentadiene, page);
    await takeEditorScreenshot(page);
  });

  test('Double cyclopentadiene ring - if all bonds are single', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-15507
    Add Cyclohexane ring on canvas and add on it an atom
    Add cyclopentadiene ring to a single bond
    */
    await drawCyclohexaneRing(page);
    await selectAtomInToolbar(AtomButton.Nitrogen, page);
    await clickOnAtom(page, 'C', 0);
    await selectRing(RingButton.Cyclopentadiene, page);
    await takeEditorScreenshot(page);
  });

  test('Adding the template to the existing structure', async ({ page }) => {
    /*
    Test case: EPMLSOPKET-4735
    Click on the Cyclopentadiene atom in the existing structure to add the same template.
    To add the structure connected with a single bond click & drag.
    */
    await drawCyclopentadieneRing(page);
    await clickOnBond(page, BondType.SINGLE, 0);
    await clickOnBond(page, BondType.SINGLE, 1);
    // eslint-disable-next-line no-magic-numbers
    await clickOnBond(page, BondType.SINGLE, 2);
    await clickOnBond(page, BondType.SINGLE, 1);
    await clickOnBond(page, BondType.SINGLE, 0);
    const coordinates = await getRotationHandleCoordinates(page);
    const { x: rotationHandleX, y: rotationHandleY } = coordinates;
    await page.mouse.move(rotationHandleX, rotationHandleY);
    await takeEditorScreenshot(page);
  });

  test('Inappropriate structure is not generated when drawing fused aromatic rings', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-4738
    Description:
    Draw benzene using the template
    Again using the benzene template, left click on the single bond circled in blue.
    */
    await drawCyclopentadieneRing(page);
    await clickOnBond(page, BondType.SINGLE, 0);
    await takeEditorScreenshot(page);
  });

  test('Templates - Edit abbreviation window appear when user trying to add structure to a functional group or salt', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-12985
    Description:
    Add any FG or Salt to the canvas
    Expand abbreviation
    Select any structure from template toolbar or from template library
    Attach selected structure to the FG
    */
    const X_DELTA_ONE = 100;
    await selectFunctionalGroups(FunctionalGroups.CONH2, page);
    await clickInTheMiddleOfTheScreen(page);
    await clickInTheMiddleOfTheScreen(page, 'right');
    await page.getByText('Expand Abbreviation').click();
    const { x, y } = await getCoordinatesOfTheMiddleOfTheScreen(page);
    const nitrogenCoordinates = { x: x + X_DELTA_ONE, y };
    await selectRing(RingButton.Benzene, page);
    await clickOnCanvas(page, nitrogenCoordinates.x, nitrogenCoordinates.y);
    await takeEditorScreenshot(page);
  });
});

test.describe('Open Ketcher', () => {
  test.beforeEach(async ({ page }) => {
    await waitForPageInit(page);
  });

  test('The different templates are attached to the atoms of existing benzene-1', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-1669/1
    Description:
    Move with mouse over the template button with benzene structure.
    Select and paste benzene from templates on the canvas.
    Attach different templates to atoms of existing benzene
     -click with template any atom of the created benzene; 
    Clear All.
    */
    await page.getByTestId('template-0').hover();
    await drawBenzeneRing(page);
    await openFileAndAddToCanvas(
      'Molfiles-V2000/s-group-with-attachment-points.mol',
      page,
    );
    await moveOnAtom(page, 'C', 1);
    await moveOnAtom(page, 'C', 0);
    await takePageScreenshot(page);
    await selectAction(TopPanelButton.Clear, page);
  });

  test('The different templates are attached to the atoms of existing benzene-2', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-1669/2
    Description:
    Paste benzene from templates on the canvas.
     -click with template the bond of the created benzene; 
    Clear All.
    */
    await drawBenzeneRing(page);
    await openFileAndAddToCanvas(
      'Molfiles-V2000/s-group-with-attachment-points.mol',
      page,
    );
    await moveOnBond(page, BondType.DOUBLE, 1);
    await moveOnBond(page, BondType.DOUBLE, 0);
    await waitForElementInCanvas(page, 'A=Test');

    await takePageScreenshot(page);
    await selectAction(TopPanelButton.Clear, page);
  });

  test('The different templates are attached to the atoms of existing benzene-3', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-1669/3
    Description:
    Paste benzene from templates on the canvas.
    Edit benzene with all possible ways.
    */
    const anyAtom = 2;
    await drawBenzeneRing(page);
    await moveOnAtom(page, 'C', anyAtom);
    await takePageScreenshot(page);
  });

  test('Templates - The full preview of the Template from the Templates toolbar, following mouse cursor', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-18050
    Description:
    Verify if the full preview of the Template is displayed under the mouse cursor
    */
    const xOffsetFromCenter = 40;
    await page.getByTestId('template-0').hover();
    await page.getByTestId('template-0').click();
    await moveMouseToTheMiddleOfTheScreen(page);
    await clickOnTheCanvas(page, xOffsetFromCenter, 0);
    await takePageScreenshot(page);
    await page.getByTestId('template-1').click();
    const point = await getRightAtomByAttributes(page, { label: 'C' });
    await page.mouse.move(point.x, point.y);
    await takePageScreenshot(page);
  });

  test('Templates - The full preview of the Template from the Template library, following mouse cursor', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-18051
    Description:
    Verify if the full preview of the Template is displayed under the mouse cursor
    Click on any empty place on the canvas
    Verify if the full preview of the Template is displayed under the mouse cursor
    */
    const xOffsetFromCenter = 40;
    await page.getByTestId('template-lib').hover();
    await pressButton(page, STRUCTURE_LIBRARY_BUTTON_NAME);
    await page.getByRole('tab', { name: 'Template Library' }).click();
    await page.getByRole('button', { name: 'Aromatics' }).click();
    await selectUserTemplate(TemplateLibrary.Azulene, page);
    await moveMouseToTheMiddleOfTheScreen(page);
    await clickOnTheCanvas(page, xOffsetFromCenter, 0);
    await takePageScreenshot(page);
    const point = await getRightAtomByAttributes(page, { label: 'C' });
    await page.mouse.move(point.x, point.y);
    await takePageScreenshot(page);
  });

  test(
    'Templates - The preview of how the Template from the Templates toolbar will be merged, using Paste tool',
    {
      tag: ['@FlakyTest'],
    },
    async ({ page }) => {
      /*
    Test case: EPMLSOPKET-18052
    Description:
    Verify if merging these Templates after clicking matches the full preview of merging these Templates"
    */
      const xOffsetFromCenter = 40;
      await selectRingButton(RingButton.Benzene, page);
      await clickOnTheCanvas(page, xOffsetFromCenter, 0);
      await selectLeftPanelButton(LeftPanelButton.RectangleSelection, page);
      await takePageScreenshot(page);

      await selectAllStructuresOnCanvas(page);
      await cutToClipboardByKeyboard(page);
      await pasteFromClipboardByKeyboard(page);
      await clickOnTheCanvas(page, xOffsetFromCenter, 0);
      await selectRingButton(RingButton.Benzene, page);
      await clickInTheMiddleOfTheScreen(page);
      await selectRingButton(RingButton.Benzene, page);
      await takePageScreenshot(page);
    },
  );

  test('Templates - The preview of how the Template from the Template library will be merged, using Paste tool', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-18053
    Description:
    Verify if the full preview of merging the pasted Template with another Template is displayed under the mouse cursor, and click
    */
    const xOffsetFromCenter = 40;
    await page.getByTestId('template-lib').hover();
    await pressButton(page, STRUCTURE_LIBRARY_BUTTON_NAME);
    await page.getByRole('tab', { name: 'Template Library' }).click();
    await page.getByRole('button', { name: 'Aromatics' }).click();
    await selectUserTemplate(TemplateLibrary.Naphtalene, page);
    await moveMouseToTheMiddleOfTheScreen(page);
    await clickOnTheCanvas(page, xOffsetFromCenter, 0);
    await takePageScreenshot(page);
    await page.getByTestId('select-rectangle').click();
    await takePageScreenshot(page);
    await page.getByTestId('select-rectangle').click();
    await selectAllStructuresOnCanvas(page);
    await copyToClipboardByKeyboard(page);
    await pasteFromClipboardByKeyboard(page);
    await moveMouseToTheMiddleOfTheScreen(page);
    await clickInTheMiddleOfTheScreen(page);
  });

  test('Templates - Merging the Template from the Templates toolbar and the Template from the Template library', async ({
    page,
  }) => {
    /*
    Test case: EPMLSOPKET-18054
    Description:
    Verify if merging these Templates after clicking matches the full preview of merging these Templates"
    */
    await page.getByTestId('template-0').hover();
    await page.getByTestId('template-0').click();
    await clickInTheMiddleOfTheScreen(page);
    await takePageScreenshot(page);
    await pressButton(page, STRUCTURE_LIBRARY_BUTTON_NAME);
    await page.getByRole('tab', { name: 'Template Library' }).click();
    await page.getByRole('button', { name: 'Aromatics' }).click();
    await selectUserTemplate(TemplateLibrary.Azulene, page);
    const anyAtom = 2;
    await moveOnAtom(page, 'C', anyAtom);
    await takePageScreenshot(page);
  });
});
