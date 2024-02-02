"use client"
import LoginForm from "@/components/LoginForm";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function loginEmail() {
	return (
		<div className="flex container mx-auto justify-center mt-20">
			<LoginForm />
		</div>
	);
}

export default loginEmail;
