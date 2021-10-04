import { Row, Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import homepage_image from "./../../../homepage_plant.png"
import "./Home.css"

const Home = () => {


    return (
      <Container className="homepage mt-5">
        <Row className="homepage__row justify-content-center align-items-center">
          <Col xs={false} md={false} lg={1} />
          <Col className="homepage__col__text" xs={12} md={12} lg={5}>
            <h1>Plant B</h1>
            <h3>Your favorite plant's shop of your neighborhood 🌱</h3>
            <p>
              Plants reduce stress levels and boost your mood - making them
              perfect for your home and your work space, too.
            </p>
            <Link>
              <button className="homepage__btn">Check our plants</button>
            </Link>
          </Col>
          <Col xs={12} md={12} lg={5}>
            <img alt="plant" src={homepage_image} />
          </Col>
          <Col xs={false} md={false} lg={1} />
        </Row>
      </Container>
    );
}

export default Home
