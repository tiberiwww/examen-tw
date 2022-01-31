import BootstrapTable from "react-bootstrap-table-next";
import { Container, Row, Col, Button } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from "react-router-dom";
import CreateFavouriteList from "../components/CreateFavouriteList";

const cols = [
    {
        dataField: 'id',
        text: 'ID'
    },
    {
        dataField: 'description',
        text: 'Descriere'
    },
    {
        dataField: 'creationDate',
        text: 'Data creare',
        editor: {
            type: Type.DATE
        }
    }
]



const baseUrl = "/lists?limit=10000&sortcol=id&sort=ASC";

function FavouriteLists() {
    const [data, setData] = useState([]);

    const [dataUrl, setDataUrl] = useState(baseUrl);

    useEffect(async () => {
        const newData = await axios.get(dataUrl);

        setData(newData.data);
    }, [dataUrl]);

    
    let navigate = useNavigate();

    function navigateTo(event, link) {
        event.preventDefault();
        navigate(link);
    }

    const expandRow = {
        renderer: row => (
          <div>
              {/* read prima entitate */}
            <Button className="mx-2" size="sm" onClick={(e) => navigateTo(e, `/list/${row.id}`)}>View</Button>
            {/* delete prima entiatae */}
            <Button variant="danger" className="mx2-" size="sm" onClick={(e) => {
                axios.delete(`/list/${row.id}`)
                setData(data.filter(x => x.id != row.id))
            }}>Delete</Button>
          </div>
        )
      };

    return (
        <>
            <Container>
                <Row className="my-4">
                    <Col className="mx-auto text-center" md={8}>
                        <h2>Liste</h2>
                    </Col>
                </Row>
                {/* create pentru prima entitate */}
                <Row className="my-4">
                    <Col className="mx-auto" md={6}>
                        <CreateFavouriteList/>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={12} className="mx-auto">
                        <BootstrapTable
                            keyField="id"
                            data={data}
                            columns={cols}
                            bordered={false}
                            noDataIndication={"Empty..."}
                            expandRow={ expandRow }
                            cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell: (oldValue, newValue, row, column) => {
                                // update prima entitate
                                console.log(oldValue, newValue, row, column)

                                const edit = {}
                                edit[column.dataField] = newValue;

                                axios.put(`/list/${row.id}`, edit);
                            } }) }
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FavouriteLists;
