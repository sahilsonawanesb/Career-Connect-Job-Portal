import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import  API_BASE_URL  from "../../../config/api.js";
import PropTypes from "prop-types";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(`${API_BASE_URL}/api/v1/application/employer/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(`${API_BASE_URL}/api/v1/application/jobseeker/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`${API_BASE_URL}/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  JobSeekerCard.propTypes = {
    element: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      coverLetter: PropTypes.string,
      resume: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
    deleteApplication: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };
  
  EmployerCard.propTypes = {
    element: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      coverLetter: PropTypes.string,
      resume: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
    openModal: PropTypes.func.isRequired,
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications Received</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

// eslint-disable-next-line react/prop-types
const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const handleResumeClick = () => {
    if (element.resume?.url) {
      openModal(element.resume.url);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      deleteApplication(element._id);
    }
  };

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        {element.resume?.url ? (
          <img
            src={element.resume.url}
            alt={`Resume for ${element.name}`}
            onClick={handleResumeClick}
            style={{ cursor: 'pointer' }}
            onError={(e) => {
              e.target.src = '/placeholder-resume.png'; // Add a fallback image
              e.target.alt = 'Resume not available';
            }}
          />
        ) : (
          <p>No resume available</p>
        )}
      </div>
      <div className="btn_area">
        <button onClick={handleDelete} className="delete-btn">
          Delete Application
        </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const EmployerCard = ({ element, openModal }) => {
  const handleResumeClick = () => {
    if (element.resume?.url) {
      openModal(element.resume.url);
    }
  };

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>Cover Letter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        {element.resume?.url ? (
          <img
            src={element.resume.url}
            alt={`Resume for ${element.name}`}
            onClick={handleResumeClick}
            style={{ cursor: 'pointer' }}
            onError={(e) => {
              e.target.src = '/placeholder-resume.png';
              e.target.alt = 'Resume not available';
            }}
          />
        ) : (
          <p>No resume available</p>
        )}
      </div>
    </div>
  );
};