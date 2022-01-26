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
////////////////////////////////////////////////////////////////////////////////////////////////////
function MyPage() {
////////////////////////////////////////////////////////////////////////////////////////////////////
  const navigate = useNavigate()
////////////////////////////////////////////////////////////////////////////////////////////////////
  const [updatableData, setUpdatableData] = useState({})
  const [myurls, setMyUrls] = useState([])
////////////////////////////////////////////////////////////////////////////////////////////////////
//   async function readURLS() {
//     let data = await db.collection(default_collection).get()
//     let out = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
//     let warehouse = out[0]["warehouse"]
//     let items = Object.values(warehouse)
//     let urls = items.filter((url) => {
//       return url.owner === localStorage.getItem("gmail")
//     })
//     let sorted = urls.sort(function(a,b){
//       return a.visit > b.visit
//     })
//     setUpdatableData(warehouse)
//     setMyUrls(sorted)
//   }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function updateItem(e) {
    let short = e.target.parentElement.parentElement.parentElement.getElementsByClassName("custom")[0].innerText
    let newUrl = prompt(`Type Your New Url for: "${short}" `)||"_"
    if (newUrl.includes("http")) {
      updatableData[short].url = newUrl
      e.target.parentElement.parentElement.parentElement.getElementsByClassName("url")[0].firstElementChild.firstElementChild.href = newUrl
      const { data, error } = await supabase
      .from('odun')
      .update({url: newUrl})
      .match({custom: short})
    }
    return 0
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function deleteItem(e) {
    let item = e.target.parentElement.parentElement.parentElement
    let short = e.target.parentElement.parentElement.parentElement.getElementsByClassName("custom")[0].innerText
    if (confirm()) {
      item.remove()
      const { data, error } = await supabase
      .from('odun')
      .delete()
      .match({ custom: short })
    }
    return 0
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // readURLS()
  }, [])
////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <main className="font-sans bg-white">
        <section className="bg-white mt-20">
          <div className="max-w-2xl px-6 text-center mx-auto">
            <Header />
            <Login page={""} pageName={"Home"}  />
            <Table del={(e)=>deleteItem(e)} update={(e)=> updateItem(e)} data={myurls} />
          </div>
        </section>
      </main>
    </>
  );
}

export default MyPage;
