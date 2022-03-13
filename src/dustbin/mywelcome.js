import React, { useState, useEffect } from "react";
import { BModal, NavBar, Table, FormField, ButtonAdd } from "../components";
import { Container, Row, Col } from "react-bootstrap";
import { options as data } from "../data";
import axios from "axios";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  stateOfOrigin: "",
  phoneNumber: "",
};

const Welcome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  // for one data
  // const [formData, setFormData] = useState(initialValues);
  //for more than one form
  const [formData, setFormData] = useState([{ ...initialValues }]);

  useEffect(() => {
    const getBiodata = () => {
      axios.post("http://localhost:4500/biodata", data, {
        headers: {
          "content-type": "application/json",
        },
        params: {
          // id
        },
      });
    };
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setFormData([{ ...initialValues }]);
    // setFormData([initialValues]);
  };

  const handleChange = (e, index) => {
    /**
     * handlechange before dynamic field
     */
    // const { name, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));

    /**
     * handle change for dynamic field
     */

    const { name, value } = e.target;
    const result = [...formData];
    result[index][name] = value;
    // result[index][e.target.name] = e.target.value
    setFormData(result);

    //another method (short method)
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    setTableData((prevState) => [...prevState, ...formData]);
    setFormData(initialValues);

    //another method (short method)
    // setTableData([...tableData, formData]);

    //close modal after submitting
    // setIsOpen(false)
    handleClose();
  };

  const handleAddFormData = (e) => {
    e.preventDefault();
    setFormData((prevState) => [...prevState, { ...initialValues }]);

    // setFormData(prevState => {
    //   return [
    //     ...prevState,
    //     {...initialValues}
    //   ]
    // })
  };

  const handleRemoveFormData = (e, index) => {
    e.preventDefault();
    const result = [...formData];
    result.splice(index, 1);
    setFormData(result);
  };

  return (
    <div>
      <Container>
        <NavBar />
        <section className="add my-3">
          <Row>
            <Col className="align-item-center text-end">
              <ButtonAdd
                title="Add"
                icon="plus-circle"
                onClick={handleOpen}
                variant="success"
              />
            </Col>
          </Row>
        </section>
        <Table data={tableData} />
      </Container>
      <BModal
        showModal={isOpen}
        hideModal={handleClose}
        title="Biodata Entry"
        size="lg"
      >
        <form>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
          {formData.map((inputField, index) => {
            return (
              <Row key={index}>
                <div className="mb-3 d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      handleRemoveFormData(e, index);
                    }}
                  >
                    <i className="fa fa-minus fs-1x" aria-hidden="true"></i>
                  </button>
                </div>
                <Col md={6}>
                  <FormField.BTextField
                    placeholder="First Name"
                    name={"firstName"}
                    value={inputField.firstName}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <FormField.BTextField
                    placeholder="Last Name"
                    name="lastName"
                    value={inputField.lastName}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <FormField.BTextField
                    type="email"
                    name="email"
                    value={inputField.email}
                    placeholder="Email"
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <FormField.BTextField
                    type="number"
                    name="phoneNumber"
                    value={inputField.phoneNumber}
                    placeholder="Phone Number"
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <FormField.BRadioField
                    data={data.gender}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <FormField.BSelectField
                    data={data.stateOfOrigin}
                    name={"stateOfOrigin"}
                    value={inputField.stateOfOrigin}
                    onChange={(e) => {
                      handleChange(e, index);
                    }}
                  />
                </Col>
              </Row>
            );
          })}
          <div className="mb-3 d-flex justify-content-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddFormData}
            >
              <i className="fa fa-plus fs-1x" aria-hidden="true"></i>
            </button>
          </div>

          <div className="mb-3 d-grid">
            <button className="btn btn-sm btn-dark" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </BModal>
    </div>
  );
};

export default Welcome;
