const url_base = "https://localhost:7289/api/User";

const UserService = {
  Login: function (value) {
    let url = `${url_base}/Login`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: value,
    };

    return fetch(url, requestOptions);
  },
};

export default UserService;
