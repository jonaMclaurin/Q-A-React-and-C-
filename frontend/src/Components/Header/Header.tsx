import React from 'react';
import { UserIcon } from '../Icons/Icons';

export const Header = () => (
  <div>
    <a href="./">Q & A</a>
    <input type="text" placeholder="Search..." />
    <a href="./signin">
      <UserIcon />
      <span>Sign In</span>
    </a>
  </div>
);
