const Node = require('./../models/Node');
const Tag = require('./../models/Tag');
const { json } = require('express');

module.exports.create = (req, res) => {
    const {
        title,
    } = req.body;

    // TODO: adaugat node in caz
    const node = new Node({
        title,
        content: {},
        childrenNodes: [],
        tags: []
    });

    node.save()
        .then(node => res.json(node))
        .catch(err => res.status(500).send({
            msg: `Couldn\'t create the node: ${title}`,
            err
        }));
};

module.exports.edit = (req, res) => {
    const {
        title,
        content,
        tags
    } = req.body;
    console.log("tagsTemp", tags);

    const tagsTemp = tags.map(element => element._id);
    const {
        nodeId
    } = req.params;

    Node.findOne({
        _id: nodeId
    }, (errFindNode, foundNode) => {
        if (errFindNode) {
            res.status(500).send({
                error: {
                    msg: `Couldn\'t find the node: ${nodeId}`,
                    errFindNode
                },
            })
        }

        // TODO: check if the strings are null, implement utility functions

        foundNode.title = title;
        foundNode.content = content;
        foundNode.tags = tagsTemp;

        foundNode.save()
            .then(savedTag => res.json(savedTag))
            .catch(err => res.status(500).send({
                msg: `Couldn\'t save the node: ${foundNode._id}`,
                err
            }));
    })
};

module.exports.delete = (req, res) => {
    const {
        nodeId
    } = req.params;

    Node.deleteOne({
        _id: nodeId
    })
        .then(result => res.json(result))
        .catch(err => res.status(500).send({
            msg: `failed to delete ${nodeId}`,
            err
        }));
};

module.exports.get = (req, res) => {
    const {
        nodeId
    } = req.params;

    Node.findOne({
        _id: nodeId
    })
        .then(result => res.json(result))
        .catch(err => res.status(500).send({
            msg: `failed to find ${nodeId}`,
            err
        }));
};

module.exports.getAll = (req, res) => {
    Node.find({})
        .then(result => {
            res.json({ result });
        })
        .catch(err => res.status(500).send({
            msg: `Coudln't get all Nodes`,
            err
        }))
};

module.exports.getByTag = (req, res) => {
    const { tagId } = req.params;

    Tag.findById(tagId).populate("nodes").then(result => res.json(result)).catch(err => res.status(500).send(err));
};

module.exports.addTagToNode = (req, res) => {

    const {
        nodeId,
        tagId
    } = req.params;

    Tag.findOne({
        _id: tagId
    })
        .then(foundTag => {
            console.log("foundTag: ", foundTag);

            Node.findByIdAndUpdate(
                nodeId, {
                $push: {
                    tags: foundTag._id
                }
            }, {
                new: true,
                useFindAndModify: false
            }
            ).then(foundNode => {
                console.log("foundNode: ", foundNode)
                foundTag.nodes.push(nodeId)
                foundTag.save()
                    .then(result => res.json({
                        result
                    }))
                    .catch(err => res.status(500).send({
                        err
                    }));

            })
                .catch(err => res.status(500)
                    .send({
                        err
                    }))
        })
        .catch(err => res.status(500).send({
            err
        }));

};

module.exports.contentEdit = (req, res) => {
    res.json({msg: "edit content"});
}

module.exports.getAllTitlesAndId = (req, res) => {
    Node.find(null, '_id title')
        .then(result => res.json(result))
        .catch((err) => {
            console.log("intrat in catch")
            res.status(500).send(err)
        })
}

/* Tree of child nodes projected in an array. Feature funcionality, irrelevant atm */
module.exports.getChildId = (req, res) => {
    const { tagId } = req.params;
    let arrayOfChildTags = [];

    function pushChildNodes(id){
        Node.find(id, '_id childs')
    }
}