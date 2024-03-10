import styles from "../../styles/Pages.module.css";
import { useState } from "react";
import { TbMobiledata } from "react-icons/tb";

export default function Main() {
  const [text, setText] = useState("");

  const [response, setResponse] = useState("");
  const [isLoading, setLoading] = useState(true);

  const apiUrl = "https://api.deepseek.com/v1/chat/completions";
  const key = "sk-7f8e25e499a44e25901baf1d32a930eb";

  const [btnStatus, setBtnStatus] = useState("english");
  const [btnStatusRes, setBtnStatusRes] = useState("persian");
  const active =
    "bg-gray-800 text-white rounded-full p-2 text-sm font-semibold";
  const disable = "bg-gray-200 p-2 text-sm font-semibold rounded-full";

  const changeHandler = async (e) => {
    setText(e.target.value);

    await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: e.target.value }],
      }),
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.choices[0].message.content);
      });
  };

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data.splice(0, 5));
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) return <p>No profile data</p>;
  // <div>
  //   {data?.map((item) => (
  //     <p className="font-semibold text-xs">{item.title}</p>
  //   ))}
  // </div>;

  return (
    <div className="w-full ">
      <div className="w-full">
        <h2 className="p-1 m-1 text-xl font-bold">Translate</h2>
        <div className="flex w-fit m-2 bg-gray-200 rounded-full">
          <button className={btnStatus === "english" ? active : disable}>
            English detected
          </button>
          <button className={btnStatus === "thai" ? active : disable}>
            Thai
          </button>
          <button className={btnStatus === "french" ? active : disable}>
            French
          </button>
        </div>
        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            placeholder="Enter Text"
            className={`m-0 p-2 rounded ${styles.textarea}`}
            value={text}
            onChange={(e) => changeHandler(e)}
            rows="20"
          ></textarea>
        </div>
      </div>

      <div className="w-full">
        <h2 className="flex w-full justify-center mt-3 mb-3 p-1 m-1 text-xl font-bold">
          <TbMobiledata />
        </h2>
        <div className="flex w-fit m-2 bg-gray-200 rounded-full">
          <button className={btnStatusRes === "persian" ? active : disable}>
            Persian
          </button>
          <button className={btnStatusRes === "english" ? active : disable}>
            English
          </button>
          <button className={btnStatusRes === "spanish" ? active : disable}>
            Spanish
          </button>
        </div>
        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            className={`m-0 p-2 rounded ${styles.textarea}`}
            value={response}
            rows="20"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
