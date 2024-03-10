import styles from "../../styles/Pages.module.css";
import { useState } from "react";

export default function Main() {
  const [text, setText] = useState("");
  const [lenght, setLength] = useState("auto");
  const [format, setFormat] = useState("auto");
  const [output, setOutput] = useState("english");
  const [data, setData] = useState("");
  const [response, setResponse] = useState("");

  const active =
    "bg-purple-950 text-white rounded-full m-1 pr-2 pl-2 text-xs font-normal";
  const disable =
    "bg-gray-200 rounded-full m-1 pr-2 pl-2 text-xs font-normalmal";

  const apiUrl = "https://api.deepseek.com/v1/chat/completions";
  const key = "sk-7f8e25e499a44e25901baf1d32a930eb";

  let basicText =
    "Please rewrite below text in length " +
    lenght +
    " and format " +
    format +
    " in " +
    output +
    ":\n ```text \n" +
    text +
    "\n```";

  const generateHandler = async () => {
    if (text === "") {
      setResponse("");
      return;
    }
    await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: basicText }],
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

  return (
    <div className="w-full ">
      <div className="w-full">
        <h2 className="p-1 m-1 text-xl font-bold">Write</h2>
        <p className="text-white w-fit p-1 ml-1 text-xs font-semibold bg-black rounded-full">
          Compose
        </p>
        <p className="text-black w-fit p-2 text-xs font-normal">
          Write about :
        </p>

        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            placeholder="Enter Text"
            className={`m-0 p-2 rounded ${styles.textarea}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="20"
          ></textarea>
        </div>
        <div className="flex w-fit m-2">
          <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
            Lenght :
          </h3>
          <button
            onClick={() => setLength("auto")}
            className={lenght === "auto" ? active : disable}
          >
            Auto
          </button>
          <button
            onClick={() => setLength("short")}
            className={lenght === "short" ? active : disable}
          >
            Short
          </button>
          <button
            onClick={() => setLength("medium")}
            className={lenght === "medium" ? active : disable}
          >
            Medium
          </button>
          <button
            onClick={() => setLength("long")}
            className={lenght === "long" ? active : disable}
          >
            Long
          </button>
        </div>
        <div className="flex w-fit m-2">
          <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
            Format :
          </h3>
          <button
            onClick={() => setFormat("auto")}
            className={format === "auto" ? active : disable}
          >
            Auto
          </button>
          <button
            onClick={() => setFormat("email")}
            className={format === "email" ? active : disable}
          >
            Email
          </button>
          <button
            onClick={() => setFormat("message")}
            className={format === "message" ? active : disable}
          >
            Message
          </button>
        </div>
        <div className="flex w-fit m-2">
          <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
            Output Language :
          </h3>
          <select
            onChange={(e) => setOutput(e.target.value)}
            className="bg-gray-200 rounded-full m-1 pr-2 pl-2 text-xs
              font-normal"
          >
            <option value="english">English</option>
            <option value="persian">Persian</option>
          </select>
        </div>
        <div className="flex w-ull m-2">
          <button
            onClick={generateHandler}
            className="w-full bg-black text-white font-semibold rounded-full p-1"
          >
            Generate
          </button>
        </div>
        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            value={response}
            className={`m-0 p-2 rounded ${styles.textarea}`}
            rows="20"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
