const addReceiverToNoRegularUser = async () => {
  const replacementList = [...receiversAssigned, receiverObject];
  if (replacementList.length <= paymentIntentDetailSelected.device) {
    await setReceiversAssigned(replacementList);
    await setReceiverNumberAssgined("");
  }
};


const handleDataNoRegularUserSubmitted = async () => {
  try {
    const response = await devitrackApiAdmin.post("/receiver-assignation", {
      paymentIntent: paymentIntentDetailSelected.paymentIntent,
      device: receiversAssigned,
      user: paymentIntentDetailSelected.user,
      active: true,
    });
    if (response) {
      setFetchedData(response.data);
      setLoading(!loading);
      receiversAssigned?.map((item) => {
        devitrackApi.post("/receiver/receivers-pool", {
          device: item.serialNumber,
          status: "Operational",
          activity: "In-use",
          comment: "No comment",
          user: paymentIntentDetailSelected.user.email,
        });
      });
    }
    Swal.fire({
      title: "",
      width: 600,
      padding: "3em",
      text: `Receivers were assigned to payment intent successfully`,
      icon: "success",
      color: "#rgb(30, 115, 190)",
      background: "#fff",
      confirmButtonColor: "rgb(30, 115, 190)",
      backdrop: `
      rgb(30, 115, 190)
        url("../image/logo.jpg")
        left top
        no-repeat
      `,
    });
    setSaveButtonDisplay(true);
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Upss something went wrong!!",
      width: 600,
      padding: "3em",
      text: `${error.response}`,
      icon: "error",
      color: "#rgb(30, 115, 190)",
      background: "#fff",
      confirmButtonColor: "rgb(30, 115, 190)",
      backdrop: `
        rgb(30, 115, 190)
          url("../image/logo.jpg")
          left top
          no-repeat
        `,
    });
  }
};

const addMoreReceiverToNoRegularUser = async () => {
  try {
    let paymentIntentReceiversAssignedCopy = [];
    paymentIntentReceiversAssigned?.at(-1).device?.map((receiver) => {
      return paymentIntentReceiversAssignedCopy.push(receiver);
    });

    const listToAddToExistAssignedReceiversSaved = [
      ...paymentIntentReceiversAssignedCopy,
      receiverObject,
    ];
    const response = devitrackApi.put(
      `/receiver/receiver-update/${paymentIntentReceiversAssigned.at(-1).id}`,
      {
        id: paymentIntentReceiversAssigned.at(-1).id,
        device: listToAddToExistAssignedReceiversSaved,
      }
    );
    if (response) {
      devitrackApi.post("/receiver/receivers-pool", {
        device: receiverObject.serialNumber,
        status: "Operational",
        activity: "In-use",
        comment: "No comment",
        user: [paymentIntentDetailSelected.user.email],
      });
      setLoading(true);
      setUpdateListAfterAddNewReceiverForNoRegularUser(
        !updateListAfterAddNewReceiverForNoRegularUser
      );
      alert("Receiver assigned");
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: ReceiversDetailsAssignation.js ~ line 352 ~ addMoreReceiverToNoRegularUser ~ error",
      error
    );
  }
};


 <div>
        {paymentIntentDetailSelected.user?.category !== "No-regular" ? (
          <div>
            {loading !== true ? (
              <>
                {paymentIntentReceiversAssigned?.length < 1 ? (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    {receiversAssigned.length !==
                    paymentIntentDetailSelected.device ? (
                      <>
                        <input
                          style={{ width: "100%" }}
                          value={receiverNumberAssgined}
                          name="receiverNumberAssgined"
                          id="receiverNumberAssgined"
                          type="text"
                          onChange={(event) =>
                            setReceiverNumberAssgined(event.target.value)
                          }
                        />
                        <button className="btn btn-create" style={{ width: "50%" }} onClick={addReceiver}>
                          Add receiver
                        </button>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      name="searcTerm"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search receiver"
                    />
                  </div>
                )}
                <div>
                  <div
                    style={{
                      width: "80%",
                      margin: "0 auto",
                    }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Serial Number</th>
                          <th scope="col">Type</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      {paymentIntentReceiversAssigned?.length > 0
                        ? paymentIntentReceiversAssigned
                            ?.at(-1)
                            .device?.map((receiver, index) => {
                              return (
                                <tbody key={index + 1}>
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{receiver.serialNumber}</td>
                                    <td>
                                      <span>Receiver</span>
                                    </td>
                                    <td>
                                      {receiver.status !== false
                                        ? "ACTIVATED"
                                        : "INACTIVATED"}
                                    </td>
                                    <td>
                                      <button
                                      className="btn btn-create"
                                        onClick={() =>
                                          replaceFunctionTrigger(
                                            receiver,
                                            index
                                          )
                                        }
                                      >
                                        Replace
                                      </button>
                                    </td>
                                    <td>
                                      {receiver.status !== false ? (
                                        <button
                                        className="btn btn-delete"
                                          onClick={() =>
                                            handleReturnDevice(receiver, index)
                                          }
                                        >
                                          Return
                                        </button>
                                      ) : (
                                        <button
                                        className="btn btn-create"
                                          onClick={() =>
                                            handleAssignDevice(receiver, index)
                                          }
                                        >
                                          Assign
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })
                        : receiversAssigned?.map((item, index) => {
                            return (
                              <tbody key={index + item}>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.serialNumber}</td>
                                  <td>
                                    <span>Receiver</span>
                                  </td>
                                  <td>
                                    <span>
                                      {item.status === true
                                        ? "ACTIVATED"
                                        : "INACTIVATED"}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                    className="btn btn-delete"
                                      onClick={() =>
                                        removeReceiverBeforeSavedData(index)
                                      }
                                    >
                                      Remove Receiver
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                    </table>
                  </div>
                </div>
                <div style={{ width: "20%", margin: "0 auto" }}>
                  {receiversAssigned?.length ===
                    paymentIntentDetailSelected.device && (
                    <button
                    className="btn btn-create"
                      disabled={saveButtonDisplay}
                      onClick={handleDataSubmitted}
                    >
                      Save
                    </button>
                  )}
                </div>
              </>
            ) : (
              <h6>Loading...</h6>
            )}
          </div>
        ) : (
          //!Redefine function to display saved data from user categor No-regular
          <div>
            {loading !== true ? (
              <>
                {paymentIntentReceiversAssigned?.length < 1 ? (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    <input
                      style={{ width: "100%" }}
                      value={receiverNumberAssgined}
                      name="receiverNumberAssgined"
                      id="receiverNumberAssgined"
                      type="text"
                      onChange={(event) =>
                        setReceiverNumberAssgined(event.target.value)
                      }
                    />
                    <button
                    className="btn btn-create"
                      style={{ width: "50%" }}
                      onClick={addReceiverToNoRegularUser}
                    >
                      Add receiver
                    </button>
                  </div>
                ) : (
                  <div
                    style={{ width: "40%", display: "flex", margin: "0 auto" }}
                  >
                    <input
                      style={{ width: "100%" }}
                      value={receiverNumberAssgined}
                      name="receiverNumberAssgined"
                      id="receiverNumberAssgined"
                      type="text"
                      onChange={(event) =>
                        setReceiverNumberAssgined(event.target.value)
                      }
                    />
                    <button
                    className="btn btn-create"
                      style={{ width: "50%" }}
                      onClick={addMoreReceiverToNoRegularUser}
                    >
                      Add more receiver
                    </button>
                  </div>
                )}
                <div>
                  <div
                    style={{
                      width: "80%",
                      margin: "0 auto",
                    }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Serial Number</th>
                          <th scope="col">Type</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      {paymentIntentReceiversAssigned?.length > 0
                        ? paymentIntentReceiversAssigned
                            ?.at(-1)
                            .device?.map((receiver, index) => {
                              return (
                                <tbody key={index + 1}>
                                  <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{receiver.serialNumber}</td>
                                    <td>
                                      <span>Receiver</span>
                                    </td>
                                    <td>
                                      {receiver.status !== false
                                        ? "ACTIVATED"
                                        : "INACTIVATED"}
                                    </td>
                                    <td>
                                      <button
                                      className="btn btn-create"
                                        onClick={() =>
                                          replaceFunctionTrigger(
                                            receiver,
                                            index
                                          )
                                        }
                                      >
                                        Replace
                                      </button>
                                    </td>
                                    <td>
                                      {receiver.status !== false ? (
                                        <button
                                        className="btn btn-delete"
                                          onClick={() =>
                                            handleReturnDevice(receiver, index)
                                          }
                                        >
                                          Return
                                        </button>
                                      ) : (
                                        <button
                                        className="btn btn-create"
                                          onClick={() =>
                                            handleAssignDevice(receiver, index)
                                          }
                                        >
                                          Assign
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              );
                            })
                        : receiversAssigned?.map((item, index) => {
                            return (
                              <tbody key={index + item}>
                                <tr>
                                  <th scope="row">{index + 1}</th>
                                  <td>{item.serialNumber}</td>
                                  <td>
                                    <span>Receiver</span>
                                  </td>
                                  <td>
                                    <span>
                                      {item.status === true
                                        ? "ACTIVATED"
                                        : "INACTIVATED"}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                    className="btn btn-delete"
                                      onClick={() =>
                                        removeReceiverBeforeSavedData(index)
                                      }
                                    >
                                      Remove Receiver
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                    </table>
                  </div>
                </div>
               <div style={{ width: "20%", margin: "0 auto" }}>
                 <button
                 className="btn btn-create"
                   disabled={saveButtonDisplay}
                   onClick={handleDataNoRegularUserSubmitted}
                 >
                   Save
                 </button>
               </div>
             </>
           ) : (
             <h6>Loading...</h6>
           )}
         </div>
       )}
     </div>
