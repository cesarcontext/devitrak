import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, LabelList, Label } from "recharts";
import { devitrackApi } from "../../../apis/devitrackApi";

const colors = [
  "var(--main-colorsbluetiful)",
  "var(--main-colorszen)",
];

export const GraphicDisplayDevices = () => {
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
        name: `${value}`,
        value: parseInt(`${value}`),
      };
      aux.push(finalData);
    } else if (finalData.name !== `${key}`) {
      finalData = {
        name: `${value}`,
        value: parseInt(`${value}`),
      };
      aux.push(finalData);
    }
  }

  const porcentage = (value) => {
    let valueToPorcentage = value / aux.length
    let result = valueToPorcentage * 100
    return result
  }
  return (
      <PieChart width={300} height={350}>
        <Pie
          data={aux}
          cx="50%"
          cy="50%"
        >
          <LabelList
            dataKey="name"
            position="insideTop"
            angle="0"
            stroke="var(--black)"
          />
          {aux.map((entry, index) => (
            <Cell key={`cell-${porcentage(entry.value)}%`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
  );
};