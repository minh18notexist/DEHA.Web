import React from 'react'
import './ImageSlider.css'
import { Carousel } from 'react-bootstrap'

function ImageSlider() {
    return (
        <div className='slider'>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://file.hstatic.net/200000821277/file/cac-kich-thuoc-gia-sach-thu-vien-pho-bien.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Hàng ngàn cuốn sách trong tầm tay</h3>
                        <p>Dễ dàng tra cứu và mượn sách bạn yêu thích.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://phapluat.tuoitrethudo.vn/stores/news_dataimages/nguyenducminh/072023/24/19/thu-vien-go22023072415115220230724195026.4535230.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Quản lý thư viện hiệu quả</h3>
                        <p>Theo dõi sách đã mượn, hạn trả và nhiều hơn thế nữa.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://image.phunuonline.com.vn/fckeditor/upload/2023/20230330/images/hoc-sinh-ham-doc-sach-khong-_281680195933.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Khơi dậy tri thức qua từng trang sách</h3>
                        <p>Mỗi cuốn sách là một cánh cửa mở ra tri thức và tưởng tượng.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default ImageSlider
