import styles from "../../styles/Pages.module.css";
import { useState, useEffect } from "react";

export default function Index({ navigateToPage }) {
  const [name, setName] = useState("iman");

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.splice(0, 10));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title} onClick={() => setName("omid")}>
          {name}
        </h1>
        <div>
          {data?.map((item) => (
            <p>{item.title}</p>
          ))}
        </div>
        <p className={styles.description}>
          This is an example of a Browser Extension built with NEXT.JS. Please
          refer to the GitHub repo for running instructions and documentation
        </p>
        <h1 className={styles.code}>Index Page ./components/Index/index.js</h1>
        <p>{"[ - This is Index page content - ]"}</p>
        <p onClick={() => navigateToPage("new")}>{"Go to New Page >"}</p>
      </main>
    </div>
  );
}
