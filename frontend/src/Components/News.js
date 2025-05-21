import React from 'react'
import './News.css'

function News() {
    return (
        <div className='news-container'>
            <h className='news-title'>Cập nhật dành cho bạn</h>
            <div className='news-data'>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Cuộc Thi</h1>
                    <div>
                        <div className='news-competition-event'>
                            <p><strong>Marathon Đọc Sách</strong></p>
                            <p>Tham gia cuộc thi đọc sách kéo dài 30 ngày, ghi chú và chia sẻ cảm nhận để nhận phần thưởng hấp dẫn!<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-competition-event'>
                            <p><strong>Viết Cảm Nhận Sách</strong></p>
                            <p>Viết bài cảm nhận hoặc đánh giá sách yêu thích, bài viết hay nhất sẽ được đăng trên website thư viện.<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-competition-event'>
                            <p><strong>Tìm Kho Báu Trong Thư Viện</strong></p>
                            <p>Trò chơi tìm sách theo manh mối trong thư viện, vừa vui vừa học!<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-competition-event'>
                            <p><strong>Thiết Kế Bookmark</strong></p>
                            <p>Thiết kế bookmark sáng tạo theo chủ đề “Thế giới sách” – dành cho mọi lứa tuổi.<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-competition-event'>
                            <p><strong>Viết Truyện Ngắn</strong></p>
                            <p>Viết truyện ngắn với chủ đề “Cuốn sách thay đổi cuộc đời tôi”.<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
                <div>
                    <h1 className='news-subtitle'>Câu hỏi trực tuyến</h1>
                    <div>
                        <div className='news-quiz-event'>
                            <p><strong>Kiến Thức Thư Viện</strong></p>
                            <p>
                                Bạn có biết các quy định cơ bản của thư viện không?<br></br>
                                <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>                                </p>                            
                        </div>
                        <div className='news-quiz-event'>
                            <p>Tác Giả Nổi Tiếng</p>
                            <p>Bạn có nhận ra tác phẩm của các nhà văn nổi tiếng? </p><br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Thể Loại Sách</p>
                            <p>Thử sức với những câu hỏi thú vị về các thể loại sách phổ biến.<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Dòng Thời Gian Văn Học</p>
                            <p>Sắp xếp đúng trình tự xuất bản của các tác phẩm nổi tiếng.<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                        <div className='news-quiz-event'>
                            <p>Đoán Tên Sách Qua Câu Mở Đầu</p>
                            <p>Bạn có thể đoán đúng tên cuốn sách chỉ qua dòng đầu tiên?<br></br>
                            <a href="https://www.youtube.com/watch?v=tU2wpdZnb5U" target="_blank" rel="noopener noreferrer">Tham gia ngay!</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='news-empty'></div>
            </div>
        </div>
    )
}

export default News
