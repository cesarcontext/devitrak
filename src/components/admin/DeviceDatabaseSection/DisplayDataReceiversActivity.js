import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, LabelList, Label } from "recharts";
import { devitrackApi } from "../../../apis/devitrackApi";

const colors = ["rgb(0, 71, 119)", "#2D3047", "#FFBB28", "#FF8042"];

export const DisplayDataReceiversActivity = () => {
  const { paymentIntentDetailSelected } =
  useSelector((state) => state.stripe);

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
      if (dataCalled[i].activity === "Stored") {
        if (!sortedData[dataCalled[i].activity]) {
          sortedData[dataCalled[i].activity] = 1;
        } else {
          sortedData[dataCalled[i].activity]++;
        }
      }
      if (dataCalled[i].activity === "In-use") {
        if (!sortedData[dataCalled[i].activity]) {
          sortedData[dataCalled[i].activity] = 1;
        } else {
          sortedData[dataCalled[i].activity]++;
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
      <div
        style={{
          width: "32%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label>Receivers Activity</label>
        <PieChart width={630} height={350}>
          <Pie
            data={aux}
            cx="50%"
            cy="50%"
            outerRadius={130}
            label
            animationEasing="ease-in-out"
          >
            <LabelList dataKey="name" position="insideTop" angle="0" stroke="#ffff"/>
            {aux.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </div>
  );
};
