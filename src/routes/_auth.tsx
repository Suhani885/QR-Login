import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useRouter } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { coreLoginRetrieveOptions } from '@/services/api/@tanstack/react-query.gen';
export const Route = createFileRoute('/_auth')({
  component: homeLayout,
})

function homeLayout() {
  const router = useRouter()
  const { data, isLoading: loading, isError } = useQuery({
    ...coreLoginRetrieveOptions(),
    retry: false,
  });

  if (loading) {
    return <h1>Loading</h1>
  }
  if (isError) {
    router.navigate({ to: "/" })
    console.log(data)
  }

  return <>
    <Outlet />
  </>

}
