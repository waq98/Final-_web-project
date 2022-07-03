const express = require("express");
const mongoose = require('mongoose')

const Article = require('./models/article')
const articleRouter = require("./routes/articles");
const methodOverride = require('method-override')


const app = express();

mongoose.connect('mongodb+srv://adilskans115:0112233@cluster0.9i0ix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' }).limit(3)
  res.render("articles/index", { articles: articles });
});

app.get("/blogs", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render("articles/blogs", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(process.env.PORT || 2000)

