export default async function handler(req, res) {
  const apiKey = process.env.VITE_NEWS_FEED_API_KEY;
  const { category = "general", q = "", page = 1 } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?category=${category}&q=${q}&page=${page}&pageSize=5&country=us&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
