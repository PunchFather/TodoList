import React, { useState, useEffect } from 'react'

const CounterA = React.memo(({ count }) => { // 값이 그냥 넘어오면 리랜더 안됌

    useEffect(() => {
        console.log(`CounterA update - count : ${count}`)
    })

    return <div>{count}</div>
})

const CounterB = ({ obj }) => { // 객체로 넘어오면 리랜더됌

    useEffect(() => {
        console.log(`CounterA update - count : ${obj.count}`)
    })
    return <div>{obj.count}</div> // 객체로 넘어오면 리랜더됌
}

const areEqual = (prevProps, nextProps) => {
    if (prevProps.obj.count === nextProps.obj.count) {
        return true;
    }
    return false;

    // return true // 이전 프롭스가 현재 프롭스가 같다 -> 리랜더링이 일어나지 않게 됩니다. 
    // return false // 이전 프롭스가 현재 프롭스와 다르다 -> 리랜더링이 일어나게 됩니다.

}

const MemoizedCounterB = React.memo(CounterB, areEqual); // 객체로 넘어오는 값을 리랜더 막기 위해

const OptimizeTest2 = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    })

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}>A button</button>
            </div>

            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />
                <button onClick={() => setObj({ count: obj.count })}>B button</button>

            </div>

        </div>
    )
}

export default OptimizeTest2