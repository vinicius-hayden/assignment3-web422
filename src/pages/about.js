import ListingDetails from "@/components/listingDetails";
import Link from "next/link";
import { Card } from "react-bootstrap";
import PageHeader from "@/components/pageHeader";

export async function getStaticProps() {
  const res = await fetch(
    "https://assignment-web422.vercel.app/api/listings/5283892"
  );
  const data = await res.json();

  return { props: { listing: data } };
}

export default function About({ listing }) {
  return (
    <>
      <PageHeader text="About the Developer: Vinicius Souza da Silva" />
      <Card>
        <Card.Body>
          <p>
            Hello! My name is Vinicius, I love coding, running, and cycling.
            Feel free to explore my website!
          </p>
          <p>
            This is a specific listing from the website that I would like to stay
            for a bit:
          </p>
          <Link href={`/listing/${listing._id}`} legacyBehavior>
            <a>View Listing</a>
          </Link>
        </Card.Body>
        {listing ? (
          <ListingDetails listing={listing} />
        ) : (
          <Card.Body>
            <p>Failed to load listing details.</p>
          </Card.Body>
        )}
      </Card>
    </>
  );
}
