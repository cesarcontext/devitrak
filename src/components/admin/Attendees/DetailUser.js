import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { devitrackApi } from "../../../apis/devitrackApi";
import { useDispatch } from "react-redux";
import { ModalCreateTransactionForNoRegularUser } from "../ui/ModalCreateTransactionForNoRegularUser";
import { ModalPaidTransaction } from "../ui/ModalPaidTransaction";
import { Navbar } from "../ui/Navbar";
import { ReceiversDetailsAssignation } from "./ReceiversDetailsAssignation";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";
import { useAdminStore } from "../../../hooks/useAdminStore";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
  onCheckReceiverPaymentIntent,
} from "../../../store/slices/stripeSlice";
import "../../../style/component/admin/attendeesInfo.css";
import { ModalNotification } from "../ui/ModalNotification";

/**

DetailUser Component renders the detail of the selected user and provides
functionalities like updating user category, creating transaction, and activating notifications
@returns {JSX.Element} DetailUser component
*/
export const DetailUser = () => {
  /**

Map object containing all the users with their id as key
@type {Map<number, object>}
*/
  const userSelected = new Map();
  /**

State to control the display of the option to update user category
@type {boolean}
*/
  const [showOptionToUpdate, setShowOptionToUpdate] = useState(false);

  /**

State to control the display of create transaction form
@type {boolean}
*/
  const [createTransactionPaid, setCreateTransactionPaid] = useState(false);

  /**

State to control the activation of user notifications
@type {boolean}
*/
  const [notificationActivation, setNotificationActivation] = useState(false);

  /**

State to store all user data fetched from the API
@type {array}
*/
  const [userData, setUserData] = useState([]);

  /**

State to store the detail of the selected user
@type {object[]}
*/
  const [userDetail, setUserDetail] = useState([]);

  /**

State to store the new category value updated by admin for the selected user
@type {string}
*/
  const [newCategory, setNewCategory] = useState("");

  /**

The redux dispatch function used to update the store with the selected user information
@type {Function}
*/
  const dispatch = useDispatch();

  /**

The current authenticated admin user
@type {object}
*/
  const { user } = useAdminStore();
  /**

State to control the display of create transaction form for non-regular user
@type {boolean}
*/
  const [
    createTransactionForNoRegularUser,
    setCreateTransactionForNoRegularUser,
  ] = useState(false);
  /**

The url of the current user page
@type {string}
*/
  const user_url = window.location.pathname.split("/").at(-1);

  /**

The id of the user displayed on the current page
@type {number}
*/
  const user_detail_id = user_url.split(":").at(-1);

  /**

The current authenticated admin user
@type {object}
*/
  const adminUser = user;

  /**

The function used to fetch user data from the API and update the state
@type {Function}
*/
  const callUserApi = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUserDetail(response.data.users);
    }
  };

  // Maps the fetched user data to userSelected map
  if (userDetail.length > 0) {
    userDetail?.map((user) => {
      return userSelected.set(user.id, user);
    });
  }

  const userToDisplay = userSelected.get(user_detail_id);

  /**

The useEffect hook to fetch user data on component mount
*/
  useEffect(() => {
    const controller = new AbortController();
    callUserApi();
    return () => {
      controller.abort();
    };
  }, []);

  /**

The function used to update user category and send PUT request to the API
* @async
 * @function
 * @returns {Promise<void>}
*/
  const handleEditCategory = async () => {
    try {
      const response = await devitrackApi.put(`/auth/${user_detail_id}`, {
        ...userDetail,
        category: newCategory,
      });
      if (response) {
        alert("User category updated");
        setShowOptionToUpdate(false);
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Handles going back to the previous page and clears the selected payment intent.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleBack = async () => {
    dispatch(onAddPaymentIntentSelected(undefined));
    dispatch(onAddPaymentIntentDetailSelected([]));
    dispatch(onCheckReceiverPaymentIntent(undefined));
  };
  return (
    <div>
      <Navbar />
      <div className="container-attendees-info-detail">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Details</h2>
          <Link to="/admin/attendees">
            <button
              className="btn btn-delete"
              style={{ width: "fit-content" }}
              onClick={handleBack}
            >
              Back
            </button>
          </Link>
        </div>
        <div className="container-user-info-detail">
          <div className="container-details-button" key={userToDisplay?.id}>
            <div className="user-details-breadown">
              <p>
                <strong>Fullname:</strong>{" "}
                {`${userToDisplay?.name}, ${userToDisplay?.lastName}`}
              </p>
              <p>
                <strong>Email: </strong> {userToDisplay?.email}
              </p>
              <p>
                <strong>Phone: </strong> {userToDisplay?.phoneNumber}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <strong>Category: </strong>
              {adminUser.role === "Administrator" ? (
                <p
                  style={{
                    cursor: "pointer",
                    textDecorationLine: "underline",
                    textDecorationColor: "var(--main-bluetiful)",
                  }}
                  onClick={() => setShowOptionToUpdate(true)}
                >
                  &nbsp;{userToDisplay?.category}
                </p>
              ) : (
                `${userToDisplay?.category}`
              )}
            </div>
            <div>
              {showOptionToUpdate !== false &&
              adminUser.role === "Administrator" ? (
                <div style={{ gap: "5px" }}>
                  <select
                    name="newCategory"
                    onChange={(event) => setNewCategory(event.target.value)}
                  >
                    <option></option>
                    <option value="Regular">Regular</option>
                    <option value="Corporate">Corporate</option>
                  </select>{" "}
                  <button
                    style={{ width: "fit-content" }}
                    className="btn btn-delete"
                    onClick={() => setShowOptionToUpdate(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ width: "fit-content" }}
                    className="btn btn-create"
                    onClick={handleEditCategory}
                  >
                    Update
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="container-create-transaction-button">
            {adminUser.role === "Administrator" &&
              userDetail?.map((user) => {
                if (user.id === user_detail_id) {
                  return (
                    <>
                      <p
                        className=""
                        onClick={() => {
                          setCreateTransactionForNoRegularUser(true);
                          setUserData(user);
                        }}
                      >
                        NEW TRANSACTION <i className="bi bi-plus-circle" />
                      </p>
                      <p
                        className=""
                        onClick={() => {
                          setCreateTransactionPaid(true);
                          setUserData(userDetail);
                        }}
                      >
                        NEW PAID TRANSACTION <i className="bi bi-plus-circle" />
                      </p>
                      <p
                        className=""
                        onClick={() => {
                          setNotificationActivation(true);
                          setUserData(userDetail);
                        }}
                      >
                        NOTIFICATION <i className="bi bi-plus-circle" />
                      </p>
                    </>
                  );
                }
              })}
          </div>
        </div>{" "}
        <div className="container-attendes-stripe-transaction-info">
          {userData?.id === user_detail_id ? (
            <div
              id="stripe-transaction-detail-per-user-id"
              className="stripetransaction-detail-info"
              key={user.id}
            >
              <StripeTransactionHistoryByUser
                sendObjectIdUser={user_detail_id}
                userDetail={userData}
                createTransactionForNoRegularUser={
                  createTransactionForNoRegularUser
                }
              />
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <StripeTransactionHistoryByUser />
        <ReceiversDetailsAssignation />
      </div>
      <ModalCreateTransactionForNoRegularUser
        createTransactionForNoRegularUser={createTransactionForNoRegularUser}
        setCreateTransactionForNoRegularUser={
          setCreateTransactionForNoRegularUser
        }
        sendObjectIdUser={user_detail_id}
      />
      <ModalPaidTransaction
        createTransactionPaid={createTransactionPaid}
        setCreateTransactionPaid={setCreateTransactionPaid}
        userToDisplay={userToDisplay}
      />
      <ModalNotification
        notificationActivation={notificationActivation}
        setNotificationActivation={setNotificationActivation}
        userToDisplay={userToDisplay}
      />
    </div>
  );
};
