import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Home.css';
import { FaCartPlus } from "react-icons/fa";

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
                            <div key={item.id} className='Home_items'>
                                <img src={item.image} alt={item.title}/>
                                <b>{item.title}</b>
                                <p>{`${item.price * 1300} 원`}</p>
                                <button onClick={(event)=>{hSaveCart(event, item)}}><FaCartPlus /></button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}