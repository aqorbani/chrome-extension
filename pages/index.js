import React, { useState } from "react";
import Index from "../components/Index";
import New from "../components/New";

export default function Home() {
  const [activePage, setActivePage] = useState("index");
  const [name, setName] = useState("ali");

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  const nameChanger = (name) => {
    setName(name);
  };

  return (
    <>
      {activePage === "index" && (
        <Index
          navigateToPage={navigateToPage}
          name={name}
          nameChanger={nameChanger}
        />
      )}
      {activePage === "new" && (
        <New
          navigateToPage={navigateToPage}
          name={name}
          nameChanger={nameChanger}
        />
      )}
    </>
  );
}
