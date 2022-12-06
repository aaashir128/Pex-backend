import React,{ useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown} from 'react-bootstrap';

//Images
import pic3 from './../../../../images/profile/small/pic3.jpg';
import pic4 from './../../../../images/profile/small/pic4.jpg';
import pic5 from './../../../../images/profile/small/pic5.jpg';
import pic6 from './../../../../images/profile/small/pic6.jpg';
import pic7 from './../../../../images/profile/small/pic7.jpg';

//Import Components
import { ThemeContext } from "../../../../context/ThemeContext";
import CurrentBalance from './../Dashboard/CurrentBalance';
import ProjectSlider from './../Dashboard/ProjectSlider';
import DonutChart from './../Dashboard/DonutChart';

const ChartBarApex = loadable(() =>
	pMinDelay(import("./../Dashboard/ChartBarApex"), 1000)
);
const ReservationChart = loadable(() =>
	pMinDelay(import("./../Dashboard/ReservationChart"), 1000)
);
const RedialApex = loadable(() =>
	pMinDelay(import("./../Dashboard/RedialApex"), 1000)
);
const NewCustomers = loadable(() =>
	pMinDelay(import("./../Dashboard/NewCustomers"), 1000)
);
const NewProject = loadable(() =>
	pMinDelay(import("./../Dashboard/NewProject"), 1000)
);
const Emailchart = loadable(() =>
	pMinDelay(import("./../Dashboard/Emailchart"), 1000)
);

function Dropdownblog(){
	return(
		<Dropdown>
			<Dropdown.Toggle as="div" className="btn-link i-false" data-bs-toggle="dropdown">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5"/>
					<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5"/>
					<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5"/>
				</svg>
			</Dropdown.Toggle>
			<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
				<Dropdown.Item >Delete</Dropdown.Item>
				<Dropdown.Item >Edit</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

const MessageBlog = [
	{ image: pic6, title: 'Maren Rosser',},
	{ image: pic4, title: 'Kaiya Bergson',},
	{ image: pic3, title: 'Ruben Press',},
	{ image: pic7, title: 'Cristofer Torff',},
	{ image: pic5, title: 'Ann Rosser',},
];


const Theme5 = () => {
	const { changeNavigationHader,
			chnageSidebarColor,
			changePrimaryColor
		} = useContext(ThemeContext);
	useEffect(() => {
		changeNavigationHader("color_12");
		chnageSidebarColor("color_12");
		changePrimaryColor("color_12");
	}, []);
	return(
		<>
			<div className="row">
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="row">
								<div className="col-xl-6 col-sm-6 col-xxl-12">
									<div className="card" id="user-activity">
										<div className="card-header border-0 pb-0 flex-wrap">
											<div>
												<span className="mb-3 d-block fs-16">Current Balance</span>
												<h4 className="fs-24 font-w700 mb-3">$ 24,567.33</h4>
												<span><small className="text-success">+2.7%</small>  than last week</span>
											</div>
											<div className="current-icon">
												<Link to={"#"} ><i className="fas fa-long-arrow-alt-up"></i></Link>
											</div>
										</div>
										<CurrentBalance />
									</div>
								</div>
								<div className="col-xl-6 col-sm-6 col-xxl-12">
									<div className="card">
										<div className="card-body">
											<div id="redial">
												<RedialApex />
											</div>
											<span className="text-center d-block fs-18 font-w600">On Progress <small className="text-success">70%</small></span>	
											<div className="mt-4 text-center">
												<h4 className="fs-20 font-w700">Workload Dashboard For CMS Websites</h4>
												<p className="mb-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0">
									<h4 className="fs-20 font-w700">Project Statistics</h4>
									<Dropdownblog />
								</div>
								<div className="card-body pb-3">
									<div id="chartBar" className="chartBar">
										<ChartBarApex />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-6">
					<div className="row">
						<div className="col-xl-12">
							<div className="card bg-progradient manage-project">
								<div className="card-body">
									<div className="row align-items-center">
										<div className="col-xl-6 col-12">
											<h4 className="fs-24 font-w700 text-white">Manage your project in one touch</h4>
											<span className="fs-16 text-white d-block">Let Wokrload manage your project automatically with our best AI systems </span>
										</div>
										<div className="col-xl-6 col-12 text-end">
											<Link to={"#"} className="btn  bg-white fs-18 btn-rounded">Try Free Now</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0">
									<h4 className="fs-20 font-w700">Project Statistics</h4>
									<Dropdownblog />
								</div>
								<div className="card-body p-2">
									<div id="reservationChart" className="reservationChart">
										<ReservationChart />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-sm-6">
							<div className="card">
								<div className="card-body d-flex px-4 pb-0 justify-content-between">
									<div>
										<h4 className="fs-18 font-w600 mb-4 text-nowrap">Total Clients</h4>
										<div className="d-flex align-items-center">
											<h2 className="fs-32 font-w700 mb-0">68</h2>
											<span className="d-block ms-4">
												<svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M1.49217 11C0.590508 11 0.149368 9.9006 0.800944 9.27736L9.80878 0.66117C10.1954 0.29136 10.8046 0.291359 11.1912 0.661169L20.1991 9.27736C20.8506 9.9006 20.4095 11 19.5078 11H1.49217Z" fill="#09BD3C"/>
												</svg>
												<small className="d-block fs-16 font-w400 text-success">+0,5%</small>
											</span>
										</div>
									</div>
									<div className="bg-gradient1 rounded text-center p-3">
										<div className="d-inline-block position-relative donut-chart-sale mb-3">
											<DonutChart value="70" backgroundColor= "#00a15d"
												backgroundColor2= "rgba(238, 238, 237, 1)"
											/>
											{/* <span className="donut1" data-peity='{ "fill": ["var(--primary)", "rgba(238, 238, 237, 1)"],   "innerRadius": 33, "radius": 10}'>5/8</span> */}
											<small className="text-primary">71%</small>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-sm-6">
							<div className="card">
								<div className="card-body px-4">
									<h4 className="fs-18 font-w600 mb-5 text-nowrap">Total Clients</h4>
									<div className="progress default-progress">
										<div className="progress-bar progress-animated" style={{width: "40%", height:"10px"}} >
											<span className="sr-only">45% Complete</span>
										</div>
									</div>
									<div className="d-flex align-items-end mt-1 justify-content-between">
										<span><small className="text-primary">76</small> left from target</span>
										<h4 className="mb-0 fs-32 font-w800">42</h4>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-sm-6">
							<div className="card">
								<div className="card-body d-flex px-4  justify-content-between">
									<div>
										<div className="">
											<h2 className="fs-32 font-w700">562</h2>
											<span className="fs-18 font-w500 d-block">Total Clients</span>
											<span className="d-block fs-16 font-w400"><small className="text-danger">-2%</small> than last month</span>
										</div>
									</div>
									<div id="NewCustomers">
										<NewCustomers />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-6 col-sm-6">
							<div className="card">
								<div className="card-body d-flex px-4  justify-content-between">
									<div>
										<div className="">
											<h2 className="fs-32 font-w700">892</h2>
											<span className="fs-18 font-w500 d-block">New Projects</span>
											<span className="d-block fs-16 font-w400"><small className="text-success">-2%</small> than last month</span>
										</div>
									</div>
									<div id="NewCustomers1">
										<NewProject />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-xl-12">
					<div className="card">
						<div className="card-header border-0">
							<div>
								<h4 className="fs-20 font-w700">Important Projects</h4>
								<span>Lorem ipsum dolor sit amet</span>
							</div>
							<Dropdownblog />
						</div>
						<div className="card-body">
							<ProjectSlider />
						</div>
					</div>		
				</div> 
				
				<div className="col-xl-6 col-sm-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0">
									<div>
										<h4 className="fs-20 font-w700">Project Categories</h4>
										<span className="fs-14 font-w400 d-block">Lorem ipsum dolor sit amet</span>
									</div>	
									<Dropdownblog />
								</div>
								<div className="card-body">
									<div className="row align-items-center">
										<div className="col-xl-6">
											<div>
												<span className="fs-18 font-w600 mb-3 d-block">Legend</span>
											</div>
											<div>
												<div className="d-flex align-items-center justify-content-between mb-4">
													<span className="fs-18 font-w500">	
														<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="20" height="20" rx="6" fill="#886CC0"/>
														</svg>
														Primary (27%)
													</span>
													<span className="fs-18 font-w600">763</span>
												</div>
												<div className="d-flex align-items-center justify-content-between  mb-4">
													<span className="fs-18 font-w500">	
														<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="20" height="20" rx="6" fill="#26E023"/>
														</svg>
														Promotion (11%)
													</span>
													<span className="fs-18 font-w600">321</span>
												</div>
												<div className="d-flex align-items-center justify-content-between  mb-4">
													<span className="fs-18 font-w500">	
														<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="20" height="20" rx="6" fill="#61CFF1"/>
														</svg>
														Forum (22%)
													</span>
													<span className="fs-18 font-w600">69</span>
												</div>
												<div className="d-flex align-items-center justify-content-between  mb-4">
													<span className="fs-18 font-w500">	
														<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="20" height="20" rx="6" fill="#FFDA7C"/>
														</svg>
														Socials (15%) 
													</span>
													<span className="fs-18 font-w600">154</span>
												</div>
												<div className="d-flex align-items-center justify-content-between  mb-4">
													<span className="fs-18 font-w500">	
														<svg className="me-3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
															<rect width="20" height="20" rx="6" fill="#FF86B1"/>
														</svg>
														Spam (25%) 
													</span>
													<span className="fs-18 font-w600">696</span>
												</div>
											</div>
										</div>
										<div className="col-xl-6 text-center">
											<div id="emailchart" className="mb-3">
												<Emailchart />
											</div>
											<Link to={"#"} className="btn btn-outline-primary btn-rounded">Update Progress</Link>		
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div className="col-xl-6 col-sm-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="card">
								<div className="card-header border-0 flex-wrap">
									<div className="mb-2">
										<h4 className="fs-20 font-w700">Messages</h4>
										<span>Lorem ipsum dolor sit amet</span>
									</div>
									<div className="mb-2">
										<Link to={"#"} className="btn btn-primary btn-rounded">+New Messages</Link>
									</div>
								</div>
								<div className="card-body px-0">
									{MessageBlog.map((item,index)=>(
										<div className="msg-bx d-flex justify-content-between align-items-center" key={index}>
											<div className="msg d-flex align-items-center w-100">
												<div className="image-box active">
													<img src={item.image} alt="" />
												</div>
												<div className="ms-3 w-100 ">
													<h4 className="fs-18 font-w600">{item.title}</h4>
													<div className="d-flex justify-content-between">
														<span className="me-auto">Hei, dont forget to clear server cache!</span>
														<span className="me-4 fs-12">25min ago</span>
													</div>
												</div>
												
											</div>
											<Dropdownblog />
										</div>	
									))}
								</div>
							</div>
						</div>
					</div>
				</div>				
			</div>	
		</>
	)
}
export default Theme5;