import { useEffect, useState } from "react";

import useAuth from "../../../context/authContext/useAuth.js";
import { MainButton } from "../../../components.styled/styledComponents.js";
import { Image } from "cloudinary-react";
import noPhoto from "../../../img/noPhoto.png";
import NotAuthorized from "../error/NotAuthorized.js";
import EditProfile from "../profile/EditProfile.js";
import MyReviews from "./MyReviews.js";

function Profile() {
  const { isAuthenticated, getProfileInfo, userInfo } = useAuth();
  const [editToggle, setEditToggle] = useState(false);
  const [reviewToggle,setReviewToggle] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      getProfileInfo(user.id);
    }
  }, [editToggle]);

  return (
    <div className="text-light">
      {isAuthenticated ? (
        userInfo && (
          <>
            <div className="w-50 mx-auto my-5">
              {userInfo.imgProfile === "no_photo" ? (
                <div>
                  <img className="w-25 d-block" src={noPhoto} alt="user" />
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Image
                    className="w-25 rounded-circle"
                    cloudName="schoolgroupfinal"
                    publicId={userInfo.imgProfile}
                  />
                </div>
              )}
              <div>
                <div className="d-flex justify-content-between border-bottom border-dark">
                  <p>User Name</p>
                  <p>{userInfo.username}</p>
                </div>
                <div className="d-flex justify-content-between border-bottom border-dark">
                  <p>First Name</p>
                  <p>{userInfo.fname}</p>
                </div>
                <div className="d-flex justify-content-between border-bottom border-dark">
                  <p>Last Name</p>
                  <p>{userInfo.lname}</p>
                </div>
                <div className="d-flex justify-content-between border-bottom border-dark">
                  <p>Email</p>
                  <p>{userInfo.email}</p>
                </div>
                {userInfo.isOwner && (
                  <div className="d-flex justify-content-between border-bottom border-dark">
                    <p>Address</p>
                    <p>
                      {userInfo.address.street}
                      {userInfo.address.houseNr}, {userInfo.address.postalcode}{" "}
                      {userInfo.address.city}
                    </p>
                  </div>
                )}
              </div>
              {userInfo.telNumber && (
                <div className="d-flex justify-content-between border-bottom border-dark">
                  <p>Phone Number</p>
                  <p>{userInfo.telNumber}</p>
                </div>
              )}
            </div>
            <div className="mx-auto w-25 d-flex justify-content-between">
              <MainButton
                onClick={() =>
                  editToggle ? setEditToggle(false) : setEditToggle(true)
                }
              >
                Edit Profile
              </MainButton>
              <MainButton
                onClick={() =>
                  reviewToggle ? setReviewToggle(false) : setReviewToggle(true)
                }
              >
                My reviews
              </MainButton>
            </div>
          </>
        )
      ) : (
        <NotAuthorized />
      )}
      {editToggle && (
        <EditProfile editToggle={editToggle} setEditToggle={setEditToggle} />
      )}
      { reviewToggle && <MyReviews userInfo={userInfo}/>

      }
    </div>
  );
}
export default Profile;
