import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, LabelList, Label } from "recharts";
import { devitrackApi } from "../../../apis/devitrackApi";

/**

An array of CSS variables representing color values
@type {Array<string>}
*/
const colors = ["var(--main-colorsbluetiful)", "var(--main-colorszen)"];

/**

React component that displays data receivers activity
@returns {JSX.Element} JSX Element
*/
export const DisplayDataReceiversActivity = () => {
  /**
   * Redux state selector for payment intent detail selected
@type {object}
   */
  const { paymentIntentDetailSelected } = useSelector((state) => state.stripe);

  /**

State variable to hold the data that has been called from the API
@type {null|object}
*/
  const [dataCalled, setDataCalled] = useState(null);

  /**

An object to store sorted data
@type {object}
*/
  const sortedData = {};

  /**

Calls the API to get the data on data receivers
@async
*/
  const callData = async () => {
    const response = await devitrackApi.get("/receiver/receiver-pool-list");
    if (response) {
      setDataCalled(response.data.receiversInventory);
    }
  };

  /**

Calls the callData function on component mount and aborts any ongoing request on component unmount
@effect
*/
  useEffect(() => {
    const controller = new AbortController();
    callData();
    return () => {
      controller.abort();
    };
  }, [paymentIntentDetailSelected]);

  /**

Loops through the data and sorts it according to activity, then stores the sorted data in an object
*/
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

  /**

An object to store the final sorted data
@type {object}
*/
  let finalData = {
    name: "",
    value: "",
  };

  /**

An array to store the sorted data after conversion from an object to an array of objects
@type {Array<object>}
*/
  const aux = [];

  /**

Loops through the sortedData object and adds the key-value pairs to the aux array
*/
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
      <p>
        <strong>Receivers Activity</strong>
      </p>
      <PieChart width={300} height={350}>
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
