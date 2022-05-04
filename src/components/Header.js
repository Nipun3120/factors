import { Link, useLocation } from "react-router-dom";

export const Header = () => {
    const location = useLocation();
    const pathname = location.pathname;
    return(
        <div className="bg-header-blue flex justify-between items-center px-48 py-8">
            <div>
                <img src="./assets/images/logo.png" alt="logo"/>
                {/* <img src="src/assets/images/logo.png" alt="logo"/> */}
            </div>
            <div className="flex space-x-4">
                <Link to="/" className={pathname === '/' ? `underline decoration-white underline-offset-8` : ''}>Home</Link>
                <Link to="/about" className={pathname === '/about' ? `underline decoration-white underline-offset-8` : ''}>About Us</Link>
                <Link to="/clothing" className={pathname === '/clothing' ? `underline decoration-white underline-offset-8` : ''}>Clothing</Link>
                <Link to="/signin" className={pathname === '/signin' ? `underline decoration-white underline-offset-8` : ''}>Sign In</Link>
            </div>
        </div>
    )
}