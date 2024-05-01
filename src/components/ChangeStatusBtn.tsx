import React, { useState } from "react";

interface ChangeStatusBtnProps {
	btnName: string;
	btnDescription: string;
	status: string;
	orderId: string;
	btnStyle?: string;
}

const ChangeStatusBtn: React.FC<ChangeStatusBtnProps> = ({
	btnName,
	btnDescription,
	status,
	orderId,
	btnStyle,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	
	const handleClick = async () => {

		const apiUrl =
			process.env.NEXT_PUBLIC_ENV === "development"
				? process.env.NEXT_PUBLIC_API_URL_DEV
				: process.env.NEXT_PUBLIC_API_URL_PROD;

		try {
			const res = await fetch(`${apiUrl}/api/orders/status`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					// "Authorization": `Bearer ${await getToken()}` // Ensure you're passing the authentication token
				},
				body: JSON.stringify({
					orderId: orderId,
					status: status,
				}),
			});

			if (!res.ok) {
				throw new Error(`Failed to fetch kitchen orders `);
			}
			const data = await res.json();
			// refresh page
			window.location.reload();
			
		} catch (error) {
			console.error("Error fetching kitchen orders:", error);
		}
	};
	return (
		<div className="relative flex items-center">
			<button
				onMouseOver={() => setShowTooltip(true)}
				onMouseOut={() => setShowTooltip(false)}
				className={btnStyle}
				onClick={handleClick}
			>
				{btnName}
			</button>
			{showTooltip && (
				<div className="absolute -translate-x-full bottom-full mb-2 px-2 py-1 text-xs text-white bg-black rounded">
					{btnDescription}
				</div>
			)}
		</div>
	);
};

export default ChangeStatusBtn;
