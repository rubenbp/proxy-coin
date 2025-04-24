// pages/api/proxy/[...path].js
import axios from "axios";

export default async function handler(req, res) {
  const { path = [] } = req.query;
  const query = req.query;

  // Construir la URL de destino
  const url = `https://api.coingecko.com/${path.join("/")}`;

  try {
    const response = await axios.get(url, {
      params: query,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data || "Error al obtener datos de CoinGecko";
    res.status(status).json({ error: message });
  }
}
