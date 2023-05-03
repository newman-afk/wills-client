import { useEffect, useState } from "react";

function Home() {
  const [wills, setWills] = useState([]);
  useEffect(() => {
    async function getWills() {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/wills`
      );
      const data = await response.json();
      setWills(data);
    }
    getWills();
  }, []);

  function createMarkup(data) {
    return { __html: data };
  }
  return (
    <>
      {wills.length === 0 && (
        <h1 className="text-center my-8 text-xl">啥也没有，我哭死😭</h1>
      )}
      <div className=" h-screen grid xl:grid-cols-2 gap-9 pt-8 pb-40 md:px-4 xl:px-12">
        {wills.map((will) => {
          const { id, author, title, subtitle, content, createdAt, updatedAt } =
            will;
          return (
            <div className=" p-8 bg-white rounded-3xl shadow-lg" key={id}>
              <h2 className="text-center font-semibold text-lg">{title}</h2>
              <h3 className="text-center font-medium">{subtitle}</h3>
              <div className="mt-4 w-full md:flex md:justify-evenly md:flex-row text-xs">
                <p>Author: {author}</p>
                <p>CreatedAt: {createdAt.slice(0, 10)}</p>
                <p>UpdatedAt: {updatedAt.slice(0, 10)}</p>
              </div>
              <div
                className="mt-8"
                dangerouslySetInnerHTML={createMarkup(content)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
