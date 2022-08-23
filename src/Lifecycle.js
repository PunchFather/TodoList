import React, { useEffect, useState } from 'react'

const UnmountTest = () => {

  useEffect(() => {
    console.log("mount!")// 마운트 
    return () => { // 함수를 리턴하면 언마운트
      console.log("unmount!")

    }
  }, [])
  return <div> unmount testing componett</div>
}




const Lifecycle = () => {
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   console.log("mount")
  // }, []) // 빈 배열을 입력하면 처음 랜더가 되었을 때만 마운트가 나오고 그 다음 업데이트가 되진 않는다.

  // useEffect(() => {
  //   console.log("update");
  // }) // 빈 배열을 넣지 않으면 컴포넌트 리랜더 될 때 마다 업데이트가 됌

  // useEffect(() => {
  //   console.log(`count is update ; ${count}`) // 콜백함수 자리
  //   if (count > 5) {
  //     alert("카운트가 5가 넘었습니다. 따라서 1로 초기화 합니다.")
  //     setCount(1);
  //   }
  // }, [count]) // 디벤덴시 어레이에 값이 변화하게 되면, 그 순간 콜백함수가 수행된다.


  // useEffect(() => {
  //   console.log(`text is update ; ${text}`)
  // }, [text])

  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible)

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>on/off</button>
      {isVisible && <UnmountTest />}
      {/*  단락회로평가를 통해 isvisbile이 트루면 뒤에 언마운트(트루시) 컴포넌트를 보여줌 */}
    </div>
  )
}







export default Lifecycle;