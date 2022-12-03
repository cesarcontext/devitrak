import React from "react";

export const UserTable = ({ headers, listOfReceiver }) => {

    const max = 2^53
  return (
    <div>
      <table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <thead>
          <tr>
            {headers.map((row) => {
              return <th style={{ fontWeight: "bold" }}>{row.label}</th>;
            })}
          </tr>
        </thead>
        {listOfReceiver.map(({id, device, status, activity, comment, index}) => (
          <tbody key={index}>
            <tr key={id * Math.floor(Math.random() * max)}>
              <td>{index + 1}</td>
              <td>{device}</td>
              <td>{status}</td>
              <td>{activity}</td>
              <td>{comment}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
