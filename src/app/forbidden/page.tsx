import Logo from '@/components/_layout/Logo'
import Link from 'next/link'
import React from 'react'

const Forbidden = () => {
  return (
    <div className="mx-5 h-[56svh] sm:h-[70svh]">
			<div className="my-[4rem]">
				<div className="flex flex-col gap-4 items-center justify-center text-center ">
					<h1 className="text-3xl font-bold text-zinc-700">Welcome</h1>
					<Logo containerStyles="mb-16 mt-2" />
				</div>

				<div className="flex flex-col gap-4 items-center justify-center place-items-center p-5 ">
					<h1 className="text-3xl">403 - Page Forbidden</h1>
					<p className="text-center">Oops, you do not have access to the page you are looking for.</p>
					<button className="border px-4 py-2 rounded-full hover:border-yellow-500 transition-all bg-slate-300">
						<Link href="/" className="text-zinc-700 ">Go back home</Link>
					</button>
				</div>
			</div>
		</div>
  )
}

export default Forbidden