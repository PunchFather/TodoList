import './App.css';
import TodoInput from './components/TodoInput';
import TodoTitle from './components/TodoTitle';
import TodoForm from './components/TodoForm';
import React, { useCallback, useEffect, useRef, useReducer, useMemo } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {

    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      const newItem = {
        ...action.data,
      }
      newState = [newItem, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.targetId ?
        { ...it, content: action.newContent } : it)
      break
    }
    default:
      return state
  }
  localStorage.setItem("todo", JSON.stringify(newState))
  return newState;
}

export const TodoStateContext = React.createContext(); // 데이터 전달
export const TodoDispatchContext = React.createContext(); //함수 전달


const App = () => {

  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, [])
  useEffect(() => {
    const localData = localStorage.getItem('todo')
    if (localData) {
      const todoList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(todoList[0].id) + 1

      dispatch({ type: "INIT", data: todoList })
    }
  }, [])


  const dataId = useRef(0);

  // const getData = async () => {
  //   const res = await fetch(
  //     "https://jsonplaceholder.typicode.com/comments"
  //   ).then((res) => res.json());

  //   const initData = res.slice(0, 20).map((it) => {
  //     return {
  //       content: it.body,
  //       id: dataId.current++
  //     }
  //   })
  //   dispatch({ type: "INIT", data: initData })

  // }

  // useEffect(() => {
  //   getData() // useeffect를 통해 마운트 시점에 getdata를 마운트 시킨다.
  // }, [])

  const onCreate = useCallback((content) => {

    dispatch({ type: 'CREATE', data: { content, id: dataId.current }, })

    dataId.current += 1;
    // setData((data) => [newItem, ...data]) // 새로운 뉴 아이템이 생기고 데이터에 값이 들어감
    // 함수형으로 전달해ㅜㅈ면 
  }, [])

  const onDelete = useCallback((targetId) => {

    dispatch({ type: "REMOVE", targetId })

    //   setData(data => data.filter((it) => it.id !== targetId));
    // }
  }, [])

  const onEdit = useCallback((targetId, newContent) => {

    dispatch({ type: 'EDIT', targetId, newContent })
    // setData(
    //   data =>
    //     data.map((it) => it.id === targetId ? { ...it, content: newContent } : it)
    // )
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onDelete, onEdit }
  }, [])

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={memoizedDispatch}>
        <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
          <div className='w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg' >
            <div className='flex justify-center mb-3'><TodoTitle title="TODO LIST" /></div>
            <TodoInput />
            <TodoForm />
          </div>
        </div>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>

  );
}

export default App;
