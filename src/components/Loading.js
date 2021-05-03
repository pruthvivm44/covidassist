import React from 'react'
import { Row, Container, Col,Spinner} from 'react-bootstrap'
const Loading = (props) => {


    return (
        <div className="full-height text-center h-100 ">
        <Container className=" firstloadcont h-100 ">
          <Row className="firstloadrow h-100">
            <Col md={12} className="firstloadcol my-auto">
              <div className="">
                <Spinner className="loading" animation="grow" variant="danger"/>
                <h1 className="mt-3">Loading...!</h1>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
    )
}
export default Loading;