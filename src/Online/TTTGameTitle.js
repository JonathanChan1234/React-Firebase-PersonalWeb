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
        switch (this.props.type) {
            case "private":
                return { bg: "dark", text: "white" };
            case "public":
                return { bg: "light", text: "" };
            default:
                return { bg: "dark", text: "white" };
        }
    }

    render() {
        return (
            <Card
                bg={this.getTypeClass().bg}
                text={this.getTypeClass().text}
                style={{ width: '18rem' }}>
                <Card.Header>
                    <div className="d-flex justify-content-start">
                        <Image
                            src={(this.props.type === "public") ? unlock : lock}
                            height="24px"
                            width="24px"
                            className="mr-2" />
                        <Card.Text as="h6" className="">{this.props.id}</Card.Text>
                    </div>
                    <Card.Text as="h4">{this.props.name}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{this.props.description}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default TTTGameTitle;