const db = require("../db/database");

//collection name
const dialogCollection = "Dialog";

class _dialog {
    addDialog = async (body) => {
        try {
            const add = await db
                .collection(dialogCollection)
                .add(body)
                .then((docRef) => {
                    console.log("Document added with ID:", docRef.id);
                })
                .catch((error) => {
                    console.error("Error adding document:", error);
                });

            return {
                status: true,
                code: 200,
                message: "data added successfully",
            };
        } catch (error) {
            console.error("request addData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    getDialog = async (game) => {
        try {
            const getData = await db
                .collection(dialogCollection)
                .where("game", "==", game)
                .get();

            const dialogData = [];

            getData.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;
                dialogData.push({ id: id, gameData: data });
            });

            return {
                status: true,
                code: 200,
                dialogData,
            };
        } catch (error) {
            console.error("request getData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };

    updateDialog = async (id, body) => {
        const updateData = await db.collection(dialogCollection).doc(id).get();

        const questData = updateData.data();

        await db.collection(dialogCollection).doc(id).update(body);

        return {
            status: true,
            code: 200,
            message: "data updated successfully",
        };
    };

    deleteDialogue = async (id) => {
        try {
            await db.collection(dialogCollection).doc(id).delete();

            return {
                status: true,
                code: 200,
                message: "data deleted successfully",
            };
        } catch (error) {
            console.error("request deleteData module Error: ", error);
            return {
                status: false,
                message:
                    "Error, check the console log of the backend for what happened",
            };
        }
    };
}

module.exports = new _dialog();
