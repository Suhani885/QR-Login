import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { coreLoginRetrieveOptions } from '@/services/api/@tanstack/react-query.gen';
export const Route = createFileRoute('/_auth')({
  component: homeLayout,
})

const CutoutTextLoader = ({
  height,
  background,
  imgUrl,
}: {
  height: string;
  background: string;
  imgUrl: string;
}) => {
  return (
    <div className="relative" style={{ height }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div
        style={{ background }}
        className="absolute inset-0 animate-pulse z-10"
      />
      <span
        className="font-black absolute inset-0 z-20 text-center bg-clip-text text-white pointer-events-none"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};

function homeLayout() {
  const router = useRouter()
  const { data, isLoading: loading, isError } = useQuery({
    ...coreLoginRetrieveOptions(),
    retry: false,
  });

  if (loading) {
    return (
    <div>
      <CutoutTextLoader
        height="900px"
        background="black"
        imgUrl="https://images.unsplash.com/photo-1756370473190-4c41ddbd5e59?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
      />
    </div>
  );
  }
  if (isError) {
    router.navigate({ to: "/" })
    console.log(data)
  }

  return <>
    <Outlet />
  </>

}
