import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Card from "react-bootstrap/Card";
import Carousel from 'react-bootstrap/Carousel';
import "./ShowComments.css"

export const ShowComments = () => {
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const commentsCollection = collection(db, "comentarios");
    const getComments = async () => {
        try {
            const data = await getDocs(commentsCollection);
            setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getComments();
    }, []);


    return (
        <div>
            {/*Condicionales para renderizar el contenido dependiendo del estado */}
            {loading && (
                <div className="d-flex border container">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {error && (
                <>
                    <h1>Hubo un error en la base de datos: {error}</h1>
                </>
            )}
            <div className="contenedor">
                <h3>Nuestros clientes dicen...</h3>
                <Carousel controls={false} indicators={false}>
                    {comments.map((comment) => (
                        <Carousel.Item key={comment.id}>
                            <Card>
                                <Card.Body className="card-body">
                                    <Card.Title>"{comment.comentario}"</Card.Title>
                                    <Card.Text>{comment.nombre} {comment.apellido}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
