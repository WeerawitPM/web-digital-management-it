"use client"
import React from 'react';

export default function Component() {
    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="a4 bg-white shadow-lg p-8 my-5">
                {/* <h1 className="text-2xl font-bold mb-4">A4 Size Document</h1>
                <p className="mb-4">This is a document with the dimensions of an A4 paper, styled using Tailwind CSS.</p> */}
                <table className="table-auto border-collapse border border-black w-full text-sm">
                    <thead>
                        <tr>
                            <th className='border border-black' colSpan="3">VCS Group.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td className='border border-black' colSpan="3">IT Equipments Request Form</td>
                        </tr>
                        <tr className='text-center'>
                            <td>Document No. QF-ITC-0001</td>
                            <td>Effective Date : 21 September 2023</td>
                            <td>Revsion: 1</td>
                        </tr>
                    </tbody>
                </table>

                <table className="table-auto border-collapse border border-black w-full text-sm mt-1">
                    <thead>
                        <tr>
                            <th className='border border-black' colSpan="4">Requestor Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='border border-black font-bold'>Name-Surname :</td>
                            <td className='border border-black'></td>
                            <td className='border border-black font-bold'>Employee ID :</td>
                            <td className='border border-black'></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Company :</td>
                            <td className='border border-black'></td>
                            <td className='border border-black font-bold'>Department & Section :</td>
                            <td className='border border-black'></td>
                        </tr>
                        <tr>
                            <td className='border border-black font-bold'>Position :</td>
                            <td className='border border-black'></td>
                            <td className='border border-black font-bold'>Telephone :</td>
                            <td className='border border-black'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
