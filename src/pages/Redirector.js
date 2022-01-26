/* eslint-disable no-redeclare */
/* eslint-disable array-callback-return */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react';
import supabase from '../config/supaconfig'
import {useParams} from 'react-router-dom'
import Header from '../components/Header';
////////////////////////////////////////////////////////////////////////////////////////////////////
function Redirector() {
  let {custom} = useParams()
  const [url, setUrl] = useState("")
  const [errorPage, setErrorPage] = useState(false)
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function Window_Redirect(url) {
    window.location.replace(url)
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function Delete_Data(c) {
    const { data, error } = await supabase
    .from('odun')
    .delete()
    .match({ custom: c })
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function Update_Visit(c,v) {
    const { data, error } = await supabase
    .from('odun')
    .update({visit: v+1})
    .match({ custom: c })
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  async function Redirecting_Machine() {
    let { data, error } = await supabase
    .from('odun')
    .select(`*`)
    .eq("custom", custom)
    data = data[0]
    if (!data) {
      setErrorPage(true)
      return
    }

    let now_ts = new Date().valueOf()
    Update_Visit(custom,data.visit)
    if (data.deletion) {
      Delete_Data(custom)
      Window_Redirect(data.url)
    }
    else if (data.expiration && data.expiration < now_ts) {
      Delete_Data(custom)
      setTimeout(() => {Window_Redirect("/")}, 999);
    }
    else{
      Window_Redirect(data.url)
     }
    return
  }
////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    Redirecting_Machine()
  }, [])
////////////////////////////////////////////////////////////////////////////////////////////////////
  if (errorPage) {
      return (
        <>
        <main className="font-sans bg-white">
          <div>
            <section className="bg-white mt-20">
              <div className="max-w-2xl px-6 text-center mx-auto">
                <Header />
                <div className="ErrorInfo mt-5">
                  <h2 className="text-4xl font-medium text-gray-900 mx-auto mt-2">
                    404
                  </h2>
                  <h2 className="text-base font-medium text-gray-500 mx-auto mt-2">
                    SORRY, WE COULDN'T FIND
                  </h2>
                  <h2 className="text-xl font-medium text-gray-800 mx-auto mt-2">
                    <a href="/">HOME</a>
                  </h2>
                </div>
              </div>
            </section>
          </div>
        </main>
        </>
      )
    }

  return(
    <main className="font-sans bg-gray-900">
    </main>
  )
}
export default Redirector;
