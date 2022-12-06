import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = props => {
	const { handleSubmit, pristine, reset, submitting } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group mb-3 ">
				<label>First Name</label>
				<div>
					<Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control"/>
				</div>
			</div>
			<div className="form-group mb-3 ">
				<label>Last Name</label>
				<div>
					<Field name="lastName" component="input" type="text" placeholder="Last Name" className="form-control"/>
				</div>
			</div>
			<div className="form-group mb-3 ">
				<label>Email</label>
				<div>
					<Field name="email" component="input" type="email" placeholder="Email" className="form-control"/>
				</div>
			</div>
			<div className="row">
				<div className="col-lg-6">
					<label>Gender</label>
					<div className="row">
						<label className="form-group mb-3 col-sm-6">
							<Field name="sex" component="input" type="radio" value="male" />
							{' '}
							Male
						</label>
						<label className="form-group mb-3 col-sm-6">
							<Field name="sex" component="input" type="radio" value="female" />
							{' '}
							Female
						</label>
						
					</div>
				</div>
				<div className="col-lg-6">
					<div className="form-group mb-3">
						<div className="form-check">
							<Field className="form-check-input" name="employed" id="employed" component="input" type="checkbox" />
							<label className="form-check-label" htmlFor="employed">Employed</label>
						</div>
					</div>
				</div>
			</div>
			
			<div>
				<label>Favorite Color</label>
				<div  className="mb-3">
					<Field name="favoriteColor" component="select" className="form-control">
						<option selected  value="Select a color">Select a color</option>
						<option value="ff0000">Red</option>
						<option value="00ff00">Green</option>
						<option value="0000ff">Blue</option>
					</Field>
				</div>
			</div>
			
			<div className="mb-2">
				<label>Notes</label>
				<div>
					<Field name="notes" component="textarea" className="form-control" />
				</div>
			</div>
			<div className="text-center mt-4">
				<button className="btn btn-primary me-2" type="submit" disabled={pristine || submitting}>Submit</button>
				<button className="btn btn-light" type="button" disabled={pristine || submitting} onClick={reset}> Clear Values</button>
			</div>
		</form>
	);
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);