import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function MyWill() {
  const navigate = useNavigate();
  const [hasWill, setHasWill] = useState(false);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const [will, setWill] = useLocalStorage("will", {
    title: "",
    subtitle: "",
    author: "",
    content: "",
    isPrivate: false,
  });

  useEffect(() => {
    async function getWill() {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/mywill/` +
          new URLSearchParams({
            email: user?.email,
          }),
        {
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      const data = await response.json();
      if (data !== null) {
        setHasWill(true);
        console.log(typeof data.isPrivate);
        setWill({
          title: data.title,
          subtitle: data.subtitle,
          author: data.author,
          content: data.content,
          isPrivate: data.isPrivate,
        });
      }
    }
    getWill();
  }, [setWill, user?.email]);

  async function handleSubmit(e) {
    e.preventDefault();

    const bodyData = { ...will, email: user.email };

    if (hasWill) {
      fetch(`${import.meta.env.VITE_APP_BASE_URL}/mywill`, {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: "PATCH",
        body: JSON.stringify(bodyData),
      });
      navigate("/");
      return;
    }

    fetch(`${import.meta.env.VITE_APP_BASE_URL}/mywill`, {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify(bodyData),
    });
    navigate("/");
  }

  function handleChange(e) {
    setWill((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }
  return (
    <form
      className="xl:w-5/6 flex flex-col gap-2 mx-auto mt-8"
      onSubmit={handleSubmit}
    >
      <div className="mx-4 flex gap-2 items-center">
        <label htmlFor="title">Title: </label>
        <input
          className="mr-4 w-full shadow-sm rounded p-1 bg-slate-300"
          type="text"
          id="title"
          value={will.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mx-4 flex gap-2 items-center">
        <label htmlFor="subtitle">Subtitle: </label>
        <input
          className="mr-4 w-full shadow-sm rounded p-1 bg-slate-300"
          type="text"
          id="subtitle"
          value={will.subtitle}
          onChange={handleChange}
        />
      </div>
      <div className="mx-4 flex gap-2 items-center">
        <label htmlFor="author">Author: </label>
        <input
          className="mr-4 w-full shadow-sm rounded p-1 bg-slate-300"
          type="text"
          id="author"
          value={will.author}
          onChange={handleChange}
        />
      </div>
      <ReactQuill
        className="mt-4"
        theme="snow"
        value={will.content}
        onChange={(e) =>
          setWill((prev) => {
            return { ...prev, content: e };
          })
        }
      />
      <div className="mx-2">
        <label htmlFor="isPrivate" className="mr-2">
          Private
        </label>
        <input
          type="checkbox"
          checked={will.isPrivate}
          onChange={() =>
            setWill((prev) => {
              return { ...prev, isPrivate: !prev.isPrivate };
            })
          }
        />
      </div>
      <br />
      <button
        className="mx-auto w-full md:ml-2 mb-40 max-w-sm  py-2 active:scale-95 bg-slate-300 rounded-lg"
        type="submit"
      >
        Comfirm
      </button>
    </form>
  );
}

export default MyWill;
