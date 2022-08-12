import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Staffs from "./StaffComponent";
import StaffDetail from "./StaffDetailComponent";
import { STAFFS } from "../shared/staffs";

import { Switch, Route, Redirect } from "react-router-dom";
import Department from "./DepartmentComponent";
import Payroll from "./PayRollComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };

    this.staffAdded = this.staffAdded.bind(this);
  }

  staffAdded(newStaffs) {
    this.setState({ staffs: newStaffs });
  }

  render() {
    const StaffWithID = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffId, 10)
            )[0]
          }
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/staff"
            component={() => (
              <Staffs staffs={this.state.staffs} staffAdded={this.staffAdded} />
            )}
          />
          <Route exact path="/staff/:staffId" component={StaffWithID} />
          <Route exact path="/department" component={Department} />
          <Route exact path="/payroll" component={Payroll} />

          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
