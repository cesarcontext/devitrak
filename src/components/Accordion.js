import React from "react";
import { useDeviceCount } from "../hooks/useDeviceCountStore";

export const Accordion = () => {

    const {deviceRented} = useDeviceCount()
  return (
    <div>
      <div style={{ width: "50%", margin: "auto", border: "solid 1px #fff" }}>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <h3>PENDING DEVICES</h3>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                {deviceRented?.map((device, index) => {
                  return (
                    <div key={index}>
                      {device + 1}
                      <input disabled />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <h3>RETURNED DEVICES</h3>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
