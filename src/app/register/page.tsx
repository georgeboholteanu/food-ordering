"use client"
import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	return (
		<div className="flex container mx-auto justify-center">
			<RegisterForm />
		</div>
	);
};

export default Register;
