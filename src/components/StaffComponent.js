import React, { Component } from "react";
import {
  Media,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import "../shared/staffs";
import { Link } from "react-router-dom";

class Staffs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: props.staffs,
    };

    this.handleSearching = this.handleSearching.bind(this);
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
        <Breadcrumb className="mt-5">
          <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
        </Breadcrumb>
        <InputGroup
          className="col-lg-6 col-md-6 col-sm-12"
          onKeyDown={this.handleSearching}
        >
          <Input
            type="text"
            id="keyword"
            name="keyword"
            innerRef={(input) => (this.keyword = input)}
          />
          <Button type="submit" color="primary" onClick={this.handleSearching}>
            Tìm
          </Button>
        </InputGroup>
        <div className="row">{staffs}</div>
      </div>
    );
  }
}

export default Staffs;
