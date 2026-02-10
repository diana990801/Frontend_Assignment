import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make a Donation - GoodBoy Foundation',
  description: 'Support Slovak dog shelters with your donation. Choose to help the foundation or a specific shelter.',
  openGraph: {
    title: 'Make a Donation - GoodBoy Foundation',
    description: 'Support Slovak dog shelters with your donation.',
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
