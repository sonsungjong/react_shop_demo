import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'

export default function App() {
  // 이미지를 받아와서 state에 저장
  const [products, setProducts] = useState([]);
  // 로딩상태를 체크하는 state를 하나 만든다
  const [loading, setLoading] = useState(true);

  // App 컴포넌트 시작되면 사이트에서 이미지 받아올거니깐
  // useEffect
  useEffect(()=>{
    // https://fakestoreapi.com/products
    // 내용을 fetch로 받아와서
    // products에 저장 (잘받아왔는지 console.log)
    // get요청을 https://fakestoreapi.com/products 에 전송
    fetch('https://fakestoreapi.com/products')
    .then(
      // fetch가 오래 걸리는 작업이기 때문에 then을 통해서 대기해줘야함
      (res)=>{
        if (!res.ok) {
          // 응답이 제대로 안왔을때 throw : catch로 가라
          throw new Error(`HTTP 오류! 상태: ${res.status}`);
        }
        return res.json()     // return 하면 밑에 then으로 전송
      }
    )
    .then((res_json)=>{
      setProducts(res_json);
      console.log(res_json);      // 잘받아온지 확인
    })
    .catch((err)=>{
      alert(err);
    })
    .finally(()=>{
      // then과 catch가 모두 끝나면 마무리할 작업을 여기에
      // 여기서 setLoading으로 false를 만들어준다
      setLoading(false);
    })
  }, []);

  if(loading === true){
    return(
      <div className='App_loading'>
        <h1>Now Loading...</h1>
        <p>잠시만 기다려주세요</p>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <header className='nav'>
        <div><h2><Link to='/'>MyShopping</Link></h2></div>
        <ul>
          <li><Link to='/'>홈페이지</Link></li>
          <li><Link to='/cart'>장바구니</Link></li>
        </ul>
      </header>

      <Routes>
        <Route path='/' element={<Home products={products}/>}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

// npm install react-router-dom
// npm install react-modal
// npm install react-icons
// npm install react-slick slick-carousel

// npm install react-router-dom react-modal react-icons react-slick slick-carousel
// Home, Cart