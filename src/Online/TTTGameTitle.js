import React from 'react';
import lock from "../static/icons-lock-24.png";
import unlock from "../static/icons-unlock-24.png";
import { Card, Image } from 'react-bootstrap';

class TTTGameTitle extends React.Component {
    isActiveTab() {
        if (this.props.active === 'active') return "active";
        return "";
    }

    getTypeClass() {
        if(this.props.game.password) {
            return { bg: "dark", text: "white" };
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
                style={{ width: '18rem', cursor: 'pointer' }}>
                <Card.Header>
                    <div className="d-flex justify-content-start">
                        <Image
                            src={(this.props.game.password) ? lock : unlock}
                            height="24px"
                            width="24px"
                            className="mr-2" />
                        <Card.Text as="h6" className="">{this.props.game.id}</Card.Text>
                    </div>
                    <Card.Text as="h4">{this.props.game.name}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{this.props.game.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default TTTGameTitle;