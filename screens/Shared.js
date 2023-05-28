import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

export const [statusBarLength, setStatusBarLength] = useState(0);

const getStatusBarHeight = async () => {
  const height = await StatusBar.getCurrentHeight();
  setStatusBarLength(height);
};

useEffect(() => {
  getStatusBarHeight();
}, []);
