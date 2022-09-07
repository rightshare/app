import React from "react";
import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  PaginationComponent,
  Col,
  RSelect,
} from "../../../components/Component";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr className="tb-odr-item">
      <td>
        <input
          className="form-control"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tb-odr-info">
        <input
          className="form-control"
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tb-odr-info">
        <input
          className="form-control"
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phoneNumber"
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tb-odr-info">
        <input
          className="form-control"
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tb-odr-info">
        <Button type="submit">
          {" "}
          <Icon name="save"></Icon>
        </Button>
        <Button type="button" onClick={handleCancelClick}>
          <Icon name="arrow-left"></Icon>
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
