import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import PageHeader from "@/components/pageHeader";
import ListingDetails from "@/components/listingDetails";

export default function Listing() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    id ? `https://assignment-web422.vercel.app/api/listings/${id}` : null
  );

  if (isLoading) return null;
  if (error || !data) return <Error statusCode={404} />;

  return (
    <>
      <PageHeader text={data.name} />
      <ListingDetails listing={data} />
    </>
  );
}
