/* eslint-disable no-magic-numbers */
import { MolfileFormat } from '@app/../packages/ketcher-core/dist';
import { expect, test } from '@playwright/test';
import {
  takeEditorScreenshot,
  openFileAndAddToCanvas,
  waitForPageInit,
  openFileAndAddToCanvasAsNewProject,
  bondsSettings,
  setBondLengthOptionUnit,
  setBondLengthValue,
  pressButton,
  openSettings,
  selectAllStructuresOnCanvas,
  selectLayoutTool,
} from '@utils';
import {
  FileType,
  verifyFileExport,
} from '@utils/files/receiveFileComparisonData';
import { getMolfile } from '@utils/formats';

test('Open and Save files - Open/Save structure with atom properties 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1855(1)
   * Description: Structure with atom properties is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/mol-1855-to-open.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save files - Open/Save structure with atom properties 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1855(2)
   * Description: Structure with atom properties is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/mol-1855-to-open.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/mol-1855-to-open-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save V3000 file with atom and bond properties 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1857(1)
   * Description: Structure with atom and bond properties is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas(
    'Molfiles-V3000/marvin-atom-properties-V3000.mol',
    page,
  );
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save V3000 file with atom and bond properties 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1857(2)
   * Description: Structure with atom and bond properties is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas(
    'Molfiles-V3000/marvin-atom-properties-V3000.mol',
    page,
  );
  await verifyFileExport(
    page,
    'Molfiles-V3000/atom-properties-V3000-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - Open/Save Markush files 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1894(1)
   * Description: Markush structure is displayed as an RGroup structure.
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/markush.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save Markush files 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1894(2)
   * Description: Markush structure is displayed as an RGroup structure.
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/markush.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/markush-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save V2000 *.mol file contains abbreviation 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1858(1)
   * Description: v2000 mol file with abbreviation is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/sec-butyl-abr.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save V2000 *.mol file contains abbreviation 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1858(2)
   * Description: v2000 mol file with abbreviation is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/sec-butyl-abr.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/sec-butyl-abr-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save V3000 *.mol file contains abbreviation 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1859(1)
   * Description: v3000 mol file with abbreviation is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/sec-butyl-abr-V3000.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save V3000 *.mol file contains abbreviation 2/2 - save', async ({
  page,
}) => {
  /*
   * Test case: EPMLSOPKET-1859(2)
   * Description: v3000 mol file with abbreviation is opened and saved correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/sec-butyl-abr-V3000.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V3000/sec_butyl_abr_V3000-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - Open/Save file with R-Groups 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1873(1)
   * Description: Structure with R-Groups is correctly opened from Mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/Rgroup.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save file with R-Groups 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1873(2)
   * Description: Structure with R-Groups is correctly saved to Mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/Rgroup.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/r-group-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save file contains Heteroatoms 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1878(1)
   * Description: Structure with heteroatoms is opened from mol file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas(
    'Molfiles-V2000/heteroatoms-structure.mol',
    page,
  );
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save file contains Heteroatoms 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1878(2)
   * Description: Structure with heteroatoms is saved to mol file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas(
    'Molfiles-V2000/heteroatoms-structure.mol',
    page,
  );
  await verifyFileExport(
    page,
    'Molfiles-V2000/heteroatoms-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save V3000 mol file contains attached data 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1882(1)
   * Description: Structure with attached data is opened from mol file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/attached-data-V3000.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save V3000 mol file contains attached data 2/2 - save', async ({
  page,
}) => {
  /*
   * Test case: EPMLSOPKET-1882(2)
   * Description: Structure with attached data is saved to mol file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/attached-data-V3000.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V3000/attached-data-V3000-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - V3000 *.mol file contains Heteroatoms 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1879(1)
   * Description: Structure with heteroatoms is opened from mol v3000 file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/heteroatoms-V3000.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - V3000 *.mol file contains Heteroatoms 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1879(2)
   * Description: Structure with heteroatoms is saved correctly to mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/heteroatoms-V3000.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V3000/heteroatoms-V3000-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - Open/Save file with Attached data 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1880(1)
   * Description: Structure with heteroatoms is opened from mol v3000 file correctly
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/attached-data.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save file with Attached data 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1880(2)
   * Description: Structure with heteroatoms is saved correctly to mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/attached-data.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/attached-data-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save file contains abs stereochemistry 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1883(1)
   * Description: File with abs stereochemistry is opened correctly from mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/V2000-abs.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save file contains abs stereochemistry 2/2 - save', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1883(2)
   * Description: Structure with abs stereochemistry is saved correctly to mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/V2000-abs.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V2000/V2000-abs-expected.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open and Save file - Open/Save V3000 mol file contains abs stereochemistry 1/2 - open', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1884(1)
   * Description: File with abs stereochemistry is opened correctly from mol v3000 file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/V3000-abs.mol', page);
  // check that structure opened from file is displayed correctly
  await takeEditorScreenshot(page);
});

test('Open and Save file - Open/Save V3000 mol file contains abs stereochemistry 2/2 - save', async ({
  page,
}) => {
  /*
   * Test case: EPMLSOPKET-1884(2)
   * Description: Structure with abs stereochemistry is saved correctly to mol file
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V3000/V3000-abs.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V3000/V3000-abs-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - Save V2000 molfile as V3000 molfile', async ({
  page,
}) => {
  /*
   * Test case: EPMLSOPKET-1985
   * Description: Structure opened from V2000 molfile can be saved to V3000 molfile
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas('Molfiles-V2000/spiro2.mol', page);
  await verifyFileExport(
    page,
    'Molfiles-V3000/spiro-expected.mol',
    FileType.MOL,
    'v3000',
  );
});

test('Open and Save file - Save V3000 molfile as V2000 molfile', async ({
  page,
}) => {
  /**
   * Test case: EPMLSOPKET-1986
   * Description: Structure opened from V3000 molfile can be saved to V2000 molfile
   */
  await waitForPageInit(page);

  await openFileAndAddToCanvas(
    'Molfiles-V3000/two-connected-chains-v3000.mol',
    page,
  );
  await verifyFileExport(
    page,
    'Molfiles-V2000/two-connected-chains.mol',
    FileType.MOL,
    'v2000',
  );
});

test('Open V3000 file with R-Groups with Fragments', async ({ page }) => {
  // Related Github issue https://github.com/epam/ketcher/issues/2774
  await waitForPageInit(page);
  await openFileAndAddToCanvas(
    'Molfiles-V3000/RGroup-With-Fragments.mol',
    page,
  );
  await takeEditorScreenshot(page);
});

test.describe('Open and Save file', () => {
  test.beforeEach(async ({ page }) => {
    await waitForPageInit(page);
  });

  test.describe('Open file', () => {
    /*
     * Test case: EPMLSOPKET-1852, 1856, 1874, 1890, 1895, 1979, 8914, 12966, 4731, 5259, 1875, 1876, 12963
     * Description: The structure is correctly rendered on the canvas
     */
    const files = [
      {
        testName: 'Open/Save structure with bond properties',
        path: 'Molfiles-V2000/all-bond-properties.mol',
      },
      {
        testName: 'Open/Save Alias and Pseudoatoms',
        path: 'Molfiles-V2000/alias-and-pseudoatoms.mol',
      },
      {
        testName: 'Open/Save V3000 mol file contains Rgroup',
        path: 'Molfiles-V3000/rgroup-V3000.mol',
      },
      {
        testName: 'Open/Save V3000 mol file contains Sgroup',
        path: 'Molfiles-V3000/multi-V3000.mol',
      },
      {
        testName: 'Save structure as *.mol V3000',
        path: 'Molfiles-V3000/multi-V3000.mol',
      },
      {
        testName: 'MDL Molfile v2000: Correct padding for M ALS',
        path: 'Molfiles-V2000/molfile-with-als.mol',
      },
      {
        testName: 'Open structure with R-Group from v3000 mol file',
        path: 'Molfiles-V3000/rgroup-V3000.mol',
      },
      {
        testName: 'Don`t creates invalid molfiles with "NaN"',
        path: 'Molfiles-V2000/benzoic-acid-with-na.mol',
      },
      {
        testName: 'Functional group name layout close to attachment point',
        path: 'Molfiles-V2000/display-abbrev-groups-example.mol',
      },
      {
        testName: 'Open/Save file with S-Groups',
        path: 'Molfiles-V2000/sgroup-different.mol',
      },
      {
        testName: 'Open/Save V3000 mol file contains Sgroup - 2',
        path: 'Molfiles-V3000/sgroup-different-V3000.mol',
      },
      {
        testName: 'Open/Save v3000 mol file with assigned Alias',
        path: 'Molfiles-V3000/chain-with-alias.mol',
      },
    ];

    for (const file of files) {
      test(`${file.testName}`, async ({ page }) => {
        await openFileAndAddToCanvas(file.path, page);
        await takeEditorScreenshot(page);
      });
    }
  });

  test.describe('Open file', () => {
    /*
     * Test case: EPMLSOPKET-1852
     * Description: The structure is correctly rendered on the canvas
     */
    test(
      'Open V3000 mol file contains more than 900 symbols',
      {
        tag: ['@SlowTest'],
      },
      async ({ page }) => {
        test.slow();

        await openFileAndAddToCanvasAsNewProject(
          'Molfiles-V3000/more-900-atoms.mol',
          page,
        );
        await takeEditorScreenshot(page);
      },
    );
  });

  test.describe('Save file', () => {
    /*
     * Test case: EPMLSOPKET-1856, 1874, 1890, 1895, 1875, 1876, 12963
     * Description: The saved structure is correctly rendered on the canvas
     */
    const files = [
      {
        testName: 'Open/Save Alias and Pseudoatoms',
        pathToOpen: 'Molfiles-V2000/alias-and-pseudoatoms.mol',
        pathToExpected: 'Molfiles-V2000/alias-and-pseudoatoms-expected.mol',
        format: 'v2000',
      },
      {
        testName: 'Open/Save V3000 mol file contains Rgroup',
        pathToOpen: 'Molfiles-V3000/rgroup-V3000.mol',
        pathToExpected: 'Molfiles-V3000/rgroup-V3000-expected.mol',
        format: 'v3000',
      },
      {
        testName: 'Open/Save V3000 mol file contains Sgroup',
        pathToOpen: 'Molfiles-V3000/multi-V3000.mol',
        pathToExpected: 'Molfiles-V3000/multi-V3000-expected.mol',
        format: 'v3000',
      },
      {
        testName: 'Open/Save V3000 mol file contains Sgroup - 2',
        pathToOpen: 'Molfiles-V3000/sgroup-different-V3000.mol',
        pathToExpected: 'Molfiles-V2000/sgroup-different-V2000-expected.mol',
        format: 'v2000',
      },
      {
        testName: 'Open/Save v3000 mol file with assigned Alias',
        pathToOpen: 'Molfiles-V3000/chain-with-alias.mol',
        pathToExpected: 'Molfiles-V3000/chain-with-alias-expected.mol',
        format: 'v3000',
      },
    ];

    for (const file of files) {
      test(`${file.testName}`, async ({ page }) => {
        await openFileAndAddToCanvas(file.pathToOpen, page);

        await verifyFileExport(
          page,
          file.pathToExpected,
          FileType.MOL,
          file.format as MolfileFormat,
        );
      });
    }
  });

  test(
    'Save V3000 mol file contains more than 900 symbols',
    {
      tag: ['@SlowTest'],
    },
    async ({ page }) => {
      /**
       * Test case: EPMLSOPKET-1859(2)
       * Description: v3000 mol file contains more than 900 symbolsis opened and saved correctly
       */
      test.slow();

      await openFileAndAddToCanvasAsNewProject(
        'Molfiles-V3000/more-900-atoms.mol',
        page,
      );
      await verifyFileExport(
        page,
        'Molfiles-V3000/more-900-atoms-expected.mol',
        FileType.MOL,
        'v3000',
      );
    },
  );

  test('V3000 mol file contains different Bond properties', async ({
    page,
  }) => {
    /**
     * Test case: EPMLSOPKET-1853
     * Description: Structre is correctly generated from Molstring and vise versa molstring is correctly generated from structure.
     * A file with V3000 format is resaved in V2000 format
     */

    await openFileAndAddToCanvas(
      'Molfiles-V3000/all-bond-properties-V3000.mol',
      page,
    );
    await verifyFileExport(
      page,
      'Molfiles-V2000/all-bond-properties-V2000-expected.mol',
      FileType.MOL,
      'v2000',
    );
  });

  for (let i = 1; i < 9; i++) {
    test(`Open/Save files for ferrocen-like structures 1/2 - open ferrocene_radical0${i}.mol`, async ({
      page,
    }) => {
      /**
       * Test case: EPMLSOPKET-1893(1)
       * Description: Structures are rendered correctly
       */

      await openFileAndAddToCanvas(
        `Molfiles-V2000/ferrocene-radical0${i}.mol`,
        page,
      );
      await takeEditorScreenshot(page);
      await selectAllStructuresOnCanvas(page);
      await page.keyboard.press('Delete');
    });
  }

  test('Open/Save files for ferrocen-like structures 2/2 - save', async ({
    page,
  }) => {
    /**
     * Test case: EPMLSOPKET-1893(2)
     * Description: Structures are rendered correctly.
     * */
    test.slow();

    for (let i = 1; i < 9; i++) {
      await openFileAndAddToCanvas(
        `Molfiles-V2000/ferrocene-radical0${i}.mol`,
        page,
      );
    }
  });

  test('MDL Molfile v2000: Correct padding for M ALS 2/2 - check padding', async ({
    page,
  }) => {
    /**
     * Test case: EPMLSOPKET-8914(2)
     * Description: Files opens.
     * Alias is located on the atom to which we assigned it
     * */

    await openFileAndAddToCanvas('Molfiles-V2000/molfile-with-als.mol', page);
    const expectedFile = await getMolfile(page, 'v2000');
    const isCorrectPadding = expectedFile.includes('N   ');

    expect(isCorrectPadding).toEqual(true);
  });

  test('The Bond length setting with px option is applied and it should be save to MOL v2000', async ({
    page,
  }) => {
    /*
  Test case: https://github.com/epam/ketcher/issues/5435
  Description: Change bond length for Set ACS Settings
  The Bond length setting is applied and it should be save to mol 2000
  */

    await openFileAndAddToCanvas('KET/adenosine-triphosphate.ket', page);
    await openSettings(page);
    await bondsSettings(page);
    await setBondLengthOptionUnit(page, 'px-option');
    await setBondLengthValue(page, '79.8');
    await pressButton(page, 'Apply');
    await takeEditorScreenshot(page);
    await verifyFileExport(
      page,
      'Molfiles-V2000/adenosine-triphosphate-px-bond-lengh.mol',
      FileType.MOL,
      'v2000',
    );
    await openFileAndAddToCanvasAsNewProject(
      'Molfiles-V2000/adenosine-triphosphate-px-bond-lengh.mol',
      page,
    );
    await takeEditorScreenshot(page);
  });

  test('The Bond length setting with cm option is applied and it should be save to MOL v3000', async ({
    page,
  }) => {
    /*
  Test case: https://github.com/epam/ketcher/issues/5435
  Description: Change bond length for Set ACS Settings
  The Bond length setting is applied and it should be save to mol 3000
  */

    await openFileAndAddToCanvas('KET/adenosine-triphosphate.ket', page);
    await openSettings(page);
    await bondsSettings(page);
    await setBondLengthOptionUnit(page, 'cm-option');
    await setBondLengthValue(page, '1.8');
    await pressButton(page, 'Apply');
    await takeEditorScreenshot(page);
    await verifyFileExport(
      page,
      'Molfiles-V3000/adenosine-triphosphate-cm-bond-lengh.mol',
      FileType.MOL,
      'v3000',
    );
    await openFileAndAddToCanvasAsNewProject(
      'Molfiles-V3000/adenosine-triphosphate-cm-bond-lengh.mol',
      page,
    );
    await takeEditorScreenshot(page);
  });

  test('The ACS setting is applied, click on layout and it should be save to MOL v2000', async ({
    page,
  }) => {
    /*
  Test case: https://github.com/epam/ketcher/issues/5156
  Description: add new option Set ACS Settings and check saving to different format
  */

    await openFileAndAddToCanvas('KET/adenosine-triphosphate.ket', page);
    await openSettings(page);
    await pressButton(page, 'Set ACS Settings');
    await pressButton(page, 'Apply');
    await pressButton(page, 'OK');
    await selectLayoutTool(page);
    await takeEditorScreenshot(page);
    await verifyFileExport(
      page,
      'Molfiles-V2000/adenosine-triphosphate-acs-style.mol',
      FileType.MOL,
      'v2000',
    );
    await openFileAndAddToCanvasAsNewProject(
      'Molfiles-V2000/adenosine-triphosphate-acs-style.mol',
      page,
    );
    await takeEditorScreenshot(page);
  });

  test('The ACS setting is applied, click on layout and it should be save to MOL v3000', async ({
    page,
  }) => {
    /*
  Test case: https://github.com/epam/ketcher/issues/5156
  Description: add new option Set ACS Settings and check saving to different format
  */

    await openFileAndAddToCanvas('KET/adenosine-triphosphate.ket', page);
    await openSettings(page);
    await pressButton(page, 'Set ACS Settings');
    await pressButton(page, 'Apply');
    await pressButton(page, 'OK');
    await selectLayoutTool(page);
    await takeEditorScreenshot(page);
    await verifyFileExport(
      page,
      'Molfiles-V3000/adenosine-triphosphate-acs-style.mol',
      FileType.MOL,
      'v3000',
    );
    await openFileAndAddToCanvasAsNewProject(
      'Molfiles-V3000/adenosine-triphosphate-acs-style.mol',
      page,
    );
    await takeEditorScreenshot(page);
  });
});
