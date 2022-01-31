const express = require("express");
const cors = require("cors");
const validator = require("validator");
const path = require("path");

const app = express();

// incarcare modele si init db
const db = require("./models");
db.sequelize.sync();

// json rest api
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))

// // cors
// app.use(cors({
//     origin: "http://localhost:3000"
// }));


// operatie POST pentru prima entitate
app.post("/list", async (req, res) => {

    if (!req.body.description || req.body.description.length < 3) {
        return res.status(500).send({
            error: "Invalid list size"
        });
    }

    const list = await db.FavouriteList.create({
        ...req.body,
        creationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(list);
});

// operatie GET pentru prima entitate
app.get("/list/:id", async (req, res) => {
    const list = await db.FavouriteList.findByPk(req.params.id);

    // 404 daca nu exista
    if (!list) {
        return res.status(404).send();
    }

    return res.status(200).send(list);
});

// operatie PUT pentru prima entitate
app.put("/list/:id", async (req, res) => {
    const list = await db.FavouriteList.findByPk(req.params.id);

    // 404 daca nu exista
    if (!list) {
        return res.status(404).send();
    }

    await db.FavouriteList.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru prima entitate
app.delete("/list/:id", async (req, res) => {
    await db.Video.destroy({
        where: {
            listId: req.params.id
        }
    });

    await db.FavouriteList.destroy({
        where: {
            id: req.params.id,
        },
    });

    return res.status(200).send();
});

// operatie GET pentru prima entitate, paginare, sortare dupa coloana
app.get("/lists", async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.skip) || 0;
    const sortcol = req.query.sortcol;;
    const sort = req.query.sort;

    const cols = ["id", "description", "creationDate"];

    // daca avem o coloana invalida
    if (!cols.includes(sortcol) && sortcol != undefined) {
        return res.status(500).send({
            error: "Invalid sort column"
        });
    }

    // daca avem un mod de sortare incompatibil
    if (sort != "DESC" && sort != "ASC" && sort != undefined) {
        return res.status(500).send();
    }

    let lists;

    if (sortcol && sort) {
        lists = await db.FavouriteList.findAll({
            offset,
            limit,
            order: [[sortcol, sort]]
        });
    } else {
        lists = await db.FavouriteList.findAll({
            offset,
            limit
        });
    }

    return res.status(200).send(lists);
});

// operatie POST pentru a doua entitate ca subresursa
app.post("/list/:id/video", async (req, res) => {

    if (!req.body.description || req.body.description.length < 3) {
        return res.status(500).send({
            error: "Invalid description size"
        });
    }

    if (!req.body.title || req.body.title.length < 3) {
        return res.status(500).send({
            error: "Invalid title size"
        });
    }

    if (!req.body.url || !validator.isURL(req.body.url)) {
        return res.status(500).send({
            error: "Invalid url"
        });
    }

    const video = await db.Video.create({
        ...req.body,
        listId: req.params.id,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    return res.status(201).send(video);
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/list/:id/video/:videoid", async (req, res) => {
    const video = await db.Video.findByPk(req.params.videoid);

    if (!video) {
        return res.status(404).send();
    }

    return res.status(200).send(video);
});


// operatie PUT pentru a doua entitate ca subresursa
app.put("/list/:id/video/:videoid", async (req, res) => {
    const video = await db.Video.findByPk(req.params.id);

    if (!video) {
        return res.status(404).send();
    }

    await db.Video.update(req.body, {
        where: {
            id: req.params.videoid,
        },
    });

    return res.status(200).send();
});

// operatie DELETE pentru a doua entitate ca subresursa
app.delete("/list/:id/video/:videoid", async (req, res) => {
    await db.Video.destroy({
        where: {
            id: req.params.videoid,
        },
    });

    return res.status(200).send();
});

// operatie GET pentru a doua entitate ca subresursa
app.get("/list/:id/video", async (req, res) => {
    const video = await db.Video.findAll({
        where: {
            listId: req.params.id,
        },
    });

    return res.status(200).send(video);
});

// pornim serverul
app.listen(process.env.PORT, async () => {
    console.log("app start on 5000");
});
