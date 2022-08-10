import React, { useState, useEffect, useRef, useReducer } from "react";

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement"
}

function reducer(state, action) {

  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
  
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 }

    default:
      return state;
  }
  
}


function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  //const [count, setCount] = useState(3);

  function decrementCount() {
    //setCount(prevCount => prevCount - 1);
    dispatch({type: ACTIONS.DECREMENT});
  }

  function increaseCount() {
    //setCount(prevCount => prevCount + 1);
    dispatch({type: ACTIONS.INCREMENT});
  }


  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(`switched to ${resourceType}`);
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(response => response.json())
    .then(json => setItems(json));
  }, [resourceType])


  const [name, setName] = useState("");
  const inputRef = useRef();

  function focus() {
    inputRef.current.focus()
  }

  return (
    <>
        <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
        <div>My name is {name}</div>
        <button onClick={focus}>Focus</button>

        <br />
        <br />

        <button onClick={decrementCount}>-</button>
        <span>{state.count}</span>
        <button onClick={increaseCount}>+</button>

        <br />
        <br />

        <button onClick={() => setResourceType("posts")}>posts</button>
        <button onClick={() => setResourceType("users")}>users</button>
        <button onClick={() => setResourceType("comments")}>comments</button>
        <h1>{resourceType}</h1>
        {items.map(item => {
          return (<pre>{JSON.stringify(item)}</pre>)
        })}
    </>
  );
}

export default App;
