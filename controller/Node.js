const Node = require('./../models/Node');
const Tag = require('./../models/Tag');
const { json } = require('express');

module.exports.create = (req, res) => {
    const {
        title,
        introduction
    } = req.body;

    // TODO: adaugat node in caz
    const node = new Node({
        title,
        introduction,
        content: [],
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
        introduction
    } = req.body;

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
        foundNode.introduction = introduction;

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
        .catch(err => result.status(500).send({
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
    console.log("getByTag: ", tagId)

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

module.exports.contentCreate = (req, res) => {
    const { nodeId } = req.params;
    const { subtitle, paragraph } = req.body;
    const newContent = {
        subtitle, paragraph
    }

    Node.findOne({ _id: nodeId })
        .then(foundNode => {
            foundNode.content.push(newContent);
            foundNode.save().then(result => res.json(result)).catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
}

module.exports.contentEdit = (req, res) => {
    const { nodeId, contentId } = req.params;
    console.log("nodeId: ", nodeId);
    const { subtitle, paragraph } = req.body;

    Node.findOne({ _id: nodeId })
        .then(foundNode => {

            let contentIndex = foundNode.content.findIndex((obj => obj._id == contentId));
            console.log(contentIndex)
            if (contentIndex === -1) throw 'Index of content not found';
            if (paragraph != null) foundNode.content[contentIndex].paragraph = paragraph;
            if (subtitle != null) foundNode.content[contentIndex].subtitle = subtitle;

            foundNode.save().then(result => res.json(result)).catch(err => res.status(500).send({ err, msg: 'content not found' }));
        })
        .catch(err => res.status(500).send({ err, msg: 'no node found' }));
}

module.exports.contentDelete = (req, res) => {
    const { nodeId, contentId } = req.params;

    Node.findOne({ _id: nodeId })
        .then(foundNode => {
            foundNode.content.pull({ _id: contentId });
            foundNode.save().then(result => res.json(result)).catch(err => res.status(500).send(err));
        })
        .catch(err => res.status(500).send(err));
}