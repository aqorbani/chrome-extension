import styles from "../../styles/Pages.module.css";
import { useState } from "react";

export default function Main() {
  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [lenght, setLength] = useState("auto");
  const [format, setFormat] = useState("auto");
  const [output, setOutput] = useState("english");
  const [response, setResponse] = useState("");

  const active =
    "bg-gray-500 text-white rounded-full m-1 pr-2 pl-2 text-xs font-normal";
  const disable =
    "bg-gray-200 rounded-full m-1 pr-2 pl-2 text-xs font-normalmal";

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

  // Function to Get Generated DATA
  const generateHandler = async () => {
    if (text === "") {
      setResponse("");
      return;
    }
    await fetch(process.env.DEEPSEEK, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: basicText }],
      }),
      headers: {
        Authorization: "Bearer " + process.env.KEY,
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
        {/* ____________________________________________________________ TITLE SECTION */}
        <h2 className="p-1 m-1 text-xl font-bold">Write</h2>
        <p className="text-white w-fit p-1 ml-1 text-xs font-semibold bg-black rounded-full">
          Compose
        </p>
        {/* ________________________________________________________ GET INPUT SECTION */}
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
        {/* ________________________________________________________ GET SETTING SECTION */}
        {/* _________________________________________________________ GET LENGTH SECTION */}
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
        {/* ________________________________________________________ GET FORMAT SECTION */}
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
        {/* ____________________________________________________ GET OUTPUT LANGUAGE SECTION */}
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
        {/* ________________________________________________________ GENERATE BUTTON SECTION */}
        <div className="flex w-ull m-2">
          <button
            onClick={generateHandler}
            className="w-full bg-black text-white font-semibold rounded-full p-1"
          >
            Generate
          </button>
        </div>
        {/* _____________________________________________________________ SHOW INPUT SECTION */}
        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            value={response}
            className={`m-0 p-2 rounded ${styles.textarea}`}
            rows="20"
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}
