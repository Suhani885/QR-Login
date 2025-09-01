import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import './QRScanner.scss';
import { coreQrAuthUpdateMutation } from '@/services/api/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';
const QRScanner = () => {
  const videoElementRef = useRef(null);
  const router = useRouter()
  const qrMutation = useMutation(coreQrAuthUpdateMutation())
  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    let scanned = false;

    const qrScanner = new QrScanner(
      video,
      (result) => {
        if (scanned) return;
        scanned = true;

        console.log('decoded qr code:', result.data);

        qrMutation.mutate(
          {
            body: {
              scanned_token: result.data,
            },
          },
          {
            onSuccess: (result) => {
              console.log(result);
              toast.success("QR Scanned Successfully");
              router.navigate({ to: "/dashboard" });
            },
            onError: (error) => {
              console.log(error);
              toast.error("ERROR");
              scanned = false;
            },
          }
        );
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
