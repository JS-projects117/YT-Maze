function Foo({ rating, setRating }) {
  return (
    <div style={{ fontSize: "40px" }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= rating;

        return (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: active ? "#ffd700" : "#ccc",

              textShadow: active
                ? `
                  0 3px 5px rgba(0,0,0,0.8),   /* black undershadow */
                  0 0 8px #ffd700,             /* glow */
                  0 0 16px #ffd700
                `
                : `
                  0 10px 20px rgba(0,0,0,0.9),   /* strong black undershadow */
                  0 10px 20px rgba(0,0,0,0.7)
                `,

              transition: "all 0.2s ease"
            }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Foo;