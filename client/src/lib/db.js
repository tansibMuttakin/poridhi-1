const basUrl = "http://localhost:5000";

export const getNews = async () => {
  const response = await fetch(`${basUrl}/get-news`);
  const data = await response.json();
  return data;
};

export const createNews = async (text) => {
  const response = await fetch(`${basUrl}/create-news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  return data;
};
