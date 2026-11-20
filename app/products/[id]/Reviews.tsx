"use client";

import { useState } from "react";
import Stars from "../../components/Stars";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpfulCount: number;
  verified: boolean;
}

const DEFAULT_REVIEWS: Record<string, Review[]> = {
  "wave-runner": [
    {
      id: "r1",
      author: "Alex Rivera",
      rating: 5,
      date: "2 days ago",
      title: "Best daily trainers I've owned",
      content:
        "Clocked over 80 miles in these already. The foam midsole has incredible bounce without feeling unstable on long runs.",
      helpfulCount: 24,
      verified: true,
    },
    {
      id: "r2",
      author: "Sarah Chen",
      rating: 5,
      date: "1 week ago",
      title: "Extremely breathable & true to size",
      content:
        "The knit upper fits like a glove and keeps my feet cool during warm morning workouts. Will buy another pair in navy.",
      helpfulCount: 16,
      verified: true,
    },
    {
      id: "r3",
      author: "Marcus Vance",
      rating: 4,
      date: "2 weeks ago",
      title: "Great cushioning, slightly narrow toe box",
      content:
        "Solid shoes for tempo days. If you have wide feet, consider going up half a size, otherwise absolute perfection.",
      helpfulCount: 8,
      verified: true,
    },
  ],
  "trail-blazer": [
    {
      id: "r4",
      author: "Elena Rostov",
      rating: 5,
      date: "3 days ago",
      title: "Unstoppable grip on wet rocks",
      content:
        "Took these on a 14er scramble through loose gravel and wet scree. The rock plate saved my soles, no slippage at all.",
      helpfulCount: 31,
      verified: true,
    },
    {
      id: "r5",
      author: "David Kim",
      rating: 4,
      date: "2 weeks ago",
      title: "Tough construction, mud washes off easily",
      content:
        "Very water-resistant and durable. Stiffer than road runners as expected, but broke in nicely after 10 miles.",
      helpfulCount: 12,
      verified: true,
    },
  ],
  "pulse-buds": [
    {
      id: "r6",
      author: "Priya Sharma",
      rating: 5,
      date: "Yesterday",
      title: "ANC punches way above its price",
      content:
        "Used these on a cross-country flight and daily subway commute. The noise canceling is shockingly good and bass is punchy.",
      helpfulCount: 42,
      verified: true,
    },
    {
      id: "r7",
      author: "Julian Bell",
      rating: 5,
      date: "5 days ago",
      title: "All-day comfort & sweatproof",
      content:
        "They stay securely in my ears during intense interval training without needing adjustment. Case charges fast too.",
      helpfulCount: 19,
      verified: true,
    },
  ],
  "echo-speaker": [
    {
      id: "r8",
      author: "Hannah Abbott",
      rating: 4,
      date: "4 days ago",
      title: "Huge volume in a pocket frame",
      content:
        "Took this camping last weekend. Battery easily outlasted our 10-hour trip and the clip makes it easy to hook onto a backpack.",
      helpfulCount: 14,
      verified: true,
    },
    {
      id: "r9",
      author: "Chris Taylor",
      rating: 5,
      date: "1 week ago",
      title: "Durable speaker for the outdoors",
      content:
        "Survived rain and a splash in the river without skipping a beat. Impressive bass clarity for such a small unit.",
      helpfulCount: 9,
      verified: true,
    },
  ],
  "time-keeper": [
    {
      id: "r10",
      author: "Lucas Martinez",
      rating: 5,
      date: "3 days ago",
      title: "Finally, battery life that lasts a full week",
      content:
        "I was tired of charging watches every night. The Time Keeper delivers a full 7 days with sleep and workout tracking active.",
      helpfulCount: 38,
      verified: true,
    },
    {
      id: "r11",
      author: "Emma Watson",
      rating: 5,
      date: "2 weeks ago",
      title: "Sleek display & very accurate sensors",
      content:
        "Heart rate tracking aligns identically with my chest strap monitor. Bright screen readable in harsh direct sunlight.",
      helpfulCount: 22,
      verified: true,
    },
  ],
  "focus-band": [
    {
      id: "r12",
      author: "Liam O'Connor",
      rating: 4,
      date: "5 days ago",
      title: "Zero distractions, fantastic battery",
      content:
        "Exactly what I wanted: no screen pings, just accurate step counts and sleep analysis. Battery lasts nearly two weeks.",
      helpfulCount: 11,
      verified: true,
    },
  ],
  "power-brick": [
    {
      id: "r13",
      author: "Aisha Khan",
      rating: 5,
      date: "Yesterday",
      title: "Charges my laptop and phone simultaneously",
      content:
        "65W output is legit. Full speed charge for my USB-C MacBook and smartphone together. Compact enough for any messenger bag.",
      helpfulCount: 27,
      verified: true,
    },
  ],
  "clip-cam": [
    {
      id: "r14",
      author: "Ryan Gallagher",
      rating: 4,
      date: "6 days ago",
      title: "Magnetic mount is genius",
      content:
        "Clips right onto shirt collars, bike handlebars, or magnetic posts. Smooth 4K footage and waterproof right out of the box.",
      helpfulCount: 20,
      verified: true,
    },
  ],
};

const FALLBACK_REVIEWS: Review[] = [
  {
    id: "fb1",
    author: "Jordan Smith",
    rating: 5,
    date: "4 days ago",
    title: "Outstanding build quality",
    content:
      "Exceeded my expectations straight out of the box. Materials feel premium and performance matches the description.",
    helpfulCount: 18,
    verified: true,
  },
  {
    id: "fb2",
    author: "Taylor Reed",
    rating: 4,
    date: "1 week ago",
    title: "Super reliable and well designed",
    content:
      "Simple to set up, works seamlessly, and looks sleek. Definitely recommended for daily use.",
    helpfulCount: 9,
    verified: true,
  },
];

export default function Reviews({ productId }: { productId: string }) {
  const initialReviews = DEFAULT_REVIEWS[productId] || FALLBACK_REVIEWS;
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const filtered =
    filterRating === "all"
      ? reviewsList
      : reviewsList.filter((r) => r.rating === filterRating);

  const avgRating =
    reviewsList.length > 0
      ? reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length
      : 5;

  const handleHelpful = (id: string) => {
    if (helpfulVoted[id]) return;
    setHelpfulVoted((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: "Just now",
      title: newTitle.trim() || "Customer Review",
      content: newContent.trim(),
      helpfulCount: 0,
      verified: true,
    };

    setReviewsList([added, ...reviewsList]);
    setNewAuthor("");
    setNewTitle("");
    setNewContent("");
    setShowAddForm(false);
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-head">
        <h2 className="section-title">Customer Reviews</h2>
        <span className="section-count">{reviewsList.length} verified reviews</span>
      </div>

      <div className="reviews-summary-card">
        <div className="reviews-score-block">
          <span className="reviews-avg-num">{avgRating.toFixed(1)}</span>
          <Stars rating={avgRating} />
          <span className="reviews-score-sub">Based on {reviewsList.length} ratings</span>
        </div>

        <div className="reviews-breakdown">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviewsList.filter((r) => r.rating === star).length;
            const pct = reviewsList.length > 0 ? (count / reviewsList.length) * 100 : 0;
            return (
              <div key={star} className="breakdown-row">
                <span className="breakdown-label">{star}★</span>
                <div className="breakdown-bar-track">
                  <div
                    className="breakdown-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="breakdown-count">{count}</span>
              </div>
            );
          })}
        </div>

        <div className="reviews-cta-block">
          <button
            type="button"
            className="btn-review-toggle"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Cancel Review" : "Write a Review"}
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddReview} className="review-form">
          <h3 className="review-form-title">Write Your Review</h3>
          <div className="form-row">
            <label className="form-label">
              Your Name
              <input
                type="text"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="e.g. Jordan M."
                className="form-input"
              />
            </label>
            <label className="form-label">
              Rating
              <select
                value={newRating}
                onChange={(e) => setNewRating(Number(e.target.value))}
                className="form-select"
              >
                <option value={5}>5 Stars - Outstanding</option>
                <option value={4}>4 Stars - Great</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Below Average</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </label>
          </div>
          <label className="form-label">
            Headline
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's the main takeaway?"
              className="form-input"
            />
          </label>
          <label className="form-label">
            Review
            <textarea
              required
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Tell others what you think about this gear..."
              className="form-textarea"
            />
          </label>
          <button type="submit" className="btn-review-submit">
            Submit Review
          </button>
        </form>
      )}

      <div className="reviews-filter-bar">
        <span className="filter-label">Filter:</span>
        <button
          type="button"
          className={`chip ${filterRating === "all" ? "chip-active" : ""}`}
          onClick={() => setFilterRating("all")}
        >
          All ({reviewsList.length})
        </button>
        {[5, 4, 3].map((num) => {
          const count = reviewsList.filter((r) => r.rating === num).length;
          return (
            <button
              key={num}
              type="button"
              className={`chip ${filterRating === num ? "chip-active" : ""}`}
              onClick={() => setFilterRating(num)}
            >
              {num}★ ({count})
            </button>
          );
        })}
      </div>

      <div className="reviews-list">
        {filtered.map((r) => (
          <article key={r.id} className="review-card">
            <div className="review-card-head">
              <div className="review-author-wrap">
                <span className="review-author-name">{r.author}</span>
                {r.verified && (
                  <span className="review-verified-badge">✓ Verified Buyer</span>
                )}
              </div>
              <span className="review-date">{r.date}</span>
            </div>

            <div className="review-rating-row">
              <Stars rating={r.rating} />
              <h4 className="review-item-title">{r.title}</h4>
            </div>

            <p className="review-item-body">{r.content}</p>

            <div className="review-foot">
              <button
                type="button"
                className={`btn-helpful ${helpfulVoted[r.id] ? "btn-helpful-voted" : ""}`}
                onClick={() => handleHelpful(r.id)}
                disabled={helpfulVoted[r.id]}
              >
                👍 Helpful ({r.helpfulCount})
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
