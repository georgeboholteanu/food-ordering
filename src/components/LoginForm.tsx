
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const LoginForm = () => {	

	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
	});

	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e: any) => {
		setLoginData({ ...loginData, [e.target.id]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginData),
			});

			if (response.ok) {
				const text = await response.text();

				// Check if the response is not empty
				if (text.trim() !== "") {
					const data = JSON.parse(text);
					console.log("Server response:", data.message);
					if (data.message === "success") {
						toast.success("Login Successfully");
					} else {						
						toast.error("User Not Recognised");
					}
				} else {
					console.log("Empty response from server");
				}
			} else {
				console.error("Server error:", response.statusText);
			}
		} catch (error) {
			console.error("Error during form submission:", error);
		}
	};

	return (
		<div className="w-full max-w-xs">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<h1 className="text-xl font-bold text-center uppercase my-4">
					Login
				</h1>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						autoComplete="on"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="******************"
						autoComplete="on"
						onChange={handleChange}
					/>
					<p className="text-red-500 text-xs italic">
						Please choose a password.
					</p>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign In
					</button>
					<Link
						className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
						href="/menu"
					>
						Forgot Password?
					</Link>
				</div>
				<div 
				className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
					Error Message
				</div>
				<div className="flex mt-2 text-sm gap-2">
					<p className="tracking-tight">
						Don&apos;t have an account?{" "}
					</p>
					<Link
						className="font-semibold text-blue-500"
						href="/register"
					>
						Register
					</Link>
				</div>
			</form>
			<p className="text-center text-gray-500 text-xs">
				&copy;2024 SanGiorgio. All rights reserved.
			</p>
		</div>
	);
};

export default LoginForm;
