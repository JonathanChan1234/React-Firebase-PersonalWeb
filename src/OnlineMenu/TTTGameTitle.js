import React from 'react';
import lock from "../static/icons-lock-24.png";
import unlock from "../static/icons-unlock-24.png";
import { Card, Image } from 'react-bootstrap';

class TTTGameTitle extends React.Component {
    getTypeClass() {
        if (this.props.game.password) {
            return { bg: "info", text: "white" };
        } else {
            return { bg: "", text: "black" };
        }
    }

    render() {
        return (
            <Card
                onClick={() => this.props.handleOnClick(this.props.game)}
                key={this.props.game.id}
                bg={this.getTypeClass().bg}
                text={this.getTypeClass().text}
                style={{ width: '22rem', cursor: 'pointer' }}>
                <Card.Header>
                    <div>
                        <Image
                            src={(this.props.game.password) ? lock : unlock}
                            height="24px"
                            width="24px"
                            className="mr-2 float-right" />
                        <Card.Text as="h4">{this.props.game.name}</Card.Text>
                        <Card.Text as="h6" className="float-right">{this.props.game.id}</Card.Text>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{ "fontSize": "12px" }}>{this.props.game.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default TTTGameTitle;