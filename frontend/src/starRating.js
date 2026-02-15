function Foo({ rating, setRating }) {
  return (
    <div style={{ fontSize: "40px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffd700" : "#ccc"
          }}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Foo;
