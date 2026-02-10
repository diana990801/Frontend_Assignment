'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import { queryClient } from '@/lib/queryClient';
import { theme } from '@/styles/theme';
import { GlobalStyle } from '@/styles/GlobalStyle';
import '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
