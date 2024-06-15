/*********************************************************************************
 * WEB422 – Assignment 3
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Vinicius Souza da Silva Student ID: 135067221 Date: 2022-06-14
 *
 ********************************************************************************/

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { Pagination, Accordion } from "react-bootstrap";
import PageHeader from "@/components/pageHeader";
import ListingDetails from "@/components/listingDetails";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  // const { data, error } = useSWR(`http://localhost:3000/api/listings?page=${page}&perPage=10`, fetcher);
  const { data, error } = useSWR(
    `https://assignment-web422.vercel.app/api/listings?page=${page}&perPage=10`,
    fetcher
  );

  useEffect(() => {
    console.log("Data from SWR:", data);
    console.log("Error from SWR:", error);
    if (data) {
      setPageData(data);
    }
  }, [data, error]);

  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const next = () => {
    setPage(page + 1);
  };

  if (error) return <div>Failed to load: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <PageHeader text="Browse Listings: Sorted by Number of Ratings" />
      <Accordion>
        {pageData.map((listing) => (
          <Accordion.Item eventKey={listing._id} key={listing._id}>
            <Accordion.Header>
              <strong>{listing.name}</strong> - {listing.address.street}
            </Accordion.Header>
            <Accordion.Body>
              <ListingDetails listing={listing} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
