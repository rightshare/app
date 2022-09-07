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

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <Button type="button" onClick={(event) => handleEditClick(event, contact)}>
          <Icon name="edit"></Icon>
        </Button>
        <Button type="button" onClick={() => handleDeleteClick(contact.id)}>
          <Icon name="trash"></Icon>
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
