/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../config/supaconfig";
import Login from "../components/Login";
import Table from "../components/Table";
import Header from "../components/Header";

function MyPage() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [myUrls, setMyUrls] = useState([]);

  async function readUrls() {
    const { data, error } = await supabase
      .from("odun")
      .select("custom, owner, visit, custom, url, ts")
      .match({ owner: user.email });
    if (error) {
      console.error(error);
      return;
    }
    const customs = Object.values(data);
    const sorted = customs.sort(function (a, b) {
      return a.custom > b.custom;
    });
    setMyUrls(sorted);
  }

  async function updateItem(e, item) {
    const html = e.target.closest(".url").querySelector(".url-link");
    const short = item.custom;
    const newUrl = prompt(`Type Your New Url for: "${short}" `) || "_";
    if (newUrl.includes("http")) {
      html.href = newUrl;
      const { data, error } = await supabase
        .from("odun")
        .update({ url: newUrl })
        .match({ custom: short });
      if (error) {
        console.error(error);
      }
    }
  }

  async function deleteItem(e, item) {
    const html = e.target.closest(".url-row");
    const short = item.custom;
    if (window.confirm("Are you sure you want to delete this item?")) {
      html.remove();
      const { data, error } = await supabase
        .from("odun")
        .delete()
        .match({ custom: short });
      if (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    readUrls();
  }, [readUrls, user]);

  return (
    <>
      <main className="font-sans bg-white">
        <section className="bg-white mt-20">
          <div className="max-w-2xl px-6 text-center mx-auto">
            <Header />
            <Login page="" pageName="Home" />
            <Table del={deleteItem} update={updateItem} data={myUrls} />
          </div>
        </section>
      </main>
    </>
  );
}

export default MyPage;
