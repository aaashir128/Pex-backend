import React,{ useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown, Modal} from 'react-bootstrap';
import swal from "sweetalert";
import {nanoid} from 'nanoid';

//Images
import user from './../../../images/blank.jpg';
import pic1 from './../../../images/pic1.jpg';
import pic2 from './../../../images/pic2.jpg';
import pic3 from './../../../images/pic3.jpg';
import pic4 from './../../../images/pic4.jpg';

const ProfileBlog = [
	{ id:1 ,image: pic1 , title:'Lincoln Donin', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:2 ,image: pic2 , title:'Cristofer Siphron', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:3 ,image: pic3 , title:'Marilyn Ekstrom', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:4 ,image: pic4 , title:'Charlie Gouse', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:5 ,image: pic2 , title:'Cristofer Siphron', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:6 ,image: pic3 , title:'Marilyn Ekstrom', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:7 ,image: pic4 , title:'Charlie Gouse', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:8 ,image: pic1 , title:'Lincoln Donin', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:9 ,image: pic2 , title:'Marilyn Ekstrom', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:10 ,image: pic3 , title:'Charlie Gouse', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:11 ,image: pic1 , title:'Cristofer Siphron', mobile: '12 345 6789 0', gmail:"lincolndonin"},
	{ id:12 ,image: pic4 , title:'Marilyn Ekstrom', mobile: '12 345 6789 0', gmail:"lincolndonin"},
];

const Clients = () =>{
	const [postModal, setPostModal] = useState(false);
	const [contacts, setContacts] = useState(ProfileBlog);
	// delete data  
    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];    
        const index = contacts.findIndex((contact)=> contact.id === contactId);
        newContacts.splice(index, 1);
        setContacts(newContacts);
    }
    //Add data 
    const [addFormData, setAddFormData ] = useState({
		image:'',
        title:'',
		mobile:'',	
		gmail:'',
    }); 
    // Add contact function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';
        if(addFormData.title === ""){
            error = true;
			errorMsg = 'Please fill name';
        }else if(addFormData.mobile === ""){
            error = true;
			errorMsg = 'Please fill mobile no.';
        }
        else if(addFormData.gmail === ""){
            error = true;
			errorMsg = 'Please fill gmail';
        }
        if(!error){
            const newContact = {
                id: nanoid(),
				image: addFormData.image,
                title: addFormData.title,
                mobile:  addFormData.mobile,
                gmail:  addFormData.gmail ,
            };
            const newContacts = [...contacts, newContact];
            setContacts(newContacts);
            setPostModal(false);
            swal('Good job!', 'Successfully Added', "success");
            addFormData.title = addFormData.mobile = addFormData.gmail = '';         
        }else{
			swal('Oops', errorMsg, "error");
		}
    }; 
	
    const [editModal, setEditModal] = useState(false);
    // Edit function editable page loop
    const [editContactId, setEditContactId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);
        const formValues = {
			image: contact.image,
            title: contact.title,
            mobile: contact.mobile,
            gmail: contact.gmail,
        }
        setEditFormData(formValues);
        setEditModal(true);
    };    
    // edit  data  
    const [editFormData, setEditFormData] = useState({
		image:'',
        title:'',
        mobile:'',
        gmail:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedContact = {
            id: editContactId,
            title: editFormData.title,
            mobile: editFormData.mobile,
            gmail: editFormData.gmail,
			image: editFormData.image,
        }
        const newContacts = [...contacts];
        const index = contacts.findIndex((contact)=> contact.id === editContactId);
        newContacts[index] = editedContact;
        setContacts(newContacts);
        setEditContactId(null);
        setEditModal(false);    
    }
    
	//For Image upload in ListBlog
	const [file, setFile] = React.useState(null)
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
		setTimeout(function(){
			var src = document.getElementById("saveImageFile").getAttribute("src");
			addFormData.image = src; 
		}, 200);
    }
	return(
		<>
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<div className="input-group contacts-search mb-4">
					<input type="text" className="form-control" placeholder="Search here..." />
					<span className="input-group-text"><Link to={"#"}><i className="flaticon-381-search-2"></i></Link></span>
				</div>
				<div className="mb-4">
					<Link to={"#"} className="btn btn-primary btn-rounded fs-18" onClick={()=> setPostModal(true)}>+ New Contact</Link>
				</div>
				<Modal className="modal fade"  show={postModal} onHide={setPostModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Add Task</h4>
									<button type="button" className="btn-close" onClick={()=> setPostModal(false)} data-dismiss="modal"></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
											<div className="image-placeholder">	
												<div className="avatar-edit">
													<input type="file" onChange={fileHandler} id="imageUpload" 
														onClick={(event) => setFile(event.target.value)}
													/> 					
													<label htmlFor="imageUpload" name=''  ></label>
												</div>
												<div className="avatar-preview">
													<div id="imagePreview">
														<img id="saveImageFile" src={file? URL.createObjectURL(file) : user} 
															alt={file? file.name : null}
														/>
													</div>
												</div>
											</div> 
											 <div className="form-group mb-3">
												<label className="text-black font-w500">Client Name</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autoComplete="off"
														name="title" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="name"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Contact No.</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autoComplete="off"
														name="mobile" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="number"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Your Gmail</label>
												<div className="contact-occupation">
													<input type="text"   autoComplete="off"
                                                        onChange={handleAddFormChange}
														name="gmail" required="required"
														className="form-control" placeholder="gmail" 
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>  
                                    <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
								</div>
							</form>
                            
						</div>
					</div>
				</Modal>
                <Modal className="modal fade"  show={editModal} onHide={setEditModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Edit Task</h4>
									<button type="button" className="btn-close" onClick={()=> setEditModal(false)} ></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
									<div className="add-contact-box">
										<div className="add-contact-content">
											<div className="form-group mb-3">
												<label className="text-black font-w500">Client Name</label>
												<div className="contact-name">
													<input type="text"  className="form-control"  autoComplete="off"
														name="title" required="required"
                                                        value={editFormData.title}
                                                        onChange={handleEditFormChange}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Contact No</label>
												<div className="contact-name">
													<input type="text" className="form-control" autoComplete="off"
														name="mobile" required="required"
                                                        value={editFormData.mobile}
                                                        onChange={handleEditFormChange}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Your Gmail</label>
												<div className="contact-occupation">
													<input type="text" autoComplete="off"
                                                        value={editFormData.gmail}
                                                        onChange={handleEditFormChange}
														name="gmail" required="required"
														className="form-control" placeholder="name" 
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>  
                                    <button type="button" onClick={()=> setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
								</div>
							</form>
                            
						</div>
					</div>
				</Modal>
			</div>	
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						{contacts.map((contact, index)=>(
							<div className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6 items" key={index}>
								<div className="card contact-bx item-content">
									<div className="card-body user-profile pb-0">
										<div className="d-flex align-items-center">											
											<div className="image-bx">
												<img src={contact.image} alt="" className="rounded-circle" />
												<span className="active"></span>												
											</div>
											<div className="ms-3 text-start">
												<h4 className="fs-18 font-w600">{contact.title}</h4>
												<span className="mb-2 d-block">@lincolndonin</span>
												<span className="text-primary d-block">Kleon Studios</span>
											</div>
											<Dropdown className="ms-auto">
												<Dropdown.Toggle variant="" as="div" className="btn-link i-false" >	
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
														<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
													</svg>                                  
												</Dropdown.Toggle>	
												<Dropdown.Menu alignRight={true} className="dropdown-menu-right">
													<Dropdown.Item 
														onClick={(event) => handleEditClick(event, contact)}
													>Edit
													</Dropdown.Item>
													<Dropdown.Item className="text-danger"
														onClick={()=>handleDeleteClick(contact.id)}
													>Delete
													</Dropdown.Item>		
												</Dropdown.Menu>	
											</Dropdown>
										</div>	
										<div className="user-meta-info">
											<ul>
												<li><Link to={"#"}><i className="fas fa-phone-alt"></i></Link>+{contact.mobile}</li>
												<li><Link to={"#"}><i className="far fa-comment-alt"></i></Link>{contact.gmail}@mail.com</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>	
					<div className="progect-pagination d-flex justify-content-between align-items-center flex-wrap mt-3">
						<h4 className="mb-3">Showing 12 from 24 data</h4>
						<ul className="pagination mb-3">
							<li className="page-item page-indicator">
								<Link to={"#"} className="page-link"><i className="fas fa-angle-double-left me-2"></i>Previous</Link>
							</li>
							<li className="page-item"><Link to={"#"} className="page-link active">1</Link></li>
							<li className="page-item"><Link to={"#"} className="page-link">2</Link></li>
							<li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
							<li className="page-item"><Link to={"#"} className="page-link">4</Link></li>
							
							<li className="page-item page-indicator">
								<Link to={"#"} className="page-link">Next<i className="fas fa-angle-double-right ms-2"></i></Link>
							</li>
						</ul>
					</div>
				</div>	
			</div>	
		</>
	)
}
export default Clients;