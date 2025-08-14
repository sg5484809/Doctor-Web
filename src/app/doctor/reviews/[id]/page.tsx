"use client";

import { useState, useEffect } from "react";

interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
}

export default function DoctorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    // Example hardcoded reviews
    const fetchedReviews: Review[] = [
      { id: "1", patientName: "John Doe", rating: 5, comment: "Excellent care!" },
      { id: "2", patientName: "Jane Smith", rating: 4, comment: "Very professional and friendly." },
      { id: "3", patientName: "Robert Brown", rating: 3, comment: "Good, but wait time was long." },
    ];

    setReviews(fetchedReviews);

    const avg =
      fetchedReviews.reduce((sum, review) => sum + review.rating, 0) /
      fetchedReviews.length;
    setAverageRating(avg);
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">
          Patient Reviews
        </h1>
        <p className="text-lg text-center mb-6 text-gray-950">
          Average Rating:{" "}
          <span className="font-semibold text-yellow-500">
            {averageRating.toFixed(1)} ★
          </span>
        </p>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-green-600">
                {review.patientName}
              </h2>
              <p className="text-yellow-500">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </p>
              <p className="text-gray-700 mt-1">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
