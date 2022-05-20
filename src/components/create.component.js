import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function CreateProduct() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [validationError, setValidationError] = useState({});

    const createProduct = async (e) => {
        e.preventDefault();

        await axios
            .post(`http://localhost:3000/products`, {
                name: name,
                description: description,
                price: price,
            })
            .then(({ data }) => {
                Swal.fire({ icon: 'success', text: 'Order Added' });
                navigate('/product');
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                } else {
                    Swal.fire({
                        text: response.data.message,
                        icon: 'error',
                    });
                }
            });
    };

    return (
        <div className="bg-gray-200">
            <div className="">
                <div className="">
                    <div className="flex justify-center p-4">
                        <div className="p-4 border border-black rounded-md ">
                            <h4 className="font-bold mb-3">Create Order</h4>
                            <div className="flex ">
                                <Form onSubmit={createProduct}>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="Name"
                                                className="flex flex-col items-start"
                                            >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    className="w-[300px]"
                                                    type="text"
                                                    value={name}
                                                    onChange={(event) =>
                                                        setName(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group
                                                className="flex flex-col items-start"
                                                controlId="Description"
                                            >
                                                <Form.Label>
                                                    Description
                                                </Form.Label>
                                                <Form.Control
                                                    className="w-full"
                                                    as="textarea"
                                                    rows={3}
                                                    value={description}
                                                    onChange={(event) => {
                                                        setDescription(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="Price"
                                                className="flex flex-col items-start mb-4"
                                            >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    className="w-full"
                                                    type="text"
                                                    value={price}
                                                    onChange={(event) =>
                                                        setPrice(
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <button
                                        className="w-full p-2 border border-black rounded-md "
                                        type="submit"
                                    >
                                        Order
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
