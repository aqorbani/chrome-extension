import styles from "../../styles/Pages.module.css";
import { useState, useEffect } from "react";
import { BsTranslate } from "react-icons/bs";
import { FaSquarePen } from "react-icons/fa6";

export default function Index({ navigateToPage }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [btnStatus, setBtnStatus] = useState("translate");
  const active =
    "flex flex-col justify-center items-center w-full pt-3 p-2 mt-20 bg-gray-50 text-purple-900 transition-all hover:delay-50 rounded-r-3xl";
  const disable = "flex flex-col justify-center items-center w-full pt-3 p-2";

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setData(data.splice(0, 5));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  // <div>
  //   {data?.map((item) => (
  //     <p className="font-semibold text-xs">{item.title}</p>
  //   ))}
  // </div>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex h-full">
          <div className="min-w-80 bg-gray-50">test1</div>
          <div className="w-20 bg-slate-300 pr-1">
            <button className={btnStatus === "translate" ? active : disable}>
              <BsTranslate />
              <p className="font-semibold text-xs">Translate</p>
            </button>
            <button className={btnStatus === "translate" ? disable : active}>
              <FaSquarePen />
              <p className="font-semibold text-xs">Write</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
