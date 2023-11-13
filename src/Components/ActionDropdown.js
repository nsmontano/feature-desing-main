import { Link } from "react-router-dom";

const ActionDropdown = ({ actions }) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      ></button>
      <ul className="dropdown-menu">
        {actions.map((action, index) => (
          <li key={index}>
            <Link to={action.path} className="dropdown-item">
              {action.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionDropdown;
