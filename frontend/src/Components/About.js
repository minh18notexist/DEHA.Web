import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">Giới thiệu về Thư viện</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="https://lic.vnu.edu.vn/templates/lic.vnu.edu.vn/images/news/banner-introduce.jpg" alt="" />
                </div>
                <div>
                    <p className="about-text">
                        Chào mừng bạn đến với Thư viện của chúng tôi – nơi lưu giữ và lan toả tri thức!
                        Chúng tôi cung cấp hàng ngàn đầu sách thuộc nhiều lĩnh vực như văn học, khoa học, lịch sử, công nghệ, kỹ năng sống... dành cho học sinh, sinh viên và người yêu sách.<br>
                        </br>
                        <br></br>
                        Với giao diện dễ sử dụng và chức năng tìm kiếm tiện lợi, bạn có thể dễ dàng tra cứu, mượn và đọc sách một cách nhanh chóng.
                        Chúng tôi không ngừng cập nhật kho sách để mang đến cho bạn những cuốn sách chất lượng, phù hợp với nhu cầu học tập và giải trí.
                        <br></br>
                        <br></br>
                        Chúng tôi luôn lắng nghe và trân trọng mọi ý kiến đóng góp từ bạn đọc. Sự góp ý của bạn chính là động lực giúp chúng tôi không ngừng cải thiện để mang đến một không gian học tập và đọc sách tốt hơn mỗi ngày.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
