/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import {memo} from 'react'
import {copyText} from './Functions'

function Table({data,update,del}) {
    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-center font-sans">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-center">SHORT</th>
                                <th className="py-3 px-6 text-center">COPY</th>
                                <th className="py-3 px-6 text-center">URL</th>
                                <th className="py-3 px-6 text-center">VISIT</th>
                                <th className="py-3 px-6 text-center">UPDATE</th>
                                <th className="py-3 px-6 text-center">DELETE</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {data.map((v) => {
                                return(
                                    <tr key={v.ts} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="custom text-center py-3 px-6 text-center whitespace-nowrap">
                                            <div className="text-center">
                                                <span className="font-medium">{v.custom}</span>
                                            </div>
                                        </td>
                                        <td className="copy py-3 px-6 text-center">
                                            <div className="cursor-pointer hover:bg-gray-200 text-gray-600 px-1 rounded-full text-xs">
                                                <span onClick={()=>copyText(`${window.origin}/${v.custom}`)}> <i className="fa fa-copy"></i> </span>
                                            </div>
                                        </td>
                                        <td className="url py-3 px-6 text-center">
                                            <div className="text-center">
                                                <a target="blank" href={v.url}> <i className="fa fa-eye"></i> </a>
                                            </div>
                                        </td>
                                        <td className="visit py-3 px-6 text-center">
                                            <div className="text-center">
                                                <span className="font-medium">{v.visit}</span>
                                            </div>
                                        </td>
                                        <td className="update py-3 px-6 text-center">
                                            <div className="text-center">
                                                <span onClick={(e) => update(e,v)} className="cursor-pointer bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">Update</span>
                                            </div>
                                        </td>
                                        <td className="delete py-3 px-6 text-center">
                                            <div className="text-center">
                                                <span onClick={(e) => del(e,v)} className="cursor-pointer bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs">Delete</span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default memo(Table);