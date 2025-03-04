/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

import { useEffect, useState } from 'react';
import { useAppSelector, useLayoutMode } from 'hooks';
import { hasAntisenseChains, selectEditor } from 'state/common';
import { ModeTypes } from 'ketcher-core';
import styled from '@emotion/styled';
import { Button } from 'ketcher-react';
import { blurActiveElement } from 'helpers/canvas';

const StyledButton = styled(Button)<{ isActive?: boolean }>(
  ({ theme, isActive }) => ({
    width: '40px',
    height: '31px',
    backgroundColor: isActive
      ? theme.ketcher.color.button.group.active
      : 'white',
    marginRight: '8px',
    border: isActive
      ? theme.ketcher.outline.selected.color
      : theme.ketcher.outline.small,
    borderRadius: '4px',
    outline: 'none',

    ':hover': {
      backgroundColor: isActive
        ? theme.ketcher.color.button.group.hover
        : 'white',
    },

    ':hover svg': {
      fill: isActive ? 'white' : theme.ketcher.color.button.group.active,
    },
  }),
);

export const SequenceSyncEditModeButton = () => {
  const editor = useAppSelector(selectEditor);
  const [isSequenceSyncEditMode, setIsSequenceSyncEditMode] = useState(true);
  const layoutMode = useLayoutMode();
  const isSequenceMode = layoutMode === ModeTypes.sequence;
  const hasAtLeastOneAntisense = useAppSelector(hasAntisenseChains);

  const handleClick = () => {
    const isSequenceSyncEditModeNewState = !isSequenceSyncEditMode;

    setIsSequenceSyncEditMode(isSequenceSyncEditModeNewState);
    editor.events.toggleIsSequenceSyncEditMode.dispatch(
      isSequenceSyncEditModeNewState,
    );
    blurActiveElement();
  };

  useEffect(() => {
    if (isSequenceMode && hasAtLeastOneAntisense) {
      editor.events.toggleIsSequenceSyncEditMode.dispatch(
        isSequenceSyncEditMode,
      );
    }
  }, [isSequenceMode, hasAtLeastOneAntisense]);

  return isSequenceMode && hasAtLeastOneAntisense ? (
    <>
      <StyledButton isActive={isSequenceSyncEditMode} onClick={handleClick}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill={isSequenceSyncEditMode ? 'white' : '#333333'}
        >
          <rect x="1" y="1.5" width="22" height="2" rx="1" />
          <rect
            x="2.5"
            y="1.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(90 2.5 1.5)"
          />
          <rect
            x="9.33333"
            y="1.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(90 9.33333 1.5)"
          />
          <rect
            x="16.1667"
            y="1.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(90 16.1667 1.5)"
          />
          <rect
            x="23"
            y="1.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(90 23 1.5)"
          />
          <path d="M2.16873 14.2715C2.08963 14.3652 2.02518 14.4253 1.97537 14.4517C1.9285 14.478 1.8699 14.4912 1.79959 14.4912C1.66189 14.4912 1.55057 14.4458 1.46561 14.355C1.38357 14.2612 1.34256 14.1074 1.34256 13.8936V13.2871C1.34256 13.0703 1.38357 12.9165 1.46561 12.8257C1.55057 12.7319 1.66189 12.6851 1.79959 12.6851C1.90506 12.6851 1.99295 12.7129 2.06326 12.7686C2.1365 12.8242 2.19217 12.918 2.23025 13.0498C2.26834 13.1787 2.30789 13.2666 2.34891 13.3135C2.43387 13.4043 2.58475 13.4966 2.80154 13.5903C3.01834 13.6841 3.25564 13.731 3.51346 13.731C3.91482 13.731 4.24441 13.6372 4.50223 13.4497C4.66629 13.3354 4.74832 13.1948 4.74832 13.0278C4.74832 12.9165 4.70877 12.8125 4.62967 12.7158C4.55057 12.6162 4.42166 12.5342 4.24295 12.4697C4.12576 12.4258 3.86355 12.3657 3.45633 12.2896C2.96414 12.1987 2.59207 12.0889 2.34012 11.96C2.08816 11.8311 1.88895 11.6494 1.74246 11.415C1.59598 11.1807 1.52273 10.9272 1.52273 10.6548C1.52273 10.2241 1.70291 9.84766 2.06326 9.52539C2.42361 9.2002 2.89236 9.0376 3.46951 9.0376C3.70096 9.0376 3.91482 9.06396 4.11111 9.1167C4.31033 9.1665 4.49051 9.24414 4.65164 9.34961C4.76883 9.23535 4.88602 9.17822 5.0032 9.17822C5.13504 9.17822 5.24197 9.2251 5.324 9.31885C5.40897 9.40967 5.45145 9.56201 5.45145 9.77588V10.4526C5.45145 10.6694 5.40897 10.8247 5.324 10.9185C5.24197 11.0093 5.13504 11.0547 5.0032 11.0547C4.89188 11.0547 4.7952 11.021 4.71316 10.9536C4.64871 10.9038 4.60037 10.8042 4.56814 10.6548C4.53592 10.5054 4.4949 10.3984 4.4451 10.334C4.36014 10.2227 4.2327 10.1289 4.06277 10.0527C3.89285 9.97656 3.69656 9.93848 3.47391 9.93848C3.14871 9.93848 2.8909 10.0146 2.70047 10.167C2.51297 10.3164 2.41922 10.4731 2.41922 10.6372C2.41922 10.7485 2.4573 10.8569 2.53348 10.9624C2.61258 11.0649 2.72684 11.1455 2.87625 11.2041C2.97586 11.2451 3.25564 11.311 3.71561 11.4019C4.1785 11.4927 4.53299 11.5923 4.77908 11.7007C5.02811 11.8091 5.23465 11.979 5.39871 12.2104C5.56277 12.4419 5.6448 12.7173 5.6448 13.0366C5.6448 13.4819 5.48807 13.8379 5.17459 14.1045C4.75857 14.4561 4.2283 14.6318 3.58377 14.6318C3.33475 14.6318 3.09158 14.6011 2.85428 14.5396C2.6199 14.481 2.39139 14.3916 2.16873 14.2715ZM9.615 12.2632V13.5991H10.2214C10.4382 13.5991 10.5921 13.6416 10.6829 13.7266C10.7766 13.8086 10.8235 13.917 10.8235 14.0518C10.8235 14.1836 10.7766 14.292 10.6829 14.377C10.5921 14.459 10.4382 14.5 10.2214 14.5H8.10768C7.89381 14.5 7.74 14.459 7.64625 14.377C7.55543 14.292 7.51002 14.1821 7.51002 14.0474C7.51002 13.9155 7.55543 13.8086 7.64625 13.7266C7.74 13.6416 7.89381 13.5991 8.10768 13.5991H8.71412V12.2632L7.22438 10.0747C7.02516 10.0747 6.87867 10.0322 6.78492 9.94727C6.6941 9.8623 6.64869 9.75391 6.64869 9.62207C6.64869 9.4873 6.6941 9.37891 6.78492 9.29688C6.87867 9.21191 7.03395 9.16943 7.25074 9.16943L8.06813 9.17383C8.28492 9.17383 8.43873 9.21484 8.52955 9.29688C8.6233 9.37891 8.67018 9.4873 8.67018 9.62207C8.67018 9.82422 8.55152 9.9751 8.31422 10.0747L9.16676 11.3315L10.0017 10.0747C9.86988 10.0249 9.77613 9.96191 9.72047 9.88574C9.6648 9.80957 9.63697 9.72168 9.63697 9.62207C9.63697 9.4873 9.68238 9.37891 9.7732 9.29688C9.86695 9.21484 10.0222 9.17236 10.239 9.16943L11.0872 9.17383C11.304 9.17383 11.4578 9.21484 11.5486 9.29688C11.6423 9.37891 11.6892 9.4873 11.6892 9.62207C11.6892 9.75684 11.6423 9.8667 11.5486 9.95166C11.4548 10.0337 11.3025 10.0747 11.0916 10.0747L9.615 12.2632ZM13.7082 10.8745V13.5991H14.0334C14.2502 13.5991 14.404 13.6416 14.4949 13.7266C14.5886 13.8086 14.6355 13.917 14.6355 14.0518C14.6355 14.1836 14.5886 14.292 14.4949 14.377C14.404 14.459 14.2502 14.5 14.0334 14.5H12.8513C12.6345 14.5 12.4792 14.459 12.3855 14.377C12.2947 14.292 12.2493 14.1821 12.2493 14.0474C12.2493 13.9185 12.2947 13.8115 12.3855 13.7266C12.4763 13.6416 12.6169 13.5991 12.8074 13.5991V10.0747H12.6667C12.4499 10.0747 12.2947 10.0337 12.2009 9.95166C12.1101 9.8667 12.0647 9.75684 12.0647 9.62207C12.0647 9.4873 12.1101 9.37891 12.2009 9.29688C12.2947 9.21191 12.4499 9.16943 12.6667 9.16943L13.7082 9.17383L16.011 12.7861V10.0747H15.6858C15.469 10.0747 15.3137 10.0337 15.22 9.95166C15.1291 9.8667 15.0837 9.75684 15.0837 9.62207C15.0837 9.4873 15.1291 9.37891 15.22 9.29688C15.3137 9.21191 15.469 9.16943 15.6858 9.16943L16.8679 9.17383C17.0847 9.17383 17.2385 9.21484 17.3293 9.29688C17.4231 9.37891 17.47 9.4873 17.47 9.62207C17.47 9.75391 17.4246 9.8623 17.3337 9.94727C17.2429 10.0322 17.1038 10.0747 16.9163 10.0747V14.5H16.0242L13.7082 10.8745ZM21.9236 9.40234C21.9792 9.32617 22.0393 9.26904 22.1037 9.23096C22.1711 9.19287 22.2429 9.17383 22.3191 9.17383C22.4509 9.17383 22.5578 9.21924 22.6399 9.31006C22.7248 9.40088 22.7673 9.55469 22.7673 9.77148V10.5361C22.7673 10.7529 22.7248 10.9082 22.6399 11.002C22.5578 11.0928 22.4509 11.1382 22.3191 11.1382C22.1989 11.1382 22.1023 11.1045 22.029 11.0371C21.9558 10.9697 21.9016 10.8438 21.8664 10.6592C21.8459 10.5361 21.8049 10.4409 21.7434 10.3735C21.6233 10.2417 21.4548 10.1362 21.238 10.0571C21.0241 9.97803 20.8088 9.93848 20.592 9.93848C20.3225 9.93848 20.0749 9.99707 19.8493 10.1143C19.6237 10.2314 19.4245 10.4219 19.2517 10.6855C19.0788 10.9492 18.9924 11.2627 18.9924 11.626V12.2104C18.9924 12.644 19.1491 13.0059 19.4626 13.2959C19.779 13.5859 20.217 13.731 20.7766 13.731C21.1106 13.731 21.3933 13.6855 21.6247 13.5947C21.7595 13.542 21.903 13.438 22.0554 13.2827C22.1491 13.189 22.2224 13.1289 22.2751 13.1025C22.3279 13.0732 22.3879 13.0586 22.4553 13.0586C22.5754 13.0586 22.6809 13.104 22.7717 13.1948C22.8625 13.2856 22.9079 13.3926 22.9079 13.5156C22.9079 13.6387 22.8464 13.7705 22.7234 13.9111C22.5446 14.1162 22.3147 14.2773 22.0334 14.3945C21.6555 14.5527 21.238 14.6318 20.781 14.6318C20.2478 14.6318 19.7673 14.522 19.3396 14.3022C18.9939 14.1265 18.6994 13.8496 18.4563 13.4717C18.2131 13.0908 18.0915 12.6763 18.0915 12.228V11.6172C18.0915 11.1484 18.1999 10.7119 18.4167 10.3076C18.6364 9.90039 18.9397 9.58691 19.3264 9.36719C19.7131 9.14746 20.1233 9.0376 20.5569 9.0376C20.8176 9.0376 21.0608 9.06836 21.2863 9.12988C21.5149 9.18848 21.7273 9.2793 21.9236 9.40234Z" />
          <rect
            x="23"
            y="22.5"
            width="22"
            height="2"
            rx="1"
            transform="rotate(-180 23 22.5)"
          />
          <rect
            x="21.5"
            y="22.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(-90 21.5 22.5)"
          />
          <rect
            x="14.6667"
            y="22.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(-90 14.6667 22.5)"
          />
          <rect
            x="7.83333"
            y="22.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(-90 7.83333 22.5)"
          />
          <rect
            x="1"
            y="22.5"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(-90 1 22.5)"
          />
        </svg>
      </StyledButton>
    </>
  ) : null;
};
