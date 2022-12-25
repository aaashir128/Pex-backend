// import React from "react";
// import { Link } from "react-router-dom";
// // image
// //import logo from "../../images/logo-full.png";
// import logo from "../../images/logo.png";
// //import { ThemeContext } from "../context/ThemeContext";

// const LockScreen = ({ history }) => {
//   const submitHandler = (e) => {
//     e.preventDefault();
//     history.push("/dashboard");
//   };
//   return (
//     <div className="authincation h-100 p-meddle">
//       <div className="container h-100">
//         <div className="row justify-content-center h-100 align-items-center">
//           <div className="col-md-6">
//             <div className="authincation-content">
//               <div className="row no-gutters">
//                 <div className="col-xl-12">
//                   <div className="auth-form">
//                     <div className=" mb-3">
//                       {/* <Link to="/dashboard">
// 							<img src={logo} alt="" />
// 						</Link>
// 						<h3 className="mb-0 font-w600">Workload</h3> */}
//                       <Link
//                         to="/dashboard"
//                         className="brand-logo d-flex align-items-center justify-content-center"
//                       >
//                         <img src={logo} alt="" />
//                         <div className="brand-title ms-3">
//                           <h2 className="mb-0 font-w600">Workload</h2>
//                           <span className="brand-sub-title">
//                             Project Management Admin
//                           </span>
//                         </div>
//                       </Link>
//                     </div>
//                     <h4 className="text-center mb-4 ">Account Locked</h4>
//                     <form onSubmit={(e) => submitHandler(e)}>
//                       <div className="form-group mb-3">
//                         <label className="">
//                           <strong>Password</strong>
//                         </label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           defaultValue="Password"
//                         />
//                       </div>
//                       <div className="text-center">
//                         <button
//                           type="submit"
//                           className="btn btn-primary btn-block"
//                         >
//                           Unlock
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LockScreen;
