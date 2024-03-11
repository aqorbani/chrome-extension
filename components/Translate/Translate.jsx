import styles from "../../styles/Pages.module.css";
import { useState, useEffect } from "react";
import { TbMobiledata } from "react-icons/tb";

export default function Main() {
  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [btnStatus, setBtnStatus] = useState("english");
  const [btnStatusRes, setBtnStatusRes] = useState("persian");
  const active =
    "bg-gray-800 text-white rounded-full p-2 text-sm font-semibold";
  const disable = "bg-gray-200 p-2 text-sm font-semibold rounded-full";

  // Execute Translate Function When The Text State Has Been CHenged
  useEffect(() => {
    if (text !== "") {
      translateHandler();
    }
  }, [text]);

  // Function to Fill State
  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  // Function to Create Clean Data for Translate
  const updatedContent = async () => {
    let basicText =
      "translate below text {Auto- English} to {Farsi}:" +
      "\n```text\n" +
      text +
      "\n```";

    return basicText;
  };

  // Function to Get Translated Data From API
  const translateHandler = async () => {
    if (text === "") {
      setResponse("");
      return;
    }

    // Preparing Final Data to Search
    const finalContent = await updatedContent();

    await fetch(process.env.DEEPSEEK, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: finalContent }],
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
        {/* ________________________________________________________ TITLE SECTION */}
        <h2 className="p-1 m-1 text-xl font-bold">Translate</h2>
        {/* ____________________________________________________ GET INPUT SECTION */}
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
            onChange={(e) => onChangeHandler(e)}
            rows="20"
          ></textarea>
        </div>
      </div>

      {/* _____________________________________________________ SHOW OUTPUT SECTION */}
      <div className="w-full">
        <h2 className="flex w-full justify-center mt-3 mb-3 p-1 m-1 text-xl font-bold">
          <TbMobiledata onClick={() => translateHandler()} />
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
            dir="rtl"
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
}
