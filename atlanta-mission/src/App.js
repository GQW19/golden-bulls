import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import HomeCaseWorker from "./components/HomeCaseWorker";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Classes from "./components/Classes";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";
/**
 * 
 * @author : Chirag Dara 
 */
function App() {
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/classes" element={<Classes />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/HomeCaseWorker"
                element={
                  <ProtectedRoute>
                    <HomeCaseWorker />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
