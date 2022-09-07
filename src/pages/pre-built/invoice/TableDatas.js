import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
// import "../App.css";
import data from "../mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { useForm } from "react-hook-form";

import {
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownMenu,
  DropdownToggle,
  Card,
  Badge,
  DropdownItem,
  FormGroup,
  Form,
} from "reactstrap";
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
import { Link } from "react-router-dom";

const TableDatas = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <h4>Add Items</h4>

      <form onSubmit={handleAddFormSubmit}>
        <FormGroup>
          <Col md="12">
            <input
              className="form-control"
              type="text"
              name="fullName"
              required="required"
              placeholder="Enter Item Description"
              onChange={handleAddFormChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md="12">
            <input
              className="form-control"
              type="text"
              name="address"
              required="required"
              placeholder="QTY"
              onChange={handleAddFormChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md="12">
            {" "}
            <input
              className="form-control"
              type="text"
              name="phoneNumber"
              required="required"
              placeholder="Rate"
              onChange={handleAddFormChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col md="12">
            {/* <button className="btn-icon" type="submit">
              Add
            </button> */}
            <Button color="primary" size="md" type="submit">
              Add Item
            </Button>
            {/* <Button color="primary" type="submit" className="btn-icon">
              <Icon name="plus"></Icon>
            </Button> */}
          </Col>
        </FormGroup>
        {/* <input
          className="form-control"
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        /> */}
      </form>

      <br></br>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-orders">
          <thead className="tb-odr-head">
            <tr className="tb-odr-item">
              <th>Item Description</th>
              <th tb-odr-item>Qty</th>
              <th tb-odr-amount>Rate</th>
              <th tb-odr-amount>Amount</th>
              <th tb-odr-item>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default TableDatas;
