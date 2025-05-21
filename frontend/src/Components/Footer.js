import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1>Liên hệ</h1>
                        <p>Thủ thư: Vũ Đức Minh</p>
                        <p>Trường: Đại học Việt Nhật (VJU)</p>
                        <p>SĐT: 0240989809</p>
                        <p>Địa chỉ: Cầu Giấy, Hà Nội, Việt Nam  </p>
                        <p><b>Email:</b>minhkhir@gmail.com</p>
                    </div>
                    <div className='usefull-links'>
                        <h1>Liên kết hữu ích</h1>
                        <a href="https://nettruyenvio.com/">Trang chủ Thư Viện</a>
                        <a href="https://nettruyenvio.com/">Danh sách sách mới</a>
                        <a href="https://nettruyenvio.com/">Hướng dẫn sử dụng Thư Viện </a>
                    </div>
                    <div className='librarian-details'>
                        <h1>Thông tin thủ thư</h1>
                        <p>Tên: Vũ Đức Minh</p>
                        <p>Trình độ: Cử nhân Khoa Học Máy Tính</p>
                        <p>Liên hệ: 09123456787</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='https://x.com/?logout=1745102899914' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='https://web.telegram.org/k/' className='social-icon'><TelegramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='https://www.instagram.com/?flo=true' className='social-icon'><InstagramIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                    <a href='https://www.facebook.com/?locale=vi_VN' className='social-icon'><FacebookIcon style={{ fontSize: 40,color:"rgb(283,83,75)"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p>Cảm ơn đã đồng hành cùng Thư Viện!<br /><span>Chúc bạn luôn tìm được nguồn cảm hứng và tri thức quý giá trong từng trang sách.</span></p>
            </div>
        </div>
    )
}

export default Footer