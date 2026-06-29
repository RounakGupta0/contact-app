import axios from "axios"
import { useEffect, useState } from "react"
import swal from "sweetalert"

const Contact = () => {

    const [ContactList, setContactList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editing, setEditing] = useState(false)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('Male')
    const [id, setId] = useState('')
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')

    useEffect(() => {
        getContact()
    }, []);

    const getContact = () => {
        axios.get("https://contact-api-87n4.onrender.com/api/contacts")
            .then((res) => {
                console.log(res.data.data)
                setContactList(res.data.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }

    const submitHandler = (e) => {
        setIsLoading(true)
        e.preventDefault();

        // const newcontact = {
        //     name: fullName,
        //     email: email,
        //     phone: phone,
        //     address: address,
        //     gender: gender
        // }

        const newcontact = new FormData()
        newcontact.append('name', fullName)
        newcontact.append('email', email)
        newcontact.append('phone', phone)
        newcontact.append('address', address)
        newcontact.append('gender', gender)
        if (file) {
            newcontact.append('profilePic', file)
        }

        if (editing) {
            axios.put("https://contact-api-87n4.onrender.com/api/contacts/" + id, newcontact, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    swal("Contact Updated!", "Contact updated Succcesfully!", "success");
                    console.log(res)
                    removeValue()
                    getContact()
                    setIsLoading(false)
                    setEditing(false)
                    console.log(res)
                })
                .catch((err) => {
                    swal("Something went wrong", "An Error occured while editing the Contact...!", "error");
                    console.log(err)
                    removeValue()
                    setIsLoading(false)
                    setEditing(false)
                })
        }
        else {
            axios.post("https://contact-api-87n4.onrender.com/api/contacts", newcontact, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    swal("Contact Added!", "New Contact Added!", "success");
                    removeValue()
                    console.log(res)
                    getContact()
                    setIsLoading(false)
                })
                .catch((err) => {
                    swal("Something went wrong", "An Error occured while adding the Contact...!", "error");
                    removeValue()
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }

    const deleteHandler = (data) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover the contact with email : " + data.email,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                console.log('hello')
                if (willDelete) {
                    setIsLoading(true)
                    axios.delete('https://contact-api-87n4.onrender.com/api/contacts/' + data._id)
                        .then(res => {
                            setIsLoading(false)
                            swal("Deleted", `${data.name} deleted`, "success");
                            getContact()
                        })
                        .catch(err => {
                            setIsLoading(false)
                            swal("Error", "Something is Wrong..", "error");
                        })
                }
            });
    }

    const removeValue = () => {
        setFullName('')
        setEmail('')
        setGender('Male')
        setPhone('')
        setAddress('')
        setId('')
        setFile(null)
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl('')
        }
        document.getElementById('contactForm').reset()
    }

    const handleFileChange = (e) => {
        const selected = e.target.files[0]
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
        }
        if (selected) {
            setFile(selected)
            setPreviewUrl(URL.createObjectURL(selected))
        } else {
            setFile(null)
            setPreviewUrl('')
        }
    }

    const edit = (data) => {
        setFullName(data.name)
        setEmail(data.email)
        setAddress(data.address)
        setGender(data.gender)
        setPhone(data.phone)
        setId(data._id)
        setEditing(true)
    }

    return (
        <div className="contact">
            <div className="ContactList-wrapper">
                <div className="ContactList-header">
                    <h2>Contact List</h2>
                </div>
                {
                    isLoading ?
                        <div className="loader">
                            <div className="loader-spinner"></div>
                        </div>
                        :
                        (
                            ContactList.length === 0 ? <div className="no-contacts">
                                <p>No Contact Found</p>
                            </div> :
                                <table >
                                    <thead>
                                        <tr>
                                            <th>Profile Pic</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Gender</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ContactList.map((data) =>
                                                <tr key={data._id}>
                                                    <td><img src={data.profilePic} alt="profilepic" className="profilepic-img" /></td>
                                                    <td>{data.name}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.address}</td>
                                                    <td>{data.gender}</td>
                                                    <td><button className="edit-btn" onClick={() => { edit(data) }}><span><i className="fa-solid fa-pen-to-square"></i></span>Edit</button></td>
                                                    <td><button className="delete-btn" onClick={() => { deleteHandler(data) }}><span><i className="fa-solid fa-trash-can"></i></span>Delete</button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        )
                }
            </div>

            <div className="ContactForm-wrapper">
                <div className="ContactForm-header">
                    <h2>{editing ? 'Edit Contact' : 'Add Contact'}</h2>
                    {editing && <button type="button" onClick={() => { removeValue(); setEditing(false) }} className="cancel-btn"><i className="fa-solid fa-xmark"></i></button>}
                </div>
                <form id="contactForm" onSubmit={submitHandler}>
                    <input required value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="Full Name" />
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" />
                    <input required value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <div>
                        <input type="file" onChange={handleFileChange} />
                        <p className="file-note">Please choose file size 5mb or less</p>
                        {previewUrl && (
                            <div className="image-preview">
                                <img src={previewUrl} alt="Profile preview" />
                            </div>
                        )}
                    </div>
                    <button type="submit" className="submit-btn">{isLoading && <span><i className="fa-solid fa-spinner fa-spin"></i></span>}Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact