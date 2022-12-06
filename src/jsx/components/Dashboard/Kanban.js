import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';
import Board, { moveCard } from "@asseinfo/react-kanban";
//import '@asseinfo/react-kanban/dist/styles.css'
// Images
import back from './../../../images/back1.jpg';
import pic1 from './../../../images/profile/small/pic1.jpg';
import pic2 from './../../../images/profile/small/pic2.jpg';
import pic3 from './../../../images/profile/small/pic3.jpg';
import pic4 from './../../../images/profile/small/pic4.jpg';
import pic5 from './../../../images/profile/small/pic5.jpg';

//Import
import { board	} from './Kanban/KanbanData';

function ControlledBoard() {
	// You need to control the state yourself.
	const [controlledBoard, setBoard] = useState(board);

	function handleCardMove(_card, source, destination) {
		const updatedBoard = moveCard(controlledBoard, source, destination);
		setBoard(updatedBoard);
	}
	return (
		<Board onCardDragEnd={handleCardMove} disableColumnDrag>
			{controlledBoard}
		</Board>
	);
}

const Kanban = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="card overflow-hidden">
								<div className="company-profile">
									<img src={back} alt="" />
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-xl-8">
											<div>
												<h4 className="fs-32 font-w700">Workload  Company Profile Websites Development</h4>
												<span className="mb-2 d-block">Created by Tommy Hank on June 31, 2020</span>
												<div className="workload-button">
													<Link to={"#"} className="btn btn-primary btn-rounded">New<i className="fas fa-caret-down ms-2 "></i></Link>
													<Link to={"#"} className="btn btn-primary light btn-rounded"><i className="fas fa-user-plus  me-3"></i>Invite People</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded">Edit</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded">Private</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded"><i className="far fa-envelope  me-3 text-primary"></i>45 Comments</Link>
												</div>
											</div>
										</div>
										<div className="col-xl-4 info">
											<div className="d-flex justify-content-end">
												<span><i className="fas fa-info-circle me-3"></i>Project Details</span>
												<Dropdown className="dropdown ms-3">
													<Dropdown.Toggle as="div" className="btn-link i-false" >
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
															<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
															<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
														</svg>
													</Dropdown.Toggle>
													<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
														<Dropdown.Item>Delete</Dropdown.Item>
														<Dropdown.Item>Edit</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className="justify-content-end d-flex">
												<ul className="kanbanimg me-3 mb-3 mt-sm-0 mt-3">
													<li><img src={pic1} alt="" /></li>
													<li><img src={pic2} alt="" /></li>
													<li><img src={pic3} alt="" /></li>
													<li><img src={pic4} alt="" /></li>
													<li><img src={pic5} alt="" /></li>
													<li><span>5+</span></li>
												</ul>
											</div>	
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="kanban-bx">
						<div className="kanbanPreview-bx">
							<div className="draggable-zone dropzoneContainer">
								<ControlledBoard />
							</div>
						</div>
					</div>
				</div>
			</div>	
		</>
	)
} 
export default Kanban;