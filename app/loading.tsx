export default function Loading() {
  return (
    <div className="container" aria-label="Loading content..." aria-busy="true">
      <div className="skeleton-hero" />
      <div className="skeleton-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-art" />
            <div className="skeleton-body">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-sub" />
              <div className="skeleton-line skeleton-price" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
