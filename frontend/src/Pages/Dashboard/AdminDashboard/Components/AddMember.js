import React, { useEffect, useState } from 'react'
import "../AdminDashboard.css"
import axios from "axios"
import { Dropdown } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

function AddMember() {

    const API_URL = process.env.REACT_APP_API_URL
    const [isLoading, setIsLoading] = useState(false)

    const [userFullName, setUserFullName] = useState(null)
    const [admissionId, setAdmissionId] = useState(null)
    const [employeeId, setEmployeeId] = useState(null)
    const [address, setAddress] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [mobileNumber, setMobileNumber] = useState(null)
    const [recentAddedMembers, setRecentAddedMembers] = useState([])
    const [userType, setUserType] = useState(null)
    const [gender, setGender] = useState(null)
    const [age, setAge] = useState(null)
    const [dob, setDob] = useState(null)
    const [dobString, setDobString] = useState(null)


    const genderTypes = [
        { value: "Male", text: "Nam" },
        { value: "Female", text: "Nữ" }
    ]

    const userTypes = [
        { value: 'Staff', text: 'Nhân viên quản lý' },
        { value: 'Student', text: 'Học sinh' }
    ]

    //Add a Member
    const addMember = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (userFullName !== null && userType !== null && age !== null && dobString !== null && gender !== null && address !== null && mobileNumber !== null && email !== null && password !== null) {
            const userData = {
                userType: userType,
                userFullName: userFullName,
                admissionId: admissionId,
                employeeId: employeeId,
                age: age,
                dob: dobString,
                gender: gender,
                address: address,
                mobileNumber: mobileNumber,
                email: email,
                password: password
            }
            try {
                const response = await axios.post(API_URL + "api/auth/register", userData)
                if (recentAddedMembers.length >= 5) {
                    recentAddedMembers.splice(-1)
                }
                setRecentAddedMembers([response.data, ...recentAddedMembers])
                setUserFullName(null)
                setUserType("Student")
                setAdmissionId(null)
                setEmployeeId(null)
                setAddress(null)
                setMobileNumber(null)
                setEmail(null)
                setPassword(null)
                setGender(null)
                setAge(null)
                setDob(null)
                setDobString(null)
                alert("Đã thêm thành viên")
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            alert("Vui lòng nhập đầy đủ thông tin")
        }
        setIsLoading(false)
    }

    //Fetch Members
    useEffect(() => {
        const getMembers = async () => {
            try {
                const response = await axios.get(API_URL + "api/users/allmembers")
                const recentMembers = await response.data.slice(0, 5)
                setRecentAddedMembers(recentMembers)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMembers()
    }, [API_URL])

    return (
        <div>
            <p className="dashboard-option-title">Thêm thành viên</p>
            <div className="dashboard-title-line"></div>
            <form className="addmember-form" onSubmit={addMember}>
            <label className="addmember-form-label" htmlFor="userType">Vai trò<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn vai trò'
                        fluid
                        selection
                        options={userTypes}
                        onChange={(event, data) => setUserType(data.value)}
                    />
                </div>
                <label className="addmember-form-label" htmlFor="userFullName">Họ tên<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" name="userFullName" value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor={userType === "Student" ? "admissionId" : "employeeId"}>{userType === "Student" ? "Mã học sinh" : "Mã nhân viên"}<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={userType === "Student" ? admissionId : employeeId} required onChange={(e) => { userType === "Student" ? setAdmissionId(e.target.value) : setEmployeeId(e.target.value) }}></input><br />

                <label className="addmember-form-label" htmlFor="mobileNumber">Số điện thoại<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={mobileNumber} required onChange={(e) => setMobileNumber(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="gender">Giới tính<span className="required-field">*</span></label><br />
                <div className='semanticdropdown'>
                    <Dropdown
                        placeholder='Chọn giới tính'
                        fluid
                        selection
                        value={gender}
                        options={genderTypes}
                        onChange={(event, data) => setGender(data.value)}
                    />
                </div>

                <label className="addmember-form-label" htmlFor="age">Tuổi<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="text" value={age} required onChange={(e) => setAge(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="dob">Ngày sinh<span className="required-field">*</span></label><br />
                <DatePicker
                    className="date-picker"
                    placeholderText="MM/DD/YYYY"
                    selected={dob}
                    onChange={(date) => { setDob(date); setDobString(moment(date).format("MM/DD/YYYY")) }}
                    dateFormat="MM/dd/yyyy"
                />

                <label className="addmember-form-label" htmlFor="address">Địa chỉ<span className="required-field">*</span></label><br />
                <input className="addmember-form-input address-field" value={address} type="text" required onChange={(e) => setAddress(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="email">Email<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="email" value={email} required onChange={(e) => setEmail(e.target.value)}></input><br />

                <label className="addmember-form-label" htmlFor="password">Mật khẩu<span className="required-field">*</span></label><br />
                <input className="addmember-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input><br />

                <input className="addmember-submit" type="submit" value="XÁC NHẬN" disabled={isLoading} ></input>

            </form>
            <p className="dashboard-option-title">Thêm thành viên</p>
            <div className="dashboard-title-line"></div>
            <table className='admindashboard-table'>
                <tr>
                    <th>STT</th>
                    <th>Vai trò</th>
                    <th>ID thành viên</th>
                    <th>Tên thành viên</th>
                </tr>
                {
                    recentAddedMembers.map((member, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{member.userType}</td>
                                <td>{member.userType === "Student" ? member.admissionId : member.employeeId}</td>
                                <td>{member.userFullName}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default AddMember
