import React, { useState } from "react";
import { ModalCreateTransactionForNoRegularUser } from "../ui/ModalCreateTransactionForNoRegularUser";
import { StripeTransactionHistoryByUser } from "./StripeTransactionHistoryByUser";
import { useAdminStore } from "../../../hooks/useAdminStore";
import "../../../style/component/admin/attendeesInfo.css";
import "../../../style/component/ui/paginate.css";
import { devitrackApi } from "../../../apis/devitrackApi";

export const DetailUser = ({ sendObjectIdUser, userDetail }) => {
  const [showOptionToUpdate, setShowOptionToUpdate] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { user } = useAdminStore();
  const [
    createTransactionForNoRegularUser,
    setCreateTransactionForNoRegularUser,
  ] = useState(false);

  const handleEditCategory = async () => {
    try {
      const response = await devitrackApi.put(`/auth/${userDetail.id}`, {
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

  return (
    <div>
      <div className="container-attendees-info-detail">
        <div style={{ textAlign: "left" }}>
          <h2>Details</h2>
        </div>
        <div className="container-user-info-detail">
          <div className="container-details-button" key={userDetail?.id}>
            <div className="user-details-breadown">
              <p>
                <strong>Fullname:</strong>{" "}
                {`${userDetail?.name}, ${userDetail?.lastName}`}
              </p>
              <p>
                <strong>Email: </strong> {userDetail?.email}
              </p>
              <p>
                <strong>Phone: </strong> {userDetail?.phoneNumber}
              </p>
            </div>

            <div style={{ display: "flex" }}>
              <strong>Category: </strong>
              {user.role === "Administrator" ? (
                <p
                  style={{
                    cursor: "pointer",
                    textDecorationLine: "underline",
                    textDecorationColor: "var(--main-bluetiful)",
                  }}
                  onClick={() => setShowOptionToUpdate(true)}
                >
                  &nbsp;{userDetail?.category}
                </p>
              ) : (
                `${userDetail?.category}`
              )}
            </div>
            <div>
              {showOptionToUpdate !== false ? (
                <div style={{gap:"5px"}}>
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
            {user.role === "Administrator" ? (
              userDetail?.id === sendObjectIdUser ? (
                <p
                  className=""
                  onClick={() => {
                    setCreateTransactionForNoRegularUser(true);
                  }}
                >
                  NEW TRANSACTION <i className="bi bi-plus-circle" />
                </p>
              ) : null
            ) : null}
          </div>
        </div>
        <div className="container-attendes-stripe-transaction-info">
          {userDetail?.id === sendObjectIdUser ? (
            <div
              id="stripe-transaction-detail-per-user-id"
              className="stripetransaction-detail-info"
              key={user.id}
            >
              <StripeTransactionHistoryByUser
                sendObjectIdUser={sendObjectIdUser}
                userDetail={userDetail}
                createTransactionForNoRegularUser={
                  createTransactionForNoRegularUser
                }
              />
            </div>
          ) : null}
        </div>
      </div>
      <ModalCreateTransactionForNoRegularUser
        createTransactionForNoRegularUser={createTransactionForNoRegularUser}
        setCreateTransactionForNoRegularUser={
          setCreateTransactionForNoRegularUser
        }
        sendObjectIdUser={sendObjectIdUser}
      />
    </div>
  );
};
