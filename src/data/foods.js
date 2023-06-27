import idly from "../Images/idly.png";
import dosa from "../Images/dosa.jpg";
import tea from "../Images/tea.jpg";
import andhrameals from "../Images/andhra_meals.png";
import nonvegmeals from "../Images/non-veg-meals.jpg";
import paan from "../Images/paan.jpg";
import roti from "../Images/roti.jpg";
import vegbiryani from "../Images/veg-Biryani-.jpg";
import chickenbiryani from "../Images/chicken-biryani.jpg";

const foods = [
    {
        id: 1,
		name: "Idly",
        image: idly,
        alt: "Idly",
        ingredients: ["Rice", "Urad Daal", "Fenugreek Seeds"],
        price: 10,
        options: [
            {name: "Sambar", icon: "fa-solid fa-mug-hot fa-sm"},
            {name: "Chutney", icon: "fa-solid fa-seedling fa-sm"}
        ],
        category: "Breakfast"
    },
    {
        id: 2,
		name: "Dosa",
        image: dosa,
        alt: "Dosa",
        ingredients: ["Rice", "Urad Daal", "Fenugreek Seeds"],
        price: 10,
        options: [
            {name: "Sambar", icon: "fa-solid fa-mug-hot fa-sm"},
            {name: "Chutney", icon: "fa-solid fa-seedling fa-sm"}
        ],
        category: "Breakfast"
    },
	{
        id: 3,
		name: "Tea/Coffee",
		image: tea,
		alt: "Tea/Coffee",
		ingredients: ["Tea Leaves Or Coffee Powder", "Milk", "Water"],
		price: 6,
		options: [
			{name: "Milk", icon: "fa-solid fa-mug-saucer fa-sm"},
			{name: "Leaves", icon: "fa-solid fa-leaf fa-sm"}
        ],
        category: "Breakfast"
    },
	{
		id: 4,
		name: "Vegetarian Meals",
		image: andhrameals,
		alt: "Vegetarian Meals",
		ingredients: ["Rice", "Curries", "Curd"],
		price: 20,
		options: [
			{name: "Spicy", icon: "fa-solid fa-pepper-hot fa-sm"},
			{name: "Chutney", icon: "fa-solid fa-seedling fa-sm"},
			{name: "Curd", icon: "fa-solid fa-cheese fa-sm"}
		],
        category: "Lunch"
	},
	{
        id: 5,
		name: "Non-Vegetarian Meals",
        image: nonvegmeals,
        alt: "Non-Vegetarian Meals",
        ingredients: ["Rice", "Meat", "Curd"],
        price: 25,
        options: [
            {name: "Spicy", icon: "fa-solid fa-pepper-hot fa-sm"},
            {name: "Meat", icon: "fa-solid fa-drumstick-bite fa-sm"},
            {name: "Curd", icon: "fa-solid fa-cheese fa-sm"}
        ],
        category: "Lunch"
    },
    {
        id: 6,
		name: "Paan",
        image: paan,
        alt: "Paan",
        ingredients: ["Betel Leaves", "Areca Nuts", "Sweeteners"],
        price: 10,
        options: [
            {name: "Leaves", icon: "fa-solid fa-leaf fa-sm"}
        ],
        category: "Lunch"
    },
	{
        id: 7,
		name: "Roti/Phulka With Curry",
        image: roti,
        alt: "Curry",
        ingredients: ["Roti or Phulka", "Curry"],
        price: 20,
        options: [
            {name: "Spicy", icon: "fa-solid fa-pepper-hot fa-sm"},
            {name: "New", icon: "fa-solid fa-star fa-sm"}
        ],
        category: "Dinner"
    },
    {
        id: 8,
		name: "Vegetarian Biryani",
        image: vegbiryani,
        alt: "veg biryani",
        ingredients: ["Basmati Rice", "Raitha"],
        price: 20,
        options: [
            {name: "Spicy", icon: "fa-solid fa-pepper-hot fa-sm"},
            {name: "Trusted", icon: "fa-solid fa-face-grin-stars fa-sm"}
        ],
        category: "Dinner"
    },
    {
        id: 9,
		name: "Non-Vegetarian Biryani",
        image: chickenbiryani,
        alt: "chicken-biryani",
        ingredients: ["Basmati Rice", "Meat", "Raitha"],
        price: 20,
        options: [
            {name: "Spicy", icon: "fa-solid fa-pepper-hot fa-sm"},
            {name: "Premium", icon: "fa-solid fa-medal fa-sm"}
        ],
        category: "Dinner"
    }
]

export default foods;