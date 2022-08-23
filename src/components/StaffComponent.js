import React, { Component } from "react";
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
  FormFeedback,
} from "reactstrap";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import { Link } from "react-router-dom";

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
      newStaff: { image: "/assets/images/alberto.png" },
      isModalOpen: false,
      touched: {
        fullName: false,
        doB: false,
        startDate: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false,
      },
    };

    this.handleSearching = this.handleSearching.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddStaff = this.handleAddStaff.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validate = this.validate.bind(this);
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
    const deptValue = DEPARTMENTS.filter((dept) => dept.name === target.value);
    const value = target.name === "department" ? deptValue[0] : target.value;
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
      id: this.state.staffs.length,
      ...this.state.newStaff,
    };
    console.log(this.state.newStaff);
    const prevState = this.state;
    let result = [...prevState.staffs, newStaff];
    console.log(result);

    this.props.staffAdded(result);

    event.preventDefault();
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(fullName, doB, startDate, salaryScale, annualLeave, overTime) {
    const errors = {
      fullName: "",
      doB: "",
      startDate: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
    };
    if (this.state.touched.fullName && fullName.length < 3)
      errors.fullName = "Tên phải chứa >= 3 ký tự";
    else if (this.state.touched.fullName && fullName.length > 30)
      errors.fullName = "Tên phải chứa <= 30 ký tự";

    if (this.state.touched.salaryScale && salaryScale < 1)
      errors.salaryScale = "Hệ số lương nằm trong khoảng 1.0 -> 3.0";
    else if (this.state.touched.salaryScale && salaryScale > 3)
      errors.salaryScale = "Hệ số lương nằm trong khoảng 1.0 -> 3.0";

    const reg = /^\d+$/;
    if (this.state.touched.annualLeave && !reg.test(annualLeave))
      errors.annualLeave = "Chỉ được phép nhập số";
    if (this.state.touched.overTime && !reg.test(overTime))
      errors.overTime = "Chỉ được phép nhập số";

    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.fullName,
      this.state.doB,
      this.state.startDate,
      this.state.salaryScale,
      this.state.annualLeave,
      this.state.overTime
    );

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
                  <Label htmlFor="fullName" md={4}>
                    Tên
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      valid={errors.fullName === ""}
                      invalid={errors.fullName !== ""}
                      onBlur={this.handleBlur("fullName")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.fullName}</FormFeedback>
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
                      valid={errors.doB === ""}
                      invalid={errors.doB !== ""}
                      onBlur={this.handleBlur("doB")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.doB}</FormFeedback>
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
                      valid={errors.startDate === ""}
                      invalid={errors.startDate !== ""}
                      onBlur={this.handleBlur("startDate")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.startDate}</FormFeedback>
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
                      valid={errors.salaryScale === ""}
                      invalid={errors.salaryScale !== ""}
                      onBlur={this.handleBlur("salaryScale")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.salaryScale}</FormFeedback>
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
                      valid={errors.annualLeave === ""}
                      invalid={errors.annualLeave !== ""}
                      onBlur={this.handleBlur("annualLeave")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.annualLeave}</FormFeedback>
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
                      valid={errors.overTime === ""}
                      invalid={errors.overTime !== ""}
                      onBlur={this.handleBlur("overTime")}
                      onChange={this.handleInputChange}
                    />
                    <FormFeedback>{errors.overTime}</FormFeedback>
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
