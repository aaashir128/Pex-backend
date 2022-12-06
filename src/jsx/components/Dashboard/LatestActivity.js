import React from 'react';
import {Link} from 'react-router-dom';

const LatestActivity = () =>{
	return(
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="card overflow-hidden">
						<div className="card-body">
							<div className="side-border">
								<h4 className="fs-20 font-w700"><span>Today</span></h4>
							</div>
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-primary"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-sm-3 mt-2 mt-sm-0">
										<h4 className="fs-18 font-w500">Jackie Kun mentioned you at Kleon Projects</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn btn-outline-primary btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-secondary"><i className="fas fa-clock"></i></span>
									</div>
									<div className="ms-0 ms-lg-3 mt-2 mt-lg-0">
										<h4 className="fs-18 font-w500">[REMINDER] Due date of Highspeed Studios Projects te task will be coming</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-blue"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-sm-3 mt-2 mt-sm-0">
										<h4 className="fs-18 font-w500">Olivia Johanna has created new task at Kleon Projects</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-primary"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-lg-3  mt-2 mt-lg-0">
										<h4 className="fs-18 font-w500">Jackie Kun commented at Kleon Projects “Hei, please update the progress gu..</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-primary"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-sm-3  mt-2 mt-md-0">
										<h4 className="fs-18 font-w500">You has moved “Wireframing Landing Page” task to Done</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="side-border">
								<h4 className="fs-20 font-w700"><span>Yesterday</span></h4>
							</div>
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-primary"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-sm-3  mt-2 mt-sm-0">
										<h4 className="fs-18 font-w500">Jackie Kun mentioned you at Kleon Projects</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn btn-outline-primary btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-secondary"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-lg-3  mt-2 mt-lg-0">
										<h4 className="fs-18 font-w500">[REMINDER] Due date of Highspeed Studios Projects te task will be coming</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
							<div className="latest d-flex align-items-center justify-content-between flex-wrap">
								<div className="d-flex align-items-center flex-wrap mb-3">
									<span className="me-3">2m ago</span>
									<div className="enaergy">
										<span className="bg-blue"><i className="fas fa-bolt"></i></span>
									</div>
									<div className="ms-0 ms-sm-3  mt-2 mt-sm-0">
										<h4 className="fs-18 font-w500">You has moved “Wireframing Landing Page” task to Done</h4>
										<p className="mb-0 fs-16">Monday, June 31 2020</p>
									</div>
								</div>
								<Link to={"#"} className="btn  btn-link btn-rounded mb-3">Go to board</Link>
							</div>	
						</div>
					</div>
				</div>
			</div>
		</>
	)	
}
export default LatestActivity;