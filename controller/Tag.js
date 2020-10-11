const Tag = require('./../models/Tag');

module.exports.create = (req, res) => {
    const {
        name,
        description
    } = req.body;

    const newTag = new Tag({
        name,
        description
    });

    newTag.save()
        .then(newTag => res.json(newTag))
        .catch(err => {
            console.log(err);
            res.json(err);
        });
};

module.exports.edit = (req, res) => {
    const {
        name,
        description
    } = req.body;

    const {
        tagId
    } = req.params;

    Tag.findOne({
        _id: tagId
    }, (errFindTag, foundTag) => {
        if (errFindTag) {
            res.status(500).send({
                error: {
                    msg: `Couldn\'t find the tag: ${tagId}`,
                    errFindTag
                },
            })
        }

        // TODO: check if the strings are null, implement utility functions

        foundTag.name = name;
        foundTag.description = description;

        foundTag.save()
            .then(savedTag => res.json(savedTag))
            .catch(err => res.status(500).send({
                msg: `Couldn\'t save the tag: ${foundTag._id}`,
                err
            }));
    })
};

module.exports.delete = (req, res) => {
    const {
        tagId
    } = req.params;

    console.log("tagId: ", tagId);

    Tag.deleteOne({
        _id: tagId
    })
        .then(result => res.json(result))
        .catch(err => res.status(500).send({
            msg: `Couldn't delete the tag: ${tagId}`,
            err
        }));
};

module.exports.get = (req, res) => {
    const {
        idTag
    } = req.params;

    Tag.findOne({
        _id: idTag
    })
        .then(foundTag => res.json(foundTag))
        .catch(err => res.status(500).send({
            msg: `Couldn't get the tag: ${idTag}`,
            err
        }))
};

module.exports.getAll = (req, res) => {
    Tag.find({})
        .then(result =>  res.json(result ))
        .catch(err => res.status(500).send({
            msg: `Couldn't get the tags`,
            err
        }))
};