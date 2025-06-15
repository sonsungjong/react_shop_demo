import ReactModal from 'react-modal';
import './ItemModal.css';
import { FaCartPlus } from "react-icons/fa";

// npm install react-modal
// closeDetailModal, openModal, modalItem, hSaveCart

export default function ItemModal(props)
{
    return(
        <div className='ItemModal_container'>
            <ReactModal 
                className='item_detail_modal'
                overlayClassName='modal_background'
                isOpen={props.openModal}
                onRequestClose={props.closeDetailModal}
                shouldCloseOnOverlayClick={true}
                contentLabel="detail modal"
                ariaHideApp={false}
            >
                {/* 이미지, title, description, price*1300, 장바구니추가버튼 */}
                <div className='item_detail_modal_content'>
                    <img src={props.modalItem?.image}/>
                    <h3>{props.modalItem?.title}</h3>
                    <p>{props.modalItem?.description}</p>
                    <b>{`${props.modalItem?.price * 1300} 원`}</b>
                    <button onClick={(event)=>{props.hSaveCart(event, props.modalItem)}}>
                        <FaCartPlus />
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}