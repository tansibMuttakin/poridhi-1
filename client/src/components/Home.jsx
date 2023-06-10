"use client";

import { useState, useEffect } from "react";
import Form from "./Form";
import News from "./News";
import { createNews, getNews } from "@/lib/db";

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isCached, setIsCached] = useState(null);

  // fetch lates news on initial rendering
  useEffect(() => {
    getLatestNewsList();
  }, []);

  //get latest news list
  const getLatestNewsList = async () => {
    try {
      const { news, isCached } = await getNews();
      setNewsList(news);
      setIsCached(isCached);
    } catch (error) {
      console.log(error);
    }
  };

  // handle form submit
  const handleSubmit = async () => {
    try {
      await createNews(userInput);
      getLatestNewsList();
      setUserInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <Form
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
        />
      </section>
      <section>
        <h3>
          News List <span>({newsList.length})</span>
        </h3>
        {isCached !== null && (
          <h4>
            Cache: <span>{isCached ? "true" : "false"}</span>
          </h4>
        )}
        {newsList?.map((news) => (
          <News key={news.id} text={news.text} />
        ))}
      </section>
    </>
  );
}
