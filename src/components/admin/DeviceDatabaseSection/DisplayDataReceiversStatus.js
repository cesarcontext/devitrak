import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import { devitrackApi } from "../../../apis/devitrackApi";

const colors = [
  "var(--main-colorszen)",
  "var(--graphic-status-damage)",
  "var(--graphic-status-network)",
  "var(--graphic-status-missed)",
  "var(--graphic-status-hardware)",
  "var(--graphic-status-other)",
];

/**

Displays the data receivers status of the DeviTrack platform.
@function
@returns {JSX.Element} JSX component for displaying the data receivers status.
*/
export const DisplayDataReceiversStatus = () => {
  const { paymentIntentDetailSelected } = useSelector((state) => state.stripe);

  const [dataCalled, setDataCalled] = useState(null);
  const sortedData = {};

  /**

Calls the API to fetch the data receivers list and sets the response in the state.
@async
@function
@returns {Promise<void>} Promise object that represents the completion of the API call.
*/
  const callData = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setDataCalled(response.data.receiversInventory);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    callData();
    return () => {
      controller.abort();
    };
  }, [paymentIntentDetailSelected]);

  if (dataCalled !== null) {
    for (let i = 0; i < dataCalled.length; i++) {
      if (dataCalled[i].status === "Operational") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
      if (dataCalled[i].status === "Missing") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
      if (dataCalled[i].status === "Network") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
      if (dataCalled[i].status === "Hardware") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
      if (dataCalled[i].status === "Damage") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
      if (dataCalled[i].status === "Other") {
        if (!sortedData[dataCalled[i].status]) {
          sortedData[dataCalled[i].status] = 1;
        } else {
          sortedData[dataCalled[i].status]++;
        }
      }
    }
  }
  let finalData = {
    name: "",
    value: "",
  };
  const aux = [];
  for (const [key, value] of Object.entries(sortedData)) {
    if (finalData.name.length < 1) {
      finalData = {
        name: `${key}`,
        value: parseInt(`${value}`),
      };
      aux.push(finalData);
    } else if (finalData.name !== `${key}`) {
      finalData = {
        name: `${key}`,
        value: parseInt(`${value}`),
      };
      aux.push(finalData);
    }
  }
  return (
    <div className="mt-5">
      <p><strong>Receivers Status</strong></p>
      <PieChart width={350} height={350}>
        <Pie
          data={aux}
          cx="50%"
          cy="50%"
          outerRadius={130}
          label
          animationEasing="ease-in-out"
        >
          <LabelList
            dataKey="name"
            position="insideTop"
            angle="0"
            stroke="var(--black)"
          />
          {aux.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};