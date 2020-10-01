/** @jsx jsx */
import { css, jsx } from '@emotion/core';
// eslint-disable-next-line
import React from 'react';
import user from '../../Assets/user.svg';

export const UserIcon = () => (
  <img
    src={user}
    alt="User"
    css={css`
      width: 12px;
      opacity: 0.6;
    `}
  />
);
