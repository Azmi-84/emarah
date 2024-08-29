export const metadata = {
  title: 'Emarah',
  description: 'Start Your Anonymous Adventure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
