import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Default",
        avatar_url: "",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/shubham00079");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
    console.log("json   ->", json);
  }

  render() {
    const { login, id, avatar_url } = this.state.userInfo;
    return (
      <div className="user-card">
        <img src={avatar_url} />
        <h2>Name: {login} </h2>
        <h3>Location: {id}</h3>
        <h4>ContactL @shubham123</h4>
      </div>
    );
  }
}

export default UserClass;
