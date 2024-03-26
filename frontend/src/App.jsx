import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPasswrod] = useState("");
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const myStyle = {
    color: "yellow",
    border: "1px solid red",
    textAlign: "left",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:3030/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, password }),
    })
      .then(() => console.log("data is sent successfully"))
      .catch((err) => console.log(err));

    setName("");
    setAge(0);
    setPasswrod("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3030/form"); // Adjust API endpoint
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch data. Please try again.");
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data only once on mount

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Name : </td>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </tr>
            <tr>
              <td>Age : </td>
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Enter age"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </tr>
            <tr>
              <td>Password : </td>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPasswrod(e.target.value)}
                required
              />
            </tr>
          </tbody>
        </table>
        <button type="submit">SEND</button>
      </form>
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                {data.map((item) => (
                  <h1 key={item._id} style={myStyle}>
                    {item.name}
                    <span> </span>
                    {item.age}
                  </h1>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
