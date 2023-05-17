import React from "react";
import "./Login.css";

function Login() {
	function onLogin() {
		// TODO:update login url
		window.open("http://localhost:8000/login/api/auth/google/", "_self")
	}
	return (
		<>
			<main className="full_container" style={{ width: "100vw", height: "20rem", background: "#C07F00", display: "flex", justifyContent: "center", alignItems: "center",padding:"4rem" }}>
				<div className="loginWraper" style={{}}>
					<button onClick={onLogin} style={{padding:".5rem",width:"12rem",height:"2.5rem",borderRadius:"6px",border:"none",background:"#1D267D",color:"#fff",fontSize:"1.2rem",cursor:"pointer"}}>login via gmail</button>
				</div>
			</main>
		</>
	);
}
export default Login;
