
const Sidebar = () => {
  return (
    <nav className=" navbar-dark bg-primary sidebar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="white" d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2M5 5v14h14V5H5z" />
          </svg>
          Dashboard
        </a>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="white" d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2M5 5v14h14V5H5z" />
              </svg>
              Sales
            </a>
          </li>
          {/* Add more list items for additional links */}
        </ul>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="white" d="M3 3h18v2H3V3m0 4h18v2H3V7m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2m0 4h18v2H3v-2M5 5v14h14V5H5z" />
              </svg>
              Sales
            </a>
          </li>
          {/* Add more list items for additional links */}
        </ul>
      </div>
    </nav>
  );
}

export default Sidebar;
