export function calculateStars(props) {
  let rating = props || 0;
  let stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      let empty = Math.abs(0 - rating);
      let half = Math.abs(0.5 - rating);
      let full = Math.abs(1 - rating);
      let closest = Math.min(empty, half, full);
      switch (closest) {
        case empty:
          stars.push(0);
          break;
        case half:
          stars.push(0.5);
          break;
        case full:
          stars.push(1.0);
          break;
        default:
          console.log("OOPS");
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }
  return stars;
}
