import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'APE ORIGIN: The Lost Jungle | OthersideMeta',
  description: 'A cinematic AAA-quality metaverse web experience - Explore the futuristic Otherside world with exploration, interaction, lore, portals, and immersive environments.',
  keywords: ['metaverse', 'otherside', 'ape', 'nft', 'web3', 'three.js', 'cyber jungle'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cyber-dark text-white font-body overflow-hidden">
        {children}
      </body>
    </html>
  );
}
