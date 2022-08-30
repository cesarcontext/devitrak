import React from 'react'
import { useDeviceCount } from '../hooks/useDeviceCountStore'

export const ReturnDeviceAlert = () => {

    const {deviceSelected} = useDeviceCount()
  return (
    <div>
        <div style={{ width: "30%", margin: "auto" }}>
          {deviceSelected > 0 ? (
            <div style={{ width: "100%", margin: "auto" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "25px",
                }}
                className="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="35"
                  fill="currentColor"
                  className="bi bi-exclamation-triangle"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                  <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                </svg>
                <div>
                  <h4>
                    You need to return {deviceSelected}{" "}
                    {deviceSelected > 1 ? "devices" : "device"}
                  </h4>
                  <span>
                    You have 3 days remaining. <br />
                    Devices not returned within 3 days will be charged to your
                    credit card on file.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="alert alert-success d-flex align-items-center"
              role="alert"
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "25px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="35"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <div>
                <h4>
                  You have {deviceSelected} pending{" "}
                  {deviceSelected > 1 ? "devices" : "device"}
                </h4>
                <span>You have returned all your devices.</span>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
