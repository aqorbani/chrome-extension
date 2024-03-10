import styles from "../../styles/Pages.module.css";

export default function Main() {
  return (
    <div className="w-full ">
      <div className="w-full">
        <h2 className="p-1 m-1 text-xl font-bold">Translate</h2>
        <div className="flex w-11/12 m-2">
          <button className="bg-gray-200 rounded-l-xl p-2 text-sm font-semibold">
            Auto detect
          </button>
          <button className="bg-gray-200 p-2 text-sm font-semibold">
            Persian
          </button>
          <button className="bg-gray-200 rounded-r-xl p-2 text-sm font-semibold">
            English
          </button>
        </div>
        <div className="flex w-full justify-center items-center">
          <textarea
            name="text"
            className={`m-0 p-2 rounded ${styles.textarea}`}
            id=""
            cols="5"
            rows="5"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
