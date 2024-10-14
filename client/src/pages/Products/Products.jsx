import * as React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { Button, Container, FormControl, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CustomNumberInput from "../../components/CustomNumberInput";

function Products() {

  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleName = (e) => setName(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name };

    // Send a request to the server using axios
    /*
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"

      }}>
      <Container sx={{
        margin: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Typography textAlign={"center"} variant={"h3"}> Crear producto </Typography>
      </Container>

      <FormControl onSubmit={handleLoginSubmit}>
        <Container
          sx={{

            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <TextField
              fullWidth
              label="Nombre"
              variant="filled"
              onChange={handleName}
            />
          </Container>


          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <CustomNumberInput
              fullWidth
              label="Nombre"
              variant="filled"
              onChange={handleName}
            />
          </Container>

          <Container sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <Button variant="contained"> Crear producto </Button>
          </Container>


        </Container>

      </FormControl>
      {errorMessage && <p className="error-message">{errorMessage}</p>}


    </Container>
  );
}

export default Products;