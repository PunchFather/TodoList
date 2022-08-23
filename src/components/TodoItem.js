import React, { useContext, useEffect, useState } from 'react'
import { TodoDispatchContext } from '../App'

const TodoItem = ({ id, content }) => {

    const { onEdit, onDelete } = useContext(TodoDispatchContext);
    useEffect(() => {
        console.log(`${id}번째 렌더`)
    })

    const [isEdit, setIsEdit] = useState(false) // isEdit이 True면 수정하기 false면 그냥 랜더 
    const toggleIsEdit = () => setIsEdit(!isEdit)
    const [localContent, setlocalContent] = useState(content);

    const handleDelete = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`))
            onDelete(id);
    }

    const handleQuitEdit = () => {
        setIsEdit(false)
        setlocalContent(content);
    }

    const handleEdit = () => {
        onEdit(id, localContent)
        toggleIsEdit(
        );
    }


    return (
        <div className='TodoItem'>

            <div className='flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded'>
                <input className='flex items-start' type="checkbox" />{isEdit ? <><input value={localContent} onChange={(e) => setlocalContent(e.target.value)} /></> : <>{content}</>}
                <div className='flex items-center justify-between'>
                    {isEdit ? <> <button
                        onClick={handleQuitEdit} >
                        ❌
                    </button>
                        <button onClick={handleEdit}>
                            ⭕️
                        </button></> :
                        <>
                            <button
                                onClick={toggleIsEdit}
                            >
                                ✏️
                            </button>
                            <button onClick={handleDelete}>
                                🗑
                            </button>
                        </>}

                </div>
            </div>

        </div >






    )
}

export default React.memo(TodoItem);