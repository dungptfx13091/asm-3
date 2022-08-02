import React, { Component } from "react";
import { DEPARTMENTS } from "../shared/staffs";

class Department extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: DEPARTMENTS,
    };
  }

  render() {
    const departments = this.state.departments.map((department) => {
      return (
        <div
          key={department.id}
          className="col-lg-4 col-sm-6 col-12 mt-2 ml-2 mr-2 mb-2 border rounded"
        >
          <h4>{department.name}</h4>
          <p>Số lượng nhân viên: {department.numberOfStaff}</p>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{departments}</div>
      </div>
    );
  }
}
export default Department;
