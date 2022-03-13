import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Table = ({ data, getBiodataById,deleteBiodataById }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email Address</th>
          <th scope="col">Gender</th>
          <th scope="col">Phone Number</th>
          <th scope="col">State of Origin</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            {/* <th scope="row">{index + 1}</th> */}
            <th scope="row">{item.id}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.stateOfOrigin}</td>
            <td className="d-block d-flex">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="btn text-primary"
                onClick={()=>getBiodataById(item.id)}
              />
              <FontAwesomeIcon icon={faTrashCan} className="btn text-danger" onClick={()=>deleteBiodataById(item.id)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
