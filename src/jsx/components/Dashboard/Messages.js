import PerfectScrollbar from "react-perfect-scrollbar";
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';


import ChatRoom from './Messages/ChatRoom';

//Image
import pic11 from './../../../images/contacts/pic11.jpg';
import pic22 from './../../../images/contacts/pic22.jpg';
import pic33 from './../../../images/contacts/pic33.jpg';
const Messages = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="card">
						<div className="card-body p-0">
							<div className="row">
								<div className="col-xl-3 col-xxl-4">
									<PerfectScrollbar className="dlab-scroll">
										<div className="chat-sidebar" id="chatSidebar">
											<div className="d-flex align-items-center justify-content-between px-2">
												<span className="m-3 d-block fs-16 font-w600">GROUP</span>
												<Link to={"#"} className="light sharp btn-primary btn"><i className="fas fa-plus"></i></Link>
											</div>
											<div className="px-3">
												<div className="chat-bx-group px-2 d-flex align-items-center justify-content-between">
													<div className="user d-flex align-items-center">
														<Link to={"#"} className="bg-team1"><i className="fas fa-user-friends"></i></Link>
														<span className="fs-18 font-w500 ms-3">Kleon Team</span>
													</div>
													<i className="fas fa-thumbtack scale5"></i>
													
												</div>
												<div className="chat-bx-group px-2">
													<div className="user d-flex align-items-center">
														<Link to={"#"} className="bg-team2"><i className="fas fa-user-friends"></i></Link>
														<span className="fs-18 font-w500 ms-3">UI/UX Community</span>
													</div>
												</div>
												<div className="chat-bx-group px-2">
													<div className="user d-flex align-items-center">
														<Link to={"#"} className="bg-team3"><i className="fas fa-user-friends"></i></Link>
														<span className="fs-18 font-w500 ms-3">We Are Designer</span>
													</div>
												</div>
												<div className="chat-bx-group px-2">
													<div className="user d-flex align-items-center">
														<Link to={"#"} className="bg-team4"><i className="fas fa-user-friends"></i></Link>
														<span className="fs-18 font-w500 ms-3">We Are Designer</span>
													</div>
												</div>
												<div className="chat-bx-group px-2">
													<div className="user d-flex align-items-center">
														<Link to={"#"} className="bg-team5"><i className="fas fa-user-friends"></i></Link>
														<span className="fs-18 font-w500 ms-3">Future Boss Grou..</span>
													</div>
												</div>
											</div>	
											<div className="recent-msg p-4 chat-bx">
												<div className="d-flex justify-content-between align-items-center">
													<span className="fs-16 font-w500">RECENT MESSAGE</span>
													<Dropdown className="dropdown ms-2">
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
											</div>
											<div className="">
												<div className="chat-bx  border-bottom">
													<div className="px-3 d-flex">
														<div className="chat-img">
															<img src={pic22} alt="" />
															<span className="active"></span>
														</div>
														<div className="w-100">
															<div className="d-flex mb-1 align-items-center">
																<span className="fs-16 text-black">Rayna Carder</span>
																<span className="fs-12 ms-auto badge badge-primary">New</span>
															</div>	
															<div>
																<p className="mb-0">I remember that project due is tomorrow.</p>
																
															</div>
														</div>
													</div>	
												</div>
												<div className="chat-bx  border-bottom">
													<div className="px-3 d-flex">
														<div className="chat-img">
															<img src={pic11} alt="" />
															<span className="active"></span>
														</div>
														<div className="w-100">
															<div className="d-flex mb-1 align-items-center">
																<span className="fs-16 text-black">Rayna Carder</span>
																<span className="fs-12 ms-auto badge badge-primary">New</span>
															</div>	
															<div>
																<p className="mb-0">I remember that project due is tomorrow.</p>
																
															</div>
														</div>
													</div>	
												</div>
												<div className="chat-bx  border-bottom">
													<div className="px-3 d-flex">
														<div className="chat-img">
															<img src={pic33} alt="" />
															<span className="active"></span>
														</div>
														<div className="w-100">
															<div className="d-flex mb-1 align-items-center">
																<span className="fs-16 text-black">Rayna Carder</span>
															</div>	
															<div>
																<p className="mb-0">I remember that project due is tomorrow.</p>
																
															</div>
														</div>
													</div>	
												</div>
												<div className="chat-bx  border-bottom">
													<div className="px-3 d-flex">
														<div className="chat-img">
															<img src={pic22} alt="" />
															<span className="active"></span>
														</div>
														<div className="w-100">
															<div className="d-flex mb-1 align-items-center">
																<span className="fs-16 text-black">Rayna Carder</span>
															</div>	
															<div>
																<p className="mb-0">I remember that project due is tomorrow.</p>
																
															</div>
														</div>
													</div>	
												</div>
											</div>	
										</div>
									</PerfectScrollbar>	
								</div>
								<div className="col-xl-9 col-xxl-8">
									<ChatRoom />
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Messages;