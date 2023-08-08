import React, { useEffect, useState } from "react";
import './App.css';
import postImg from './assets/images/post.jpg'

function App() {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [paginationData, setPaginationData] = useState([])

  const handleDelete = (index)=>{
    const temp = [...data]
    temp.splice(index,1)
    setData(temp)
  }

  useEffect(() => {
    const newdata = data.slice(6 * (pageNum - 1), pageNum * 6);
    setCurrentData(newdata);
  }, [pageNum, data]);

  const fetchData = async () => {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
    const respData = await resp.json();
    const totalPage = []
    for (let i = 0; i < Math.ceil(respData.length / 6); i++) {
      totalPage[i] = i + 1
    }
    setData(respData);
    setPaginationData(totalPage)
  };
  useEffect(() => {
    if (data.length < 1) {
      fetchData();
    }
  }, []);
  return (
    <div className="App">
      <div className="card-container">
        {currentData.length > 0 &&
          currentData.map((item,index) => (
            <div className="wraper">
              <div className="post-card">
                <h1>{item.title}</h1>
                <p>{item.body}</p>
                <img src={postImg} />
              </div>
              <div className="close-btn" onClick={()=>handleDelete(index)}>X</div>
            </div>
          ))}
      </div>
      <div className="pagination">
        {paginationData.length > 0 && paginationData.map((item, index) => (
          <div className="page-num " onClick={() => setPageNum(item)} key={index} >{item}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
