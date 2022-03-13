import React, { Component } from "react";
import { BModal, NavBar, Table, FormField, ButtonAdd } from "../components";
import { Container, Row, Col } from "react-bootstrap";
import { options as data } from "../data";
// import options from "../data/options";
// import test from "../data/rough";

/**
 * This is home component
 */

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  stateOfOrigin: "",
  phoneNumber: "",
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      ...initialValues,
      // formData: initialValues,
      tableData: [],
    };
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   * This function is to open modal
   */
  handleModalOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      console.log(prevState);
      return {
        ...prevState,
        tableData: [
          ...this.state.tableData,
          {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            gender: this.state.gender,
            stateOfOrigin: this.state.stateOfOrigin,
            phoneNumber: this.state.phoneNumber,
          },
        ],
        // to close modal when it is successful
        isOpen: false,
      };
    });

    /**
     * another method to submit
     */
    // this.setState({
    //   tableData: [
    //     ...this.state.tableData,
    //     {
    //       firstName: this.state.firstName,
    //       lastName: this.state.lastName,
    //       email: this.state.email,
    //       gender: this.state.gender,
    //       stateOfOrigin: this.state.stateOfOrigin,
    //       phoneNumber: this.state.phoneNumber,
    //     },
    //   ],
    // });
  };
  /**
   *
   * @description This is to rest the form
   */
  // handleReset = (e) => {
  //   e.preventDefault();
  //   // this.setState({
  //   //   firstName: "",
  //   //   lastName: "",
  //   //   email: "",
  //   //   gender: "",
  //   //   state: "",
  //   //   phoneNumber: "",
  //   // });

  //   // this.setState(initialValues);
  //   this.setState({
  //     ...initialValues,
  //   });
  // };

  render() {
    const { isOpen, tableData } = this.state;
    return (
      <>
        <div>
          <Container>
            <NavBar />
            <section className="add my-3">
              <Row>
                <Col className="align-item-center text-end">
                  <ButtonAdd
                    title="Add"
                    icon="plus-circle"
                    onClick={this.handleModalOpen}
                    variant="success"
                  />
                </Col>
              </Row>
            </section>
            <Table data={tableData} />
          </Container>
          <BModal
            showModal={isOpen}
            hideModal={this.handleClose}
            title="Biodata Entry"
          >
            <form>
              {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
              <FormField.BTextField
                placeholder="First Name"
                name={"firstName"}
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <FormField.BTextField
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <FormField.BTextField
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <FormField.BRadioField
                data={data.gender}
                name="gender"
                onChange={this.handleChange}
              />
              <FormField.BSelectField
                data={data.stateOfOrigin}
                name="stateOfOrigin"
                onChange={this.handleChange}
              />
              <FormField.BTextField
                type="number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                placeholder="Phone Number"
                onChange={this.handleChange}
              />
              <div className="mb-3 d-grid">
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  Submit
                </button>
                {/* <button className="btn btn-dark" onClick={this.handleReset}>
                  Reset
                </button> */}
              </div>
            </form>
          </BModal>
        </div>
      </>
    );
  }
}

export default Home;
