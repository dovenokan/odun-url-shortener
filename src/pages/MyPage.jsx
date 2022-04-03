/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import supabase from '../config/supaconfig'
import {useNavigate} from 'react-router-dom'
import Login from '../components/Login';
import Table from '../components/Table';
import Header from '../components/Header';
import {useAuth0} from "@auth0/auth0-react";
////////////////////////////////////////////////////////////////////////////////////////////////////
function MyPage() {
////////////////////////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate()
  const { user } = useAuth0();
  const [myurls, setMyUrls] = useState([])
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function readURLS() {
    const { data, error } = await supabase
    .from("odun")
    .select("custom, owner, visit, custom, url, ts")
    .match({owner: user.email})
    const customs = Object.values(data)
    const sorted = customs.sort(function(a,b){
      return a.custom > b.custom
    })
    setMyUrls(sorted)
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function updateItem(e,item) {
    const html = e.target.parentElement.parentElement.parentElement.getElementsByClassName("url")[0].firstElementChild.firstElementChild
    const short = item.custom
    const newUrl = prompt(`Type Your New Url for: "${short}" `)||"_"
    if (newUrl.includes("http")) {
      html.href = newUrl
      const { data, error } = await supabase
      .from('odun')
      .update({url: newUrl})
      .match({custom: short})
    }
    return 0
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function deleteItem(e,item) {
    console.log(e,item)
    const html = e.target.parentElement.parentElement.parentElement
    const short = item.custom
    if (confirm()) {
      html.remove()
      const { data, error } = await supabase
      .from('odun')
      .delete()
      .match({custom: short})
    }
    return 0
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    readURLS()
  }, [user])
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <main className="font-sans bg-white">
        <section className="bg-white mt-20">
          <div className="max-w-2xl px-6 text-center mx-auto">
            <Header />
            <Login page={""} pageName={"Home"}  />
            <Table del={deleteItem} update={updateItem} data={myurls} />
          </div>
        </section>
      </main>
    </>
  );
}

export default MyPage;
