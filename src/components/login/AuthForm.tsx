"use client";
import { Button } from "@/components/ui/button"  //shad cn ui custom button
import { Input } from "@/components/ui/input";	//shad cn ui custom input
import { Lock, MailIcon, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../_layout/Logo";

const Form = () => {
	const [formData, setFormData] = useState({		
		email: "",
		password: "",
	});

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const isValidEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if all fields are not empty
		if (!formData.email || !formData.password) {
			toast.error("Please fill in all fields.");
			return;
		}
		
		if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast.success("Email sent successfully!");
				console.log("Email sent successfully!");
			} else {
				console.error(
					"Error login. Server returned:",
					response.status,
					response.statusText
				);
				toast.error("Error login!");
			}
		} catch (error) {
			console.error("Error email login:", error);
			toast.error("Error email login!");
		}
	};

	return (
		<form className="flex flex-col gap-y-4 place-items-center" onSubmit={handleSubmit}>
			{/* Logo */}
			<div>
				<h1 className="text-2xl font-bold text-center uppercase my-4">
					<Logo containerStyles=""/>
				</h1>
			</div>
			{/* input */}
			<div className="relative flex items-center w-[300px]">
				<Input
					type="email"
					id="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
				/>
				<MailIcon className="absolute right-6" size={20} />
			</div>
			{/* input */}
			<div className="relative flex items-center w-[300px]">
				<Input
					type="password"
					id="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
				/>
				<Lock className="absolute right-6" size={20} />
			</div>
			{/* input */}			
			<Button
				className="flex items-center max-w-[166px] gap-x-1"
				type="submit"
			>
				Login
				<ArrowRightIcon size={20} />
			</Button>
		</form>
	);
};

export default Form;