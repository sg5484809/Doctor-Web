"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Review {
  doctorId: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function DoctorReviewsPage() {
  const { id } = useParams(); // doctorId
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number | null>(null);

  useEffect(() => {
    const storedReviews: Review[] = JSON.parse(localStorage.getItem("reviews") || "[]");

    // Now filtering by doctorId
    const doctorReviews = storedReviews.filter((r) => r.doctorId === id);

    setReviews(doctorReviews);

    if (doctorReviews.length > 0) {
      const avg =
        doctorReviews.reduce((sum, r) => sum + r.rating, 0) /
        doctorReviews.length;
      setAvgRating(Number(avg.toFixed(1)));
    } else {
      setAvgRating(null);
    }
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Reviews</h2>
      {avgRating !== null && (
        <p>
          Average Rating: <strong>{avgRating} ★</strong>
        </p>
      )}
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {reviews.map((review, index) => (
            <li
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Patient:</strong> {review.patientName}
              </p>
              <p>
                <strong>Rating:</strong> {review.rating} ★
              </p>
              <p>
                <strong>Comment:</strong> {review.comment}
              </p>
              <p style={{ fontSize: "0.8em", color: "#666" }}>
                {new Date(review.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
