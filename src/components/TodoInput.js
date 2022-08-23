import React, { useContext, useState } from 'react'
import { TodoDispatchContext } from '../App'


const TodoInput = () => {

    const { onCreate } = useContext(TodoDispatchContext);

    const [state, Setstate] = useState("")

    const handleChangeState = (e) => {
        Setstate(e.target.value)
    }


    const handleSubmit = () => {
        onCreate(state) // 기본 값 
        Setstate("");
    }

    return (
        <div className='flex pt-1'>
            <input placeholder='할 일을 작성하세요' className='w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow' value={state} onChange={handleChangeState} />
            <button className='p-2 text-blue-400 border-2 border-blue-400 rounded w-20 hover:text-white hover:bg-blue' onClick={handleSubmit}>입력</button>
        </div>

    )
}

export default React.memo(TodoInput);