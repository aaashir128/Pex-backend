// import React,{useState} from 'react';
// import {Link} from 'react-router-dom';
// import {Dropdown} from 'react-bootstrap';

// //Images
// import  back1 from './../../../images/back1.jpg';
// import  pic1 from './../../../images/pic1.jpg';
// import  pic2 from './../../../images/pic2.jpg';
// import  pic3 from './../../../images/pic3.jpg';
// import  small1 from './../../../images/profile/small/pic1.jpg';
// import  small2 from './../../../images/profile/small/pic2.jpg';
// import  small3 from './../../../images/profile/small/pic3.jpg';
// import  small4 from './../../../images/profile/small/pic4.jpg';
// import  small5 from './../../../images/profile/small/pic5.jpg';

// const ProjectDetails = () =>{
// 	const [selectBtn, setSelectbBtn] = useState("Newest Comment");
// 	return(
// 		<>
// 			<div className="row">
// 				<div className="col-xl-12">
// 					<div className="row">
// 						<div className="col-xl-12">
// 							<div className="card overflow-hidden">
// 								<div className="company-profile">
// 									<img src={back1} alt="" />
// 								</div>
// 								<div className="card-body">
// 									<div className="row border-bottom pb-5">
// 										<div className="col-xl-8 col-lg-9">
// 											<div>
// 												<h4 className="fs-32 font-w700">Workload  Company Profile Websites Development</h4>
// 												<span className="mb-2 d-block">Created by Tommy Hank on June 31, 2020</span>
// 												<div className="workload-button">
// 													<Link to={"#"} className="btn btn-primary btn-rounded">New<i className="fas fa-caret-down ms-2 scale5"></i></Link>
// 													<Link to={"#"} className="btn btn-primary light btn-rounded"><i className="fas fa-user-plus scale2 me-3"></i>Invite People</Link>
// 													<Link to={"#"} className="btn btn-outline-light btn-rounded">Edit</Link>
// 													<Link to={"#"} className="btn btn-outline-light btn-rounded">Private</Link>
// 													<Link to={"#"} className="btn btn-outline-light btn-rounded"><i className="far fa-envelope scale5 me-3 text-primary"></i>45 Comments</Link>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-xl-4 col-lg-3 info">
// 											<div className="kanbanimg1">
// 												<span><i className="fas fa-info-circle me-3"></i>Project Details</span>
// 												<Dropdown className="dropdown ms-3">
// 													<Dropdown.Toggle as="div" className="btn-link i-false" >
// 														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// 															<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
// 															<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
// 															<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
// 														</svg>
// 													</Dropdown.Toggle>
// 													<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
// 														<Dropdown.Item>Delete</Dropdown.Item>
// 														<Dropdown.Item>Edit</Dropdown.Item>
// 													</Dropdown.Menu>
// 												</Dropdown>
// 											</div>
// 											<div className="kanbanimg1">
// 												<ul className="kanbanimg me-3 mb-3">
// 													<li><img src={small1} alt="" /></li>
// 													<li><img src={small2} alt="" /></li>
// 													<li><img src={small3} alt="" /></li>
// 													<li><img src={small4} alt="" /></li>
// 													<li><img src={small5} alt="" /></li>
// 													<li><span>5+</span></li>
// 												</ul>
// 											</div>	
// 										</div>
// 										<div className="col-xl-3 mt-4 col-sm-6">
// 											<div className="d-flex">
// 												<span><i className="far fa-clock scale5 text-primary mt-2 me-3"></i></span>
// 												<div>
// 													<h4 className="fs-18 font-w500 text-black">Project Create</h4>
// 													<span>Monday, October 31th, 2020</span>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-xl-3 mt-4 col-sm-6">
// 											<div className="d-flex">
// 												<span><i className="far fa-clock scale5 text-primary mt-2 me-3"></i></span>
// 												<div>
// 													<h4 className="fs-18 font-w500 text-black">Due date</h4>
// 													<span>Monday, October 31th, 2020</span>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-xl-6 mt-4 col-sm-12">
// 											<div className="mb-3">
// 												<span className="fs-18 font-w500">Total Progress 60%</span>
// 											</div>
// 											<div className="progress default-progress1">
// 												<div className="progress-bar progress-animated" style={{width: "40%", height:"14px"}} >
// 													<span className="sr-only">45% Complete</span>
// 												</div>
// 											</div>
											
// 										</div>
// 									</div>
// 									<div className="project-description">
// 										<span className="fs-18 font-w500 mb-3 d-block">PROJECT DESCRIPTION</span>
// 										<p className="fs-18 font-w500">
// 											"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// 										</p>
// 										<span className="fs-18 font-w500 my-4 d-block">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</span>
// 										<p className="fs-18 font-w500">
// 											"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliqui
// 										</p>
// 									</div>
// 									<div className="message1">
// 										 <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Type comment here..."></textarea>
// 										<div className="msg-button">
// 											<i className="fas fa-smile me-3 "></i>
// 											<i className="fas fa-paperclip me-3"></i>
// 											<Link to={"#"} className="btn btn-primary"><i className="fas fa-paper-plane me-2 text-white fs-18 btn-rounded"></i>SEND</Link>
// 										</div>
// 									</div>
// 									<div className="comments">
// 										<div className="d-flex justify-content-between align-items-center">
// 											<span className="text-uppercase fs-18 font-w500">comment</span>
// 											<Dropdown>
// 												<Dropdown.Toggle as="div" className="dashboard-select btn-blog i-false">{selectBtn}
// 													<i className="fas fa-angle-down ms-2"></i>
// 												</Dropdown.Toggle>
// 												<Dropdown.Menu>
// 													<Dropdown.Item onClick={()=>setSelectbBtn("Oldest Comment")}>
// 														Oldest Comment
// 													</Dropdown.Item>
// 													<Dropdown.Item onClick={()=>setSelectbBtn("Newest Comment")}>
// 														Newest Comment
// 													</Dropdown.Item>
// 												</Dropdown.Menu>
// 											</Dropdown>
// 										</div>
// 									</div>
// 									<div className="user-comment row border-bottom pb-3 align-items-center">
// 										<div className="col-lg-9">
// 											<div className="d-flex align-items-center">
// 												<img src={pic1} alt="" />
// 												<div className="ms-3">
// 													<h4 className="fs-18 font-w600">Kevin Sirait</h4>
// 													<span className="fs-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </span>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-lg-3 d-flex justify-content-end">
// 											<div className="like-reply">
// 												<span className="fs-18 font-w600 me-3"><i className="far fa-thumbs-up text-primary me-2"></i>45 Like</span>
// 												<Link to={"#"}><span className="fs-18 font-w600"><i className="fas fa-reply-all me-2 text-blue"></i>Reply</span></Link>
// 											</div>
// 										</div>	
// 									</div>
// 									<div className="user-comment row border-bottom pb-3 align-items-center">
// 										<div className="col-lg-9">
// 											<div className="d-flex align-items-start">
// 												<img src={pic2} alt="" />
// 												<div className="ms-3">
// 													<h4 className="fs-18 font-w600">Hendric Suneo</h4>
// 													<span className="fs-16">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-lg-3 d-flex justify-content-end">
// 											<div className="like-reply">
// 												<span className="fs-18 font-w600 me-2"><i className="far fa-thumbs-up text-primary me-2"></i>45 Like</span>
// 												<span className="fs-18 font-w600"><i className="fas fa-reply-all me-2 text-blue"></i>Reply</span>
// 											</div>
// 										</div>	
// 									</div>
// 									<div className="user-comment row border-bottom pb-3 align-items-center">
// 										<div className="col-lg-9">
// 											<div className="d-flex align-items-start ms-5">
// 												<img src={pic2} alt="" />
// 												<div className="ms-3">
// 													<h4 className="fs-18 font-w600">Kesha Jean</h4>
// 													<span className="fs-16">m quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="col-lg-3 d-flex justify-content-end">
// 											<div className="like-reply">
// 												<span className="fs-18 font-w600 me-2"><i className="fas fa-star text-orange"></i></span>
// 												<span className="fs-18 font-w600"><i className="fas fa-star text-orange"></i></span>
// 											</div>
// 										</div>	
// 									</div>
// 									<div className="user-comment row border-bottom pb-3 align-items-center">
// 										<div className="col-lg-9">
// 											<div className="d-flex align-items-start ms-5">
// 												<img src={pic3} alt="" />
// 												<div className="ms-3">
// 													<h4 className="fs-18 font-w600">Kesha Jean</h4>
// 													<span className="fs-16">m quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima ve </span>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
				
// 				</div>
// 			</div>
// 		</>
// 	)
// }
// export default ProjectDetails;
