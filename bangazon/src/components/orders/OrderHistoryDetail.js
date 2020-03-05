import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import "./Order.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { ListItemText, Typography } from "@material-ui/core";
//CARDS
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// Author: Lauren Riddle
// Purpose: To display the details for an order in the user's order history
const styles = {
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

class OrderHistoryDetail extends Component {
    state = {
        order: {},
        products: [],
        total: null
    }

    componentDidMount() {
        // Get the selected order
        APIManager.getOne("orders", `${this.props.match.params.orderId}`)
            .then((response) => {

                this.setState({
                    order: response
                })
                // Get all products related to the selected order
                APIManager.getAll(
                    "orderproducts",
                    `?order=${this.props.match.params.orderId}`
                )
                    .then((response) => {

                        this.setState({
                            products: response
                        })
                        // Count the total price of the products in the order
                        this.totalPrice()
                    })
            })

    }

    totalPrice = () => {
        let total = 0

        this.state.products.map(product => {
            // add the product price to the order total
            total += Number(product.product.price);
        })
        // set order total in state
        this.setState({

            total: total
        })

    }
    render() {

        return (
            <Card>
                <CardContent>

                    <List>
                        <ListItem key={this.state.order.id}>
                            <List>
                                <Typography>Order #{this.state.order.id} ({this.state.order.created_at})</Typography>
                                {this.state.products.map(product => (
                                    <ListItem key={product.id}>
                                        <ListItemText>
                                            <Typography variant="h5" component="h2">
                                                {product.product.name}:{" "}
                                            </Typography>

                                            <Typography color="textSecondary" gutterBottom>
                                                Price: ${product.product.price}
                                            </Typography>
                                        </ListItemText>


                                    </ListItem>
                                ))}
                                <ListItem style={{ alignItems: "flex-end" }}>
                                    <ListItemText>
                                        <Typography component="p">Total: ${this.state.total}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <CardActions>

                                </CardActions>
                            </List>
                        </ListItem>

                    </List>
                </CardContent>
            </Card>
        );
    }
};

export default OrderHistoryDetail;