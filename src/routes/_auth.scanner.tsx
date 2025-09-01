import { createFileRoute } from '@tanstack/react-router'
import { useIsMobile } from '@/hooks/useIsMobile';

import QRScanner from '@/components/QRScanner/QRScanner';

export const Route = createFileRoute('/_auth/scanner')({
  component: RouteComponent,
})

function RouteComponent() {

  const isMobile = useIsMobile();




  if (!isMobile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s ease-in-out infinite alternate'
          }}
        />
        <h2 className="text-xl font-bold">This page is only available on mobile devices.</h2>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s ease-in-out infinite alternate'
        }}
      />
      <h1 className="text-2xl font-bold mb-6">Scan QR Code</h1>
      <div className="relative w-[320px] h-[380px] rounded-xl overflow-hidden shadow-xl">
        <QRScanner />
      </div>
      <p className="mt-6 text-gray-300 text-center">
        Position the QR code inside the frame to scan
      </p>
    </div>

  );
}
