import React, { useEffect, useState } from "react";
import { devitrackApi } from "../../../apis/devitrackApi";
import { ModalCreateTransactionForNoRegularUser } from "../ui/ModalCreateTransactionForNoRegularUser";
import { ModalPaidTransaction } from "../ui/ModalPaidTransaction";
import { Navbar } from "../ui/Navbar";
import { ReceiversDetailsAssignation } from "./ReceiversDetailsAssignation";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "../../../style/component/admin/attendeesInfo.css";
import { useDispatch } from "react-redux";
import {
  onAddPaymentIntentDetailSelected,
  onAddPaymentIntentSelected,
  onCheckReceiverPaymentIntent,
} from "../../../store/slices/stripeSlice";
import { Link, useNavigate } from "react-router-dom";

export const DetailUser = () => {
  const [showOptionToUpdate, setShowOptionToUpdate] = useState(false);
  const [createTransactionPaid, setCreateTransactionPaid] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAdminStore();
  const [
    createTransactionForNoRegularUser,
    setCreateTransactionForNoRegularUser,
  ] = useState(false);
  const user_url = window.location.pathname.split("/").at(-1);
  const user_detail_id = user_url.split(":").at(-1);
  const adminUser = user;
  const callUserApi = async () => {
    const response = await devitrackApi.get("/auth/users");
    if (response) {
      setUserDetail(response.data.users);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    callUserApi();
    return () => {
      controller.abort();
    };
  }, []);

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
      console.log(
        "🚀 ~ file: DetailUser.js:22 ~ handleEditCategory ~ error",
        error
      );
      alert(error);
    }
  };

  const handleBack = async () => {
    await dispatch(onAddPaymentIntentSelected(undefined));
    await dispatch(onAddPaymentIntentDetailSelected([]));
    await dispatch(onCheckReceiverPaymentIntent(undefined));
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
          <div className="container-details-button" key={userDetail?.id}>
            {userDetail?.map((user) => {
              if (user.id === user_detail_id) {
                return (
                  <>
                    <div className="user-details-breadown">
                      <p>
                        <strong>Fullname:</strong>{" "}
                        {`${user?.name}, ${user?.lastName}`}
                      </p>
                      <p>
                        <strong>Email: </strong> {user?.email}
                      </p>
                      <p>
                        <strong>Phone: </strong> {user?.phoneNumber}
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
                          &nbsp;{user?.category}
                        </p>
                      ) : (
                        `${user?.category}`
                      )}
                    </div>
                    <div>
                      {showOptionToUpdate !== false &&
                      adminUser.role === "Administrator" ? (
                        <div style={{ gap: "5px" }}>
                          <select
                            name="newCategory"
                            onChange={(event) =>
                              setNewCategory(event.target.value)
                            }
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
                  </>
                );
              }
            })}
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
                    </>
                  );
                }
              })}
            {/* {user.role === "Administrator" ? (
              userData?.id === user_detail_id ? (
                <>
                  {userData?.email && (
                    <p
                      className=""
                      onClick={() => {
                        setCreateTransactionForNoRegularUser(true);
                      }}
                    >
                      NEW TRANSACTION <i className="bi bi-plus-circle" />
                    </p>
                  )}
                  {userData?.email && (
                    <p
                      className=""
                      onClick={() => {
                        setCreateTransactionPaid(true);
                        setUserData(userDetail);
                      }}
                    >
                      NEW PAID TRANSACTION <i className="bi bi-plus-circle" />
                    </p>
                  )}
                </>
              ) : null
            ) : null} */}
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
        {/* <PaymentIntentTemplate /> */}
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
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
};
