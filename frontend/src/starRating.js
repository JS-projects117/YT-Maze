import { useState } from "react";

function Foo({ rating, setRating, fontSize = 40 }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hovered || rating);

        return (
          <span
            key={star}
            style={{
              cursor: "pointer",
              color: active ? "#ffd700" : "#ccc",

              textShadow: active
                ? `
                  0 3px 5px rgba(0,0,0,0.8),
                  0 0 8px #ffd700,
                  0 0 16px #ffd700
                `
                : `
                  0 10px 20px rgba(0,0,0,0.9),
                  0 10px 20px rgba(0,0,0,0.7)
                `,

              transform: hovered >= star ? "scale(1.2)" : "scale(1)",
              transition: "all 0.15s ease"
            }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export default Foo;