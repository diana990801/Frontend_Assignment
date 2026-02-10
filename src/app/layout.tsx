import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { Layout } from '@/components/layout/Layout';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'GoodBoy Foundation - Help Slovak Dog Shelters',
  description: 'Support Slovak dog shelters through GoodBoy Foundation. Every contribution helps improve the lives of abandoned dogs.',
  keywords: ['dog shelter', 'donation', 'slovakia', 'animal welfare', 'goodboy'],
  authors: [{ name: 'GoodBoy Foundation' }],
  openGraph: {
    title: 'GoodBoy Foundation - Help Slovak Dog Shelters',
    description: 'Support Slovak dog shelters through GoodBoy Foundation.',
    type: 'website',
    locale: 'sk_SK',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
