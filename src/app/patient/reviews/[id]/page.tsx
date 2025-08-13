'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star } from 'lucide-react';

export default function PatientReviewPage() {
  const { id } = useParams(); // doctorId
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('loggedInPatientName') || 'John Doe';
    setPatientName(storedName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

    const newReview = {
      doctorId: id,
      patientName,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    alert('Review submitted!');
    router.push('/patient/dashboard');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Share Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Star Rating */}
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                size={28}
                className={`cursor-pointer transition ${
                  starValue <= (hover || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Review</label>
            <textarea
              className="w-full p-3 border border-green-300 rounded-lg focus:border-transparent focus:ring-2 focus:ring-green-400 outline-none text-black"
              rows={4}
              placeholder="Write your experience with the doctor..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
);

}
