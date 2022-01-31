import { Form, Button } from "react-bootstrap";
import { useState } from "react";

import axios from "axios";

// create a doua entitate master-detail - bootstrap form
function CreateVideo({id}) {
    // state-uri
    const [title, setTitle] = useState("");
    const [description , setDescription] = useState("");
    const [url , setUrl] = useState("");

    // submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`/list/${id}/video`, {
            title,
            description,
            url,
            videoId: id
        })  
    }

    return (
        <Form>
            {/* titlul videoului */}
            <Form.Group className="mb-3">
                <Form.Label>Titlu</Form.Label>
                <Form.Control type="text" placeholder="titlu" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>

            {/* descrierea */}
            <Form.Group className="mb-3">
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="descriere" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
            {/* url */}
            <Form.Group className="mb-3">
                <Form.Label>Url</Form.Label>
                <Form.Control type="url" placeholder="url" value={url} onChange={e => setUrl(e.target.value)} />
            </Form.Group>

            {/* submit */}
            <Button variant="primary" type="button" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

export default CreateVideo;
