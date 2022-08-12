import React, { Component, useState } from "react";
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Col,
} from "reactstrap";
import "../shared/staffs";
import { Link } from "react-router-dom";

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
      newStaff: { image: "/assets/images/alberto.png" },
      isModalOpen: false,
    };

    this.handleSearching = this.handleSearching.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSearching() {
    const searchResult = this.props.staffs.filter((staff) => {
      return staff.name
        .toLowerCase()
        .includes(this.keyword.value.toLowerCase());
    });

    this.setState({
      staffs: searchResult,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => ({
      newStaff: {
        ...prevState.newStaff,
        [name]: value,
      },
    }));
  }

  handleAddStaff(event) {
    //
    const newStaff = {
      id: this.state.staffs.length + 1,
      ...this.state.newStaff,
    };
    console.log(this.state.newStaff);
    const prevState = this.state;
    let result = [...prevState.staffs, newStaff];
    console.log(result);

    this.setState({
      staffs: result,
    });

    // save to local
    localStorage.removeItem("staffs");

    localStorage.setItem("staffs", JSON.stringify(this.state.staffs));

    event.preventDefault();
  }

  render() {
    const staffs = this.state.staffs.map((staff) => {
      return (
        <div
          key={staff.id}
          className="col-lg-2 col-sm-4 col-6 mt-5 border rounded"
        >
          <Link to={`/staff/${staff.id}`}>
            <Media tag="li" className="list-unstyled">
              <Media left middle>
                <Media
                  className="w-100"
                  object
                  src={staff.image}
                  alt={staff.name}
                />
              </Media>
              <Media body className="ml-5">
                <Media heading>{staff.name}</Media>
              </Media>
            </Media>
          </Link>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="container col-lg-6 col-md-6 col-sm-12">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-10">
                <Breadcrumb>
                  <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
                </Breadcrumb>
              </div>
              <div className="col-lg-6 col-md-6 col-2">
                <Button
                  className="fa fa-plus"
                  color="secondary"
                  onClick={this.toggleModal}
                ></Button>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
            <InputGroup onKeyDown={this.handleSearching}>
              <Input
                type="text"
                id="keyword"
                name="keyword"
                innerRef={(input) => (this.keyword = input)}
              />
              <Button
                type="submit"
                color="primary"
                onClick={this.handleSearching}
              >
                Tìm
              </Button>
            </InputGroup>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleAddStaff}>
                <FormGroup row>
                  <Label htmlFor="name" md={4}>
                    Tên
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="doB"
                      name="doB"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="startDate" md={4}>
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="department" md={4}>
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Input
                      type="select"
                      name="department"
                      // value={this.state.contactType}
                      onChange={this.handleInputChange}
                    >
                      <option>Sale</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="salaryScale" md={4}>
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="salaryScale"
                      name="salaryScale"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="annualLeave"
                      name="annualLeave"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label htmlFor="overTime" md={4}>
                    Số ngày đã làm thêm
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="overTime"
                      name="overTime"
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <Button
                  type="submit"
                  color="primary"
                  onClick={this.toggleModal}
                >
                  Thêm
                </Button>
              </Form>
            </ModalBody>
          </Modal>
          {staffs}
        </div>
      </div>
    );
  }
}

export default Staffs;
