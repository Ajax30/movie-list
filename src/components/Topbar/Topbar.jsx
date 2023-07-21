import './Topbar.css';
import Searchbox from '../Topbar/Searchbox'
import { ReactComponent as Applogo } from '../../logo.svg';
import { NavLink } from 'react-router-dom';

function Topbar() {
	return (
		<nav className="navbar sticky-top navbar-expand-md shadow-sm">
			<div className="container-fluid">
				<NavLink  to="/" className="navbar-brand">
					<Applogo className='app-logo' />
				</NavLink >
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="mainNavigation">
					<ul className="navbar-nav pe-md-1 navbar-expand-md">
						<li className="nav-item">
							<NavLink  to="/" className="nav-link" activeclassname="active">Now Playing</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to="/top-rated" className="nav-link">Top Rated</NavLink>
						</li>
					</ul>

					<Searchbox />
				</div>
			</div>
		</nav>
	);
}

export default Topbar;