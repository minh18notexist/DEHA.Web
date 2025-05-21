import React, { useContext, useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { AuthContext } from '../../../../Context/AuthContext'
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"

function AddTransaction() {
    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const [borrowerId, setBorrowerId] = useState("")
    const [borrowerDetails, setBorrowerDetails] = useState([])
    const [bookId, setBookId] = useState("")
    const [bookDetails, setBookDetails] = useState({}) // ✅ NEW
    const [recentTransactions, setRecentTransactions] = useState([])
    const [allMembers, setAllMembers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    const [fromDate, setFromDate] = useState(null)
    const [fromDateString, setFromDateString] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [toDateString, setToDateString] = useState(null)

    const transactionTypes = [
        { value: 'Reserved', text: 'Đặt trước' },
        { value: 'Issued', text: 'Mượn' }
    ]
    const [transactionType, setTransactionType] = useState("")

    const addTransaction = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (bookId !== "" && borrowerId !== "" && transactionType !== "" && fromDate !== null && toDate !== null) {
            const borrower_details = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
            const book_details = await axios.get(API_URL + "api/books/getbook/" + bookId)

            if ((book_details.data.bookCountAvailable > 0 && (transactionType === "Issued" || transactionType === "Reserved")) || (book_details.data.bookCountAvailable === 0 && transactionType === "Reserved")) {
                const transactionData = {
                    bookId,
                    borrowerId,
                    borrowerName: borrower_details.data.userFullName,
                    bookName: book_details.data.bookName,
                    transactionType,
                    fromDate: fromDateString,
                    toDate: toDateString,
                    isAdmin: user.isAdmin
                }
                try {
                    const response = await axios.post(API_URL + "api/transactions/add-transaction", transactionData)

                    if (recentTransactions.length >= 5) {
                        recentTransactions.splice(-1)
                    }

                    await axios.put(API_URL + `api/users/${response.data._id}/move-to-activetransactions`, {
                        userId: borrowerId,
                        isAdmin: user.isAdmin
                    })

                    await axios.put(API_URL + "api/books/updatebook/" + bookId, {
                        isAdmin: user.isAdmin,
                        bookCountAvailable: book_details.data.bookCountAvailable - 1
                    })

                    setRecentTransactions([response.data, ...recentTransactions])
                    setBorrowerId("")
                    setBookId("")
                    setTransactionType("")
                    setFromDate(null)
                    setToDate(null)
                    setFromDateString(null)
                    setToDateString(null)
                    alert("Giao dịch thành công")
                } catch (err) {
                    console.log(err)
                }
            } else {
                alert("Sách tạm thời hết")
            }
        } else {
            alert("Vui lòng điền đầy đủ thông tin")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await axios.get(API_URL + "api/transactions/all-transactions")
                setRecentTransactions(response.data.slice(0, 5))
            } catch (err) {
                console.log("Error in fetching transactions")
            }
        }
        getTransactions()
    }, [API_URL])

    useEffect(() => {
        const getBorrowerDetails = async () => {
            try {
                if (borrowerId !== "") {
                    const response = await axios.get(API_URL + "api/users/getuser/" + borrowerId)
                    setBorrowerDetails(response.data)
                }
            } catch (err) {
                console.log("Error in getting borrower details")
            }
        }
        getBorrowerDetails()
    }, [API_URL, borrowerId])

    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const all_members = await response.data.map(member => (
                    {
                        value: `${member?._id}`,
                        text: `${member?.userType === "Student" ? `${member?.userFullName}[${member?.admissionId}]` : `${member?.userFullName}[${member?.employeeId}]`}`
                    }
                ))
                setAllMembers(all_members)
            } catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    useEffect(() => {
        const getallBooks = async () => {
            const response = await axios.get(API_URL + "api/books/allbooks")
            const allbooks = await response.data.map(book => (
                { value: `${book._id}`, text: `${book.bookName}` }
            ))
            setAllBooks(allbooks)
        }
        getallBooks()
    }, [API_URL])

    // ✅ NEW: Fetch book details when a book is selected
    useEffect(() => {
        const fetchBookDetails = async () => {
            if (bookId !== "") {
                try {
                    const response = await axios.get(API_URL + "api/books/getbook/" + bookId)
                    setBookDetails(response.data)
                } catch (err) {
                    console.log("Error fetching book details:", err)
                }
            }
        }
        fetchBookDetails()
    }, [bookId, API_URL])

    return (
        <div>
            <p className="dashboard-option-title">Thêm giao dịch</p>
            <div className="dashboard-title-line"></div>
            <form className='transaction-form' onSubmit={addTransaction}>
                {/* Người mượn */}
                <label className="transaction-form-label" htmlFor="borrowerId">Người mượn<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn thành viên'
                        fluid
                        search
                        selection
                        value={borrowerId}
                        options={allMembers}
                        onChange={(event, data) => setBorrowerId(data.value)}
                    />
                </div>

                {/* Sách đã mượn */}
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Đã mượn</th>
                            <th>Đã trả</th>
                            <th>Điểm thưởng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{borrowerDetails.userFullName}</td>
                            <td>{borrowerDetails.activeTransactions?.filter(data => data.transactionType === "Issued" && data.transactionStatus === "Active").length}</td>
                            <td>{borrowerDetails.activeTransactions?.filter(data => data.transactionType === "Reserved" && data.transactionStatus === "Active").length}</td>
                            <td>{borrowerDetails.points}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Thông tin các giao dịch đang mượn */}
                <table className="admindashboard-table shortinfo-table" style={borrowerId === "" ? { display: "none" } : {}}>
                    <thead>
                        <tr>
                            <th>Tên sách</th>
                            <th>Loại giao dịch</th>
                            <th>Ngày mượn</th>
                            <th>Ngày trả</th>
                            <th>Phạt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            borrowerDetails.activeTransactions?.filter(data => data.transactionStatus === "Active").map((data, index) => (
                                <tr key={index}>
                                    <td>{data.bookName}</td>
                                    <td>{data.transactionType === "Reserved" ? "Đặt trước" : data.transactionType === "Issued" ? "Mượn" : data.transactionType}</td>
                                    <td>{data.toDate}</td>
                                    <td>{Math.max(0, Math.floor((Date.parse(moment(new Date()).format("MM/DD/YYYY")) - Date.parse(data.toDate)) / 86400000)) * 10}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                {/* Chọn sách */}
                <label className="transaction-form-label" htmlFor="bookName">Tên sách<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn sách'
                        fluid
                        search
                        selection
                        options={allBooks}
                        value={bookId}
                        onChange={(event, data) => setBookId(data.value)}
                    />
                </div>

                {/* ✅ NEW: Hiển thị thông tin sách */}
                <table className="admindashboard-table shortinfo-table" style={bookId === "" ? { display: "none" } : {}}>
                    <thead>
                        <tr>
                            <th>Số bản còn lại</th>
                            <th>Đã mượn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{bookDetails.bookCountAvailable}</td>
                            <td>{bookDetails.bookCountIssued}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Giao dịch */}
                <label className="transaction-form-label" htmlFor="transactionType">Loại giao dịch<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn giao dịch'
                        fluid
                        selection
                        value={transactionType}
                        options={transactionTypes}
                        onChange={(event, data) => setTransactionType(data.value)}
                    />
                </div>
                <br />

                <label className="transaction-form-label" htmlFor="from-date">Ngày mượn sách<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={fromDate}
                    onChange={(date) => {
                        setFromDate(date)
                        setFromDateString(moment(date).format("MM/DD/YYYY"))
                    }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="transaction-form-label" htmlFor="to-date">Hạn trả sách<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={toDate}
                    onChange={(date) => {
                        setToDate(date)
                        setToDateString(moment(date).format("MM/DD/YYYY"))
                    }}
                    minDate={new Date()}
                    dateFormat="MM/dd/yyyy"
                />

                <input className="transaction-form-submit" type="submit" value="SUBMIT" disabled={isLoading}></input>
            </form>

            {/* Giao dịch vừa thêm */}
            <p className="dashboard-option-title">Giao dịch vừa thêm</p>
            <div className="dashboard-title-line"></div>
            <table className="admindashboard-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên sách</th>
                        <th>Tên người mượn</th>
                        <th>Ngày</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recentTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transaction.bookName}</td>
                                <td>{transaction.borrowerName}</td>
                                <td>{transaction.updatedAt.slice(0, 10)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AddTransaction
