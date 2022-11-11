import React from 'react';

export const UserTable = ({ headers, listOfReceiver }) => {
    return (
        <div>
            <table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <thead>
                    <tr>
                        {headers.map(row => {
                            return (
                                <th style={{ "fontWeight": "bold" }}>{row.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {listOfReceiver.map((row, index) => (
                        <tr
                            key={row.id+index}
                        >
                            <td>{(row.index) + 1}</td>
                            <td>{row.device}</td>
                            <td>{row.status}</td>
                            <td>{row.activity}</td>
                            <td>{row.comment}</td>
                            <td>{row.user}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

