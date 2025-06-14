import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Home.css';

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
                
            </div>
        </div>
    )
}