import React from "react";
import ReactDOM from "react-dom";
//import { Provider } from "react-redux";
//import { Values } from "redux-form-website-template";
//import {store} from "../../store/store";
import ShowResults from "./ShowResults";
import SimpleForm from "./SimpleForm";

//const rootEl = document.getElementById("root");
/* ReactDOM.render(
	<Provider store={store}>
		
	</Provider>,
  rootEl
); */

const IndexReduxSimpaleForm = (props) => {
	return(
		<>			
			<div className="row justify-content-center">
				<div className="col-xl-6 col-xxl-8 col-lg-7">
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Simple Form</h4>
						</div>
						<div className="card-body">
							<SimpleForm onSubmit={ShowResults} />
						</div>
					</div>
				</div>
				<div className="col-xl-4 col-xxl-4 col-lg-5" >
					<div className="card">
						<div className="card-header">
							<h4 className="card-title">Result</h4>
						</div>
						<div className="card-body">
							<pre className="" id="ReduxFormJSON"></pre>
						</div>
					</div>
				</div> 
			</div>
		</>
	)
}



export default IndexReduxSimpaleForm;