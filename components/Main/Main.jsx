import styles from "../../styles/Pages.module.css";
import { useState, useEffect } from "react";
import { BsTranslate } from "react-icons/bs";
import { FaSquarePen } from "react-icons/fa6";
import Translate from "../Translate/Translate";
import Write from "../Write/Write";

export default function Index({ navigateToPage }) {
  // The Place To Define Variables and States
  const [btnStatus, setBtnStatus] = useState("translate");
  const active =
    "flex flex-col justify-center items-center w-full pt-3 p-2 bg-gray-50 text-gray-900 transition-all hover:delay-50 rounded-r-3xl";
  const disable =
    "flex flex-col text-gray-300 justify-center items-center w-full pt-3 p-2";

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="flex h-full rounded">
          {/* ________________________________________________________ WORKSPACE SECTION */}
          <div className="min-w-80 bg-gray-50 rounded-l-md text-gray-800">
            {btnStatus === "write" ? <Write /> : <Translate />}
          </div>
          {/* __________________________________________________________ SIDEBAR SECTION */}
          <div className="w-20 bg-gray-400 pr-1 rounded-r-md pt-32">
            <button
              onClick={() => setBtnStatus("translate")}
              className={btnStatus === "translate" ? active : disable}
            >
              <BsTranslate />
              <p className="font-semibold text-xs">Translate</p>
            </button>
            <button
              onClick={() => setBtnStatus("write")}
              className={btnStatus === "write" ? active : disable}
            >
              <FaSquarePen />
              <p className="font-semibold text-xs">Write</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
