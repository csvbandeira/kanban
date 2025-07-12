import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
	console.log("Funcionou!");
});

app.listen(port, () => console.log("http://localhost:%d", port));
