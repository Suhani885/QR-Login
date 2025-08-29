import { createFileRoute } from '@tanstack/react-router'
import { Scanner } from '@yudiel/react-qr-scanner';

export const Route = createFileRoute('/scanner')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Scan QR Code</h1>

      <div className="relative w-[320px] h-[320px] rounded-xl overflow-hidden shadow-xl">

        {/* <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] -translate-x-1/2 -translate-y-1/2 border-4 border-green-500 rounded-lg z-20 pointer-events-none" /> */}
        <Scanner
          formats={["qr_code"]}
          onScan={(result) => console.log(result)}
        />
      </div>

      <p className="mt-6 text-gray-300 text-center">
        Position the QR code inside the frame to scan
      </p>
    </div>
  )
}
