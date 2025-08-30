import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import './QRScanner.scss';

const QRScanner = () => {
  const videoElementRef = useRef(null);
  const router = useRouter()
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log('decoded qr code`:', { result });
        toast.success(`qr Scanned Successfully ${result.data}`)
        router.navigate({ to: "/dashboard" })

      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start();
    console.log('start');

    return () => {
      console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  return (
    <div>
      <div className="videoWrapper ">
        <video className="qrVideo " ref={videoElementRef} />
      </div>

    </div>
  );
};

export default QRScanner;
