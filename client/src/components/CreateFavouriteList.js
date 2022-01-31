import { Form, Button } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

// create prima entitate
function CreateFavouriteList() {
    // state-urile formului
    const [description, setDescription] = useState("");

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("/list", {
            description
        })  
    }

    return (
        <Form>
            {/* descrierea listei de favorite */}
            <Form.Group className="mb-3">
                <Form.Label>Descriere</Form.Label>
                <Form.Control type="text" placeholder="descriere" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

export default CreateFavouriteList;
