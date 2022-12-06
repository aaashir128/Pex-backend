import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1401,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Slider className="owl-carousel card-slider" {...settings}>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon">
                {/* <span className="bg-pushup">
									<svg width="27" height="35" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.64071 24.2591V33V34H6.64071H2H1V33V2.3725V1.3725H2H6.64071H7.64071V2.3725V3.23854C9.32631 1.9176 11.6215 1 14.4566 1C21.0001 1 26 6.38308 26 13.8785C26 21.3958 21.0207 26.5501 14.4566 26.5501C11.7277 26.5501 9.372 25.6258 7.64071 24.2591ZM19.2779 13.8785C19.2779 9.46345 16.3463 7.09747 13.4389 7.09747C10.5614 7.09747 7.64071 9.39188 7.64071 13.7957C7.64071 18.1544 10.5578 20.4526 13.4389 20.4526C16.3833 20.4526 19.2779 18.2557 19.2779 13.8785Z" fill="white" stroke="white" strokeWidth="2"/>
									</svg>
								</span> */}
              </div>
              {/* <div className="ms-3">
								<h4 className="fs-18 font-w500">Pushup Studios</h4>
								<span>Coffe Shops</span>
							</div> */}
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$165.965.54</strong>
              </span>

              <span className="mb-7 d-block fs-18">Cash Available</span>
            </center>

            {/* <div className="progress default-progress mb-2">
							<div className="progress-bar progress-animated" style={{width: "40%", height:"10px"}} >
							</div>
						</div> */}
            {/* <div className="d-flex align-items-end mt-1 justify-content-between">
							<span><small className="text-black font-w700">12</small> Task Done</span>
							<span>Due date: 12/05/2020</span>
						</div> */}
          </div>
        </div>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon">
                {/* <span className="bg-pushup">
									<svg width="27" height="35" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.64071 24.2591V33V34H6.64071H2H1V33V2.3725V1.3725H2H6.64071H7.64071V2.3725V3.23854C9.32631 1.9176 11.6215 1 14.4566 1C21.0001 1 26 6.38308 26 13.8785C26 21.3958 21.0207 26.5501 14.4566 26.5501C11.7277 26.5501 9.372 25.6258 7.64071 24.2591ZM19.2779 13.8785C19.2779 9.46345 16.3463 7.09747 13.4389 7.09747C10.5614 7.09747 7.64071 9.39188 7.64071 13.7957C7.64071 18.1544 10.5578 20.4526 13.4389 20.4526C16.3833 20.4526 19.2779 18.2557 19.2779 13.8785Z" fill="white" stroke="white" strokeWidth="2"/>
									</svg>
								</span> */}
              </div>
              {/* <div className="ms-3">
								<h4 className="fs-18 font-w500">Pushup Studios</h4>
								<span>Coffe Shops</span>
							</div> */}
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$165.96</strong>
              </span>

              <span className="mb-7 d-block fs-18">Total Invested</span>
            </center>

            {/* <div className="progress default-progress mb-2">
							<div className="progress-bar progress-animated" style={{width: "40%", height:"10px"}} >
							</div>
						</div> */}
            {/* <div className="d-flex align-items-end mt-1 justify-content-between">
							<span><small className="text-black font-w700">12</small> Task Done</span>
							<span>Due date: 12/05/2020</span>
						</div> */}
          </div>
        </div>
        <div className="items">
          <div className="slide-info">
            <div className="d-flex align-items-center mb-3">
              <div className="slide-icon">
                {/* <span className="bg-pushup">
									<svg width="27" height="35" viewBox="0 0 27 35" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.64071 24.2591V33V34H6.64071H2H1V33V2.3725V1.3725H2H6.64071H7.64071V2.3725V3.23854C9.32631 1.9176 11.6215 1 14.4566 1C21.0001 1 26 6.38308 26 13.8785C26 21.3958 21.0207 26.5501 14.4566 26.5501C11.7277 26.5501 9.372 25.6258 7.64071 24.2591ZM19.2779 13.8785C19.2779 9.46345 16.3463 7.09747 13.4389 7.09747C10.5614 7.09747 7.64071 9.39188 7.64071 13.7957C7.64071 18.1544 10.5578 20.4526 13.4389 20.4526C16.3833 20.4526 19.2779 18.2557 19.2779 13.8785Z" fill="white" stroke="white" strokeWidth="2"/>
									</svg>
								</span> */}
              </div>
              {/* <div className="ms-3">
								<h4 className="fs-18 font-w500">Pushup Studios</h4>
								<span>Coffe Shops</span>
							</div> */}
            </div>
            <center>
              <span className="mb-3 d-block fs-22">
                <strong>$265.96</strong>
              </span>

              <span className="mb-7 d-block fs-18">Profit/Loss</span>
            </center>

            {/* <div className="progress default-progress mb-2">
							<div className="progress-bar progress-animated" style={{width: "40%", height:"10px"}} >
							</div>
						</div> */}
            {/* <div className="d-flex align-items-end mt-1 justify-content-between">
							<span><small className="text-black font-w700">12</small> Task Done</span>
							<span>Due date: 12/05/2020</span>
						</div> */}
          </div>
        </div>
      </Slider>
    </>
  );
};
export default ProjectSlider;
