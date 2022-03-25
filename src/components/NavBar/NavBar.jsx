import { Link } from 'react-router-dom'


const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/index">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                  <li><a href="/profiles" class="dropdown-item">Profiles</a></li>
                  <li><a href="/create" class="dropdown-item">Add a Business</a></li>
                  <li><a href="/index" class="dropdown-item">All Businesses</a></li>
                  <li><a href="/wishlist" class="dropdown-item">Your Wishlists</a></li>
                  <li><a href="" onClick={handleLogout} class="dropdown-item">LOG OUT</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      :
        <nav>
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
