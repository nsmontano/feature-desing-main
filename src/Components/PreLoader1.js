import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

function PreLoader1() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setData(json);
          setDone(true);
        });
    }, 2000);
  }, []);

  return (
    <>
        <ReactLoading
          type={"bars"}
          color={"#EF4B26"}
          height={400}
          width={300}
          margin-top={-200}
        />
    </>
  );
}

export default PreLoader1;
