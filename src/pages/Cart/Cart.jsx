import './Cart.css';

export default function Cart(){
    // 로컬스토리지의 my_shop_cart 의 내용을 읽어서
    // useState로 만든다음 테이블 형식으로 보여준다
    // No, 사진, 품명, 수량, 가격, 총액 <table>
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
                    <tr>을 map으로 반복시켜서</tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>총금액 0원</td>
                        <td>결제하기버튼</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
