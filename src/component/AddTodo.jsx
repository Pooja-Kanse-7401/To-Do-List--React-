import React, { useState } from 'react'
import { FaFilePen, FaTrashCan, FaCirclePlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from '../utils/todoSlice';
import { nanoid } from '@reduxjs/toolkit';


function AddTodo() {
    const showdate = new Date();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayName = days[showdate.getDay()];
    const monthName = months[showdate.getMonth()];
    const date = showdate.getDate();

    const formattedDate = `${dayName}, ${monthName} ${date}`;

    // Handle todos

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    const [input, setInput] = useState({
        id: "",
        text: ""
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleTodo = (e) => {
        e.preventDefault()
        const inputId = { ...input, id: nanoid() }
        dispatch(addTodo(inputId))
        alert("submit")
    }


    const editTodo = (id) => {
        const updatedData = {
            id : id,
            text : input.text
        }

        dispatch(updateTodo(updatedData))
    }


    return (
        <>
            <div className='h-[100%] w-[100%] flex justify-center items-center flex-col bg-gradient-to-tr from-pink-300 to-zinc-950'>
                <div className='relative h-[35%] rounded-t-2xl w-[90%] md:w-[50%] bg-[center] bg-[cover] bg-no-repeat bg-[url("https://images.unsplash.com/photo-1522100413001-24c7d1be1229?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
                    <input type="text" value={formattedDate} readOnly="true" className='bg-transparent text-wrap text-white text-2xl md:text-4xl font-bold absolute bottom-6 left-4' />
                </div>
                <div className='bg-black/10 backdrop-filter backdrop-blur-lg bg-opacity-10 h-[60%] w-[90%] md:w-[50%]'>
                    <div className='w-[100%] h-[85%] flex justify-start items-center flex-col pt-2 overflow-y-scroll no-scrollbar'>
                        {
                            todos.map((val, i) => {
                                return (
                                    <div key={val.id} id={i} className='rounded-md text-white flex justify-between items-center w-[95%] my-1 bg-white/40 px-2 backdrop-filter backdrop-blur-lg bg-opacity-10'>
                                        <li className='text-xl font-bold'>{val.text}</li>
                                        <span className=''>
                                            <button type='submit'
                                                onClick={() => dispatch(removeTodo(val.id))}
                                                className='border-2 p-2 rounded-md m-2 bg-pink-950 hover:text-lg shadow-md hover:shadow-gray-900 '><FaTrashCan /></button>
                                            <button
                                                onClick={() => editTodo(val.id)}
                                                className='border-2 p-2 rounded-md m-2 bg-green-950 hover:text-lg shadow-md hover:shadow-gray-900 '><FaFilePen /></button>
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[100%] p-2 bg-white fixed bottom-0'>
                        <form action="" onSubmit={handleTodo} className='flex items-center'>
                            <label htmlFor="add" className='text-3xl m-1 cursor-pointer'><FaCirclePlus /></label>
                            <input type="text" name="text" id="text" value={input.text} placeholder='Add a to-do' className='outline-none bg-transparent w-[100%] p-1 px-4 text-xl' onChange={handleChange} />
                            <button type='submit' className='text-white border-2 p-1 px-2 rounded-md m-2 bg-green-950 text-md hover:text-lg shadow-md hover:shadow-gray-900 '>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTodo
