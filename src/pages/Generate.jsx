/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../config/supaconfig";
import Login from "../components/Login";
import Header from "../components/Header";
import { copyText } from "../components/Functions";

function Generate() {
  const navigate = useNavigate();
  const { user } = useAuth0();

  const customInput = useRef(null);
  const urlInput = useRef(null);

  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState(
    Math.random().toString(36).substring(2, 7)
  );
  const [generated, setGenerated] = useState("");
  const [deletion, setDeletion] = useState(false);
  const [expiration, setExpiration] = useState(null);

  function QRCodeBox() {
    return generated.length >= 3 ? (
      <div className="qr inline-table">
        <QRCode renderAs="svg" value={generated} includeMargin={true} />
      </div>
    ) : null;
  }

  function clean() {
    customInput.current.value = "";
    urlInput.current.value = "";
  }

  async function shortener() {
    const { data: customs, error: customError } = await supabase
      .from("odun")
      .select("custom");
    const takenCustoms = customs.map((c) => c.custom);

    if (takenCustoms.includes(custom)) {
      alert("Custom name is taken.");
    } else if (!url.includes("http")) {
      alert('Url must include "http".');
    } else if (
      custom.length !== 0 &&
      (custom.length < 3 || custom.length > 20)
    ) {
      alert("Custom name length must be between 3 and 20.");
    } else {
      const randCustom = Math.random().toString(36).substring(2, 7);
      const { data: insertData, error: insertError } = await supabase
        .from("odun")
        .insert([
          {
            custom: custom || randCustom,
            url: url,
            ts: Date.now(),
            owner: user ? user.email : "anonymous",
            visit: 0,
            deletion: deletion,
            expiration: expiration,
          },
        ]);
      setGenerated(`${window.location.origin}/${custom || randCustom}`);
      clean();
      setCustom(Math.random().toString(36).substring(2, 7));
    }
  }

  useEffect(() => {
    setCustom(Math.random().toString(36).substring(2, 7));
  }, [user]);
  
  return (
    <>
      <main className="font-sans bg-white">
        <section className="bg-white mt-20">
          <div className="max-w-2xl px-6 text-center mx-auto">
            <Header />
            <Login page={"mypage"} pageName={"MyPage"}  />
            <div className="grid flex items-end justify-center mt-8">
              <div className="bg-gray-300 px-1 py-1 text-gray-500"> <input ref={urlInput} className="bg-gray-200 text-gray-600 px-1 py-1 w-full" onChange={(event)=>setUrl(event.target.value)} type="text" placeholder="Url" /></div>
              <div className="bg-gray-300 px-1 py-1 mt-4 text-gray-500">{window.location.host.replace("www.","")}/ <input ref={customInput} className="bg-gray-200 text-gray-600 px-1 py-1" onChange={(event)=>setCustom(event.target.value.toLowerCase())}  type="text" placeholder="Custom (optional)" /></div>
              <div className="mt-3">
                <span className="text-gray-500 text-xs border-b border-gray-600">Pick Expiration Date</span>
                <input onChange={(e)=>setExpiration(new Date(e.target.value).valueOf())} name="expiration" type="datetime-local" className="bg-gray-300 text-gray-500 sm:text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-1 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pick Expiration Date" />
              </div>
              <div className="bg-gray-300 px-1 py-1 mt-3 text-gray-500">
                <label className="inline-flex items-center my-1">
                  <span className="mr-6 text-gray-500">Delete After Redirection</span>
                  <input onClick={()=>setDeletion(!deletion)} type="checkbox" className="ml-8 form-checkbox h-5 w-4 text-gray-500"/>
                </label> 
              </div>
              <button className="cursor-pointer bg-gray-300 text-gray-500 mt-3 px-1 py-1 hover:bg-gray-400 hover:text-gray-600 active:text-gray-700 active:bg-gray-500" onClick={()=>shortener()}>Shorten</button>
            </div>
            <p onClick={()=>copyText(generated)} className={"bg-gray-000 hover:bg-gray-000 px-1 py-1 mt-4 text-gray-500"}><a target="_blank" href={generated}>{generated}</a> {generated.includes(window.origin) ? <i className="cursor-pointer hover:bg-gray-50 fa fa-copy px-1 rounded"></i> : null} </p>
            <QRCodeBox/>
          </div>
        </section>
      </main>
    </>
  );
}
export default Generate;
