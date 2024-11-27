import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Row, Col, Card } from "react-bootstrap";

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      _id
      reviewText
      rating
    }
  }
`;

import { CSSProperties } from "react";

const styles: { reviews: CSSProperties; reviewText: CSSProperties } = {
  reviews: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  reviewText: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#495057",
  },
};

const Reviews: React.FC = () => {
  const { loading, error, data } = useQuery(GET_REVIEWS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const shuffledReviews = [...data.reviews].sort(() => 0.5 - Math.random());
  const selectedReviews = shuffledReviews.slice(0, 3);

  return (
    <Row className="text-center g-4">
      <h3 className="mb-4">Reviews</h3>
      {selectedReviews.map((review: { _id: string; reviewText: string }) => (
        <Col md={4} key={review._id}>
          <Card style={styles.reviews}>
            <div style={styles.reviewText}>{review.reviewText}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Reviews;
