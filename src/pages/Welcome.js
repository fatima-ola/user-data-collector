import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BModal, NavBar, Table, FormField, ButtonAdd } from "../components";
import { Container, Row, Col } from "react-bootstrap";
import { options as data } from "../data";
import axios from "axios";
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";
import { getMembers } from "../redux/actions/memberAction";
import { useDispatch, useSelector } from "react-redux";

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
  const [alert, setAlert] = useState(null);
  // const [formData, setFormData] = useState([{ ...initialValues }]);
  const dispatch = useDispatch();

  //use to connect to the state
  const { memberData } = useSelector((state) => ({
    memberData: state.memberReducer.members,
  }));

  const [formData, setFormData] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      stateOfOrigin: "",
      phoneNumber: "",
    },
  ]);

  // useEffect(() => {
  //   const getBiodata = () => {
  //     axios
  //       .get("http://localhost:4500/biodata")
  //       .then((res) => {
  //         setTableData(res.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getBiodata();
  // }, []);

  // const getBiodata = async () => {
  //   try {
  //     const result = await axios.get("http://localhost:4500/biodata");
  //     setTableData(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  const getBiodataById = async (id) => {
    axios
      .get(`http://localhost:4500/biodata/${id}`)
      .then((res) => {
        console.log(res.data.firstName);
        setFormData((prev) => [
          {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            gender: res.data.gender,
            stateOfOrigin: res.data.stateOfOrigin,
            phoneNumber: res.data.phoneNumber,
          },
        ]);
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBiodataById = (id) => {
    axios
      .delete(`http://localhost:4500/biodata/${id}`)
      .then((res) => {
        const getAlert = () => (
          <SweetAlert
            success
            title="Record was successfully deleted"
            openAnim={{ name: "showSweetAlert", duration: 1000 }}
            closeAnim={{ name: "hideSweetAlert", duration: 500 }}
            onConfirm={hideAlert}
            timeout={2000}
          />
        );
        setAlert(getAlert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    setFormData([{ ...initialValues }]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    // formData[index][name] = value;
    // setFormData(() => formData);
    const result = [...formData];
    result[index][name] = value;
    setFormData(result);
  };

  const handleSubmit = (e, index) => {
    e.preventDefault();
    setTableData((prevState) => [...prevState, ...formData]);
    setFormData(initialValues);
    handleClose();
  };

  const handleAddFormData = (e) => {
    e.preventDefault();
    setFormData((prevState) => [...prevState, { ...initialValues }]);
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
        {/* <h4>{process.env.REACT_APP_BASE_URL}</h4> */}
        <Table
          data={memberData}
          getBiodataById={getBiodataById}
          deleteBiodataById={deleteBiodataById}
        />
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
                    <FontAwesomeIcon icon={faTrashCan} />
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
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="mb-3 d-grid">
            <button className="btn btn-sm btn-dark" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </BModal>
      {alert}
    </div>
  );
};

export default Welcome;
