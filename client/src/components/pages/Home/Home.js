import { Row, Col, Container } from "react-bootstrap"
import { Link } from "react-router-dom";
import homepage_image from "./../../../homepage_plant.png"
import about_image from "./../../../about_us_image.png";
import "./Home.css"

const Home = () => {


    return (
      <>
        <Container className="homepage mt-5 mb-5">
          <Row className="homepage__row justify-content-center align-items-center">
            <Col xs={false} md={false} lg={1} />
            <Col className="homepage__col__text" xs={12} md={12} lg={5}>
              <h1>Plant B</h1>
              <h3>Your favorite plant's shop in your neighborhood 🌱</h3>
              <p>
                Plants reduce stress levels and boost your mood - making them
                perfect for your home and your work space, too.
              </p>
              <Link to={"/plants"}>
                <button className="homepage__btn">Check our plants</button>
              </Link>
            </Col>
            <Col xs={12} md={12} lg={5}>
              <img alt="plant" src={homepage_image} />
            </Col>
            <Col xs={false} md={false} lg={1} />
          </Row>
        </Container>

        <br/>

        <Container className="about mt-5">
          <Row className="justify-content-center align-items-center">
            <Col xs={false} md={false} lg={1} />
            <Col xs={12} md={12} lg={5}>
              <img className="rounded-circle" alt="plant" src={about_image} />
            </Col>
            <Col className="" xs={12} md={12} lg={5}>
              <h2>About us</h2>
              <p>
                <del>We are 2 junior web developers doing a project--</del> We
                love plants, and wanted to make accessible to the whole
                community.
              </p>
            </Col>

            <Col xs={false} md={false} lg={1} />
          </Row>
        </Container>
      </>
    );
}

export default Home
