export const getSentimentColor = (sentiment) =>
  sentiment === "positive" ? "success" : sentiment === "negative" ? "error" : "default";
