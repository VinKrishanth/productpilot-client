import React from 'react';
import { LogoImg } from '../assets/images/assets.js';

export default function Logo() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={LogoImg}
        alt="Ecobazar Logo"
        className="w-12 h-12 object-contain"
      />
      <h1 className="text-4xl font-semibold tracking-wide text-white ">
        Ecobazar
      </h1>
    </div>
  );
}
