/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import {useEffect} from 'react';
import Localbase from 'localbase'
import supabase from '../config/supaconfig'
const db = new Localbase('db')

function Warehouse() {
    useEffect(() => {
      db.collection('newo').get().then(users => {
        for (const dere of Object.values(users[0])) {
            async function fetcher() {
                const { data, error } = await supabase
                .from('odun')
                .insert([
                  {
                    custom: dere.custom,
                    url: dere.url,
                    ts: dere.ts,
                    owner: dere.owner,
                    visit: dere.visit,
                    deletion: dere.deletion,
                    expiration: dere.expiration,
                  }
                ])
            }
            // fetcher()
        }
      })
    }, []);

    return (
        <body className='bg-gray-700 text-white p-20'>dd</body>
    )
}

export default Warehouse;
