const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// create one Person
const person = new Person({
  name: "Hassan",
  age: 30,
  favoriteFoods: ["pizza", "burgers"],
});

person
  .save()
  .then(() => console.log("save"))
  .catch((e) => console.log(e.message));

// create many Persons

const arrayOfPeople = [
  { name: "Oussama", age: 25, favoriteFoods: ["pizza", "sushi"] },
  { name: "Zakaria", age: 40, favoriteFoods: ["sandwich", "patte"] },
];

Person.create(arrayOfPeople)
  .then((data) => console.log("created", data))
  .catch((e) => console.log(e.message));

// Find Person by name

Person.find({ name: "Oussama" })
  .then((data) => console.log("finded", data))
  .catch((e) => console.log(e.message));

// Find one by Favorite Food

Person.findOne({ favoriteFoods: "pizza" })
  .then((data) => console.log("finded", data))
  .catch((e) => console.log(e.message));

// Find by ID

const personId = "6445496d278f3a10e4d17540";

Person.findById(personId)
  .then((data) => console.log("finded", data))
  .catch((e) => console.log(e.message));

// Find By Id and Update 

Person.findById(personId)
  .then((p) => {
    p.favoriteFoods.push("hamburger");
    p.save()
      .then(() => console.log("saved"))
      .catch((e) => console.log(e.message));
  })
  .catch((e) => console.log(e.message));

// Find One and Update

Person.findOneAndUpdate({ name: "Hassan" }, { age: 20 }, { new: true })
  .then((data) => console.log("finded", data))
  .catch((e) => console.log(e.message));

// Find by Id and Remove

Person.findByIdAndRemove(personId)
  .then((data) => console.log("finded", data))
  .catch((e) => console.log(e.message));

// delete by Name

Person.deleteMany({ name: "Oussama" })
  .then((data) => console.log("removed", data))
  .catch((e) => console.log(e.message));

// Search Query

Person.find({ favoriteFoods: "pizza" })
  .sort("name")
  .limit(2)
  .select("-age")
  .exec()
  .then((data) => console.log("exec", data))
  .catch((e) => console.log(e.message));
