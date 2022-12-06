import React from 'react';
import {Link} from 'react-router-dom';

const Editable = ({editFormData, handleEditFormChange, handleCancelClick}) =>{
    return(
        <>
            <>
				<td></td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a name ..." name="name" 
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                    />
                </td>   
                <td>
                    <input type="text" required = "required" placeholder = "Enter a department ..." name="department" 
                        value={editFormData.department}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a gender ..." name="gender" 
                        value={editFormData.gender}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>
                    <input type="text" required = "required" placeholder = "Enter a education" name="education"
                        value={editFormData.education}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Enter a mobile" name="mobile"
                        value={editFormData.mobile}
                        onChange={handleEditFormChange}
                    />
                </td>
				<td>
                    <input type="text" required = "required" placeholder = "Enter a email" name="email"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                    />
                </td>
                <td>	
					<div className="d-flex todo-button">
						<Link to={"#"} className="btn btn-warning shadow btn-xs sharp me-2" type="submit"><i className="far fa-check-circle scale3"></i></Link>
						<Link to={"#"} className="btn btn-danger shadow btn-xs sharp " type="button" onClick={handleCancelClick}>
							<i className="far fa-times-circle scale3"></i>
						</Link>
					</div>
                </td>
            </>
        </>
    )
}
export default Editable;