import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>Chào mừng đến với Thư viện</p>
            <p className='welcome-message'>Khám phá kho tàng tri thức<br/>
            <span className='welcome-submessage'>Hãy chọn một cuốn sách để đọc</span></p>
        </div>
    )
}

export default WelcomeBox
