import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const resp = await response.json();
      const top = await resp.slice(0, 10);
      const all = await Promise.all(
        top?.map(async (item) => {
          const fetched = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${item}.json`
          );
          const fetchedRes = await fetched.json();
          const comments = await fetchedRes?.kids;
          comments?.map(async (kid) => {
            const fetchKids = await fetch(
              `https://hacker-news.firebaseio.com/v0/item/${kid}.json`
            );
            const kids = await fetchKids.json();
          });
        })
      );
      setData(all);
    };
    apiCall();
  }, []);

  console.log(data);

  return <></>;
};

export default App;
