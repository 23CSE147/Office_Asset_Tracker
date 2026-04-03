import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./pageHeader.css";
function PageHeader({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  const showBack = location.pathname !== "/dashboard";

  return (
    <div className="page-header">
      {showBack && (
        <button className="back-btn" onClick={handleBack}>
          <FaArrowLeft />
        </button>
      )}

      <h2 className="page-title">{title}</h2>
    </div>
  );
}

export default PageHeader;