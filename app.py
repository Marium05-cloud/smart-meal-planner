from flask import Flask, render_template, jsonify, request

app = Flask(__name__)
# Sample recipes data
recipes = {
    "Spaghetti Carbonara": ["Spaghetti", "Eggs", "Parmesan cheese", "Bacon", "Black pepper"],
    "Tacos": ["Tortillas", "Beef", "Lettuce", "Cheese", "Tomatoes"],
    "Chicken Biryani": ["Chicken", "Rice", "Yogurt", "Spices", "Onions"],
    "Sushi": ["Rice", "Fish", "Seaweed", "Soy sauce", "Wasabi"]
}

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/recipes")
def get_recipes():
    return jsonify(recipes)
@app.route('/recipes')
def show_recipes():
    return render_template('recipes.html', recipes=recipes)

@app.route("/get_ingredients", methods=["POST"])
def get_ingredients():
    meal = request.json.get("meal")
    ingredients = recipes.get(meal, [])
    return jsonify({"ingredients": ingredients})

if __name__ == "__main__":
    app.run(debug=True)
