import React from "react";

export const UserTable = ({ headers, data }) => {
  console.log("🚀 ~ file: UserTable.js:4 ~ UserTable ~ data", data)
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
        {data?.map(
          ({ id, device, status, activity, comment, user, index }) => (
            <tbody key={index}>
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{device}</td>
                <td>{status}</td>
                <td>{activity}</td>
                <td>{comment}</td>
                <td>{user}</td>
              </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  );
};
