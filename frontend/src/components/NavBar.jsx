import { useState } from "react";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, logout } = useUserStore();
	const { cart } = useCartStore();
	const isAdmin = user?.role === "admin";

	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
			<div className='container mx-auto px-4 py-3'>
				<div className='flex justify-between items-center'>
					<Link to='/' className='text-2xl font-bold text-emerald-400 flex items-center'>
						E-Commerce
					</Link>

					{/* Hamburger Toggle Button */}
					<button
						className='text-emerald-400 lg:hidden'
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label='Toggle menu'
					>
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>

					{/* Desktop Menu */}
					<nav className='hidden lg:flex items-center gap-4'>
						<NavLinks user={user} cart={cart} isAdmin={isAdmin} logout={logout} />
					</nav>
				</div>

				{/* Mobile Menu */}
				{menuOpen && (
					<nav className='mt-4 lg:hidden flex flex-col gap-3'>
						<NavLinks user={user} cart={cart} isAdmin={isAdmin} logout={logout} mobile />
					</nav>
				)}
			</div>
		</header>
	);
};

const NavLinks = ({ user, cart, isAdmin, logout, mobile = false }) => {
	const linkClass = `text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out ${mobile ? "block" : ""}`;
	const btnClass = `py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out ${
		mobile ? "justify-start" : ""
	}`;

	return (
		<>
			<Link to={"/"} className={linkClass}>
				Home
			</Link>

			{user && (
				<Link to={"/cart"} className={`relative group ${linkClass}`}>
					<ShoppingCart className='inline-block mr-1' size={20} />
					<span className='inline'>Cart</span>
					{cart.length > 0 && (
						<span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs'>
							{cart.length}
						</span>
					)}
				</Link>
			)}

			{isAdmin && (
				<Link to={"/secret-dashboard"} className={`bg-emerald-700 hover:bg-emerald-600 text-white ${btnClass}`}>
					<Lock size={18} className='mr-2' />
					Dashboard
				</Link>
			)}

			{user ? (
				<button
					onClick={logout}
					className={`bg-gray-700 hover:bg-gray-600 text-white ${btnClass}`}
				>
					<LogOut size={18} />
					<span className='ml-2'>Log Out</span>
				</button>
			) : (
				<>
					<Link
						to={"/signup"}
						className={`bg-emerald-600 hover:bg-emerald-700 text-white ${btnClass}`}
					>
						<UserPlus className='mr-2' size={18} />
						Sign Up
					</Link>
					<Link
						to={"/login"}
						className={`bg-gray-700 hover:bg-gray-600 text-white ${btnClass}`}
					>
						<LogIn className='mr-2' size={18} />
						Login
					</Link>
				</>
			)}
		</>
	);
};

export default Navbar;
