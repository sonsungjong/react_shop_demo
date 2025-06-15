import { useEffect, useState } from 'react';
import './Cart.css';

export default function Cart(){
    // 로컬스토리지의 my_shop_cart 의 내용을 읽어서
    // useState로 만든다음 테이블 형식으로 보여준다
    // No, 사진, 품명, 수량, 가격, 총액 <table>
    const [cart, setCart] = useState([]);

    // 장바구니 페이지로 들어왔을때 데이터를 받아오기 위해서
    // useEffect: 컴포넌트 생성될때, 제거될때, 상태변수 변경될때
    useEffect(()=>{
        const cartData = localStorage.getItem('my_shop_cart')
        if(cartData){
            // 로컬 스토리지에는 JSON 형태로 저장했으니까 복원해서 담기
            setCart(JSON.parse(cartData));
            console.log(cartData);
        }
    } , []);

    function hMinus(index){
        // 해당 항목에 대한 qty를 1개 줄인다
        const copyCart = [...cart];
        copyCart[index].qty -= 1;
        
        // 만약 1 미만으로 떨어지면 항목을 제거한다
        if(copyCart[index].qty < 1){
            copyCart.splice(index, 1);      // index로부터 1개까지 없앤다
        }

        // 상태변수에 적용
        setCart(copyCart);

        // 로컬스토리지에도 기록한다
        localStorage.setItem('my_shop_cart', JSON.stringify(copyCart));
    }

    function hPlus(index){
        // 해당 항목에 대한 qty를 1개 증가시킨다
        const copyCart = [...cart];
        copyCart[index].qty += 1;
        
        // 상태변수 적용
        setCart(copyCart);

        // 로컬스토리지에도 기록한다
        localStorage.setItem('my_shop_cart', JSON.stringify(copyCart));
    }

    // 모든 항목의 총금액을 계산하는 함수
    function getTotal(cart){
        let totalAmount = 0;

        if (!cart || cart.length === 0) {
            return 0;
        }

        cart.forEach(item => {
            totalAmount += (item.price * 1300) * item.qty;
        });

        return totalAmount; 
    }

    return (
        <div className='Cart_container'>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>사진</th>
                        <th>품명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>총금액</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((item, index)=>{
                            return (
                                <tr key={item.id} className='Cart_item'>
                                    <td>{index + 1}</td>
                                    <td><img src={item.image}/></td>
                                    <td>{item.title}</td>
                                    <td>
                                        <button onClick={()=>{hMinus(index)}}>-</button>
                                        <span>{item.qty}</span>
                                        <button onClick={()=>{hPlus(index)}}>+</button>
                                    </td>
                                    <td>{`${item.price * 1300} 원`}</td>
                                    <td>{`${item.price * 1300 * item.qty} 원`}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>총금액 {`${getTotal(cart)} 원`}</td>
                        <td><button>결제하기</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
