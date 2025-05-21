import React, { useContext, useEffect, useState } from 'react';
import "../AdminDashboard.css";
import axios from "axios";
import { AuthContext } from '../../../../Context/AuthContext';
import { Dropdown } from 'semantic-ui-react';

function AddBook() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [bookName, setBookName] = useState("");
  const [alternateTitle, setAlternateTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookCountAvailable, setBookCountAvailable] = useState(null);
  const [language, setLanguage] = useState("");
  const [publisher, setPublisher] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [recentAddedBooks, setRecentAddedBooks] = useState([]);

  // ✅ Gộp việc fetch categories & books vào cùng 1 useEffect để không cần dependency bên ngoài
  useEffect(() => {
    // Lấy tất cả category
    const fetchCategories = async () => {
      try {
        const res = await axios.get(API_URL + "api/categories/allcategories");
        setAllCategories(
          res.data.map(cat => ({ value: cat._id, text: cat.categoryName }))
        );
      } catch (err) {
        console.error("❌ Lỗi khi tải category:", err);
      }
    };

    // Lấy 5 sách mới nhất
    const fetchBooks = async () => {
      try {
        const res = await axios.get(API_URL + "api/books/allbooks");
        setRecentAddedBooks(res.data.slice(0, 5));
      } catch (err) {
        console.error("❌ Lỗi khi load sách:", err);
      }
    };

    fetchCategories();
    fetchBooks();
  }, [API_URL]);

  // Thêm sách
  const addBook = async e => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      bookName,
      alternateTitle,
      author,
      bookCountAvailable,
      language,
      publisher,
      categories: selectedCategories,
      isAdmin: user.isAdmin,
    };

    try {
      const { data } = await axios.post(API_URL + "api/books/addbook", payload);
      setRecentAddedBooks(prev => {
        const list = [data, ...prev];
        return list.slice(0, 5);
      });
      // reset form
      setBookName("");
      setAlternateTitle("");
      setAuthor("");
      setBookCountAvailable(null);
      setLanguage("");
      setPublisher("");
      setSelectedCategories([]);
      alert("Thêm sách thành công!");
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <p className="dashboard-option-title">Thêm sách</p>
      <div className="dashboard-title-line"></div>
      <form className="addbook-form" onSubmit={addBook}>
        <label className="addbook-form-label" htmlFor="bookName">
          Tên sách<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="bookName"
          type="text"
          value={bookName}
          onChange={e => setBookName(e.target.value)}
          required
        />
        <br />

        <label className="addbook-form-label" htmlFor="alternateTitle">
          Tiêu đề thay thế
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="alternateTitle"
          type="text"
          value={alternateTitle}
          onChange={e => setAlternateTitle(e.target.value)}
        />
        <br />

        <label className="addbook-form-label" htmlFor="author">
          Tên tác giả<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="author"
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <br />

        <label className="addbook-form-label" htmlFor="language">
          Ngôn ngữ
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="language"
          type="text"
          value={language}
          onChange={e => setLanguage(e.target.value)}
        />
        <br />

        <label className="addbook-form-label" htmlFor="publisher">
          Nhà xuất bản
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="publisher"
          type="text"
          value={publisher}
          onChange={e => setPublisher(e.target.value)}
        />
        <br />

        <label className="addbook-form-label" htmlFor="copies">
          Số lượng sách hiện có<span className="required-field">*</span>
        </label>
        <br />
        <input
          className="addbook-form-input"
          id="copies"
          type="number"
          value={bookCountAvailable || ""}
          onChange={e => setBookCountAvailable(e.target.value)}
          required
        />
        <br />

        <label className="addbook-form-label" htmlFor="categories">
          Thể loại<span className="required-field">*</span>
        </label>
        <br />
        <div className="semanticdropdown">
          <Dropdown
            placeholder="Chọn thể loại"
            fluid
            multiple
            search
            selection
            options={allCategories}
            value={selectedCategories}
            onChange={(e, { value }) => setSelectedCategories(value)}
          />
        </div>

        <input
          className="addbook-submit"
          type="submit"
          value="XÁC NHẬN"
          disabled={isLoading}
        />
      </form>

      <div>
        <p className="dashboard-option-title">Sách đã thêm</p>
        <div className="dashboard-title-line"></div>
        <table className="admindashboard-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sách</th>
              <th>Ngày thêm </th>
            </tr>
          </thead>
          <tbody>
            {recentAddedBooks.map((book, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.createdAt?.substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddBook;
