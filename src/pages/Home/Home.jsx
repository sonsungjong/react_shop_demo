import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Home.css';
import { FaCartPlus } from "react-icons/fa";
import { useState } from 'react';
import ItemModal from '../../components/ItemModal/ItemModal.jsx';

// npm install react-modal <ReactModal></ReactModal>

export default function Home(props){
    // props.products 배열

    // 카로셀 설정값
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    function hSaveCart(event, product) {
        // 이벤트 버블링 방지
        event.stopPropagation();
        // 기존에 있는 my_shop_cart 로컬스토리지를 가져오고 (없으면 빈배열)
        // && : 앞에꺼가 틀리면 어차피 틀려서 뒤에꺼 무시
        // || : 앞에꺼 맞으면 어차피 맞아서 뒤에꺼 무시
        const cart = JSON.parse(localStorage.getItem('my_shop_cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        localStorage.setItem('my_shop_cart', JSON.stringify(cart));

        console.log('장바구니 업데이트됨:', cart);
        alert(`${product.title}이 장바구니에 추가되었습니다!`); 
    }

    const [openModal, setOpenModal] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    function openDetailModal(item){
        // 아이템 내용을 state에 저장하고
        // 모달창체크를 true로 만든다
        setModalItem(item);
        setOpenModal(true);
    }

    function closeDetailModal(){
        // 모달창체크를 false로 만들고
        // 아이템 내용을 null로 비워준다
        setOpenModal(false);
        setModalItem(null);
    }

    return(
        <div className='Home_container'>
            {/* props.products 배열을 react-slick으로 카로셀 */}
            <div className='Home_slider_container'>
                <Slider {...sliderSettings} className='Home_slider'>
                    {
                        props.products?.map((item, index)=>{
                            return(
                                <div key={item.id} className='Home_slider_item'>
                                    <img src={item.image}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>

            {/* 
                props.products 배열을 grid로 한 행에 5개 
                이미지(200, 200), title, price, 가장 밑에 버튼
            */}
            <div className='Home_grid_container'>
                {
                    // map 배열반복문을 통해서
                    props.products?.map((item, index)=>{
                        return(
                            <div key={item.id} className='Home_items' onClick={()=>{openDetailModal(item)}}>
                                <img src={item.image} alt={item.title}/>
                                <b>{item.title}</b>
                                <p>{`${item.price * 1300} 원`}</p>
                                <button onClick={(event)=>{hSaveCart(event, item)}}><FaCartPlus /></button>
                            </div>
                        )
                    })
                }
            </div>

            {/* 
                클릭한 상품의 디테일 내역을 모달창을 통해 보여준다
                모달창이 열려있을때만 보여줄 컴포넌트 <ReactModal></ReactModal>
                이미지, title, description, price*1300, 장바구니추가버튼
            */}

            { 
                openModal && (
                    <ItemModal closeDetailModal={closeDetailModal}
                                openModal={openModal}
                                modalItem={modalItem}
                                hSaveCart={hSaveCart}
                    ></ItemModal>
                )
            }
            
        </div>
    )
}