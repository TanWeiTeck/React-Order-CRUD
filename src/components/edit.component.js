import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [validationError, setValidationError] = useState({});

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        await axios
            .get(`http://localhost:3000/products/${id}`)
            .then(({ data }) => {
                const { name, description, price } = data;
                setName(name);
                setDescription(description);
                setPrice(price);
                console.log(data);
            })
            .catch(({ response: { data } }) => {
                Swal.fire({
                    text: data.message,
                    icon: 'error',
                });
            });
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append('_method', 'PATCH');
        // formData.append('name', name);
        // formData.append('description', description);
        // formData.append('price', price);

        // console.log(formData);

        await axios
            .patch(`http://localhost:3000/products/${id}`, {
                name: name,
                description: description,
                price: price,
            })
            .then(({ data }) => {
                Swal.fire({ icon: 'success', text: data.message });
                navigate('/product');
            })
            .catch(({ response }) => {
                if (response.status === 422) {
                    setValidationError(response.data.errors);
                } else {
                    Swal.fire({ text: response.data.message, icon: 'error' });
                }
            });
    };

    return (
        <div className="bg-gray-200">
            <div className="">
                <div className="">
                    <div className="flex justify-center p-4">
                        <div className="p-4 border border-black rounded-md ">
                            <h4 className="font-bold mb-3">Update Order</h4>
                            <div className="flex ">
                                <Form onSubmit={updateProduct}>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="Name"
                                                className="flex flex-col items-start"
                                            >
                                                <Form.Label>Name</Form.Label>{' '}
                                                <Form.Control
                                                    className="w-[300px]"
                                                    type="text"
                                                    value={name}
                                                    onChange={(event) => {
                                                        setName(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col>
                                            <Form.Group
                                                controlId="Description"
                                                className="flex flex-col items-start"
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
                                            </Form.Group>{' '}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group
                                                controlId="Name"
                                                className="flex flex-col items-start mb-4"
                                            >
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control
                                                    className="w-full"
                                                    type="text"
                                                    value={price}
                                                    onChange={(event) => {
                                                        setPrice(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <button
                                        className="w-full p-2 border border-black rounded-md "
                                        type="submit"
                                    >
                                        Update
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
