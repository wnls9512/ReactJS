import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

/**
 * useEffect(arg1, arg2)
 * arg1 : 한번만 실행하고 싶은 코드 (reRendering 필요 없는 코드)
 *        (API같은거)
 * arg2 : [], dependencies. reactJs가 지켜보는 코드
 * useEffrect가 컴포넌트의 첫 번째 렌더 시점에 arg1호출
 * 상태를 변화시키면 arg1는 호출되지 않음 => 한번만 렌더링
 * useEffect(() => {
 * console.log("Call The Api")
 * }, []);
 *
 * <->  useMemo
 * 생성자 함수의 처리 시간이 오래거리는 경우 렌더링마다 계산하는 것은 비효율적이므로
 * 값을 기억해두고 의존성이 변경되었을 경우에만 다시 계산해주는 기능
 * useEffect는 해당 컴포넌트의 렌더링이 완료 된 후 실행
 * useMemo는 렌더링 중 실행
 */
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => {
    setKeyword(e.target.value);
  };
  console.log("i run all the time");
  //useEffect(iRunOnlyOnce, []);
  useEffect(() => {
    console.log("I run only once.");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
    if (keyword !== "" && keyword.length > 5) {
      console.log("SEARCH FOR", keyword);
    }
  }, [keyword]); //keyword가 변화할 때만 실행
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when keyword & conter changes.");
  }, [counter, keyword]);

  const [showing, setShowing] = useState(false);
  const onClick2 = () => setShowing((prev) => !prev);

  return (
    <div className="App">
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here ..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click me</button>
      <Button text={"Continue"}></Button>

      <hr />
      {showing ? <Hello /> : null}
      {/* component 지웠다 생성했다 하기 때문에 useEffect를 사용 했어도 i'm created 가 실행  */}
      <button onClick={onClick2}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

function Hello() {
  function destroyedFn() {
    console.log("destroyed bye :(");
  }
  function effectFn() {
    console.log("I'm created :)");
    return destroyedFn();
    // Cleanup = destroyed 될 때 실행하는 것
    // 컴포넌트가 destroy될 때 실행하는 법 usseEffect함수가 새로운 함수를 return
    // 리렌더링 -> 클린업 -> 이펙트실행
  }
  useEffect(effectFn, []);
  return <h1>Hello</h1>;
}
export default App;
