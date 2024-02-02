
import Link from "next/link";
import React, { useState } from "react";

const RegisterForm = () => {
	const [registerData, setRegisterData] = useState({
		username: "",
		firstname: "",
		lastname: "",
        email: "",
		password: "",
	});

	const handleChange = (e: any) => {
		setRegisterData({ ...registerData, [e.target.id]: e.target.value });
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(registerData);
	};

	return (
		<div className="w-full max-w-xs">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={formSubmit}
			>
				<h1 className="text-xl font-bold text-center uppercase my-4">Registration</h1>
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
                        autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="firstname"
					>
						First Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="firstname"
						type="text"
						placeholder="First Name"
                        autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="lastname"
					>
						Last Name
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="lastname"
						type="text"
						placeholder="Last Name"
                        autoComplete="off"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="Email"
						autoComplete="off"
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
						autoComplete="off"
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
						Register
					</button>

				</div>
				<div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
					Error Message
				</div>

			</form>
			<p className="text-center text-gray-500 text-xs">
				&copy;2024 Acme Corp. All rights reserved.
			</p>
		</div>
	);
};

export default RegisterForm;
