import { NavLink } from "react-router-dom";
const MenuItem = ({ path, label }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? "bg-warning" : "bg-white")}
      end
    >
      {label}
    </NavLink>
  );
};

export default MenuItem;
