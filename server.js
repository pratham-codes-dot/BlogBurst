import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Store blog posts as an array of objects
let blogPosts = [];

// Routes
app.get("/", (req, res) => {
    res.render("home", { blogPosts });
});

app.get("/issue.ejs", (req, res) => {
    res.render("issue");
});

app.get("/feed.ejs", (req, res) => {
    res.render("feed", { blogPosts });
});

// Add a blog post
app.post("/add", (req, res) => {
    const { author, content } = req.body;
    blogPosts.push({ author, content });
    res.redirect("/feed.ejs");
});

// Edit a blog post
app.post("/edit/:index", (req, res) => {
    const index = req.params.index;
    const { author, content } = req.body;
    blogPosts[index] = { author, content };
    res.redirect("/feed.ejs");
});

// Delete a blog post
app.post("/delete/:index", (req, res) => {
    const index = req.params.index;
    blogPosts.splice(index, 1);
    res.redirect("/feed.ejs");
});

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${port}`);
});
