import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, LabelList } from "recharts";
import { devitrackApi } from "../../../apis/devitrackApi";

const colors = ["#214469", "#4000FF", "#7B2836", "#000000", "#080144"];

export const DisplayDataReceiversStatus = () => {
  const { paymentIntentDetailSelected } = useSelector((state) => state.stripe);

  const [dataCalled, setDataCalled] = useState(null);
  const sortedData = {};

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
    <div>
      <label>Receivers Status</label>
      <PieChart width={335} height={350}>
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
            stroke="#ffff"
          />
          {aux.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};